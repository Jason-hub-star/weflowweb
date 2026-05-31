'use client';

import { useScroll, useTransform, type MotionValue } from 'framer-motion';
import type { RefObject } from 'react';

/**
 * 스크롤 진행도 기반 transform 헬퍼.
 *
 * 주의: TS noUncheckedIndexedAccess 때문에 maps의 키를 컴파일 타임에 고정해야 한다.
 * 따라서 maps는 최대 3 필드 (imgScale, copyOpacity, copyY)로 표준화한다.
 * 새 필드가 필요하면 이 hook에 직접 추가 (재사용 위해).
 */
type ScrollRange = readonly [number, number];

export function useScrollLinkedValue({
  ref,
  imgScale,
  copyOpacity,
  copyY,
}: {
  ref: RefObject<HTMLElement | null>;
  imgScale?: ScrollRange;
  copyOpacity?: ScrollRange;
  copyY?: ScrollRange;
}): {
  progress: MotionValue<number>;
  imgScale: MotionValue<number>;
  copyOpacity: MotionValue<number>;
  copyY: MotionValue<number>;
} {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const scaleRange: number[] = imgScale ? [imgScale[0], imgScale[1]] : [1, 1];
  const opacityRange: number[] = copyOpacity ? [copyOpacity[0], copyOpacity[1]] : [1, 1];
  const yRange: number[] = copyY ? [copyY[0], copyY[1]] : [0, 0];

  return {
    progress: scrollYProgress,
    imgScale: useTransform(scrollYProgress, [0, 1], scaleRange),
    copyOpacity: useTransform(scrollYProgress, [0, 1], opacityRange),
    copyY: useTransform(scrollYProgress, [0, 1], yRange),
  };
}
