// Brand conformance gate. Greps built output for banned patterns.
// Run after `npm run build`: npm run brand-check
// Exits non-zero on any violation.
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const dist = path.join(root, 'dist');

const BANNED = [
  // Retired copper accent (brand v1.0)
  { re: /#b4633b/gi, why: 'copper (retired v1.0 accent)' },
  { re: /#c88a63/gi, why: 'copper 400 (retired)' },
  { re: /#c07e52/gi, why: 'copper 400 alt (retired)' },
  { re: /#7e4023/gi, why: 'copper 800 (retired)' },
  { re: /#f4e7df/gi, why: 'copper 50 (retired)' },
  { re: /#e0b79d/gi, why: 'copper 200 (retired)' },
  // Legacy Claw Advisory palette
  { re: /#0b1f3a/gi, why: 'legacy navy (Claw Advisory)' },
  { re: /#c8a04e/gi, why: 'legacy gold (Claw Advisory)' },
  { re: /#6ee7b7/gi, why: 'legacy mint (old landing page)' },
  { re: /#182654/gi, why: 'legacy purple-blue gradient stop' },
  { re: /\bLora\b/g, why: 'legacy serif font' },
  { re: /\bLato\b/g, why: 'legacy body font' },
  // Voice violations (visible copy only; checked in HTML text)
  { re: /revolutionary|game-changing|next-gen|unleash|supercharge/gi, why: 'hype word' },
  { re: /\bseamless(ly)?\b|\bsynerg/gi, why: 'corporate filler' },
  // Em-dash anywhere in shipped HTML text
  { re: /—/g, why: 'em-dash in copy' },
];

const files = [];
async function walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) await walk(p);
    else if (/\.(html|css|js|svg|xml|txt)$/.test(entry.name)) files.push(p);
  }
}

try {
  await walk(dist);
} catch {
  console.error('dist/ not found. Run `npm run build` first.');
  process.exit(2);
}

let failures = 0;
for (const file of files) {
  const text = await readFile(file, 'utf8');
  for (const { re, why } of BANNED) {
    re.lastIndex = 0;
    const m = text.match(re);
    if (m) {
      failures++;
      console.error(`FAIL ${path.relative(dist, file)}: ${why} (${m.length}x, e.g. "${m[0]}")`);
    }
  }
}

if (failures) {
  console.error(`\nBrand check failed with ${failures} violation group(s).`);
  process.exit(1);
}
console.log(`Brand check passed. ${files.length} files scanned.`);
