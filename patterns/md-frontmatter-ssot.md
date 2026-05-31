# Patterns — Markdown Frontmatter as SSOT

> WEFLOW의 모든 콘텐츠(.md)는 frontmatter + zod 검증으로 SSOT. 자세한 스키마는 `docs/ref/CONTENT-MODEL.md`.

---

## 1. 로더 (`apps/web/lib/content.ts`)

```ts
import { z } from 'zod';
import matter from 'gray-matter';
import fs from 'node:fs/promises';
import path from 'node:path';

const CONTENT_DIR = path.join(process.cwd(), 'content');

export async function getAll<T>(folder: string, schema: z.ZodSchema<T>): Promise<T[]> {
  const dir = path.join(CONTENT_DIR, folder);
  const files = await fs.readdir(dir);
  const items = await Promise.all(files.filter(f => f.endsWith('.md')).map(async (f) => {
    const raw = await fs.readFile(path.join(dir, f), 'utf-8');
    const { data, content } = matter(raw);
    const parsed = schema.parse({ ...data, body: content });
    return parsed;
  }));
  return items
    .filter((i: any) => i.published !== false)
    .sort((a: any, b: any) => (a.order ?? 999) - (b.order ?? 999));
}
```

## 2. 검증 시점

- 빌드 타임: 모든 `content/**/*.md`가 스키마 통과 (실패 시 빌드 실패)
- 개발 타임: HMR로 즉시 에러 표시

## 3. ISR 재검증

배너/팝업 변경 시:
```ts
import { revalidateTag } from 'next/cache';
revalidateTag('banners');
```

## 4. 한국어 안전

- frontmatter는 UTF-8 (가능하면 ASCII 키만, 값은 한국어 OK)
- 본문은 MDX 허용 (blog만), 나머지는 MD
- 파일명은 ASCII (`onngeul-fitness.md` 가능, 한글 파일명은 피하기)
