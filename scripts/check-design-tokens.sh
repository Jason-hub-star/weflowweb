#!/usr/bin/env bash
# check-design-tokens.sh — 하드코딩 hex/rgb 0건 검증 (apps/web/ 안)
# 토큰 정의 파일과 docs/ 는 검사에서 제외

set -u
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
APP="$ROOT/apps/web"
TOKENS_TS="$ROOT/packages/tokens/src"
fail=0

if [[ ! -d "$APP" ]]; then
  echo "[skip] apps/web not initialized yet"
  exit 0
fi

echo "[Check] hex colors in apps/web (excluding tokens.css)"
# 6자리 또는 3자리 hex, # 다음 hex chars
hits=$(grep -RIn --include='*.{ts,tsx,js,jsx,css,scss}' \
  --exclude-dir=node_modules --exclude-dir=.next \
  -E '#[0-9a-fA-F]{3,8}' "$APP" 2>/dev/null \
  | grep -v 'globals.css' || true)

if [[ -n "$hits" ]]; then
  echo "$hits"
  hit_count=$(echo "$hits" | wc -l | tr -d ' ')
  echo "  ❌ $hit_count 건 발견 — packages/tokens의 시맨틱 클래스 사용"
  fail=$((fail+1))
else
  echo "  ✅ hex 하드코딩 0건"
fi

echo ""
echo "[Check] rgba/rgb 하드코딩 (apps/web)"
rgb_hits=$(grep -RIn --include='*.{ts,tsx,js,jsx,css,scss}' \
  --exclude-dir=node_modules --exclude-dir=.next \
  -E 'rgba?\(' "$APP" 2>/dev/null \
  | grep -v 'globals.css' || true)

if [[ -n "$rgb_hits" ]]; then
  echo "$rgb_hits"
  rgb_count=$(echo "$rgb_hits" | wc -l | tr -d ' ')
  echo "  ⚠ $rgb_count 건 — 토큰 변수로 변경 권장"
fi

echo ""
echo "============================"
if [[ $fail -eq 0 ]]; then
  echo "✅ Design Tokens: PASS"
  exit 0
else
  echo "❌ Design Tokens: $fail violation(s)"
  exit 1
fi
