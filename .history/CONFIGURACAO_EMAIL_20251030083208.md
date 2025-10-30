# Configuração de Email para Recuperação de Senha

## ⚠️ IMPORTANTE: Configuração Obrigatória

Para que o sistema de recuperação de senha funcione corretamente, você DEVE configurar as credenciais de email no arquivo `.env`.

## 📧 Configuração do Gmail

### 1. Preparar sua conta Gmail

1. Acesse [myaccount.google.com](https://myaccount.google.com)
2. Vá em **Segurança**
3. Ative a **Verificação em duas etapas** (obrigatório)

### 2. Gerar Senha de App

1. Ainda em **Segurança**, procure por **Senhas de app**
2. Clique em **Senhas de app**
3. Selecione **Email** como aplicativo
4. Clique em **Gerar**
5. **COPIE A SENHA GERADA** (16 caracteres)

### 3. Configurar o arquivo .env

No arquivo `backend/.env`, configure:

```env
EMAIL_USER=seu_email@gmail.com
EMAIL_PASS=senha_de_app_de_16_caracteres
EMAIL_FROM=seu_email@gmail.com
```

**Exemplo:**
```env
EMAIL_USER=joao@gmail.com
EMAIL_PASS=abcd efgh ijkl mnop
EMAIL_FROM=joao@gmail.com
```

## ✅ Testando a Configuração

1. Reinicie o servidor backend
2. Tente solicitar recuperação de senha
3. Verifique os logs para confirmar:
   ```
   ✅ Gmail transporter initialized and verified successfully
   ✅ Email sent successfully to: usuario@email.com
   ```

## 🚨 Problemas Comuns

### Erro: "Invalid login"
- Verifique se a verificação em duas etapas está ativada
- Confirme que está usando a senha de app, não sua senha normal

### Erro: "Authentication failed"
- A senha de app pode ter expirado, gere uma nova
- Verifique se copiou a senha completamente (16 caracteres)

### Erro: "Connection timeout"
- Verifique sua conexão com internet
- Alguns firewalls podem bloquear SMTP

## 📧 Template do Email

O email enviado contém:
- Logo do MindTrack
- Mensagem personalizada com nome do usuário
- Botão para redefinir senha
- Link direto para a página de reset

O link expira em 15 minutos por segurança.