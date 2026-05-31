# WEFLOW Devfive-Style Pre Design Spec

작성일: 2026-05-29  
목적: 디자인 에이전트에게 프론트엔드 코딩 전 전달할 상세 명세서  
대상 repo: https://github.com/lmg90219679-eng/weflow-web  
현재 프리뷰 URL: https://weflow-web.vercel.app  
기존 웹사이트/도메인: https://www.weflowlab.kr/  
기존 명세: `/Users/family/Documents/Codex/2026-05-29/weflow-https-www-weflowlab-kr/WEFLOW_PRE_DESIGN_SPEC.md`  
레퍼런스 스타일: https://devfive.kr/ko/  
산출물 폴더: `/Users/family/jason/devfive`
현재 패키지 스타일 우선순위: `docs/DARK_CHARCOAL_STYLE_OVERRIDES.md`를 이 문서보다 우선 적용

---

## 0. 작업 원칙

이 문서는 Devfive의 원본 코드/이미지/문구를 복제하기 위한 문서가 아니다.  
Devfive에서 좋은 UX 패턴을 추출해 WEFLOW 브랜드와 전환 목표에 맞는 새 디자인으로 재구성하기 위한 명세다.

디자인 에이전트는 다음 순서를 반드시 지킨다.

1. 이 문서의 콘텐츠/기능 요구사항을 고정한다.
2. Devfive식 정보 구조와 인터랙션 패턴을 WEFLOW에 맞게 재해석한다.
3. 바로 최종 시안을 만들지 말고, 먼저 디자인 방향 3안을 비교한다.
4. 선택된 방향을 기준으로 고충실도 UI와 컴포넌트 명세를 만든다.
5. PC 1440, tablet 768, mobile 375 기준으로 텍스트 겹침/넘침을 방지한다.

---

## 0.1 최신 네이버폼 응답 반영

제출 정보:

- 설문명: 웹사이트 제작 요청서
- 제출 시각: 2026. 05. 29. 오후 07:23
- 회사명/브랜드명: `WEFLOW`
- 현재 웹사이트 URL: `https://weflow-web.vercel.app`
- 기존 웹사이트/도메인: `https://www.weflowlab.kr/`
- 기존 도메인 상태 확인: 2026-05-29 기준 `https://weflowlab.kr/`은 `https://www.weflowlab.kr/`로 redirect 후 Vercel 404 응답
- 현재 프리뷰 상태 확인: 2026-05-29 기준 `https://weflow-web.vercel.app/`은 200 응답

최신 응답에서 고정해야 할 방향:

- 업종: 홈페이지 제작 SaaS 플랫폼
- 주요 서비스:
  - 업종별 홈페이지 제작 SaaS 플랫폼
  - 랜딩페이지 제작
  - 온라인 예약·상담 관리 시스템
  - 관리자 대시보드 구축 서비스
- 주요 고객층:
  - 30대 남성 중심
  - 디자인 톤은 30~40대 타깃까지 커버
- 핵심 목표:
  - 전환 개선: 구매/문의 늘리기
  - 콘텐츠 정리: 정보 구조 개선
- 현재 사이트 문제:
  - 모바일이 불편함
- 유지하고 싶은 것:
  - 브랜드/스토리 페이지
  - 제품 상세 페이지 구성
  - 이미지/톤앤매너
- 닮고 싶은 포인트:
  - 상단 메뉴 구조: 스토리/제품/블로그/후기/공지
  - 상품 리스트/카드 UI
  - 후기 섹션
  - 전체 분위기: 프리미엄/미니멀
- 원하는 분위기:
  - 밝고 친근
  - 프리미엄/미니멀
  - 30~40대 타깃
- 컬러 방향:
  - 기존 컬러 유지
  - 다크톤(블랙/차콜)도 허용
- 메인 페이지에서 강조할 것:
  - 제품 구매/바로 구매 유도
  - 이벤트/프로모션
  - 단, 실제 쇼핑/결제 기능은 필요 없음이므로 `구매`는 상담/견적/플랜 선택 CTA로 해석한다.
- 메인 진입 구조:
  - 캠페인/랜딩 중심
  - 시즌별 교체 가능한 hero/banner 구조 필요
- 쇼핑/회원:
  - 쇼핑 기능 필요 없음
  - 결제 필요 없음
  - 회원 기능 필요 없음
- 리뷰 운영:
  - 사이트 내 후기 게시판
  - 관리자 승인 필요
- 공지/블로그 운영:
  - 사용자가 직접 올릴 예정
  - 관리자 필요
- 관리자에서 직접 수정하고 싶은 것:
  - 배너/메인 문구
  - 후기 승인
  - 팝업/이벤트
  - 문의 관리
  - 상담 신청 관리
  - 성공사례 등록
- 자료 준비 상태:
  - 로고
  - 상세페이지 문구
- 검색 노출:
  - 기본 세팅
  - 키워드 SEO 강화
  - 블로그 운영 템플릿
- 연동:
  - 카카오채널
  - 인스타
  - 블로그
  - 메일
  - 구글검색노출
  - 당근플레이스
- 희망 납기:
  - 랜딩페이지: 3~4일
  - 홈페이지 제작: 4~7일
  - 랜딩페이지&홈페이지 제작: 10일 이내
- 가장 늘리고 싶은 전환:
  - 문의
  - 견적요청
  - 카카오톡 상담
- 필요한 페이지:
  - 제품/서비스 소개
  - 상세페이지
  - 가격 안내
  - 후기
  - 사례
  - 블로그
  - 공지
  - FAQ
  - 문의

설계상 해석:

- 기존 명세의 `서비스/가격/사례/예약/랜딩/관리자` 구조는 유지한다.
- 최신 설문을 반영해 `제품 리스트`, `제품 상세`, `후기 게시판`, `공지/블로그`, `팝업/이벤트 관리`를 더 명확히 추가한다.
- “제품 구매”는 결제 기능이 아니라 `플랜 선택 → 무료진단/견적/카카오 상담`으로 이어지는 전환 흐름으로 처리한다.
- 캠페인/랜딩 중심 진입이므로 홈 hero는 관리자에서 교체 가능한 배너/메인 문구 구조를 전제로 디자인한다.

---

## 1. 브랜드와 핵심 메시지

- 브랜드명: `WEFLOW / 위플로우`
- 의미:
  - `WE`: 우리, 사람, 관계, 함께하는 가치
  - `FLOW`: 흐름, 성장, 연결, 앞으로 나아가는 움직임
- 한 줄 포지셔닝: 문의로 이어지는 홈페이지 제작과 운영 관리 서비스를 한 번에 제공한다.
- 최신 포지셔닝 보강: 업종별 홈페이지 제작 SaaS 플랫폼, 랜딩페이지, 온라인 예약·상담 관리, 관리자 대시보드까지 묶어 제공한다.

핵심 문구:

```text
문의로 이어지는 홈페이지를 만듭니다
```

보조 문구:

```text
홈페이지 제작부터 광고 연동·운영 관리까지
단순 제작이 아닌 문의 구조까지 설계합니다
```

브랜드 톤:

- 신뢰감
- 빠른 실행
- 전환 중심
- 운영 관리
- 데이터/성과
- 소상공인 대표가 바로 이해하는 실무형 언어
- 30~40대 대표/실무자가 신뢰할 수 있는 밝고 친근한 프리미엄 미니멀

피해야 할 인상:

- 일반 SaaS 템플릿처럼 추상적인 사이트
- 과한 미래형/사이버펑크
- 병원/의료기술/치료/시술 관련 이미지나 표현
- 광고 전단처럼 저렴해 보이는 구성
- 모바일에서 버튼/카드/폼이 답답하게 보이는 구성

---

## 2. Devfive 스타일을 WEFLOW에 적용하는 방식

### 2.1 Header

Devfive 패턴:

- 고정 헤더
- 좌측 로고
- 중앙 메뉴
- 우측 언어/테마 버튼
- 모바일 drawer
- 메뉴 hover underline

WEFLOW 적용:

- 좌측: repo 로고 이미지 + `WEFLOW`
  - 로고 후보: `reference-logo/weflow-logo_icon.png`
  - 보조 이미지: `reference-logo/weflow-main_icon.png`
- 권장 메뉴:
  - 스토리
  - 제품
  - 가격
  - 후기
  - 사례
  - 블로그
  - 공지
  - FAQ
  - 문의
- MVP route 매핑:
  - 스토리: 홈 또는 `/about`
  - 제품: `/products` 또는 `/services`
  - 가격: `/pricing`
  - 후기: `/reviews`
  - 사례: `/cases`
  - 블로그: `/blog`
  - 공지: `/notice`
  - FAQ: `/faq`
  - 문의: `/reservation` 또는 무료진단 폼
- 우측 primary CTA:
  - `무료진단받기`
  - 클릭 시 무료진단 폼 또는 모달
- 모바일:
  - 로고 + CTA 아이콘 + 햄버거
  - 오른쪽 drawer
  - drawer 내부에 메뉴, 무료진단 CTA, 카카오/전화 링크 배치

필수 인터랙션:

- 스크롤 12px 이상에서 헤더 border/shadow 활성화
- 현재 섹션 또는 route 메뉴 active 표시
- 모바일 drawer 열림 시 body scroll lock

### 2.2 Hero

Devfive 패턴:

- 매우 큰 hero headline
- 짧은 eyebrow 문구
- 추상 tech/flow visual
- 넓은 여백
- 은은한 grid/glow
- 기술 태그 또는 카드가 떠 있는 느낌
- 브랜드 포인트용 3D 캐릭터/아이콘 활용

WEFLOW 적용:

- 기본 배경: 밝은 ivory/mint 계열
- 다크 차콜 패키지에서는 `#101417 ~ #171d20` 배경과 mint/cyan/ice-blue/lime 포인트를 우선한다.
- 좌측: 핵심 카피와 CTA
- 우측: 무료진단 폼 또는 generated hero asset
- hero asset: `assets/weflow-dark-charcoal-hero.png`
- 보조 캐릭터 asset: `character-assets/weflow-flow-guide-hero.png`
- hero는 첫 화면에서 다음 섹션 일부가 살짝 보이게 구성한다.

Hero copy:

```text
랜딩&홈페이지 제작 · 광고 운영 · 검색 등록 · 맞춤형 웹 솔루션
문의로 이어지는 홈페이지를 만듭니다
홈페이지 제작부터 광고 연동·운영 관리까지, 단순 제작이 아닌 문의 구조까지 설계합니다.
```

CTA:

- Primary: `무료 진단 신청`
- Secondary: `성공 사례 보기`
- Tertiary: `랜딩 페이지 사례`

Benefit tags:

- 케어 플랜: 제작·광고·운영
- 빠른 제작: 3일~7일
- 합리적 비용: 가성비+퀄리티

### 2.3 Services

Devfive 패턴:

- `Our Service` 섹션
- 가로 카드 rail
- 카드별 아이콘/짧은 설명
- 모바일 drag scroll

WEFLOW 적용 카드:

1. 랜딩/홈페이지 제작
   - 문의 구조와 모바일 동선을 먼저 설계한다.
2. 광고/검색 연결
   - 네이버, 구글, 당근, 카카오, 블로그, 인스타 유입을 연결한다.
3. 운영/유지보수
   - 제작 후 수정, 콘텐츠, 검색 등록, 성과 체크를 관리한다.
4. 무료진단/전환 개선
   - 현재 사이트의 문의 동선과 CTA 문제를 진단한다.

사용 이미지:

- `assets/weflow-dark-charcoal-service-workflow.png`

### 2.4 Why / Care Plan

Devfive 패턴:

- Why 섹션
- 체크리스트형 신뢰 근거
- 긴 설명보다 빠르게 스캔되는 카드

WEFLOW 적용:

큰 제목:

```text
WEFLOW만의 케어 플랜 혜택
```

6칸 카드:

1. 제작+운영+광고+관리 원터치
2. 3~7일 빠른 제작
3. 합리적인 비용과 필요한 기능 중심 구성
4. 24시간 상담대기
5. 검색 등록과 광고 운영 지원
6. 업종별 문의 동선 설계

### 2.5 Projects / Cases

Devfive 패턴:

- 포트폴리오/프로젝트 카드
- 태그/카테고리 기반 탐색
- 결과와 신뢰를 보여주는 섹션

WEFLOW 적용:

- `/cases`는 업종별 성공사례 카드 목록
- 홈에서는 5개 미리보기
- cases page에서는 1열 카드 4개씩 촘촘한 리스트
- 카드 구조:
  - 상단 2/3: 이미지
  - 하단 1/3: 업종명, 짧은 설명, `자세히보기`
- 필터 후보:
  - 전체
  - 운동/뷰티
  - 교육
  - 전문서비스
  - 생활/지역업
- 실제 블로그 URL 미정이면 `#TODO_BLOG_URL`

사용 이미지:

- `assets/weflow-dark-charcoal-proof-board.png`
- 기존 repo case 이미지도 사용 가능

### 2.6 Process

Devfive 패턴:

- 프로세스 섹션
- 단계별 카드/아코디언
- 사용자가 다음 단계를 쉽게 이해

WEFLOW 적용:

PC:

- 가로 timeline 또는 2열 단계 카드

Mobile:

- 세로 timeline

단계:

1. 상담 · 진단
2. 기획 · 설계
3. 디자인
4. 개발 · 테스트
5. 검색 등록 및 노출 최적화
6. 광고 운영 · 사후관리

주의:

- `SEO 상단등록`은 보장 표현처럼 보일 수 있으므로 공개 UI에서는 `검색 등록 및 노출 최적화`를 우선 사용한다.

### 2.7 Contact / Floating CTA

Devfive 패턴:

- 문의로 연결되는 큰 CTA 섹션
- 우측 하단 floating button

WEFLOW 적용:

- 모바일 하단 고정바 4개:
  1. 24시간 상담
  2. 카카오톡문의
  3. 블로그
  4. 무료진단
- desktop에서는 우측 sticky/free diagnosis form 유지 가능
- footer와 겹치지 않게 bottom padding 확보
- CTA 이미지:
  - `assets/weflow-dark-charcoal-consultation.png`
- 플로팅 캐릭터:
  - `character-assets/weflow-flow-guide-floating.png`

### 2.8 Character / Mascot Point

Devfive 패턴:

- 3D 캐릭터/아이콘을 Why, 문의, 플로팅 버튼 주변에 배치해 브랜드 기억점을 만든다.
- 기술 서비스를 부드럽고 친근하게 보이게 만든다.

WEFLOW 적용:

- Devfive 원본 캐릭터를 복제하지 않고 WEFLOW 전용 `Flow Guide`를 사용한다.
- 캐릭터는 보조 포인트이며, 핵심은 전환 CTA와 서비스 정보다.
- 캐릭터 사용 위치:
  - Why/Care Plan 섹션: `character-assets/weflow-flow-guide-hero.png`
  - Floating contact/help: `character-assets/weflow-flow-guide-floating.png`
  - Reviews/FAQ/완료 상태: `character-assets/weflow-flow-guide-review.png`
- 세부 사용 규칙은 `docs/WEFLOW_FLOW_GUIDE_CHARACTER_SPEC.md`를 따른다.

---

## 3. 페이지 IA

| Route | Page | 목적 |
|---|---|---|
| `/` | 홈 | 첫 인상, 무료진단, 혜택, 프로세스, 사례, 후기 |
| `/services` | 서비스 | 제작 과정, 광고 운영, 사후관리 시스템 설명 |
| `/products` | 제품/서비스 리스트 | 업종별 홈페이지 제작 SaaS 상품/패키지 카드 탐색 |
| `/products/[slug]` | 제품/서비스 상세 | 업종별 상세페이지, 기능, 예시, CTA |
| `/pricing` | 제작플랜&가격안내 | 제작/케어/광고 플랜 가격 신뢰 확보 |
| `/cases` | 성공사례 | 업종별 사례와 블로그 연결 |
| `/reviews` | 후기 | 관리자 승인 기반 후기 게시판 |
| `/blog` | 블로그 | 직접 운영하는 콘텐츠/SEO 템플릿 기반 게시물 |
| `/notice` | 공지 | 이벤트/프로모션/업데이트 공지 |
| `/faq` | FAQ | 제작/가격/관리/광고/검색 관련 질문 정리 |
| `/reservation` | 예약 | 날짜/시간 선택 후 상담 예약 |
| `/landing` | 광고 유입 랜딩페이지 | 전환 설득 전용 페이지 |
| `/admin/login` | 관리자 로그인 | 인증 |
| `/admin` | 관리자 대시보드 | 문의/예약 관리 |

---

## 3.1 최신 IA 우선순위

디자인 에이전트는 다음 메뉴 구조를 1차 후보로 제안한다.

```text
스토리
제품
가격
후기
사례
블로그
공지
FAQ
문의
```

다만 구현 repo의 기존 route와 충돌을 줄이기 위해 초기 MVP에서는 다음처럼 묶을 수 있다.

- `스토리`: 홈 또는 `/about`
- `제품`: `/products` 또는 기존 `/services`를 확장
- `가격`: `/pricing`
- `후기`: 홈 섹션 + `/reviews`
- `사례`: `/cases`
- `블로그/공지`: `/blog`, `/notice`
- `FAQ`: `/faq`
- `문의`: 무료진단 폼, 예약, 카카오 상담

---

## 4. 가격 정보

모든 가격에는 `VAT 포함`을 표기한다.

### 제작 플랜

| 플랜 | 기존가 | 할인가 |
|---|---:|---:|
| 랜딩 페이지 제작 | 499,000원 | 249,000원 |
| 홈페이지 제작 | 1,990,000원 | 999,000원 |
| 랜딩&홈페이지 제작 | 2,190,000원 | 1,099,000원 |

### 케어 플랜

| 플랜 | 부제 | 가격 |
|---|---|---:|
| WE CARE | 기본 관리 플랜 | 월 89,000원~ |
| FLOW CARE | 성장 관리 플랜 | 월 189,000원~ |
| WEFLOW CARE | 올인원 관리 플랜 | 월 339,000원~ |

WEFLOW CARE 강조:

- 왕관 아이콘
- 추천/프리미엄 배지
- 별점 5개
- 색상/테두리/그림자에서 가장 강하게 표현

### 광고 플랜

| 플랜 | 가격 |
|---|---:|
| 네이버 광고 키워드 세팅 | 월 149,000원~ |
| 당근 플레이스 광고 키워드 세팅 | 월 79,000원~ |

필수 안내:

```text
도메인은 고객님 명의로 등록되며 비용은 별도입니다.
위플로우에서 등록 및 연결 세팅은 무료 지원해 드립니다.
광고비는 고객 계정에서 고객 결제수단으로 직접 결제되며, 위플로우는 운영 및 세팅만 합니다.
유지보수는 텍스트, 이미지, 링크 등 경미한 수정 기준입니다.
페이지 추가 및 기능 개발은 별도 비용이 발생할 수 있습니다.
```

---

## 5. 폼 요구사항

### 무료진단/견적 문의폼

표시 위치:

- 홈 hero 우측 또는 hero 하단
- `/landing` 우측 sticky form
- `무료진단받기` 버튼 클릭 시 모달 또는 폼으로 스크롤

필드:

- 이름: required
- 연락처: required
- 제작종류: required select
  - 랜딩 페이지 제작
  - 홈페이지 제작
  - 랜딩 & 홈페이지 제작
  - 기타(WEFLOW 케어플랜)
- 업종 입력칸: optional but recommended
- 추가요청사항: optional textarea
- 개인정보 수집 및 상담 동의: required checkbox

버튼:

```text
무료진단 후 견적 받기
```

상태:

- success: `접수 완료! 빠른 시간 내에 연락드리겠습니다.`
- validation: `개인정보 수집 및 상담 동의가 필요합니다.`
- error: `잠시 후 다시 시도해 주세요.`

### 예약폼

필드:

- 날짜
- 시간대
- 직접 입력 가능한 시간대
- 이름
- 연락처
- 제작종류
- 업종
- 추가요청사항
- 개인정보 동의

---

## 6. 관리자 요구사항

관리자 신규 구축 범위:

- `/admin/login`
- `/admin`
- `/admin/inquiries`
- `/admin/reservations`
- `/admin/reviews`
- `/admin/cases`
- `/admin/posts`
- `/admin/notices`
- `/admin/banners`
- `/admin/popups`

기능:

- 이메일/비밀번호 로그인
- 로그아웃
- 신규/진행중/완료 카운트
- 문의 목록
- 예약 목록
- 상태 변경: `new | in_progress | done`
- 삭제
- CSV 또는 XLSX 다운로드
- 날짜 내림차순
- 한글 깨짐 방지
- 배너/메인 문구 수정
- 후기 승인/비공개/삭제
- 팝업/이벤트 생성, 노출 기간 설정, 비활성화
- 성공사례 등록/수정/삭제
- 블로그/공지 직접 등록

관리자 우선순위:

1. 문의 관리, 상담 신청 관리
2. 배너/메인 문구, 팝업/이벤트 관리
3. 후기 승인
4. 성공사례 등록
5. 블로그/공지 등록

---

## 7. 디자인 토큰 후보

Devfive 참고에서 가져온 것은 느낌이며, 색상은 WEFLOW에 맞게 재구성한다.

```css
:root {
  --bg: #f7f8f5;
  --surface: #ffffff;
  --surface-soft: #eef3ef;
  --text: #111713;
  --muted: #5d675f;
  --line: rgba(17, 23, 19, 0.12);
  --accent: #20b486;
  --accent-strong: #0b8065;
  --accent-soft: rgba(32, 180, 134, 0.14);
  --amber: #f0b94f;
}
```

다크모드 후보:

```css
[data-theme="dark"] {
  --bg: #101313;
  --surface: #171c1b;
  --surface-soft: #1f2725;
  --text: #f6faf7;
  --muted: #a7b2ac;
  --line: rgba(246, 250, 247, 0.13);
  --accent: #62d9ae;
}
```

디자인 에이전트는 최종 팔레트를 새로 제안할 수 있지만, 다음은 지켜야 한다.

- 보라/파랑 그라데이션에 과도하게 의존하지 않는다.
- 버튼/가격/폼 가독성을 최우선으로 한다.
- 카드 radius는 기본 8px 전후를 권장한다.
- CTA는 `accent` 또는 별도 strong color로 명확히 구분한다.

---

## 8. 모션과 인터랙션

필수:

- sticky header shadow on scroll
- desktop nav hover underline
- mobile drawer
- section reveal animation: opacity + translateY
- service cards horizontal drag scroll on mobile
- product/package cards with filter or segmented tabs
- case category filter
- process accordion or timeline
- testimonial auto slider with hover/focus pause
- review board cards with admin approval state implied
- campaign hero/banner area that can be seasonally replaced
- popup/event surface controlled from admin
- floating CTA
- bottom fixed CTA on mobile

선택:

- light/dark mode toggle
- language dropdown
- hero floating tech/service tags

금지:

- 폼 입력 중 layout shift
- 텍스트가 버튼/카드 밖으로 넘침
- CTA를 이미지 위에 읽기 어렵게 배치
- 과도한 애니메이션으로 정보 탐색 방해

---

## 9. 콘텐츠 금지/주의

반드시 금지:

- 병원
- 의료기술
- 치료
- 시술
- 의료 효과
- 병원 사례

주의:

- `SEO 상단등록`, `검색 상단 노출`은 보장처럼 보일 수 있다.
- 공개 UI에서는 `검색 등록 및 노출 최적화`, `검색 노출 지원` 표현을 우선 검토한다.

---

## 10. 에셋 목록

### 로고

- `reference-logo/weflow-logo_icon.png`
- `reference-logo/weflow-main_icon.png`

### 생성 이미지

- `assets/weflow-dark-charcoal-hero.png`
- `assets/weflow-dark-charcoal-service-workflow.png`
- `assets/weflow-dark-charcoal-proof-board.png`
- `assets/weflow-dark-charcoal-consultation.png`

### 캐릭터 이미지

- `character-assets/weflow-flow-guide-hero.png`
- `character-assets/weflow-flow-guide-floating.png`
- `character-assets/weflow-flow-guide-review.png`

사용 규칙:

- 이미지 안에 텍스트를 넣지 않는다.
- 실제 UI 문구는 HTML 텍스트로 올린다.
- alt text는 장식 여부에 따라 빈 alt 또는 설명형 alt를 구분한다.
- hero 이미지 위에 텍스트를 얹을 경우 contrast overlay를 둔다.

---

## 11. 디자인 에이전트 최종 프롬프트

```text
WEFLOW 공식 웹사이트를 Devfive 스타일의 구조와 인터랙션 감각으로 새롭게 리디자인하기 위한 코딩 전 디자인 명세와 고충실도 UI 방향을 만들어줘.

중요:
- Devfive 원본 코드, 이미지, 로고, 고유 문구를 복제하지 않는다.
- Devfive에서 참고할 것은 고정 헤더, 큰 hero, 서비스 카드, Why 체크리스트, 프로젝트 카드, 프로세스, 모바일 drawer, 테마/언어 제어, 플로팅 CTA 같은 UX 패턴이다.
- WEFLOW의 콘텐츠, 가격, 폼, 관리자 요구사항은 고정한다.
- 바로 최종 시안을 만들지 말고 먼저 디자인 방향 3안을 비교한다.

브랜드:
- WEFLOW / 위플로우
- 현재 프리뷰 URL: https://weflow-web.vercel.app
- 기존 도메인: https://www.weflowlab.kr/ (현재 404 확인, 배포 단계에서 도메인 연결 점검 필요)
- 업종: 홈페이지 제작 SaaS 플랫폼
- 주요 서비스: 업종별 홈페이지 제작 SaaS 플랫폼, 랜딩페이지 제작, 온라인 예약·상담 관리 시스템, 관리자 대시보드 구축
- 주요 타깃: 30대 남성 중심, 30~40대 대표/실무자까지 커버
- 핵심 문구: 문의로 이어지는 홈페이지를 만듭니다
- 보조 문구: 홈페이지 제작부터 광고 연동·운영 관리까지, 단순 제작이 아닌 문의 구조까지 설계합니다.
- 톤: 밝고 친근, 프리미엄/미니멀, 신뢰감, 빠른 실행, 전환 중심, 운영 관리, 데이터/성과
- 컬러: 기존 컬러를 유지하되 다크톤(블랙/차콜)과 밝은 미니멀 버전을 비교
- 금지: 병원/의료기술/치료/시술/의료 효과 관련 표현과 이미지

필수 화면:
1. 홈
2. 서비스
3. 제품/서비스 리스트
4. 제품/서비스 상세페이지
5. 제작플랜&가격안내
6. 후기
7. 성공사례
8. 블로그
9. 공지
10. FAQ
11. 문의/예약
12. /landing 내부 랜딩페이지
13. 관리자 사이트

Devfive식 적용:
- sticky header with active nav underline
- mobile right drawer
- large hero typography with abstract tech-flow visual
- service card rail
- product/package card UI
- why/care-plan checklist cards
- case/project filter cards
- process timeline or accordion
- testimonial auto slider
- review board with admin approval
- campaign/seasonal hero banner
- popup/event UI
- desktop sticky/free diagnosis form
- mobile bottom fixed CTA
- floating contact CTA

사용 가능 에셋:
- logo: reference-logo/weflow-logo_icon.png
- main icon: reference-logo/weflow-main_icon.png
- hero visual: assets/weflow-dark-charcoal-hero.png
- service workflow: assets/weflow-dark-charcoal-service-workflow.png
- proof board: assets/weflow-dark-charcoal-proof-board.png
- consultation visual: assets/weflow-dark-charcoal-consultation.png
- flow guide hero mascot: character-assets/weflow-flow-guide-hero.png
- flow guide floating mascot: character-assets/weflow-flow-guide-floating.png
- flow guide review/FAQ mascot: character-assets/weflow-flow-guide-review.png

가격:
- 랜딩 페이지 제작: 249,000원, VAT 포함
- 홈페이지 제작: 999,000원, VAT 포함
- 랜딩&홈페이지 제작: 1,099,000원, VAT 포함
- WE CARE: 월 89,000원~
- FLOW CARE: 월 189,000원~
- WEFLOW CARE: 월 339,000원~, 왕관/추천/별점 강조
- 네이버 광고: 월 149,000원~
- 당근 플레이스 광고: 월 79,000원~
- 도메인 비용 별도, 광고비 고객 직접 결제, 유지보수 범위 안내 필수

폼:
- 이름, 연락처, 제작종류, 업종, 추가요청사항, 개인정보 동의
- 무료진단 후 견적 받기
- 예약 페이지는 날짜/시간/직접입력 시간대 포함
- 최종 전환은 문의, 견적요청, 카카오톡 상담이다.
- 쇼핑/결제/회원가입 기능은 필요 없다.

관리자:
- 로그인/로그아웃
- 문의 관리: 진행중/완료/삭제/CSV 또는 XLSX
- 예약 관리: 진행중/완료/삭제/CSV 또는 XLSX
- 배너/메인 문구 수정
- 후기 승인
- 팝업/이벤트 관리
- 성공사례 등록
- 블로그/공지 직접 등록

반응형:
- desktop 1440, tablet 768, mobile 375
- 한국어 word-break: keep-all
- 버튼/카드/폼 텍스트 넘침 금지
- 모바일 하단 고정바와 footer 겹침 금지
- 최신 문제점이 모바일 불편함이므로 모바일 375px 시안을 특히 자세히 검수

결과물 순서:
1. 디자인 방향 3안과 장단점 비교
2. 추천 방향 1개
3. 페이지별 wireframe
4. 고충실도 UI 방향
5. 컴포넌트 목록
6. 디자인 토큰 후보
7. 모션/인터랙션 명세
8. QA 체크리스트
```

---

## 12. Acceptance Criteria

- [ ] Devfive 원본 CSS/JS/class/image를 복제하지 않는다.
- [ ] WEFLOW 로고 후보를 사용한다.
- [ ] 생성 이미지 4개를 페이지 목적에 맞게 배치한다.
- [ ] 홈 첫 화면에서 `문의로 이어지는 홈페이지를 만듭니다`와 무료진단 CTA가 보인다.
- [ ] 제작/케어/광고 가격이 정확하다.
- [ ] 무료진단 폼과 예약폼 필드가 누락되지 않는다.
- [ ] 관리자 요구사항이 별도 화면으로 분리된다.
- [ ] 병원/의료기술/치료/시술 관련 내용이 공개 UI에 없다.
- [ ] mobile 375px에서 텍스트와 CTA가 넘치지 않는다.
- [ ] 하단 고정바가 본문/푸터를 가리지 않는다.
