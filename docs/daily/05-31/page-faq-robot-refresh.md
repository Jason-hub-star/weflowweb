# 05-31 — FAQ robot refresh

## 변경

- `/faq` 우측 도우미와 AI 안내/빈 상태 아이콘을 FAQ 전용 Imagen 로봇 PNG로 교체.
- 기본 기호 아이콘(`✨`, `⌕`, `✕`, `🔍`, CTA 화살표)을 제거하거나 텍스트/PNG로 대체.
- 생성 원본은 `apps/web/public/mascot/source/weflow-faq-robot-helper-chroma.png`, 실제 사용 자산은 `apps/web/public/mascot/weflow-faq-robot-helper.png`와 `weflow-faq-robot-helper-256.png`.

## 증거

- Imagegen: built-in image_gen, chroma-key → local alpha removal.
- Asset validation: `weflow-faq-robot-helper.png` 512x512 alpha yes, `weflow-faq-robot-helper-256.png` 256x256 alpha yes.
- Checks:
  - `bash scripts/check-design-tokens.sh` ✅
  - `bash scripts/check-file-size.sh` ✅
  - `pnpm check:korean-wrap` ✅
  - `pnpm typecheck` ✅
  - `pnpm lint` ✅
  - `pnpm build` ✅
- Browser smoke:
  - `http://localhost:3000/faq`
  - console error 0건
  - 캡처: `tmp/faq-desktop1440-robot-v2.png`, `tmp/faq-tablet768-robot-v2.png`, `tmp/faq-mobile375-robot-v2.png`

## 한줄정리

**FAQ는 기존 Flow Guide PNG 대신 웹사이트 톤에 맞춘 FAQ 전용 로봇 PNG를 쓰고, 장식용 기본 아이콘은 제거/대체했다.**
