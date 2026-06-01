/**
 * Public runtime config.
 *
 * This file is safe to import from Client Components. Do not add secrets or
 * server-only env values here.
 */
export const publicConfig = {
  brand: {
    name: 'WEFLOW',
    nameKo: '위플로우',
    slogan: '홈페이지부터 관리까지, 알아서 챙겨드립니다',
    subSlogan:
      '사진·문구·문의폼·광고 연결·리포트까지 필요한 것만 알려주세요. WEFLOW가 순서대로 정리하고, 만들고, 운영하기 쉽게 전달합니다.',
    eyebrow: '홈페이지 제작 · 문의 관리 · 리포트 · 유지보수',
  },
  site: {
    url: 'https://weflowlab.kr',
    domain: 'weflowlab.kr',
    locale: 'ko_KR',
    language: 'ko',
  },
  company: {
    // #TODO 출시 전 실제 사업자 정보로 교체
    legalName: '#TODO_LEGAL_NAME',
    representative: '#TODO_REPRESENTATIVE',
    businessNumber: '#TODO_BUSINESS_NUMBER',
    mailOrderNumber: '#TODO_MAIL_ORDER_NUMBER',
    address: '#TODO_ADDRESS',
    email: '#TODO_EMAIL',
    phone: '010-2971-7280',
    phoneTel: 'tel:+821029717280',
  },
  social: {
    kakaoChannelUrl:
      process.env.NEXT_PUBLIC_KAKAO_CHANNEL_URL ?? 'http://pf.kakao.com/_xntCbX',
    instagram: 'https://www.instagram.com/weflowlab.kr',
    blog: 'https://m.blog.naver.com/weflowlab',
    facebook: 'https://www.facebook.com/profile.php?id=61590187124682',
    daangn: process.env.NEXT_PUBLIC_DAANGN_PLACE_URL ?? '#TODO_DAANGN',
  },
  analytics: {
    ga: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
    gtm: process.env.NEXT_PUBLIC_GTM_ID,
    meta: process.env.NEXT_PUBLIC_META_PIXEL_ID,
    naver: process.env.NEXT_PUBLIC_NAVER_WISETOOL_ID,
    kakao: process.env.NEXT_PUBLIC_KAKAO_PIXEL_ID,
  },
  contact: {
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? 'hello@weflowlab.kr',
  },
} as const;
