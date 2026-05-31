import Link from 'next/link';
import { config } from '@/lib/config';

/**
 * 사이트 푸터 — 24시간 문의 상담(tel:) + 4 소셜 채널 + 사업자 정보 + 법무 링크.
 * 사업자 정보는 #TODO 마킹된 config.company에서 주입.
 */
export function SiteFooter() {
  const { company, social, brand } = config;
  return (
    <footer className="mt-32 border-t border-line bg-surface-soft">
      <div className="mx-auto grid max-w-7xl gap-10 px-[var(--space-gutter)] py-12 md:grid-cols-4">
        <div>
          <p className="text-h3 font-bold ko-heading">{brand.name}</p>
          <p className="mt-2 text-small text-muted ko-relaxed">{brand.slogan}</p>
          <Link
            href={company.phoneTel}
            className="text-small text-accent-strong mt-5 inline-flex items-center gap-2 font-mono font-semibold hover:underline"
          >
            <span aria-hidden>📞</span>
            <span>24시간 상담 {company.phone}</span>
          </Link>
        </div>

        <div>
          <p className="text-eyebrow text-muted">팔로우</p>
          <ul className="mt-3 space-y-1 text-small">
            <li>
              <Link
                href={social.kakaoChannelUrl}
                target="_blank"
                rel="noreferrer"
                className="text-muted hover:text-text"
              >
                카카오톡 채널
              </Link>
            </li>
            <li>
              <Link
                href={social.instagram}
                target="_blank"
                rel="noreferrer"
                className="text-muted hover:text-text"
              >
                인스타그램
              </Link>
            </li>
            <li>
              <Link
                href={social.facebook}
                target="_blank"
                rel="noreferrer"
                className="text-muted hover:text-text"
              >
                페이스북
              </Link>
            </li>
            <li>
              <Link
                href={social.blog}
                target="_blank"
                rel="noreferrer"
                className="text-muted hover:text-text"
              >
                네이버 블로그
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-eyebrow text-muted">사업자 정보</p>
          <dl className="mt-3 space-y-1 text-small text-muted">
            <div className="flex gap-2">
              <dt className="font-medium text-text">상호</dt>
              <dd>{company.legalName}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="font-medium text-text">대표</dt>
              <dd>{company.representative}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="font-medium text-text">사업자등록번호</dt>
              <dd className="font-mono">{company.businessNumber}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="font-medium text-text">주소</dt>
              <dd>{company.address}</dd>
            </div>
          </dl>
        </div>

        <div>
          <p className="text-eyebrow text-muted">법무</p>
          <ul className="mt-3 space-y-1 text-small">
            <li>
              <Link href="/privacy" className="text-muted hover:text-text">
                개인정보 처리방침
              </Link>
            </li>
            <li>
              <Link href="/terms" className="text-muted hover:text-text">
                이용약관
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line py-4 text-center text-small text-muted">
        © {new Date().getFullYear()} {brand.name}. All rights reserved.
      </div>
    </footer>
  );
}
