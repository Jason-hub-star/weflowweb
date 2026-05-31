/**
 * shared-schemas.ts — 모든 페이지 스키마에서 공유하는 공통 zod 단위.
 *
 * schemas.ts가 400줄을 넘기는 것을 막기 위해 분리된 sidecar.
 * 신규 공통 필드는 여기에 먼저 추가하고, schemas.ts에서 re-export 한다.
 */
import { z } from 'zod';

/** "곧 공개" 티저 — ComingSoonChip이 소비하는 공통 마커. */
export const ComingSoonSchema = z.object({
  enabled: z.boolean().default(false),
  label: z.string().optional(),
  description: z.string().optional(),
  href: z.string().optional(),
});
export type ComingSoonMeta = z.infer<typeof ComingSoonSchema>;

/** 월/연 토글 가격 — HomePricing/PricingPlan 카드가 소비. */
export const BillingSchema = z.object({
  monthly: z.string().min(1),
  yearly: z.string().min(1),
  yearlyHint: z.string().optional(),
});
export type Billing = z.infer<typeof BillingSchema>;
