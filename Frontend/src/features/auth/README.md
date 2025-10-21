# 🔐 Serviços de Autenticação - Frontend

## 📋 **Descrição**
Serviços integrados para conectar o frontend React com o backend NestJS, incluindo login, registro e recuperação de senha.

## 🗂️ **Estrutura dos Arquivos**

```
Frontend/auth/
├── axios/
│   ├── api.ts                    # Configuração base do Axios
│   ├── axiosLogin.ts            # Serviços de login
│   ├── axiosRegister.ts         # Serviços de registro
│   └── axiosRecuperar-Senha.ts  # Serviços de recuperação de senha
├── types/
│   └── auth.types.ts            # Tipos TypeScript compartilhados
└── index.ts                     # Exportações centralizadas
```

## 🚀 **Como Usar**

### **Login de Usuário**
```typescript
import { loginUser } from '../../../auth/axios/axiosLogin';

const handleLogin = async (email: string, password: string) => {
  try {
    const response = await loginUser({ email, password });
    console.log('Login realizado:', response.user);
    // Usuário e token são automaticamente salvos no localStorage
  } catch (error) {
    console.error('Erro no login:', error.message);
  }
};
```

### **Registro de Novo Usuário**
```typescript
import { registerUser, validateRegisterData } from '../../../auth/axios/axiosRegister';

const handleRegister = async (userData) => {
  // Validação local primeiro
  const errors = validateRegisterData(userData);
  if (errors.length > 0) {
    console.error('Erro de validação:', errors[0]);
    return;
  }

  try {
    const response = await registerUser({
      username: userData.nome,
      email: userData.email,
      password: userData.senha
    });
    console.log('Usuário registrado:', response.message);
  } catch (error) {
    console.error('Erro no registro:', error.message);
  }
};
```

### **Recuperação de Senha**
```typescript
import { requestPasswordRecovery } from '../../../auth/axios/axiosRecuperar-Senha';

const handlePasswordRecovery = async (email: string) => {
  try {
    const response = await requestPasswordRecovery({ email });
    console.log('Email enviado:', response.message);
  } catch (error) {
    console.error('Erro na recuperação:', error.message);
  }
};
```

## 🔧 **Funcionalidades Implementadas**

### **✅ Configuração Axios (api.ts)**
- ✅ Base URL configurada para `http://localhost:3000`
- ✅ Timeout de 10 segundos
- ✅ Interceptor para adicionar token automaticamente
- ✅ Interceptor para tratar erros 401 (redirecionar para login)
- ✅ Headers padrão configurados

### **✅ Serviço de Login (axiosLogin.ts)**
- ✅ Função `loginUser()` para autenticação
- ✅ Salvamento automático de token e dados do usuário
- ✅ Função `logoutUser()` para limpar dados
- ✅ Função `isUserLoggedIn()` para verificar autenticação
- ✅ Função `getLoggedUser()` para obter dados do usuário
- ✅ Tratamento de erros tipado

### **✅ Serviço de Registro (axiosRegister.ts)**
- ✅ Função `registerUser()` para criar nova conta
- ✅ Função `validateRegisterData()` para validação local
- ✅ Validação de email, senha e confirmação de senha
- ✅ Tratamento de erros do backend

### **✅ Serviço de Recuperação (axiosRecuperar-Senha.ts)**
- ✅ Função `requestPasswordRecovery()` para solicitar reset
- ✅ Função `resetPassword()` para definir nova senha
- ✅ Função `validateEmail()` para validação local
- ✅ Tratamento de erros específicos

## 🎯 **Integração com Componentes**

### **LoginForm.tsx**
- ✅ Integrado com `loginUser()`
- ✅ Estado de loading durante requisição
- ✅ Tratamento de erros com toast
- ✅ Redirecionamento após sucesso

### **RegisterForm.tsx**
- ✅ Integrado com `registerUser()`
- ✅ Validação local antes do envio
- ✅ Estado de loading durante cadastro
- ✅ Feedback visual para o usuário

### **RecoverForm.tsx**
- ✅ Integrado com `requestPasswordRecovery()`
- ✅ Validação de email local
- ✅ Estado de loading durante envio
- ✅ Mensagens de sucesso/erro

## 🛡️ **Segurança Implementada**

- ✅ **Armazenamento Seguro**: Token salvo no localStorage
- ✅ **Auto-logout**: Remoção automática em caso de token inválido
- ✅ **Validação Local**: Verificação de dados antes do envio
- ✅ **Tratamento de Erros**: Mensagens específicas do backend
- ✅ **Timeout**: Prevenção de requisições lentas

## 🔗 **Endpoints do Backend**

| Serviço | Método | Endpoint | Descrição |
|---------|---------|----------|-----------|
| Login | POST | `/login` | Autenticação de usuário |
| Registro | POST | `/register` | Criação de nova conta |
| Recuperação | POST | `/auth/request-password-reset` | Solicitar reset de senha |
| Reset | POST | `/auth/reset-password` | Definir nova senha |

## 📦 **Estados Gerenciados**

### **LocalStorage**
- `token`: JWT token de autenticação
- `user`: Dados do usuário logado (id, username, email)

### **Estados de Loading**
- Login: `isLoading` durante autenticação
- Registro: `isLoading` durante cadastro
- Recuperação: `isLoading` durante envio

## 🧪 **Como Testar**

1. **Iniciar o backend**: `npm run start:dev` (porta 3000)
2. **Iniciar o frontend**: `npm run dev` (porta 5173)
3. **Testar login** com credenciais válidas
4. **Testar registro** com dados válidos
5. **Testar recuperação** com email existente

## ⚡ **Performance**

- ✅ **Interceptors**: Configuração automática de headers
- ✅ **Reutilização**: Instância axios compartilhada
- ✅ **Timeout**: Prevenção de travamentos
- ✅ **Validação Local**: Redução de requisições desnecessárias

---

**Status: ✅ Totalmente Integrado e Funcional**

A integração entre frontend e backend está completa com todos os serviços de autenticação funcionais!