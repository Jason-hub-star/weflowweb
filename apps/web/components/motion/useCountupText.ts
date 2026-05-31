'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * useCountupText — 문자열 안의 숫자 부분만 부드럽게 보간하고 다시 끼워넣는다.
 *
 * 가격/메트릭/% 표시 등에서 "월 189,000원", "+180%", "92%" 같은 문자열을
 * 그대로 받아 숫자 자릿수만 countup. ko-KR 콤마 포맷 자동.
 *
 * @param target 표시할 최종 문자열 (숫자 포함)
 * @param durationMs 보간 지속 시간. 0이면 즉시 (reduced-motion 분기)
 */
export function useCountupText(target: string, durationMs: number): string {
  const [display, setDisplay] = useState(target);
  const prev = useRef(target);

  useEffect(() => {
    if (target === prev.current) return;
    if (durationMs === 0) {
      const rafId = requestAnimationFrame(() => {
        prev.current = target;
        setDisplay(target);
      });
      return () => cancelAnimationFrame(rafId);
    }
    const num = (s: string) => parseFloat(s.replace(/[^\d.]/g, '')) || 0;
    const from = num(prev.current);
    const to = num(target);
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs);
      const ease = 1 - Math.pow(1 - t, 3);
      const v = Math.round(from + (to - from) * ease);
      const formatted = v.toLocaleString('ko-KR');
      setDisplay(target.replace(/[\d,]+(\.\d+)?/, formatted));
      if (t < 1) raf = requestAnimationFrame(tick);
      else prev.current = target;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, durationMs]);

  return display;
}
