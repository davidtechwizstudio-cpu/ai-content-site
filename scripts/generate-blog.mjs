import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) {
  console.error('ERROR: GEMINI_API_KEY env variable set nahi hai.');
  process.exit(1);
}

const MODEL = process.env.GEMINI_MODEL || 'gemini-2.5-flash';
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
- Language: English, engaging and practical (beginner-friendly but with depth).
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

async function generate(topic) {
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
    throw new Error(`Gemini API error ${res.status}: ${await res.text()}`);
  }

  const data = await res.json();
  let text = data?.candidates?.[0]?.content?.parts?.map((p) => p.text).join('') ?? '';
  if (!text.trim()) throw new Error('Gemini se empty response mila.');

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
