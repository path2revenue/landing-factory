# 🚀 SOP — Landing Page Factory

> **Standard Operating Procedure** for creating production-ready, high-converting landing pages using the Landing Page Factory system + UI/UX Pro Max design intelligence.

---

## Table of Contents

1. [Phase 0 — Discovery & Content Gathering](#phase-0--discovery--content-gathering)
2. [Phase 1 — Design Intelligence (UI/UX Pro Max)](#phase-1--design-intelligence)
3. [Phase 2 — Config & Build](#phase-2--config--build)
4. [Phase 3 — Quality Checklist](#phase-3--quality-checklist)
5. [Phase 4 — Deploy](#phase-4--deploy)
6. [Appendix A — Design Framework Reference](#appendix-a--design-framework-reference)
7. [Appendix B — Anti-Patterns](#appendix-b--anti-patterns)

---

## Phase 0 — Discovery & Content Gathering

Before writing a single line of config, gather ALL of the following. Nothing should be left blank or placeholder.

### 0.1 ICP (Ideal Client Profile)

| Field | Description | Example |
|-------|-------------|---------|
| **Avatar** | Who is the target buyer? | "Entrepreneur musulman, 25-45 ans, France" |
| **Pain points** (3-5) | What keeps them up at night? | "CA imprévisible, pas de système d'acquisition" |
| **Desires** (3-5) | What do they dream of? | "Flux de clients prévisible, liberté financière" |
| **Objections** (3-5) | Why would they NOT buy? | "Trop cher, j'ai déjà essayé, ça ne marcherait pas pour moi" |
| **Level of awareness** | Unaware / Problem / Solution / Product / Most | "Problem aware" |
| **Language** | Language of the page | "fr" |

### 0.2 Offer Details

| Field | Description | Example |
|-------|-------------|---------|
| **Name** | Product/service name | "StarsBridgeSystem" |
| **Tagline** | One-line value proposition | "Systèmes d'acquisition éthiques" |
| **Deliverables** | What they get (3-7 items) | "Publicité, funnels, VSL, CRM, closing" |
| **Price** | Price or "Sur devis" | "Sur devis" |
| **Guarantee** | Risk reversal | "Appel 100% gratuit, zéro engagement" |
| **Urgency** | FOMO element (optional) | "Places limitées" |
| **CTA primary** | Main call to action text | "Réserver Mon Appel avec un Expert" |
| **CTA secondary** | Alternative CTA text | "Échanger sur WhatsApp" |

### 0.3 Brand Assets

| Asset | Format | Notes |
|-------|--------|-------|
| **Logo** | SVG, PNG, or emoji | Can be text-only or emoji (e.g. ⚡) |
| **Favicon** | SVG/ICO/PNG | 32x32 minimum |
| **Brand name** | String | Short, punchy |
| **Colors** | See Phase 1 | Choose from presets or custom |

### 0.4 Content Assets

| Asset | Required? | Format |
|-------|-----------|--------|
| **VSL / Video** | ✅ Highly recommended | YouTube/Vimeo embed URL |
| **Testimonials** (3-7) | ✅ Required | `{ stars, quote, name, role }` |
| **Video testimonials** (2-4) | Optional | YouTube embed URLs |
| **Case studies / Results** (3-6) | ✅ Required | `{ metric, label, description }` |
| **Stats** (3-4) | ✅ Required | `{ value, suffix, label }` |
| **FAQ** (5-8) | ✅ Required | `{ question, answer }` |
| **Process steps** (3-5) | ✅ Required | `{ number, title, description }` |
| **Service list** (5-8) | ✅ Required | `{ icon, title, description }` |
| **Social proof** | Optional | Client logos, badges, press mentions |

### 0.5 Technical Assets

| Asset | Example |
|-------|---------|
| **Booking URL** | GHL widget URL / Calendly link |
| **WhatsApp link** | `https://wa.me/33xxxxxxxxx?text=...` |
| **Social links** | LinkedIn, Instagram, YouTube URLs |
| **Tracking** | GA4 ID, Facebook Pixel ID (optional) |
| **Domain** | Custom domain or Vercel subdomain |

---

## Phase 1 — Design Intelligence

Use the **UI/UX Pro Max** skill to generate data-driven design recommendations.

### Step 1: Search for Inspiration

```bash
# Search by industry/product type
python .agent/skills/ui-ux-pro-max/scripts/search.py "SaaS landing page conversion" --domain product -n 5

# Search for style recommendations
python .agent/skills/ui-ux-pro-max/scripts/search.py "dark mode premium" --domain style -n 5

# Search for color palettes
python .agent/skills/ui-ux-pro-max/scripts/search.py "trust professional blue" --domain color -n 5

# Search for font pairings
python .agent/skills/ui-ux-pro-max/scripts/search.py "modern tech clean" --domain typography -n 5
```

### Step 2: Generate Full Design System

```bash
python .agent/skills/ui-ux-pro-max/scripts/search.py "coaching entrepreneur acquisition" --design-system -p "MonProjet"
```

### Step 3: Choose from 6 Pre-Built Palettes

| Palette | Mood | Use For |
|---------|------|---------|
| `trust` | Reliable, secure | Finance, Healthcare, Enterprise |
| `vibrant` | Innovative, energetic | Tech Startups, Creative Tools |
| `luxury` | Sophisticated, exclusive | High-end Products, Fashion |
| `healthcare` | Calm, trustworthy | Medical, Fitness, Wellness |
| `creative` | Fun, approachable | Consumer Apps, Entertainment |
| `dark` | Developer-centric, minimal | Dev Tools, SaaS, Tech |

### Step 4: Choose Style

| Style | Keywords | Best For |
|-------|----------|----------|
| `linear` | Dark mode, subtle borders, high contrast | SaaS, Dev tools |
| `glassmorphism` | Frosted glass, transparent layers, depth | Modern apps, dashboards |
| `aurora` | Vibrant gradients, Northern Lights, luminous | Creative landing pages |
| `bento` | Modular, organized, information-dense | Feature showcases |
| `minimal` | Max white space, serif typography, subtle | Luxury, editorial |

### Step 5: Choose Font Pairing

| Genre | Heading | Body | Use For |
|-------|---------|------|---------|
| Modern/Tech | Inter | Inter/Roboto | SaaS, Developer tools |
| Elegant/Luxury | Playfair Display | Montserrat | Fashion, Premium |
| Friendly/Consumer | Poppins | Open Sans | E-commerce, Apps |
| Brutalist/Bold | Space Grotesk | JetBrains Mono | Creative agencies |
| Editorial | Merriweather | Source Sans Pro | Blogs, Content |

---

## Phase 2 — Config & Build

### Step 1: Create New Project

```bash
# Option A: Copy factory template
xcopy /E /I /Y "c:\Workflows\LandingPages\landing-factory" "c:\Workflows\LandingPages\<project-name>"

# Option B: Or use the workflow
# Follow .agent/workflows/deploy-landing.md
```

### Step 2: Edit `site.config.js`

Open `site.config.js` and fill out every section using the data gathered in Phase 0. Key sections:

```
meta       → SEO metadata (title, description, keywords, OG tags)
design     → palette, fonts, style choice from Phase 1
links      → booking URL, WhatsApp, socials
navbar     → logo, navigation links, CTA button
hero       → headline, subheadline, VSL URL, statistics, CTAs
painPoints → 3 problem cards
results    → 3-6 case study metrics
services   → 5-8 feature cards
process    → 3-5 steps
testimonials → 3-7 quote cards
faq        → 5-8 Q&A pairs
merci      → thank you page content + gift CTA
sections   → array controlling which sections appear and in what order
```

### Step 3: Preview

```bash
cd <project-name>
npm install
npm run dev
# Open http://localhost:3000
```

### Step 4: Iterate

- Review every section visually
- Check mobile view (375px)
- Verify all links work
- Confirm booking embed loads
- Test `/merci` page

---

## Phase 3 — Quality Checklist

Run through this checklist BEFORE deploying.

### Design Quality ✅

- [ ] All text is readable (contrast ratio ≥ 4.5:1)
- [ ] No placeholder text ("Lorem ipsum", "Example")
- [ ] Consistent spacing (8px grid system)
- [ ] Max 2 font families used
- [ ] Max 3 primary colors
- [ ] All images are optimized (WebP preferred)
- [ ] Gradient text is readable over background
- [ ] Cards have consistent border-radius

### Interaction Quality ✅

- [ ] All buttons have hover states
- [ ] All interactive elements have focus indicators
- [ ] Scroll animations trigger correctly
- [ ] No animation blocks user interaction
- [ ] No animation > 500ms for interactions
- [ ] `prefers-reduced-motion` is respected

### Mobile Quality ✅

- [ ] Tap targets ≥ 44x44px
- [ ] No horizontal scrolling
- [ ] Text is readable without zooming
- [ ] Navigation works on mobile
- [ ] Booking embed is responsive
- [ ] Video embeds scale correctly

### SEO Quality ✅

- [ ] Title tag is unique and descriptive (50-60 chars)
- [ ] Meta description is compelling (150-160 chars)
- [ ] Single `<h1>` per page
- [ ] Proper heading hierarchy (h1 → h2 → h3)
- [ ] OpenGraph tags present
- [ ] `lang` attribute set on `<html>`

### Performance Quality ✅

- [ ] `npm run build` succeeds with 0 errors
- [ ] No render-blocking resources
- [ ] Images use lazy loading
- [ ] Google Fonts use `display=swap`
- [ ] No unnecessary JS bundles

### Conversion Quality ✅

- [ ] CTA is visible above the fold
- [ ] CTA text is action-oriented (not "Click here")
- [ ] Trust signals present (stats, badges, testimonials)
- [ ] Booking section is easy to find
- [ ] WhatsApp alternative CTA is present
- [ ] `/merci` page has upsell/gift CTA

---

## Phase 4 — Deploy

### Step 1: Build Verification

```bash
npm run build
```

### Step 2: Git & GitHub

```bash
git init
git add .
git commit -m "Initial commit: <project-name> landing page"
# Create GitHub repo via MCP or manually
git remote add origin https://github.com/<org>/<project-name>.git
git push -u origin main
```

### Step 3: Vercel Deployment

```bash
npx vercel --yes
npx vercel git connect https://github.com/<org>/<project-name> --yes
```

### Step 4: Custom Domain (Optional)

1. Go to Vercel Dashboard → Project → Settings → Domains
2. Add custom domain
3. Update DNS (CNAME or A record)

### Step 5: Post-Deploy Verification

- [ ] Production URL loads correctly
- [ ] All sections render
- [ ] Booking embed works
- [ ] WhatsApp link opens correctly
- [ ] `/merci` page works
- [ ] Mobile works
- [ ] OG tags render (test with opengraph.xyz)

---

## Appendix A — Design Framework Reference

### The 5 Design Dimensions

1. **PATTERN & LAYOUT** (The Skeleton) — Product-specific page structure
2. **STYLE & AESTHETIC** (The Skin) — Glassmorphism, Aurora, Linear, etc.
3. **COLOR & THEME** (The Palette) — 6 pre-built palettes + custom
4. **TYPOGRAPHY** (The Voice) — 5 strategic font pairings
5. **ANIMATIONS & INTERACTIONS** (The Soul) — Micro-interactions, scroll reveals, parallax

### Animation Inventory

| Animation | Duration | Use |
|-----------|----------|-----|
| `fadeInUp` | 600ms | Section reveal on scroll |
| `gradientShift` | 6s infinite | Gradient text headlines |
| `pulseGlow` | 3s infinite | Primary CTA glow |
| `meshMove` | 20s infinite | Background mesh gradient |
| `marquee` | 30s infinite | Social proof scroll |
| `shimmer` | 1.5s infinite | Skeleton loaders |

### CSS Variable Naming Convention

```css
--color-bg-primary     /* Main background */
--color-bg-surface     /* Card/section background */
--color-bg-card        /* Elevated card background */
--color-border-default /* Default borders */
--color-text-primary   /* Main text */
--color-text-secondary /* Subtext */
--color-text-muted     /* Tertiary text */
--color-accent         /* Brand accent */
--color-cta            /* CTA button */
--color-cta-hover      /* CTA hover state */
--color-cta-glow       /* CTA glow effect */
```

---

## Appendix B — Anti-Patterns (What NOT to Do)

### Design Anti-Patterns ❌

- No animations that block user action
- No transitions > 300ms for interactions
- No auto-playing videos with sound
- No light grey (#CCC) on white backgrounds
- No more than 3 primary colors
- No more than 2 font families
- No inconsistent spacing
- No hamburger menus on desktop
- No tiny tap targets (min 44x44px)
- No unoptimized images

### UX Anti-Patterns ❌

- No labels inside inputs only (use floating labels)
- No validation only on submit
- No walls of text without hierarchy
- No auto-playing carousels
- No "Click here" links
- No Lorem Ipsum in production
- No keyboard navigation traps
- No missing alt text
- No color-only information conveyance

### Performance Anti-Patterns ❌

- No animating `width`, `height`, or `position` (use `transform` + `opacity`)
- No `will-change` on too many elements
- No animations during user input
- No scroll animations without throttling
- No heavy animations on page load
