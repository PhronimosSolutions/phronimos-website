// Where questionnaires come from at build time.
//
// 1. Local files in src/content/questionnaires/*.json (the public sample lives here).
// 2. The private GitHub repo named by QUESTIONNAIRES_REPO (e.g.
//    PhronimosSolutions/phronimos-questionnaires), folder questionnaires/, read with
//    QUESTIONNAIRES_READ_TOKEN. Customer forms live ONLY there: the site repo is
//    public, and client names and questions must not be.
//
// If the private repo is configured but can't be read, the build fails on purpose:
// deploying without it would 404 every link already sent to a customer.
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const LOCAL_DIR = join(process.cwd(), 'src/content/questionnaires');
const API = process.env.QUESTIONNAIRES_API_BASE || 'https://api.github.com';

function parse(id, text, where) {
  try {
    return { id, ...JSON.parse(text) };
  } catch (e) {
    throw new Error(`Questionnaire ${where}/${id}.json is not valid JSON: ${e.message}`);
  }
}

function loadLocal() {
  if (!existsSync(LOCAL_DIR)) return [];
  return readdirSync(LOCAL_DIR)
    .filter((f) => f.endsWith('.json'))
    .map((f) => parse(f.slice(0, -5), readFileSync(join(LOCAL_DIR, f), 'utf8'), 'local'));
}

async function loadRemote() {
  const repo = process.env.QUESTIONNAIRES_REPO;
  const token = process.env.QUESTIONNAIRES_READ_TOKEN;
  if (!repo) return [];
  if (!token) throw new Error('QUESTIONNAIRES_REPO is set but QUESTIONNAIRES_READ_TOKEN is missing');
  const headers = { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github+json', 'User-Agent': 'phronimos-site-build' };
  const res = await fetch(`${API}/repos/${repo}/contents/questionnaires?ref=main`, { headers });
  if (res.status === 404) return []; // repo exists but has no forms yet
  if (!res.ok) throw new Error(`Could not list ${repo}/questionnaires: HTTP ${res.status}`);
  const files = (await res.json()).filter((f) => f.type === 'file' && f.name.endsWith('.json'));
  return Promise.all(
    files.map(async (f) => {
      const r = await fetch(`${API}/repos/${repo}/contents/${f.path}?ref=main`, {
        headers: { ...headers, Accept: 'application/vnd.github.raw+json' },
      });
      if (!r.ok) throw new Error(`Could not read ${f.path}: HTTP ${r.status}`);
      return parse(f.name.slice(0, -5), await r.text(), repo);
    })
  );
}

export async function loadQuestionnaires() {
  const all = [...loadLocal(), ...(await loadRemote())];
  const seen = new Set();
  for (const q of all) {
    if (seen.has(q.id)) throw new Error(`Two questionnaires share the id "${q.id}"`);
    seen.add(q.id);
  }
  return all;
}
