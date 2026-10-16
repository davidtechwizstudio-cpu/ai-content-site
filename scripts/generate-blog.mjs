import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) {
  console.error('ERROR: GEMINI_API_KEY env variable set nahi hai.');
  process.exit(1);
}

const MODEL = process.env.GEMINI_MODEL || 'gemini-3-flash-preview';
const ROOT = process.cwd();
const TOPICS_FILE = path.join(ROOT, 'content', 'topics.txt');
const BLOGS_DIR = path.join(ROOT, 'content', 'blogs');

const slugify = (t) =>
  t
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);

const today = () => new Date().toISOString().slice(0, 10);

function buildPrompt(topic) {
  return `You are a senior AI industry writer. Write a complete, SEO-optimized blog post about:

"${topic}"

Rules:
- Language: STRICTLY English. Never write in Roman Urdu, Hindi transliteration, or any non-English language — the entire post including title, description, headings, tables and FAQ must be plain English.
- Length: 1200-1800 words.
- Output ONLY raw Markdown. No code fences, no commentary.
- Start with YAML frontmatter in exactly this format:

---
title: "<compelling SEO title, max 65 chars, always wrap in double quotes>"
description: "<meta description, max 155 chars, always wrap in double quotes>"
date: ${today()}
tags: [tag1, tag2, tag3]
---

- Structure: intro hook, H2/H3 subheadings, bullet lists, one comparison table if useful, FAQ section with 3-4 questions, and a short conclusion with a call to action.
- Use real, useful, specific information. No fluff, no "in today's fast-paced world" filler.
- Do not mention that you are an AI.`;
}

const ROMAN_URDU_RE = /\b(kaise|karenge|karta|karte|karein|chahiye|zaroori|bilkul|sabse|pehle|kyunki|nahi|milte|milta|seekh|kharcha|kaunsa|kitna|wala|wali|rahe|rahi|hogi|hoti)\b/i;

function looksRomanUrdu(text) {
  const body = text.replace(/^---[\s\S]*?---\s*/, '');
  const words = body.toLowerCase().match(/[a-z]+/g) ?? [];
  if (words.length < 50) return false;
  const hits = words.filter((w) => ROMAN_URDU_RE.test(w)).length;
  return hits / words.length > 0.008;
}

async function generateOnce(topic) {
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: buildPrompt(topic) }] }],
        generationConfig: { temperature: 0.8, maxOutputTokens: 8192 },
      }),
    }
  );

  if (!res.ok) {
    const errText = await res.text();
    throw Object.assign(new Error(`Gemini API error ${res.status}: ${errText}`), { status: res.status });
  }

  const data = await res.json();
  let text = data?.candidates?.[0]?.content?.parts?.map((p) => p.text).join('') ?? '';
  if (!text.trim()) throw new Error('Gemini se empty response mila.');
  return text;
}

async function generate(topic) {
  let lastErr;
  let text;
  for (let attempt = 1; attempt <= 4; attempt++) {
    try {
      text = await generateOnce(topic);
      if (looksRomanUrdu(text)) {
        throw Object.assign(new Error('Roman Urdu transliteration detected in output.'), { status: 422 });
      }
      break;
    } catch (err) {
      lastErr = err;
      const retryable = err.status === 429 || err.status === 503 || err.status === 500 || err.status === 422 || !err.status;
      if (!retryable || attempt === 4) break;
      console.warn(`Attempt ${attempt} failed (${err.status || 'network'}), retrying in ${attempt * 5}s...`);
      await new Promise((r) => setTimeout(r, attempt * 5000));
    }
  }
  if (!text) throw lastErr;

  text = text.trim().replace(/^```(?:markdown|md)?\s*/i, '').replace(/\s*```$/, '').trim();

  if (!text.startsWith('---')) {
    text = `---\ntitle: ${JSON.stringify(topic)}\ndescription: ${JSON.stringify(`Practical guide: ${topic}`)}\ndate: ${today()}\ntags: [ai, guide]\n---\n\n${text}`;
  }
  return text;
}

const topics = fs
  .readFileSync(TOPICS_FILE, 'utf8')
  .split('\n')
  .map((t) => t.trim())
  .filter((t) => t && !t.startsWith('#'));

if (!fs.existsSync(BLOGS_DIR)) fs.mkdirSync(BLOGS_DIR, { recursive: true });

const existing = new Set(
  fs.readdirSync(BLOGS_DIR).filter((f) => f.endsWith('.md')).map((f) => f.replace(/\.md$/, ''))
);
const topic = topics.find((t) => !existing.has(slugify(t)));

if (!topic) {
  console.log('Saare topics already publish ho chuke hain. content/topics.txt me naye topics add karein.');
  process.exit(0);
}

console.log(`Generating blog for topic: "${topic}" ...`);

try {
  const markdown = await generate(topic);
  const file = path.join(BLOGS_DIR, `${slugify(topic)}.md`);
  let final = markdown;
  try {
    const { data } = matter(markdown);
    if (!data.title) throw new Error('frontmatter me title nahi hai');
  } catch {
    const body = markdown.replace(/^---[\s\S]*?---\s*/, '');
    final = `---\ntitle: ${JSON.stringify(topic)}\ndescription: ${JSON.stringify(`Practical guide: ${topic}`)}\ndate: ${today()}\ntags: [ai, guide]\n---\n\n${body}`;
    console.warn('WARN: frontmatter invalid tha, fallback se repair kiya.');
  }
  fs.writeFileSync(file, final, 'utf8');
  console.log(`OK: content/blogs/${slugify(topic)}.md likha gaya.`);
} catch (err) {
  console.error('Generation failed:', err.message);
  process.exit(1);
}
