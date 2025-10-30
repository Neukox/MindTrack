# Configuração de Email - Gmail SMTP

## 📧 Como Configurar a Senha de App do Gmail

Para que o sistema possa enviar emails de recuperação de senha, você precisa configurar uma senha de app do Gmail. Siga estes passos:

### 1. Ative a Verificação em 2 Etapas no Gmail
- Acesse [myaccount.google.com](https://myaccount.google.com)
- Vá em "Segurança" → "Verificação em duas etapas"
- Siga as instruções para ativar

### 2. Gere uma Senha de App
- Ainda na seção "Segurança", procure por "Senhas de app"
- Clique em "Senhas de app"
- Selecione "Email" como aplicativo
- Copie a senha de 16 caracteres gerada (ex: `abcd efgh ijkl mnop`)

### 3. Configure no Arquivo .env
Edite o arquivo `.env` e substitua a linha `EMAIL_PASS=` pela sua senha:

```properties
EMAIL_PASS=abcdefghijklmnop
```

**⚠️ IMPORTANTE**: 
- Use a senha de app (16 caracteres), NÃO a senha normal do Gmail
- Remova os espaços da senha de app
- Mantenha a senha segura e não a compartilhe

### 4. Teste a Configuração
Após configurar, reinicie o servidor:
```bash
npm run start:dev
```

O sistema tentará conectar com o Gmail e exibirá mensagens de sucesso ou erro no console.

---

## 🔧 Configurações Atuais no .env

```properties
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=gabrielcfonline0900@gmail.com
EMAIL_PASS=            # ← Configure aqui sua senha de app
EMAIL_FROM=gabrielcfonline0900@gmail.com
```

## 📝 Status do Sistema

- ✅ Configuração SMTP está correta
- ✅ Serviço de email não bloqueia a inicialização
- ⚠️ **PENDENTE**: Configurar EMAIL_PASS com senha de app do Gmail
- ✅ Sistema funciona sem email (tokens exibidos no console para teste)

## 🚀 Próximos Passos

1. Configure a senha de app conforme instruções acima
2. Reinicie o servidor
3. Teste a recuperação de senha no frontend
4. Verifique se os emails estão sendo enviados corretamente

---

**Dica**: Se preferir não configurar email agora, o sistema continuará funcionando normalmente. Os tokens de recuperação serão exibidos no console do servidor para testes.