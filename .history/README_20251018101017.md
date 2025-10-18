# 🧠 MindTrack

> **Sistema de Apoio Psicológico para Estudantes**  
> Projeto desenvolvido em evento colaborativo entre os cursos de **Psicologia** e **Sistemas de Informação**

## 📋 Sobre o Projeto

O **MindTrack** é uma plataforma digital desenvolvida para apoiar estudantes de psicologia em seu processo de autoconhecimento e bem-estar mental. O sistema permite o registro de reflexões, humor e progresso pessoal de forma segura e organizada.

### 🎯 Objetivo

Facilitar o acompanhamento do bem-estar emocional de estudantes, fornecendo ferramentas digitais que complementam o trabalho desenvolvido no curso de Psicologia.

## 🏗️ Arquitetura

```
MindTrack/
├── backend/          # API NestJS + Prisma + PostgreSQL
├── frontend/         # Interface React + TypeScript + Vite
└── docs/            # Documentação e layouts
```

## 🚀 Tecnologias

### Backend
- **NestJS** - Framework Node.js
- **Prisma ORM** - Gerenciamento de banco de dados
- **PostgreSQL** - Banco de dados
- **TypeScript** - Linguagem de programação
- **bcrypt** - Criptografia de senhas

### Frontend
- **React 18** - Interface de usuário
- **TypeScript** - Tipagem estática
- **Vite** - Build tool
- **ESLint** - Qualidade de código

## 📦 Instalação e Execução

### Pré-requisitos
- Node.js 18+
- PostgreSQL
- npm ou yarn

### Backend
```bash
cd backend
npm install
npx prisma generate
npx prisma migrate dev
npm run start:dev
```
🚀 Servidor rodando em: `http://localhost:3000`

### Frontend
```bash
cd frontend
npm install
npm run dev
```
🌐 Interface disponível em: `http://localhost:5173`

## 📱 Funcionalidades

- ✅ **Sistema de Autenticação**
  - Registro de usuários
  - Login seguro
  - Reset de senha

- 🔄 **Em Desenvolvimento**
  - Registro de reflexões diárias
  - Acompanhamento de humor
  - Dashboard de progresso
  - Relatórios personalizados

## 🎓 Contexto Acadêmico

Este projeto surge de uma iniciativa colaborativa da faculdade, unindo:

- **Curso de Psicologia**: Fornecimento de expertise em bem-estar mental e metodologias de apoio psicológico
- **Curso de Sistemas de Informação**: Desenvolvimento da solução tecnológica e implementação do sistema

### 📚 Benefícios Educacionais

- **Para Psicologia**: Ferramenta prática para estudos de caso e acompanhamento de progresso
- **Para Sistemas**: Experiência real em desenvolvimento de software com impacto social
- **Interdisciplinar**: Aplicação de conhecimentos técnicos em contexto de saúde mental

## 🛡️ Segurança e Privacidade

- Senhas criptografadas com bcrypt
- Dados pessoais protegidos
- Conformidade com boas práticas de desenvolvimento
- Estrutura preparada para LGPD

## 📈 Status do Projeto

- ✅ **Concluído**: Autenticação e estrutura base
- 🔄 **Em andamento**: Interface de usuário e funcionalidades core
- 📋 **Planejado**: Sistema de relatórios e analytics

## 👥 Equipe

**Desenvolvimento**: Curso de Sistemas de Informação  
**Consultoria Técnica**: Curso de Psicologia  
**Orientação**: Professores participantes do evento

## 📞 Contato

Para dúvidas sobre o projeto ou sugestões de melhorias, entre em contato com a equipe de desenvolvimento ou coordenação do evento.

---

💡 **Este projeto representa a união entre tecnologia e cuidado humano, demonstrando como a colaboração interdisciplinar pode gerar soluções inovadoras para o bem-estar estudantil.**