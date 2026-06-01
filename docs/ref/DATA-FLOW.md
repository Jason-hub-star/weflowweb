# Data Flow — WEFLOW

> 폼 제출이 어떻게 외부로 이어지는지의 단일 출처.  
> API 라우트는 App Router 기본 Node 실행 환경을 기준으로 작성한다. `cacheComponents` 사용 시 route segment `runtime` export는 두지 않는다.

작성: 2026-05-29 · 업데이트: 2026-06-01 · 잠금: DEC-013/014/015/058/061

---

## 1. 무료진단 폼 (`/contact/form`)

```
┌───────── 클라이언트 ─────────┐
│ localStorage draft + client validation │
│ BotID client instrumentation           │
│ submit → POST /api/diagnose            │
└───────────────────────────────┘
              │ JSON { answers, otherTexts, honeypot, submittedAt }
              ▼
┌───────── /api/diagnose (Node) ─────────────────────┐
│ 1. content-length 64KB 초과 거부 (413)               │
│ 2. Origin allowlist 검증 (실패 → 403)                 │
│ 3. IP 기준 1분 5회 rate limit (초과 → 429)            │
│ 4. production BotID 검증 (bot/실패 → 403/503)        │
│ 5. zod 서버 재검증 + honeypot 검증 (실패 → 400)       │
│ 6. Resend 이메일 발송                                │
│ 7. 키 미설정 개발 환경은 dryrun 200                  │
│ 8. 응답 200 { ok: true }                             │
└──────────────────────────────────────────────────────┘
              │
              ▼
┌───────── 클라이언트 ─────────┐
│ success → 토스트 + 폼 reset      │
│ + Flow Guide(review) UI         │
│ + GA event 'form_submit'        │
│ + Meta/Naver/Kakao 픽셀 conversion │
└───────────────────────────────┘
```

### 에러 처리
- 400 (validation) → 인라인 에러
- 429 (rate limit) → "잠시 후 다시"
- 502 (Resend 실패) / 500 (예상 밖 오류) → "잠시 후 다시"
- Google Sheets append는 DEC-014 유지, 아직 출시 전 잔여 게이트

---

## 2. 예약 폼 (`/reservation`)

무료진단과 동일 흐름 + 추가 필드 `date`, `timeSlot`, `customTime?`. 라우트는 `/api/reservation`.

zod 검증:
```ts
const reservationSchema = inquirySchema.extend({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  timeSlot: z.enum(['10:00','11:00','13:00','14:00','15:00','16:00','17:00','custom']),
  customTime: z.string().optional(),
}).refine(
  (v) => v.timeSlot !== 'custom' || (v.customTime && v.customTime.length > 0),
  { message: 'customTime required when timeSlot=custom', path: ['customTime'] }
);
```

---

## 3. 환경 변수

`.env.local` (개발), `vercel env` (preview/production):
```
RESEND_API_KEY=
RESEND_FROM_EMAIL=hello@weflowlab.kr
OWNER_EMAIL=주인님메일
NEXT_PUBLIC_CONTACT_EMAIL=hello@weflowlab.kr
GOOGLE_SHEETS_ID=
GOOGLE_SERVICE_ACCOUNT_JSON=base64encoded
NEXT_PUBLIC_GA_MEASUREMENT_ID=
NEXT_PUBLIC_GTM_ID=
NEXT_PUBLIC_META_PIXEL_ID=
NEXT_PUBLIC_NAVER_WISETOOL_ID=
NEXT_PUBLIC_KAKAO_PIXEL_ID=
GOOGLE_SITE_VERIFICATION=
NAVER_SITE_VERIFICATION=
```

`.env*.local`은 `.gitignore`.

---

## 4. Google Sheets 스키마

`inquiries` 시트:
| A timestamp | B name | C phone | D type | E industry | F note | G consent | H source | I ip(서버측 hash) |

`reservations` 시트:
| A timestamp | B name | C phone | D type | E industry | F note | G date | H timeSlot | I customTime | J consent |

스키마 변경 시 `DECISION-LOG.md` + `CONTENT-MODEL.md` 갱신.

---

## 5. 보안 체크리스트

- [x] Body size guard (64KB)
- [x] Origin allowlist — 자체 도메인/preview/local only
- [x] In-memory IP rate limit (1분 5회)
- [x] BotID 검증 통과 후에만 외부 호출 (production)
- [x] zod 서버 사이드 재검증 + honeypot
- [ ] Sheets 서비스 계정 권한 = "편집자" 시트 단위
- [ ] Resend From은 인증된 도메인만
- [ ] 로그에 전화번호·이메일 마스킹

---

## 6. 관측

- `console.error` → Vercel 로그 (production에서는 sentinel ID로 추적)
- 폼 성공/실패 카운트 = GA event + Vercel Analytics custom event

---

## 한줄정리

**무료진단은 `/api/diagnose`에서 size·Origin·rate limit·BotID·zod를 통과한 뒤 Resend로 전송한다. Sheets append와 예약 API는 출시 전 잔여 게이트다.**
