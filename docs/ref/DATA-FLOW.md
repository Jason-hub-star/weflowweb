# Data Flow — WEFLOW

> 폼 제출이 어떻게 외부로 이어지는지의 단일 출처.  
> 모든 API 라우트는 Node 런타임 (BotID·Sheets SDK 호환).

작성: 2026-05-29 · 잠금: DEC-013/014/015

---

## 1. 무료진단 폼 (`/contact` / `/landing` / `hero-lab/A`)

```
┌───────── 클라이언트 ─────────┐
│ react-hook-form + zod resolver  │
│ Vercel BotID 토큰 발급           │
│ submit → POST /api/inquiry      │
└───────────────────────────────┘
              │ JSON { name, phone, type, industry?, note?, consent, botid_token }
              ▼
┌───────── /api/inquiry (Node) ─────────────────────┐
│ 1. BotID 검증 (실패 → 400)                            │
│ 2. zod 서버 재검증 (필드 누락/타입 오류 → 400)          │
│ 3. consent === true 검증 (false → 400)              │
│ 4. Promise.all([                                    │
│      resend.emails.send({                            │
│        to: env.OWNER_EMAIL,                          │
│        subject: '[WEFLOW 무료진단] ...',              │
│        react: InquiryEmailTemplate(payload)          │
│      }),                                             │
│      sheets.append({                                 │
│        spreadsheetId: env.GOOGLE_SHEETS_ID,          │
│        range: 'inquiries!A:Z',                       │
│        row: [now, name, phone, type, ...]            │
│      })                                              │
│    ])                                                │
│ 5. 분석 이벤트 (서버사이드 GA Measurement Protocol)    │
│ 6. 응답 200 { ok: true, id }                         │
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
- 429 (rate limit, 추후) → "잠시 후 다시"
- 500 (외부 실패) → "잠시 후 다시" + Resend 실패는 시트만 성공해도 200 (이메일 재시도 큐로 옮길지는 2차)

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

- [ ] Node 런타임 명시 (`export const runtime = 'nodejs'`)
- [ ] CORS — 자체 도메인만 (필요 시 미들웨어)
- [ ] BotID 토큰 검증 통과 후에만 외부 호출
- [ ] zod 서버 사이드 재검증
- [ ] 개인정보 동의 미체크 시 거부
- [ ] Sheets 서비스 계정 권한 = "편집자" 시트 단위
- [ ] Resend From은 인증된 도메인만
- [ ] Rate limit (2차에 `upstash/ratelimit`)
- [ ] 로그에 전화번호·이메일 마스킹

---

## 6. 관측

- `console.error` → Vercel 로그 (production에서는 sentinel ID로 추적)
- 폼 성공/실패 카운트 = GA event + Vercel Analytics custom event

---

## 한줄정리

**무료진단·예약 모두 react-hook-form+zod → BotID → Resend+Sheets 병렬 → 응답 200까지 한 흐름. 모든 시크릿은 vercel env.**
