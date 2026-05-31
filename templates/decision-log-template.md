# Decision Log Template

새 DEC 추가 시 `docs/status/DECISION-LOG.md`의 가장 아래에 붙여넣고 채워 넣는다.

```markdown
## DEC-XXX: 짧고 결정적인 제목

- **Context**: 어떤 상황이었나 (왜 결정이 필요했는지)
- **Options**: 고려한 선택지 (① ② ③ ...)
- **Decision**: 선택한 것 (구체적 표현)
- **Rationale**: 왜 그것을 선택했나
- **Impact**: 영향 받는 코드/문서/사용자
- **Date**: YYYY-MM-DD
- **Supersedes**: DEC-YYY (대체하는 결정이 있다면)
```

## 작성 규칙
- 결정은 **append-only**. 기존 DEC 본문은 수정하지 않는다.
- 변경이 필요하면 새 DEC를 만들고 `Supersedes:` 명시.
- Context와 Rationale은 반년 후 읽어도 이해 가능하게.
- Impact에는 영향 파일·라우트·문서를 구체적으로.
