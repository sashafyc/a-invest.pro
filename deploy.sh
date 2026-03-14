#!/bin/bash
# Деплой сайта A-Invest на Timeweb через rsync+SSH
# Использование: ./deploy.sh

set -e

REMOTE_USER="cy95045"
REMOTE_HOST="vh432.timeweb.ru"
REMOTE_DIR="/home/c/cy95045/a-invest/public_html/"

echo "🚀 Деплой на $REMOTE_HOST..."

rsync -avz --delete \
  --exclude='.git/' \
  --exclude='_materials/' \
  --exclude='_distributions/' \
  --exclude='_template.html' \
  --exclude='README.md' \
  --exclude='.gitignore' \
  --exclude='deploy.sh' \
  -e "ssh -4 -o ConnectTimeout=10" \
  ./ "${REMOTE_USER}@${REMOTE_HOST}:${REMOTE_DIR}"

echo "✅ Деплой завершён"

# IndexNow — уведомляем Bing и Яндекс о всех URL
echo ""
echo "📡 IndexNow: отправляем URL в Bing и Яндекс..."
bash _materials/indexnow-submit.sh
