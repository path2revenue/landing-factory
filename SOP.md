# 📋 SOP — Créer et déployer une nouvelle landing page

> Standard Operating Procedure pour le système Landing Factory.

---

## Prérequis

- Node.js 18+ installé
- Git installé
- Accès au repo `path2revenue/landing-factory` sur GitHub
- Accès au projet Supabase (`blfzcszrsoowowxgzbaq`)
- Vercel CLI installé (`npm i -g vercel`)
- Compte Vercel connecté

---

## Étape 1 — Copier le template

```bash
xcopy /E /I /Y "c:\Workflows\LandingPages\landing-factory" "c:\Workflows\LandingPages\<nom-projet>"
```

> Remplacer `<nom-projet>` par le nom du projet (ex: `starsbridgesystem`, `moncoach`, etc.)

**Supprimer les dossiers inutiles dans la copie :**
```bash
cd "c:\Workflows\LandingPages\<nom-projet>"
rmdir /s /q node_modules .next .git
```

---

## Étape 2 — Configurer l'environnement

Créer le fichier `.env.local` à la racine du nouveau projet :

```env
SITE_ID=<nom-projet>
ADMIN_PASSWORD=<mot-de-passe-fort>
SUPABASE_URL=https://blfzcszrsoowowxgzbaq.supabase.co
SUPABASE_SERVICE_KEY=<clé-service-supabase>
```

| Variable             | Description                              |
| -------------------- | ---------------------------------------- |
| `SITE_ID`            | Identifiant unique du site dans Supabase |
| `ADMIN_PASSWORD`     | Mot de passe pour accéder à `/admin`     |
| `SUPABASE_URL`       | URL du projet Supabase                   |
| `SUPABASE_SERVICE_KEY` | Clé service role Supabase              |

---

## Étape 3 — Créer la config Supabase

Insérer une nouvelle ligne vide dans `site_configs` :

```sql
INSERT INTO site_configs (site_id, config, updated_at)
VALUES ('<nom-projet>', '{}', NOW());
```

La config sera remplie automatiquement via l'onboarding admin.

---

## Étape 4 — Installer et lancer

```bash
cd "c:\Workflows\LandingPages\<nom-projet>"
npm install
npm run dev
```

Ouvrir http://localhost:3000 — le site se charge avec les défauts.

---

## Étape 5 — Configurer via l'admin

### 5.1 — Login

1. Aller sur http://localhost:3000/admin
2. Entrer le `ADMIN_PASSWORD`

### 5.2 — Onboarding Wizard (première fois)

L'assistant guide en **6 étapes** :

| Étape | Contenu                                    |
| ----- | ------------------------------------------ |
| 1     | **Identité** — Nom, description SEO, logo/favicon |
| 2     | **Design** — Palette (9 choix), style visuel (6 choix), police (8 choix) |
| 3     | **Hero** — Headline, sous-titre, CTA, vidéo |
| 4     | **Contenu** — Services, témoignages (titres) |
| 5     | **Liens** — Calendrier, WhatsApp, Meta Pixel, GA |
| 6     | **Review** — Récap et publication           |

### 5.3 — Dashboard (édition continue)

Après l'onboarding, le Dashboard offre **7 onglets** :

1. **Hero & Intro** — Texte principal, CTA, stats, vidéo
2. **Problème** — Pain points, blocages, solutions échouées
3. **Résultats** — Clients, chiffres, métriques
4. **Services** — Liste de services avec icônes et descriptions
5. **Parcours** — Étapes du processus client
6. **Preuve Sociale** — Témoignages vidéo, texte, logos
7. **Design & SEO** — Palette, style, police, meta tags, OG image

### 5.4 — Visual Editor (optionnel)

Pour un editing live avec preview :
- Cliquer sur une section pour l'éditer
- Réordonner les sections par drag
- Activer/désactiver des sections

---

## Étape 6 — Build de vérification

```bash
npm run build
```

S'assurer de **0 erreurs** avant de déployer.

---

## Étape 7 — Initialiser Git

```bash
cd "c:\Workflows\LandingPages\<nom-projet>"
git init
git add .
git commit -m "Initial commit: <nom-projet> landing page"
```

---

## Étape 8 — Créer le repo GitHub

Créer un repo sous l'organisation `path2revenue` :

- **Nom** : `<nom-projet>`
- **Visibilité** : Public ou Privé selon le besoin
- **Description** : `Landing page pour <nom-projet>`

```bash
git remote add origin https://github.com/path2revenue/<nom-projet>.git
git branch -M main
git push -u origin main
```

---

## Étape 9 — Déployer sur Vercel

```bash
cd "c:\Workflows\LandingPages\<nom-projet>"
npx vercel --yes
```

### Configurer les variables d'environnement sur Vercel

Dans le dashboard Vercel > Project > Settings > Environment Variables, ajouter :

| Variable             | Valeur                |
| -------------------- | --------------------- |
| `SITE_ID`            | `<nom-projet>`        |
| `ADMIN_PASSWORD`     | `<mot-de-passe>`      |
| `SUPABASE_URL`       | `https://blfzcszrsoowowxgzbaq.supabase.co` |
| `SUPABASE_SERVICE_KEY` | `<clé-service>`     |

### Connecter au repo GitHub

```bash
npx vercel git connect https://github.com/path2revenue/<nom-projet> --yes
```

Chaque push sur `main` déclenchera un auto-deploy.

---

## Étape 10 — Domaine personnalisé (optionnel)

1. Vercel Dashboard > Project > Settings > Domains
2. Ajouter le domaine souhaité
3. Configurer le DNS (CNAME vers `cname.vercel-dns.com`)

---

## Étape 11 — Vérifications post-deploy

- [ ] L'URL de production charge correctement
- [ ] Toutes les sections s'affichent avec le bon contenu
- [ ] Le panneau admin est accessible sur `/admin`
- [ ] Le calendrier (embed) fonctionne
- [ ] Le lien WhatsApp ouvre correctement
- [ ] La page `/merci` fonctionne
- [ ] La page `/mentions-legales` est accessible
- [ ] Le site est responsive (mobile, tablette)
- [ ] Les meta tags OG sont corrects (tester sur opengraph.xyz)
- [ ] Le favicon s'affiche
- [ ] Le `/admin` n'est PAS indexé (vérifier robots.txt)

---

## Maintenance

### Mettre à jour le contenu

1. Aller sur `https://<domaine>/admin`
2. Se connecter
3. Modifier les sections souhaitées
4. Cliquer "Enregistrer"

> Les changements sont en live sous 60 secondes (revalidation Next.js).

### Mettre à jour le template

Si le template `landing-factory` évolue :

```bash
# Depuis le dossier du projet
# Copier les fichiers du factory SAUF .env.local et .git
robocopy "c:\Workflows\LandingPages\landing-factory" "c:\Workflows\LandingPages\<nom-projet>" /MIR /XD node_modules .next .git /XF .env.local

# Réinstaller et vérifier
npm install
npm run build
git add -A
git commit -m "sync: update from landing-factory template"
git push origin main
```

### Rollback

Utiliser le dashboard Vercel pour revenir à un déploiement précédent, ou via Git :

```bash
git revert HEAD
git push origin main
```

---

## Résumé rapide

```
Copier template → .env.local → INSERT Supabase → npm install →
/admin (onboarding) → npm run build → git init + push → Vercel deploy → ✅
```

**Temps estimé : 15-20 minutes** pour un site complètement configuré et déployé.
