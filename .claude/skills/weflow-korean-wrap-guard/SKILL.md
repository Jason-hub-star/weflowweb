# weflow-korean-wrap-guard

한국어 줄바꿈, 카드 넘침, 좁은 화면 텍스트 깨짐을 점검할 때 사용한다.

## 순서

1. `pnpm check:korean-wrap` 실행.
2. 실패하면 출력된 `file:line`의 `className`에 아래 중 맞는 것을 붙인다.
   - 제목: `ko-heading`
   - 문장/본문: `ko-relaxed`
   - 짧은 라벨/소제목: `ko-tight` 또는 `break-keep`
   - 긴 숫자·영문·URL 혼합: `break-words`
3. 수정 후 `pnpm check:korean-wrap`, `pnpm typecheck`, `pnpm lint`를 다시 실행.
4. 화면 변경이 크면 375/768/1440 캡처로 텍스트 겹침을 확인한다.

## 기준

- 전역 CSS는 `body`, `.ko-heading`, `.ko-relaxed`, `.ko-tight`에 `word-break: keep-all`과 `overflow-wrap: break-word`를 유지한다.
- `text-display`, `text-h1`, `text-h2`, `text-h3`, `text-body`, `text-small`에 긴 한국어 직접 문구를 넣을 때는 한국어 유틸을 함께 쓴다.
- 버튼처럼 짧은 문구는 예외가 가능하지만, 카드 폭이 작거나 두 줄 이상이 될 수 있으면 `break-keep`을 붙인다.

## 검사

```bash
pnpm check:korean-wrap
```
