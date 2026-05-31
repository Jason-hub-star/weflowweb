# Devfive Reference Style Extraction For WEFLOW

작성일: 2026-05-29  
referenceUrl: https://devfive.kr/ko/  
targetRepo: https://github.com/lmg90219679-eng/weflow-web  
sourceSpec: `/Users/family/Documents/Codex/2026-05-29/weflow-https-www-weflowlab-kr/WEFLOW_PRE_DESIGN_SPEC.md`  
outputDir: `/Users/family/jason/devfive`

---

## 1. 접근 결과

### Devfive

- `https://devfive.kr/ko/` 공개 HTML 접근 가능.
- 사이트는 Next.js 빌드 결과로 보이며, CSS class가 난독화되어 있음.
- 원본 CSS/JS bundle을 그대로 재사용하면 유지보수성이 낮고 법적/저작권 리스크가 있음.
- 따라서 본 작업에서는 원본 코드/이미지/문구를 복제하지 않고, 구조와 인터랙션 패턴만 새로 재구현하는 방향을 사용한다.

### WEFLOW GitHub Logo

GitHub repo `lmg90219679-eng/weflow-web`의 `public/`에서 로고 후보를 확인했다.

- `public/logo_icon.png` 확인됨
- `public/main_icon.png` 확인됨

사본 저장 위치:

- `/Users/family/jason/devfive/reference-logo/weflow-logo_icon.png`
- `/Users/family/jason/devfive/reference-logo/weflow-main_icon.png`

### Naver Form Result

URL: https://form.naver.com/result/ehEvstUeOMNYP62X7DhdGA

- HTTP status: `200`
- 내려온 HTML은 네이버폼 앱 shell이며, 결과 데이터/응답 본문은 HTML에 포함되어 있지 않음.
- 현재 세션에서는 네이버 로그인/권한 또는 클라이언트 API 접근이 필요한 것으로 판단된다.
- 이후 사용자가 네이버폼 응답 텍스트를 직접 제공했으므로, `WEFLOW_DEVFIVE_STYLE_DESIGN_SPEC.md`에 최신 설문 기준으로 반영했다.

핵심 반영 내용:

- 회사/브랜드: `WEFLOW`
- 현재 웹사이트 URL: `https://weflow-web.vercel.app`
- 기존 웹사이트/도메인: `https://www.weflowlab.kr/`
- 업종: 홈페이지 제작 SaaS 플랫폼
- 주요 서비스: 업종별 홈페이지 제작 SaaS 플랫폼, 랜딩페이지 제작, 온라인 예약·상담 관리 시스템, 관리자 대시보드 구축
- 주요 타깃: 30대 남성 중심, 30~40대까지 확장
- 목표: 문의/구매 전환 개선, 콘텐츠/정보 구조 개선
- 문제: 모바일 불편
- 원하는 분위기: 밝고 친근, 프리미엄/미니멀, 기존 컬러 유지 + 다크톤 가능
- 닮고 싶은 포인트: 상단 메뉴 구조, 상품 리스트/카드 UI, 후기 섹션, 프리미엄/미니멀 분위기
- 필요한 페이지: 제품/서비스 소개, 상세페이지, 가격 안내, 후기, 사례, 블로그, 공지, FAQ, 문의
- 관리자 수정 요구: 배너/메인 문구, 후기 승인, 팝업/이벤트, 문의 관리, 상담 신청 관리, 성공사례 등록
- 연동: 카카오채널, 인스타, 블로그, 메일, 구글검색노출, 당근플레이스
- 납기: 랜딩 3~4일, 홈페이지 4~7일, 랜딩+홈페이지 10일 이내

---

## 2. Devfive에서 추출한 재사용 가능 패턴

### 정보 구조

- 고정 헤더
- 좌측 로고, 중앙 GNB, 우측 언어/테마 제어
- 모바일 우측 드로어 메뉴
- 히어로: 짧은 보조 문구 + 매우 큰 메인 카피 + 추상 기술 비주얼
- 서비스 카드 섹션
- Why/신뢰 체크리스트
- 프로젝트/포트폴리오 카드
- 클라이언트/파트너 신뢰 섹션
- 개발 프로세스
- 문의 CTA
- 플로팅 문의 버튼
- 3D 캐릭터/아이콘을 통한 브랜드 포인트

### 인터랙션

- 스크롤 시 헤더 배경/라인 변화
- 메뉴 hover underline
- 언어 드롭다운
- 라이트/다크 테마 토글
- 모바일 drawer open/close
- 섹션 reveal animation
- 서비스 카드 가로 드래그/스크롤
- 프로젝트 필터
- 프로세스 아코디언
- 기술 태그 플로팅/드래그형 hero 장식
- 3D 마스코트/아이콘을 Why, 문의, 플로팅 CTA 주변에 배치
- 하단/우측 고정 CTA

### 시각 리듬

- 카드 radius는 과하지 않은 8px 전후
- 큰 hero 타이포와 넓은 여백
- 실제 콘텐츠 섹션은 촘촘하고 기능적
- 밝은 배경과 다크모드를 모두 고려
- 미세한 glow/grid/blur 효과를 쓰되, CTA와 정보 가독성을 우선
- B2B 개발사/서비스 회사 느낌: 장식보다 신뢰, 프로세스, 결과 증거 중심

---

## 3. WEFLOW 적용 방향

WEFLOW의 기존 명세는 유지한다.

- 핵심 문구: `문의로 이어지는 홈페이지를 만듭니다`
- 핵심 전환: 무료진단, 예약, 상담 문의
- 필수 화면: 홈, 서비스, 가격, 성공사례, 예약, 랜딩페이지, 관리자
- 필수 기능: 무료진단 폼, 예약폼, 하단 고정바, 관리자 상태 관리, CSV/엑셀
- 금지: 병원/의료기술/치료/시술 관련 문구와 이미지

Devfive 스타일에서 가져올 것은 형태가 아니라 UX 패턴이다.

- Devfive식 hero scale을 WEFLOW의 전환 카피에 적용
- 서비스 카드를 `제작/광고/운영/관리` 흐름으로 재구성
- Why 체크리스트를 WEFLOW의 케어플랜 혜택으로 변환
- 프로젝트 카드/필터를 WEFLOW 성공사례 탐색에 적용
- 프로세스 아코디언/타임라인을 제작 과정에 적용
- floating CTA와 mobile bottom CTA를 함께 유지
- light/dark 가능성을 열어두되, WEFLOW는 소상공인 전환 사이트라 밝은 기본 테마를 우선
- Devfive의 캐릭터 원본은 복제하지 않고, WEFLOW 전용 `Flow Guide` 캐릭터로 대체

---

## 4. 생성 이미지 에셋

원본 Devfive 이미지는 복사하지 않고, WEFLOW 전용 PNG를 새로 생성했다.

| 파일 | 사용 위치 | 비율/크기 | 설명 |
|---|---|---:|---|
| `/Users/family/jason/devfive/assets/weflow-devfive-hero.png` | 홈/랜딩 hero 배경 | 1672x941 | Devfive식 추상 기술 흐름, 좌측 카피 공간 |
| `/Users/family/jason/devfive/assets/weflow-devfive-service-workflow.png` | 서비스/프로세스 섹션 | 1448x1086 | 제작, 광고, 검색, 관리 흐름 |
| `/Users/family/jason/devfive/assets/weflow-devfive-proof-board.png` | 성공사례/성과 증거 섹션 | 1586x992 | 포트폴리오/전환 성과 카드 보드 |
| `/Users/family/jason/devfive/assets/weflow-devfive-consultation.png` | 문의/상담 CTA 섹션 | 1672x941 | 상담/협업 이미지, 좌측 CTA 여백 |

이미지는 모두 텍스트/로고 없이 생성했으므로, 실제 UI 텍스트는 HTML/CSS로 얹는다.

---

## 5. 복제 금지 항목

- Devfive 로고, 고유 이미지, 고유 문구
- Next.js 난독화 class 이름
- `_next/static` CSS/JS bundle
- Devfive 조직 정보, 클라이언트명, 프로젝트명
- 원본 HTML을 그대로 붙인 구조

---

## 6. 다음 작업

- `https://www.weflowlab.kr/`은 2026-05-29 확인 시 `https://weflowlab.kr/`에서 www로 redirect 후 Vercel 404가 발생한다. 도메인 연결 상태를 구현/배포 단계에서 별도 점검한다.
- `https://weflow-web.vercel.app/`은 2026-05-29 확인 시 정상 200 응답이며, 현재 공개 프리뷰로 볼 수 있다.
- 디자인 에이전트는 `WEFLOW_DEVFIVE_STYLE_DESIGN_SPEC.md`를 기준으로 3안 비교 후 최종 시안을 만든다.
- 구현 에이전트는 Devfive 원본이 아니라 WEFLOW repo 구조와 이 문서의 컴포넌트/인터랙션 규칙을 기준으로 코딩한다.
