#!/usr/bin/env node
// Discovery questionnaire CLI, for agents (Claude, Lex). Matthew never runs this by hand.
//
//   node scripts/questionnaire.mjs validate <spec.json|->   check a spec, print a summary
//   node scripts/questionnaire.mjs publish  <spec.json|-> [--wait]
//        New spec (no "id")  -> creates a form with a fresh private link.
//        Spec with an "id"   -> updates that form in place (same link).
//   node scripts/questionnaire.mjs list                      every form, status, link
//   node scripts/questionnaire.mjs get <id>                  print a form's JSON (to edit it)
//   node scripts/questionnaire.mjs close <id> | reopen <id>
//   node scripts/questionnaire.mjs status [--wait]           did the latest change go live?
//   node scripts/questionnaire.mjs setup --hook <vercel-deploy-hook-url>   one-time repo setup
//   Add --json to any command for machine-readable output.
//
// Forms are JSON files in the PRIVATE repo $QUESTIONNAIRES_REPO under questionnaires/.
// Every change is a commit there; a GitHub Action then asks Vercel to rebuild the site,
// which pulls the forms in at build time (src/lib/questionnaire-source.mjs).
// Settings come from the environment or from this site's .env (gitignored):
//   QUESTIONNAIRES_WRITE_TOKEN  fine-grained GitHub token: Contents RW (+ Workflows RW for setup)
//   QUESTIONNAIRES_REPO         default PhronimosSolutions/phronimos-questionnaires
import { randomBytes } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { z } from 'zod';
import { makeQuestionnaireSchema } from '../src/lib/questionnaire-schema.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SITE = 'https://phronimos.io';
const SITE_REPO = 'PhronimosSolutions/phronimos-website';
const API = process.env.QUESTIONNAIRES_API_BASE || 'https://api.github.com';

// ---- env ------------------------------------------------------------------
function loadDotEnv() {
  const p = join(ROOT, '.env');
  if (!existsSync(p)) return {};
  const out = {};
  for (const line of readFileSync(p, 'utf8').split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m) out[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
  return out;
}
const dotenv = loadDotEnv();
const env = (k, d) => process.env[k] || dotenv[k] || d;
const REPO = env('QUESTIONNAIRES_REPO', 'PhronimosSolutions/phronimos-questionnaires');
const TOKEN = env('QUESTIONNAIRES_WRITE_TOKEN');

// ---- args -----------------------------------------------------------------
const argv = process.argv.slice(2);
const flags = new Set(argv.filter((a) => a.startsWith('--') && !a.includes('=')));
const JSON_OUT = flags.has('--json');
const optVal = (name) => {
  const i = argv.indexOf(`--${name}`);
  return i === -1 ? undefined : argv[i + 1];
};
const positional = argv.filter((a, i) => !a.startsWith('--') && !(i > 0 && argv[i - 1] === '--hook'));
const [cmd, arg1] = positional;

function out(human, data) {
  if (JSON_OUT) console.log(JSON.stringify(data, null, 2));
  else console.log(human);
}
function fail(msg, data = {}) {
  if (JSON_OUT) console.log(JSON.stringify({ ok: false, error: msg, ...data }, null, 2));
  else console.error(`Error: ${msg}`);
  process.exit(1);
}

// ---- github ---------------------------------------------------------------
function requireToken() {
  if (!TOKEN) fail('QUESTIONNAIRES_WRITE_TOKEN is not set (add it to the site .env). See DEPLOY.md > Discovery questionnaires.');
}
async function gh(method, path, body, { raw = false, auth = true } = {}) {
  const headers = { Accept: raw ? 'application/vnd.github.raw+json' : 'application/vnd.github+json', 'User-Agent': 'phronimos-questionnaire-cli', 'X-GitHub-Api-Version': '2022-11-28' };
  if (auth) headers.Authorization = `Bearer ${TOKEN}`;
  if (body) headers['Content-Type'] = 'application/json';
  const res = await fetch(`${API}${path}`, { method, headers, body: body ? JSON.stringify(body) : undefined });
  if (res.status === 404) return null;
  if (!res.ok) {
    const text = await res.text();
    fail(`GitHub ${method} ${path} -> HTTP ${res.status}: ${text.slice(0, 300)}`);
  }
  return raw ? res.text() : res.json();
}
const b64 = (s) => Buffer.from(s, 'utf8').toString('base64');

async function getFile(path) {
  const meta = await gh('GET', `/repos/${REPO}/contents/${path}?ref=main`);
  if (!meta) return null;
  return { sha: meta.sha, text: Buffer.from(meta.content, 'base64').toString('utf8') };
}
async function putFile(path, text, message, sha) {
  const r = await gh('PUT', `/repos/${REPO}/contents/${path}`, { message, content: b64(text), branch: 'main', ...(sha ? { sha } : {}) });
  return { commit: r.commit.sha, committedAt: r.commit.committer?.date || new Date().toISOString() };
}

// ---- spec helpers ---------------------------------------------------------
const schema = makeQuestionnaireSchema(z);

function readSpec(src) {
  if (!src) fail('Pass a spec file path, or - for stdin.');
  const text = src === '-' ? readFileSync(0, 'utf8') : readFileSync(src, 'utf8');
  try {
    return JSON.parse(text);
  } catch (e) {
    fail(`Spec is not valid JSON: ${e.message}`);
  }
}
function validate(spec) {
  const { id, ...data } = spec;
  if (id !== undefined && !/^[a-z0-9-]+$/.test(id)) fail(`Invalid id "${id}"`);
  const r = schema.safeParse(data);
  if (!r.success) {
    const issues = r.error.issues.map((i) => `${i.path.join('.') || '(root)'}: ${i.message}`);
    fail(`Spec failed validation:\n  - ${issues.join('\n  - ')}`, { issues });
  }
  return { id, data };
}
function summary(data) {
  let n = 0;
  const lines = [`${data.title} (for ${data.client})`];
  for (const s of data.sections) {
    lines.push(`  ${s.title}`);
    for (const q of s.questions) {
      n += 1;
      lines.push(`    ${n}. [${q.type || 'long'}${q.required === false ? ', optional' : ''}] ${q.label}`);
    }
  }
  return { text: lines.join('\n'), count: n };
}
function slugify(s) {
  return s.toLowerCase().normalize('NFKD').replace(/[^\w\s-]/g, '').trim().replace(/[\s_]+/g, '-').replace(/-+/g, '-').slice(0, 40).replace(/-$/, '') || 'form';
}
function token(len = 8) {
  const abc = 'abcdefghjkmnpqrstuvwxyz23456789';
  return Array.from(randomBytes(len), (b) => abc[b % abc.length]).join('');
}
const urlFor = (id) => `${SITE}/q/${id}/`;
const pathFor = (id) => `questionnaires/${id}.json`;

// ---- deploy status --------------------------------------------------------
// The GitHub Action triggers a Vercel production deploy of the site repo; Vercel
// reports it as a GitHub deployment there (public repo, no auth needed).
async function deployStatus(since) {
  const deps = (await gh('GET', `/repos/${SITE_REPO}/deployments?environment=Production&per_page=10`, null, { auth: false })) || [];
  const d = deps.find((x) => new Date(x.created_at) >= new Date(new Date(since).getTime() - 5000));
  if (!d) return { state: 'queued', detail: 'no production deploy has started since the change' };
  const statuses = (await gh('GET', `/repos/${SITE_REPO}/deployments/${d.id}/statuses?per_page=1`, null, { auth: false })) || [];
  const s = statuses[0];
  return { state: s ? s.state : 'pending', detail: s?.description || '', startedAt: d.created_at };
}
async function waitForDeploy(since, maxMs = 150000) {
  const start = Date.now();
  let st;
  while (Date.now() - start < maxMs) {
    st = await deployStatus(since);
    if (['success', 'failure', 'error', 'inactive'].includes(st.state)) return st;
    await new Promise((r) => setTimeout(r, 10000));
  }
  return { ...st, timedOut: true };
}
function deployLine(st) {
  if (st.state === 'success') return 'Live now.';
  if (st.state === 'failure' || st.state === 'error') return `Deploy FAILED (${st.detail}). The previous version of the site is still live.`;
  return `Deploying (${st.state}); usually live within 2 minutes.`;
}

// ---- commands ---------------------------------------------------------------
async function main() {
  switch (cmd) {
    case 'validate': {
      const { id, data } = validate(readSpec(arg1));
      const s = summary(data);
      return out(`Valid. ${s.count} questions.\n${s.text}`, { ok: true, id: id ?? null, questions: s.count, summary: s.text });
    }

    case 'publish': {
      requireToken();
      const spec = readSpec(arg1);
      let { id, data } = validate(spec);
      let sha;
      let created = false;
      if (id) {
        const existing = await getFile(pathFor(id));
        if (!existing) fail(`No form with id "${id}". Omit "id" to create a new one.`);
        sha = existing.sha;
      } else {
        id = `${slugify(data.client + ' ' + data.title)}-${token()}`;
        created = true;
      }
      const text = JSON.stringify(spec.id ? (({ id: _, ...rest }) => rest)(spec) : spec, null, 2) + '\n';
      const { commit, committedAt } = await putFile(pathFor(id), text, `${created ? 'Add' : 'Update'} questionnaire: ${data.client} — ${data.title}`, sha);
      const s = summary(data);
      const st = flags.has('--wait') ? await waitForDeploy(committedAt) : await deployStatus(committedAt);
      return out(
        `${created ? 'Created' : 'Updated'}: ${data.title} (${data.client}), ${s.count} questions.\nLink: ${urlFor(id)}\n${deployLine(st)}`,
        { ok: true, created, id, url: urlFor(id), commit, committedAt, questions: s.count, deploy: st }
      );
    }

    case 'list': {
      requireToken();
      const files = ((await gh('GET', `/repos/${REPO}/contents/questionnaires?ref=main`)) || []).filter((f) => f.name.endsWith('.json'));
      const rows = await Promise.all(
        files.map(async (f) => {
          const d = JSON.parse(await gh('GET', `/repos/${REPO}/contents/${f.path}?ref=main`, null, { raw: true }));
          const id = f.name.slice(0, -5);
          const expired = d.expires && new Date().toISOString().slice(0, 10) > String(d.expires).slice(0, 10);
          return { id, client: d.client, title: d.title, status: expired ? 'expired' : d.status || 'open', expires: d.expires || null, url: urlFor(id) };
        })
      );
      if (!rows.length) return out('No questionnaires yet.', { ok: true, forms: [] });
      return out(rows.map((r) => `${r.status.toUpperCase().padEnd(7)} ${r.client} — ${r.title}${r.expires ? ` (expires ${r.expires})` : ''}\n        ${r.url}`).join('\n'), { ok: true, forms: rows });
    }

    case 'get': {
      requireToken();
      if (!arg1) fail('Usage: get <id>');
      const f = await getFile(pathFor(arg1));
      if (!f) fail(`No form with id "${arg1}"`);
      const d = { id: arg1, ...JSON.parse(f.text) };
      return console.log(JSON.stringify(d, null, 2));
    }

    case 'close':
    case 'reopen': {
      requireToken();
      if (!arg1) fail(`Usage: ${cmd} <id>`);
      const f = await getFile(pathFor(arg1));
      if (!f) fail(`No form with id "${arg1}"`);
      const d = JSON.parse(f.text);
      d.status = cmd === 'close' ? 'closed' : 'open';
      if (cmd === 'reopen' && d.expires && new Date().toISOString().slice(0, 10) > String(d.expires).slice(0, 10)) delete d.expires;
      const { commit, committedAt } = await putFile(pathFor(arg1), JSON.stringify(d, null, 2) + '\n', `${cmd === 'close' ? 'Close' : 'Reopen'} questionnaire: ${d.client} — ${d.title}`, f.sha);
      const st = flags.has('--wait') ? await waitForDeploy(committedAt) : await deployStatus(committedAt);
      return out(`${cmd === 'close' ? 'Closed' : 'Reopened'}: ${d.title} (${d.client}). ${deployLine(st)}`, { ok: true, id: arg1, status: d.status, commit, deploy: st });
    }

    case 'status': {
      requireToken();
      const commits = await gh('GET', `/repos/${REPO}/commits?sha=main&per_page=1`);
      const since = commits?.[0]?.commit?.committer?.date;
      if (!since) fail('No changes found in the forms repo yet.');
      const st = flags.has('--wait') ? await waitForDeploy(since) : await deployStatus(since);
      return out(`Latest change: "${commits[0].commit.message}" at ${since}. ${deployLine(st)}`, { ok: true, lastChange: since, message: commits[0].commit.message, deploy: st });
    }

    case 'setup': {
      requireToken();
      const hook = optVal('hook');
      if (!hook || !/^https:\/\/api\.vercel\.com\/v1\/integrations\/deploy\//.test(hook)) fail('Pass --hook with the Vercel deploy hook URL (https://api.vercel.com/v1/integrations/deploy/...).');
      const repo = await gh('GET', `/repos/${REPO}`);
      if (!repo) fail(`Can't see ${REPO}. Create it (private) and give the token access to it.`);
      if (!repo.private) fail(`${REPO} is PUBLIC. Make it private first: it will hold client names and questions.`);
      // The hook URL only triggers a rebuild of the site. It sits in this private repo's
      // workflow so no GitHub secret has to be set up by hand.
      const workflow = `name: Rebuild phronimos.io
on:
  push:
    branches: [main]
    paths: ['questionnaires/**']
  workflow_dispatch:
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Trigger Vercel production deploy
        run: curl -fsS -X POST "${hook}"
`;
      const readme = `# Phronimos discovery questionnaires (private)

One JSON file per form in \`questionnaires/\`. The filename is the private link:
\`https://phronimos.io/q/<filename-without-.json>/\`.

Managed by Claude and Lex through \`scripts/questionnaire.mjs\` in the website repo.
Every push to \`questionnaires/\` triggers a production rebuild of phronimos.io.
Keep this repo private: it contains client names and discovery questions.
`;
      const results = [];
      for (const [path, text, msg] of [
        ['.github/workflows/rebuild-site.yml', workflow, 'Rebuild phronimos.io when forms change'],
        ['README.md', readme, 'Add README'],
      ]) {
        const existing = await getFile(path);
        await putFile(path, text, msg, existing?.sha);
        results.push(path);
      }
      return out(`Set up ${REPO}: ${results.join(', ')}.`, { ok: true, repo: REPO, files: results });
    }

    default:
      console.log(readFileSync(fileURLToPath(import.meta.url), 'utf8').split('\n').slice(1, 30).filter((l) => l.startsWith('//')).map((l) => l.slice(3)).join('\n'));
      process.exit(cmd ? 1 : 0);
  }
}
main().catch((e) => fail(e.message));
