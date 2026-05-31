# Decision Log — WEFLOW

> Append-only. 결정은 수정하지 않고 supersedes로 표기. 새 DEC는 가장 아래에 추가.
>
> **번호 부여 규칙**: DEC-001~032는 마스터 플랜 §2에 잠금된 기본 결정. DEC-033 이상은 Phase 0.5 이후 추가되는 운영 결정이며, 모두 같은 카운터를 사용한다 (영역별 분리 없음). 번호는 순차이며 재사용 금지.

업데이트: 2026-05-29

---

## DEC-001: 브랜드 — WEFLOW 리뉴얼 진행
- **Context**: 기존 도메인 `weflowlab.kr`은 Vercel 404, 프리뷰 `weflow-web.vercel.app`는 200 응답. 새 브랜드 시작 vs 리뉴얼 선택지.
- **Options**: ① WEFLOW 리뉴얼 ② devfive 신규 구축 ③ devfive 학습용 ④ 완전 신규 브랜드
- **Decision**: WEFLOW 리뉴얼 — 기존 브랜드 자산·도메인·이력 유지
- **Rationale**: 도메인 이력과 명함·SNS·검색 이력을 그대로 활용 가능, 브랜드 처음부터 만드는 비용 절감
- **Impact**: 로고·캐릭터·기존 명세를 모두 재활용. 신규 도메인 구매 비용 0.
- **Date**: 2026-05-29

## DEC-002: 사이트 목적 — 리드 수집 + 브랜드 인지 + 포트폴리오
- **Context**: 다목적 vs 단일 목적. 영업/마케팅 핵심 KPI 정의 필요.
- **Decision**: 리드(문의) 수집 1순위 + 브랜드/회사 소개 + 포트폴리오 자랑 (3 in 1)
- **Rationale**: 30~40대 대표는 회사 소개 → 사례 → 문의 흐름으로 의사결정. 한 사이트에 통합 필요.
- **Impact**: 모든 페이지가 무료진단 CTA로 수렴. 사례·후기 섹션 비중 상승.
- **Date**: 2026-05-29

## DEC-003: 다국어 — 한국어만 (구조만 i18n 친화)
- **Context**: 1차 출시 일정과 i18n 라이브러리 도입 비용.
- **Options**: ① ko만 ② ko+en ③ ko+en+ja
- **Decision**: 한국어만, 단 라우트·콘텐츠 구조는 i18n 확장 가능하게
- **Rationale**: 1차 타깃이 국내 소상공인. 영어 LP는 2차로 분리.
- **Impact**: next-intl 등 i18n 라이브러리 1차 미도입. `/[locale]` 구조 미사용.
- **Date**: 2026-05-29

## DEC-004: 브랜드 자산 — 폴더 내 로고·PNG 그대로 사용
- **Context**: `design-agent-package/` 안에 로고 2개·생성 hero 4개·캐릭터 3개 보유.
- **Decision**: 그대로 사용
- **Rationale**: 이미 명세 통과한 자산. 빌드 시 `apps/web/public/`로 복사.
- **Impact**: 디자인 작업 시간 단축. 원본은 보존.
- **Date**: 2026-05-29

## DEC-005: 레포 — 새 repo 처음부터 (`/Users/family/jason/devfive`)
- **Context**: 기존 `lmg90219679-eng/weflow-web` repo 사용 vs 새 repo.
- **Decision**: 새 repo 처음부터, 이 폴더에서 시작
- **Rationale**: 기존 코드를 유지보수하는 비용 > 새로 만드는 비용. 디자인 시스템 재설계 필요.
- **Impact**: 기존 repo는 참조만, push 없음. 향후 GitHub 연결 시 새 repo 생성.
- **Date**: 2026-05-29

## DEC-006: Git — 로컬 작업, GitHub 연결 추후
- **Context**: 진행 중 권한 미확정.
- **Decision**: 1차는 로컬 작업, push 권한 확보 시점에 추후 결정
- **Rationale**: GitHub 의존성 없이 빠르게 진행 가능.
- **Impact**: CI 미설정. Vercel 연결도 추후.
- **Date**: 2026-05-29

## DEC-007: 도메인 — weflowlab.kr 유지
- **Context**: 새 도메인 구매 vs 기존 유지.
- **Decision**: weflowlab.kr 유지, 출시 시 Vercel 연결
- **Rationale**: SEO/명함 이력 유지.
- **Impact**: DNS A/CNAME 작업이 출시 직전 액션 항목.
- **Date**: 2026-05-29

## DEC-008: 1차 범위 — 프론트엔드 리디자인만
- **Context**: 관리자/DB까지 풀스코프 vs 프론트만.
- **Decision**: 프론트엔드 리디자인만, 관리자·DB·i18n은 2차
- **Rationale**: 10일 안에 출시 가능 범위. 전환 개선이 최우선.
- **Impact**: 관리자 화면 10개·Neon Postgres·Clerk 2차로 미룸. 문의 저장은 Google Sheets + 이메일.
- **Date**: 2026-05-29

## DEC-009: 프레임워크 — Next.js 16 (App Router)
- **Context**: Astro, SvelteKit, Vite 대안 비교.
- **Decision**: Next.js 16 (App Router)
- **Rationale**: Vercel 최적화, SSG/ISR/Server Components 혼용, SEO·이미지 최적화 내장, devfive와 같은 스택, 사용자 다른 프로젝트(tailog-marketing-site)에서 검증된 조합.
- **Impact**: Server Components 우선, Cache Components `'use cache'` 활용, Turbopack 기본.
- **Date**: 2026-05-29

## DEC-010: 스타일링 — 자체 디자인 시스템 (`packages/tokens`)
- **Context**: shadcn/ui 통합 vs 자체 시스템. 사용자가 "AI스럽지 않은 감각적 디자인" 명시.
- **Decision**: `/Users/family/jason` 내 다른 프로젝트의 토큰 패턴 계승 + 신규 `packages/tokens`
- **Rationale**: 하드코딩 hex 0건, 형제 프로젝트와 시각 일관성, 자체 컴포넌트 자유도.
- **Impact**: Tailwind CSS v4 + CSS variables. shadcn/ui 미사용. vibehub-media 구조 참고.
- **Date**: 2026-05-29

## DEC-011: 한글 폰트 — Pretendard Variable + Geist Mono
- **Context**: Pretendard / Spoqa / Suit / 조합 선택.
- **Decision**: Pretendard Variable (본문) + Geist Mono (숫자·가격·코드)
- **Rationale**: 국내 프리미엄 사이트 표준 + 숫자 가독성 ↑.
- **Impact**: `next/font/local` 또는 `pretendard` 패키지 사용.
- **Date**: 2026-05-29

## DEC-012: 모션 — Framer Motion + Lenis
- **Context**: CSS only / Framer / GSAP / Motion One.
- **Decision**: Framer Motion + Lenis (부드러운 스크롤)
- **Rationale**: React 친화, 표준 easing `[0.25, 0.1, 0.25, 1]` + stagger 0.12. 사용자 다른 프로젝트에서 검증.
- **Impact**: 번들 사이즈 모니터링 필요. 모바일 reduced-motion 자동 우회.
- **Date**: 2026-05-29

## DEC-013: 폼 알림 — Resend 이메일
- **Context**: Resend / 카카오 알림톡 / Slack webhook / Google Form.
- **Decision**: Resend (Vercel Marketplace 통합 자동 env)
- **Rationale**: 도메인 인증 후 무료 3,000통/월. Vercel과 자연스럽게 연결.
- **Impact**: 도메인 인증 작업 필요. 발송 주소 설정 필요.
- **Date**: 2026-05-29

## DEC-014: 문의 저장 — Google Sheets + 이메일만 (DB 없음)
- **Context**: Neon Postgres / Supabase / Airtable / Sheets.
- **Decision**: Google Sheets append + Resend 이메일
- **Rationale**: 1차에 DB 없이 운영 가능. 주인님이 시트로 즉시 확인. 2차에 Neon으로 마이그레이션.
- **Impact**: 서비스 계정 키 발급 필요. 데이터 마이그레이션 경로 미리 고려.
- **Date**: 2026-05-29

## DEC-015: 스팸 방지 — Vercel BotID
- **Context**: BotID / Cloudflare Turnstile / reCAPTCHA v3 / Honeypot.
- **Decision**: Vercel BotID
- **Rationale**: Vercel 네이티브, 한 줄 설치, 사용자 흐름 방해 없음.
- **Impact**: 라우트 핸들러에 토큰 검증 추가. Edge가 아닌 Node 런타임.
- **Date**: 2026-05-29

## DEC-016: 콘텐츠 관리 — MD frontmatter + Git
- **Context**: CMS(Sanity) / Edge Config / MD + Git / 하드코딩.
- **Decision**: MD frontmatter + Git
- **Rationale**: 사례·후기·블로그·공지·배너·팝업 모두 .md 파일. GitHub Web으로도 편집 가능. 1차에 관리자 화면 불필요.
- **Impact**: `next-mdx-remote` + gray-matter + zod 스키마. `apps/web/content/` 폴더.
- **Date**: 2026-05-29

## DEC-017: 토큰 통합 — 신규 `packages/tokens` 패키지
- **Context**: 단일 파일 / vibehub 차용 / 신규 패키지 / tailog 복제.
- **Decision**: 신규 packages/tokens (vibehub-media 구조 참고, WEFLOW 색상 정의)
- **Rationale**: 자체 토큰 정의 + 향후 형제 프로젝트 재사용 가능. vibehub 종속성 없음.
- **Impact**: pnpm workspace + turborepo 구조 필요.
- **Date**: 2026-05-29

## DEC-018: 다크모드 — 라이트만
- **Context**: 라이트만 / 다크만 / 둘 다 / OS 자동.
- **Decision**: 라이트만, 다크는 2차 옵션
- **Rationale**: 30~40대 대표 타깃은 라이트 선호, 1차 디자인 일관성 ↑, 일정 ↓.
- **Impact**: next-themes 미사용. 토큰은 dark variant 미정의.
- **Date**: 2026-05-29

## DEC-019: 캐릭터 강도 — 보조 포인트로만
- **Context**: Flow Guide 마스코트 활용 강도.
- **Decision**: Why/플로팅/완료 상태에만 사용, 페이지당 1~2회
- **Rationale**: 주인공은 카피·폼·CTA. 캐릭터는 브랜드 기억점.
- **Impact**: 3컷(hero/floating/review) 모두 사용하되 보조 위치.
- **Date**: 2026-05-29

## DEC-020: 모바일 하단 — 플로팅 1개 (Flow Guide 버튼)
- **Context**: 4개 고정바 / 2개 고정바 / 1개 플로팅 / 하이브리드.
- **Decision**: 모바일·데스크톱 공통 우측 하단 플로팅 1개. 클릭 시 액션 시트(카카오/전화/무료진단).
- **Rationale**: 터치 영역 ↑, 하단바 잠식 없음, 캐릭터 강조.
- **Impact**: 명세 원안(4개 바)에서 단순화. 액션 시트 UI 추가.
- **Date**: 2026-05-29

## DEC-021: 분석/픽셀 — 풀스택 6종
- **Context**: 최소 vs 풀스택 추적.
- **Decision**: Vercel Analytics + Speed Insights + GA4 + GTM + Meta Pixel + Naver Wisetool + Kakao Pixel
- **Rationale**: 국내 광고(네이버·카카오) + 글로벌(GA4·Meta) + Vercel 네이티브. 출시 후 어느 채널이든 추적 가능.
- **Impact**: production 환경에서만 활성. 동의 페이지에 명시.
- **Date**: 2026-05-29

## DEC-022: 카카오 채널 — Placeholder (#TODO_KAKAO)
- **Context**: 카카오 채널 ID 미정.
- **Decision**: `lib/config.ts.kakaoChannelUrl`에 placeholder, 채널 개설 후 교체
- **Rationale**: 출시 전 차단 없음, 1회 교체로 완료.
- **Impact**: 플로팅 CTA의 카카오 액션은 출시 직전 활성.
- **Date**: 2026-05-29

## DEC-023: SEO/OG — sitemap + robots + @vercel/og + JSON-LD + 키워드 메타
- **Context**: 최소 SEO vs 풀 SEO.
- **Decision**: 풀 SEO
- **Rationale**: 검색 유입이 1차 트래픽. 글로벌 + 국내 검색 동시 대응.
- **Impact**: `sitemap.ts`, `robots.ts`, `opengraph-image.tsx`, 페이지별 동적 OG, JSON-LD 4종.
- **Date**: 2026-05-29

## DEC-024: 검색 등록 — Google + Naver 메타 + 당근 안내
- **Context**: 검색엔진/디렉토리 등록 범위.
- **Decision**: Google Search Console + Naver 서치어드바이저 메타 인증 + 당근플레이스 안내 페이지
- **Rationale**: 출시 직후 즉시 인증 가능, 당근은 별도 등록.
- **Impact**: 메타 태그 1회 삽입. 당근은 `/about` 또는 푸터 안내.
- **Date**: 2026-05-29

## DEC-025: 컬러 결정 — `/mockup/[id]` 3안 비교
- **Context**: 단일 안 vs 시안 비교.
- **Decision**: 코드 안 3안 (`/mockup/1`, `/2`, `/3`) 배포 후 주인님 결정
- **Rationale**: 실제 작동 환경에서 비교 가능. 토큰 교체만으로 색 변경.
- **Impact**: `apps/web/app/mockup/[id]/page.tsx` 라우트 필요.
- **Date**: 2026-05-29

## DEC-026: SEO 키워드 — 명세 표현 그대로
- **Context**: 키워드 새로 설계 vs 명세 활용.
- **Decision**: 명세에 있는 표현 그대로 (`문의로 이어지는 홈페이지`, `WEFLOW CARE` 등)
- **Rationale**: 이미 검증된 카피. 키워드 리서치 비용 절약.
- **Impact**: 메타 태그 작성 빠름.
- **Date**: 2026-05-29

## DEC-027: 사업자 정보 — `lib/config.ts` `#TODO`
- **Context**: 사업자번호·대표·주소 미확정.
- **Decision**: config 1곳에 모아두고 #TODO 표시, 주인님 전달 후 1회 교체
- **Rationale**: 푸터·약관·OG 등 다수 위치에서 사용. 1곳 관리로 일관성 ↑.
- **Impact**: 출시 전 필수 교체 항목.
- **Date**: 2026-05-29

## DEC-028: 약관·개인정보처리방침 — 표준 템플릿 + 검토
- **Context**: 직접 작성 / 외부 변호사 / 템플릿.
- **Decision**: 소상공인용 표준 템플릿을 .md로 제공 → 주인님 검토 후 최종
- **Rationale**: 출시 차단 없이 진행 가능. 법무 검토는 출시 직전.
- **Impact**: `apps/web/content/legal/privacy.md`, `terms.md` placeholder 작성.
- **Date**: 2026-05-29

## DEC-029: 시안 형태 — 코드 안 3안 (5안 Hero 별도)
- **Context**: Figma 정적 vs 코드 라이브.
- **Decision**: 코드 안 3안 + Hero는 별도 5안
- **Rationale**: 실제 클릭·반응 비교 가능. 디자인 도구 의존성 없음.
- **Impact**: `/mockup/[id]` (컬러 3) + `/hero-lab/[id]` (Hero 5) 라우트 필요.
- **Date**: 2026-05-29

## DEC-030: 마감 — 주인님 결정 (가이드 풀 10일)
- **Context**: 명세 가이드(랜딩 3-4일, 홈피 4-7일, 풀 10일).
- **Decision**: 마감일 미확정, 명세 가이드를 마일스톤으로 사용
- **Rationale**: 우선순위 변경에 유연하게 대응.
- **Impact**: 마일스톤은 권장값. 실제 마감은 주인님 선언 시 잠금.
- **Date**: 2026-05-29

## DEC-031: 초기 콘텐츠 — 더미 + #TODO 마킹
- **Context**: 실제 콘텐츠 보유 vs 더미.
- **Decision**: 더미 콘텐츠(사례·후기·블로그 각 3-5개) + #TODO 마킹, 출시 전 교체
- **Rationale**: 디자인·구조 즉시 확인 가능. 콘텐츠 작성과 코드 작성 병렬.
- **Impact**: `apps/web/content/` 안에 더미 .md 파일. MISSING-AND-UNIMPLEMENTED.md 등재.
- **Date**: 2026-05-29

## DEC-032: 2차 범위 — 관리자 + Neon Postgres + 인증
- **Context**: 출시 후 우선순위.
- **Decision**: 관리자 대시보드 10화면 + Neon Postgres + Clerk(또는 자체) 인증 + 후기 직접 작성
- **Rationale**: 1차에서 미룬 항목 우선 처리. Sheets → Postgres 마이그레이션.
- **Impact**: 2차 진입 시 별도 플랜 필요.
- **Date**: 2026-05-29

---

## DEC-033 이후 (Phase 0.5 진행 중 추가 결정)

## DEC-033: Doc OS 이식 — harness-template (메인) + TaillogToss (보강)
- **Context**: 자체 SSOT 시스템 설계 필요. 두 형제 프로젝트의 패턴 분석 완료.
- **Options**: ① harness만 ② TaillogToss만 ③ 둘 다 하이브리드
- **Decision**: 하이브리드 — harness-template의 tier 모델·DECISION-LOG·skills를 메인 골격으로, TaillogToss의 daily/weekly 로그·PAGE-UPGRADE-BOARD·MISSING-AND-UNIMPLEMENTED·sections 분해를 보강.
- **Rationale**: harness는 구조·결정·검증의 표준, TaillogToss는 일상 운영의 디테일. 둘을 결합하면 완전.
- **Impact**: Day 0.5에 docs/status/ref/ops/daily/weekly, ai-context, .claude/skills 5종 이식 + weflow-page 신규 스킬, scripts 5종, templates 5종, harnesses 4종, patterns 4종 생성.
- **Date**: 2026-05-29

## DEC-034: 슬래시 명령 6종 정의
- **Context**: 자주 쓰는 작업을 명령어로.
- **Decision**: `/doc-sync`, `/sync-design-tokens`, `/check-seo`, `/mockup-compare`, `/hero-lab-compare`, `/handoff`
- **Rationale**: 매일 운영에 가장 필요한 묶음.
- **Impact**: `.claude/commands/*.md` 6개 작성.
- **Date**: 2026-05-29

## DEC-035: weflow-page 스킬 — TaillogToss sections 분해 패턴 채택
- **Context**: 페이지별 사양 관리 방식.
- **Decision**: SKILL.md는 인덱스만, 본문은 `sections/00..50-*.md` 6개 청크로 분해
- **Rationale**: AI가 필요한 청크만 로드 가능, 보강 범위 명시.
- **Impact**: `.claude/skills/weflow-page/sections/` 폴더 필요.
- **Date**: 2026-05-29

## DEC-036: Node.js 20 LTS
- **Context**: Phase 1 진입 직전, 런타임 버전 잠금 필요.
- **Options**: ① Node 18.17 LTS ② Node 20 LTS ③ Node 22 (current)
- **Decision**: **Node.js 20 LTS** (`.nvmrc`에 `20` 명시)
- **Rationale**: Next.js 16 권장 사항, Vercel 기본 런타임, 22보다 안정성 검증 ↑.
- **Impact**: `.nvmrc`, `engines` 필드, CI 매트릭스 통일.
- **Date**: 2026-05-29

## DEC-037: pnpm 9.x + corepack
- **Context**: 패키지 매니저 잠금.
- **Options**: ① npm ② yarn berry ③ pnpm 8 ④ pnpm 9
- **Decision**: **pnpm 9.x**, 활성화는 `corepack enable && corepack prepare pnpm@latest --activate`
- **Rationale**: 모노레포에서 가장 빠른 install, workspace 네이티브, vibehub-media·tailog-marketing-site와 동일.
- **Impact**: `package.json` `packageManager` 필드, `.npmrc` `package-manager-strict`.
- **Date**: 2026-05-29

## DEC-038: Turborepo 2.x (최신 안정)
- **Context**: 모노레포 빌드 오케스트레이션.
- **Options**: ① Turborepo 2.x ② Nx ③ Lerna ④ 없음(pnpm scripts만)
- **Decision**: **Turborepo 2.x** (`turbo.json`의 `tasks` 키 사용)
- **Rationale**: Vercel 네이티브, 캐싱·병렬·--affected, 학습 곡선 최소.
- **Impact**: 루트 `turbo.json`, `pnpm-workspace.yaml`.
- **Date**: 2026-05-29

## DEC-039: ESLint Flat Config (자체 규칙)
- **Context**: 린트 규칙 잠금.
- **Options**: ① 공유 패키지 `@weflow/eslint-config` ② Next.js 기본 + 추가 규칙 ③ Biome
- **Decision**: **Next.js 기본 + 자체 추가 규칙을 `eslint.config.mjs`(Flat Config)에 통합**
- **Rationale**: 단일 앱 단계에서 공유 패키지 분리는 과잉. 2차에 형제 프로젝트 늘어나면 `@weflow/eslint-config`로 추출.
- **Impact**: 루트 `eslint.config.mjs` + `@typescript-eslint`, `eslint-config-next`, `eslint-plugin-react-hooks`.
- **Date**: 2026-05-29

## DEC-041: Hero 1차 선정 — B+ Enhanced Full-bleed
- **Context**: `/hero-lab/{1..5}` 5안 배포 후 주인님 검수. B가 가장 마음에 들지만 인터랙티브 요소가 가벼웠음. 더 참신하고 인터랙티브한 풀세트가 필요.
- **Options**: ① A Split Form ② B Plain ③ **B+ Enhanced** ④ D Live Dashboard
- **Decision**: **B+ Enhanced Full-bleed** — 기본 B 위에 인터랙티브 8종 풀세트 추가
- **Rationale**: B의 비주얼 임팩트(풀블리드 hero) + devfive 시그니처(scale+blur depth) + paper.design 텍스처 차용 = 프리미엄 + 차별화 동시. 잔여 A·C·D·E는 `/landing`·`/products`·시즌 캠페인용으로 보존.
- **Impact**: `/hero-lab/2-plus` 신규 시안 라우트 추가. `apps/web/components/hero/HeroFullBleedPlus.tsx` 신규. 의존성 `@paper-design/shaders-react` 추가 (DEC-042). 선정 후 `/` 홈에 적용.
- **Date**: 2026-05-29

## DEC-042: 의존성 추가 — @paper-design/shaders-react
- **Context**: Hero B+의 WebGL mesh gradient 셰이더 필요.
- **Options**: ① three.js + react-three-fiber ② @paper-design/shaders-react ③ CSS-only radial gradient (현재) ④ Lottie
- **Decision**: **@paper-design/shaders-react** (단일 패키지, MeshGradient/SmokeRing 등 즉시 사용 가능, ~50KB)
- **Rationale**: three.js + r3f는 ~300KB+ 과잉, Lottie는 별도 자산 제작 필요, CSS-only는 한계. paper-design은 페이퍼 회사가 만든 검증된 셰이더 라이브러리.
- **Impact**: `apps/web/package.json` deps 추가, Hero B+ + 필요 시 다른 섹션에 재활용 가능.
- **Date**: 2026-05-29

## DEC-043: Hero B+ 인터랙티브 인벤토리 잠금 (8종)
- **Context**: 인터랙티브 풍부함을 정량화해 누락 방지 + 추후 검증 기준.
- **Decision**: 8종 잠금 — ① WebGL Mesh Gradient ② 사선 그리드 텍스처 ③ 마우스 parallax ④ Scroll-linked scale+fade ⑤ 떠다니는 키워드 풍선 6개 (scale+blur depth) ⑥ Magnetic CTA ⑦ Mask reveal 카피 ⑧ Lenis-aware scroll cue
- **Rationale**: devfive(scale+blur depth) + paper.design(사선 그리드) + Lenis 데모(scroll velocity)에서 추출한 best-of, Framer Motion으로 90% 구현, WebGL 1개만 추가 의존성.
- **Impact**: `HERO-VARIANTS.md` B+ 섹션에 명세. 검수 체크리스트에 8개 항목 포함.
- **Date**: 2026-05-29

## DEC-045: 재사용 단위는 `/kit` 라이브 카탈로그에 반드시 등재
- **Context**: DEC-044로 추출 정책은 잠갔으나, "어떤 단위가 있는지·어떻게 끼우는지"가 코드를 안 열면 모름. 레고처럼 조립 가능하려면 한 페이지에서 시각·코드를 동시에 봐야 한다.
- **Decision**: `/kit` 단일 페이지(noindex)에 모든 재사용 단위(motion hooks · motion components · background layers · layout · hero variants 등)를 카테고리별 `<KitCard>`로 등재. 카드는 **이름(mono) · 카테고리 chip · import 경로 · 짧은 설명 · 라이브 데모 박스 · 복붙 코드 스니펫**으로 구성.
- **Rationale**: 새 멤버/세션이 "있는 단위를 발견 → 어떻게 쓰는지 확인 → 복붙"까지 1페이지로 끝. Storybook 같은 외부 도구 없이 Next.js 그대로 운영.
- **Impact**: `apps/web/app/kit/page.tsx` 신규, `components/kit/KitCard.tsx` 헬퍼. AGENTS.md Hard Rule 12 추가. 새 primitive 추가 시 `/kit`에 카드 등재 의무. PAGE-UPGRADE-BOARD에 `/kit` 추가. `robots.ts` disallow.
- **Date**: 2026-05-30

## DEC-044: 재사용 가능 기능은 항상 공유 컴포넌트/훅으로 추출
- **Context**: Hero B+ 인터랙티브 8종 작업 직전 정책 정립. 단일 컴포넌트에 박으면 재사용·검수·테스트 모두 어려움.
- **Decision**: 재사용 가능한 시각·인터랙션 기능은 **반드시 `components/motion/` 또는 `components/primitives/`에 추출**하고, 사용처는 조합만 한다.
- **Rationale**: 한 곳에서 만들어 두면 가격·Why·CTA·서비스 rail·플로팅 어디서든 일관성 있는 인터랙션. 토큰·접근성·reduced-motion 우회 1곳에서 유지.
- **Impact**: B+ 8종 → 8개 primitive로 분리. 각 primitive는 props로 강도·범위 조절 가능. `patterns/motion-primitives.md` 카탈로그 추가. AGENTS.md Hard Rule 11 추가.
- **Date**: 2026-05-29

## DEC-040: Prettier + prettier-plugin-tailwindcss
- **Context**: 포맷 규칙 잠금.
- **Options**: ① Prettier만 ② Prettier + tailwindcss 플러그인 ③ Biome formatter
- **Decision**: **Prettier + prettier-plugin-tailwindcss** (2-space, single quote, trailing comma all, printWidth 100)
- **Rationale**: Tailwind 클래스 자동 정렬 → 가독성 ↑, 머지 충돌 ↓.
- **Impact**: 루트 `.prettierrc.json`, `pnpm format` 스크립트.
- **Date**: 2026-05-29

## DEC-046: Interaction Catalog + Page-Component Map 운영
- **Context**: 외부 마케팅 라이브러리(21st.dev · Aceternity · Magic UI · Skiper)와 devfive 직접 캡처에서 발견한 인터랙션 패턴이 다양함. 그러나 페이지마다 어떤 컴포넌트를 끼울지·신규 추출 후보가 무엇인지 단일 출처 없음.
- **Decision**: 두 문서 신규 운영 — `docs/ref/INTERACTION-CATALOG.md` (11 카테고리 패턴 인벤토리) + `docs/ref/PAGE-COMPONENT-MAP.md` (17 라우트 × 컴포넌트 매핑). 새 인터랙션 도입은 카탈로그 매칭 → primitives 추출 → /kit 등재 → 매핑 갱신 순.
- **Rationale**: "있는 줄도 몰랐다"·"중복 추출" 방지. 페이지 작업 시작 시 첫 번째로 보는 표.
- **Impact**: AGENTS Hard Rule 13 추가. 신규 페이지 작성 시 매핑 표 갱신 의무.
- **Date**: 2026-05-30

## DEC-048: Site Build Storyboard 운영 — `<SiteBuildStoryboard>` 홈 섹션 잠금
- **Context**: 주인님 요청 — "웹사이트가 만들어지는 과정을 영상으로 만들어서 인터랙티브하게 보여주는" 섹션. INTERACTION-CATALOG §5 Sticky Scroll Reveal 후보를 실제 운영으로 승급.
- **Options**: ① 영상 파일(.mp4/.webm) hero ② 코드 기반 scroll-driven storyboard ③ Rive state machine ④ 미니 라이브 빌더(Phase 5+)
- **Decision**: **②** — Framer Motion `useScroll` + `useTransform` 기반 6단계 sticky scroll, 데스크톱(lg+) sticky 480vh, 모바일·reduced-motion stack 6장 자동 분기. 마지막 단계 토스트 "📩 새 문의가 도착했습니다"로 카피 회수.
- **Rationale**: 우리 보유 기술 스택(Framer Motion + Lenis)으로 추가 의존성 0. 토큰 따라가서 Color 시안 결정과 독립. "문의로 이어지는 홈페이지를 만듭니다" 카피를 인터랙션으로 증명 = 브랜드 메시지와 동치. 영상 대비 가볍고 iOS 자동재생 제약 없음.
- **Impact**: `apps/web/components/motion/SiteBuildStoryboard.tsx` 추출(`SmoothScrollProvider`·`MaskRevealText`와 동급 motion primitive), `motion/index.ts` export, 홈 `apps/web/app/page.tsx`에 섹션 삽입, `/kit#page-sections` KitCard 등재. INTERACTION-CATALOG §5 Sticky Scroll Reveal 행을 🔲 → ✅ 승급. PAGE-COMPONENT-MAP 홈 섹션 매핑 갱신. 향후 D(미니 라이브 빌더)로 발전 여지 보존.
- **Date**: 2026-05-30

## DEC-047: devfive 색·스타일 정렬 — Color 시안 4 추가 (다크 + 라일락)
- **Context**: agent-browser 직접 측정 결과 devfive 시그니처 컬러가 mint가 아닌 **라일락 `#9e9eff`**, 배경 다크 차콜 `#262628`. 사용자가 "색·스타일 devfive 참고"를 명시.
- **Options**: ① ivory+mint 유지 ② 라일락+다크로 전면 교체 ③ 시안 4번 추가
- **Decision**: **③** — 기존 시안 1·2·3 유지 + `/mockup/4` devfive 정렬 다크+라일락 추가. 컬러 결정은 4안 비교 후 주인님.
- **Rationale**: 사용자 의도 명세 옵션으로 잠금 + 기존 명세 깨지 않음. 토큰 교체만으로 작동.
- **Impact**: `packages/tokens/src/theme.css`에 `[data-mockup='4']` 추가, `COLOR-VARIANTS.md` 4안 섹션 + 비교표 8행. 선정 시 DEC-018(라이트 only) 재논의.
- **Date**: 2026-05-30
- **Superseded by**: DEC-049 (시안 4를 라일락 → mint로 교체)

## DEC-050: 페이지 데이터 SSOT — `content/pages/*.json` + zod 한 폴더 잠금
- **Context**: 홈 `/` 풀 작성 완료 후 SERVICES·WHY_ITEMS·CASES·REVIEWS·PROCESS·PRICING·PARTNERS가 `apps/web/app/page.tsx` 안에 하드코딩되어 비개발자가 콘텐츠만 수정하려 해도 코드 파일을 열어야 함. 주인님 질문: "텍스트도 JSON 형식으로 한 폴더에서 페이지별로 나눠 관리하면 수정 편할까".
- **Options**: ① 하드코딩 유지 ② TS 데이터 파일 (`content/pages/home.ts`) ③ **페이지별 JSON 한 파일 (`content/pages/home.json`) + zod 스키마** ④ 섹션별 잘게 쪼개기 (`content/pages/home/{hero,services,...}.json`)
- **Decision**: **③** — 페이지 1개 = JSON 1개 + `lib/content/schemas.ts` zod 검증. 긴 본문(사례 상세·블로그 글·공지·약관)은 기존 DEC-016 MD frontmatter 유지(하이브리드).
- **Rationale**: 
  - 비개발자도 JSON 직접 수정 가능 → 운영 비용 ↓
  - 페이지 1:1 파일 매핑 → 찾기 쉬움
  - Git diff로 콘텐츠/코드 변경 분리 → 감사 추적 명확
  - zod 빌드 시점 검증 → 누락·타입 오류 즉시 fail
  - 다국어 확장 친화 (`home.ko.json` / `home.en.json`)
  - VS Code + 추후 관리자 CMS 양쪽 편집 가능
- **Impact**: 
  - `content/pages/{home,services,pricing,cases,reviews,faq,contact,reservation,landing,notice,blog,products}.json` 13개 신규
  - `lib/content/schemas.ts` 작성 (페이지별 스키마)
  - `lib/content/loaders.ts` 헬퍼 (load + parse + cache 옵션)
  - 페이지 컴포넌트 리팩토링 (json import + zod parse + props 전달)
  - `content/pages/_README.md` 비개발자 가이드 작성
  - 홈 `/` 마이그레이션 우선 (Phase 4 묶음 A 진입 전), 나머지 페이지는 작성 시 처음부터 JSON
  - `CONTENT-MODEL.md` §6 신설 (이 결정 명시)
  - `lib/config.ts` 잔류 #TODO 항목(사업자 정보·카카오 URL)은 그대로 TS 유지 (시크릿/타입 안전 우선)
- **Date**: 2026-05-30
- **Builds on**: DEC-016 (.md frontmatter + zod) — 페이지 데이터는 JSON으로 확장, 본문은 MD 그대로
- **Verification**: 마이그레이션 후 typecheck + build PASS · agent-browser 시각 검수 · 비개발자가 `content/pages/home.json` 한 파일 수정으로 카피 변경 가능 확인

## DEC-049: Color 최종 선정 — 시안 4 (Dark Charcoal + Mint, dark-charcoal SSOT 정렬)
- **Context**: 주인님 결정 — "보라색은 사용 안 하고 시안 4 하고싶어". 동시에 `design-agent-package-dark-charcoal/` 신규 SSOT 패키지를 정식 SSOT로 승격 (라이트 자산 4종 → 다크 차콜 자산 4종으로 교체). SSOT 문서 `DARK_CHARCOAL_STYLE_OVERRIDES.md`에 palette 완전 잠금 — `--bg: #101417`, `--mint: #65e6c7` (primary CTA), `--cyan: #4cc9f0`, `--ice: #b9ecff`, `--lime: #b8f26d`. "보라색 중심 그라데이션 피할 것" 명시.
- **Options**: ① 시안 4 라일락 유지(DEC-047) ② 시안 4 mint 교체(dark-charcoal SSOT) ③ 새 시안 5 추가
- **Decision**: **②** — 시안 4의 액센트를 라일락 `#9e9eff` → 민트 `#65e6c7`로 교체, 배경도 `#1a1a1d` → `#101417`(SSOT 일치)로 정렬. 시안 1·2·3은 보존하되 라이브 비교 후 시안 4 정착.
- **Rationale**: ① dark-charcoal SSOT(README + STYLE_OVERRIDES + 다크 자산 4종)가 mint/cyan/ice/lime 액센트 정책을 완전히 잠가놓음, ② 새 dark hero·workflow·proof·consultation PNG 4종이 mint 글로우 톤이라 라일락 액센트와 비주얼 불일치, ③ 시안 1의 mint 액센트와 액센트 토큰 통일되어 컴포넌트 재사용 가성비 ★★★.
- **Impact**: 
  - `packages/tokens/src/theme.css` `[data-mockup='4']` palette 전면 교체 (bg/surface/text/muted/line/accent/accent-strong/accent-soft/mint-rgb/amber 9 토큰)
  - `apps/web/components/hero/shared.ts` heroAssets 4 경로 `weflow-devfive-*` → `weflow-dark-charcoal-*`
  - `apps/web/public/assets/` 라이트 PNG 4개 삭제 + 다크 PNG 4개 배치
  - `design-agent-package/` (라이트 SSOT) 제거 + `design-agent-package-dark-charcoal/` → `design-agent-package/`로 rename 승격
  - `apps/web/app/mockup/[id]/page.tsx` 시안 4 label "Lilac" → "Mint", concept 갱신
  - DEC-018(라이트 only) supersede 필요 — 1차 출시 다크 only로 잠금, 라이트 토글은 2차 검토
  - DEC-047 supersede (라일락 액센트 폐기)
- **Date**: 2026-05-30
- **Supersedes**: DEC-018 (라이트 only — 다크 only 1차 출시로 변경), DEC-047 (라일락 액센트 — mint 교체)
- **Verification**: typecheck PASS · build SSG 4/4 prerender · agent-browser `/mockup/4` 1440·375 캡처 + 토큰 측정(`bg=#101417`, `text=#f4fbfa`, `accent=#65e6c7` 시안 4 범위) · ERROR_OVERLAY 0건

---

## DEC-056: 가격 정책 전면 개편 + 푸터 4 소셜·24시간 전화 (PRD §8 supersede)
- **Context**: 주인님이 신규 가격 정책 전달 — 단발 3종 이름/가격 변경(랜딩→🚀 START, 홈페이지→💼 GROW 999K→990K, 랜딩&홈페이지→👑 MASTER 1099K→1490K 풀패키지 격상), 케어 ★ 추천 이동(WEFLOW CARE→FLOW CARE), WEFLOW CARE 가격 인하(339K→289K), features 통째 재작성(SNS 운영 횟수·광고 세팅 할인 등 명세화). 동시에 푸터 신설 사항 — 24시간 전화 010-2971-7280 + 4 소셜(카카오 채널·인스타·페이스북·네이버 블로그) 노출. 기존 PRD §8 Pricing Lock 8종을 supersede.
- **Decision**: ① **pricing.json plans 8종 통째 재작성** — `start`/`grow`/`master` (단발) + `we-care`/`flow-care`★/`weflow-care` (케어) + `naver-ads`/`carrot-ads` (광고). 각 features를 신규 명세 그대로 (예: FLOW CARE "유지보수 월 3건 · 블로그 월 2회 · 인스타 월 8회(주 2회) · 스레드 월 8회 · 네이버 키워드 세팅 할인 149K→79K · 당근 50% 할인 79K→39K · 문의 개선 · SEO 상단등록"). featured 플래그를 WEFLOW CARE에서 FLOW CARE로 이동, badge "CARE ★ 추천" → "CARE ⭐ 추천". ② **compare 표 갱신** — 컬럼 헤더를 "🚀 START · 💼 GROW · 👑 MASTER"로, 가격 행을 249K/990K/1490K로, 신규 row 추가(반응형·문의폼·카카오 상담연동·SEO·예약/문의 시스템·광고 전환 구조). ③ **home.json pricing.items 3 카드** — [`start`, `flow-care`★, `master`] (양쪽 단발 + 가운데 케어 추천). ④ **services.json 정렬** — items[build].price를 "START 249K · GROW 990K · MASTER 1490K"로, FAQ f1/f4를 신규 이름/가격으로 재작성, items[admin].price를 "포함 (FLOW CARE 이상 플랜)"로 정정. ⑤ **lib/config.ts** — `company.phone: '010-2971-7280'` + `phoneTel: 'tel:+821029717280'`, `social.kakaoChannelUrl: 'http://pf.kakao.com/_xntCbX'`, `social.instagram: 'https://www.instagram.com/weflowlab.kr'`, `social.blog: 'https://m.blog.naver.com/weflowlab'`, `social.facebook: 'https://www.facebook.com/profile.php?id=61590187124682'`. ⑥ **SiteFooter.tsx 통째 재작성** — 3 컬럼 → 4 컬럼 grid, 브랜드 컬럼에 "📞 24시간 상담 010-2971-7280" tel: 링크(`text-accent-strong font-mono`), "팔로우" 컬럼 신설(카카오톡 채널·인스타그램·페이스북·네이버 블로그 4 링크 target=_blank rel=noreferrer), "사업자 정보"·"법무"는 유지.
- **Rationale**: ① 신규 단발 이름 START/GROW/MASTER는 사장님 성장 단계 친화적(소상공인이 "이번엔 START로 시작하고 다음에 GROW로 올리자" 같은 의사결정 자연스러움). ② MASTER 풀패키지(랜딩+홈피+프리미엄 디자인+예약 시스템+SEO 최적화+광고 전환 구조)는 +391K 인상이지만 가치 명확. ③ FLOW CARE ★ 추천 이동은 가성비 핵심(189K로 SNS 주 2회+광고 할인+문의 개선까지) — 사장님 진입 장벽 낮춤. ④ WEFLOW CARE 인하(339K→289K)는 풀세팅을 더 접근 가능하게. ⑤ 푸터 24시간 전화 + 4 소셜은 전환 채널 다각화 + 신뢰감 보강. ⑥ tel: 링크는 모바일에서 원터치 발신.
- **Impact**:
  - `apps/web/content/pages/pricing.json` plans 8종 통째 + compare 11 행 갱신
  - `apps/web/content/pages/home.json` pricing.items 3 카드 swap (landing/weflow-care★/homepage → start/flow-care★/master)
  - `apps/web/content/pages/services.json` items[build].price + items[admin].price + FAQ f1/f4 갱신
  - `apps/web/lib/config.ts` company.phone + phoneTel + 4 social URL (env fallback에서 실제값으로)
  - `apps/web/components/layout/SiteFooter.tsx` 3 컬럼 → 4 컬럼 (브랜드/팔로우/사업자/법무) + 24시간 tel: 링크 + 4 소셜 외부 링크
  - PRD §8 Pricing Lock supersede (DEC-055 잠금이 새 SSOT)
- **Date**: 2026-05-31
- **Supersedes**: PRD §8 Pricing Lock (가격 잠금 — 신규 단발 3종 이름/가격 + 케어 가격/추천 위치 모두 재정의), DEC-022 (카카오 채널 #TODO_KAKAO — 실제 URL `pf.kakao.com/_xntCbX` 적용)
- **Verification**: typecheck PASS · build SSG · check-design-tokens PASS · 금기어 0건 · pricing.json 8 plans + compare 표 + home.json 3 카드 + services.json 3 위치 정합 확인 · 푸터 tel: 링크 동작 (모바일에서 발신 가능) · 4 소셜 모두 target=_blank rel=noreferrer

---

## DEC-054: 홈 5 섹션 시각 압도 인터랙션 + 5 motion primitive 신규 (devfive/Awwwards 2026 트렌드 정렬)
- **Context**: 톱니바퀴 섹션 외 홈 전체에 정적/일반 인터랙션만 있어 임팩트 부족. 주인님 요청 — "랜딩페이지의 다른 부분도 시각적 압도" + "쓸만한 기능들은 키트에 저장". WebSearch로 Awwwards Sites of the Year + Moburst 2026 + Aceternity UI 트렌드 조사, Cases/Why/Services/Reviews/CTA 5개 섹션에 적용할 패턴 매칭. **(c) 다 교체** 선택으로 5 섹션 한꺼번에 통합.
- **Decision**: ① **5 신규 motion primitive 추출** — `TiltCard`(perspective rotateX/Y + spring), `HorizontalPinScroll`(sticky pin + 가로 translate), `StickyStackCards`(카드 sticky stack + scale fade), `PauseMarquee`(CSS animation-play-state hover-pause), `StaggerReveal`(text word/char split + stagger fade-up). 모두 'use client', `useReducedMotion` 분기, framer-motion 기반(DEC-044 정책 준수, 추가 의존성 0). ② **5 섹션 통합** — Why 헤딩 `<StaggerReveal stagger={0.06}>` · Cases 6 카드 `<TiltCard maxTilt={8}>` · CTA primary 버튼 `<MagneticButton strength={12} radius={140}>`(기존 컴포넌트 재활용) · Services 4 카드 `<StickyStackCards>` (ServiceRailDrag → 박물관만) · Reviews 3 후기 `<PauseMarquee speed={50}>` (정적 grid → 흐르는 마퀴). ③ `globals.css`에 `@keyframes weflow-marquee-x` 추가(PauseMarquee 의존). ④ `CTASection`은 'use client'로 변환(MagneticButton client 의존). ⑤ `/kit MotionSignaturesSection.tsx`에 5 KitCard 등재(DEC-045 정책).
- **Rationale**: ① Awwwards 2026 Sites of the Year의 공통 트렌드 = scroll storytelling + sticky pin + 3D card tilt + magnetic CTA + text reveal stagger. ② 각 패턴이 WEFLOW 섹션 맥락과 자연 매칭(Cases=포트폴리오 임팩트·Why=스토리텔링·Services=단계별 전달·Reviews=양감·CTA=클릭 유도). ③ 모두 framer-motion 기반으로 추가 의존성 0, 번들 영향 minimal. ④ reduced-motion + 모바일 폴백 모두 처리(어지러움/접근성 보장). ⑤ 키트 등재로 다른 페이지에서도 재사용 가능(DEC-045).
- **Impact**:
  - 신규 `apps/web/components/motion/TiltCard.tsx` (~70줄), `HorizontalPinScroll.tsx` (~55줄), `StickyStackCards.tsx` (~80줄), `PauseMarquee.tsx` (~55줄), `StaggerReveal.tsx` (~55줄)
  - `apps/web/components/motion/index.ts` 5 export 추가
  - `apps/web/app/globals.css` `@keyframes weflow-marquee-x` 추가
  - `apps/web/app/_home/HomeSections.tsx` — import 정리(ServiceRailDrag 제거 + StaggerReveal/TiltCard/StickyStackCards/PauseMarquee 추가), HomeWhy 헤딩 wrap, HomeCases 카드 wrap, HomeServices ServiceRailDrag → StickyStackCards 교체(카드 디자인도 큰 카드로 재작성: code text-display + title text-h2 + body text-body), HomeReviews 정적 grid → PauseMarquee 가로 흐름 카드(w-80 shrink-0)
  - `apps/web/components/primitives/CTASection.tsx` server → 'use client' 변환 + primary Button MagneticButton wrap
  - `apps/web/app/kit/sections/MotionSignaturesSection.tsx` 5 KitCard 추가(TiltCard 라이브 demo + HorizontalPinScroll/StickyStackCards link to live + PauseMarquee 라이브 demo + StaggerReveal 라이브 demo)
  - ServiceRailDrag 실사용 0건으로 변경(홈에서 빠짐, /kit 박물관만 유지)
- **Date**: 2026-05-31
- **Verification**: typecheck PASS · build SSG (홈 + /cases/[id] 6 신규 SSG 라우트 포함) · `bash scripts/check-design-tokens.sh` PASS(hex 0건) · 금기어 0건 · agent-browser 1440 캡처 6장(`docs/daily/05-31/evidence/dec-054-interactive/services·story·why·cases·reviews·cta.png`) · overflow=false · console errors=0 · error overlay=false · Services StickyStack 작동(cta.png에서 03·04 카드 위로 쌓이며 다음 섹션 등장 확인) · 톱니바퀴 정상 회전 유지

---

## DEC-053: 톱니바퀴 옵션 2 자산 swap + 좌측 활성 카드 + 일방향 lock + Hero 영상 도입 (DEC-052 보강)
- **Context**: DEC-052 1차 구현에서 좌측 6 ol/li 카피의 마지막 단계(p6)가 sticky 480vh release 직후 다음 `<HomeServices>` 섹션을 시각적으로 침범(opacity tween이 progress=1.0에서 0.3~0.4로 잔류). 또한 코드 SVG 톱니바퀴(280-300px)가 시각 비중상 좌측 카피와 동등해 devfive 스타일 압도감 부족. 주인님이 즉시 외부 자산(`weflow-process-gear.png` 1254×1254 투명 PNG, Imagen 생성) + Hero 영상(`hero.mp4` 2.96MB)을 전달 → 옵션 2(외부 자산) 즉시 swap 가능 상태.
- **Decision**: ① 코드 SVG `<path d={cogPath}>` + 6 톱니 배지 + buildCogPath() 일체 폐기 → `<motion.img src="/assets/process/weflow-process-gear.png" style={{rotate}}>`로 swap, hub 중앙 활성 step 번호 + 12시 fixed highlight ring은 absolute overlay 유지(회전 안 함). ② 좌측 6 ol/li(StageRow) 폐기 → `<ActiveStageCard>` 1개 + `<ProgressDots>` 6점으로 단순화, `<AnimatePresence mode="wait">`로 단계 전환 시 fade swap. ③ 일방향 회전 lock — `maxProgress` useRef + `useTransform`으로 한 번 도달한 progress는 안 내려가게 처리(한 번 -300°에 도달하면 위로 스크롤해도 회전·activeIdx 유지). ④ 레이아웃 `grid-cols-[1.05fr_1fr]` → `grid-cols-[0.42fr_1fr]`로 우측 톱니바퀴 dominant. ⑤ Hero 영상 자산 `apps/web/public/hero/hero-bg.mp4` 배치 + `home.json hero.video: null → "/hero/hero-bg.mp4"`로 `<HeroVideo>` 자동 영상 재생 전환.
- **Rationale**: ① 외부 PNG는 코드 SVG로 표현 어려운 그라데이션·반사광·미세 디테일 풍부 + 디자인 도구 변경 시 코드 0건 수정으로 자산 교체 가능. ② 활성 카드 1개만 노출하면 카피 침범 원천 차단(렌더되는 ol 자체가 없음) + devfive 스타일 1 메시지 압도 달성. ③ 일방향 lock으로 사용자가 위로 스크롤할 때 톱니가 되감기는 어지러움 제거, 한 번 완성된 상태 유지가 더 자연스러움. ④ 0.42:1 비율로 좌측 narrow + 우측 560px 톱니바퀴 dominant. ⑤ Hero 영상은 DEC-052 후속 보강 자산 도입(주인님 Veo/Imagen 생성).
- **Impact**:
  - `apps/web/public/hero/hero-bg.mp4` 신규 배치 (2.96MB)
  - `apps/web/public/assets/process/weflow-process-gear.png` 신규 배치 (1254×1254 투명, 주인님이 직접 폴더 배치)
  - `apps/web/content/pages/home.json` hero.video 활성화
  - `apps/web/components/motion/SiteBuildStoryboard.tsx` 320 → 약 250줄 재작성 — `useRef` + `maxProgress` lock 패턴 추가, `AnimatePresence` import 추가, `<StoryboardCogwheel>` 좌측 구조 통째 교체(헤더 + ActiveStageCard + ProgressDots), `<CogwheelVisual>` SVG → motion.img + hub circle overlay + 12시 ring, `buildCogPath` 함수 삭제, 6톱니 SVG `<g>` 매핑 삭제. StoryboardStatic(모바일·reduced) 폴백은 정적 카드 6장으로 유지
  - 시각 검수 1440(`top·story-1·story-2·story-3·story-4·story-end`) + 375(`m-top·m-story-top·m-story-mid`) 캡처 9장 — overflow=false, console errors=0, error overlay=false, 다음 섹션 카피 침범 0건 확인
- **Date**: 2026-05-31
- **Supersedes**: DEC-052 부분 보강 (인터랙션 구조 변경 — 코드 SVG → 외부 PNG, 6 ol/li → 활성 카드 1개, 양방향 → 일방향 lock). 컴포넌트 이름·홈 위치·`/kit` 등재·home.json process SSOT는 유지
- **Verification**: typecheck PASS · build SSG **22/22** prerender · `bash scripts/check-design-tokens.sh` PASS · 금기어 0건 · agent-browser 1440/375 캡처 9장 · console errors=0 · horizontal overflow=false

---

## DEC-052: 홈 6단계 SSOT 일원화 + 톱니바퀴 인터랙션 + 고객시점 카피 (DEC-048 supersede)
- **Context**: 홈에 "사이트가 만들어지는 6단계"가 두 컴포넌트로 중복 렌더 중이었다. ① `<SiteBuildStoryboard>` (480vh sticky scroll + 우측 미니 브라우저 4 layer + 2 float, STAGES 하드코딩) + ② `<HomeProcess>` (`<ProcessAccordion>`, home.json `process` 사용). 같은 콘텐츠가 다른 카피·다른 인터랙션으로 두 번 나옴. 또한 STAGES는 제작자 시점("우리가 ~ 만듭니다")이라 주인님이 "랜딩페이지의 6단계를 고객 시점으로 바꿔야 한다" + "기존 인터랙션 제거하고 톱니바퀴 형식으로 마우스휠에 따라 회전하면서 단계 이동이 보이게" 요구.
- **Options**: ① 두 컴포넌트 모두 유지하고 카피만 분리 ② SiteBuildStoryboard만 두고 톱니바퀴로 리팩토링 + HomeProcess 제거 + home.json `process` SSOT 통합 ③ HomeProcess(ProcessAccordion)만 두고 SiteBuildStoryboard 제거
- **Decision**: **②** — SiteBuildStoryboard를 톱니바퀴 인터랙션으로 통째 재작성(파일명 유지, DEC-045 KitCard ID 보존), home.json `process` 데이터를 props로 받음, `<HomeProcess>` + page.tsx의 `<HomeProcess data={home.process} />` 호출 제거. `ProcessAccordion` 컴포넌트 자체는 박물관(/kit) 등재 + 다른 페이지 재사용 가능성으로 보존.
- **Rationale**: ① 콘텐츠 중복은 정합성 손해 + 카피 갱신 비용 2배, ② 톱니바퀴는 framer-motion `useScroll`+`useTransform`+`useMotionValueEvent`로 추가 의존성 0(DEC-044/048 모션 정책 준수), ③ home.json SSOT 통합으로 카피 변경이 JSON 1곳에서 끝남(DEC-050 정합), ④ 고객시점 카피("가게 얘기를 나눠요"/"첫 문의를 받아요")는 "맡기면 끝/사장님 친화" 톤(DEC-051 부수)과 정렬, ⑤ 시각적으로 톱니가 도는 것이 "단계가 진행되는" 메타포로 직관적.
- **Impact**:
  - `apps/web/lib/content/schemas.ts` `HomeProcessItem`에 `nickname`(optional) + `result`(optional) 필드 추가
  - `apps/web/content/pages/home.json` `process` 섹션 통째 재작성 — eyebrow "이렇게 만듭니다" / title "6단계로 완성되는 사장님의 홈페이지" / sub 톱니바퀴 안내 / items 6개 모두 신규 "우리" 톤 + nickname + result 필드 (가게 얘기를 나눠요 → 페이지 순서를 함께 정해요 → 브랜드 분위기를 살려내요 → 콘텐츠를 가득 채워요 → 첫 문의를 받아요 → 계속 함께 챙겨요)
  - `apps/web/components/motion/SiteBuildStoryboard.tsx` 395 → 320줄 통째 재작성 — `data: HomePage['process']` props 시그니처, 우측 미니 브라우저 일체 폐기(BrowserFrame · PaperDots · Wireframe · ColoredFrame · ContentFilled · PulsingCTA · InquiryToast 7개 내부 컴포넌트 삭제), 신규 `<StoryboardCogwheel>` + `<CogwheelVisual>` + `buildCogPath()` 절차적 SVG 생성기(6 톱니 × 4점 = 24점 polygon, outerR=105, innerR=85, 톱니 30° + 골 30°), 480vh sticky + `useScroll` rotate [0, -300°] + activeIndex `useMotionValueEvent` state sync, 12시 fixed highlight ring + hub 중앙 활성 step 번호 + 우측 활성 단계 result 텍스트
  - `apps/web/app/page.tsx` `<SiteBuildStoryboard />` → `<SiteBuildStoryboard data={home.process} />`, `<HomeProcess>` import 및 호출 제거
  - `apps/web/app/_home/HomeSections.tsx` `HomeProcess` export 함수 제거(17줄) + `ProcessAccordion` import 제거
  - `apps/web/app/kit/sections/PageSectionsSection.tsx` KitCard 갱신 — name/category/description/demo/code 모두 톱니바퀴 + 신규 6단계 카피로 동기화
  - DEC-048 잠금 supersede — 같은 컴포넌트 이름 유지하면서 인터랙션 메커니즘은 sticky storyboard → cogwheel rotation으로 전환
- **Date**: 2026-05-31
- **Supersedes**: DEC-048 (Site Build Storyboard 운영 — 미니 브라우저 sticky storyboard → 톱니바퀴 회전 + 고객시점 카피로 인터랙션·톤 재정의, 컴포넌트 이름·홈 섹션 위치·`/kit` 등재 유지)
- **Verification**: typecheck PASS · build SSG **22/22** prerender · `bash scripts/check-design-tokens.sh` PASS (hex 0건) · 금기어(병원·치료·시술) 0건 · home.json `process.items` 6개 모두 nickname+result+title+body 필드 충족 · `useReducedMotion` + `lg:hidden`/`hidden lg:block` 분기로 모바일·reduced 정적 폴백 유지

---

## DEC-051: Color SSOT 블루 라이트 톤 재정의 (`weflow-blue-startup-*` 자산 정렬), `/mockup` 시안 비교 폐기
- **Context**: 홈 hero에 블루 스타트업 톤 자산(`weflow-blue-startup-hero.png` — 하늘색/밝은 블루 그라데이션 + 화이트 UI + 마스코트)이 이미 들어가 있는데, 사이트 전역 `:root` 토큰은 DEC-049 dark-charcoal mint(`#101417` + `#65e6c7`). hero 비주얼과 페이지 나머지의 톤 충돌, 신규 카피 톤("맡기면 끝/사장님 친화")과도 어색. 주인님이 "히어로 섹션의 색에 맞춰서 교체 + 컬러 시안 비교 기능 삭제" 결정.
- **Options**: ① DEC-049 유지하고 hero 이미지를 다크 톤으로 재생성 ② 컬러 SSOT을 hero 톤(블루 라이트)으로 통일하고 `/mockup` 시안 비교 폐기 ③ 두 톤 다 지원하는 토글 시스템 도입
- **Decision**: **②** — `:root` palette를 블루 라이트 톤으로 전면 교체, `[data-mockup='1·2·3·4']` 4 시안 토큰 블록 모두 삭제, `apps/web/app/mockup/[id]/page.tsx` 라우트 폐기(SSG 26→22), `robots.ts`에서 `/mockup/` disallow 제거. hero-lab 시안 5종은 별도 박물관으로 보존.
- **Rationale**: ① hero 자산은 이미 블루 톤이고 신규 카피("사장님이 덜 고민하도록"·"실제 개발자가 직접")와 톤 일치, ② 시안 선정은 사실상 끝났고 `/mockup` 4 라우트는 박물관 상태라 유지 비용만 발생, ③ 라이트 모드가 한국 소상공인 친화도·신뢰감·가독성에서 우위, ④ Tailwind blue-500(`#3b82f6`)은 신뢰/SaaS 표준 액센트.
- **Impact**:
  - `packages/tokens/src/theme.css` `:root` 전체 교체 — bg `#f4f8ff` · surface `#ffffff` · surface-soft `#e8f0ff` · text `#0a1428` · muted `#5b6b85` · line `rgba(70,110,180,0.16)` · accent `#3b82f6` · accent-strong `#2563eb` · accent-soft `rgba(59,130,246,0.12)` · mint-rgb `59 130 246` · amber `#f59e0b` · shadow `rgba(10,20,40, *)` 라이트 친화 · color-scheme `light`. 시안 1·2·3·4 `[data-mockup='*']` 4 블록 삭제.
  - `apps/web/app/layout.tsx` themeColor `#f7f8f5` → `#f4f8ff` (모바일 주소창)
  - `apps/web/app/globals.css` grain `mix-blend-mode: multiply` + opacity 0.035 (라이트 친화)
  - `apps/web/app/mockup/` 폴더 전체 삭제 (page.tsx 313줄 + 4 SSG 라우트)
  - `apps/web/app/robots.ts`에서 `/mockup/` disallow 제거
  - `docs/status/PAGE-UPGRADE-BOARD.md` 디자인 시안 라우트 표에서 mockup 4행 → 1행 archive 노트로 통합
  - `scripts/check-design-tokens.sh` grep `--include` brace expansion 미지원 버그 픽스 (이전엔 검사가 사실상 무력화되어 있음)
  - 부수 보강: `<HeroManagedCards>` 삭제(홈 hero 우측 위젯), mascotBreak 카피 "귀여운 Flow Guide" → "실제 개발자가 직접 만들어드려요", `<SiteBuildStoryboard>` STAGES에 `result` 필드(단계별 결과물 한 장 메모→와이어→디자인→베타→라이브+광고→월 리포트+케어) + 섹션 제목 "우리가 6단계로 직접 만들어드립니다", pricing 카드 ribbon(`absolute -top-3.5`) + originalPrice 취소선 + 큰 accent 가격 + "부가세 포함"
- **Date**: 2026-05-30
- **Supersedes**: DEC-049 (dark-charcoal mint :root — 블루 라이트로 재정의, `[data-mockup='4']` 토큰 블록 삭제)
- **Verification**: typecheck PASS · build SSG **22/22** prerender · `bash scripts/check-design-tokens.sh` (패치 후) PASS · PRD §8 8종 + 기존가 3종 grep 24회 노출 · 금기어(병원·치료·시술) 0건 · `/mockup/*` 404 · themeColor 모바일 주소창 `#f4f8ff` 라이트 블루

---

## DEC-055: Landingfolio 기반 대표 컨펌용 레퍼런스 목업 사례 운영
- **Context**: 주인님이 대표 컨펌 목적의 사례 영역을 Landingfolio에서 찾은 스크린샷으로 채우길 요청. 기존 `/cases` 데이터는 가상 업종명과 `+N%` 성과 수치가 있어 실제 납품/실제 성과처럼 오해될 위험이 있었다.
- **Decision**: `/cases`와 홈 사례 섹션을 "성공 사례"가 아니라 "대표 컨펌용 레퍼런스 목업" 톤으로 운영한다. Landingfolio 공개 레퍼런스 6종(Headroom · Breyta · Zixflow · Jive · Glide · BetterLegal) 스크린샷을 1200×675 자산으로 저장하고, 각 항목의 `sourcePath`에 Landingfolio 원본 URL을 남긴다.
- **Rationale**: 대표에게는 추상 카피보다 실제 랜딩 스크린샷이 빠르게 전달된다. 다만 실제 고객 사례로 보이면 신뢰 리스크가 있으므로 수치형 성과 대신 검토 포인트(`강한 히어로 카피`, `제품 화면 신뢰감` 등)를 사용한다.
- **Impact**:
  - `apps/web/public/assets/cases/weflow-case-ref-*.png` 6개 추가
  - `apps/web/content/pages/home.json` `cases` 섹션 교체
  - `apps/web/content/pages/cases.json` 6 항목을 Landingfolio 레퍼런스 목업으로 교체
  - `CasesPageSchema` category enum에 `SaaS`·`비즈니스`·`제품` 추가
  - `/cases` hero badge와 `/cases/[id]` 상세 라벨을 레퍼런스/목업 톤으로 변경
- **Date**: 2026-05-31
- **Verification**: `pnpm typecheck` PASS · `pnpm lint` PASS · `pnpm build` PASS(SSG 28/28) · `bash scripts/check-design-tokens.sh` PASS · 금기어/가짜 성과 grep 0건 · Chrome headless 1440/768/375 `/cases` + 1440 `/cases/headroom` 캡처 저장. `check-file-size`는 기존 `MotionSignaturesSection.tsx` 463줄로 FAIL, 이번 변경 파일 `schemas.ts`는 397줄.

---

## DEC-057: 워크숍 리팩터 — 7 phase 인터랙션 풀패키지 + Phase 5 삭제
- **Context**: 홈 본문 정적 카드 위주 → "작업실(Workshop)" 컨셉으로 살아 움직이는 인터랙티브 공간 전환 요구. 8개 phase 마스터 플랜(`docs/plans/2026-05-31-workshop-refactor.md`)에서 Phase 1~4·6·7은 일괄 진행, Phase 5(사례 before/after)는 가치 대비 비용으로 삭제, 그 시간을 스토리/서비스 시네마틱 풀 개선에 투입.
- **Decision**: Phase 1(기초·primitive·자산) + Phase 2(스토리 SSOT + HorizontalPinScroll) + Phase 3(가격 토글·countup·featured fade) + Phase 4(후기 모달·focus trap·별점 분포) + ~~Phase 5~~ DELETED + Phase 6(블로그 FLIP + URL ?tag 동기화) + Phase 7(FAQ 검색·height fade·sticky 마스코트·AI 챗 티저) + Phase 8(통합 검수) 진행. Phase 9(멀티스텝 폼)는 별도.
- **Rationale**: ① 작업실 컨셉이 톤 일관성과 콘텐츠 확장 여지 둘 다 잡음. ② Phase 5 cases before/after는 자산 준비 비용 + a11y(role=slider) 부담 대비 신뢰 가치 낮음. ③ /reviews 풀 인터랙션과 스토리/서비스 시네마틱 강화가 더 큰 임팩트.
- **Impact**:
  - 신규 schema 6종: `lib/content/{shared,story,pricing,reviews,blog,faq}-schema.ts` + `schemas.ts` wildcard re-export
  - 신규 primitive/motion: `ComingSoonChip` · `ScrollProgressRail` · `ReviewModal` · `useCountupText` (모두 `/kit` 등재)
  - 라우트별 컴포넌트: `HomePricing` · `HomeReviews` · `StorySections(HorizontalPinScroll)` · `ServicesFlow` + `ServicesShowcase` · `ReviewsMetricBar` + `ReviewCard` + `ReviewsFilterableGrid` · `BlogFilterableGrid` · `FaqFilterableList` · `/contact` placeholder
  - 자산: Unsplash 톤 placeholder SVG + sidecar(`scripts/check-assets.mjs` 신설)
  - 신규 메모리 3종: `feedback_public_ui_persona` · `feedback_room_label_policy` · `feedback_kit_auto_register`
- **Date**: 2026-05-31
- **Supersedes**: 없음 (Phase 5는 새 결정이므로 supersede 불필요)
- **Verification**: `pnpm typecheck` PASS · `pnpm lint` 0 errors(4 warnings는 placeholder `<img>`) · `bash scripts/check-file-size.sh` PASS · `node scripts/check-assets.mjs` PASS(6 sidecar) · 신규 코드 hex 0건 · 금기어 0건 · 각 phase Opus 자기리뷰 모두 PASS / 조건부 PASS · 통합 자기리뷰 PASS-with-doc-sync-note · Phase 9 진입 권고 받음.

---

## DEC-058: Phase 9 — 자체 멀티스텝 진단 폼 + Resend 통합, 네이버 폼 폐기
- **Context**: `/contact`가 네이버 폼 임시 placeholder(`https://naver.me/your-form-id #TODO`) 상태였음. 주인님 자료가 외부 폼에 묶이고, 카피·디자인 통제도 어려운 구조. 폼 원문은 `apps/web/content/forms/diagnose-form-source.md`(34문항/10페이지)에 보존.
- **Decision**: 자체 멀티스텝 폼을 `/contact/form`에 신설. Naver 34문항 → **15문항 5스텝**으로 압축. Resend로 운영자 이메일 발송. 네이버 폼 진입은 제거.
- **Rationale**: ① 자료가 자사 도메인 안에 모임 ② 디자인 톤·카피 통제 가능 ③ 입력 도중 새로고침에도 localStorage draft 복원 ④ 키 미설정 시 graceful dryrun으로 dev 환경 안전 ⑤ 압축이 사용자 부담을 줄이고 핵심 데이터는 유지.
- **Impact**:
  - 신규 파일 13건: `app/contact/form/{page,DiagnoseFormShell,DiagnoseProgress,DiagnoseStep,DiagnoseQuestion,DiagnoseReview}.tsx` · `app/contact/form/thank-you/page.tsx` · `app/api/diagnose/route.ts` · `lib/email/diagnose-email.ts` · `lib/content/diagnose-form-schema.ts` · `content/pages/diagnose-form.json` · `components/primitives/RadioGroup.tsx` · `apps/web/.env.example`
  - 수정 파일 6건: `app/contact/page.tsx`(네이버 폼 제거 + `/contact/form` CTA) · `lib/content/schemas.ts`(re-export) · `lib/content/loaders.ts`(getDiagnoseForm) · `components/primitives/index.ts`(RadioGroup) · `app/kit/sections/PrimitiveBasicsCards.tsx`(KitCard 등재) · `app/kit/demos.tsx`(RadioGroupDemo)
  - 의존성: `resend` 추가 (apps/web)
  - 환경변수: `RESEND_API_KEY` · `RESEND_FROM_EMAIL` · `OWNER_EMAIL` (`apps/web/.env.example` 참조)
  - SSOT: `DiagnoseFormPageSchema`(콘텐츠) + `DiagnoseSubmissionSchema`(제출 검증) 분리. answer 타입은 `z.union([string, string[], ContactAnswer])` discriminated.
  - a11y: `role=progressbar` + `aria-valuenow`, `role=radiogroup`, 키보드 nav, honeypot hidden field로 봇 차단.
- **Date**: 2026-05-31
- **Supersedes**: DEC-022 `#TODO_NAVER_FORM_URL` 영구 해제 (자체 폼이 대체)
- **Verification**: `pnpm typecheck` PASS · `pnpm lint` 0 errors (7 warnings — placeholder `<img>` 4건 기존 + route.ts no-console 3건은 의도된 dev logging) · `bash scripts/check-file-size.sh` PASS · `node scripts/check-assets.mjs` PASS (6 sidecar) · 신규 코드 hex 0건 · 금기어 0건 · Resend 키 미설정 시 dryrun 폴백 동작 확인 · localStorage `weflow:diagnose:draft:v1`로 새로고침 후 복원 동작.

---

## DEC-059: Vercel 배포 게이트 — `/kit` production 404 + 공개 sitemap 실라우트만 노출
- **Context**: 주인님이 Vercel 배포 준비를 요청하면서 `/kit` 페이지는 올리지 않아도 된다고 명시. 기존 `/kit`은 noindex였지만 production route로 접근 가능했고, SEO 체크 스크립트는 아직 구현되지 않은 `/products`·`/reservation`·`/landing`을 검사해 404 실패를 만들고 있었다.
- **Decision**: `/kit`은 `VERCEL_ENV=production`에서 `notFound()`로 차단한다. sitemap과 SEO manifest 검증은 현재 실제 200 응답 공개 라우트만 대상으로 한다. 기본 `/opengraph-image`를 추가하고, Vercel Analytics/Speed Insights는 `VERCEL=1` 환경에서만 로드한다.
- **Rationale**: 내부 컴포넌트 카탈로그는 배포 대상 공개 경험에서 제외하고, 검색엔진에는 실제 작동하는 라우트만 노출해야 한다. Vercel 전용 스크립트는 로컬 production smoke에서 404 콘솔을 만들지 않게 분리한다.
- **Impact**: `apps/web/app/kit/page.tsx` production 404 + dynamic runtime gate · `.vercelignore`에 `apps/web/app/kit/**` 추가 · `turbo.json` env 전달 · `apps/web/app/opengraph-image.tsx` 추가 · `sitemap.ts`/`robots.ts`/`check-seo-manifest.sh` 실라우트 기준 정렬 · `layout.tsx` Suspense 및 Vercel Insights env-gated 로드 · Story/Storyboard 이미지 `next/image` 최적화.
- **Date**: 2026-05-31
- **Supersedes**: 없음
- **Verification**: `pnpm typecheck` PASS · `pnpm lint` PASS · `VERCEL_ENV=production pnpm build` PASS · `vercel build --prod` PASS · `vercel deploy --prebuilt --prod` 완료 · `BASE_URL=https://weflowweb-eight.vercel.app pnpm check:seo` PASS · `pnpm check:tokens` PASS · `pnpm check:file-size` PASS · `pnpm check:korean-wrap` PASS · `pnpm check:harness` PASS · Playwright production smoke 1440/375 홈 + `/contact/form` 375 console error 0건, overflow 0건, `/kit` 404 확인.

---

## DEC-060: 브랜드 깊이감 — subtle blueprint background + premium card surface
- **Context**: 주인님이 "웹사이트 배경에 무늬나 배경을 넣어서 입체감과 브랜드가치를 높히는 방식"을 웹검색 기반으로 물었고, 이상하면 롤백할 전제로 실험 진행을 승인했다. 마케팅 사이트는 현재 밝고 미니멀하지만 본문 카드와 폼 표면이 다소 평면적이었다.
- **Decision**: 전역 `body`에는 토큰 기반의 옅은 blueprint grid와 gradient wash를 깔고, `<PageHero>`·`<CTASection>`에는 `brand-depth-section` mask grid를 적용한다. 전환 핵심 표면(가격 카드, 후기 카드, 사례 카드, 문의/진단 폼)은 `premium-card` 유틸리티로 border highlight + layered shadow를 공통 적용한다.
- **Rationale**: 성공 패턴은 "브랜드 기억점이 되는 약한 패턴 + 콘텐츠 카드의 깊이감"이며, 과한 orb/blob나 단색 그라데이션보다 WEFLOW의 제작/흐름/설계 이미지를 살리는 blueprint 계열이 적합하다. 모든 색은 CSS token과 `color-mix()`만 사용해 Hard Rule의 hardcoded hex 금지를 유지한다.
- **Impact**:
  - `apps/web/app/globals.css`: `body` layered background, `brand-depth-section`, `premium-card`, `premium-card-hover`
  - `apps/web/components/primitives/{PageHero,CTASection,Card}.tsx`: section/card 공통 표면 연결
  - 전환 핵심 페이지 표면: `/contact`, `/contact/form`, `/pricing`, 홈 가격/사례, `/reviews`
- **Rollback**: `globals.css`의 `brand-depth-section`·`premium-card*` 블록과 `body` background 추가분을 제거하고, PageHero/CTASection/Card 및 적용 페이지의 `premium-card` 클래스만 빼면 이전 평면 톤으로 복귀한다.
- **Date**: 2026-05-31
- **Supersedes**: 없음
- **Verification**: `pnpm check:tokens` PASS · `pnpm typecheck` PASS · `pnpm lint` PASS · `VERCEL_ENV=production pnpm build` PASS · Playwright local production smoke 1440/768/375 홈 + 375 `/contact/form` + 1440 `/pricing` console error 0건, overflow 0건, 스크린샷 `docs/daily/05-31/brand-depth-*.png` 저장.

---

## Template

```markdown
## DEC-XXX: 짧은 제목
- **Context**: 어떤 상황인가
- **Options**: 고려한 선택지 (선택)
- **Decision**: 선택한 것
- **Rationale**: 왜
- **Impact**: 파급 영향
- **Date**: YYYY-MM-DD
- **Supersedes**: DEC-YYY (있다면)
```

---

## 한줄정리

**32 기본 결정 + Phase 0.5에서 추가된 DEC-033/034/035까지 모두 한 곳에. 새 결정은 append-only로 가장 아래에.**
