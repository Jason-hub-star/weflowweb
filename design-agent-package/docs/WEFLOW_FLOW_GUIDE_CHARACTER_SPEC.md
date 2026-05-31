# WEFLOW Flow Guide Character Spec

작성일: 2026-05-29  
목적: Devfive의 3D 포인트 일러스트/마스코트 활용 방식을 WEFLOW 전용 캐릭터 시스템으로 재해석

---

## 1. 확인한 Devfive 패턴

Devfive는 단순 UI 카드만 쓰는 것이 아니라, 섹션 곳곳에 3D 일러스트를 배치해 브랜드에 기억점을 만든다.

확인한 예:

- `why_devfive/icons.webp`: VR/기술 콘셉트의 3D 인물과 미디어/콘텐츠 아이콘
- `contact_us/guide-icon.webp`: 안내/가이드용 3D 말풍선 아이콘
- `contact_us/inquiry-icon.webp`: 문의용 3D 채팅 아이콘
- `floating-button/button-icon.svg`: 플로팅 문의 버튼 포인트

역할:

- 기술 서비스를 딱딱하게 보이지 않게 완화
- 섹션 제목과 CTA 사이에 시각적 기억점 제공
- 문의/가이드/Why 섹션의 행동 유도 강화
- 브랜드만의 “익숙한 얼굴”을 만드는 장치

주의:

- Devfive의 원본 캐릭터, 아이콘, 색상 조합을 복사하지 않는다.
- WEFLOW에는 별도 캐릭터 `Flow Guide`를 사용한다.

---

## 2. WEFLOW 캐릭터 방향

캐릭터명:

```text
Flow Guide
```

역할:

- 방문자에게 제작/가격/문의 흐름을 안내하는 작은 디지털 가이드
- SaaS 플랫폼의 기능성을 부드럽게 전달하는 마스코트
- CTA, FAQ, 후기, 문의, 관리자 승인 같은 복잡한 행동을 친근하게 안내

톤:

- 밝고 친근
- 프리미엄 미니멀
- 민트/아이보리 중심
- 30~40대 대표가 부담 없이 느끼는 실무형 친근함

금지:

- Devfive의 VR 헤드셋 캐릭터 복제
- 보라색 슈트/마이크/VR 기믹 재사용
- 과한 캐릭터 중심 랜딩
- 의료/치료/시술 관련 연상
- 유아적이거나 장난감처럼 너무 가벼운 인상

---

## 3. 준비된 에셋

투명 PNG:

- `character-assets/weflow-flow-guide-hero.png`
- `character-assets/weflow-flow-guide-floating.png`
- `character-assets/weflow-flow-guide-review.png`

원본 chroma-key PNG:

- `character-assets/raw/weflow-flow-guide-hero-source.png`
- `character-assets/raw/weflow-flow-guide-floating-source.png`
- `character-assets/raw/weflow-flow-guide-review-source.png`

---

## 4. 사용 위치

### 4.1 Hero / Why Section

파일:

- `character-assets/weflow-flow-guide-hero.png`

사용:

- 홈 중반 Why/Care Plan 섹션
- 제품/서비스 리스트 상단 보조 그래픽
- 랜딩페이지 문제 해결 섹션

배치:

- 데스크톱: 우측 또는 카드 사이에 280~420px 크기
- 모바일: 섹션 하단에 180~240px 크기
- 핵심 CTA나 폼을 가리지 않는다.

### 4.2 Floating CTA / Help Widget

파일:

- `character-assets/weflow-flow-guide-floating.png`

사용:

- 우측 하단 floating contact CTA
- 무료진단 모달 오픈 버튼
- 모바일에서는 하단 고정바와 충돌하면 숨기거나 작은 아이콘으로 대체

배치:

- 원형 버튼 안에 crop
- hover 시 살짝 lift 또는 pulse 가능
- 클릭 시 무료진단/카카오 상담/문의 모달로 연결

### 4.3 Reviews / FAQ / Admin Approval

파일:

- `character-assets/weflow-flow-guide-review.png`

사용:

- 후기 섹션
- FAQ 섹션
- 관리자 승인 기반 후기 설명
- 문의 접수 완료/예약 완료 화면

배치:

- 텍스트 옆 보조 그래픽
- 빈 상태/성공 상태 illustration으로도 사용 가능

---

## 5. 디자인 규칙

- 캐릭터는 페이지당 1~2회만 사용한다.
- hero 주인공은 텍스트와 전환 CTA이며, 캐릭터는 보조 포인트다.
- 캐릭터 주변에 짧은 말풍선을 붙일 수 있지만, 이미지 안에 텍스트를 넣지 않는다.
- 말풍선 텍스트는 HTML 텍스트로 구현한다.
- 카드 UI와 겹칠 때는 z-index와 여백을 명확히 둔다.
- 모바일에서는 캐릭터가 폼 위를 덮지 않게 한다.

---

## 6. 디자인 에이전트 지시문

```text
Devfive처럼 3D 포인트 일러스트가 브랜드 기억점을 만드는 구조를 WEFLOW에도 적용한다.
단, Devfive 캐릭터를 복제하지 말고 WEFLOW 전용 Flow Guide 캐릭터를 사용한다.
캐릭터는 주요 CTA/Why/FAQ/후기/문의 흐름을 돕는 보조 장치이며, 페이지 전체를 캐릭터 중심으로 만들지 않는다.
사용 에셋:
- character-assets/weflow-flow-guide-hero.png
- character-assets/weflow-flow-guide-floating.png
- character-assets/weflow-flow-guide-review.png
```
