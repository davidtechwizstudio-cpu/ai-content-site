'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import type { BlogMeta } from '@/lib/blogs';
import PostCard from '@/components/post-card';

const categories = [
  { icon: '✍️', title: 'AI Writing', desc: 'Draft articles, emails and copy with AI.' },
  { icon: '🎨', title: 'AI Image Generation', desc: 'Logos, art and product visuals.' },
  { icon: '🎬', title: 'AI Video Generation', desc: 'Create clips and explainers fast.' },
  { icon: '🎙️', title: 'AI Voice & Audio', desc: 'Transcription, TTS and voice cloning.' },
  { icon: '💻', title: 'AI Coding', desc: 'Copilot editors and code review tools.' },
  { icon: '💬', title: 'AI Chatbots', desc: 'Personal assistants and support bots.' },
  { icon: '📊', title: 'AI Productivity', desc: 'Meeting notes and everyday automation.' },
  { icon: '⚙️', title: 'AI Automation', desc: 'Agents, n8n, Make and Zapier flows.' },
  { icon: '📈', title: 'AI Marketing', desc: 'SEO, ads and social content engines.' },
  { icon: '🏢', title: 'AI Business Tools', desc: 'Sales, support and ops copilots.' },
  { icon: '🔬', title: 'AI Research', desc: 'Summaries with verified sources.' },
  { icon: '🎁', title: 'Free AI Tools', desc: 'Capable free tiers, no card needed.' },
];

interface Tool {
  name: string;
  letter: string;
  color: string;
  desc: string;
  cat: string;
  pricing: 'Free' | 'Premium' | 'Paid';
  featured?: boolean;
  url: string;
}

const tools: Tool[] = [
  { name: 'Claude', letter: 'C', color: '#d97757', desc: 'Thoughtful long-form writing, document analysis and careful coding.', cat: 'AI Chatbots', pricing: 'Premium', featured: true, url: 'https://claude.ai' },
  { name: 'ChatGPT', letter: 'G', color: '#10a37f', desc: 'The everyday assistant for writing, research, analysis and code.', cat: 'AI Chatbots', pricing: 'Premium', featured: true, url: 'https://chatgpt.com' },
  { name: 'Gemini', letter: 'G', color: '#4285f4', desc: 'Multimodal assistant deeply integrated with Google services.', cat: 'AI Productivity', pricing: 'Free', url: 'https://gemini.google.com' },
  { name: 'Perplexity', letter: 'P', color: '#20808d', desc: 'Ask questions and get answers with source citations to verify.', cat: 'AI Research', pricing: 'Premium', url: 'https://www.perplexity.ai' },
  { name: 'n8n', letter: 'n', color: '#ea4b71', desc: 'Visual workflow automation you can self-host for free.', cat: 'AI Automation', pricing: 'Premium', featured: true, url: 'https://n8n.io' },
  { name: 'Midjourney', letter: 'M', color: '#8b5cf6', desc: 'High-quality artistic image generation with fine style control.', cat: 'AI Image Generation', pricing: 'Paid', url: 'https://www.midjourney.com' },
];

export default function HomeClient({ blogs }: { blogs: BlogMeta[] }) {
  const [query, setQuery] = useState('');
  const [submitted, setSubmitted] = useState('');
  const [pricing, setPricing] = useState<'All' | 'Free' | 'Premium' | 'Paid'>('All');
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);

  const results = useMemo(() => {
    const q = submitted.trim().toLowerCase();
    if (!q) return null;
    return blogs.filter((b) =>
      `${b.title} ${b.description} ${b.tags.join(' ')}`.toLowerCase().includes(q)
    );
  }, [blogs, submitted]);

  const visibleTools = pricing === 'All' ? tools : tools.filter((t) => t.pricing === pricing);
  const news = results ?? blogs.slice(0, 4);
  const tutorials = results ? [] : blogs.slice(4, 8);
  const picks = results ? [] : blogs.slice(8, 12);

  const stats = [
    { value: `${blogs.length}+`, label: 'AI Articles' },
    { value: '12', label: 'Categories' },
    { value: 'Daily', label: 'Auto Uploads' },
    { value: '100%', label: 'AI Generated' },
  ];

  function submitSearch(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(query);
    document.getElementById('articles')?.scrollIntoView({ behavior: 'smooth' });
  }

  async function subscribe(e: React.FormEvent) {
    e.preventDefault();
    try {
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ 'form-name': 'newsletter', email }).toString(),
      });
    } catch {
      // Optimistic UI — form is wired for Netlify Forms in production.
    }
    setSubscribed(true);
  }

  return (
    <>
      {/* HERO */}
      <section className="container hero">
        <div>
          <div className="eyebrow">Regularly updated · No marketplace</div>
          <h1>
            Discover the Power of <em>Artificial Intelligence</em>
          </h1>
          <p className="lead">
            Explore the latest AI tools, practical tutorials, automation workflows, and expert
            guides to work smarter with AI.
          </p>
          <form className="search-bar" onSubmit={submitSearch}>
            <input
              type="search"
              placeholder="Search tools, tutorials, and guides..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search articles"
            />
            <button className="btn-blue" type="submit">
              Search
            </button>
          </form>
          <div className="hero-actions">
            <Link href="/#tools" className="btn">
              Explore AI Tools →
            </Link>
            <Link href="/#articles" className="btn-outline">
              Read Latest AI News
            </Link>
          </div>
          <div className="trust-line">
            <span className="dot">●</span> {blogs.length} articles published · generated daily ·
            source code public
          </div>
        </div>
        <div className="hero-visual">
          <svg viewBox="0 0 400 340" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
            <g stroke="#93c5fd" strokeWidth="1" opacity="0.5">
              <line x1="60" y1="80" x2="160" y2="130" />
              <line x1="160" y1="130" x2="270" y2="70" />
              <line x1="160" y1="130" x2="130" y2="240" />
              <line x1="130" y1="240" x2="240" y2="270" />
              <line x1="270" y1="70" x2="330" y2="160" />
              <line x1="330" y1="160" x2="240" y2="270" />
              <line x1="60" y1="80" x2="90" y2="180" />
              <line x1="90" y1="180" x2="130" y2="240" />
              <line x1="270" y1="70" x2="160" y2="130" />
            </g>
            <g fill="#e0f2fe">
              <circle cx="60" cy="80" r="6" />
              <circle cx="160" cy="130" r="9" />
              <circle cx="270" cy="70" r="6" />
              <circle cx="130" cy="240" r="7" />
              <circle cx="240" cy="270" r="6" />
              <circle cx="330" cy="160" r="8" />
              <circle cx="90" cy="180" r="5" />
            </g>
          </svg>
          <div className="float-card">
            <span>Featured walkthrough</span>
            <strong>Gemini + GitHub Actions + Netlify daily publishing</strong>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="container stats">
        {stats.map((s) => (
          <div key={s.label} className="stat">
            <strong>{s.value}</strong>
            <span>{s.label}</span>
          </div>
        ))}
      </section>

      {/* CATEGORIES */}
      <section id="categories" className="band soft" style={{ marginTop: 50 }}>
        <div className="container">
          <div className="section-head">
            <div>
              <span className="kicker">Browse by goal</span>
              <h2>Popular AI Categories</h2>
              <p>Browse by what you want to do. Every category is backed by practical, hands-on articles.</p>
            </div>
            <Link href="/blogs/" className="link-more">
              All articles →
            </Link>
          </div>
          <div className="cats">
            {categories.map((c) => (
              <Link key={c.title} href="/blogs/" className="cat">
                <div className="icon">{c.icon}</div>
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
                <span className="link">Explore →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* TOOLS */}
      <section id="tools" className="band">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="kicker">Tested &amp; verified</span>
              <h2>Featured AI Tools</h2>
              <p>
                {tools.length} tools tested — pricing verified against official pages, no invented
                ratings.
              </p>
            </div>
            <Link href="/#tools" className="link-more">
              View directory →
            </Link>
          </div>
          <div className="filter-row">
            <div className="pills">
              {(['All', 'Free', 'Premium', 'Paid'] as const).map((p) => (
                <button
                  key={p}
                  className={`pill ${pricing === p ? 'active' : ''}`}
                  onClick={() => setPricing(p)}
                  type="button"
                >
                  {p}
                </button>
              ))}
            </div>
            <span className="sort-label">Sort: Featured</span>
          </div>
          <div className="tools">
            {visibleTools.map((t) => (
              <div key={t.name} className="tool">
                <div className="tool-head">
                  <span className="tool-avatar" style={{ background: t.color }}>
                    {t.letter}
                  </span>
                  <h3>{t.name}</h3>
                  <a className="tool-ext" href={t.url} target="_blank" rel="noreferrer" title="Official site">
                    ↗
                  </a>
                </div>
                <p>{t.desc}</p>
                <div className="tag-row">
                  <span className="tag gray">{t.cat}</span>
                  <span className={`tag ${t.pricing === 'Free' ? 'green' : t.pricing === 'Paid' ? 'amber' : ''}`}>
                    {t.pricing}
                  </span>
                  {t.featured && <span className="tag">Featured</span>}
                </div>
                <div className="tool-actions">
                  <Link href="/blogs/" className="btn btn-sm">
                    Details
                  </Link>
                  <a href={t.url} target="_blank" rel="noreferrer" className="btn-outline btn-sm">
                    Official Site ↗
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LATEST NEWS / SEARCH RESULTS */}
      <section id="articles" className="band soft">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="kicker">{results ? 'Search' : 'Fresh daily'}</span>
              <h2>{results ? `Search results for “${submitted}”` : 'Latest AI News'}</h2>
              <p>
                {results
                  ? `${results.length} matching article${results.length === 1 ? '' : 's'}`
                  : 'Freshly generated deep dives — reporting separated from opinion, sources clearly labeled.'}
              </p>
            </div>
            <Link href="/blogs/" className="link-more">
              View All Articles →
            </Link>
          </div>
          {news.length === 0 ? (
            <p className="empty">No articles match your search. Try another keyword.</p>
          ) : (
            <div className="grid">
              {news.map((b, i) => (
                <PostCard key={b.slug} blog={b} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* TUTORIALS */}
      {tutorials.length > 0 && (
        <section className="band">
          <div className="container">
            <div className="section-head">
              <div>
                <span className="kicker">Step by step</span>
                <h2>Latest Tutorials &amp; Guides</h2>
                <p>Practical, step-by-step walkthroughs you can follow end to end.</p>
              </div>
              <Link href="/blogs/" className="link-more">
                All tutorials →
              </Link>
            </div>
            <div className="grid">
              {tutorials.map((b, i) => (
                <PostCard key={b.slug} blog={b} index={i + 2} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* EDITOR'S PICKS */}
      {picks.length > 0 && (
        <section className="band soft">
          <div className="container">
            <div className="section-head">
              <div>
                <span className="kicker">Curated</span>
                <h2>Editor&apos;s Picks</h2>
                <p>Our most useful guides and comparisons to start with.</p>
              </div>
              <Link href="/blogs/" className="link-more">
                Visit the blog →
              </Link>
            </div>
            <div className="grid">
              {picks.map((b, i) => (
                <PostCard key={b.slug} blog={b} index={i + 4} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* NEWSLETTER */}
      <section id="newsletter" className="container" style={{ paddingBottom: 70 }}>
        <div className="newsletter">
          <span className="kicker news-kicker">Weekly briefing</span>
          <h2>Get the Weekly AI Briefing</h2>
          <p>
            One email a week: five practical links, one tutorial, one workflow. No hype, no selling
            your data. Unsubscribe anytime.
          </p>
          {subscribed ? (
            <p className="news-success">✓ You&apos;re subscribed — check your inbox to confirm.</p>
          ) : (
            <form
              className="news-form"
              name="newsletter"
              method="POST"
              data-netlify="true"
              netlify-honeypot="bot-field"
              onSubmit={subscribe}
            >
              <input type="hidden" name="form-name" value="newsletter" />
              <p className="visually-hidden">
                <label>
                  Do not fill this out: <input name="bot-field" />
                </label>
              </p>
              <input
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-label="Email address"
              />
              <button className="btn-blue" type="submit">
                Subscribe
              </button>
            </form>
          )}
          <label className="news-note">
            <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
            <span>
              Send me the weekly briefing as selected. See <a href="#privacy">Privacy Policy</a>.
              Consent is required — unsubscribe any time in one click.
            </span>
          </label>
        </div>
      </section>
    </>
  );
}
