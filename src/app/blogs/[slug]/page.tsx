import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllBlogs, getBlog } from '@/lib/blogs';
import PostCard, { thumbEmoji, thumbGradients } from '@/components/post-card';
import ReadingProgress from '@/components/reading-progress';

export function generateStaticParams() {
  return getAllBlogs().map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlog(slug);
  if (!blog) return { title: 'Not Found' };
  return { title: blog.title, description: blog.description };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blog = await getBlog(slug);
  if (!blog) notFound();

  const others = getAllBlogs().filter((b) => b.slug !== slug).slice(0, 4);
  const cover = thumbGradients[slug.charCodeAt(0) % thumbGradients.length];

  return (
    <>
      <ReadingProgress />
      <article className="article container">
        <div className="article-cover" style={{ background: cover }}>
          <span className="cover-emoji">{thumbEmoji(blog.tags)}</span>
          <span className="cover-tag">{blog.tags[0] ?? 'AI'}</span>
        </div>

        <header className="article-head">
          <Link href="/blogs/" className="back">
            ← All blogs
          </Link>
          <span className="kicker">AI deep dive</span>
          <h1>{blog.title}</h1>
          <p className="article-lead">{blog.description}</p>
          <div className="sub">
            <span className="author-chip">
              <span className="author-avatar">AI</span>
              AI Insights Team
            </span>
            <span className="dot-sep">·</span>
            <span>{blog.date}</span>
            <span className="dot-sep">·</span>
            <span>{blog.readMins} min read</span>
            <div className="tag-row">
              {blog.tags.map((t) => (
                <span key={t} className="tag">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </header>

        <div className="article-body" dangerouslySetInnerHTML={{ __html: blog.html }} />

        <footer className="article-foot">
          <div className="tag-row">
            {blog.tags.map((t) => (
              <span key={t} className="tag">
                    {t}
              </span>
            ))}
          </div>
          <Link href="/blogs/" className="btn">
            Explore more articles →
          </Link>
        </footer>
      </article>

      {others.length > 0 && (
        <section className="band soft">
          <div className="container">
            <div className="section-head">
              <div>
                <span className="kicker">Keep reading</span>
                <h2>More from the blog</h2>
              </div>
              <Link href="/blogs/" className="link-more">
                All articles →
              </Link>
            </div>
            <div className="grid">
              {others.map((b, i) => (
                <PostCard key={b.slug} blog={b} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
