import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkHtml from 'remark-html';

export interface BlogMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  readMins: number;
}

export interface Blog extends BlogMeta {
  html: string;
}

const BLOGS_DIR = path.join(process.cwd(), 'content', 'blogs');

function toDate(value: unknown): string {
  const d = value ? new Date(String(value)) : new Date();
  return isNaN(d.getTime()) ? new Date().toISOString().slice(0, 10) : d.toISOString().slice(0, 10);
}

function readingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

export function getAllBlogs(): BlogMeta[] {
  if (!fs.existsSync(BLOGS_DIR)) return [];
  return fs
    .readdirSync(BLOGS_DIR)
    .filter((f) => f.endsWith('.md'))
    .map((file) => {
      const slug = file.replace(/\.md$/, '');
      const { data, content } = matter(fs.readFileSync(path.join(BLOGS_DIR, file), 'utf8'));
      return {
        slug,
        title: String(data.title ?? slug),
        description: String(data.description ?? ''),
        date: toDate(data.date),
        tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
        readMins: readingTime(content),
      };
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}

export async function getBlog(slug: string): Promise<Blog | null> {
  const file = path.join(BLOGS_DIR, `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  const { data, content } = matter(fs.readFileSync(file, 'utf8'));
  const processed = await remark().use(remarkHtml as never).process(content);
  return {
    slug,
    title: String(data.title ?? slug),
    description: String(data.description ?? ''),
    date: toDate(data.date),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    readMins: readingTime(content),
    html: String(processed),
  };
}
