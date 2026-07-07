# Deploying phronimos.io

The site is a static Astro build. Nothing here is deployed automatically; every step below is
run by Matthew, on purpose. Estimated total time: 30 to 45 minutes.

## 0. Prerequisites

- A Vercel account (free Hobby tier works to start; Pro if you want team features).
- Registrar access for `phronimos.io` (wherever the domain is registered).
- A Web3Forms access key: create one at https://web3forms.com using hello@phronimos.io.

## 1. Local sanity check

```bash
cd "/Users/kirbot/.openclaw/workspace/projects/Phronimos Solutions/website/site"
npm install
npm run build
npm run brand-check     # must pass
npm run preview         # click through the pages at http://localhost:4321
```

## 2. Connect the Web3Forms key

The contact form and the assessment submit through `PUBLIC_WEB3FORMS_KEY`.

- Local test: `cp .env.example .env`, paste the real key, rebuild, and submit a test entry.
- Production: set the same variable in Vercel (step 4). Do not commit `.env`.

After the first deploy, also add `phronimos.io` to the allowed domains in the Web3Forms
dashboard so submissions from the production site are accepted.

## 3. First deploy

```bash
npm i -g vercel          # if not installed
cd "/Users/kirbot/.openclaw/workspace/projects/Phronimos Solutions/website/site"
vercel login             # log in as yourself
vercel link              # create the project (defaults are fine; it detects Astro)
vercel deploy --prod
```

The git repository in this directory is local-only. If you later want git-push deploys,
create a private GitHub repo for `website/site` only (the parent project contains client
data and must never be pushed), push, and connect the repo in the Vercel dashboard.

## 4. Environment variable in Vercel

Vercel dashboard: Project > Settings > Environment Variables

- `PUBLIC_WEB3FORMS_KEY` = the real key, for Production (and Preview if you want test
  submissions to send).

Redeploy after setting it (`vercel deploy --prod`).

## 5. Point the domain

Vercel dashboard: Project > Settings > Domains > add `phronimos.io` and `www.phronimos.io`.

Vercel will show the exact DNS records to create at your registrar. Typically:

- Apex `phronimos.io`: A record to Vercel's IP (use the value the dashboard shows).
- `www`: CNAME to the value the dashboard shows.
- Set `www` to redirect to the apex (Vercel offers this in the domain settings).

Verify the current values in the Vercel dashboard rather than trusting this file; they
change occasionally. HTTPS certificates issue automatically once DNS propagates.

If `phronimos.com` is meant to redirect to `.io`, add it as a domain too and set it to
redirect, or configure the redirect at its registrar.

## 6. After it is live

1. Load https://phronimos.io on desktop and phone. Click every nav link.
2. Submit one real test through the contact form and one through the assessment; confirm
   both emails arrive at hello@phronimos.io and the assessment payload contains the JSON
   block between `<<<DATA>>>` markers.
3. Google Search Console: add the property, verify via DNS, submit
   `https://phronimos.io/sitemap-index.xml`.
4. Check `https://phronimos.io/rss.xml` renders.
5. Mark the corresponding rows done in `../../launch/launch-checklist.md`.

## Swap-points to remember

- `src/config.ts` holds `BOOKING_URL` (currently `/contact/`). When you pick a scheduler
  (Cal.com or Calendly), change that one constant and every "Book the Audit" button
  follows.
- `src/config.ts` also holds the contact email and legal name.
