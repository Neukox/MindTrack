# 🚀 Deploy Configuration Guide

## Frontend (Vercel) + Backend Integration

### ✅ **Configurações já aplicadas:**

#### **1. Backend (.env)**
```properties
# URL do frontend em produção
CLIENT_URL=https://mindtrackfrontend.vercel.app
```

#### **2. CORS configurado**
- ✅ `https://mindtrackfrontend.vercel.app` adicionado
- ✅ Variável `CLIENT_URL` incluída dinamicamente

#### **3. Frontend (API Configuration)**
- ✅ URL da API configurada dinamicamente
- ✅ Detecta automaticamente desenvolvimento vs produção

### 🔧 **Próximos passos:**

#### **1. Configure a URL do backend no Vercel:**
No painel do Vercel, adicione a variável de ambiente:
```
VITE_API_URL=https://SUA_URL_DO_BACKEND_AQUI
```

#### **2. URLs que você precisa atualizar:**

**No Frontend (.env.production):**
```properties
VITE_API_URL=https://sua-url-do-backend.com
```

**No arquivo api.ts (linha de fallback):**
```typescript
return import.meta.env.VITE_API_URL || "https://sua-url-do-backend.com";
```

#### **3. Comando para deploy local do frontend:**
```bash
cd Frontend
npm run build
```

### 📋 **Checklist de Deploy:**

#### **Backend:**
- ✅ CORS configurado para Vercel
- ✅ CLIENT_URL atualizado
- ✅ Email configurado
- ⚠️ **FALTA**: Deploy do backend em produção

#### **Frontend:**
- ✅ URL da API dinâmica
- ✅ Vercel.json configurado
- ⚠️ **FALTA**: Configurar VITE_API_URL com URL real do backend

### 🌐 **URLs atuais:**
- **Frontend**: https://mindtrackfrontend.vercel.app
- **Backend**: *Aguardando deploy*

### 🔄 **Para testar localmente com Vercel:**
```bash
# Frontend
cd Frontend
npm run dev

# Backend  
cd backend
npm run start:dev
```

### ⚡ **Deploy automático:**
Quando você fizer push para o repositório, o Vercel automaticamente:
1. Detectará mudanças no Frontend
2. Executará o build
3. Aplicará as variáveis de ambiente
4. Fará o deploy

### 🎯 **Próximo passo crítico:**
**Fazer deploy do backend** e atualizar a variável `VITE_API_URL` no Vercel com a URL real do backend em produção.