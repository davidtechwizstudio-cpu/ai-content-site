import Link from 'next/link';
import { getAllBlogs } from '@/lib/blogs';

const categories = [
  { icon: '🧠', title: 'LLMs & Prompting', desc: 'ChatGPT, Gemini, Claude — prompt techniques aur model comparisons.' },
  { icon: '🤖', title: 'AI Agents & Automation', desc: 'Autonomous agents, workflows aur business automation recipes.' },
  { icon: '🎨', title: 'Generative AI', desc: 'Text, image, video aur music generation tools aur techniques.' },
  { icon: '⚙️', title: 'Machine Learning', desc: 'ML fundamentals, RAG, fine-tuning aur model deployment.' },
  { icon: '🛠️', title: 'AI Tools & Coding', desc: 'Copilots, no-code AI builders aur developer ke liye best tools.' },
  { icon: '⚖️', title: 'AI Ethics & News', desc: 'Bias, privacy, regulation aur industry ke latest developments.' },
];

const tools = [
  { name: 'ChatGPT', tag: 'OpenAI', desc: 'Writing, research aur daily tasks ke liye sabse popular AI assistant.', hue: '#10a37f' },
  { name: 'Gemini', tag: 'Google', desc: 'Long context aur Google ecosystem integration wala multimodal model.', hue: '#4285f4' },
  { name: 'Claude', tag: 'Anthropic', desc: 'Long documents, coding aur careful reasoning ke liye trusted AI.', hue: '#d97757' },
  { name: 'Midjourney', tag: 'Image', desc: 'High-quality artistic images generate karne ka gold standard.', hue: '#8b5cf6' },
  { name: 'GitHub Copilot', tag: 'Coding', desc: 'Editor me hi code completion aur AI pair-programming.', hue: '#f59e0b' },
  { name: 'Stable Diffusion', tag: 'Open Source', desc: 'Free, self-hosted image generation — full control ke saath.', hue: '#ec4899' },
];

const steps = [
  { n: '01', title: 'Gemini Generates the Article', desc: 'A scheduled job picks an AI topic and writes a 1200+ word SEO-optimized markdown article every day.' },
  { n: '02', title: 'GitHub Auto-Commits', desc: 'GitHub Actions commits the new blog straight to the repository — no manual uploads at all.' },
  { n: '03', title: 'Netlify Publishes It', desc: 'On every push, Netlify builds the site and deploys it to the global CDN — live in seconds.' },
];

export default function Home() {
  const allBlogs = getAllBlogs();
  const blogs = allBlogs.slice(0, 6);

  const stats = [
    { value: `${allBlogs.length}+`, label: 'AI Articles' },
    { value: '30', label: 'Topics in Queue' },
    { value: 'Daily', label: 'Auto Uploads' },
    { value: '100%', label: 'AI Generated' },
  ];

  return (
    <>
      <section className="hero container">
        <div className="eyebrow">🤖 100% AI-Powered Content Hub</div>
        <h1>
          Your Daily Dose of <em>AI Knowledge</em>
        </h1>
        <p>
          Practical articles on LLMs, agents, generative tools and automation workflows —
          auto-generated with Google Gemini and auto-deployed on Netlify.
        </p>
        <div>
          <Link href="/blogs/" className="btn">
            Browse Blogs
          </Link>
          <a href="#workflow" className="btn ghost">
            How it Works
          </a>
        </div>
      </section>

      <section className="container stats">
        {stats.map((s) => (
          <div key={s.label} className="stat">
            <strong>{s.value}</strong>
            <span>{s.label}</span>
          </div>
        ))}
      </section>

      <section className="section container">
        <h2 className="section-title">Explore AI Categories</h2>
        <div className="cats">
          {categories.map((c) => (
            <Link key={c.title} href="/blogs/" className="cat">
              <div className="icon">{c.icon}</div>
              <h3>{c.title}</h3>
              <p>{c.desc}</p>
              <span className="link">Read articles →</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="section container">
        <h2 className="section-title">Latest Articles</h2>
        {blogs.length === 0 ? (
          <p className="empty">No articles yet. Generate the first blog by running: npm run generate:blog</p>
        ) : (
          <div className="grid">
            {blogs.map((b) => (
              <Link key={b.slug} href={`/blogs/${b.slug}/`} className="card">
                <h2>{b.title}</h2>
                <p>{b.description}</p>
                <div className="meta">
                  <span>{b.date}</span>
                  <span>{b.tags.slice(0, 2).map((t) => `#${t}`).join(' ')}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
        {allBlogs.length > 6 && (
          <div style={{ marginTop: 26, textAlign: 'center' }}>
            <Link href="/blogs/" className="btn ghost">
              View all {allBlogs.length} articles
            </Link>
          </div>
        )}
      </section>

      <section className="section container">
        <h2 className="section-title">Popular AI Tools We Cover</h2>
        <div className="tools">
          {tools.map((t) => (
            <div key={t.name} className="tool" style={{ '--hue': t.hue } as React.CSSProperties}>
              <div className="tool-head">
                <span className="tool-dot" />
                <h3>{t.name}</h3>
                <span className="tool-tag">{t.tag}</span>
              </div>
              <p>{t.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="workflow" className="section container">
        <h2 className="section-title">How Content Reaches You — Fully Automated</h2>
        <div className="steps">
          {steps.map((s) => (
            <div key={s.n} className="step">
              <span className="step-num">{s.n}</span>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
        <div className="features" style={{ paddingTop: 26 }}>
          <div className="feature">
            <div className="icon">🤖</div>
            <h3>AI Generated</h3>
            <p>Every article is auto-generated as SEO-optimized markdown using the Google Gemini API.</p>
          </div>
          <div className="feature">
            <div className="icon">⏰</div>
            <h3>Scheduled Uploads</h3>
            <p>A GitHub Actions cron job commits a fresh blog every day — zero manual work.</p>
          </div>
          <div className="feature">
            <div className="icon">🚀</div>
            <h3>Netlify Deploy</h3>
            <p>Every push triggers a Netlify build and puts the site live on the free global CDN.</p>
          </div>
        </div>
      </section>

      <section className="container cta">
        <h2>Fresh AI Articles, Every Single Day</h2>
        <p>A brand new AI topic every day — published automatically, no manual effort required.</p>
        <div>
          <Link href="/blogs/" className="btn">
            Explore All Blogs
          </Link>
        </div>
      </section>
    </>
  );
}
