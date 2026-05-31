'use client';

import { useEffect } from 'react';
import { useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

/**
 * 마우스 parallax — 화면 중심 기준 마우스 위치를 normalize(-1..1) →
 * spring으로 smooth 처리해 motion value(x, y) 반환.
 *
 * 모바일(pointer: coarse)이나 reduced-motion에서는 0 고정.
 *
 * @param strength px 범위 (기본 12 = ±12px 이동)
 */
export function useMouseParallax(strength = 12) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const reduce = useReducedMotion();
  const sx = useSpring(x, { stiffness: 120, damping: 20, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 120, damping: 20, mass: 0.6 });

  useEffect(() => {
    if (reduce) return;
    const coarse = window.matchMedia('(pointer: coarse)').matches;
    if (coarse) return;

    const onMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1; // -1..1
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      x.set(nx * strength);
      y.set(ny * strength);
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [reduce, strength, x, y]);

  return { x: sx, y: sy };
}
