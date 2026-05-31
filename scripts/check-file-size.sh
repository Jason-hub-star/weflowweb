#!/usr/bin/env bash
# check-file-size.sh — WEFLOW 앱 코드 파일 400줄 초과 방지

set -u
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
LIMIT="${1:-400}"
fail=0

echo "[File Size Guard] limit: ${LIMIT} lines"

while IFS= read -r file; do
  lines=$(wc -l < "$file" | tr -d ' ')
  if [[ "$lines" -gt "$LIMIT" ]]; then
    rel="${file#$ROOT/}"
    printf "  ❌ %4d %s\n" "$lines" "$rel"
    fail=$((fail+1))
  fi
done < <(
  find "$ROOT/apps/web/app" "$ROOT/apps/web/components" "$ROOT/apps/web/lib" "$ROOT/packages/tokens/src" \
    \( -path "*/node_modules" -o -path "*/.next" -o -path "*/.turbo" \) -prune -o \
    -type f \( -name "*.ts" -o -name "*.tsx" \) -print
)

if [[ "$fail" -eq 0 ]]; then
  echo "✅ File Size Guard: PASS"
  exit 0
fi

echo "❌ File Size Guard: $fail file(s) over ${LIMIT} lines"
exit 1
