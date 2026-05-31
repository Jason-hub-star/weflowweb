# Hero Video Prompt — Blue Startup Flow

작성: 2026-05-30  
소스 이미지: `apps/web/public/assets/weflow-blue-startup-hero.png`  
용도: 홈 Hero 배경 영상 생성 후 `apps/web/public/hero/hero-bg.mp4`로 배치

---

## Image-To-Video Prompt

Use the provided WEFLOW blue startup hero image as the first frame and style reference. Create a clean 6-second seamless loop for a Korean website production startup. Keep the composition bright, fresh, spacious, and trustworthy.

Animate the glowing aqua flow lines so they slowly travel from the website canvas to the report cards. The cute cream robot mascot should gently blink, make a small friendly wave, and glance at the tablet. The website window, report panels, checklist, message card, and calendar card should float subtly with soft parallax. The chart bars and line graph should rise slightly, then settle. The blue button on the website canvas should softly pulse once. Small light particles may drift along the flow path.

Keep the left side readable for overlaid Korean headline text. Do not add any readable text, logos, watermarks, captions, UI words, or random letters inside the video. Preserve the mascot design, blue/aqua palette, soft 3D lighting, large clean cards, and rounded friendly startup atmosphere. Avoid fast camera movement, heavy zoom, dark mood, clutter, harsh shadows, flicker, or scene cuts.

Camera: very slow push-in with slight right-side parallax, almost locked.  
Loop: final frame should match the first frame naturally.  
Format: 16:9, 1920x1080 or higher, mp4/webm, 6 seconds, muted background visual.

---

## Negative Prompt

No readable text, no watermark, no brand logo injection, no medical imagery, no hospital imagery, no hands typing, no crowded office, no dark cyberpunk lighting, no glitch, no rapid transitions, no distorted mascot face, no extra characters, no stock-photo people, no overly technical dashboard text.

---

## Placement Notes

- Save generated video as `apps/web/public/hero/hero-bg.mp4`.
- Then set `apps/web/content/pages/home.json` `hero.video` to `/hero/hero-bg.mp4`.
- Keep `hero.poster` as `/assets/weflow-blue-startup-hero.png` for fallback and first paint.
