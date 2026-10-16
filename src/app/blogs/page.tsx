import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllBlogs } from '@/lib/blogs';

export const metadata: Metadata = {
  title: 'Blogs',
  description: 'All AI articles, guides and tutorials — auto-generated daily.',
};

export default function BlogsPage() {
  const blogs = getAllBlogs();

  return (
    <div className="container">
      <div className="page-title">
        <h1>All Blogs</h1>
        <p>{blogs.length} articles — new blogs are uploaded automatically every day.</p>
      </div>
      <section className="section">
        {blogs.length === 0 ? (
          <p className="empty">No blogs found.</p>
        ) : (
          <div className="grid">
            {blogs.map((b) => (
              <Link key={b.slug} href={`/blogs/${b.slug}/`} className="card">
                <h2>{b.title}</h2>
                <p>{b.description}</p>
                <div className="meta">
                  <span>{b.date}</span>
                  <span>{b.tags.slice(0, 3).map((t) => `#${t}`).join(' ')}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
