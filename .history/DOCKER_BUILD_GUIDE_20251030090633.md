# Build Scripts para MindTrack

## 🐳 Como construir as imagens Docker

### Frontend
```bash
cd Frontend
docker build -t mindtrack-frontend:latest .
```

### Backend
```bash
cd backend
docker build -t mindtrack-backend:latest .
```

### Banco de Dados
```bash
cd docker
docker build -f Dockerfile.postgres -t mindtrack-postgres:latest .
```

## 🚀 Como executar os containers

### 1. Executar o banco de dados
```bash
docker run -d \
  --name mindtrack-db \
  -p 5432:5432 \
  -e POSTGRES_USER=mindtrack \
  -e POSTGRES_PASSWORD=sua_senha_segura \
  -e POSTGRES_DB=mindtrack_db \
  -v mindtrack_data:/var/lib/postgresql/data \
  mindtrack-postgres:latest
```

### 2. Executar o backend
```bash
docker run -d \
  --name mindtrack-backend \
  -p 8000:8000 \
  --link mindtrack-db:db \
  -e DATABASE_URL="postgresql://mindtrack:sua_senha_segura@db:5432/mindtrack_db?schema=public" \
  -e JWT_ACCESS_SECRET=seu_jwt_secret_muito_seguro \
  -e JWT_REFRESH_SECRET=seu_jwt_refresh_secret_muito_seguro \
  mindtrack-backend:latest
```

### 3. Executar o frontend
```bash
docker run -d \
  --name mindtrack-frontend \
  -p 80:80 \
  --link mindtrack-backend:backend \
  mindtrack-frontend:latest
```

## ⚙️ Configurações importantes

### Variáveis de ambiente do Backend
- `DATABASE_URL`: String de conexão com o PostgreSQL
- `JWT_ACCESS_SECRET`: Chave secreta para tokens JWT
- `JWT_REFRESH_SECRET`: Chave secreta para refresh tokens
- `EMAIL_USER`: Email para envio de recuperação de senha
- `EMAIL_PASS`: Senha de app do Gmail
- `CLIENT_URL`: URL do frontend (para CORS)

### Volumes recomendados
- `mindtrack_data`: Para persistir dados do PostgreSQL
- `mindtrack_uploads`: Para uploads de arquivos (se houver)

## 🔒 Segurança

### Para produção, sempre:
1. Use senhas fortes e únicas
2. Configure secrets apropriados
3. Use HTTPS
4. Configure firewall adequadamente
5. Faça backup regular dos volumes

### Exemplo de .env para produção:
```bash
DATABASE_URL="postgresql://mindtrack:SENHA_MUITO_FORTE@db:5432/mindtrack_db?schema=public"
JWT_ACCESS_SECRET="jwt_secret_muito_longo_e_seguro_aqui"
JWT_REFRESH_SECRET="jwt_refresh_secret_muito_longo_e_seguro_aqui"
EMAIL_USER="seu_email@gmail.com"
EMAIL_PASS="sua_senha_de_app_gmail"
CLIENT_URL="https://seu-dominio.com"
```