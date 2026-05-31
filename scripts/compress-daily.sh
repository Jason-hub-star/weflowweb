#!/usr/bin/env bash
# compress-daily.sh — docs/daily/MM-DD/ → docs/weekly/YYYY-Www.md 압축
# TaillogToss 패턴 채택

set -u
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DAILY_DIR="$ROOT/docs/daily"
WEEKLY_DIR="$ROOT/docs/weekly"

mkdir -p "$WEEKLY_DIR"

TODAY=$(date +%m-%d)
YEAR=$(date +%Y)
WEEK=$(date +%V)
WEEK_FILE="$WEEKLY_DIR/${YEAR}-W${WEEK}.md"
DAY_DIR="$DAILY_DIR/$TODAY"

if [[ ! -d "$DAY_DIR" ]]; then
  echo "[skip] no entries for $TODAY"
  exit 0
fi

# 주간 파일 헤더가 없으면 생성
if [[ ! -f "$WEEK_FILE" ]]; then
  cat > "$WEEK_FILE" <<HEADER
# ${YEAR}-W${WEEK}

자동 압축 — \`scripts/compress-daily.sh\`

HEADER
fi

# 오늘 분이 이미 들어 있으면 스킵
DATE_LONG=$(date +"%Y-%m-%d")
if grep -q "^## $DATE_LONG" "$WEEK_FILE" 2>/dev/null; then
  echo "[skip] $DATE_LONG already compressed into $WEEK_FILE"
  exit 0
fi

DAY_OF_WEEK_KO=$(date +%w)
case "$DAY_OF_WEEK_KO" in
  0) DOW="일";; 1) DOW="월";; 2) DOW="화";; 3) DOW="수";;
  4) DOW="목";; 5) DOW="금";; 6) DOW="토";;
esac

{
  echo ""
  echo "## $DATE_LONG ($DOW)"
  echo ""
  for f in "$DAY_DIR"/*.md; do
    [[ -f "$f" ]] || continue
    bn=$(basename "$f" .md)
    echo "### $bn"
    # 'Done today' 섹션의 체크박스만 추출
    awk '/^## Done today/,/^## /' "$f" | grep -E '^- ' || echo "(no 'Done today' entries)"
    echo ""
  done
} >> "$WEEK_FILE"

echo "✅ Compressed $TODAY into $WEEK_FILE"
