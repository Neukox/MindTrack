#!/usr/bin/env sh
set -e

# Opcional: esperar DB ficar disponível (simples polling)
wait_for_db() {
  if [ -z "$DATABASE_URL" ]; then
    echo "DATABASE_URL não definido, pulando espera por DB"
    return 0
  fi

  echo "Esperando pelo banco de dados..."
  attempt=0
  max_attempts=30
  until npx prisma db pull >/dev/null 2>&1 || [ "$attempt" -ge "$max_attempts" ]; do
    attempt=$((attempt + 1))
    echo "Tentativa $attempt/$max_attempts - banco não disponível ainda. Aguardando 2s..."
    sleep 2
  done

  if [ "$attempt" -ge "$max_attempts" ]; then
    echo "Banco não respondeu após $max_attempts tentativas"
    return 1
  fi
  echo "Banco acessível."
}

# Só rode as migrações se RUN_MIGRATIONS estiver "true"
if [ "${RUN_MIGRATIONS:-false}" = "true" ]; then
  echo "RUN_MIGRATIONS=true"
  if [ "${NODE_ENV:-development}" = "production" ]; then
    echo "Ambiente: production — aplicando migrations com 'prisma migrate deploy'"
    wait_for_db
    npx prisma migrate deploy
  else
    echo "Ambiente: development — synchronizando schema com 'prisma db push' (não cria arquivos de migration)"
    wait_for_db
    npx prisma db push
    # Se preferir gerar/usar migrations em dev:
    # npx prisma migrate dev --name init --skip-generate
  fi
else
  echo "RUN_MIGRATIONS != true — pulando execução de migrações"
fi

# Garante que o Prisma Client esteja gerado (geralmente já foi no build, mas somente para segurança)
npx prisma generate

# Executa o comando padrão da imagem
exec "$@"
