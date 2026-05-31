# WEFLOW Page Spec Template

새 라우트를 추가할 때 이 양식을 채워 `docs/ref/PROJECT-PLAN.md` 또는 `.claude/skills/weflow-page/sections/`에 첨부.

```markdown
# Page Spec — <Route Name>

## 1. Route
- Path: `/...`
- App 경로: `apps/web/app/...`
- 렌더: SSG / ISR / SSR / Client (택1)
- 메뉴 노출: yes/no, 위치

## 2. 목적
한 줄로 사용자가 이 페이지에서 무엇을 해야 하나.

## 3. IA
- 섹션 순서: Hero → ... → CTA
- 데스크톱 그리드: N 컬럼
- 모바일 그리드: N 컬럼

## 4. 콘텐츠 출처
- 정적: 인라인 / `lib/<file>.ts`
- 동적: `content/<folder>/*.md`
- 외부: <API>

## 5. 컴포넌트 트리
참조: `.claude/skills/weflow-page/sections/30-component-tree.md`

## 6. CTA
- Primary: <라벨> → <행동>
- Secondary: <라벨> → <행동>

## 7. 폼 (해당 시)
필드·zod 스키마·제출 endpoint

## 8. SEO
- title, description, OG, JSON-LD

## 9. 모션
- reveal / stagger / hover

## 10. QA 체크리스트
`.claude/skills/weflow-page/sections/40-qa-checklist.md` 참조

## 11. 출시 증거
`docs/daily/MM-DD/page-<slug>.md`
```
