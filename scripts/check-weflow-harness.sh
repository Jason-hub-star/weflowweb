#!/usr/bin/env bash
# check-weflow-harness.sh — Doc OS 필수 파일·디렉토리 검증
# 출처: HARNESS-MANIFEST.yaml

set -u
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
fail=0
warn=0

check_file() {
  local p="$ROOT/$1"
  if [[ ! -f "$p" ]]; then
    printf "  ❌ missing file: %s\n" "$1"
    fail=$((fail+1))
  else
    printf "  ✅ %s\n" "$1"
  fi
}

check_dir() {
  local p="$ROOT/$1"
  if [[ ! -d "$p" ]]; then
    printf "  ❌ missing dir : %s\n" "$1"
    fail=$((fail+1))
  else
    printf "  ✅ %s/\n" "$1"
  fi
}

echo "[Entry Files]"
for f in AGENTS.md CLAUDE.md HARNESS-MANIFEST.yaml README.md; do
  check_file "$f"
done

echo ""
echo "[docs/status]"
for f in PROJECT-STATUS.md DECISION-LOG.md PAGE-UPGRADE-BOARD.md MISSING-AND-UNIMPLEMENTED.md; do
  check_file "docs/status/$f"
done

echo ""
echo "[docs/ref]"
for f in PRD.md ARCHITECTURE.md DESIGN-TOKENS.md COLOR-VARIANTS.md HERO-VARIANTS.md INTEGRATION-MATRIX.md DATA-FLOW.md SEO-STRATEGY.md CONTENT-MODEL.md PROJECT-PLAN.md; do
  check_file "docs/ref/$f"
done

echo ""
echo "[docs/ops]"
for f in design-system-ops.md seo-submission-ops.md deploy-ops.md; do
  check_file "docs/ops/$f"
done

echo ""
echo "[ai-context]"
for f in START-HERE.md DESIGN-BRIEF.md project-context.md; do
  check_file "ai-context/$f"
done

echo ""
echo "[required dirs]"
for d in docs/daily docs/weekly docs/archive .claude/commands .claude/automations .claude/skills templates harnesses patterns scripts apps/web packages/tokens; do
  check_dir "$d"
done

echo ""
echo "[.claude/skills required]"
for s in doc-framework doc-sync project-planning design-to-code session-retro weflow-page weflow-component-extract weflow-doc-sync-batch weflow-file-size-guard weflow-korean-wrap-guard; do
  check_dir ".claude/skills/$s"
done

echo ""
echo "[.claude/skills/weflow-page sections]"
for s in 00-overview 10-ia-mapping 20-content-runbook 30-component-tree 40-qa-checklist 50-launch-evidence; do
  check_file ".claude/skills/weflow-page/sections/${s}.md"
done

echo ""
echo "[.claude/commands]"
for c in doc-sync sync-design-tokens check-seo mockup-compare hero-lab-compare handoff; do
  check_file ".claude/commands/${c}.md"
done

echo ""
echo "[scripts]"
for s in check-weflow-harness.sh check-design-tokens.sh check-korean-wrap.mjs check-file-size.sh check-seo-manifest.sh check-doc-sync.sh compress-daily.sh; do
  check_file "scripts/${s}"
done

echo ""
echo "============================"
if [[ $fail -eq 0 ]]; then
  echo "✅ Doc OS harness: PASS"
  exit 0
else
  echo "❌ Doc OS harness: $fail failures"
  exit 1
fi
