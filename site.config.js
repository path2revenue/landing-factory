/** ============================================================
 *  SITE CONFIG — Single Source of Truth
 *  ============================================================
 *  Fill out every section below. This file drives the ENTIRE site.
 *  No code changes needed — just edit this config and deploy.
 *  ============================================================ */

const WA_NUMBER = "33761941267";
const WA_MESSAGE = (ctx) =>
    `Bonjour, je viens du site ${ctx} et j'aimerais en savoir plus.`;

export const siteConfig = {
    /* ─────────────────── META & SEO ─────────────────── */
    meta: {
        title: "StarsBridgeSystem | Systèmes d'Acquisition Éthiques pour Entrepreneurs",
        description:
            "On crée des systèmes d'acquisition clients éthiques et prédictibles pour entrepreneurs musulmans. Publicité, funnels, VSL, landing pages.",
        keywords:
            "marketing éthique, acquisition clients, funnel, publicité, entrepreneur musulman, landing page, VSL",
        ogTitle: "StarsBridgeSystem | Marketing Éthique & Acquisition Client",
        ogDescription: "Systèmes d'acquisition prédictibles pour entrepreneurs éthiques.",
        ogImage: null, // URL to OG image (1200x630)
        lang: "fr",
        favicon: "⚡", // Emoji or path to .ico/.png
    },

    /* ─────────────────── DESIGN ─────────────────── */
    design: {
        palette: "trust", // trust | vibrant | luxury | healthcare | creative | dark
        style: "linear", // linear | glassmorphism | aurora | bento | minimal
        fontHeading: "Inter",
        fontBody: "Inter",
        fontWeights: "300;400;500;600;700;800",
    },

    /* ─────────────────── GLOBAL LINKS ─────────────────── */
    links: {
        whatsapp: `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_MESSAGE("StarsBridgeSystem"))}`,
        booking: "#rdv",
        bookingEmbed:
            "https://api.leadconnectorhq.com/widget/booking/JcQPg6HogFwOXOlJKoP6",
        bookingEmbedType: "ghl", // ghl | calendly | iframe
    },

    /* ─────────────────── NAVBAR ─────────────────── */
    navbar: {
        logo: { text: "StarsBridgeSystem", emoji: "⚡" },
        links: [
            { label: "Services", href: "#services" },
            { label: "Résultats", href: "#resultats" },
            { label: "Témoignages", href: "#temoignages" },
            { label: "FAQ", href: "#faq" },
        ],
        cta: { text: "Réserver un Appel", href: "#rdv" },
    },

    /* ─────────────────── HERO ─────────────────── */
    hero: {
        eyebrow: { text: "+100K€ de CA généré pour nos clients", dot: true },
        headline: "On Prend en Charge Ton",
        highlightedText: "Marketing & Commercial",
        headlineEnd: "Pour Que Tu Signes Plus.",
        subheadline:
            'Un <strong>système complet</strong> qui génère des clients <strong>de façon prévisible</strong>.',
        vslUrl: "https://www.youtube.com/embed/tGQbEge5hCc?rel=0&modestbranding=1",
        vslTitle: "Présentation StarsBridgeSystem",
        ctas: [
            {
                text: "Réserver Mon Appel avec un Expert",
                href: "#rdv",
                style: "primary", // primary | secondary
                arrow: true,
            },
            {
                text: "Échanger sur WhatsApp",
                href: "__whatsapp__", // replaced at runtime with links.whatsapp
                style: "secondary",
                icon: "whatsapp",
            },
        ],
        stats: [
            { value: 100, suffix: "K+", label: "CA généré pour nos clients" },
            { value: 50, suffix: "+", label: "Entreprises accompagnées" },
            { value: 30, suffix: "+", label: "RDVs en 1 webinaire" },
            { value: 538, suffix: "%", label: "ROI moyen constaté" },
        ],
        trustBadges: [
            "Résultats vérifiables sur LinkedIn",
            "Appel 100% gratuit",
            "Zéro engagement",
        ],
    },

    /* ─────────────────── SOCIAL PROOF ─────────────────── */
    socialProof: {
        items: [
            "⚡ +100K€ de CA généré",
            "🎯 50+ entreprises accompagnées",
            "📈 538% ROI moyen",
            "🤝 Partenaire de confiance",
            "🏆 Résultats mesurables",
        ],
    },

    /* ─────────────────── PAIN POINTS ─────────────────── */
    painPoints: {
        eyebrow: "Le Problème",
        headline: "Tu Te Reconnais Dans",
        highlightedText: "Cette Situation",
        highlightColor: "danger", // danger = red accent
        subtitle:
            "La majorité des entrepreneurs bloquent sur les mêmes obstacles. Et ce n'est pas un manque de compétence. C'est un manque de système.",
        items: [
            {
                icon: "📇",
                title: "Tu distribues des cartes de visite en espérant un miracle",
                description:
                    "Tu comptes sur le bouche-à-oreille, les salons et les recommandations. Certains mois tu signes, d'autres non. Ton CA est imprévisible.",
                stat: "0 système = 0 prédictibilité",
            },
            {
                icon: "💸",
                title: "Tu dépenses en pub sans comprendre ce qui fonctionne",
                description:
                    "Tu as peut-être essayé Facebook Ads, un site à 30-40€/mois, ou même une agence. Résultat : de l'argent investi sans retour concret.",
                stat: "Budget perdu sans stratégie",
            },
            {
                icon: "🏋️",
                title: "Tu te bats seul, sans équipe ni système",
                description:
                    "Tu gères tout : la prospection, les appels, le suivi, la livraison. Tu es expert dans ton domaine mais tu n'as ni le temps ni l'expertise pour construire une machine d'acquisition.",
                stat: "Tout repose sur tes épaules",
            },
        ],
    },

    /* ─────────────────── RESULTS ─────────────────── */
    results: {
        eyebrow: "Résultats Concrets",
        headline: "Ce Qu'on a Fait Pour",
        highlightedText: "D'autres Entrepreneurs",
        items: [
            {
                metric: "8.6K€",
                label: "Immo Éthique",
                description: "Chiffre d'affaires généré en publicité immobilière éthique",
                badge: "Immobilier",
            },
            {
                metric: "538%",
                label: "ROI Agence Événementielle",
                description: "Retour sur investissement pour une agence événementielle",
                badge: "Événementiel",
            },
            {
                metric: "30+",
                label: "RDVs en 1 Webinaire",
                description: "Rendez-vous qualifiés générés en un seul webinaire live",
                badge: "Webinaire",
            },
            {
                metric: "100K+",
                label: "CA Cumulé Clients",
                description: "Chiffre d'affaires généré pour l'ensemble de nos clients",
                badge: "Global",
            },
        ],
    },

    /* ─────────────────── VIDEO TESTIMONIALS ─────────────────── */
    videoTestimonials: {
        eyebrow: "Ils Témoignent",
        headline: "Nos Clients en",
        highlightedText: "Vidéo",
        videos: [
            {
                url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
                title: "Témoignage Client 1",
                caption: "Comment on a doublé son CA en 3 mois",
            },
            {
                url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
                title: "Témoignage Client 2",
                caption: "De 0 à 30 RDVs qualifiés/mois",
            },
        ],
    },

    /* ─────────────────── SERVICES ─────────────────── */
    services: {
        eyebrow: "Nos Services",
        headline: "Un Système",
        highlightedText: "Complet",
        headlineEnd: "à Ton Service",
        subtitle:
            "Marketing, commercial, automatisation. On prend en charge chaque maillon de la chaîne.",
        items: [
            {
                icon: "🌱",
                title: "Acquisition Sans Publicité",
                description:
                    "Stratégies organiques (LinkedIn, contenu, partenariats, referrals) qui génèrent des clients sans dépenser un centime en pub.",
                badge: "0€ de pub requis",
            },
            {
                icon: "🎯",
                title: "Publicité Ciblée & Éthique",
                description:
                    "Campagnes Facebook, Instagram et Google Ads pensées pour convertir sans manipuler.",
            },
            {
                icon: "🖥️",
                title: "Landing Pages Premium",
                description:
                    "Des pages de vente à fort taux de conversion, designées pour inspirer confiance.",
            },
            {
                icon: "🎬",
                title: "VSL & Contenu Vidéo",
                description:
                    "Scripts, production et montage de vidéos de vente qui éduquent ton audience.",
                span: 2, // spans 2 columns on desktop
            },
            {
                icon: "⚙️",
                title: "Automatisation CRM",
                description:
                    "On met en place ton CRM, tes pipelines et tes automatisations.",
            },
            {
                icon: "📧",
                title: "Séquences Email & Nurturing",
                description:
                    "Séquences automatisées qui convertissent les prospects froids en clients.",
            },
            {
                icon: "📞",
                title: "Stratégie Commerciale & Closing",
                description:
                    "Closing, scripts d'appel, structuration de l'offre. De la prospection à la signature.",
                badge: "100K+ CA généré",
                span: 2,
            },
        ],
    },

    /* ─────────────────── PROCESS ─────────────────── */
    process: {
        eyebrow: "Notre Méthode",
        headline: "Comment On",
        highlightedText: "Travaille",
        steps: [
            {
                number: "01",
                title: "Appel Diagnostic",
                description:
                    "On analyse ta situation actuelle, ton marché, tes objectifs. On identifie tes leviers de croissance.",
            },
            {
                number: "02",
                title: "Stratégie Sur Mesure",
                description:
                    "On conçoit un plan d'action complet adapté à ton business : canaux, messages, séquences, automations.",
            },
            {
                number: "03",
                title: "Déploiement & Optimisation",
                description:
                    "On lance, on mesure, on optimise. Tu te concentres sur ton expertise pendant qu'on gère l'acquisition.",
            },
            {
                number: "04",
                title: "Scale & Croissance",
                description:
                    "Une fois le système validé, on accélère. Plus de clients, plus de CA, même effort.",
            },
        ],
    },

    /* ─────────────────── HONESTY ─────────────────── */
    honesty: {
        eyebrow: "Notre Philosophie",
        headline: "On Préfère la",
        highlightedText: "Transparence",
        paragraphs: [
            "On ne promet pas la lune. On ne travaille pas avec tout le monde. Et on refuse les projets où on sait qu'on ne pourra pas apporter de résultats.",
            "Notre approche : des systèmes éthiques, des résultats mesurables, et une honnêteté totale. Si on pense ne pas être le bon fit pour toi, on te le dira dès le premier appel.",
            "Chaque client est un partenaire. Ta réussite est notre réussite.",
        ],
        signature: null, // can be { name: "Ahmed", role: "Fondateur" }
    },

    /* ─────────────────── CALENDAR ─────────────────── */
    calendar: {
        eyebrow: "Prêt à Passer à l'Action ?",
        headline: "Réserve Ton Appel de",
        highlightedText: "Candidature",
        subtitle:
            "Cet appel de 45 minutes avec l'un de nos experts est une première étape pour comprendre ta situation.",
        benefits: [
            "Analyse rapide de ta situation actuelle",
            "Identification de tes leviers de croissance",
            "Recommandations concrètes et actionnables",
            "On te dit honnêtement si on peut t'aider ou pas",
        ],
        whatsappCopy: "Tu préfères discuter directement ?",
        whatsappLabel: "Échangeons sur WhatsApp →",
    },

    /* ─────────────────── TESTIMONIALS ─────────────────── */
    testimonials: {
        eyebrow: "Témoignages",
        headline: "Ce Que Nos",
        highlightedText: "Partenaires",
        headlineEnd: "Disent de Nous",
        items: [
            {
                stars: 5,
                quote:
                    "Ahmed Biaggini est un profil rare, à la croisée de la stratégie et du commercial de haut niveau. Je recommande son travail et son sérieux.",
                name: "Mohamed Ali",
                role: "Sales Influence",
                color: "linear-gradient(135deg,#3B82F6,#60A5FA)",
            },
            {
                stars: 5,
                quote:
                    "Nous avons eu des résultats incroyables. Ahmed a toujours fait preuve de professionnalisme, ce qui nous a valu de dépasser les 100K de CA.",
                name: "Bryan Wallace",
                role: "Fondateur, Agence Take Care",
                color: "linear-gradient(135deg,#EAB308,#F59E0B)",
            },
            {
                stars: 5,
                quote:
                    "J'ai observé une augmentation de 50 clients potentiels en l'espace d'un mois. Ses stratégies de vente novatrices m'ont permis d'accéder à une clientèle diversifiée.",
                name: "Hanaria Messeleka",
                role: "Coordinatrice commerciale & marketing",
                color: "linear-gradient(135deg,#10B981,#059669)",
            },
            {
                stars: 5,
                quote:
                    "Un professionnel de la vente exceptionnel. Son impact sur notre croissance commerciale a été indéniable.",
                name: "Khalid Khamdani",
                role: "Fondateur, Easyloc Immobilier Formation",
                color: "linear-gradient(135deg,#8B5CF6,#6366F1)",
            },
            {
                stars: 5,
                quote:
                    "Un élément exceptionnel par son dynamisme et l'envie de tester de nouvelles idées. Il fait toujours le maximum pour atteindre ses objectifs.",
                name: "François Pujabe",
                role: "Cofondateur, ComptaStar",
                color: "linear-gradient(135deg,#EC4899,#8B5CF6)",
            },
        ],
    },

    /* ─────────────────── FAQ ─────────────────── */
    faq: {
        eyebrow: "FAQ",
        headline: "Questions",
        highlightedText: "Fréquentes",
        items: [
            {
                q: "Combien coûte un accompagnement ?",
                a: "Nos tarifs varient selon la complexité. On commence toujours par un appel gratuit de diagnostic. Ensuite, devis transparent, sans frais cachés.",
            },
            {
                q: "En combien de temps je vais voir des résultats ?",
                a: "En général, les premiers leads arrivent entre 7 et 21 jours après le lancement des campagnes.",
            },
            {
                q: "Est-ce que vous travaillez avec tout le monde ?",
                a: "Non. On sélectionne nos clients avec exigence. On ne prend que les projets où on est convaincus de pouvoir apporter des résultats.",
            },
            {
                q: "Je ne suis pas à l'aise avec la technologie ?",
                a: "Absolument pas un problème. On prend en charge 100% de la partie technique.",
            },
            {
                q: "Quelle est la différence avec une agence classique ?",
                a: "Les agences vendent des clics. Nous, on construit un système complet qui te génère des clients réels.",
            },
            {
                q: "L'appel de diagnostic est vraiment gratuit ?",
                a: "Oui, 100% gratuit, sans engagement. Un échange sincère de 45 minutes.",
            },
        ],
    },

    /* ─────────────────── FINAL CTA ─────────────────── */
    finalCTA: {
        eyebrow: "Tu veux des résultats ?",
        headline: "On Est à",
        highlightedText: "Une Décision",
        headlineEnd: "de Tout Faire Changer",
        subtitle:
            "Chaque jour qui passe sans système, ce sont des clients que tu ne rencontres pas.",
        ctas: [
            {
                text: "Réserver Mon Appel avec un Expert",
                href: "#rdv",
                style: "primary",
                arrow: true,
            },
            {
                text: "WhatsApp",
                href: "__whatsapp__",
                style: "secondary",
                icon: "whatsapp",
            },
        ],
        badges: ["✅ Appel 100% gratuit", "✅ Zéro engagement", "✅ Réponse sous 24h"],
    },

    /* ─────────────────── FOOTER ─────────────────── */
    footer: {
        brand: "StarsBridgeSystem",
        tagline: "Systèmes d'acquisition éthiques pour entrepreneurs ambitieux.",
        links: [
            { label: "Services", href: "#services" },
            { label: "Résultats", href: "#resultats" },
            { label: "Témoignages", href: "#temoignages" },
            { label: "FAQ", href: "#faq" },
            { label: "Mentions légales", href: "/mentions-legales" },
        ],
        socials: [
            // { platform: "linkedin", url: "https://..." },
            // { platform: "instagram", url: "https://..." },
            // { platform: "youtube", url: "https://..." },
        ],
        legal: "© 2025 StarsBridgeSystem. Tous droits réservés.",
    },

    /* ─────────────────── MERCI PAGE ─────────────────── */
    merci: {
        headline: "Ton Appel Est",
        highlightedText: "Confirmé !",
        subtitle:
            "On a hâte d'échanger avec toi. Tu vas recevoir un email de confirmation avec tous les détails.",
        gift: {
            badge: "🎁 Cadeau Exclusif",
            title: "Rejoins le Réseau d'Affaires StarsBridgeSystem",
            description:
                "Un groupe privé WhatsApp pour entrepreneurs ambitieux. Partage d'opportunités, conseils stratégiques et networking de qualité.",
            benefits: [
                { icon: "🤝", label: "Networking qualifié" },
                { icon: "💡", label: "Conseils exclusifs" },
                { icon: "🚀", label: "Opportunités business" },
            ],
            cta: {
                text: "Rejoindre le Groupe Maintenant",
                url: "https://chat.whatsapp.com/FR3BPnD863B8CBa519N1bA",
                icon: "whatsapp",
            },
            footnote: "100% gratuit. Accès réservé aux entrepreneurs sérieux.",
        },
        backLink: { text: "← Retour au site", url: "/" },
    },

    /* ─────────────────── SECTIONS ORDER ─────────────────── */
    // Controls which sections appear and in what order on the landing page.
    // Remove or reorder items to customize the page.
    sections: [
        "hero",
        "socialProof",
        "painPoints",
        "results",
        "videoTestimonials",
        "services",
        "process",
        "honesty",
        "calendar",
        "testimonials",
        "faq",
        "finalCTA",
    ],
};
