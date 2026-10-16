# AI Insights — AI Content Website (Next.js + Gemini + Netlify)

AI articles wali website jisme blogs **Google Gemini API** se automatically generate hote hain aur **Netlify** par auto-deploy hote hain.

## Stack

- **Next.js 15** (App Router, static export)
- **Gemini API** — AI blog generation
- **GitHub Actions** — daily scheduled auto-upload
- **Netlify** — free hosting + auto-deploy on push

## Setup (ek baar)

### 1. Install & Run locally

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # static build → out/
```

### 2. Ek blog manually generate karein (optional)

```bash
set GEMINI_API_KEY=your_key_here
npm run generate:blog
```

### 3. GitHub par auto-blogs chalane ke liye

1. Repo push karein
2. Repo → **Settings → Secrets and variables → Actions** → New secret:
   - Name: `GEMINI_API_KEY`
   - Value: aapki Gemini API key
3. `.github/workflows/generate-blogs.yml` roz **09:00 UTC** par chalta hai — naya blog commit + push karta hai

Manual trigger: Repo → Actions → **Generate AI Blog** → **Run workflow**

### 4. Netlify par deploy

**Tarika A — Netlify UI (recommended):**
1. [app.netlify.com](https://app.netlify.com) → **Add new site → Import an existing project**
2. GitHub repo select karein
3. Build command: `npm run build`, Publish directory: `out` (netlify.toml se auto-fill ho jayega)
4. **Deploy** — push par auto re-deploy hoga

**Tarika B — Netlify CLI:**

```bash
npm install -g netlify-cli
netlify login
netlify init
netlify deploy --prod
```

## Daily Workflow (automatic)

```
Har roz 09:00 UTC
   → GitHub Actions chalta hai
   → scripts/generate-blog.mjs Gemini API se article banata hai
   → content/blogs/ me markdown commit hota hai
   → Netlify ko push milta hai
   → build + deploy → site live ✅
```

## Naye Topics Kaise Add Karein

`content/topics.txt` me ek line per topic add karein — script harr run me pehla unpublished topic pick karta hai. 30 topics already included hain (~1 month chalega).

## Files

| File | Kaam |
|------|------|
| `scripts/generate-blog.mjs` | Gemini se article generate karke markdown likhta hai |
| `.github/workflows/generate-blogs.yml` | Roz scheduled auto-upload |
| `content/topics.txt` | Topic queue |
| `content/blogs/` | Generated markdown articles |
| `netlify.toml` | Netlify build config |
