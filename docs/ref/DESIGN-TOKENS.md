# Design Tokens — WEFLOW

> **단일 진실 출처**. 이 문서와 `packages/tokens/src/*`가 토큰의 SSOT.  
> 컴포넌트는 시맨틱 클래스(`bg-bg`, `text-text`, `bg-accent` 등)만 사용. hex 0건.

작성: 2026-05-29 · 잠금: DEC-010/011/017/018

---

## 1. 컬러

### CSS 변수 (이 정의가 `packages/tokens/src/theme.css`에 그대로 들어감)
```css
:root {
  /* Surface */
  --bg: #f7f8f5;
  --surface: #ffffff;
  --surface-soft: #eef3ef;

  /* Text */
  --text: #111713;
  --muted: #5d675f;

  /* Lines */
  --line: rgba(17, 23, 19, 0.12);

  /* Brand Accent */
  --accent: #20b486;
  --accent-strong: #0b8065;
  --accent-soft: rgba(32, 180, 134, 0.14);
  --mint-rgb: 32 180 134;

  /* Highlight */
  --amber: #f0b94f;

  /* Status */
  --success: #20b486;
  --warning: #f0b94f;
  --error: #dc4a4a;
}
```

### 시맨틱 클래스 매핑 (Tailwind config 직접 import)
| 클래스 | 변수 |
|---|---|
| `bg-bg` | `var(--bg)` |
| `bg-surface` | `var(--surface)` |
| `bg-surface-soft` | `var(--surface-soft)` |
| `bg-accent` | `var(--accent)` |
| `bg-accent-strong` | `var(--accent-strong)` |
| `bg-accent-soft` | `var(--accent-soft)` |
| `text-text` | `var(--text)` |
| `text-muted` | `var(--muted)` |
| `text-accent` | `var(--accent)` |
| `border-line` | `var(--line)` |

### 사용 규칙
- **CTA Primary**: `bg-accent text-surface`
- **CTA Secondary**: `border-line text-text hover:bg-surface-soft`
- **카드**: `bg-surface border border-line`
- **강조 배지(WEFLOW CARE)**: `bg-amber/15 text-amber border border-amber/30`

---

## 2. 타이포

### 폰트
- **Sans**: Pretendard Variable (본문, 헤드라인)
- **Mono**: Geist Mono (숫자, 가격, 코드, 타임스탬프, ID)

`next/font/local` 또는 `pretendard` 패키지로 self-host, `font-display: swap`.

### 스케일 (clamp 기반)
```css
.text-display { font-size: clamp(2.4rem, 6vw, 4.8rem); line-height: 1.04; letter-spacing: -0.02em; }
.text-h1      { font-size: clamp(2.0rem, 4.4vw, 3.2rem); line-height: 1.14; letter-spacing: -0.015em; }
.text-h2      { font-size: clamp(1.6rem, 3.2vw, 2.4rem); line-height: 1.20; letter-spacing: -0.01em; }
.text-h3      { font-size: clamp(1.25rem, 2.2vw, 1.6rem); line-height: 1.28; }
.text-body    { font-size: clamp(1.0rem, 1.1vw, 1.0625rem); line-height: 1.6; }
.text-small   { font-size: 0.875rem; line-height: 1.5; }
.text-eyebrow { font-size: 0.8125rem; letter-spacing: 0.08em; text-transform: uppercase; }
```

### 한국어 유틸 (`packages/tokens/src/typography.ts` export)
```css
.ko-tight    { line-height: 1.24; word-break: keep-all; overflow-wrap: break-word; }
.ko-relaxed  { line-height: 1.72; word-break: keep-all; overflow-wrap: break-word; }
.ko-heading  { letter-spacing: -0.01em; word-break: keep-all; overflow-wrap: break-word; }
```

전역 `body`에도 `word-break: keep-all` + `overflow-wrap: break-word`를 적용한다.  
한국어 문장에는 `ko-heading`, `ko-relaxed`, `ko-tight` 중 하나를 붙이고, 긴 가격·지표·칩은 `break-keep` 또는 `break-words`를 함께 쓴다.

---

## 3. 간격

```css
:root {
  --space-section: clamp(64px, 8vw, 120px);
  --space-gutter:  clamp(20px, 4vw, 40px);
  --stack-1: 4px;
  --stack-2: 8px;
  --stack-3: 12px;
  --stack-4: 20px;
  --stack-5: 32px;
  --stack-6: 56px;
}
```

- 섹션 간격: `py-[var(--space-section)]`
- 콘텐츠 좌우 여백: `px-[var(--space-gutter)]`
- 카드 내부 스택: `space-y-[var(--stack-4)]`

---

## 4. 라운드

```css
:root {
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 20px;
  --radius-pill: 9999px;
}
```

- 폼 입력: `rounded-[var(--radius-sm)]`
- 카드 기본: `rounded-[var(--radius-md)]`
- 패널/모달: `rounded-[var(--radius-lg)]`
- 버튼: `rounded-[var(--radius-pill)]` 또는 `--radius-md`

---

## 5. 모션

### 표준
- **easing**: `[0.25, 0.1, 0.25, 1]` (cubic-bezier, fabric-smooth)
- **duration**: enter `0.7s` · hover `0.18s` · exit `0.4s`
- **stagger**: `0.12s` (그리드 reveal)

### Framer Motion variants
```ts
export const motion = {
  ease: [0.25, 0.1, 0.25, 1] as const,
  duration: { enter: 0.7, hover: 0.18, exit: 0.4 },
  stagger: 0.12,
};

export const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '0px 0px -10% 0px' },
  transition: { duration: motion.duration.enter, ease: motion.ease },
};

export const staggerChildren = {
  initial: {},
  whileInView: {},
  viewport: { once: true },
  transition: { staggerChildren: motion.stagger },
};
```

### 접근성
- `@media (prefers-reduced-motion: reduce)` 일 때 transform/opacity 애니메이션 비활성.

---

## 6. 그림자

```css
:root {
  --shadow-sm: 0 1px 2px rgba(17, 23, 19, 0.04);
  --shadow-md: 0 4px 12px rgba(17, 23, 19, 0.06);
  --shadow-lg: 0 12px 32px rgba(17, 23, 19, 0.08);
  --shadow-hover: 0 6px 16px rgba(32, 180, 134, 0.18);
}
```

---

## 7. "AI스럽지 않은" 디테일

- **Grain overlay**: SVG noise 3% opacity, 전체 `body::after`
- **Blueprint depth background**: 전역 `body`에 토큰 기반 subtle grid + gradient wash. 공개 페이지 기본 바탕으로 쓰며, 과한 orb/blob 장식은 사용하지 않는다.
- **Mesh gradient**: hero·section 일부 배경에 `radial-gradient(circle at 80% 20%, rgba(var(--mint-rgb)/0.08), transparent 60%)`
- **Brand depth section**: hero·CTA 같은 큰 밴드에는 `.brand-depth-section`을 추가해 mask 처리된 grid를 얹는다.
- **Premium card surface**: 전환 핵심 카드·폼 표면은 `.premium-card` / `.premium-card-hover`로 border highlight + layered shadow를 공통 적용한다.
- **Selection**:
  ```css
  ::selection { background: var(--accent-soft); color: var(--text); }
  ```
- **한국어 글꼴 메트릭 분리**: 영문 line-height 1.4, 한국어 line-height 1.6 기본
- **포커스 링**: `outline: 2px solid var(--accent); outline-offset: 2px; border-radius: inherit;`

---

## 8. 토큰 → Tailwind 매핑

`apps/web/tailwind.config.ts`에서 `packages/tokens` 가져와 `theme.extend.colors`, `borderRadius`, `boxShadow`, `transitionTimingFunction`에 매핑.

---

## 9. 검증

`scripts/check-design-tokens.sh`로 다음 검사:
- `apps/web/` 안에 `#[0-9a-fA-F]{3,8}` 패턴 0건 (테스트 파일 제외)
- `rgba\(` 직접 사용 0건 (토큰 정의 외)
- 모든 컴포넌트가 시맨틱 클래스 사용

---

## 한줄정리

**컬러·타이포·간격·라운드·모션·그림자·디테일 모두 CSS 변수 + Tailwind 시맨틱 클래스로만 — 하드코딩 hex 0건, 컴포넌트는 토큰만 본다.**
