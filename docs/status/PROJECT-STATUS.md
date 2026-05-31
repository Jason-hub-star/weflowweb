# Project Status — WEFLOW

> 단일 출처: 지금 어디까지 왔는지, 무엇을 진행 중인지, 다음 액션은 무엇인지.  
> 모든 갱신은 코드 변경 직후 같이 한다.

업데이트: 2026-05-31 (문서관리 얇게 정리: 최신 상태는 1화면, 상세 증거는 daily/DEC로 분리)  
오너: claude (다음 세션 시 인계)

---

## Current Phase

**Phase 4 후반 / Phase 9 완료 — 공개 핵심 라우트는 JSON SSOT 중심으로 정리됐고, `/contact/form` 자체 멀티스텝 진단 폼이 동작한다. Vercel 배포 게이트는 `/kit` production 404, sitemap 실라우트 정렬, hydration smoke까지 통과했다. 브랜드 깊이감 배경 실험은 로컬 검증 완료 상태이며, 다음 우선순위는 `/reservation`·`/landing`·`/products`와 실제 env/사업자/법무 정보 주입이다.**

문서 운영 원칙: 이 파일은 최신 상태와 다음 행동만 얇게 유지한다. 세부 변경 증거는 `docs/daily/`, 결정 근거는 `docs/status/DECISION-LOG.md`, 라우트 진행률은 `docs/status/PAGE-UPGRADE-BOARD.md`, 남은 거짓말/placeholder는 `docs/status/MISSING-AND-UNIMPLEMENTED.md`가 맡는다.

---

## Active Tracks

- [x] Doc OS/스킬/검증 스크립트 구축 완료 — 세부 이력은 `docs/daily/05-29/`·`docs/daily/05-30/`
- [x] 디자인·Hero·컬러 결정 완료 — DEC-041, DEC-051 기준. `/mockup`은 폐기, `/hero-lab`은 내부 박물관으로 보존
- [x] 공개 핵심 JSON SSOT 완료 — `home`·`story`·`services`·`pricing`·`cases`·`reviews`·`blog`·`notice`·`faq`·`privacy`·`terms`
- [x] 워크숍 리팩터 완료 — schema 분리, 주요 primitive/motion `/kit` 등재, `check-assets` 추가(DEC-057)
- [x] Hero 영상·카카오 채널 fallback 적용 완료
- [x] `/contact/form` 자체 멀티스텝 진단 폼 + Resend 통합 완료 (DEC-058) — 네이버 폼 폐기, 15문항 5스텝 압축, localStorage draft 복원, dryrun 폴백
- [x] Vercel 배포 준비 1차 게이트 통과 (DEC-059) — `/kit` production 404, OG/sitemap/robots 정렬, hydration smoke console error 0건
- [x] 브랜드 깊이감 배경 실험 완료 (DEC-060) — subtle blueprint grid, `brand-depth-section`, `premium-card`, 1440/768/375 smoke 통과
- [ ] `/reservation`·`/landing`·`/products` 라우트 미작성
- [ ] 출시 전 게이트 잔여 — 폼/API, SEO/분석, 사업자·법무·실제 후기/파트너 콘텐츠

---

## Next Actions

1. 남은 라우트 작성: `/reservation` · `/landing` · `/products`
2. 폼/API 보강: Google Sheets append · BotID · 예약 API
3. 실제 배포 env 주입: Resend/OWNER_EMAIL/Sheets/분석 ID/검색 인증 메타
4. 더미/placeholder 정리: 사업자 정보, 당근 URL, 실제 후기·파트너·법무 문구
5. Vercel 프로젝트 연결 후 preview URL에서 `BASE_URL=<preview> pnpm check:seo` + 375/768/1440 재검수

---

## Pending Decisions

- 사업자 정보 — `lib/config.ts.company` (상호·대표·사업자번호·통신판매업번호·주소·전화·이메일)
- 당근플레이스 URL — `config.social.daangn` (`#TODO_DAANGN`)
- 최종 마감일 — 주인님 결정 대기
- Hero 5안 중 선정안 — **B+ 1차 선정 잠금 (DEC-041)**
- 컬러 SSOT — DEC-051 기준 블루 라이트 톤, `/mockup` 시안 라우트는 폐기됨
- 약관·개인정보처리방침 최종본 — 표준 템플릿 후 검토
- 분석 ID 6종 — GA_MEASUREMENT_ID / GTM_ID / META_PIXEL_ID / NAVER_WISETOOL_ID / KAKAO_PIXEL_ID / RESEND_API_KEY
- Google Sheets 스프레드시트 ID + 서비스 계정 JSON
- weflowlab.kr DNS Vercel 연결 시점

---

## Verification Commands

```bash
bash scripts/check-weflow-harness.sh      # Doc OS 필수 파일 검증
bash scripts/check-design-tokens.sh       # 하드코딩 hex 0건
pnpm typecheck && pnpm lint && pnpm build # 코드 검증
bash scripts/check-doc-sync.sh            # 코드 ↔ 문서 정합성
bash scripts/check-seo-manifest.sh        # 메타 · sitemap · OG
```

---

## Recent Changes (최근 5개만)

상세 변경 증거는 `docs/daily/05-31/`와 `docs/status/DECISION-LOG.md`를 우선 확인한다. 이 섹션은 다음 작업자가 흐름만 잡을 수 있도록 5개 이내로 유지한다.

- 2026-05-31 FAQ 로봇 자산 교체: Imagen 기반 FAQ 전용 로봇 PNG 생성·투명화·512/256 리사이징, 기본 기호 아이콘 제거/대체, FAQ 화면 smoke 확인.
- 2026-05-31 브랜드 깊이감 배경 실험: subtle blueprint grid, hero/CTA band depth, 가격·문의·후기·사례 premium-card 표면 적용.
- 2026-05-31 Vercel 배포 준비: `/kit` production 404, 기본 OG endpoint 추가, sitemap/robots/check-seo 실라우트 기준 정렬, hydration smoke 통과.
- 2026-05-31 문서관리 얇게 정리: 상태판 3종과 Architecture/Map/Plan을 현재 코드 기준으로 정렬.
- 2026-05-31 가격 페이지 비교 중심 재구성: 상단 중복 문구 제거, `<PricingQuickCompare>` 추가, 금기 SEO 보장 표현 보정.

---

## 한줄정리

**문서 관리는 얇게 재정렬 완료 — 최신 상태는 이 파일 상단, 라우트 진행은 PAGE-UPGRADE-BOARD, 남은 placeholder는 MISSING-AND-UNIMPLEMENTED, 세부 증거는 daily에 둔다. 다음 실작업은 `/reservation`·`/landing`·`/products`와 실제 배포 env 주입이에요.**
