import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllBlogs, getBlog } from '@/lib/blogs';

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

  return (
    <article className="article container">
      <Link href="/blogs/" className="back">
        ← All blogs
      </Link>
      <h1>{blog.title}</h1>
      <div className="sub">
        <span>{blog.date}</span>
        {blog.tags.map((t) => (
          <span key={t} className="tag">
            {t}
          </span>
        ))}
      </div>
      <div className="article-body" dangerouslySetInnerHTML={{ __html: blog.html }} />
    </article>
  );
}
