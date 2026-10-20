import fs from 'node:fs';
import path from 'node:path';

const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) {
  console.error('ERROR: GEMINI_API_KEY env variable set nahi hai.');
  process.exit(1);
}

const MODEL = process.env.GEMINI_MODEL || 'gemini-3-flash-preview';
const COUNT = Number(process.env.TOPIC_COUNT || 40);
const MIN_REMAINING = Number(process.env.MIN_REMAINING || 15);
const ROOT = process.cwd();
const TOPICS_FILE = path.join(ROOT, 'content', 'topics.txt');
const BLOGS_DIR = path.join(ROOT, 'content', 'blogs');

const slugify = (t) =>
  t
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);

function readTopics() {
  return fs
    .readFileSync(TOPICS_FILE, 'utf8')
    .split('\n')
    .map((t) => t.trim())
    .filter((t) => t && !t.startsWith('#'));
}

function existingSlugs() {
  const set = new Set();
  for (const t of readTopics()) set.add(slugify(t));
  if (fs.existsSync(BLOGS_DIR)) {
    for (const f of fs.readdirSync(BLOGS_DIR)) {
      if (f.endsWith('.md')) set.add(f.replace(/\.md$/, ''));
    }
  }
  return set;
}

function buildPrompt(existingTopics) {
  const sample = existingTopics.slice(-30).join('\n- ');
  return `You are a content strategist for an English AI blog ("AI Insights") covering AI tools, tutorials, automation, business use cases and news.

Generate exactly ${COUNT} brand-new blog topic ideas. Output ONLY the topics, one per line, plain text. No numbering, no bullets, no quotes, no commentary.

Rules:
- Every topic must be a specific, SEO-friendly blog title style phrase (not a sentence).
- STRICTLY English. Never Roman Urdu or Hindi transliteration.
- Vary across categories: AI tools comparisons, how-to guides, business use cases, tutorials, beginner explainers, productivity, coding, marketing, research, automation, ethics, news-style analysis.
- Do NOT repeat or closely paraphrase any of these existing topics:
- ${sample}

Topics:`;
}

async function callGemini(prompt) {
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.9, maxOutputTokens: 2048 },
      }),
    }
  );
  if (!res.ok) {
    const errText = await res.text();
    throw Object.assign(new Error(`Gemini API error ${res.status}: ${errText}`), { status: res.status });
  }
  const data = await res.json();
  const text = data?.candidates?.[0]?.content?.parts?.map((p) => p.text).join('') ?? '';
  if (!text.trim()) throw new Error('Gemini se empty response mila.');
  return text;
}

const topics = readTopics();
const published = fs.existsSync(BLOGS_DIR)
  ? fs.readdirSync(BLOGS_DIR).filter((f) => f.endsWith('.md')).length
  : 0;
const remaining = topics.length - published;

console.log(`Topics total=${topics.length} published=${published} remaining=${remaining} (threshold=${MIN_REMAINING})`);

if (remaining >= MIN_REMAINING) {
  console.log('Enough topics available. Koi naya topic add nahi kiya.');
  process.exit(0);
}

console.log(`Remaining kam hai — Gemini se ${COUNT} naye topics generate ho rahe hain...`);

let text;
for (let attempt = 1; attempt <= 3; attempt++) {
  try {
    text = await callGemini(buildPrompt(topics));
    break;
  } catch (err) {
    console.warn(`Attempt ${attempt} failed (${err.status || 'network'}): ${err.message}`);
    if (attempt === 3) {
      console.error('Topic generation failed, aborting.');
      process.exit(1);
    }
    await new Promise((r) => setTimeout(r, attempt * 5000));
  }
}

const seen = existingSlugs();
const fresh = [];
for (const line of text.split('\n')) {
  const t = line.replace(/^\s*(?:[-*•]|\d+[.)])\s*/, '').trim().replace(/^"|"$/g, '');
  if (!t || t.length < 8 || t.length > 100) continue;
  const s = slugify(t);
  if (!s || seen.has(s)) continue;
  seen.add(s);
  fresh.push(t);
  if (fresh.length >= COUNT) break;
}

if (!fresh.length) {
  console.log('Naye unique topics nahi mile (sab duplicate rahe).');
  process.exit(0);
}

fs.appendFileSync(TOPICS_FILE, `\n${fresh.join('\n')}\n`, 'utf8');
console.log(`OK: ${fresh.length} naye topics content/topics.txt me add ho gaye.`);
