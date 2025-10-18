# Levantamento de Requisitos - Sistema MindTrack

## 1. Introdução

O MindTrack é um sistema voltado para o acompanhamento acadêmico e pessoal de estudantes, funcionando como um diário de bordo digital. Ele permite o registro de reflexões diárias, emoções e aprendizados, além de gerar relatórios de progresso e estatísticas personalizadas.

## 2. Objetivo do Sistema

O objetivo do MindTrack é promover o autoconhecimento e o desenvolvimento acadêmico, proporcionando aos alunos uma ferramenta intuitiva para acompanhar sua evolução ao longo do tempo.

## 3. Requisitos Funcionais

- `RF01` – O sistema deve permitir o cadastro de novos usuários. — ✅ Desenvolvido
- `RF02` – O sistema deve permitir o login de usuários existentes. — 🛠️ Em desenvolvimento
- `RF03` – O sistema deve oferecer recuperação de senha via e-mail.— 🛠️ Em desenvolvimento 
- `RF04` – O usuário deve poder criar registros de reflexão contendo título, categoria, emoção e texto. 
- `RF05` – O sistema deve exibir um dashboard com estatísticas de uso e progresso do usuário.
- `RF06` – O sistema deve permitir a filtragem e busca de registros por categoria, emoção e data.
- `RF07` – O sistema deve permitir a exportação de relatórios em formato PDF.
- `RF08` – O sistema deve exibir gráficos de frequência e categorias mais usadas.
- `RF09` – O sistema deve permitir a edição e exclusão de registros existentes.
- `RF10` – O sistema deve manter a sessão do usuário autenticada até o logout.

## 4. Requisitos Não Funcionais

- `RNF01` – O sistema deve ser desenvolvido utilizando React no front-end e NestJS no back-end.
- `RNF02` – O sistema deve utilizar o Prisma ORM para acesso ao banco de dados.
- `RNF03` – O sistema deve armazenar senhas de forma criptografada utilizando bcrypt. 
- `RNF04` – O sistema deve utilizar autenticação baseada em JWT.
- `RNF05` – O tempo de resposta para carregamento de páginas não deve exceder 3 segundos.
- `RNF06` – O sistema deve estar disponível 99% do tempo.
- `RNF07` – A interface deve ser responsiva e compatível com dispositivos móveis.
- `RNF08` – O layout deve seguir boas práticas de UX e design minimalista.
- `RNF09` – O sistema deve permitir a geração de relatórios PDF com branding do MindTrack.
- `RNF10` – O sistema deve garantir a integridade e segurança dos dados armazenados.

## 5. Considerações Finais

O MindTrack foi concebido para ser uma plataforma acessível, moderna e centrada no usuário. Seu propósito é estimular a reflexão e o crescimento pessoal através de uma experiência digital organizada e visualmente agradável.