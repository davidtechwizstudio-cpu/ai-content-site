import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'AI Insights — AI Content Hub',
    template: '%s | AI Insights',
  },
  description:
    'Daily AI articles, guides, tools and workflows — automatically generated and published.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <div className="container nav">
            <Link href="/" className="logo">
              AI<span>Insights</span>
            </Link>
            <nav>
              <Link href="/">Home</Link>
              <Link href="/blogs/">Blogs</Link>
              <a href="https://github.com" target="_blank" rel="noreferrer">
                GitHub
              </a>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer className="site-footer">
          <div className="container">
            <p>© {new Date().getFullYear()} AI Insights — Content auto-generated with Gemini &amp; deployed on Netlify.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
