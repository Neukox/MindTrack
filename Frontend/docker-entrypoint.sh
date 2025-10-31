#!/bin/sh
set -e

# Lista explícita de variáveis para evitar substituir outras acidentalmente
envsubst '${SERVER_NAME} ${BACKEND_URL}' \
  < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf

# Executa o comando padrão (nginx -g 'daemon off;')
exec "$@"