// Single source of truth for site-wide constants.
// BOOKING_URL: swap to the scheduler link (Cal.com / Calendly) once one exists.
export const SITE_NAME = 'Phronimos';
export const LEGAL_NAME = 'Phronimos Solutions LLC';
export const SITE_URL = 'https://phronimos.io';
export const CONTACT_EMAIL = 'hello@phronimos.io';
export const BOOKING_URL = '/contact/';
export const TAGLINE = 'Practical Wisdom at Scale';

// Web3Forms access key. Placeholder by default so dev builds never send.
// Set PUBLIC_WEB3FORMS_KEY in the environment (see DEPLOY.md) for production.
export const WEB3FORMS_KEY =
  import.meta.env.PUBLIC_WEB3FORMS_KEY ?? 'WEB3FORMS_ACCESS_KEY_HERE';
