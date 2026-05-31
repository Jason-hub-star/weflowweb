# Text Alignment Readability Pass

날짜: 2026-05-31

## 변경

- `/cases`, `/reviews`, `/blog`, `/notice` PageHero에 `align="center"` 적용.
- `/pricing` 플랜 카드에서 플랜명, 기존가, 가격, 부가세 안내만 중앙정렬.
- 가격 카드의 설명문, 기능 리스트, CTA 흐름은 좌측 기반으로 유지해 긴 텍스트 가독성을 보존.
- 후속 조정: 주인님 피드백에 따라 `/pricing` 플랜 카드의 설명문·기능 리스트까지 중앙정렬. 홈 PRICING 카드도 플랜명·가격·본문을 중앙정렬로 맞춤.
- 랜딩 섹션 정렬 확대: 홈 Services·Why·Cases·Reviews·Pricing 섹션 헤더 중앙정렬, HomeMascotBreak는 모바일 중앙/데스크톱 좌측 유지.
- `/services` PageHero 중앙정렬.
- `/cases`, `/blog`, `/reviews` 필터 칩 영역 중앙정렬.
- `<SiteBuildStoryboard>` 6단계 섹션 헤더 중앙정렬. desktop/mobile/static 세 변형 모두 반영, static의 단계 목록은 좌측 유지.
- `<HomeWhyCards>` 혜택 카드 내부 체크 아이콘·제목·본문 중앙정렬.
- `<DeveloperBuildBoard>` 마스코트 PNG가 우측 끝에 붙지 않도록 오른쪽 여백 추가.
- `/story` 텍스트 중앙정렬 확대: Naming 섹션, Timeline 헤더, 연도 헤더, 챕터 카드 본문을 중앙정렬.
- `/story` Timeline 겹침 해소 2차: 일반 세로 카드 변경은 롤백하고 `StickyStackCards` 유지. 단, 연도 헤더/챕터를 낱장으로 쌓지 않고 연도별 한 장 카드로 묶어 최신 연도 카드가 위에 보이게 함.
- `<StickyStackCards>`에 프레임별 `z-index: index + 1`을 추가해 뒤 카드보다 최신 카드가 위에 오도록 보강. `/kit`의 `<ServiceSuccessStack>`도 같은 primitive를 쓰므로 성공패턴과 동작을 맞춤.
- `/pricing` 카드 상단 영역 고정: 라벨/기존가/금액/안내 행을 `min-height` 블록으로 분리해 카드별 금액 baseline을 맞춤.
- `/pricing` ENTERPRISE 카드 넘침 방지: 라벨과 CTA 버튼 줄바꿈 허용, featured 카드 scale 제거로 금액 기준선 흔들림 제거.
- `/pricing` 가격 탐색 구조 보강: 추천 3 카드 → 전체 가격 빠른 비교(`PricingQuickCompare`) → 상세 카드 그룹 → 비교표 순서로 재배치. 빠른 비교에는 카테고리 필터, 포함 항목 토글, 선택 플랜 패널을 추가.
- `/pricing` 상단 중복 문구 제거: `PRICING`, `제작 플랜 & 가격 안내`, `RECOMMENDED`, `대부분은 이 3개 중에서 고르면 됩니다`, 추천 설명문, `단발 제작` 그룹 헤더가 화면에 나오지 않도록 정리.
- `/pricing` 공개 UI 금기 표현 보정: `SEO 상단등록/상단관리`를 `검색 등록 관리` 톤으로 교체.

## 근거

- 짧은 히어로 선언문과 CTA성 메시지는 중앙정렬이 페이지 첫인상과 스캔성을 높일 수 있음.
- 긴 본문, 리스트, FAQ 답변, 비교표는 좌측 정렬이 읽기 흐름에 유리하므로 전체 중앙정렬은 적용하지 않음.

## 검증

```bash
pnpm typecheck
pnpm lint
pnpm build
```

- typecheck PASS
- lint PASS
- build PASS — Next.js SSG/static routes 28/28 generated
- 후속 조정 후 재검증: typecheck PASS · lint PASS · build PASS — Next.js SSG/static routes 28/28 generated
- 랜딩 섹션 정렬 확대 후 재검증: typecheck PASS · lint PASS · build PASS — Next.js SSG/static routes 28/28 generated
- Browser QA: `/`, `/services`, `/cases`, `/blog`, `/reviews` 확인. 가로 오버플로 0건, console error 0건.
- 후속 미세 조정 재검증: typecheck PASS · lint PASS · build PASS — Next.js SSG/static routes 28/28 generated
- Browser QA: storyboard heading `text-align: center`, Build Desk 마스코트 우측 여백 약 57px, 가로 오버플로 0건, console error 0건.
- `/story` 재검증: typecheck PASS · lint PASS(기존 `<img>` 경고 4건, error 0건) · build PASS — Next.js SSG/static routes 29/29 generated.
- Browser QA `/story`: sticky frame 3장 확인, z-index 1→2→3 확인, 주요 timeline 텍스트 `text-align: center`, 가로 오버플로 0건, console error 0건.
- `/pricing` 재검증: typecheck PASS · lint PASS(기존 `<img>` 경고 4건, error 0건) · build PASS — Next.js SSG/static routes 29/29 generated.
- Browser QA `/pricing`: 금액 offset 129~130px 범위로 정렬, ENTERPRISE `scrollOverflow: 0`, page overflow 0건, console error 0건.
- `/pricing` 빠른 비교 추가 후 재검증: typecheck PASS · lint PASS(기존 `<img>` 경고 4건, error 0건) · build PASS — Next.js SSG/static routes 29/29 generated.
- grep QA: 제거 요청 문구(`RECOMMENDED`, `PRICING`, `제작 플랜 & 가격 안내`, `단발 제작`, `SEO 상단`)가 `/pricing` 렌더 경로와 가격 JSON에서 0건.
- localhost smoke: `/pricing` HTML에서 제거 요청 문구 0건, 빠른 비교 제목·포함 항목 토글·케어 필터·추천 3 카드 존재 확인.
- Browser MCP는 기존 Playwright profile lock으로 실행 불가. 대신 production build + localhost HTML smoke로 최종 확인.
