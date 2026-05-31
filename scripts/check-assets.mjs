#!/usr/bin/env node
/**
 * check-assets.mjs — 자산 슬롯 sidecar(.meta.json) 무결성 검증.
 *
 * 각 슬롯 폴더(story/, blog/, cases-before/, reviews-video/)의 모든 이미지/SVG는
 *  - sibling `*.meta.json` 사이드카가 있어야 한다.
 *  - 사이드카는 slot, status, preferredKeywords, license 키를 모두 가진다.
 *  - status는 "placeholder" 또는 "ready"여야 한다.
 *
 * Unsplash 라이센스 추적 + 교체 가이드를 SSOT 외 메타로 박제하는 역할.
 */
import { readdir, readFile } from 'node:fs/promises';
import { join, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('../apps/web/public/assets', import.meta.url));
const SLOT_DIRS = ['story', 'blog', 'cases-before', 'reviews-video'];
const REQUIRED_KEYS = ['slot', 'status', 'preferredKeywords', 'license'];
const VALID_STATUS = ['placeholder', 'ready'];
const ASSET_EXTS = new Set(['.png', '.jpg', '.jpeg', '.webp', '.svg', '.avif']);

let fail = 0;
let checked = 0;

for (const dir of SLOT_DIRS) {
  const abs = join(ROOT, dir);
  let files;
  try {
    files = await readdir(abs);
  } catch {
    console.log(`  ⚠️  ${dir}/ does not exist (skipped)`);
    continue;
  }

  const metas = files.filter((f) => f.endsWith('.meta.json'));
  const assets = files.filter(
    (f) => !f.startsWith('.') && ASSET_EXTS.has(extname(f).toLowerCase()),
  );

  for (const asset of assets) {
    const base = asset.slice(0, asset.length - extname(asset).length);
    const meta = `${base}.meta.json`;
    if (!metas.includes(meta)) {
      console.log(`  ❌ ${dir}/${asset} missing sidecar ${meta}`);
      fail++;
    }
  }

  for (const m of metas) {
    checked++;
    const path = join(abs, m);
    try {
      const json = JSON.parse(await readFile(path, 'utf8'));
      for (const k of REQUIRED_KEYS) {
        if (!(k in json)) {
          console.log(`  ❌ ${dir}/${m} missing key: ${k}`);
          fail++;
        }
      }
      if (json.status && !VALID_STATUS.includes(json.status)) {
        console.log(`  ❌ ${dir}/${m} invalid status: ${json.status}`);
        fail++;
      }
    } catch (e) {
      console.log(`  ❌ ${dir}/${m} invalid JSON: ${e.message}`);
      fail++;
    }
  }
}

if (fail === 0) {
  console.log(`✅ Asset sidecar check: PASS (${checked} sidecar(s) verified)`);
  process.exit(0);
}
console.log(`❌ Asset sidecar check: ${fail} issue(s)`);
process.exit(1);
