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
  { n: '01', title: 'Gemini Article Generate Karta Hai', desc: 'Roz scheduled job ek AI topic pick karta hai aur 1200+ word SEO-optimized markdown article banata hai.' },
  { n: '02', title: 'GitHub Auto-Commit Karta Hai', desc: 'GitHub Actions naya blog repo me commit kar deta hai — koi manual upload nahi.' },
  { n: '03', title: 'Netlify Live Kar Deta Hai', desc: 'Push hote hi Netlify build karke site CDN par deploy kar deta hai — few seconds me.' },
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
          LLMs, agents, generative tools aur automation workflows par practical articles —
          Google Gemini se auto-generated, Netlify par auto-deployed.
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
          <p className="empty">Abhi koi article nahi. Pehla blog generate karne ke liye run: npm run generate:blog</p>
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
            <p>Har article Google Gemini API se SEO-optimized markdown me auto-generate hota hai.</p>
          </div>
          <div className="feature">
            <div className="icon">⏰</div>
            <h3>Scheduled Uploads</h3>
            <p>GitHub Actions roz schedule par naya blog repo me commit karti hai — zero manual kaam.</p>
          </div>
          <div className="feature">
            <div className="icon">🚀</div>
            <h3>Netlify Deploy</h3>
            <p>Push hote hi Netlify build karke site free CDN par live kar deta hai.</p>
          </div>
        </div>
      </section>

      <section className="container cta">
        <h2>Naye AI Articles Roz Automatic</h2>
        <p>Har din ek naya AI topic — bina kisi manual effort ke seedha aapke saamne.</p>
        <div>
          <Link href="/blogs/" className="btn">
            Explore All Blogs
          </Link>
        </div>
      </section>
    </>
  );
}
