#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const repoRoot = path.resolve(new URL('..', import.meta.url).pathname);
const kitSectionsDir = path.join(repoRoot, 'apps/web/app/kit/sections');
const defaultRegistryPath = '/Users/family/jason/jason-agent-harness-template/templates/frontend-kit/kit-registry.json';
const registryPath = process.env.FRONTEND_KIT_REGISTRY_PATH || defaultRegistryPath;

const write = !process.argv.includes('--check');

const CATEGORY_PREFIX = [
  [/hero/i, 'K-HERO'],
  [/background|global/i, 'K-BG'],
  [/surface|card/i, 'K-CARD'],
  [/cta/i, 'K-CTA'],
  [/form|input|radio|checkbox|select|textarea/i, 'K-FORM'],
  [/pricing|price/i, 'K-PRICE'],
  [/filter|tag/i, 'K-FILTER'],
  [/layout|drawer|header|footer/i, 'K-LAYOUT'],
  [/trust|review|rating|avatar|stat/i, 'K-TRUST'],
  [/content|faq|accordion|pagination|breadcrumb/i, 'K-CONTENT'],
  [/motion|signature|interaction|component|hook|section/i, 'K-MOTION'],
  [/primitive/i, 'K-PRIM'],
];

const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
if (write) {
  registry.items = registry.items.filter(
    (item) => item.generatedBy !== 'scripts/sync-frontend-kit-registry.mjs',
  );
}
const cards = readKitCards(kitSectionsDir);
const existingKeys = new Set(registry.items.map((item) => item.registryKey || keyFor(item.name, item.sourceImport)));
const counters = getCounters(registry.items);
const additions = [];

for (const card of cards) {
  const key = keyFor(card.normalizedName, card.importPath);
  if (existingKeys.has(key)) continue;
  const prefix = prefixFor(card.category, card.normalizedName);
  const next = (counters.get(prefix) || 0) + 1;
  counters.set(prefix, next);
  additions.push(toRegistryItem(card, prefix, next, key));
  existingKeys.add(key);
}

if (additions.length > 0) {
  registry.items.push(...additions);
  registry.items.sort((a, b) => a.id.localeCompare(b.id));
}

if (write) {
  fs.writeFileSync(registryPath, `${JSON.stringify(registry, null, 2)}\n`);
}

console.log(`Frontend kit cards scanned: ${cards.length}`);
console.log(`Registry items: ${registry.items.length}`);
console.log(`New items ${write ? 'added' : 'detected'}: ${additions.length}`);
for (const item of additions) {
  console.log(`  ${item.id} ${item.name} (${item.sourceImport})`);
}

if (!write && additions.length > 0) {
  process.exitCode = 1;
}

function readKitCards(dir) {
  const files = listFiles(dir).filter((file) => file.endsWith('.tsx'));
  return files.flatMap((file) => extractCards(file));
}

function listFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return listFiles(full);
    return full;
  });
}

function extractCards(file) {
  const source = fs.readFileSync(file, 'utf8');
  const starts = [...source.matchAll(/<KitCard\b/g)].map((match) => match.index);
  return starts
    .map((start, index) => {
      const end = starts[index + 1] ?? source.length;
      const chunk = source.slice(start, end);
      const name = readStringProp(chunk, 'name');
      const category = readStringProp(chunk, 'category');
      const importPath = readStringProp(chunk, 'importPath');
      const description = readStringProp(chunk, 'description');
      if (!name || !category || !importPath || !description) return null;
      const normalizedName = normalizeName(name);
      const sectionId = nearestSectionId(source, start);
      return {
        name,
        normalizedName,
        category,
        importPath,
        description,
        sectionId,
        sourceFile: path.relative(repoRoot, file),
      };
    })
    .filter(Boolean);
}

function readStringProp(chunk, prop) {
  const match = chunk.match(new RegExp(`${prop}="([^"]+)"`));
  return match?.[1] ?? null;
}

function nearestSectionId(source, cardStart) {
  const before = source.slice(0, cardStart);
  const matches = [...before.matchAll(/<KitSection\b[\s\S]*?id="([^"]+)"/g)];
  return matches.at(-1)?.[1] ?? 'kit';
}

function normalizeName(name) {
  const clean = name
    .replace(/[<>{}]/g, '')
    .replace(/\/$/, '')
    .trim();
  return clean
    .split(/\s|\(/)[0]
    .replace(/\/$/, '');
}

function keyFor(name, importPath) {
  return `${normalizeName(name)}@@${importPath}`;
}

function prefixFor(category, name) {
  const text = `${category} ${name}`;
  if (/global/i.test(category)) return 'K-GLOBAL';
  if (/layout|drawer|header|footer/i.test(text)) return 'K-LAYOUT';
  if (/^use[A-Z]/.test(name)) return 'K-HOOK';
  return CATEGORY_PREFIX.find(([pattern]) => pattern.test(text))?.[1] ?? 'K-KIT';
}

function getCounters(items) {
  const counters = new Map();
  for (const item of items) {
    const match = item.id.match(/^(K-[A-Z]+)-(\d+)$/);
    if (!match) continue;
    const [, prefix, raw] = match;
    counters.set(prefix, Math.max(counters.get(prefix) || 0, Number(raw)));
  }
  return counters;
}

function toRegistryItem(card, prefix, index, registryKey) {
  const id = `${prefix}-${String(index).padStart(2, '0')}`;
  const inferredFiles = inferFiles(card.importPath, card.normalizedName, card.sourceFile);
  const deps = inferDeps(card.importPath, card.category);
  return {
    id,
    name: card.normalizedName,
    category: categoryForPrefix(prefix, card.category),
    status: 'needs-curation',
    sourceProject: 'WEFLOW',
    sourceImport: card.importPath,
    sourceKitFile: card.sourceFile,
    registryKey,
    generatedBy: 'scripts/sync-frontend-kit-registry.mjs',
    livePreview: `/kit#${card.sectionId}`,
    whenToUse: `Review WEFLOW kit description: ${card.description}`,
    avoidWhen: 'Needs curation. Confirm fit, accessibility, performance, and content truthfulness before reuse.',
    files: inferredFiles,
    deps,
    props: [],
    promptSnippet: `Consider ${card.normalizedName} from ${card.importPath}. Curate whenToUse/avoidWhen, then adapt it to the target project's tokens, routes, and responsive rules.`,
  };
}

function categoryForPrefix(prefix, fallback) {
  return {
    'K-HERO': 'hero',
    'K-BG': 'background',
    'K-CARD': 'surface',
    'K-CTA': 'cta',
    'K-FORM': 'form',
    'K-PRICE': 'pricing',
    'K-FILTER': 'filter',
    'K-LAYOUT': 'layout',
    'K-GLOBAL': 'global',
    'K-HOOK': 'hook',
    'K-TRUST': 'trust',
    'K-CONTENT': 'content',
    'K-MOTION': 'motion',
    'K-PRIM': 'primitive',
    'K-KIT': 'kit',
  }[prefix] ?? fallback.toLowerCase();
}

function inferFiles(importPath, name, sourceFile) {
  if (importPath === '@/components/motion') return [`components/motion/${name}.tsx`, sourceFile];
  if (importPath === '@/components/primitives') return [`components/primitives/${name}.tsx`, sourceFile];
  if (importPath.startsWith('@/components/')) return [importPath.replace('@/', '') + '.tsx', sourceFile];
  return [sourceFile];
}

function inferDeps(importPath, category) {
  const deps = new Set(['next']);
  if (importPath.includes('/motion') || /motion|signature|interaction|hook/i.test(category)) {
    deps.add('framer-motion');
  }
  return [...deps];
}
