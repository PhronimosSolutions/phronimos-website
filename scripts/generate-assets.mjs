// One-time asset generation: favicon PNGs, apple-touch-icon, OG image.
// Run: npm run assets
import sharp from 'sharp';
import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const pub = path.join(root, 'public');

// App icon: charcoal rounded square, persimmon ring, off-white stroke (brand v1.1 dark treatment)
const appIcon = (size, radius) => `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="${size}" height="${size}">
  <rect x="0" y="0" width="120" height="120" rx="${radius}" fill="#232B32"/>
  <ellipse cx="60" cy="60" rx="22" ry="19" fill="none" stroke="#E76F51" stroke-width="5.5"/>
  <line x1="60" y1="27" x2="60" y2="93" stroke="#F5F7F8" stroke-width="5.5" stroke-linecap="round"/>
</svg>`;

// OG image: charcoal field, dark-mode mark, wordmark + tagline
const og = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#232B32"/>
  <rect x="0" y="0" width="1200" height="4" fill="#E76F51"/>
  <g transform="translate(120, 200)">
    <ellipse cx="50" cy="60" rx="28" ry="24" fill="none" stroke="#E76F51" stroke-width="6"/>
    <line x1="50" y1="18" x2="50" y2="102" stroke="#F5F7F8" stroke-width="6" stroke-linecap="round"/>
    <text x="140" y="76" font-family="Helvetica, Arial, sans-serif" font-size="64" font-weight="500" letter-spacing="2" fill="#F5F7F8">Phronimos</text>
    <text x="142" y="118" font-family="Helvetica, Arial, sans-serif" font-size="21" font-weight="500" letter-spacing="6" fill="#A3ACB4">PRACTICAL WISDOM AT SCALE</text>
  </g>
  <text x="120" y="520" font-family="Helvetica, Arial, sans-serif" font-size="26" font-weight="400" fill="#A3ACB4">Managed AI operators for owner-led businesses</text>
</svg>`;

await mkdir(path.join(pub, 'og'), { recursive: true });

await sharp(Buffer.from(appIcon(180, 26))).png().toFile(path.join(pub, 'apple-touch-icon.png'));
await sharp(Buffer.from(appIcon(32, 7))).png().toFile(path.join(pub, 'favicon-32.png'));
await sharp(Buffer.from(og)).png().toFile(path.join(pub, 'og', 'og-default.png'));

// ICO fallback: many tools accept a PNG renamed; instead write a real 32px PNG
// and reference favicon.svg first in the head. Keep favicon-32.png as fallback.
await writeFile(
  path.join(pub, 'robots.txt'),
  'User-agent: *\nAllow: /\n\nSitemap: https://phronimos.io/sitemap-index.xml\n'
);

console.log('Assets written: apple-touch-icon.png, favicon-32.png, og/og-default.png, robots.txt');
