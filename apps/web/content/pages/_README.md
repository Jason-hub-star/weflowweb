# `content/pages/` — 페이지 데이터 SSOT

> 사이트의 각 페이지에 들어가는 **카피·카드·CTA·메타**는 모두 이 폴더의 JSON 파일 한 곳에서 관리합니다.
> 결정 잠금: `docs/status/DECISION-LOG.md` **DEC-050** (2026-05-30)

---

## 누구를 위한 폴더인가요?

**비개발자도 직접 수정**할 수 있도록 만든 폴더입니다. 코드를 열지 않고 JSON 한 파일만 고치면 됩니다.

---

## 어떻게 수정하나요?

1. 수정할 페이지에 해당하는 JSON 파일을 엽니다.
   - 홈 → `home.json`
   - 서비스 소개 → `services.json`
   - 가격 → `pricing.json`
   - 사례 → `cases.json`
   - 후기 → `reviews.json`
   - …
2. 큰따옴표(`"`) 안의 텍스트만 바꿉니다.
3. 저장합니다.
4. 개발 서버(`pnpm dev`)가 떠 있다면 자동 반영됩니다.
5. 운영 사이트에는 Git에 커밋 → 푸시 후 자동 배포됩니다.

---

## ⚠️ JSON 문법 주의

- 모든 문자열은 큰따옴표 `"..."`로 감쌉니다.
- 줄바꿈은 `\n`을 사용합니다 (예: `"첫 줄\n두 번째 줄"`).
- 항목 사이는 쉼표로 구분합니다. **마지막 항목 뒤에는 쉼표가 없어야 합니다.**
- 주석(`//`, `/* */`)은 사용할 수 없습니다.
- 키(왼쪽 이름)는 절대 바꾸지 마세요. 코드가 그 이름으로 데이터를 찾습니다.

---

## 검증 (자동)

저장하면 `lib/content/schemas.ts`의 zod 스키마가 자동으로 검사합니다.

- 필수 필드 누락 → 빌드 실패 + 에러 메시지
- 타입 불일치(숫자 자리에 문자) → 빌드 실패
- 잘못된 값(별점 6점 등) → 빌드 실패

빌드 에러 메시지에 정확한 위치가 적혀 있으니, 그 줄을 찾아 고치면 됩니다.

---

## 자주 수정하는 항목 빠른 참조

| 항목 | 파일 → 키 | 예 |
|---|---|---|
| 메인 슬로건 | `home.json` → `hero.title` | `"문의로 이어지는 홈페이지를 만듭니다"` |
| 메인 CTA 텍스트 | `home.json` → `hero.ctas[0].label` | `"무료 진단 신청"` |
| 가격(추천 플랜) | `home.json` → `pricing.items[1].price` | `"월 19만~"` |
| 후기 추가 | `home.json` → `reviews.items` 배열에 항목 추가 | (구조는 기존 항목 참고) |
| 사례 카드 | `home.json` → `cases.items` | (`id`/`title`/`tag`/`metric`) |
| 프로세스 단계 | `home.json` → `process.items` | (`id`/`step`/`title`/`body`/`duration`) |

---

## 긴 본문은 어디에 있나요?

긴 본문(사례 상세, 블로그 글, 공지, 약관)은 JSON이 아니라 **Markdown 파일**로 따로 관리합니다.

- 사례 상세 → `content/cases/*.md`
- 후기 (긴 형식) → `content/reviews/*.md`
- 블로그 → `content/blog/*.md`
- 공지 → `content/notice/*.md`
- 약관·개인정보 → `content/legal/{privacy,terms}.md`

페이지 데이터(JSON)는 **짧고 구조화된 카피·배열**, Markdown은 **여러 줄의 본문**으로 나뉩니다.

---

## 새 페이지를 추가할 때 (개발자용)

1. `content/pages/<slug>.json` 작성
2. `lib/content/schemas.ts`에 zod 스키마 추가
3. `lib/content/loaders.ts`에 loader 함수 추가
4. `apps/web/app/<route>/page.tsx`에서 loader 호출

---

## 다국어 확장 시 (2차)

- `home.ko.json`, `home.en.json` 형태로 분리
- 라우트 `[locale]/...` 도입

---

## 한줄정리

**JSON 한 파일만 열어 큰따옴표 안 텍스트만 고치고 저장하면 사이트가 바뀌어요. 마지막 쉼표만 조심하세요.**
