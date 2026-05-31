---
name: check-seo
description: SEO 체크리스트 일괄 실행 — sitemap·robots·OG·JSON-LD·메타·키워드 검증
trigger: 배포 전 또는 SEO 관련 변경 후
---

# /check-seo

## 무엇을 하나
1. `bash scripts/check-seo-manifest.sh` 실행
2. `/sitemap.xml`, `/robots.txt` 응답 200
3. 기본 OG 이미지 응답 200
4. JSON-LD 4종(Organization · Service · FAQPage · Review) valid
5. 페이지별 title/description 길이 검증 (30~60 / 80~160)
6. 인증 메타 2종(Google · Naver) 존재
7. 금기어(병원·시술·치료·의료·`SEO 상단등록`·`검색 상단 노출`) grep 0건
8. 키워드 메타가 명세 표현 그대로인지 (`docs/ref/SEO-STRATEGY.md` 비교)
9. 보고: 실패 항목 + 권장 조치

## 실패 시
- 배포 차단
- `docs/daily/MM-DD/seo-failure-<topic>.md` 생성
