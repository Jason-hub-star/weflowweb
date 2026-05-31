# 외부 reference — DogCoach 랜딩 페이지 패턴 인벤토리

> 출처: [Jason-hub-star/DogCoach](https://github.com/Jason-hub-star/DogCoach) (Next.js + TypeScript + Tailwind + Framer Motion)  
> 분석 일자: 2026-05-30 밤  
> 목적: 가격 구조·후기 UI·랜딩 인터랙션 중 우리 WEFLOW에 이식할 만한 패턴을 추출하고, 즉시 적용·검토·보류 3등급으로 분류.

---

## 1. 저장소 구조 요약

DogCoach는 강아지 행동 교정/훈련 SaaS. `Frontend/src/components/features/landing/`에 **13개 섹션 컴포넌트**가 잘 분리돼 있음:

```
HeroSection · ProblemSection · SolutionSection · ABCSolutionSection ·
BehaviorMapSection · ExpertSynergySection · SeamlessSection · ProcessSection ·
PricingSection ⭐ · TestimonialsSection ⭐ · SocialProofSection ·
FAQSection · FinalCTASection
```

본 분석 핵심 3종: **PricingSection, TestimonialsSection, HeroSection**.

---

## 2. PricingSection — 발췌

```tsx
"use client";
import { FadeIn } from "@/components/ui/animations/FadeIn";
import { Check, Zap } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Free", price: "0",
    description: "기록부터 가볍게 시작하는 기본 플랜",
    features: ["기본 행동 로그 기록", "주간 히트맵 요약", "커뮤니티 인사이트"],
    cta: "무료로 시작하기", href: "/survey", popular: false,
  },
  {
    name: "Pro", price: "6,900", period: "/월",
    description: "데이터 기반 AI 코칭으로 행동 교정 속도를 높이는 플랜",
    features: ["ABC 기반 트리거 분석", "맞춤형 일일 미션", "리마인더 알림", "공유 가능한 PDF 리포트"],
    cta: "Pro 7일 무료 체험", href: "/survey", popular: true,
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 break-keep">
            오늘 1분 기록이<br />
            <span className="text-brand-orange">다음 10일 행동 변화를 만듭니다.</span>
          </h2>
          <p className="text-lg text-gray-600 break-keep">
            보호자 루틴에 맞는 플랜을 선택해 시작해보세요.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <FadeIn key={plan.name} delay={index * 0.1}
              className={cn("relative p-8 rounded-3xl border flex flex-col",
                plan.popular
                  ? "border-brand-lime bg-white shadow-xl scale-105 z-10"
                  : "border-gray-200 bg-gray-50 hover:border-gray-300"
              )}>
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-lime text-white px-4 py-1 rounded-full text-sm font-bold flex items-center gap-1 shadow-lg">
                  <Zap className="w-4 h-4 fill-current" />
                  가장 인기
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-gray-900">₩{plan.price}</span>
                  {plan.period && <span className="text-gray-500 font-medium">{plan.period}</span>}
                </div>
                <p className="text-gray-500 mt-2 text-sm break-keep">{plan.description}</p>
              </div>

              <ul className="space-y-4 mb-8 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className={cn("w-5 h-5 shrink-0", plan.popular ? "text-brand-lime" : "text-gray-400")} />
                    <span className="text-gray-700 text-sm font-medium break-keep">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link href={plan.href}
                className={cn("w-full py-4 rounded-xl text-center font-bold text-sm transition-all",
                  plan.popular
                    ? "bg-brand-dark text-white hover:bg-gray-800 shadow-lg hover:shadow-xl"
                    : "bg-white border border-gray-200 text-gray-900 hover:bg-gray-50"
                )}>{plan.cta}</Link>
            </FadeIn>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-gray-400 break-keep">프로모션 기간에는 가격이 달라질 수 있습니다.</p>
        </div>
      </div>
    </section>
  );
}
```

### 발견 패턴
- **ribbon이 카드 위로 절반 튀어나오는 형태**: `-translate-y-1/2` (우리는 `-top-3.5`로 더 작게 떠 있음 — 더 강하게 강조 가능)
- **ribbon에 lucide `Zap` 아이콘 + "가장 인기"** (우리는 ★ 텍스트만)
- **popular 카드**: `scale-105 + shadow-xl + z-10 + border-brand-lime + bg-white` (우리 `md:scale-[1.03] + shadow-lg + ring-2`와 유사, 라이트 톤에서는 ring보다 border가 깔끔)
- **가격 표기**: 통화 기호 `₩` 앞에 명시 + `text-4xl font-bold` (우리는 `text-display` + 통화 기호 생략 후 "원" 단위만)
- **CTA 차등화**: popular은 `bg-brand-dark text-white`, 일반은 `bg-white border` (우리 primary/secondary와 동일 패턴)
- **푸터 회색 메모**: "프로모션 기간에는 가격이 달라질 수 있습니다" (우리 `disclosures` 3종 안에 흡수 가능)
- **`FadeIn` wrapper로 staggered 진입 애니메이션** (우리도 적용 가능)

---

## 3. TestimonialsSection — 발췌

```tsx
"use client";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/Card";
import { Avatar, AvatarFallback } from "@/components/ui/Avatar";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "김민수 보호자님", dogName: "초코", role: "분리불안 개선",
    content: "퇴근 직후 짖음이 왜 올라가는지 데이터로 확인하고 나서, 귀가 루틴을 바꿨더니 2주 만에 반응이 크게 줄었어요.",
    result: "짖음 빈도 -32%", rating: 5,
  },
  {
    name: "이연아 보호자님", dogName: "구름", role: "입질 행동 교정",
    content: "감으로 대응할 때는 매번 실패했는데, 트리거 시간대를 먼저 피하고 대체 행동을 넣으니 입질이 눈에 띄게 줄었습니다.",
    result: "입질 에피소드 -41%", rating: 5,
  },
  {
    name: "박준호 보호자님", dogName: "맥스", role: "산책 매너 개선",
    content: "병원 상담 때 리포트를 보여주니 설명이 훨씬 쉬웠어요. 산책 중 끌어당김도 주차별로 줄어드는 게 보여서 동기부여가 됩니다.",
    result: "리드 당김 -27%", rating: 5,
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-lime/10 text-brand-lime text-sm font-bold mb-4">
            <Star className="w-4 h-4 fill-current" />
            <span>리얼 후기</span>
          </motion.div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight break-keep">
            이미 <span className="text-brand-lime font-outfit">5,000+</span> 보호자님이<br />
            기록 기반 훈련을 시작했습니다
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <motion.div key={index}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
              <Card className="h-full border-none shadow-xl shadow-gray-100 hover:shadow-2xl hover:shadow-brand-lime/5 transition-all duration-300 bg-orange-50/20">
                <CardContent className="p-8 flex flex-col h-full">
                  <Quote className="w-10 h-10 text-brand-lime/20 mb-4" />
                  <p className="text-gray-700 leading-relaxed mb-8 break-keep flex-1 italic">
                    "{item.content}"
                  </p>
                  <div className="inline-flex items-center rounded-full bg-emerald-50 text-emerald-700 px-3 py-1 text-xs font-bold mb-5 w-fit">
                    {item.result}
                  </div>
                  <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
                    <Avatar className="w-12 h-12 border-2 border-white shadow-sm bg-brand-lime/15">
                      <AvatarFallback className="font-black text-brand-dark">{item.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-bold text-gray-900 text-sm">{item.name}</div>
                      <div className="text-gray-500 text-xs font-medium">{item.dogName} ({item.role})</div>
                    </div>
                    <div className="ml-auto flex gap-0.5">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 text-brand-orange fill-current" />
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

### 발견 패턴
- **섹션 상단 "리얼 후기" pill badge + Star 아이콘** — 우리에게 없는 좋은 디테일, 섹션 정체성 즉시 전달
- **헤더에 통계 숫자 강조**: "이미 **5,000+** 보호자님이..." 큰 폰트 — 사회적 증명 1줄로 임팩트
- **카드 안 Quote 아이콘** (lucide, opacity 20% accent) — 후기 카드의 시각적 시작점
- **본문 italic + 큰 인용부호** — 후기 본문임을 즉시 인지
- **result badge** (`짖음 빈도 -32%` 같은 결과 수치) — **우리 cases의 metric과 동일한 정신을 후기에도 적용** ⭐ 우리 reviews에 없는 차별화
- **카드 하단 footer**: Avatar(이니셜) + name/role + 별점 우측 정렬 — 우리와 거의 동일
- **Framer Motion `whileInView` + staggered delay**(`index * 0.1`) — 스크롤 진입 애니메이션, 우리도 적용 가능
- **hover 효과**: `hover:shadow-2xl hover:shadow-brand-lime/5` 컬러 그림자 — 인터랙티브 디테일

---

## 4. HeroSection — 핵심 발췌

```tsx
"use client";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
// ...
export function HeroSection() {
  const { user, token } = useAuth();
  const isLoggedIn = !!user && !user.is_anonymous;
  const { data: dogProfile } = useDogProfile(token);
  const hasDog = isLoggedIn && !!dogProfile?.basic?.id;
  // CTA href·label: hasDog ? "내 대시보드로 이동" : "무료 리포트 받기"
}
```

### 발견 패턴 (구조 요약 — 풀 코드는 [원문](https://github.com/Jason-hub-star/DogCoach/blob/main/Frontend/src/components/features/landing/HeroSection.tsx))
- **Layout: Full-Bleed Center** — `min-h-[85vh] md:min-h-[90vh]` + `flex items-center justify-center`, background `bg-gradient-to-b from-white to-orange-50/20`
- **Animated Blob Decorations** (배경 blur 효과):
  - Top-right lime blob: `w-[600px] h-[600px] blur-[120px]`
  - Bottom-left orange blob: `w-[500px] h-[500px] blur-[100px]`
  - → 트렌디한 visual depth, 우리 hero에 추가 가능
- **Fluid typography**: `text-[clamp(2.1rem,10vw,4.75rem)]` (우리 `text-display` 패턴과 동일)
- **CTA pill 큰 버튼**: `bg-brand-lime rounded-full hover:scale-105` + ArrowRight 아이콘 hover translate
- **로그인 상태에 따라 CTA 차등화**: `hasDog ? "내 대시보드로 이동" : "무료 리포트 받기"` (우리 폼/로그인 도입 시 참고)
- **Hero 하단 라이브 사회적 증명**: "⚡️ 지금 3,241명이 상담 중" + stacked avatar circles (이모지 뱃지) — **강력한 즉시 신뢰 트리거**
- **모바일 친화**: `px-5 md:px-6`, `flex-col sm:flex-row`, `break-keep`(한국어)

---

## 5. WEFLOW 이식 권장안 — 3등급 분류

### 🟢 즉시 적용 (이번 또는 다음 세션)

| # | 패턴 | 대상 | 효과 | 작업량 |
|---|---|---|---|---|
| 1 | **ribbon에 lucide `Zap` 아이콘** (우리 ★ 텍스트 대신) | pricing 카드 `badge` | 시각 무게 ↑, "추천" 의도 명확 | 작음 (lucide 설치 + 1줄 변경) |
| 2 | **후기 카드에 `result` metric badge** (`emerald-50` pill, "문의 +180%" 같은 수치) | `<ReviewsFilterableGrid>` 카드 | 후기 신뢰 + 사례 수치 통합, **차별화 ⭐** | 중간 (reviews.json `items[].result?` 필드 + UI) |
| 3 | **후기 섹션 상단 "리얼 후기" pill badge** (Star 아이콘 + accent soft) | `/reviews` `<PageHero>` 또는 별도 위 badge | 섹션 정체성 즉시 전달 | 작음 |
| 4 | **후기 헤더 큰 통계 숫자 강조** ("이미 **N+ 사장님**이...") | `/reviews` hero 또는 `<StatBar>` 상단 | 사회적 증명 첫 시야 | 작음 (reviews.json stats 활용) |
| 5 | **후기 카드 안 Quote 아이콘** (opacity 20% accent) | `<ReviewsFilterableGrid>` 카드 상단 | 후기 시각 시작점 | 작음 |
| 6 | **카드 hover에 컬러 그림자** (`hover:shadow-accent/10`) | pricing/cases/reviews/blog 카드 | 호버 디테일 | 작음 |
| 7 | **`break-keep` 한국어 줄바꿈** | ✅ 우리 `ko-tight/ko-relaxed`로 이미 적용 — 검증만 | — | 검증 |
| 8 | **푸터 회색 메모** "프로모션 기간에는 가격이 달라질 수 있습니다" | pricing.json `disclosures`에 1줄 추가 또는 별도 | 가격 변동 가능성 사전 공지 | 작음 |

### 🟡 검토 후 적용 (디자인 의사결정 필요)

| # | 패턴 | 대상 | 검토 사유 |
|---|---|---|---|
| A | **Hero Animated Blob Decorations** (큰 원 blur 배경) | 홈 `<HeroVideo>` | 우리 hero는 블루 스타트업 일러스트 자산이 이미 있어서 blob과 충돌 가능. 둘 중 하나만 |
| B | **Hero 하단 라이브 사회적 증명 strip** ("지금 N명 상담 중" + stacked avatars) | 홈 hero 하단 | 1차 출시엔 실제 데이터 없음. 더미 숫자 사용 시 신뢰 역효과. 출시 후 적용 |
| C | **ribbon 위치 `-translate-y-1/2`로 절반 튀어나오게** (우리 `-top-3.5`보다 강하게) | pricing 카드 | 시각 강조 vs 깔끔함 트레이드오프. 모바일 잘림 위험 |
| D | **`FadeIn` wrapper로 plans staggered 진입 애니메이션** | pricing 카드 | reduced-motion fallback 같이 구현 |
| E | **`Card`/`CardContent` 컴포넌트 추출** (shadcn 패턴) | 우리 primitives에 `<Card>` 이미 있음 — wrapper 일관성만 점검 | 작음 |

### 🔴 보류 (우리 정책·구조에 부적합)

| # | 패턴 | 보류 사유 |
|---|---|---|
| X | **통화 기호 `₩` 앞 명시** | 우리는 "원" 단위 후위 표기가 한국어 친숙 (PRD §8 잠금값) |
| Y | **plans hardcoded in component** | 우리는 DEC-050 JSON SSOT — 콘텐츠와 컴포넌트 분리 유지 |
| Z | **lucide-react 일괄 도입** | 우리는 현재 텍스트 아이콘(✓·★·→)만 사용. 출시 후 디자인 시스템 통합 시 일괄 검토 (지금 도입 시 번들 +KB, KitCard 일관성 영향) — 단 Zap·Quote·Star 3개는 ribbon/quote/rating 한정 적용 검토 가능 |

---

## 6. 권장 작업 묶음 (다음 세션 들어가기 좋은 단위)

**묶음 X-1 (이번 또는 다음 세션, 1~2시간)**: 즉시 적용 #2 + #3 + #4 + #5 + #6 + #8 = 후기 섹션 매력 보강 + 가격 푸터 1줄 추가

산출물:
- `apps/web/lib/content/schemas.ts` `ReviewListItem`에 `result: z.string().optional()` 필드
- `apps/web/content/pages/reviews.json` items 6개에 `result` 추가 (예: "리드 +180%", "예약 +220%")
- `apps/web/app/reviews/ReviewsFilterableGrid.tsx` 카드 안 Quote 아이콘 + result badge + hover 컬러 그림자
- `apps/web/app/reviews/page.tsx` 또는 `<PageHero>` 위에 "리얼 후기" pill badge
- `apps/web/content/pages/pricing.json` `disclosures` 1줄 추가 또는 별도 메모

**묶음 X-2 (출시 직전)**: 실제 데이터 수집 후 #B (Hero 라이브 사회적 증명 strip), 실 사례 metric으로 #2 확장

---

## 7. 참고: 추가 분석 가능한 컴포넌트

다음 세션에서 가성비 좋은 추가 fetch 후보:
- `SocialProofSection.tsx` — 로고 marquee·통계 strip 패턴 (우리 `<ClientLogoMarquee>` 비교)
- `FinalCTASection.tsx` — 마지막 결단 트리거 카피·CTA 강조 패턴
- `ProcessSection.tsx` — 단계 흐름 (우리 `<SiteBuildStoryboard>` 비교 검증)
- `FAQSection.tsx` — FAQ UI (우리 `<FaqAccordion>` 비교 검증)

---

## 한줄정리

**DogCoach 랜딩 13 섹션에서 가격 ribbon `Zap` 아이콘 + 후기 카드 `result` metric badge + 섹션 정체성 pill + Hero blob 배경 + 라이브 사회적 증명 strip을 인사이트로 추출했어요. 즉시 적용 8건은 후기 카드 매력 보강(#2~#6)이 가성비 최강, 검토 5건은 디자인 트레이드오프, 보류 3건은 우리 정책·SSOT 정신과 충돌이에요.**
