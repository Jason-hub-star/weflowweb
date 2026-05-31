/**
 * Page Data Loaders — DEC-050
 *
 * JSON import + zod parse 한 함수에서 처리.
 * zod parse는 빌드 시점에 실패시켜 누락 필드를 차단한다.
 */
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

export function getStoryPage(): StoryPage {
  return StoryPageSchema.parse(storyData);
}

export function getServicesPage(): ServicesPage {
  return ServicesPageSchema.parse(servicesData);
}

export function getPricingPage(): PricingPage {
  return PricingPageSchema.parse(pricingData);
}

export function getCasesPage(): CasesPage {
  return CasesPageSchema.parse(casesData);
}

export function getReviewsPage(): ReviewsPage {
  return ReviewsPageSchema.parse(reviewsData);
}

export function getBlogPage(): BlogPage {
  return BlogPageSchema.parse(blogData);
}

export function getNoticePage(): NoticePage {
  return NoticePageSchema.parse(noticeData);
}

export function getFaqPage(): FaqPage {
  return FaqPageSchema.parse(faqData);
}

export function getPrivacyPage(): LegalPage {
  return LegalPageSchema.parse(privacyData);
}

export function getTermsPage(): LegalPage {
  return LegalPageSchema.parse(termsData);
}

export function getDiagnoseForm(): DiagnoseFormPage {
  return DiagnoseFormPageSchema.parse(diagnoseFormData);
}
