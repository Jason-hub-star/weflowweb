# Design System Ops — WEFLOW

> 디자인 토큰·컴포넌트 변경 시 운영 절차.

작성: 2026-05-29

---

## 1. 토큰 변경 흐름

1. `packages/tokens/src/colors.ts` (또는 typography/spacing/...) 수정
2. `pnpm --filter @weflow/tokens build` (TS export 재생성)
3. `apps/web/tailwind.config.ts`가 `packages/tokens`을 import하므로 별도 매핑 불필요
4. `pnpm dev` 로컬 검수
5. `bash scripts/check-design-tokens.sh` — 하드코딩 hex 0건 검증
6. `docs/ref/DESIGN-TOKENS.md` 갱신
7. `docs/status/PROJECT-STATUS.md` Recent Changes에 한 줄 추가
8. `/sync-design-tokens` 슬래시 명령으로 영향 컴포넌트 자동 추적

---

## 2. 색 시안 비교 (`/mockup/[id]`)

1. `app/mockup/[id]/page.tsx`에서 `data-mockup={id}` 속성 설정
2. CSS에서 `[data-mockup="1"]`, `[data-mockup="2"]`, `[data-mockup="3"]` 별 변수 override
3. 같은 페이지 콘텐츠(홈 미니 또는 가격)를 3안 모두 동일하게 렌더
4. `/mockup-compare` 슬래시 명령으로 비교 리포트

---

## 3. Hero 시안 비교 (`/hero-lab/[id]`)

1. `components/hero/Hero{SplitForm,FullBleed,CardMosaic,LiveDashboard,Carousel}.tsx` 작성
2. `app/hero-lab/[id]/page.tsx`에서 id로 분기
3. `/hero-lab/page.tsx` 인덱스에서 5안 카드 그리드 + 각 비용·차별화 표시
4. agent-browser-verify로 1440·375 검수

---

## 4. 컴포넌트 신규 추가 규칙

- 색은 시맨틱 클래스(`bg-bg`, `text-text` 등)만
- 간격은 `var(--space-*)`, `var(--stack-*)`만
- 라운드는 `var(--radius-*)`만
- 모션은 `packages/tokens/src/motion.ts`의 `reveal`, `staggerChildren` 우선 사용
- 컴포넌트는 `components/` 하위 분류 폴더에 위치

---

## 5. 사용자 경고 — 디자인 변경 발생 시

- `Why?`: 결정 근거를 `DECISION-LOG.md`에 DEC로 추가
- `Impact`: 영향받는 페이지·컴포넌트 목록
- `Sync`: DESIGN-TOKENS.md + COLOR-VARIANTS.md(필요 시) 갱신

---

## 한줄정리

**토큰 수정 → 빌드 → check-design-tokens.sh → 문서 갱신 → 슬래시 명령 검증 순으로. 컴포넌트는 시맨틱 클래스만 사용해요.**
