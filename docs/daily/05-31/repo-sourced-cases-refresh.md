# 05-31 — Repo-Sourced Cases + Blue Mascot Refresh

## 변경

- Hero 오른쪽 하단 마스코트 교체:
  - 생성 원본: `/Users/family/.codex/generated_images/019e7887-526f-7d01-aca4-d75361e6a6a4/ig_0ff5c1c61e0873ea016a1b088171e08191b0697d70d14257a4.png`
  - 프로젝트 자산: `apps/web/public/mascot/weflow-blue-guide-floating.png`
- `BUILT BY DEVELOPERS` 캐릭터 교체:
  - 생성 원본: `/Users/family/.codex/generated_images/019e7887-526f-7d01-aca4-d75361e6a6a4/ig_0ff5c1c61e0873ea016a1b08c72dcc81918d0678b3ae452ab6.png`
  - 프로젝트 자산: `apps/web/public/mascot/weflow-blue-developer-hero.png`
- 홈 `BUILT BY DEVELOPERS` 섹션 캐릭터 크기 확대 + 블루 글로우 배경 추가.
- 홈 Success cases와 `/cases` 카드의 placeholder 이미지를 주인님 로컬 레포 기반 목업 이미지로 교체.
- `HomeCaseCard`를 `app/_home` 기능 폴더 안에 분리해 400줄 파일 크기 가드 유지.

## 마스코트 Imagen 프롬프트

- Hero floating: 새 WEFLOW 블루 스타트업 히어로 이미지와 같은 크림색 3D 로봇, 블루/민트 포인트, 태블릿 리포트, 손 흔드는 포즈, flat `#ff00ff` chroma-key 배경.
- Developer hero: 같은 3D 로봇 톤, 노트북과 코드/웹 UI 패널을 들고 실제 개발자가 제작하는 느낌, flat `#ff00ff` chroma-key 배경.
- 후처리: `remove_chroma_key.py`로 투명 PNG 변환.

## 사용한 로컬 레포 소스

| WEFLOW 자산 | 원본 |
|---|---|
| `weflow-case-taillog-saas.png` | `/Users/family/jason/TaillogToss/tailog-hero-carousel-desktop.png` |
| `weflow-case-daykervibe-portal.png` | `/Users/family/jason/daykervibe/output/playwright/01.png` |
| `weflow-case-dang-mobile.png` | `/Users/family/jason/Dang/public/main.png` |
| `weflow-case-vibehub-dashboard.png` | `/Users/family/jason/vibehub-media/public/taillog/screen_landing.png` |
| `weflow-case-vibe-community.png` | `/Users/family/jason/vibe/stitch_homepage/homepage/screen.png` |
| `weflow-case-rc-guide.png` | `/Users/family/jason/autonomous-rc-car/screenshots/01-home.png` |

## 생성된 사례 자산

- `apps/web/public/assets/cases/weflow-case-taillog-saas.png` — 1200×675
- `apps/web/public/assets/cases/weflow-case-daykervibe-portal.png` — 1200×675
- `apps/web/public/assets/cases/weflow-case-dang-mobile.png` — 1200×675
- `apps/web/public/assets/cases/weflow-case-vibehub-dashboard.png` — 1200×675
- `apps/web/public/assets/cases/weflow-case-vibe-community.png` — 1200×675
- `apps/web/public/assets/cases/weflow-case-rc-guide.png` — 1200×675

## 검증 결과

- `pnpm typecheck` — PASS
- `pnpm lint` — PASS
- `pnpm build` — PASS, SSG 22/22
- `bash scripts/check-file-size.sh` — PASS
- `bash scripts/check-design-tokens.sh` — PASS
- `bash scripts/check-doc-sync.sh` — PASS
- `bash scripts/check-weflow-harness.sh` — PASS
- `rg -n "cases-placeholder" apps/web/content apps/web/app` — 0건
- `rg -n "병원|의료|치료|시술|치과|내원|DENTAL" apps/web/content apps/web/app apps/web/components` — 0건

## 브라우저 증거

- `/` 1440 full page: `docs/daily/05-31/evidence/repo-cases/weflow-repo-cases-home-1440.png`
- `/` 1440 Success cases viewport: `docs/daily/05-31/evidence/repo-cases/weflow-repo-cases-home-cases-1440.png`
- `/` 768 Success cases viewport: `docs/daily/05-31/evidence/repo-cases/weflow-repo-cases-home-768.png`
- `/` 375 Success cases viewport: `docs/daily/05-31/evidence/repo-cases/weflow-repo-cases-home-375.png`
- `/cases` 1440 filtered page: `docs/daily/05-31/evidence/repo-cases/weflow-repo-cases-page-1440.png`

Playwright 확인:
- `/` 1440/768/375: 새 Hero 마스코트, `BUILT BY DEVELOPERS` 마스코트, 사례 이미지 6개 로드.
- `/cases`: `미디어` 필터 전환 후 VibeHub 카드 1개 노출, 이미지 로드 정상.
- console error 0, horizontal overflow 0.
