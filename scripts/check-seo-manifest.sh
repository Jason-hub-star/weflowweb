#!/usr/bin/env bash
# check-seo-manifest.sh — 배포 후 SEO 응답 검증
# 사용: BASE_URL=https://weflowlab.kr bash scripts/check-seo-manifest.sh

set -u
BASE="${BASE_URL:-http://localhost:3000}"
fail=0

check_url() {
  local path="$1"
  local desc="$2"
  local code
  code=$(curl -s -o /dev/null -w "%{http_code}" "$BASE$path")
  if [[ "$code" == "200" ]]; then
    printf "  ✅ %-25s [%s]\n" "$path" "$desc"
  else
    printf "  ❌ %-25s [%s] HTTP %s\n" "$path" "$desc" "$code"
    fail=$((fail+1))
  fi
}

echo "[SEO Endpoints — $BASE]"
check_url "/sitemap.xml" "sitemap"
check_url "/robots.txt"  "robots"
check_url "/opengraph-image" "default OG"

echo ""
echo "[Routes]"
for p in / /services /pricing /cases /reviews /blog /notice /faq /contact /contact/form /privacy /terms; do
  check_url "$p" ""
done

echo ""
echo "[robots.txt disallow]"
robots=$(curl -s "$BASE/robots.txt" 2>/dev/null)
if grep -q "Disallow: /api/" <<< "$robots" && \
   grep -q "Disallow: /mockup/" <<< "$robots" && \
   grep -q "Disallow: /hero-lab/" <<< "$robots" && \
   grep -q "Disallow: /kit" <<< "$robots"; then
  echo "  ✅ Disallow /api/, /mockup/, /hero-lab/, /kit"
else
  echo "  ❌ robots.txt missing required disallow entries"
  fail=$((fail+1))
fi

echo ""
echo "[Forbidden keywords (production grep)]"
APP="$(cd "$(dirname "$0")/.." && pwd)/apps/web"
if [[ -d "$APP" ]]; then
  hits=$(grep -RIn --include='*.{ts,tsx,md,mdx}' \
    --exclude-dir=node_modules --exclude-dir=.next \
    -E '병원|시술|치료|의료|SEO 상단등록|검색 상단 노출|1위 보장' "$APP" 2>/dev/null || true)
  if [[ -n "$hits" ]]; then
    echo "$hits"
    echo "  ❌ 금기어 발견"
    fail=$((fail+1))
  else
    echo "  ✅ 금기어 0건"
  fi
fi

echo ""
echo "============================"
if [[ $fail -eq 0 ]]; then
  echo "✅ SEO Manifest: PASS"
  exit 0
else
  echo "❌ SEO Manifest: $fail failure(s)"
  exit 1
fi
