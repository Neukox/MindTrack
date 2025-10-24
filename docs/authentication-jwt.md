## Autenticação com JWT (Access + Refresh Tokens)

Esta documentação descreve como funciona o sistema de autenticação implementado no backend do projeto MindTrack, usando JWTs para access tokens e refresh tokens persistidos (hashed) no banco de dados.

### Visão geral

O sistema usa dois tipos de tokens:
- Access Token: JWT curto (expiração curta) usado para autenticar requisições à API via header `Authorization: Bearer <token>`.
- Refresh Token: token de vida mais longa usado para obter novos access tokens sem precisar que o usuário faça login novamente. O refresh token é enviado ao cliente como cookie `refresh_token` e seu hash é armazenado no banco de dados.

Fluxo resumido:
1. Usuário realiza login (`POST /auth/login`) com e-mail e senha.
2. Se as credenciais estiverem corretas, o backend gera um par de tokens: access token (JWT) e refresh token (string longa).
3. O access token é retornado ao cliente na resposta (body). O refresh token é enviado como cookie httpOnly (nome: `refresh_token`).
4. Em requisições subsequentes, o cliente inclui o access token no header `Authorization`.
5. Quando o access token expira, o cliente chama `POST /auth/refresh` enviando o refresh token (o guard `jwt-refresh` valida o cookie/body e gera um novo access token).
6. Ao logout (`POST /auth/logout`) o refresh token é removido do banco de dados e o cookie é limpo.

### Endpoints principais

- POST /auth/login
  - Body: `{ email: string, password: string }`
  - Retorno (200): `{ message: string, accessToken: string, user: { id, username, email } }`
  - Em caso de sucesso, além do body, o servidor seta um cookie `refresh_token` httpOnly contendo o refresh token.

- POST /auth/register
  - Body: `{ username: string, email: string, password: string }`
  - Retorno (201): `{ message: string, accessToken: string, user: { id, username, email } }`
  - Comportamento similar ao login (gera tokens e seta cookie de refresh).

- POST /auth/refresh
  - Protegido por `JwtRefreshGuard` (estratégia `jwt-refresh`)
  - Usa o refresh token fornecido (normalmente via cookie) para validar e retorna `{ accessToken }`.

- POST /auth/logout
  - Remove/limpa o refresh token do usuário no banco de dados e limpa o cookie `refresh_token`.

### Arquivos chave (localização)

- `src/auth/auth.controller.ts` — implementa os endpoints (`login`, `register`, `refresh`, `logout`) e set/clear do cookie de refresh.
- `src/auth/auth.service.ts` — lógica de autenticação: validação de credenciais, geração de tokens, hashing de refresh tokens, persistência no usuário e revogação.
- `src/auth/strategies/jwt.strategy.ts` — estratégia Passport para validar o access token (header Bearer).
- `src/auth/strategies/jwt-refresh.strategy.ts` — estratégia Passport para validar o refresh token (usando cookie/body e comparando hash com valor armazenado no banco).
- `src/auth/guards/jwt-auth.guard.ts` e `src/auth/guards/jwt-refresh.guard.ts` — guards personalizados que lançam Unauthorized quando não autenticado.
- `src/user/user.service.ts` — métodos auxiliares: `findByEmail`, `create`, `setRefreshToken`, etc. (persistência via Prisma).
- `src/auth/hashing/*` — serviços responsáveis por hashear e comparar senhas e refresh tokens.
- `prisma/schema.prisma` — campo `User.refreshToken` onde o hash do refresh token é armazenado.
- `src/common/filters/zod-exception.filter.ts` — tratamento amigável de erros de validação (Zod).

### Variáveis de ambiente

Configure as variáveis abaixo no arquivo `.env` (veja `.env.example` em `backend/.env.example`):

- `JWT_ACCESS_SECRET` — segredo para assinar access tokens.
- `JWT_ACCESS_EXPIRATION` — tempo de expiração do access token (em segundos). Ex.: `900` (15 minutos).
- `JWT_REFRESH_SECRET` — segredo para assinar refresh tokens.
- `JWT_REFRESH_EXPIRATION` — tempo de expiração do refresh token (em segundos). Ex.: `604800` (7 dias).

Observação: no projeto existe `.env.example` com nomes e valores de exemplo. Garanta que `ConfigModule.forRoot` esteja carregando o arquivo `.env` (no projeto já foi configurado).

### Como os tokens são gerados e validados (detalhes técnicos)

- Geração:
  - Ao autenticar, o backend cria um payload contendo pelo menos o `sub` (id do usuário) e dados públicos (email, username).
  - Gera o access token assinado com `JWT_ACCESS_SECRET` e vida curta.
  - Gera o refresh token (pode ser outro JWT ou string aleatória assinada). No projeto, é gerado um refresh token e armazenado o seu hash (usando `hashingService.hash`) no campo `User.refreshToken`.

- Armazenamento do refresh token:
  - Somente o hash do refresh token é salvo no banco, por segurança.
  - O token em texto claro é enviado ao cliente como cookie httpOnly.

- Validação do refresh token:
  - A estratégia `jwt-refresh` extrai o refresh token (por exemplo, do cookie `refresh_token` ou do body) e valida a assinatura usando `JWT_REFRESH_SECRET`.
  - Em seguida, o código carrega o usuário do banco e compara o hash armazenado com o token recebido (via `hashingService.compare`). Se bater, o refresh é válido.

### Considerações de segurança e boas práticas

- Nunca armazene o refresh token em local acessível por JavaScript. Use cookie `httpOnly` e `secure` em produção.
- Sempre hasheie o refresh token antes de salvar no banco. Em caso de vazamento do banco, o token não poderá ser usado.
- Configure `sameSite` adequadamente (por ex. `lax` ou `strict`) dependendo do fluxo de cross-site. No projeto, em produção usa-se `lax`, em dev usa `none` para facilitar testes com frontends locais.
- Use expirations curtas para access tokens e renove com refresh tokens.
- Ao logout, apague (ou invalide) o hash do refresh token no banco e limpe o cookie no cliente.
- Considere rotação do refresh token (emitir novo refresh token a cada refresh e invalidar o anterior) para aumentar a segurança. O projeto atual armazena um único refresh token por usuário.

### Exemplo de requests

Login (cURL):

```bash
curl -i -X POST 'http://localhost:3000/auth/login' \
  -H 'Content-Type: application/json' \
  -d '{"email":"user@example.com","password":"senha"}'
```

Resposta de sucesso (JSON):

```json
{
  "message": "Login realizado com sucesso",
  "accessToken": "<ACCESS_TOKEN>",
  "user": { "id": "...", "username": "...", "email": "..." }
}
```

O cookie `refresh_token` será definido no cabeçalho `Set-Cookie`.

Refresh (cURL):

```bash
curl -i -X POST 'http://localhost:3000/auth/refresh' \
  --cookie "refresh_token=<REFRESH_TOKEN_COOKIE>"
```

Resposta de sucesso:

```json
{ "accessToken": "<NEW_ACCESS_TOKEN>" }
```

Logout (cURL):

```bash
curl -i -X POST 'http://localhost:3000/auth/logout' \
  --cookie "refresh_token=<REFRESH_TOKEN_COOKIE>"
```

### Observações de implementação específicas do projeto

- O projeto usa Passport (`@nestjs/passport`) com duas estratégias: `jwt` (access) e `jwt-refresh` (refresh). Os guards `JwtAuthGuard` e `JwtRefreshGuard` encapsulam a validação e retornam `Unauthorized` quando necessário.
- O `User` model em `prisma/schema.prisma` inclui `refreshToken String?` para armazenar o hash.
- A `AuthService` possui métodos para gerar tokens, hashear e persistir o refresh token e setar o cookie no `Response` (via `@Res({ passthrough: true })`).
- Erros de validação são tratados por Zod e transformados em respostas amigáveis pelo `ZodExceptionFilter`.

### Próximos passos e melhorias sugeridas

- Implementar renovação automática de access tokens no cliente usando o refresh token a cada requisição.
- Adicionar guards de autorização para proteção de rotas específicas.
