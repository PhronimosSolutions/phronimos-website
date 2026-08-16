// Single source of truth for site-wide constants.
export const SITE_NAME = 'Phronimos';
export const LEGAL_NAME = 'Phronimos Solutions LLC';
export const SITE_URL = 'https://phronimos.io';
export const CONTACT_EMAIL = 'hello@phronimos.io';
export const BOOKING_URL = 'https://calendly.com/phronimos';

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
  'The review fee is credited in full toward an Agent Implementation Sprint or the first month of a Fractional AI Officer retainer.';

// --- Offer names + customer-facing framings -------------------------------
// Single source for the canonical offer names and the customer-facing framings.
// The $999 offering was renamed from "AI Workflow Audit" to "Agent Reliability
// Review" — the review is the actual thing sold. "AI Workflow Audit" is kept
// as the SEO-anchor phrase on the /ai-workflow-audit/ URL + H1 only; every
// other surface uses AUDIT_NAME.
export const AUDIT_NAME = 'Agent Reliability Review';
export const AUDIT_SEO_ANCHOR = 'AI Workflow Audit';
export const AUDIT_FRAMING = 'is what you already built actually working?';
export const AUDIT_HEADLINE_ONE_LINER =
  'A diagnostic of the AI agents and workflows you already have — mapped to the four silent-failure modes, evidence per finding, and a monitoring posture so the next failure gets caught before your customer sees it.';

export const SPRINT_NAME = 'Agent Implementation Sprint';
export const SPRINT_HEADLINE_ONE_LINER =
  'Put one painful workflow into production, with testing, guardrails, and a documented handover.';

export const RETAINER_NAME = 'Fractional AI Officer';
export const RETAINER_FRAMING = 'roughly one junior FTE, without the hire';
export const RETAINER_HEADLINE_ONE_LINER =
  'A managed AI operator layer at roughly the capacity of one junior engineering hire — without the salary, benefits, or onboarding cost.';

// Company profile URLs for schema.org sameAs. This is the highest-value
// structured data a brand with no search history can publish: it is the
// machine-readable statement of which entity "Phronimos" refers to.
// Empty strings are filtered before emit, so partial is fine — but every
// entry that lands here should be a canonical, resolvable URL.
export const ORG_SAME_AS: string[] = [
  // TODO: LinkedIn company URL — e.g. 'https://www.linkedin.com/company/phronimos/'
  // TODO: Crunchbase organization URL — e.g. 'https://www.crunchbase.com/organization/phronimos'
  // TODO: Wikidata entity URL — e.g. 'https://www.wikidata.org/wiki/Q...'
].filter(Boolean);

// Founder identity. Kept in config so the About-page Person schema and the
// Organization.founder reference stay in lockstep. If the founder record is
// left blank, the Person block is suppressed rather than emitted with holes.
// TODO: confirm Matthew's full legal name spelling as it should appear in
//       schema (currently the common name — legal name for entity records
//       may differ).
export const FOUNDER_NAME = 'Matthew Kirby';
// TODO: LinkedIn personal URL — e.g. 'https://www.linkedin.com/in/matthewdkirby/'
export const FOUNDER_LINKEDIN = '';
export const FOUNDER_JOB_TITLE = 'Founder';
export const FOUNDER_KNOWS_ABOUT: string[] = [
  'AI implementation',
  'AI governance',
  'managed AI operations',
  'small business operations',
  'reliability engineering',
];

// Service-area business: San Diego, CA. Google Business Profile guidance for
// SABs is to hide the street address; schema.org accepts a PostalAddress with
// only locality/region/country, which is the right shape for a service-area
// firm without a public storefront.
export const ORG_ADDRESS = {
  addressLocality: 'San Diego',
  addressRegion: 'CA',
  addressCountry: 'US',
};

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
