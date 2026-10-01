// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://phronimos.io',
  trailingSlash: 'always',
  integrations: [
    // /q/ pages are private, per-customer questionnaires: never list them.
    sitemap({ filter: (page) => !page.includes('/q/') && !page.endsWith('/pricing/') }),
  ],
});
