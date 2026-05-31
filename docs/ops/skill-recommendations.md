# Skill Recommendations — 2026-05-30 세션 회고

> 이번 세션(2026-05-30)에서 자주 반복한 절차를 분석해 스킬화 후보로 추천.  
> 목적: 다음 세션부터 반복 작업을 줄이고 휴먼 실수를 막는다.

작성: 2026-05-30 · 출처: 이번 세션 작업 로그 + `docs/daily/05-30/`

---

## 0. 작업 빈도 분석 (이번 세션)

| 작업 카테고리 | 횟수 | 단계 평균 |
|---|---:|---:|
| 컴포넌트 추출 + `/kit` 등재 | **23번** (16 primitives + 5 motion + 1 HeroVideo + 1 storyboard) | 7~9 단계 |
| 문서 정합성 일괄 동기화 | **8번** (Task 끝날 때마다) | 4~6 파일 |
| agent-browser 시각 검수 | **10+ 번** | 3~5 명령 |
| DEC append + Supersedes 표기 | **2번** (DEC-049, DEC-050) | 1~2 파일 |
| 시안 라이브 비교 (`/mockup/[id]`) | 1번 | 5+ 단계 |
| Color 선정 후 토큰 정렬 | 1번 | 4+ 파일 |
| typecheck/build 검증 | **15+ 번** | 1 명령 |

### 핵심 발견

- **23번 반복된 패턴**: 컴포넌트 추출 → index.ts → KitCard → typecheck/build → 캡처 → 일지 → 문서 동기화 = **가장 큰 가성비 목표**
- 문서 동기화 8번도 매번 같은 파일 묶음(PROJECT-STATUS · PAGE-UPGRADE-BOARD · MISSING-AND-UNIMPLEMENTED · daily) — **체크리스트 자동화 가치 ★★★**
- agent-browser 명령 시퀀스도 패턴화 가능

---

## 1. 추천 신규 스킬 (가성비 ★★★)

### 1.1 `weflow-component-extract` ⭐ 최우선

**해결할 반복 작업**: 23번 반복된 컴포넌트 추출 절차 자동화.

**현재 수동 7~9 단계**:
1. `components/{primitives|motion}/{Name}.tsx` 작성
2. `index.ts` barrel export 추가
3. `apps/web/app/kit/page.tsx`에 import 추가
4. CATEGORIES 배열에 카테고리 추가 (필요 시)
5. KitSection · KitCard 등재 (props 표 + 라이브 demo + 코드 스니펫)
6. `pnpm typecheck && pnpm build`
7. agent-browser 1440 캡처
8. `docs/daily/MM-DD/page-{name}.md` 일지 작성
9. PROJECT-STATUS · PAGE-UPGRADE-BOARD · MISSING-AND-UNIMPLEMENTED 갱신

**스킬 입력**:
```yaml
name: 컴포넌트 이름 (예: MascotOrbit, Button)
type: primitive | motion | layout
category: 카테고리 id (예: primitives, motion-signatures)
purpose: 짧은 설명
useClient: boolean
props:
  - name: type
```

**스킬 출력**:
- 템플릿 코드 (Hard Rule 4: 시맨틱 토큰만)
- index.ts 자동 갱신
- KitCard 자동 등재
- typecheck/build/캡처 자동 검증
- daily 일지 템플릿 채움

**예상 절감**: 컴포넌트당 5~10분 → 1분.

---

### 1.2 `weflow-doc-sync-batch` ⭐ 두 번째 우선

**해결할 반복 작업**: 변경 후 5~6 파일 동시 Edit (8번 반복됨).

**현재 수동 절차**:
- PROJECT-STATUS.md → Current Phase + Active Tracks + Pending Decisions + Recent Changes
- PAGE-UPGRADE-BOARD.md → Stage 갱신
- MISSING-AND-UNIMPLEMENTED.md → 항목 ✅ 표시
- INTERACTION-CATALOG.md (해당 시)
- DECISION-LOG.md (DEC 추가 시)
- `docs/daily/MM-DD/page-{slug}.md` 작성

**스킬 입력**:
```yaml
changeType: page | component | decision | content | bugfix
summary: 한 문장 요약
phase: 정공법 Task 번호
files_changed: [경로 배열]
verification: [PASS 항목]
evidence: [캡처 경로]
```

**스킬 출력**:
- AGENTS.md §5 "변경 클래스 → 동기화 대상 문서" 매트릭스 따라 자동 Edit
- daily 일지 템플릿 생성
- Task 갱신 (TaskUpdate)

**예상 절감**: 동기화당 5~7분 → 30초.

---

### 1.3 `weflow-page-content-extract` (DEC-050 자동 실행)

**해결할 작업**: 페이지 코드에서 하드코딩된 데이터를 JSON + zod로 분리.

**스킬 입력**:
```yaml
page: home | services | pricing | ...
sourceFile: apps/web/app/{route}/page.tsx
```

**스킬 출력**:
- 페이지 코드의 const 배열·객체 추출 → `content/pages/{slug}.json`
- `lib/content/schemas.ts`에 zod 스키마 추가
- 페이지 컴포넌트 리팩토링 (json import + parse + props 전달)
- `_README.md` 비개발자 가이드 항목 추가
- typecheck + build 검증

**예상 절감**: 페이지당 30분 → 5분.

---

## 2. 기존 스킬 보강 추천 (가성비 ★★)

### 2.1 `weflow-page` (이미 등록)
**보강**: 컴포넌트 추출 + KitCard 등재 단계 명시. 1.1 스킬과 연계.

### 2.2 `doc-sync` (이미 등록)
**보강**: 추천에서 자동 일괄 Edit로 확장. 1.2 스킬과 동기.

### 2.3 `sync-design-tokens` (이미 등록)
**보강**: Color 시안 추가 시 `data-mockup` 자동 등록 + `/mockup/[id]` 라우트 검증 단계.

### 2.4 `session-retro` (이미 등록)
**호출 권장**: 세션 종료 시 자동 호출해서 성공 패턴·실패 우회를 `patterns/` 또는 `harnesses/`에 자산화.

---

## 3. agent-browser 명령 시퀀스 표준화 (가성비 ★)

이번 세션 자주 사용한 명령 시퀀스:

```bash
# 1440 페이지 캡처 + 토큰 측정 + 에러 점검
agent-browser --session <name> set viewport 1440 900
agent-browser --session <name> open <url>
agent-browser --session <name> wait --load networkidle
agent-browser --session <name> wait 800
agent-browser --session <name> screenshot <path>
agent-browser --session <name> eval '...토큰 측정...'
agent-browser --session <name> close

# 375 모바일 + 가로 오버플로 점검
agent-browser --session <name> set viewport 375 812
agent-browser --session <name> eval 'JSON.stringify({w: document.documentElement.scrollWidth, error: ...})'
```

**제안**: `scripts/check-visual.sh <url> <slug>` 스크립트로 묶음.

---

## 4. 운영 패턴 (스킬화는 X, 가이드만)

이번 세션에서 발견한 유효 운영 룰:

1. **dev server는 한 번만 띄우고 재사용** — 두 번째 시도하면 PID 충돌 (실패 → 기존 PID 사용)
2. **`/bin/ls`와 `/usr/bin/find` 직접 사용** — RTK 프록시가 `-not` 등 compound predicate 차단
3. **md5 비교**: 자산 중복 확인 시 path 다른 파일도 같으면 안전 삭제 (이번 세션 첫 정리에서 사용)
4. **빈 폴더(`docs/archive/`) 보존**: harness 스크립트가 dir existence 검사하므로 `.gitkeep` 필수
5. **agent-browser 캡처 후 evidence 폴더로 이동** 정책 — 현재 working dir에 떨어지면 mv

→ `docs/ops/operational-tips.md` (신규) 또는 기존 ops 문서에 추가 권장.

---

## 5. 다음 세션 진입 시 추천 첫 액션

1. `session-retro` 스킬 호출 → 이번 세션 자동 회고 자산화
2. `update-config` 스킬 호출 → 1.1 · 1.2 스킬 신규 등록 (settings.json)
3. DEC-050 실행: `weflow-page-content-extract`(없으면 수동)로 홈 페이지 JSON 추출
4. Phase 4 묶음 A 작성 시작 (JSON 패턴으로)

---

## 한줄정리

**가장 큰 반복(컴포넌트 추출 23번 + 문서 동기화 8번)을 신규 스킬 2개로 잡으면 다음 세션부터 30% 이상 시간 절감. DEC-050 자동 실행 스킬도 추가하면 페이지 콘텐츠 분리가 표준화돼요.**
