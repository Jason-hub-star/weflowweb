# 00 — Overview: 페이지 운영 사이클

```
Ready (사양 잠금)
  ↓
Designing (와이어/시안)
  ↓
Building (컴포넌트 코드)
  ↓
QA (1440 + 375 검수 + Lighthouse)
  ↓
Done (PAGE-UPGRADE-BOARD = Done)
```

## Stage 전환 조건

| 단계 | 진입 | 통과 |
|---|---|---|
| Ready | DEC 잠금 + content/* MD | wireframe in PR |
| Designing | wireframe | hi-fi 확정 |
| Building | 컴포넌트 트리 정의 | `pnpm build` 0 error |
| QA | agent-browser-verify pass | 375/768/1440 + Lighthouse pass |
| Done | 모든 게이트 통과 | MISSING-AND-UNIMPLEMENTED 0건 |

## 한줄정리

**5단계 사이클을 PAGE-UPGRADE-BOARD에서 추적하며, 각 단계 통과 조건을 모두 만족해야 다음으로 넘어가요.**
