type Size = 'sm' | 'md' | 'lg';

const SIZE: Record<Size, string> = {
  sm: 'h-8 w-8 text-small',
  md: 'h-10 w-10 text-body',
  lg: 'h-14 w-14 text-h3',
};

export function Avatar({
  src,
  alt,
  name,
  size = 'md',
}: {
  src?: string;
  alt?: string;
  name: string;
  size?: Size;
}) {
  const initial = name.trim().charAt(0).toUpperCase() || '·';
  if (src) {
    return (
      // 인라인 img: next/image는 마케팅 페이지에서 LCP 이미지에만 사용
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt ?? name}
        className={[
          'rounded-pill border-line bg-surface inline-block border object-cover',
          SIZE[size],
        ].join(' ')}
      />
    );
  }
  return (
    <span
      aria-label={name}
      role="img"
      className={[
        'rounded-pill bg-accent-soft text-accent inline-flex items-center justify-center font-semibold',
        SIZE[size],
      ].join(' ')}
    >
      {initial}
    </span>
  );
}
