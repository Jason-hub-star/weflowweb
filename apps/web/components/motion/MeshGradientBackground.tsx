'use client';

import { MeshGradient } from '@paper-design/shaders-react';

/**
 * WebGL Mesh Gradient — paper-design/shaders-react wrapper.
 * 기본은 WEFLOW 시맨틱 색(mint·deep·ivory) 사용. props로 override 가능.
 *
 * 사용처: hero 영역, CTA 섹션, 가격 강조 카드 배경.
 *
 * 모바일/저성능 디바이스에서는 paper-design이 자체적으로 정적 fallback 렌더링.
 */
export function MeshGradientBackground({
  colors = ['#f7f8f5', '#20b486', '#0b8065', '#ffffff'],
  speed = 0.18,
  className = '',
  style,
}: {
  colors?: string[];
  speed?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 ${className}`}
      aria-hidden
      style={style}
    >
      <MeshGradient colors={colors} speed={speed} style={{ width: '100%', height: '100%' }} />
    </div>
  );
}
