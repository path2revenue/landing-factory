"use client";

import { useState, useEffect, useRef } from "react";

export default function Services({ config }) {
    const items = config?.services?.items || [
        { icon: "🎯", title: "Acquisition Multi-Canal", description: "Meta Ads, Google Ads, LinkedIn — on identifie les canaux les plus rentables pour ton activité.", badge: "Stratégie" },
        { icon: "📢", title: "Publicités Éthiques & Performantes", description: "Des campagnes ciblées avec des créatifs qui convertissent. Pas de spam, pas de fausses promesses.", badge: "Ads" },
        { icon: "🖥️", title: "Landing Pages Ultra-Optimisées", description: "Des pages de vente conçues pour convertir. Design premium, copywriting persuasif, A/B testing.", badge: "Conversion" },
        { icon: "🎬", title: "VSL & Contenu Vidéo", description: "Des vidéos de vente qui éduquent, rassurent et convertissent. Scripting, production, montage.", badge: "Vidéo" },
        { icon: "⚙️", title: "CRM & Automatisations", description: "Un CRM configuré pour suivre chaque lead. Séquences email, relances WhatsApp, scoring automatique.", badge: "Automation" },
        { icon: "📊", title: "Stratégie & Consulting", description: "Audit complet de ta situation, définition de ta stratégie et accompagnement sur la durée.", badge: "Consulting" },
    ];

    const [visibleCards, setVisibleCards] = useState([]);
    const refs = useRef([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const idx = refs.current.indexOf(entry.target);
                        if (idx !== -1) setVisibleCards((prev) => [...new Set([...prev, idx])]);
                    }
                });
            },
            { threshold: 0.2 }
        );
        refs.current.forEach((el) => el && observer.observe(el));
        return () => observer.disconnect();
    }, []);

    return (
        <section id="services" className="py-24 px-6 bg-[var(--color-bg-primary)]/80">
            <div className="max-w-[1200px] mx-auto">
                <div className="text-center mb-16">
                    <span className="text-xs uppercase tracking-[0.2em] text-[var(--color-accent)] font-semibold">
                        {config?.services?.eyebrow || "Nos Services"}
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold mt-3 mb-4">
                        {config?.services?.titleBefore || "Un Système Complet à "}
                        <span className="bg-gradient-to-r from-[var(--color-gradient-from)] to-[var(--color-gradient-to)] bg-clip-text text-transparent">
                            {config?.services?.titleHighlight || "Ton Service"}
                        </span>
                    </h2>
                    <p className="text-[var(--color-text-secondary)] max-w-[700px] mx-auto">
                        {config?.services?.subtitle || "On ne vend pas des clics. On construit un système complet qui génère des clients qualifiés de façon prévisible."}
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {items.map((item, i) => (
                        <div
                            key={i}
                            ref={(el) => (refs.current[i] = el)}
                            className={`bg-[var(--color-bg-surface)] border border-[var(--color-border-default)] rounded-2xl p-8 hover:border-[var(--color-accent)]/30 transition-all duration-500 group ${visibleCards.includes(i)
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-8"
                                }`}
                            style={{ transitionDelay: `${i * 100}ms` }}
                        >
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-3xl">{item.icon}</span>
                                {item.badge && (
                                    <span className="px-2 py-0.5 bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/20 rounded text-[10px] text-[var(--color-accent-light)] font-semibold uppercase tracking-wider">
                                        {item.badge}
                                    </span>
                                )}
                            </div>
                            <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-3 group-hover:text-[var(--color-accent-light)] transition-colors">{item.title}</h3>
                            <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
