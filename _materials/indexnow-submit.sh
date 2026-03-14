#!/bin/bash
# IndexNow — отправка всех URL из sitemap.xml в Bing и Яндекс
# Использование: bash _materials/indexnow-submit.sh

SITE="https://a-invest.pro"
KEY="72327c2b110f4279a0fa97ca94f10fe8"
KEY_LOCATION="$SITE/$KEY.txt"

# Извлекаем URL из sitemap.xml (совместимо с macOS)
URLS=$(sed -n 's/.*<loc>\([^<]*\)<\/loc>.*/\1/p' sitemap.xml)

# Формируем JSON-массив
URL_ARRAY=""
for url in $URLS; do
  if [ -n "$URL_ARRAY" ]; then
    URL_ARRAY="$URL_ARRAY,"
  fi
  URL_ARRAY="$URL_ARRAY\"$url\""
done

JSON="{\"host\":\"a-invest.pro\",\"key\":\"$KEY\",\"keyLocation\":\"$KEY_LOCATION\",\"urlList\":[$URL_ARRAY]}"

echo "Отправляем $(echo "$URLS" | wc -l | tr -d ' ') URL..."

# Отправляем в Bing
echo ""
echo "→ Bing..."
BING_RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" -X POST "https://www.bing.com/indexnow" \
  -H "Content-Type: application/json; charset=utf-8" \
  -d "$JSON")
echo "  Bing: HTTP $BING_RESPONSE"

# Отправляем в Яндекс
echo "→ Yandex..."
YANDEX_RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" -X POST "https://yandex.com/indexnow" \
  -H "Content-Type: application/json; charset=utf-8" \
  -d "$JSON")
echo "  Yandex: HTTP $YANDEX_RESPONSE"

echo ""
if [ "$BING_RESPONSE" = "200" ] || [ "$BING_RESPONSE" = "202" ]; then
  echo "Bing: OK"
else
  echo "Bing: ошибка ($BING_RESPONSE)"
fi

if [ "$YANDEX_RESPONSE" = "200" ] || [ "$YANDEX_RESPONSE" = "202" ]; then
  echo "Yandex: OK"
else
  echo "Yandex: ошибка ($YANDEX_RESPONSE)"
fi

echo "Google: не поддерживает IndexNow, индексация через Search Console + sitemap.xml"
