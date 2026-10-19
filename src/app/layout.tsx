import type { Metadata } from 'next';
import Link from 'next/link';
import { Inter } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });
const clash = localFont([
  { src: '../fonts/ClashDisplay-600.woff2', weight: '600', style: 'normal', display: 'swap' },
  { src: '../fonts/ClashDisplay-700.woff2', weight: '700', style: 'normal', display: 'swap' },
], { variable: '--font-display' });

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
            <div className="footer-grid">
              <div className="footer-brand">
                <Link href="/" className="logo">
                  <span className="logo-mark">AI</span>
                  AI Insights
                </Link>
                <p>
                  A practical, regularly updated hub for AI tools, tutorials, and automation
                  workflows — every article auto-generated with Gemini and verified by our pipeline.
                </p>
                <div className="socials">
                  <a href="https://github.com/davidtechwizstudio-cpu/ai-content-site" target="_blank" rel="noreferrer" title="GitHub">
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
                <a href="https://app.netlify.com/projects/ai-content-site" target="_blank" rel="noreferrer">
                  Hosting Status
                </a>
                <a href="https://github.com/davidtechwizstudio-cpu/ai-content-site" target="_blank" rel="noreferrer">
                  Source Code
                </a>
              </div>
            </div>
            <div className="copyright">
              © {new Date().getFullYear()} AI Insights — content auto-generated with Google Gemini,
              published daily on Netlify &amp; GitHub Pages.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
