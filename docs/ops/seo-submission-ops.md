# SEO Submission Ops — WEFLOW

> 검색엔진 인증·sitemap 제출·외부 등록 절차.

작성: 2026-05-29

---

## 1. 도메인 연결 직후 (출시 직전)

### Vercel 도메인
1. Vercel 대시보드에서 `weflowlab.kr`, `www.weflowlab.kr` 추가
2. DNS A/CNAME 레코드 추가 (호스팅 업체에서 작업)
3. SSL 자동 발급 확인

### Google Search Console
1. 속성 추가 → `https://weflowlab.kr`
2. HTML 메타 태그 인증값 받기
3. `.env`에 `GOOGLE_SITE_VERIFICATION=...` 추가
4. `vercel env add GOOGLE_SITE_VERIFICATION` (production)
5. 재배포 → 인증 클릭
6. sitemap 제출: `https://weflowlab.kr/sitemap.xml`

### Naver 서치어드바이저
1. 사이트 등록 → `https://weflowlab.kr`
2. 메타 태그 인증값 받기
3. `NAVER_SITE_VERIFICATION=...` 동일 절차
4. RSS·sitemap 등록

### 당근플레이스
- 별도 서비스. 주인님 계정으로 직접 등록.
- 사이트 푸터에 당근 링크 노출 (`config.social.daangn`).

---

## 2. OG 이미지 검증

- Facebook Sharing Debugger로 `/` OG 확인
- Twitter Card Validator
- Kakao 링크 미리보기 (카카오톡에서 직접)
- `@vercel/og` 페이지별 이미지가 캐시되는지 확인

---

## 3. 키워드 모니터링

출시 후 2주마다:
- Google Search Console "검색 분석" 키워드 확인
- Naver 서치어드바이저 검색 통계
- 노출/클릭 상위 키워드를 `docs/ref/SEO-STRATEGY.md`에 기록

---

## 4. 콘텐츠 갱신 → SEO 영향

| 변경 | 절차 |
|---|---|
| 새 사례·블로그·공지 .md 추가 | 자동 sitemap 갱신 + ISR `revalidateTag('cases')` 등 |
| 메인 카피 수정 | `DESIGN-TOKENS.md` 무관, `PRD.md` Brand Copy Lock 갱신 |
| 가격 변경 | JSON-LD Service offers 동기화 |
| 약관 갱신 | `version` frontmatter +1, `updatedAt` 변경 |

---

## 5. 점검 체크리스트

`scripts/check-seo-manifest.sh`로 매 배포 전 자동:
- [ ] sitemap.xml 200 + 모든 라우트 포함
- [ ] robots.txt 200 + disallow 명시
- [ ] 기본 OG 이미지 200
- [ ] JSON-LD 4종 valid
- [ ] title 길이 30~60자, description 80~160자
- [ ] 인증 메타 2종 존재
- [ ] 의료/병원 키워드 0건

---

## 한줄정리

**도메인 활성 → Google·Naver 메타 인증 → sitemap 제출 → 픽셀 5종 env 주입 → 외부 등록(당근). 매 배포 전 check-seo-manifest.sh.**
