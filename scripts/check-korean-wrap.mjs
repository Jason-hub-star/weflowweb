#!/usr/bin/env node
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = process.cwd();
const includeRoots = ['apps/web/app', 'apps/web/components'];
const exts = new Set(['.tsx', '.ts', '.jsx', '.js']);
const skipDirs = new Set(['node_modules', '.next', '.turbo']);
const korean = /[가-힣]/;
const textClass = /\b(text-display|text-h1|text-h2|text-h3|text-body|text-small)\b/;
const safeClass = /\b(ko-heading|ko-relaxed|ko-tight|break-keep|break-words|truncate|line-clamp-|whitespace-nowrap|sr-only)\b/;
const largeTextClass = /\b(text-display|text-h1|text-h2|text-h3)\b/;
const classAttr = /className=(?:"([^"]*)"|\{`([^`]*)`\})/g;
const globals = readFileSync(join(root, 'apps/web/app/globals.css'), 'utf8');

for (const required of ['word-break: keep-all', 'overflow-wrap: break-word', '.ko-heading', '.ko-relaxed']) {
  if (!globals.includes(required)) {
    console.error(`[Korean Wrap Guard] globals.css에 "${required}"가 필요합니다.`);
    process.exit(1);
  }
}

function walk(dir, files = []) {
  for (const name of readdirSync(dir)) {
    if (skipDirs.has(name)) continue;
    const abs = join(dir, name);
    const st = statSync(abs);
    if (st.isDirectory()) walk(abs, files);
    else if (exts.has(abs.slice(abs.lastIndexOf('.')))) files.push(abs);
  }
  return files;
}

function lineNumber(source, index) {
  return source.slice(0, index).split('\n').length;
}

const findings = [];

for (const base of includeRoots) {
  for (const file of walk(join(root, base))) {
    const source = readFileSync(file, 'utf8');
    let match;
    while ((match = classAttr.exec(source))) {
      const classes = match[1] ?? match[2] ?? '';
      if (!textClass.test(classes) || safeClass.test(classes)) continue;

      const tagEnd = source.indexOf('>', match.index);
      if (tagEnd < 0) continue;
      const nextTag = source.indexOf('<', tagEnd + 1);
      if (nextTag < 0) continue;
      const directText = source
        .slice(tagEnd + 1, nextTag)
        .replace(/\{[^}]*\}/g, '')
        .replace(/&[a-z]+;/gi, ' ')
        .replace(/\s+/g, ' ')
        .trim();
      if (!korean.test(directText)) continue;
      const koLength = (directText.match(/[가-힣]/g) ?? []).length;
      if (!largeTextClass.test(classes) && koLength < 12) continue;

      findings.push({
        file: relative(root, file),
        line: lineNumber(source, match.index),
        text: directText,
        classes: classes.replace(/\s+/g, ' ').trim(),
      });
    }
  }
}

if (findings.length) {
  console.error('[Korean Wrap Guard] 위험 후보 발견');
  for (const f of findings) {
    console.error(`  ❌ ${f.file}:${f.line}  "${f.text}"  className="${f.classes}"`);
  }
  console.error('\n해결: 한국어 문장에는 ko-heading/ko-relaxed/ko-tight 또는 break-keep 계열을 붙여주세요.');
  process.exit(1);
}

console.log('✅ Korean Wrap Guard: PASS');
