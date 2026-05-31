'use client';

import { useEffect, useState } from 'react';

/**
 * 스크롤 velocity 감지 — Lenis가 활성이면 그 인스턴스를 사용,
 * 아니면 native scroll의 frame 간 delta로 계산.
 *
 * Returns velocity (px/frame, signed), throttled to RAF.
 */
export function useLenisVelocity() {
  const [velocity, setVelocity] = useState(0);

  useEffect(() => {
    let last = window.scrollY;
    let raf = 0;
    const tick = () => {
      const cur = window.scrollY;
      const delta = cur - last;
      last = cur;
      setVelocity(delta);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return velocity;
}
