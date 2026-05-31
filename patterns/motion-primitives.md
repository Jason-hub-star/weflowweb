# Motion & Interaction Primitives

> 재사용 가능한 모션·인터랙션 단위 카탈로그. AGENTS.md Hard Rule 11 / DEC-044.  
> 페이지·섹션 컴포넌트는 이 primitives의 **조합**만 한다. 직접 motion 코드 박지 않는다.

위치: `apps/web/components/motion/`  
**라이브 카탈로그**: [`/kit`](http://localhost:3010/kit) (라이브 데모 + 복붙 코드 + props 표) — DEC-045 / AGENTS Hard Rule 12

---

## 카탈로그

| Primitive | 종류 | 사용처 |
|---|---|---|
| `SmoothScrollProvider` | 글로벌 | layout.tsx (이미 적용) |
| `StickyHeaderWatcher` | 글로벌 | layout.tsx (이미 적용) |
| `useMouseParallax(strength?)` | hook | 어떤 요소든 mouse follow |
| `useScrollLinkedValue({ range })` | hook | scroll 진행도 기반 transform |
| `useLenisVelocity()` | hook | Lenis scroll 속도 감지 |
| `<MagneticButton>` | 컴포넌트 | CTA·아이콘 (자석 효과) |
| `<MaskRevealText>` | 컴포넌트 | 헤드라인 (gradient mask 드러남) |
| `<FloatingPill>` | 컴포넌트 | 키워드·태그 풍선 (scale+blur depth, devfive 시그니처) |
| `<MeshGradientBackground>` | 컴포넌트 | hero·CTA 섹션 배경 (paper-design wrapper) |
| `<GridTextureOverlay>` | 컴포넌트 | 섹션 배경 텍스처 (paper.design 영향) |
| `<ScrollCue>` | 컴포넌트 | hero 하단 스크롤 안내 (Lenis 인지) |
| `<DeveloperBuildBoard>` | 컴포넌트 | 홈 `BUILT BY DEVELOPERS` 섹션의 제작 작업판 + 검수 체크리스트 |
| `<ServiceSuccessStack>` | 컴포넌트 | 홈 Services · `/story` 서비스 성공 패턴 · `/kit#servicesuccessstack` |

---

## 규칙

1. **시맨틱 토큰만 사용** — hex 0건
2. **reduced-motion 자동 우회** — `useReducedMotion()` 체크 또는 CSS `@media`
3. **props로 강도 조절** — `intensity`, `range` 등 (기본값은 hero 적합)
4. **모바일 친화** — 마우스 인터랙션은 `@media (pointer: coarse)` 자동 우회
5. **타입 strict** — 모든 props에 명시적 TS 타입

---

## 추가 작업 시

새 모션·인터랙션이 필요할 때:
1. 비슷한 primitive가 있는지 확인
2. 없으면 신규 primitive 만들기 (사용처 1곳이라도)
3. 카탈로그 표에 1행 추가
4. 사용처에서 import해 조합

직접 페이지에 motion 코드 박는 행위 = ❌ (Hard Rule 11 위반)

---

## 한줄정리

**모션·인터랙션은 components/motion/에 모이고, 페이지는 조합만 — 재사용·일관성·접근성 한 곳에서 보장.**
