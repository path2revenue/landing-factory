"use client";

import { useState, useEffect, useRef } from "react";

export default function Process({ config }) {
    const steps = config?.process?.items || [
        {
            number: "01",
            title: "Appel de Diagnostic",
            description: "On analyse ta situation actuelle, ton offre, ton marché et tes objectifs. Si on peut t'aider, on te présente un plan d'action clair.",
            detail: "45 min · Gratuit · Sans engagement",
        },
        {
            number: "02",
            title: "Stratégie Sur-Mesure",
            description: "On conçoit ton système d'acquisition de A à Z : tunnels, publicités, scripts commerciaux, séquences email. Le tout adapté à ton marché.",
            detail: "Plan détaillé livré sous 7 jours",
        },
        {
            number: "03",
            title: "Design, Développement & Création",
            description: "On construit les landing pages, les VSLs, les séquences email, le CRM. Tout est livré prêt à l'emploi, avec ta validation à chaque étape.",
            detail: "Livraison complète en 2-4 semaines",
        },
        {
            number: "04",
            title: "Lancement & Optimisation Continue",
            description: "On lance les campagnes, on suit les métriques, on optimise en continu. Tu reçois un tableau de bord clair pour suivre tes résultats en temps réel.",
            detail: "Suivi hebdomadaire garanti",
        },
    ];

    const [visibleSteps, setVisibleSteps] = useState([]);
    const refs = useRef([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const idx = refs.current.indexOf(entry.target);
                        if (idx !== -1) setVisibleSteps((prev) => [...new Set([...prev, idx])]);
                    }
                });
            },
            { threshold: 0.3 }
        );
        refs.current.forEach((el) => el && observer.observe(el));
        return () => observer.disconnect();
    }, []);

    return (
        <section id="processus" className="py-24 px-6 bg-[var(--color-bg-primary)]/80">
            <div className="max-w-[900px] mx-auto">
                <div className="text-center mb-16">
                    <span className="text-xs uppercase tracking-[0.2em] text-[var(--color-accent)] font-semibold">
                        {config?.process?.eyebrow || "Notre Processus"}
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold mt-3 mb-4">
                        {config?.process?.titleBefore || "Comment Ça "}
                        <span className="bg-gradient-to-r from-[var(--color-gradient-from)] to-[var(--color-gradient-to)] bg-clip-text text-transparent">
                            {config?.process?.titleHighlight || "Fonctionne"}
                        </span>
                    </h2>
                    <p className="text-[var(--color-text-secondary)] max-w-[700px] mx-auto">
                        {config?.process?.subtitle || "Un processus simple, transparent, et orienté résultats."}
                    </p>
                </div>

                <div className="relative">
                    {/* Vertical line */}
                    <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-[var(--color-accent)]/50 via-[var(--color-accent)]/20 to-transparent" />

                    <div className="space-y-12">
                        {steps.map((step, i) => (
                            <div
                                key={i}
                                ref={(el) => (refs.current[i] = el)}
                                className={`flex gap-6 md:gap-8 transition-all duration-600 ${visibleSteps.includes(i)
                                    ? "opacity-100 translate-x-0"
                                    : "opacity-0 -translate-x-4"
                                    }`}
                                style={{ transitionDelay: `${i * 200}ms` }}
                            >
                                {/* Number circle */}
                                <div className="relative z-10 w-12 h-12 md:w-16 md:h-16 rounded-full bg-[var(--color-accent)] flex items-center justify-center shrink-0">
                                    <span className="text-sm md:text-base font-bold text-white">{step.number}</span>
                                </div>

                                {/* Content */}
                                <div className="bg-[var(--color-bg-surface)] border border-[var(--color-border-default)] rounded-2xl p-6 flex-1 hover:border-[var(--color-accent)]/30 transition-colors">
                                    <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-2">{step.title}</h3>
                                    <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-3">{step.description}</p>
                                    <span className="text-xs text-[var(--color-cta)] font-medium">{step.detail}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
