# Dark Charcoal Style Overrides

작성일: 2026-05-30  
적용 대상: `WEFLOW_DEVFIVE_STYLE_DESIGN_SPEC.md`와 `WEFLOW_PRE_DESIGN_SPEC.md` 위에 덮어씌우는 시각 방향

---

## 1. 방향 요약

이번 버전은 “밝고 친근”보다 **다크 차콜에 어울리는 청량한 스타트업 톤**을 우선한다.

목표:

- Devfive의 정보 구조와 3D 포인트 감각 유지
- WEFLOW의 SaaS 플랫폼 성격 강화
- 어두운 배경에서도 답답하지 않은 민트/시안 청량감
- 30~40대 대표/실무자가 신뢰할 수 있는 프리미엄 스타트업 분위기

---

## 2. Palette

권장 CSS token:

```css
:root {
  --bg: #101417;
  --bg-2: #151b1f;
  --surface: #192125;
  --surface-raised: #202a2f;
  --surface-glass: rgba(30, 42, 47, 0.72);
  --line: rgba(202, 244, 238, 0.13);
  --line-strong: rgba(115, 236, 220, 0.32);
  --text: #f4fbfa;
  --text-muted: #9db0b2;
  --text-soft: #6f8285;
  --mint: #65e6c7;
  --cyan: #4cc9f0;
  --ice: #b9ecff;
  --lime: #b8f26d;
  --danger: #ff6b7a;
  --warning: #ffd166;
  --shadow: 0 24px 80px rgba(0, 0, 0, 0.36);
}
```

색상 역할:

- `--bg`: 전체 배경
- `--surface`: 카드/폼
- `--surface-glass`: hero/feature glass panel
- `--mint`: primary CTA, 성공/문의 전환 포인트
- `--cyan`: 링크, 그래프, SaaS 기능 포인트
- `--ice`: border glow, subtle highlight
- `--lime`: 성공/완료/추천 배지

피할 것:

- 보라색 중심 그라데이션
- 주황/갈색/카페톤
- 완전 검정 배경만 반복하는 무거운 톤
- 과한 네온 사이버펑크

---

## 3. Typography

- 큰 hero는 흰색 또는 아이스블루 톤으로 선명하게.
- 포인트 단어만 민트/시안 gradient 가능.
- 본문은 `#d8e6e7` 근처로 충분한 대비 확보.
- 한국어는 `word-break: keep-all`.
- 모바일 hero headline은 2~3줄로 직접 줄바꿈.

---

## 4. Component Treatment

Header:

- 차콜 반투명 배경 + blur
- 스크롤 시 민트/시안 얇은 border
- CTA는 민트 filled button

Hero:

- 좌측 큰 카피, 우측 `assets/weflow-dark-charcoal-hero.png`
- hero visual은 과하게 어둡게 덮지 않는다.
- 왼쪽 텍스트 영역에는 충분한 negative space 확보

Cards:

- `rgba(25, 33, 37, 0.82)` glass surface
- 1px mint/cyan low-opacity border
- hover 시 border glow와 y -2px 정도만
- radius는 8px 전후

Forms:

- 입력칸은 차콜 표면 위에 명확한 border
- focus는 mint/cyan ring
- validation/success는 색상만 의존하지 않고 아이콘/문구 동시 사용

Pricing:

- WEFLOW CARE는 lime/mint glow로 강조
- 가격 숫자는 흰색, VAT/안내는 muted

Reviews:

- 별점은 warning yellow를 쓰되 과하지 않게
- 후기 카드 배경은 dark glass

Floating CTA:

- `character-assets/weflow-flow-guide-floating.png`를 원형 버튼 또는 말풍선 버튼에 사용
- 모바일 하단 고정바와 겹치면 캐릭터 floating CTA는 숨김

---

## 5. Asset Mapping

이 패키지에서는 아래 dark-charcoal 에셋을 우선 사용한다.

| File | Usage |
|---|---|
| `assets/weflow-dark-charcoal-hero.png` | 홈/랜딩 hero |
| `assets/weflow-dark-charcoal-service-workflow.png` | 서비스/프로세스 |
| `assets/weflow-dark-charcoal-proof-board.png` | 사례/성과/후기 신뢰 |
| `assets/weflow-dark-charcoal-consultation.png` | 문의/상담 CTA |
| `character-assets/weflow-flow-guide-hero.png` | Why/Care Plan 보조 캐릭터 |
| `character-assets/weflow-flow-guide-floating.png` | Floating contact/help |
| `character-assets/weflow-flow-guide-review.png` | Reviews/FAQ/완료 상태 |

기존 밝은 에셋은 이 패키지에서 사용하지 않는다.

---

## 6. Design Prompt Addendum

```text
Use a dark charcoal visual system as the primary style.
The site should feel like a fresh startup SaaS product, not a heavy enterprise dashboard.
Use deep charcoal surfaces with mint, cyan, ice-blue, and lime accents.
Keep Devfive-inspired structure: sticky header, large hero, service card rail, Why checklist, project/case cards, process accordion, floating CTA, and mascot point illustration.
Do not use purple-dominant gradients, orange/brown palettes, or cyberpunk neon clutter.
Use the dark-charcoal assets in /assets first.
Use Flow Guide character assets as restrained supporting points, not as the main hero.
```

---

## 7. Acceptance Criteria

- [ ] 전체 톤이 다크 차콜 중심이다.
- [ ] 민트/시안/아이스블루/라임 외 포인트 색이 과하지 않다.
- [ ] 다크 배경에서도 CTA, 폼, 가격, 메뉴의 대비가 충분하다.
- [ ] Devfive 구조 요소가 남아 있다.
- [ ] Flow Guide 캐릭터가 섹션 포인트로만 절제되어 있다.
- [ ] 모바일 375px에서 캐릭터/플로팅 CTA가 폼과 겹치지 않는다.
