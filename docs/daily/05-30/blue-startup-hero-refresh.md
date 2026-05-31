# 05-30 — Blue Startup Hero Refresh

## 변경

- Imagen 시안 5번을 홈 Hero 기준 이미지로 선정.
- 선택 원본을 프로젝트 내부 자산으로 복사하고, 런타임용 5종으로 리사이징.
  - `apps/web/public/assets/weflow-blue-startup-master.png` — 원본 보존
  - `apps/web/public/assets/weflow-blue-startup-hero.png` — Hero poster
  - `apps/web/public/assets/weflow-blue-startup-service-workflow.png`
  - `apps/web/public/assets/weflow-blue-startup-proof-board.png`
  - `apps/web/public/assets/weflow-blue-startup-consultation.png`
- `<HeroManagedCards>` 신규 motion primitive 추가.
- `<HeroVideo>`에 `visualOverlay` 슬롯 추가.
- 홈 Hero에 클릭 가능한 제작·리포트·유지관리 카드 배치.
- `/kit#motion-signatures`에 `<HeroManagedCards>` 라이브 카드 등재.
- 홈 문구를 비개발자도 이해하기 쉬운 “맡기면 알아서 처리” 톤으로 전환.
- 공개 UI 예시의 치과/내원/DENTAL 표현을 세무 사무소/상담으로 교체.
- 영상 생성용 프롬프트를 `docs/ref/HERO-VIDEO-PROMPT.md`에 기록.

## 확인

- `bash scripts/check-file-size.sh` PASS
- `pnpm typecheck` PASS
- `pnpm lint` PASS
- `pnpm build` PASS — SSG 26/26
- `bash scripts/check-weflow-harness.sh` PASS
- `bash scripts/check-doc-sync.sh` PASS
- `bash scripts/check-design-tokens.sh` PASS
- 금기어 앱 표면 grep PASS — `치과|내원|DENTAL|병원|의료|치료|시술` 0건
- 홈 1440/375 Playwright 검수 PASS — 가로 overflow 0
- 모바일 Hero 카드 보강 후 Playwright 검수 PASS — 375px에서 visible interactive button 4개, 클릭 후 `aria-pressed` 및 본문 변경 확인
- `/kit#motion-signatures` Playwright 검수 PASS — `<HeroManagedCards>` 카드 등재 확인

## 증거

- 홈 1440 캡처: `docs/daily/05-30/evidence/blue-startup/weflow-blue-home-1440.png`
- 홈 375 캡처: `docs/daily/05-30/evidence/blue-startup/weflow-blue-home-375.png`
- 홈 375 모바일 카드 캡처: `docs/daily/05-30/evidence/blue-startup/weflow-blue-home-375-mobile-cards.png`
