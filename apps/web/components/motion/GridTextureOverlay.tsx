/**
 * 사선 그리드 텍스처 overlay (paper.design 영향).
 * SVG pattern을 fade fade-in 마스크로 입힘.
 *
 * Server Component (interaction 없음).
 */
export function GridTextureOverlay({
  opacity = 0.08,
  size = 28,
  rotate = 35,
  className = '',
}: {
  opacity?: number;
  size?: number;
  rotate?: number;
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{
        opacity,
        backgroundImage: `repeating-linear-gradient(${rotate}deg, var(--accent) 0 1px, transparent 1px ${size}px)`,
        maskImage:
          'radial-gradient(circle at 80% 20%, black 0%, transparent 60%)',
        WebkitMaskImage:
          'radial-gradient(circle at 80% 20%, black 0%, transparent 60%)',
      }}
    />
  );
}
