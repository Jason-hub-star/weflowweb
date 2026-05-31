# Patterns — Framer Motion Recipes

> WEFLOW 표준 모션 레시피. 모든 컴포넌트는 이 안에서 골라 사용.

---

## 1. 표준 변수

```ts
// packages/tokens/src/motion.ts
export const motion = {
  ease: [0.25, 0.1, 0.25, 1] as const,
  duration: { enter: 0.7, hover: 0.18, exit: 0.4 },
  stagger: 0.12,
} as const;
```

## 2. Section Reveal (가장 많이 사용)

```tsx
import { motion as m } from 'framer-motion';

<m.div
  initial={{ opacity: 0, y: 24 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: '0px 0px -10% 0px' }}
  transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
>
  ...
</m.div>
```

## 3. Stagger Grid

```tsx
const parent = {
  whileInView: { transition: { staggerChildren: 0.12 } },
};
const child = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

<m.ul variants={parent} initial="initial" whileInView="whileInView" viewport={{ once: true }}>
  {items.map((it) => (
    <m.li key={it.id} variants={child}>
      <Card>{it.title}</Card>
    </m.li>
  ))}
</m.ul>
```

## 4. Hover Lift (CTA / 카드)

```tsx
<m.button
  whileHover={{ y: -2 }}
  whileTap={{ scale: 0.98 }}
  transition={{ duration: 0.18 }}
>
  무료 진단 신청
</m.button>
```

## 5. Drawer (모바일 메뉴)

```tsx
<AnimatePresence>
  {open && (
    <m.aside
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
    />
  )}
</AnimatePresence>
```

## 6. Live Dashboard 토스트 (Hero D)

```tsx
<AnimatePresence>
  {visible && (
    <m.div
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -16, opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      · 김XX님이 무료진단 신청
    </m.div>
  )}
</AnimatePresence>
```

## 7. Reduced Motion

모든 모션 컴포넌트는 `useReducedMotion()` 체크 또는 CSS `@media (prefers-reduced-motion: reduce)`로 자동 우회.

```tsx
import { useReducedMotion } from 'framer-motion';
const reduced = useReducedMotion();
const variants = reduced ? { initial: {}, whileInView: {} } : reveal;
```
