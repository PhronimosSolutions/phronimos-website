// One-time asset generation: favicon PNGs, apple-touch-icon, OG image.
// Run: npm run assets
import sharp from 'sharp';
import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const pub = path.join(root, 'public');

// Phronimos hexagonal "P" brandmark (Phronimos_logo1), native viewBox 119.13 × 137.6.
// `fill` colors the whole mark; `transform` positions/scales it within the parent SVG.
const mark = (fill, transform) => `
  <g fill="${fill}" transform="${transform}">
    <path d="M62.76,136.6c-2.51,1.47-5.59,1.31-7.86-.46L2.05,105.09c-.79-.84-2.04-2.97-2.04-4.11v-63.7c-.01-1.97,1.55-4.16,3.24-5.17L54.37,1.68c3.59-2.14,7.03-2.41,10.57.24l50.3,29.7c1.98,1.17,3.89,3.14,3.89,5.65l-.02,63.05c0,2.89-2.24,4.51-4.47,5.82l-51.88,30.47ZM53.57,68.47l.47,57.82c1.39,1.58,3.46,2.73,5.67,3.1l51.82-30.5-.07-60.72L59.31,7.55,7.42,38.56l.05,60.77,21.36,12.6v-57.8l24.74,14.34Z"/>
    <polygon points="59.31 65.45 32.78 49.77 59.44 33.63 86.86 49.23 59.31 65.45"/>
    <polygon points="59.82 110.5 59.56 93.18 69.53 87.31 69.54 65.65 89.54 54.04 89.7 92.94 59.82 110.5"/>
  </g>`;

// App icon: charcoal rounded square, off-white mark (brand v1.1 dark treatment).
// Mark scaled to ~77px tall and centered in the 120×120 field.
const appIcon = (size, radius) => `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="${size}" height="${size}">
  <rect x="0" y="0" width="120" height="120" rx="${radius}" fill="#232B32"/>
  ${mark('#F5F7F8', 'translate(26.6 21.5) scale(0.56)')}
</svg>`;

// OG image: charcoal field, off-white mark, wordmark + descriptor.
const og = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#232B32"/>
  <rect x="0" y="0" width="1200" height="4" fill="#E76F51"/>
  ${mark('#F5F7F8', 'translate(120 188) scale(0.945)')}
  <text x="280" y="268" font-family="Helvetica, Arial, sans-serif" font-size="64" font-weight="500" letter-spacing="2" fill="#F5F7F8">Phronimos</text>
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
