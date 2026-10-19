'use client';

import { useState } from 'react';

const comparisonRows = [
  { feature: 'Writing quality', chatgpt: 'Versatile, structured, many tones', claude: 'Natural, nuanced, strong long-form prose' },
  { feature: 'Coding', chatgpt: 'Broad language coverage, quick snippets', claude: 'Strong reasoning on long code and refactors' },
  { feature: 'WordPress development', chatgpt: 'Fast PHP snippets, plugin ideas', claude: 'Long file context for theme/plugin edits' },
  { feature: 'SEO writing', chatgpt: 'Keyword-driven, structured outlines', claude: 'Readable, human-sounding drafts' },
  { feature: 'Image generation', chatgpt: 'Native image creation and editing', claude: 'No native image generation (views images)' },
  { feature: 'Research', chatgpt: 'Built-in web search and browsing', claude: 'Web search with cited sources' },
  { feature: 'Long documents', chatgpt: 'Handles long inputs with limits', claude: 'Large context, excellent long-doc analysis' },
  { feature: 'File analysis', chatgpt: 'PDFs, data, spreadsheet analysis', claude: 'Strong PDF and document analysis' },
  { feature: 'Free plan', chatgpt: 'Free tier available (limits apply)', claude: 'Free tier available (limits apply)' },
];

const taskCards = [
  { icon: '✍️', task: 'Blogging', winner: 'Claude', note: 'Natural, flowing long-form tone; ChatGPT is close and adds more formatting help.' },
  { icon: '🔍', task: 'SEO Writing', winner: 'ChatGPT', note: 'Structured, keyword-focused drafts; Claude polishes readability well.' },
  { icon: '🌐', task: 'Website Development', winner: 'Both', note: 'Quick snippets from ChatGPT, careful long-file edits from Claude.' },
  { icon: '💻', task: 'Coding', winner: 'Both', note: 'ChatGPT for breadth and speed, Claude for deep reasoning on big changes.' },
  { icon: '📄', task: 'Long-Document Analysis', winner: 'Claude', note: 'Large context window shines on contracts, papers and reports.' },
  { icon: '🎨', task: 'Image Creation', winner: 'ChatGPT', note: 'Native image generation — Claude cannot create images.' },
  { icon: '⚡', task: 'Daily Productivity', winner: 'ChatGPT', note: 'All-in-one app with voice, search and integrations.' },
];

const faqs = [
  {
    q: 'Is ChatGPT better than Claude?',
    a: 'Neither is universally better. ChatGPT is the stronger all-in-one (images, voice, search, integrations), while Claude is often preferred for natural writing quality and long-document work. The best choice depends on your task — try both on your own workload.',
  },
  {
    q: 'Which is better for coding?',
    a: 'Both are strong coders. ChatGPT is excellent for quick answers, many languages and debugging help. Claude is praised for reasoning through large codebases, careful refactors and long files. Run the same task through both and compare the output quality yourself.',
  },
  {
    q: 'Which is better for SEO writing?',
    a: 'ChatGPT handles keyword-driven structures and briefs very well. Claude often produces more natural, human-sounding drafts. Many creators outline with ChatGPT and polish with Claude — both approaches work.',
  },
  {
    q: 'Can ChatGPT generate images?',
    a: 'Yes. ChatGPT can create and edit images natively inside the chat. Claude can view and analyze images you share, but it does not generate images.',
  },
  {
    q: 'Does Claude have a free plan?',
    a: 'Yes, Claude offers a free web plan with usage limits. Paid plans add higher limits and extra features. Plans and limits change often — check the official pricing pages for current details.',
  },
  {
    q: 'Which is better for WordPress development?',
    a: 'Both can write PHP, generate templates and suggest plugin code. ChatGPT is handy for quick snippets and documentation; Claude is great for editing longer theme or plugin files in one go. Always review generated code before deploying.',
  },
];

const questions = [
  {
    q: 'What is your primary task?',
    options: [
      { label: 'Blogging, writing or SEO', w: { chatgpt: 1, claude: 2 } },
      { label: 'Coding or website development', w: { chatgpt: 1, claude: 2 } },
      { label: 'Research and long documents', w: { chatgpt: 1, claude: 2 } },
      { label: 'Image creation', w: { chatgpt: 3, claude: 0 } },
      { label: 'Daily productivity and all-in-one help', w: { chatgpt: 2, claude: 1 } },
    ],
  },
  {
    q: 'What is your budget?',
    options: [
      { label: 'Free only', w: { chatgpt: 1, claude: 1 } },
      { label: 'Paid plan is fine', w: { chatgpt: 1, claude: 1 } },
    ],
  },
  {
    q: 'What do you value most?',
    options: [
      { label: 'Natural, human-sounding writing', w: { chatgpt: 0, claude: 3 } },
      { label: 'Bundled tools — images, voice, search', w: { chatgpt: 3, claude: 0 } },
      { label: 'Long context and careful reasoning', w: { chatgpt: 1, claude: 3 } },
    ],
  },
];

export default function ComparisonPage() {
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState({ chatgpt: 0, claude: 0 });
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const answered = step >= questions.length;

  function pick(w: { chatgpt: number; claude: number }) {
    setScores((s) => ({ chatgpt: s.chatgpt + w.chatgpt, claude: s.claude + w.claude }));
    setStep((st) => st + 1);
  }

  function resetQuiz() {
    setScores({ chatgpt: 0, claude: 0 });
    setStep(0);
  }

  const diff = Math.abs(scores.chatgpt - scores.claude);
  const result = diff <= 1 ? 'both' : scores.chatgpt > scores.claude ? 'chatgpt' : 'claude';

  return (
    <div className="cx-page">
      {/* HERO */}
      <section className="cx-hero container">
        <span className="kicker">Complete AI comparison 2026</span>
        <h1>
          ChatGPT vs Claude: Which AI Is <em>Better in 2026?</em>
        </h1>
        <p>
          Compare ChatGPT and Claude for coding, blogging, SEO, research, image generation, and
          productivity — side by side, no hype.
        </p>
        <div className="cx-hero-actions">
          <a className="btn-blue" href="https://chatgpt.com/" target="_blank" rel="noreferrer">
            Explore ChatGPT ↗
          </a>
          <a className="btn" href="https://claude.ai/" target="_blank" rel="noreferrer">
            Explore Claude ↗
          </a>
        </div>
        <div className="cx-hero-vs">
          <span className="cx-vs-badge cx-gpt">GPT</span>
          <span className="cx-vs-mark">vs</span>
          <span className="cx-vs-badge cx-claude">CL</span>
        </div>
      </section>

      {/* QUICK COMPARISON */}
      <section className="cx-section cx-band-soft">
        <div className="container">
          <div className="cx-head">
            <span className="kicker">Quick comparison</span>
            <h2>ChatGPT vs Claude at a Glance</h2>
          </div>
          <div className="cx-table-wrap">
            <table className="cx-table">
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>ChatGPT</th>
                  <th>Claude</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((r) => (
                  <tr key={r.feature}>
                    <td className="cx-feat">{r.feature}</td>
                    <td>{r.chatgpt}</td>
                    <td>{r.claude}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FEATURE CARDS */}
      <section className="cx-section">
        <div className="container">
          <div className="cx-head">
            <span className="kicker">Feature cards</span>
            <h2>ChatGPT vs Claude Feature Cards</h2>
          </div>
          <div className="cx-duo">
            <article className="cx-card cx-card-gpt">
              <div className="cx-card-top">
                <span className="cx-logo cx-logo-gpt">G</span>
                <div>
                  <h3>ChatGPT</h3>
                  <span className="cx-by">by OpenAI</span>
                </div>
              </div>
              <div className="cx-block">
                <h4>Key features</h4>
                <ul>
                  <li>Multimodal chat with text, voice and images</li>
                  <li>Native image generation and editing</li>
                  <li>Web search, browsing and file analysis</li>
                  <li>Custom assistants and integrations</li>
                </ul>
              </div>
              <div className="cx-block">
                <h4>Advantages</h4>
                <ul className="cx-good">
                  <li>All-in-one tool for almost every task</li>
                  <li>Strong free tier, huge ecosystem</li>
                  <li>Best-in-class image generation</li>
                </ul>
              </div>
              <div className="cx-block">
                <h4>Limitations</h4>
                <ul className="cx-bad">
                  <li>Writing can feel generic without prompting</li>
                  <li>Advanced features need paid plans</li>
                </ul>
              </div>
              <div className="cx-card-actions">
                <a className="btn btn-sm" href="https://chatgpt.com/" target="_blank" rel="noreferrer">Official Site ↗</a>
                <a className="btn-outline btn-sm" href="https://chatgpt.com/pricing/" target="_blank" rel="noreferrer">Pricing ↗</a>
              </div>
            </article>

            <article className="cx-card cx-card-claude">
              <div className="cx-card-top">
                <span className="cx-logo cx-logo-claude">C</span>
                <div>
                  <h3>Claude</h3>
                  <span className="cx-by">by Anthropic</span>
                </div>
              </div>
              <div className="cx-block">
                <h4>Key features</h4>
                <ul>
                  <li>Natural, nuanced long-form writing</li>
                  <li>Very strong long-document analysis</li>
                  <li>Careful coding with large file context</li>
                  <li>Web search with cited sources, file uploads</li>
                </ul>
              </div>
              <div className="cx-block">
                <h4>Advantages</h4>
                <ul className="cx-good">
                  <li>Reads and writes in a human tone</li>
                  <li>Excellent on contracts, papers, reports</li>
                  <li>Precise refactors on long code</li>
                </ul>
              </div>
              <div className="cx-block">
                <h4>Limitations</h4>
                <ul className="cx-bad">
                  <li>No native image generation</li>
                  <li>Smaller app ecosystem than ChatGPT</li>
                </ul>
              </div>
              <div className="cx-card-actions">
                <a className="btn btn-sm" href="https://claude.ai/" target="_blank" rel="noreferrer">Official Site ↗</a>
                <a className="btn-outline btn-sm" href="https://claude.com/pricing" target="_blank" rel="noreferrer">Pricing ↗</a>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* BEST AI FOR TASKS */}
      <section className="cx-section cx-band-soft">
        <div className="container">
          <div className="cx-head">
            <span className="kicker">Task by task</span>
            <h2>Best AI for Different Tasks</h2>
          </div>
          <div className="cx-tasks">
            {taskCards.map((t) => (
              <div className="cx-task" key={t.task}>
                <div className="cx-task-head">
                  <span className="cx-task-icon">{t.icon}</span>
                  <h3>{t.task}</h3>
                  <span className={`cx-winner ${t.winner === 'ChatGPT' ? 'gpt' : t.winner === 'Claude' ? 'claude' : 'both'}`}>
                    {t.winner}
                  </span>
                </div>
                <p>{t.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FREE VS PAID */}
      <section className="cx-section">
        <div className="container">
          <div className="cx-head">
            <span className="kicker">Plans</span>
            <h2>Free vs Paid Plans</h2>
          </div>
          <div className="cx-duo">
            <div className="cx-plan">
              <h3>Free plans</h3>
              <p>
                Both ChatGPT and Claude offer free access to their core chat experience. Free tiers
                are great for trying quality and speed, but they come with usage limits, occasional
                capacity queues and access to standard models only.
              </p>
              <ul className="cx-good">
                <li>Core chat at no cost</li>
                <li>Good for light daily use</li>
                <li>Enough to compare both tools fairly</li>
              </ul>
              <div className="cx-card-actions">
                <a className="btn-outline btn-sm" href="https://chatgpt.com/pricing/" target="_blank" rel="noreferrer">ChatGPT Pricing ↗</a>
                <a className="btn-outline btn-sm" href="https://claude.com/pricing" target="_blank" rel="noreferrer">Claude Pricing ↗</a>
              </div>
            </div>
            <div className="cx-plan cx-plan-pro">
              <h3>Paid plans</h3>
              <p>
                Paid subscriptions raise usage limits, unlock the most capable models and add extras
                like deeper research modes, larger file support and priority access during busy
                times. Prices and limits change often — always check the official pages below.
              </p>
              <ul className="cx-good">
                <li>Higher limits and advanced models</li>
                <li>Priority access when demand is high</li>
                <li>Extra tools for heavy daily work</li>
              </ul>
              <div className="cx-card-actions">
                <a className="btn-blue btn-sm" href="https://chatgpt.com/pricing/" target="_blank" rel="noreferrer">ChatGPT Pricing ↗</a>
                <a className="btn-blue btn-sm" href="https://claude.com/pricing" target="_blank" rel="noreferrer">Claude Pricing ↗</a>
              </div>
            </div>
          </div>
          <p className="cx-note">
            Note: we do not list prices or usage numbers here — they change frequently. Use the
            official pricing links above for current details.
          </p>
        </div>
      </section>

      {/* QUIZ */}
      <section className="cx-section cx-band-soft" id="quiz">
        <div className="container cx-quiz-wrap">
          <div className="cx-head cx-head-center">
            <span className="kicker">Interactive</span>
            <h2>Which AI Is Right for You?</h2>
            <p>Answer three quick questions and get a recommendation instantly.</p>
          </div>

          <div className="cx-quiz">
            {!answered ? (
              <>
                <div className="cx-quiz-progress">
                  <span>Question {step + 1} of {questions.length}</span>
                  <div className="cx-bar">
                    <i style={{ width: `${(step / questions.length) * 100}%` }} />
                  </div>
                </div>
                <h3 className="cx-quiz-q">{questions[step].q}</h3>
                <div className="cx-quiz-opts">
                  {questions[step].options.map((o) => (
                    <button key={o.label} className="cx-opt" type="button" onClick={() => pick(o.w)}>
                      {o.label}
                    </button>
                  ))}
                </div>
                {step > 0 && (
                  <button className="cx-quiz-back" type="button" onClick={() => setStep((s) => s - 1)}>
                    ← Back
                  </button>
                )}
              </>
            ) : (
              <div className="cx-result">
                <span className="cx-result-label">Your recommendation</span>
                <h3>
                  {result === 'both' ? (
                    <>Use <em className="cx-gpt-t">ChatGPT</em> and <em className="cx-claude-t">Claude</em> together</>
                  ) : result === 'chatgpt' ? (
                    <><em className="cx-gpt-t">ChatGPT</em> fits you best</>
                  ) : (
                    <><em className="cx-claude-t">Claude</em> fits you best</>
                  )}
                </h3>
                <p>
                  {result === 'both'
                    ? 'Your answers are balanced — many people outline with one and polish with the other. Start free on both and keep the one that matches your workflow.'
                    : result === 'chatgpt'
                      ? 'Your tasks lean toward an all-in-one tool with bundled features like image generation and search.'
                      : 'Your tasks lean toward writing quality, careful reasoning and long-document work.'}
                </p>
                <div className="cx-hero-actions">
                  <a className="btn-blue" href="https://chatgpt.com/" target="_blank" rel="noreferrer">Try ChatGPT ↗</a>
                  <a className="btn" href="https://claude.ai/" target="_blank" rel="noreferrer">Try Claude ↗</a>
                </div>
                <button className="cx-quiz-restart" type="button" onClick={resetQuiz}>↺ Retake quiz</button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* PROS AND CONS */}
      <section className="cx-section">
        <div className="container">
          <div className="cx-head">
            <span className="kicker">Balanced view</span>
            <h2>Pros and Cons</h2>
          </div>
          <div className="cx-duo">
            <article className="cx-card">
              <div className="cx-card-top">
                <span className="cx-logo cx-logo-gpt">G</span>
                <h3>ChatGPT — Pros &amp; Cons</h3>
              </div>
              <div className="cx-pc">
                <div>
                  <h4 className="cx-good-h">Pros</h4>
                  <ul className="cx-good">
                    <li>True all-in-one: text, images, voice, search</li>
                    <li>Capable free tier to start instantly</li>
                    <li>Huge ecosystem, integrations and community</li>
                    <li>Fast at coding snippets and explanations</li>
                  </ul>
                </div>
                <div>
                  <h4 className="cx-bad-h">Cons</h4>
                  <ul className="cx-bad">
                    <li>Output can feel generic without guidance</li>
                    <li>Best models and features are paid</li>
                    <li>Interface changes frequently</li>
                  </ul>
                </div>
              </div>
            </article>

            <article className="cx-card">
              <div className="cx-card-top">
                <span className="cx-logo cx-logo-claude">C</span>
                <h3>Claude — Pros &amp; Cons</h3>
              </div>
              <div className="cx-pc">
                <div>
                  <h4 className="cx-good-h">Pros</h4>
                  <ul className="cx-good">
                    <li>Excellent long-form, natural writing</li>
                    <li>Strong on long documents and code files</li>
                    <li>Careful, thoughtful reasoning style</li>
                    <li>Web search with useful citations</li>
                  </ul>
                </div>
                <div>
                  <h4 className="cx-bad-h">Cons</h4>
                  <ul className="cx-bad">
                    <li>No native image generation</li>
                    <li>Free tier has usage limits</li>
                    <li>Smaller ecosystem than ChatGPT</li>
                  </ul>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="cx-section cx-band-soft">
        <div className="container cx-faq-wrap">
          <div className="cx-head cx-head-center">
            <span className="kicker">FAQ</span>
            <h2>Frequently Asked Questions</h2>
          </div>
          <div className="cx-faq">
            {faqs.map((f, i) => (
              <div className={`cx-faq-item ${openFaq === i ? 'open' : ''}`} key={f.q}>
                <button
                  className="cx-faq-q"
                  type="button"
                  aria-expanded={openFaq === i}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span>{f.q}</span>
                  <i className="cx-faq-ico">{openFaq === i ? '−' : '+'}</i>
                </button>
                <div className="cx-faq-a">
                  <p>{f.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="cx-cta container">
        <div className="cx-cta-inner">
          <span className="kicker news-kicker">Get started</span>
          <h2>Find the Right AI for Your Workflow.</h2>
          <p>Both have free tiers — test them on your real tasks this week and keep the winner.</p>
          <div className="cx-hero-actions">
            <a className="btn-blue" href="https://chatgpt.com/" target="_blank" rel="noreferrer">Open ChatGPT ↗</a>
            <a className="btn" href="https://claude.ai/" target="_blank" rel="noreferrer">Open Claude ↗</a>
          </div>
        </div>
      </section>
    </div>
  );
}
