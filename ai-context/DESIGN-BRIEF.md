# DESIGN BRIEF — WEFLOW (디자인 압축 요약)

> 토큰·타이포·모션을 한 화면에. 자세한 내용은 `docs/ref/DESIGN-TOKENS.md`, `HERO-VARIANTS.md`, `COLOR-VARIANTS.md`.

업데이트: 2026-05-29

---

## 톤 한 줄

밝고 친근 + 프리미엄 미니멀, 30~40대 대표가 신뢰할 수 있는 실무형. **AI가 만든 것 같지 않은** 감각.

---

## 컬러 (시안 1 기준 — 정통)

| 역할 | 토큰 | 값 |
|---|---|---|
| 배경 | `--bg` | `#f7f8f5` |
| 표면(카드) | `--surface` | `#ffffff` |
| 부드러운 표면 | `--surface-soft` | `#eef3ef` |
| 본문 | `--text` | `#111713` |
| 보조 | `--muted` | `#5d675f` |
| 라인 | `--line` | `rgba(17,23,19,0.12)` |
| 액센트 | `--accent` | `#20b486` (mint) |
| 액센트 강조 | `--accent-strong` | `#0b8065` |
| 액센트 소프트 | `--accent-soft` | `rgba(32,180,134,0.14)` |
| 강조 옐로 | `--amber` | `#f0b94f` (WEFLOW CARE) |

3안 비교는 `/mockup/[1..3]` 라이브 라우트.

---

## 폰트

- 본문·헤드라인: **Pretendard Variable**
- 숫자·가격·코드·타임스탬프: **Geist Mono**
- `next/font/local` 또는 `pretendard` 패키지

---

## 타입 스케일 (clamp)

| 클래스 | 크기 |
|---|---|
| `.text-display` | clamp(2.4rem, 6vw, 4.8rem) |
| `.text-h1` | clamp(2.0rem, 4.4vw, 3.2rem) |
| `.text-h2` | clamp(1.6rem, 3.2vw, 2.4rem) |
| `.text-h3` | clamp(1.25rem, 2.2vw, 1.6rem) |
| `.text-body` | clamp(1.0rem, 1.1vw, 1.0625rem) |
| `.text-small` | 0.875rem |
| `.text-eyebrow` | 0.8125rem upper +0.08em |

한국어 유틸: `.ko-tight 1.24` · `.ko-relaxed 1.72` · `.ko-heading -0.01em`, `word-break: keep-all`.

---

## 간격·라운드

- 섹션: `clamp(64px, 8vw, 120px)`
- 좌우: `clamp(20px, 4vw, 40px)`
- 스택: 4 / 8 / 12 / 20 / 32 / 56
- 라운드: sm 8 / md 12 / lg 20 / pill 9999

---

## 모션

- easing: `[0.25, 0.1, 0.25, 1]`
- duration: enter `0.7s` / hover `0.18s`
- stagger: `0.12s`
- reduced-motion 자동 우회

---

## 디테일 (AI스럽지 않게)

- SVG noise grain 3%
- mesh gradient (mint alpha 0.06~0.12) 일부 섹션 배경
- `::selection { background: var(--accent-soft); }`
- 한국어 line-height·letter-spacing 영문과 분리

---

## 마스코트 Flow Guide

3컷 (hero / floating / review). 보조 포인트로만, 페이지당 1~2회.

---

## 한줄정리

**ivory + mint 토큰 / Pretendard + Geist Mono / clamp 타입 / Framer fabric-smooth 모션 / Flow Guide 보조 포인트 — 이게 WEFLOW의 감각이에요.**
