---
date: 2026-05-30
page: /mockup/[1..4]
phase: 정공법 Task #1
stage: Done
owner: claude
---

# `/mockup/[1..4]` 4안 라이브 라우트 작성

## 작업 요약

주인님 정공법 트랙 Task #1. Color 시안 4안을 라이브로 비교할 수 있는 라우트 작성.
같은 콘텐츠에 `data-mockup` attribute로 CSS 토큰만 교체하여 비교 비용 최소화.

## 파일

- `apps/web/app/mockup/[id]/page.tsx` (생성, 약 240줄)

## 구조

- `MockupPicker` — 상단 sticky nav, 1·2·3·4 라이브 전환, `aria-current="page"`
- `MockupHero` — eyebrow + display H1 + sub + 2 CTA(무료진단/사례) + 3 benefit pill
- `ServiceCards` — 4 카드(랜딩제작·광고연동·예약운영·관리자수정)
- `WhyChecklist` — 4 신뢰 항목, 시맨틱 ✓ 마크
- `CtaSection` — 큰 닫는 CTA
- `MockupFooter` — 시안 메타 표시, 시안 4 선정 시 DEC-018 재논의 안내

## 검증

| 단계 | 결과 |
|---|---|
| `pnpm typecheck` | PASS (cache miss → 3.1s) |
| `pnpm build` | PASS · SSG 4/4 prerender (`/mockup/1·2·3·4`) |
| HTTP curl | 1·2·3·4 → 200 · 99 → 404(notFound) |
| agent-browser 1440 | 4안 캡처 + `ERROR_OVERLAY` 0건 |
| agent-browser 375 | 시안 4 모바일 캡처 OK |
| 토큰 매칭(시안 1) | `--bg`=`rgb(247,248,245)` ✅ · `--accent`=`rgb(32,180,134)` ✅ |
| Picker nav | 4 링크 전부 표시 · `aria-current` 정상 |
| H1 텍스트 | "문의로 이어지는 홈페이지를 만듭니다" 정상 |

## Evidence

- `evidence/mockup/mockup-1-1440.png` (299KB)
- `evidence/mockup/mockup-2-1440.png` (299KB)
- `evidence/mockup/mockup-3-1440.png` (299KB)
- `evidence/mockup/mockup-4-1440.png` (137KB · 다크 압축률 높음)
- `evidence/mockup/mockup-4-375.png` (92KB)

## 설계 결정

- **`'use cache'` 미사용**: cacheComponents 플래그 미활성. 활성 시 전체 layout·page에 영향 커서 보류. `generateStaticParams`만으로 4안 SSG prerender 충분.
- **하드코딩 hex 0건**: 모든 색은 Tailwind 시맨틱 토큰(`bg-bg`, `text-text`, `bg-accent`, `border-line` 등). data-mockup으로 토큰 값만 교체 (Hard Rule 4).
- **noindex**: `metadata.robots = { index: false, follow: false }` — 시안 비교 페이지는 검색 노출 차단.
- **Picker는 sticky + backdrop-blur**: 스크롤 중에도 4안 전환 가능.
- **시안 4 안내문**: 다크 only이므로 footer에 DEC-018(라이트 only) 재논의 필요성 명시.

## 다음 액션

- ✅ 주인님 결정: 시안 4 (Dark Charcoal + Mint) — "보라색 사용 안 함"
- ✅ DEC-049 append + DEC-018·DEC-047 Superseded by 표기
- ✅ dark-charcoal SSOT 승격 + 라이트 자산 8개 삭제 + 다크 자산 4개 배치
- ✅ `[data-mockup='4']` palette 9 토큰 SSOT 정렬 (mint `#65e6c7`)
- → Phase 3 Foundation Primitives 16개 추출 시작 (Task #3)

## Update 2026-05-30 — Task #2 ✅ Color 선정

| 단계 | 결과 |
|---|---|
| 라이트 자산 삭제 | `apps/web/public/assets/weflow-devfive-*.png` 4개 + `design-agent-package/` 라이트 SSOT 제거 |
| 다크 자산 배치 | `apps/web/public/assets/weflow-dark-charcoal-*.png` 4개 |
| SSOT 승격 | `design-agent-package-dark-charcoal/` → `design-agent-package/`로 rename |
| 코드 경로 | `hero/shared.ts` heroAssets 4 경로 `dark-charcoal-*` |
| 토큰 정렬 | `[data-mockup='4']` 9 토큰 SSOT 일치 (`#101417` · `#65e6c7` · ...) |
| Label 변경 | mockup picker "4 · Dark Charcoal + Lilac" → "Mint" |
| 검증 토큰 측정 | `bg=#101417` ✅ · `text=#f4fbfa` ✅ · `accent=#65e6c7` ✅ |
| 빌드 | typecheck PASS · build SSG 4/4 prerender · ERROR_OVERLAY 0건 |
| Evidence | `evidence/mockup/mockup-4-mint-{1440,375}.png` 2장 |

## 한줄정리

dark-charcoal SSOT가 palette·자산·금지사항을 완전히 잠가놓아서 추측 0건으로 잠금 완료, 다음은 Phase 3 Foundation Primitives 16개 추출.
