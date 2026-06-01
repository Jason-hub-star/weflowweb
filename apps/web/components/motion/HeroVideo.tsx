'use client';

import Image from 'next/image';
import { useEffect, useRef, useState, type ReactNode } from 'react';

/**
 * Hero 영상 배경 섹션 — 선택된 브랜드 영상 또는 poster 위에 카피·CTA 오버레이.
 *
 * 자동 처리:
 * - 좌측 카피 가독성 위해 from-bg/85 그라데이션 (좌→우)
 * - 우측 하단 영상 워터마크(Gemini Veo 등) 자리 from-bg/80 그라데이션 (하·우)
 *   + 마스코트 슬롯이 워터마크 위에 절대 위치로 가림
 * - autoPlay · muted · playsInline (iOS 호환)
 * - poster는 next/image로 우선 로드하고, video poster 속성은 중복 다운로드 방지를 위해 쓰지 않는다.
 * - 모바일·reduced-motion에서는 영상 DOM 자체를 렌더하지 않아 mp4 다운로드를 피한다.
 * - **첫 사이클 1.5~end 재생 (도입부 1.5초 스킵) → 끝나면 부드러운 페이드 직후 4초 지점으로 점프해서 재재생 → 무한 반복**
 *   페이드 트랜지션(220ms)이 점프 컷을 가려서 자연스럽게 이어짐. 모든 브라우저 안정 동작.
 * - aria-hidden (장식 영상)
 * - 영상 src 비어있으면 poster 또는 그라데이션 placeholder fallback
 *
 * 사용처: 홈 Hero · 광고 LP · 서비스 PageHero
 */
export function HeroVideo({
  src,
  poster,
  posterAlt = '',
  children,
  mascot,
  visualOverlay,
  minHeight = '80vh',
  className,
  videoMinWidth = 768,
}: {
  src?: string;
  poster?: string;
  posterAlt?: string;
  children: ReactNode;
  mascot?: ReactNode;
  visualOverlay?: ReactNode;
  minHeight?: string;
  className?: string;
  videoMinWidth?: number;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [canPlayVideo, setCanPlayVideo] = useState(false);

  useEffect(() => {
    if (!src) return;

    const media = window.matchMedia(`(min-width: ${videoMinWidth}px)`);
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setCanPlayVideo(media.matches && !reduced.matches);
    const rafId = window.requestAnimationFrame(sync);

    media.addEventListener('change', sync);
    reduced.addEventListener('change', sync);

    return () => {
      window.cancelAnimationFrame(rafId);
      media.removeEventListener('change', sync);
      reduced.removeEventListener('change', sync);
    };
  }, [src, videoMinWidth]);

  useEffect(() => {
    if (!canPlayVideo) return;
    const v = videoRef.current;
    if (!v) return;
    // 첫 사이클 시작 지점 (영상 도입부 1.5초 스킵)
    const START_AT_SECONDS = 1.5;
    // 정재생이 끝나면 이 지점으로 점프해서 다시 정재생
    const REPLAY_FROM_SECONDS = 4;
    const FADE_MS = 220;
    let fadeTimer: number | undefined;
    let restoreTimer: number | undefined;

    const seekToStart = () => {
      if (!Number.isFinite(v.duration) || v.duration <= START_AT_SECONDS + 0.1) return;
      try {
        v.currentTime = START_AT_SECONDS;
      } catch {
        // currentTime 설정 실패 시 무시 (모바일 Safari 일부 케이스)
      }
      void v.play();
    };

    const handleLoadedMetadata = () => seekToStart();
    if (v.readyState >= 1) {
      // 이미 metadata 로드된 케이스 (HMR/캐시)
      seekToStart();
    } else {
      v.addEventListener('loadedmetadata', handleLoadedMetadata);
    }

    const handleEnded = () => {
      // 영상이 너무 짧으면 loop 의미 없음 — native ended 상태 유지
      if (!Number.isFinite(v.duration) || v.duration <= REPLAY_FROM_SECONDS + 0.1) return;
      // 페이드 아웃 → 점프 → 즉시 페이드 인 (점프 컷을 페이드로 가림)
      v.style.opacity = '0.25';
      fadeTimer = window.setTimeout(() => {
        v.currentTime = REPLAY_FROM_SECONDS;
        void v.play();
        restoreTimer = window.setTimeout(() => {
          v.style.opacity = '1';
        }, 30);
      }, FADE_MS);
    };

    v.addEventListener('ended', handleEnded);
    return () => {
      v.removeEventListener('loadedmetadata', handleLoadedMetadata);
      v.removeEventListener('ended', handleEnded);
      if (fadeTimer !== undefined) window.clearTimeout(fadeTimer);
      if (restoreTimer !== undefined) window.clearTimeout(restoreTimer);
    };
  }, [src, canPlayVideo]);

  return (
    <section
      style={{ minHeight }}
      className={[
        'relative isolate flex items-center overflow-hidden',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {/* Layer 1 — optimized poster first, then desktop video when allowed */}
      {poster ? (
        <Image
          src={poster}
          alt={posterAlt}
          aria-hidden={posterAlt === ''}
          fill
          preload
          fetchPriority="high"
          sizes="100vw"
          className="absolute inset-0 -z-20 object-cover"
        />
      ) : (
        <div
          aria-hidden
          className="bg-bg from-accent-soft absolute inset-0 -z-20 bg-gradient-to-br to-transparent"
        />
      )}

      {src && canPlayVideo ? (
        <video
          ref={videoRef}
          src={src}
          preload="metadata"
          autoPlay
          muted
          playsInline
          aria-hidden
          className="absolute inset-0 -z-20 h-full w-full object-cover motion-safe:transition-opacity motion-safe:duration-[220ms]"
        />
      ) : null}

      {/* Layer 2 — 좌측 카피 가독성 그라데이션 */}
      <div
        aria-hidden
        className="from-bg/85 via-bg/40 absolute inset-0 -z-10 bg-gradient-to-r to-transparent"
      />

      {/* Layer 4 — 좌측 카피·CTA */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-[var(--space-gutter)] py-[var(--space-section)]">
        <div className="max-w-2xl">{children}</div>
      </div>

      {/* Layer 5 — 우측 인터랙티브 카드 오버레이 */}
      {visualOverlay ? (
        <div className="pointer-events-auto absolute inset-y-0 right-0 z-20 hidden w-[46vw] max-w-2xl items-center pr-[var(--space-gutter)] xl:flex">
          {visualOverlay}
        </div>
      ) : null}

      {/* Layer 6 — 우측 하단 마스코트 (워터마크 점유) */}
      {mascot ? (
        <div className="pointer-events-none absolute bottom-6 right-6 z-30 select-none md:bottom-10 md:right-10">
          {mascot}
        </div>
      ) : null}
    </section>
  );
}
