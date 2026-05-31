# Patterns — Tailwind v4 + Self-hosted Tokens

> WEFLOW가 `packages/tokens` 패키지를 Tailwind에 연결하는 표준 방식.

---

## 1. Tailwind v4 `@theme inline`

`apps/web/app/globals.css`:
```css
@import "tailwindcss";
@import "@weflow/tokens/theme.css";   /* CSS variables 정의 */

@theme inline {
  --color-bg: var(--bg);
  --color-surface: var(--surface);
  --color-surface-soft: var(--surface-soft);
  --color-text: var(--text);
  --color-muted: var(--muted);
  --color-line: var(--line);
  --color-accent: var(--accent);
  --color-accent-strong: var(--accent-strong);
  --color-accent-soft: var(--accent-soft);
  --color-amber: var(--amber);
  --radius-sm: var(--radius-sm);
  --radius-md: var(--radius-md);
  --radius-lg: var(--radius-lg);
}
```

## 2. 시맨틱 클래스 사용

```tsx
<button className="bg-accent text-surface px-6 py-3 rounded-md hover:bg-accent-strong transition-colors">
  무료 진단 신청
</button>
```

- `bg-accent` = `var(--accent)`
- `text-surface` = `var(--surface)` (즉, 흰색)
- `rounded-md` = `var(--radius-md)`

## 3. 금기

- `bg-[#20b486]` 같은 임의 값 금지 (스크립트로 검사)
- `bg-green-500` 같은 Tailwind 기본 팔레트 금지 (시맨틱 토큰만)

## 4. Mesh Gradient

```tsx
<div className="
  before:absolute before:inset-0 before:pointer-events-none
  before:bg-[radial-gradient(circle_at_80%_20%,rgba(var(--mint-rgb)/0.08),transparent_60%)]
">
```

`--mint-rgb`로 alpha 조절.

## 5. Grain Overlay (전역)

`globals.css`:
```css
body::after {
  content: '';
  position: fixed;
  inset: 0;
  pointer-events: none;
  background-image: url('/grain.svg');
  opacity: 0.03;
  mix-blend-mode: multiply;
  z-index: 9999;
}
```
