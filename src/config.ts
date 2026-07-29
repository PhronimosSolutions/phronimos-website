// Single source of truth for site-wide constants.
export const SITE_NAME = 'Phronimos';
export const LEGAL_NAME = 'Phronimos Solutions LLC';
export const SITE_URL = 'https://phronimos.io';
export const CONTACT_EMAIL = 'hello@phronimos.io';
export const BOOKING_URL = 'https://calendly.com/phronimos';
export const TAGLINE = 'Practical Wisdom at Scale';

// --- Pricing ----------------------------------------------------------------
// Every price on the site reads from here. Change a number once and it updates
// the offer rows, the price tags, the comparison table, the prose, and the
// JSON-LD together. Twenty scattered hard-coded prices is how a site ends up
// quoting three different figures for the same engagement.
//
// Audit is a flat fee, credited forward. Sprint carries a floor because
// integration complexity varies. Retainer is a flat monthly starting point.
export const PRICE_AUDIT = '$999';
export const PRICE_AUDIT_VALUE = 999;
export const PRICE_SPRINT = 'From $3,500';
export const PRICE_SPRINT_VALUE = 3500;
export const PRICE_RETAINER = '$5,000 / month';
export const PRICE_RETAINER_VALUE = 5000;

// The credit is what keeps a $999 front door from reading as the ceiling on the
// whole practice. State it wherever the audit price appears.
export const AUDIT_CREDIT_NOTE =
  'The audit fee is credited in full toward an Agent Implementation Sprint or the first month of a Managed AI Operator Retainer.';

// Company profile URLs for schema.org sameAs. This is the highest-value
// structured data a brand with no search history can publish: it is the
// machine-readable statement of which entity "Phronimos" refers to.
// TODO: add the LinkedIn company page, X, Clutch, and any directory profiles.
// An empty array is omitted from the markup, so partial is fine.
export const ORG_SAME_AS: string[] = [];

// --- Service standard -------------------------------------------------------
// Publishing numeric reliability commitments is the single largest available
// differentiation in the managed-agent category, because almost no services firm
// does it. It is also a binding commercial promise.
//
// PUBLISH_SERVICE_STANDARD is FALSE and must stay false until the SLAs are
// settled. While false, /method/ and the homepage show qualitative reliability
// copy instead, so both pages read complete. The numbers below are UNCONFIRMED
// placeholders showing the shape of the block; replace them before flipping.
export const PUBLISH_SERVICE_STANDARD = false;

export const SERVICE_STANDARD: { metric: string; label: string; detail: string }[] = [
  {
    metric: '00%',
    label: 'First-pass task success',
    detail: 'Measured monthly against a sampled human review, and reported to you.',
  },
  {
    metric: '00 min',
    label: 'Severity-1 acknowledgement',
    detail:
      'An operator acting outside its guardrails is acknowledged inside this window and contained the same day.',
  },
  {
    metric: '00 days',
    label: 'Decision traces retained',
    detail: 'Every action an operator takes stays queryable, so any outcome can be reconstructed.',
  },
  {
    metric: '00 days',
    label: 'Notice before material change',
    detail:
      'Prompts, models, and evaluation sets are versioned under joint change control, with regression testing before release.',
  },
];

// Web3Forms access key. Placeholder by default so dev builds never send.
// Set PUBLIC_WEB3FORMS_KEY in the environment (see DEPLOY.md) for production.
export const WEB3FORMS_KEY =
  import.meta.env.PUBLIC_WEB3FORMS_KEY ?? 'WEB3FORMS_ACCESS_KEY_HERE';
