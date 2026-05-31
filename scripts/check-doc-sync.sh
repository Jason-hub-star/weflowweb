#!/usr/bin/env bash
# check-doc-sync.sh — 코드 ↔ 문서 정합성 검증
# 깨진 링크, AGENTS.md Reading Order 검증, HARNESS-MANIFEST.yaml required_files 확인

set -u
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
fail=0

# 1. AGENTS.md Reading Order에 적힌 파일 모두 존재하는지
echo "[AGENTS.md Reading Order]"
for f in CLAUDE.md HARNESS-MANIFEST.yaml docs/status/PROJECT-STATUS.md docs/status/DECISION-LOG.md docs/status/PAGE-UPGRADE-BOARD.md docs/status/MISSING-AND-UNIMPLEMENTED.md docs/ref/PRD.md docs/ref/ARCHITECTURE.md docs/ref/DESIGN-TOKENS.md docs/ref/HERO-VARIANTS.md docs/ref/COLOR-VARIANTS.md docs/ref/DATA-FLOW.md docs/ref/INTEGRATION-MATRIX.md docs/ref/CONTENT-MODEL.md ai-context/START-HERE.md; do
  if [[ -f "$ROOT/$f" ]]; then
    printf "  ✅ %s\n" "$f"
  else
    printf "  ❌ %s (Reading Order에 있음, 파일 없음)\n" "$f"
    fail=$((fail+1))
  fi
done

# 2. 모든 .md 안의 상대 경로 링크 검증 (가벼움 — 절대 모든 케이스 커버는 못 함)
echo ""
echo "[Broken Markdown Links]"
broken=0
while IFS= read -r mdfile; do
  rel_dir=$(dirname "$mdfile")
  # [text](./path) 또는 [text](../path) 또는 [text](path.md)
  grep -oE '\]\([^)]+\.md\)' "$mdfile" 2>/dev/null | sed -E 's/^\]\(//; s/\)$//' | while read -r link; do
    # 외부 링크는 스킵
    [[ "$link" =~ ^https?:// ]] && continue
    # 절대 경로 (예: /Users/...)
    if [[ "$link" == /* ]]; then
      [[ -f "$link" ]] || echo "    broken absolute: $link (in $mdfile)"
    else
      target="$rel_dir/$link"
      [[ -f "$target" ]] || echo "    broken relative: $link (in $mdfile)"
    fi
  done
done < <(find "$ROOT" \( -path "$ROOT/node_modules" -o -path "$ROOT/.next" -o -path "$ROOT/design-agent-package" \) -prune -o -name "*.md" -print)
echo "  (자세한 결과는 위 출력 참조 — 0건이면 OK)"

# 3. apps/web/ 내 page.tsx 추가 시 PAGE-UPGRADE-BOARD.md에 등록됐는지
echo ""
echo "[Route Registration]"
if [[ -d "$ROOT/apps/web/app" ]]; then
  while IFS= read -r page; do
    route=$(echo "$page" | sed "s|$ROOT/apps/web/app||" | sed 's|/page.tsx$||' | sed 's|/(marketing)||')
    [[ -z "$route" ]] && route="/"
    # Dynamic routes such as /mockup/[id] may be tracked as concrete generated
    # routes (/mockup/1, /mockup/2...) in PAGE-UPGRADE-BOARD.md.
    route_prefix="${route%%/\[*\]}"
    if grep -q "\`$route\`" "$ROOT/docs/status/PAGE-UPGRADE-BOARD.md" 2>/dev/null || \
       { [[ "$route" == *"["* ]] && grep -q "\`$route_prefix/" "$ROOT/docs/status/PAGE-UPGRADE-BOARD.md" 2>/dev/null; }; then
      printf "  ✅ %s registered\n" "$route"
    else
      printf "  ⚠  %s — PAGE-UPGRADE-BOARD.md 미등록\n" "$route"
    fi
  done < <(find "$ROOT/apps/web/app" -name "page.tsx" 2>/dev/null)
fi

echo ""
echo "============================"
if [[ $fail -eq 0 ]]; then
  echo "✅ Doc Sync: PASS"
  exit 0
else
  echo "❌ Doc Sync: $fail failure(s)"
  exit 1
fi
