# 30 — Component Tree 표준

## 공통 layout

```
RootLayout (app/layout.tsx)
  HtmlHead (Pretendard + Geist Mono + 메타 + Pixel scripts)
  Body (data-theme="light")
    Grain overlay (::after)
    SiteHeader
      LogoMark
      DesktopNav
      MobileMenuButton
      PrimaryCTA (무료 진단 신청)
    MobileDrawer (open state)
    <main>...page...</main>
    SiteFooter
      CompanyInfo (config.company)
      Navigation
      Social (Kakao / Instagram / Blog / Daangn)
      Legal links
    FloatingCTA (Flow Guide button → ActionSheet)
    Analytics scripts (production only)
```

## 마케팅 페이지 표준 구조

```
<Section>
  <SectionHeader eyebrow="..." title="..." subtitle="..." />
  <SectionBody>
    {/* 그리드 / 슬라이더 / 폼 */}
  </SectionBody>
  <SectionCTA />
</Section>
```

## 폼 컴포넌트 표준

```
InquiryForm / ReservationForm
  FormProvider (react-hook-form + zod)
  FieldGroup (Label + Control + ErrorMessage)
  ConsentCheckbox
  SubmitButton (loading state)
  BotIdToken (hidden)
  ToastTarget
```

## Hero 컴포넌트 표준 (5종)

`HERO-VARIANTS.md` §컴포넌트 트리 참조.

## 모션 표준

`reveal` variants 적용:
```tsx
<motion.div variants={reveal} initial="initial" whileInView="whileInView" viewport={reveal.viewport}>
```
