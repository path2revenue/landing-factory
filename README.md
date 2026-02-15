# 🏭 Landing Factory — Template Source

**Le template maître pour créer des landing pages professionnelles en quelques minutes.**

> ⚠️ **Ceci est le template source.** Ne pas déployer ce repo directement.
> Pour créer un nouveau site, suivre le [SOP.md](./SOP.md).

Un seul codebase → N sites. Chaque site est piloté par son propre `SITE_ID` dans Supabase.

---

## ✨ Fonctionnalités

- **16 sections modulaires** : Hero, SocialProof, PainPoints, Results, VideoTestimonials, Services, Process, Honesty, Calendar, Testimonials, FAQ, FinalCTA, Footer, Navbar, Mentions Légales, Merci
- **9 palettes de couleurs** : Trust, Vibrant, Luxury, Healthcare, Creative, Dark, Obsidian, Sunset, Ocean
- **6 styles visuels** : Linear, Glassmorphism, Aurora, Bento, Minimal, Brutalist
- **8 polices Google Fonts** : Inter, Montserrat, Playfair Display, Roboto, Lato, Space Grotesk, DM Sans, Outfit
- **Admin complet** (`/admin`) : Onboarding wizard + Dashboard + Visual Editor
- **SEO optimisé** : Meta tags, OG, robots.txt, sitemap
- **Tracking** : Meta Pixel, Google Analytics
- **Page Mentions Légales** auto-générée
- **Page Merci** pour les conversions
- **100% responsive**

---

## 🏗️ Architecture

```
landing-factory/
├── app/
│   ├── components/          # 16 sections de landing page
│   │   ├── Hero.jsx
│   │   ├── PainPoints.jsx
│   │   ├── Services.jsx
│   │   ├── Results.jsx
│   │   ├── Process.jsx
│   │   ├── Honesty.jsx
│   │   ├── FAQ.jsx
│   │   ├── Calendar.jsx
│   │   ├── FinalCTA.jsx
│   │   ├── VideoTestimonials.jsx
│   │   ├── Testimonials.jsx
│   │   ├── SocialProof.jsx
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   └── ...
│   ├── admin/
│   │   ├── page.js              # Login admin
│   │   ├── LoginForm.jsx
│   │   ├── edit/
│   │   │   ├── Dashboard.jsx        # 7 onglets d'édition
│   │   │   ├── OnboardingWizard.jsx # Assistant de création
│   │   │   ├── VisualEditor.jsx     # Éditeur visuel live
│   │   │   └── SectionEditPanel.jsx # Panneaux d'édition par section
│   │   └── components/ui/      # Composants UI admin
│   ├── api/
│   │   └── admin/
│   │       ├── login/route.js   # Auth admin
│   │       ├── save/route.js    # Sauvegarde config
│   │       └── upload/route.js  # Upload fichiers
│   ├── mentions-legales/        # Page juridique
│   ├── merci/                   # Page post-conversion
│   ├── globals.css              # Design system (palettes + styles)
│   ├── layout.js                # Layout racine (fonts, tracking, palette, style)
│   ├── page.js                  # Page principale (assemble les sections)
│   └── robots.js                # SEO robots
├── lib/
│   ├── config.js                # Chargement config Supabase
│   ├── supabase.js              # Client Supabase
│   └── auth.js                  # Auth admin
├── public/                      # Assets statiques (images, logos)
├── site.config.js               # Config fallback locale
└── .env.local                   # Variables d'environnement
```

---

## ⚙️ Configuration

### Variables d'environnement (`.env.local`)

```env
SITE_ID=nom-du-site
ADMIN_PASSWORD=mot-de-passe-admin
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_SERVICE_KEY=eyJxxxxx
```

### Config Supabase

Chaque site utilise une ligne dans la table `site_configs` :

| Colonne      | Type    | Description                        |
| ------------ | ------- | ---------------------------------- |
| `site_id`    | text    | Identifiant unique du site (PK)    |
| `config`     | jsonb   | Configuration complète du site     |
| `updated_at` | timestamp | Dernière mise à jour             |

La config JSONB contient les sections : `meta`, `design`, `hero`, `painPoints`, `services`, `results`, `process`, `honesty`, `faq`, `calendar`, `testimonials`, `videoTestimonials`, `finalCTA`, `footer`, `navbar`, `links`, `tracking`, `sections` (ordre).

---

## 🚀 Lancement rapide

```bash
# 1. Installer les dépendances
npm install

# 2. Configurer .env.local (voir ci-dessus)

# 3. Lancer en dev
npm run dev

# 4. Ouvrir le navigateur
# Site : http://localhost:3000
# Admin : http://localhost:3000/admin
```

---

## 🎨 Design System

### Palettes (via `data-palette` sur `<html>`)

| Palette      | Description               |
| ------------ | ------------------------- |
| `trust`      | 🔵 Bleu professionnel     |
| `vibrant`    | 🟣 Violet / Magenta       |
| `luxury`     | 🟡 Or & Noir              |
| `healthcare` | 🟢 Vert apaisant          |
| `creative`   | 🟠 Rose & Violet          |
| `dark`       | ⚫ Gris & Néon            |
| `obsidian`   | 🔴 Rouge & Or             |
| `sunset`     | 🌅 Rose & Doré            |
| `ocean`      | 🌊 Bleu teal              |

### Styles visuels (via `data-style` sur `<html>`)

| Style          | Effet                                    |
| -------------- | ---------------------------------------- |
| `linear`       | Clean, SaaS (défaut)                     |
| `glassmorphism` | Verre dépoli, backdrop-blur             |
| `aurora`       | Glows néon, ombres colorées              |
| `bento`        | Grille japonaise, bordures nettes        |
| `minimal`      | Aucune ombre, ultra-épuré                |
| `brutalist`    | 0 border-radius, bordures épaisses       |

### Variables CSS

Toutes les couleurs utilisent des CSS custom properties :

```css
--color-bg-primary      /* Fond principal */
--color-bg-surface      /* Fond surface secondaire */
--color-bg-card         /* Fond des cartes */
--color-accent          /* Couleur d'accent */
--color-cta             /* Couleur Call to Action */
--color-text-primary    /* Texte principal */
--color-text-secondary  /* Texte secondaire */
--color-text-muted      /* Texte discret */
```

---

## 🔒 Admin Panel

- **URL** : `/admin`
- **Auth** : mot de passe simple via `ADMIN_PASSWORD`
- **Onboarding** : assistant 6 étapes pour la création initiale
- **Dashboard** : 7 onglets (Hero, Problème, Résultats, Services, Parcours, Preuve Sociale, Design & SEO)
- **Visual Editor** : édition live avec preview en temps réel
- **Admin non indexé** : `robots.js` bloque `/admin` du SEO

---

## 📦 Déploiement

```bash
# Build
npm run build

# Deployer sur Vercel
npx vercel --yes
```

Vercel auto-déploie sur chaque push GitHub.

---

## 📄 Licence

Propriétaire — Path2Revenue. Tous droits réservés.
