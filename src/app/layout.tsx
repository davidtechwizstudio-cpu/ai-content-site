import type { Metadata } from 'next';
import Link from 'next/link';
import { Inter } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });
const clash = localFont({
  src: [
    { path: '../fonts/ClashDisplay-600.woff2', weight: '600', style: 'normal' },
    { path: '../fonts/ClashDisplay-700.woff2', weight: '700', style: 'normal' },
  ],
  display: 'swap',
  variable: '--font-display',
});
export const metadata: Metadata = {
  title: {
    default: 'AI Insights — Discover the Power of Artificial Intelligence',
    template: '%s | AI Insights',
  },
  description:
    'Explore the latest AI tools, practical tutorials, automation workflows, and expert guides to work smarter with AI.',
};

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/#categories', label: 'AI Categories' },
  { href: '/#tools', label: 'AI Tools' },
  { href: '/#articles', label: 'Articles' },
  { href: '/comparison/', label: 'Comparison' },
  { href: '/blogs/', label: 'Blog' },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${clash.variable}`}>
      <body>
        <header className="site-header">
          <div className="container nav">
            <Link href="/" className="logo">
              <span className="logo-mark">AI</span>
              AI Insights
            </Link>
            <nav className="nav-links">
              {navLinks.map((l) => (
                <Link key={l.label} href={l.href}>
                  {l.label}
                </Link>
              ))}
            </nav>
            <Link href="/blogs/" className="nav-cta">
              Browse Blogs →
            </Link>
          </div>
        </header>
        <main>{children}</main>
        <footer className="site-footer">
          <div className="container">
            <div className="footer-top">
              <div className="footer-brand">
                <Link href="/" className="logo">
                  <span className="logo-mark">AI</span>
                  AI Insights
                </Link>
                <p>
                  AI is the ability of a digital computer or robot to perform tasks that typically
                  require human intelligence, such as reasoning, learning, decision-making, and
                  problem-solving.
                </p>
                <div className="footer-status">
                  <span className="status-dot" /> Live · new article every day
                </div>
                <div className="socials">
                  <a
                    href="https://github.com/davidtechwizstudio-cpu/ai-content-site"
                    target="_blank"
                    rel="noreferrer"
                    title="GitHub"
                  >
                    ⎇
                  </a>
                  <a href="mailto:hello@aiinsights.example" title="Email">
                    ✉
                  </a>
                  <a href="/blogs/" title="Blog">
                    📝
                  </a>
                </div>
              </div>

              <div className="footer-cols">
                <div className="footer-col">
                  <h4>Explore</h4>
                  <Link href="/#tools">AI Tools Directory</Link>
                  <Link href="/#articles">Latest Articles</Link>
                  <Link href="/blogs/">All Blogs</Link>
                  <Link href="/#categories">Categories</Link>
                </div>
                <div className="footer-col">
                  <h4>Popular Categories</h4>
                  <Link href="/#categories">AI Writing</Link>
                  <Link href="/#categories">AI Coding</Link>
                  <Link href="/#categories">AI Chatbots</Link>
                  <Link href="/#categories">AI Automation</Link>
                  <Link href="/#categories">AI Research</Link>
                </div>
                <div className="footer-col">
                  <h4>Company &amp; Legal</h4>
                  <a href="mailto:hello@aiinsights.example">Contact</a>
                  <Link href="/#newsletter">Newsletter</Link>
                </div>
              </div>
            </div>

            <div className="footer-bottom">
              <span>© {new Date().getFullYear()} AI Insights</span>
              <span className="footer-meta">
                All rights reserved
              </span>
              <a href="#" className="to-top">
                Back to top ↑
              </a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
