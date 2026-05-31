# Color Variants — WEFLOW

> `/mockup/[id]`에 코드 안으로 배포할 컬러 3안.  
> 같은 토큰 구조에서 **CSS 변수 값만 교체** → 시안 변경 비용 최소.

작성: 2026-05-29 · 잠금: DEC-025 · 마스터 §12

---

## 시안 1 — 명세 정통 (ivory + mint)

**id**: `/mockup/1`  
**컨셉**: 밝고 친근 + 프리미엄 미니멀 (기본)

```css
[data-mockup="1"] {
  --bg: #f7f8f5;
  --surface: #ffffff;
  --surface-soft: #eef3ef;
  --accent: #20b486;
  --accent-strong: #0b8065;
  --accent-soft: rgba(32, 180, 134, 0.14);
  --mint-rgb: 32 180 134;
}
```
- 캐릭터 Flow Guide와 가장 잘 어울림
- 30~40대 대표 신뢰감 ↑
- 가격·CTA 가독성 ★★★

## 시안 2 — ivory + mint + amber 강조

**id**: `/mockup/2`  
**컨셉**: 이벤트·추천 배지 강조 (시즌 LP 친화)

```css
[data-mockup="2"] {
  --bg: #f7f8f5;
  --surface: #ffffff;
  --surface-soft: #fff7e8;
  --accent: #20b486;
  --accent-strong: #0b8065;
  --accent-soft: rgba(32, 180, 134, 0.14);
  --amber: #f0b94f;
  --amber-soft: rgba(240, 185, 79, 0.18);
}
```
- WEFLOW CARE 추천 배지 amber로 강조
- 프로모션 hero 적합
- 시안 1과 같은 base + amber 확장

## 시안 3 — 화이트 + 딥 그린 (테크 프리미엄)

**id**: `/mockup/3`  
**컨셉**: B2B SaaS, 데스크톱 우선

```css
[data-mockup="3"] {
  --bg: #ffffff;
  --surface: #fafbfa;
  --surface-soft: #eef3ef;
  --text: #0c1410;
  --muted: #4b5751;
  --accent: #0b8065;
  --accent-strong: #064b3c;
  --accent-soft: rgba(11, 128, 101, 0.12);
}
```
- 그라데이션 포인트 미세 사용
- 친근함보다 신뢰·전문성 강조
- 캐릭터 사용 빈도 ↓

## 시안 4 — 다크 차콜 + 민트 (dark-charcoal SSOT · DEC-049 ✅ 선정)

**id**: `/mockup/4` · **상태**: ✅ 1차 출시 선정 (2026-05-30)  
**컨셉**: fresh startup SaaS · 다크 차콜에 mint/cyan/ice/lime 청량 액센트 · 보라 0건

```css
[data-mockup="4"] {
  /* Dark Charcoal SSOT — design-agent-package/docs/DARK_CHARCOAL_STYLE_OVERRIDES.md §2 */
  --bg: #101417;
  --surface: #192125;
  --surface-soft: #202a2f;
  --text: #f4fbfa;
  --muted: #9db0b2;
  --line: rgba(202, 244, 238, 0.13);
  --accent: #65e6c7;          /* mint — primary CTA */
  --accent-strong: #34d39a;
  --accent-soft: rgba(101, 230, 199, 0.18);
  --mint-rgb: 101 230 199;
  --amber: #b8f26d;            /* lime — success/추천 배지 */
  --amber-soft: rgba(184, 242, 109, 0.18);
}
```
**확장 palette (SSOT 명세)**: `--cyan: #4cc9f0` (링크·그래프), `--ice: #b9ecff` (border glow), `--lime: #b8f26d` (성공 배지)
- 자산: `weflow-dark-charcoal-{hero,service-workflow,proof-board,consultation}.png` 4종
- 마스코트 Flow Guide와 mint glow 자연스럽게 매칭
- 다크 only로 1차 출시 · 라이트 토글은 DEC-018 supersede 후 2차 검토
- **피할 것**: 보라색 중심 그라데이션 · 주황/갈색/카페톤 · 과한 네온

---

## 비교 매트릭스

| 기준 | 1 ivory+mint | 2 +amber | 3 white+deep | 4 dark+mint ✅ |
|---|:-:|:-:|:-:|:-:|
| 친근함 | ★★★ | ★★★ | ★★ | ★★ |
| 프리미엄 | ★★ | ★★ | ★★★ | ★★★ |
| 이벤트 강조 | ★★ | ★★★ | ★ | ★★ |
| 캐릭터 조화 | ★★★ | ★★★ | ★★ | ★★★ |
| 가독성(가격) | ★★★ | ★★★ | ★★★ | ★★★ |
| B2B 신뢰감 | ★★ | ★★ | ★★★ | ★★★ |
| 명세 일치 | ★★★ | ★★ | ★★ | ★★★ (dark-charcoal SSOT) |
| devfive 시그니처 | ★ | ★ | ★ | ★★★ |
| fresh startup | ★★ | ★★ | ★★ | ★★★ |

---

## 결정 절차

1. Day 3에 3안 `/mockup/[1..3]` 배포
2. 동일 페이지(홈 또는 가격)에 토큰만 교체
3. 데스크톱 1440 + 모바일 375 시각 검수
4. 주인님 선정 → `DECISION-LOG.md`에 `DEC-XXX: Color 선정 — <1/2/3>` 기록
5. `packages/tokens/src/colors.ts`에 선정 색만 남기고 시안 라우트는 보존(2차 옵션)

---

## 한줄정리

**시안 4 선정 ✅ (DEC-049, 2026-05-30) — dark-charcoal SSOT 정렬 다크 차콜 + 민트. 보라 0건, fresh startup 톤, mint/cyan/ice/lime 청량 액센트. 시안 1·2·3은 `/mockup/*` 라이브 시안 라우트로 보존.**
