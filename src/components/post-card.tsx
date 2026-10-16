import Link from 'next/link';
import type { BlogMeta } from '@/lib/blogs';

const thumbGradients = [
  'linear-gradient(135deg, #dbeafe, #bfdbfe)',
  'linear-gradient(135deg, #ede9fe, #ddd6fe)',
  'linear-gradient(135deg, #dcfce7, #bbf7d0)',
  'linear-gradient(135deg, #fef3c7, #fde68a)',
  'linear-gradient(135deg, #ffe4e6, #fecdd3)',
  'linear-gradient(135deg, #e0f2fe, #bae6fd)',
];

function thumbEmoji(tags: string[]): string {
  const t = tags.join(' ').toLowerCase();
  if (t.includes('agent') || t.includes('automation')) return '⚙️';
  if (t.includes('image') || t.includes('generative')) return '🎨';
  if (t.includes('coding') || t.includes('code')) return '💻';
  if (t.includes('rag') || t.includes('research')) return '🔬';
  if (t.includes('ethic') || t.includes('regulation')) return '⚖️';
  if (t.includes('marketing')) return '📈';
  if (t.includes('tool')) return '🛠️';
  return '🤖';
}

export default function PostCard({ blog, index = 0 }: { blog: BlogMeta; index?: number }) {
  return (
    <Link href={`/blogs/${blog.slug}/`} className="card">
      <div className="thumb" style={{ background: thumbGradients[index % thumbGradients.length] }}>
        {thumbEmoji(blog.tags)}
        <span className="thumb-tag">{blog.tags[0] ?? 'AI'}</span>
      </div>
      <div className="card-body">
        <div className="tag-row">
          {blog.tags.slice(0, 2).map((t) => (
            <span key={t} className="tag">
              {t}
            </span>
          ))}
        </div>
        <h3>{blog.title}</h3>
        <p>{blog.description}</p>
        <div className="meta">
          <span>
            {blog.date} · {blog.readMins} min read
          </span>
          <span className="read-more">Read More →</span>
        </div>
      </div>
    </Link>
  );
}
