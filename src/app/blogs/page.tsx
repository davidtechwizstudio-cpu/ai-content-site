import type { Metadata } from 'next';
import { getAllBlogs } from '@/lib/blogs';
import PostCard from '@/components/post-card';

export const metadata: Metadata = {
  title: 'All Blogs',
  description: 'All AI articles, guides and tutorials — auto-generated daily.',
};

export default function BlogsPage() {
  const blogs = getAllBlogs();

  return (
    <div className="container">
      <div className="page-title">
        <span className="kicker">The blog</span>
        <h1>All Blogs</h1>
        <p>{blogs.length} articles — new blogs are uploaded automatically every day.</p>
      </div>
      <section className="band">
        {blogs.length === 0 ? (
          <p className="empty">No blogs found.</p>
        ) : (
          <div className="grid">
            {blogs.map((b, i) => (
              <PostCard key={b.slug} blog={b} index={i} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
