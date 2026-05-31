---
name: weflow-component-extract
description: WEFLOW 컴포넌트(primitives·motion·layout) 추출 → /kit 등재 → 검증까지 9단계 자동 진행
user_invocable: true
tags: [components, kit, primitives, motion, weflow]
trigger: "재사용 가능한 React 컴포넌트를 components/{primitives|motion|layout}/로 추출하고 /kit에 등재해야 할 때"
version: 1
---

# WEFLOW Component Extract

이번 세션(2026-05-30)에 23번 반복된 컴포넌트 추출 절차를 1개 스킬로 묶는다.
근거: `docs/ops/skill-recommendations.md` §1.1.

## Use When

- 새 primitive(Button·Card·Input 류)나 motion(MascotOrbit·Marquee 류) 추출 시
- 페이지 코드 안에 인라인으로 박힌 재사용 가능한 UI를 분리할 때
- AGENTS Hard Rule 11(재사용 → primitives) · 12(/kit 등재) 만족이 필요할 때

## Inputs

```yaml
name: 컴포넌트 이름 (PascalCase, 예: MascotOrbit, Button)
type: primitive | motion | layout
category: /kit 카테고리 id (예: primitives, motion-signatures, page-sections)
purpose: 한 줄 설명
useClient: boolean  # 'use client' 필요 여부 (Tabs·Accordion 류 true)
props:
  - { name: string, type: string, default?: string, desc?: string }
demo: 라이브 demo에 들어갈 가벼운 사용 예시 (선택)
```

## Steps

### Step 1: Dedup 확인
- `components/{type}/{Name}.tsx` 존재 여부 확인
- 존재하면 사용자에게 "교체 / 신규 / 취소" 질문

### Step 2: 컴포넌트 파일 작성
- 경로: `apps/web/components/{primitives|motion|layout}/{Name}.tsx`
- 규칙:
  - 하드코딩 hex 0건 (Tailwind 시맨틱 토큰만: `bg-accent`·`text-text`·`border-line` 등)
  - reduced-motion 정적 fallback (motion 류)
  - a11y: aria-* · role · keyboard 챙김
  - props 타입 명시 (export type Props도 가능)
- `useClient: true`만 상단 `'use client'`

### Step 3: index.ts barrel export
- `apps/web/components/{type}/index.ts`에 export 줄 추가
- 타입도 함께 export (필요 시)

### Step 4: /kit 등재
- `apps/web/app/kit/page.tsx`에 import 추가
- CATEGORIES 배열에 카테고리 없으면 신설
- `<KitCard>` 등재:
  - 이름 (mono · `code` 스타일)
  - 카테고리 chip
  - import 경로 (`@/components/{type}` 형식)
  - 한 줄 설명
  - 라이브 demo 박스
  - props 표 (details로 접기)
  - 코드 스니펫 + Copy 버튼

### Step 5: typecheck + build
```bash
pnpm typecheck && pnpm build
```
실패 시 Step 2~4 회귀.

### Step 6: agent-browser 시각 검수
```bash
agent-browser --session kit set viewport 1440 900
agent-browser --session kit open http://localhost:3010/kit#{category}
agent-browser --session kit wait --load networkidle
agent-browser --session kit screenshot docs/daily/{MM-DD}/evidence/kit-{category}-{Name}.png
agent-browser --session kit close
```
- ERROR_OVERLAY 0건 확인
- 라이브 demo 영역에 컴포넌트가 보이는지 확인

### Step 7: daily 일지 작성
- `docs/daily/{MM-DD}/component-{kebab-name}.md` 신규
- 템플릿:
  ```markdown
  # {Name} 컴포넌트 추출 — {YYYY-MM-DD}
  - 경로: `apps/web/components/{type}/{Name}.tsx`
  - 카테고리: `{category}`
  - props: {...}
  - 등재 위치: `/kit#{category}`
  - 검증: typecheck PASS · build PASS · agent-browser ERROR 0건
  - evidence: docs/daily/{MM-DD}/evidence/kit-{category}-{Name}.png
  ```

### Step 8: 문서 동기화
- `docs/status/PROJECT-STATUS.md` Recent Changes 1줄 추가
- 필요 시 `docs/ref/INTERACTION-CATALOG.md` 행 ✅ 승급
- 필요 시 `docs/ref/PAGE-COMPONENT-MAP.md`에 해당 라우트 매핑 추가
- `docs/status/MISSING-AND-UNIMPLEMENTED.md` 항목 ✅ 처리

### Step 9: 보고
- 작업 요약 + evidence 경로 + 다음 후보 1~2개 제시

## Outputs

- `components/{type}/{Name}.tsx`
- `components/{type}/index.ts` 갱신
- `app/kit/page.tsx` import + KitCard 추가
- daily 일지 1개
- evidence 캡처 1~3장
- 상태 문서 갱신

## Verify

- [ ] 하드코딩 hex 0건 (`grep -E '#[0-9a-fA-F]{3,6}' apps/web/components/{type}/{Name}.tsx`)
- [ ] reduced-motion fallback (motion 한정)
- [ ] index.ts export 추가
- [ ] /kit#{category}에 KitCard 보임
- [ ] typecheck + build PASS
- [ ] agent-browser 1440 캡처 + ERROR 0건
- [ ] daily 일지 + PROJECT-STATUS 갱신

## Failure / Fallback

- typecheck 실패: import 경로 또는 prop 타입 점검 → Step 2 복귀
- /kit hydration 경고: KitCard 안 RSC ↔ Client 경계 점검
- agent-browser 미실행: `pnpm dev`가 3010에서 떠 있는지 우선 확인
- 이름 충돌: 이미 같은 이름 있으면 PostfixVariant로 변경 후 사용자 컨펌

## 한줄정리

**Name · type · category · props만 주면 코드 → /kit 등재 → 검증 → 문서까지 9단계로 자동화돼요.**
