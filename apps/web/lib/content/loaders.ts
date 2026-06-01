/**
 * Page Data Loaders — DEC-050
 *
 * JSON import + zod parse 한 함수에서 처리.
 * zod parse는 빌드 시점에 실패시켜 누락 필드를 차단한다.
 */
import { cacheLife, cacheTag } from 'next/cache';
import {
  HomePageSchema,
  type HomePage,
  ServicesPageSchema,
  type ServicesPage,
  PricingPageSchema,
  type PricingPage,
  CasesPageSchema,
  type CasesPage,
  ReviewsPageSchema,
  type ReviewsPage,
  BlogPageSchema,
  type BlogPage,
  NoticePageSchema,
  type NoticePage,
  FaqPageSchema,
  type FaqPage,
  LegalPageSchema,
  type LegalPage,
  StoryPageSchema,
  type StoryPage,
  DiagnoseFormPageSchema,
  type DiagnoseFormPage,
} from './schemas';

import homeData from '@/content/pages/home.json';
import servicesData from '@/content/pages/services.json';
import pricingData from '@/content/pages/pricing.json';
import casesData from '@/content/pages/cases.json';
import reviewsData from '@/content/pages/reviews.json';
import blogData from '@/content/pages/blog.json';
import noticeData from '@/content/pages/notice.json';
import faqData from '@/content/pages/faq.json';
import privacyData from '@/content/pages/privacy.json';
import termsData from '@/content/pages/terms.json';
import storyData from '@/content/pages/story.json';
import diagnoseFormData from '@/content/pages/diagnose-form.json';

export function getHomePage(): HomePage {
  return HomePageSchema.parse(homeData);
}

export async function getCachedHomePage(): Promise<HomePage> {
  'use cache';
  cacheLife('hours');
  cacheTag('content:home');
  return getHomePage();
}

export function getStoryPage(): StoryPage {
  return StoryPageSchema.parse(storyData);
}

export async function getCachedStoryPage(): Promise<StoryPage> {
  'use cache';
  cacheLife('hours');
  cacheTag('content:story');
  return getStoryPage();
}

export function getServicesPage(): ServicesPage {
  return ServicesPageSchema.parse(servicesData);
}

export async function getCachedServicesPage(): Promise<ServicesPage> {
  'use cache';
  cacheLife('hours');
  cacheTag('content:services');
  return getServicesPage();
}

export function getPricingPage(): PricingPage {
  return PricingPageSchema.parse(pricingData);
}

export async function getCachedPricingPage(): Promise<PricingPage> {
  'use cache';
  cacheLife('hours');
  cacheTag('content:pricing');
  return getPricingPage();
}

export function getCasesPage(): CasesPage {
  return CasesPageSchema.parse(casesData);
}

export async function getCachedCasesPage(): Promise<CasesPage> {
  'use cache';
  cacheLife('hours');
  cacheTag('content:cases');
  return getCasesPage();
}

export function getReviewsPage(): ReviewsPage {
  return ReviewsPageSchema.parse(reviewsData);
}

export async function getCachedReviewsPage(): Promise<ReviewsPage> {
  'use cache';
  cacheLife('hours');
  cacheTag('content:reviews');
  return getReviewsPage();
}

export function getBlogPage(): BlogPage {
  return BlogPageSchema.parse(blogData);
}

export async function getCachedBlogPage(): Promise<BlogPage> {
  'use cache';
  cacheLife('hours');
  cacheTag('content:blog');
  return getBlogPage();
}

export function getNoticePage(): NoticePage {
  return NoticePageSchema.parse(noticeData);
}

export async function getCachedNoticePage(): Promise<NoticePage> {
  'use cache';
  cacheLife('hours');
  cacheTag('content:notice');
  return getNoticePage();
}

export function getFaqPage(): FaqPage {
  return FaqPageSchema.parse(faqData);
}

export async function getCachedFaqPage(): Promise<FaqPage> {
  'use cache';
  cacheLife('hours');
  cacheTag('content:faq');
  return getFaqPage();
}

export function getPrivacyPage(): LegalPage {
  return LegalPageSchema.parse(privacyData);
}

export async function getCachedPrivacyPage(): Promise<LegalPage> {
  'use cache';
  cacheLife('hours');
  cacheTag('content:privacy');
  return getPrivacyPage();
}

export function getTermsPage(): LegalPage {
  return LegalPageSchema.parse(termsData);
}

export async function getCachedTermsPage(): Promise<LegalPage> {
  'use cache';
  cacheLife('hours');
  cacheTag('content:terms');
  return getTermsPage();
}

export function getDiagnoseForm(): DiagnoseFormPage {
  return DiagnoseFormPageSchema.parse(diagnoseFormData);
}

export async function getCachedDiagnoseForm(): Promise<DiagnoseFormPage> {
  'use cache';
  cacheLife('hours');
  cacheTag('content:diagnose-form');
  return getDiagnoseForm();
}
