# Deploy Ops — WEFLOW

> Vercel 배포·도메인 연결·env 관리 절차.

작성: 2026-05-29

---

## 1. 초기 1회 (Phase 1 Day 1)

```bash
# 로컬에서
pnpm install
pnpm dev   # localhost:3000 확인

# Vercel 연결 (주인님 또는 권한 보유자가 실행)
vercel login
vercel link            # 새 프로젝트 생성
vercel env pull        # .env.local 받기
```

---

## 2. 환경 변수 주입

Vercel 대시보드 또는 CLI:
```bash
vercel env add RESEND_API_KEY production
vercel env add RESEND_FROM_EMAIL production
vercel env add OWNER_EMAIL production
vercel env add GOOGLE_SHEETS_ID production
vercel env add GOOGLE_SERVICE_ACCOUNT_JSON production
vercel env add NEXT_PUBLIC_GA_MEASUREMENT_ID production preview
vercel env add NEXT_PUBLIC_GTM_ID production preview
vercel env add NEXT_PUBLIC_META_PIXEL_ID production
vercel env add NEXT_PUBLIC_NAVER_WISETOOL_ID production
vercel env add NEXT_PUBLIC_KAKAO_PIXEL_ID production
vercel env add NEXT_PUBLIC_KAKAO_CHANNEL_URL production preview
vercel env add GOOGLE_SITE_VERIFICATION production
vercel env add NAVER_SITE_VERIFICATION production
```

- production만 vs preview 분리 정책: 픽셀은 production만, 카카오 채널·인증은 둘 다.

---

## 3. 미리보기 배포

```bash
git push   # GitHub 연결 후
# 또는
vercel             # CLI 직접 (preview)
```

각 PR마다 preview URL 발급 → agent-browser-verify로 시각 검수.

---

## 4. 프로덕션 배포 (출시일)

`bash scripts/check-weflow-harness.sh && bash scripts/check-design-tokens.sh && bash scripts/check-seo-manifest.sh && pnpm typecheck && pnpm lint && pnpm build` 모두 통과한 뒤에만 진행.

```bash
vercel --prod          # 명시적 production 배포
# 또는 Vercel 대시보드에서 promote
```

---

## 5. 도메인 연결

1. Vercel 프로젝트 → Settings → Domains
2. `weflowlab.kr`, `www.weflowlab.kr` 추가
3. 호스팅 업체 DNS:
   - `weflowlab.kr` A 76.76.21.21 (Vercel 안내값)
   - `www.weflowlab.kr` CNAME cname.vercel-dns.com
4. SSL 자동 발급 확인
5. `https://weflowlab.kr` 200 응답 확인
6. `/sitemap.xml`, `/robots.txt` 응답 확인

---

## 6. 롤백

```bash
vercel rollback                  # 이전 production으로
# 또는 대시보드 Promotions → 이전 배포 promote
```

DECISION-LOG.md에 `DEC-XXX: Rollback to <deployment>` 기록.

---

## 7. 모니터링

- Vercel Analytics — 실시간 페이지 뷰
- Vercel Speed Insights — Core Web Vitals
- Vercel Logs — `/api/inquiry` 등 함수 로그
- GA4 — 종합 분석

이슈 발생 시 `docs/daily/MM-DD/incident-*.md`에 기록.

---

## 한줄정리

**vercel link → env 주입 → preview 검증 → check-* 모두 통과 → vercel --prod → 도메인 연결 → 모니터링 순. 롤백은 DECISION-LOG 기록 필수.**
