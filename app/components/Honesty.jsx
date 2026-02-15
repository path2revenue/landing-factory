"use client";

import { useState, useEffect, useRef } from "react";

export default function Honesty({ config }) {
    const [visible, setVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => entry.isIntersecting && setVisible(true),
            { threshold: 0.2 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    const goodFit = config?.honesty?.goodFit || [
        "Tu as déjà une offre qui se vend (même un peu)",
        "Tu es prêt à investir pour structurer ta croissance",
        "Tu veux un partenaire, pas juste un prestataire",
        "Tu es ouvert aux feedbacks, même quand ça pique",
    ];

    const badFit = config?.honesty?.badFit || [
        "Tu cherches des résultats magiques sans implication",
        "Tu n'as pas encore d'offre claire ou de clients",
        "Tu veux juste \"tester\" sans t'engager dans le process",
        "Tu compares uniquement sur le prix le plus bas",
    ];

    return (
        <section ref={ref} className="py-24 px-6 bg-[var(--color-bg-primary)]">
            <div
                className={`max-w-[800px] mx-auto transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            >
                <div className="bg-[var(--color-bg-surface)] border border-[var(--color-border-default)] rounded-2xl p-10 md:p-14">
                    {/* Header */}
                    <div className="text-center mb-10">
                        <span className="text-xs uppercase tracking-[0.2em] text-[var(--color-cta)] font-semibold">
                            {config?.honesty?.eyebrow || "Transparence"}
                        </span>
                        <h2 className="text-2xl md:text-4xl font-bold mt-3 mb-4 text-[var(--color-text-primary)]">
                            {config?.honesty?.title || "On Ne Travaille Pas avec Tout le Monde"}
                        </h2>
                        <p className="text-[var(--color-text-secondary)] max-w-[700px] mx-auto leading-relaxed">
                            {config?.honesty?.subtitle || "Et c'est volontaire. On préfère dire non à un projet que de livrer un résultat moyen. Si on ne peut pas t'aider, on te le dira."}
                        </p>
                    </div>

                    {/* Two columns */}
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Good fit */}
                        <div>
                            <h3 className="flex items-center gap-2 text-[var(--color-success)] font-semibold mb-4 text-sm uppercase tracking-wide">
                                <span className="w-5 h-5 rounded-full bg-[var(--color-success)]/15 flex items-center justify-center text-xs">✓</span>
                                C&apos;est pour toi si
                            </h3>
                            <ul className="space-y-3">
                                {goodFit.map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm text-[#CBD5E1] leading-relaxed">
                                        <span className="text-[var(--color-success)] mt-0.5 shrink-0">✓</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Bad fit */}
                        <div>
                            <h3 className="flex items-center gap-2 text-[var(--color-danger)] font-semibold mb-4 text-sm uppercase tracking-wide">
                                <span className="w-5 h-5 rounded-full bg-[var(--color-danger)]/15 flex items-center justify-center text-xs">✕</span>
                                Ce n&apos;est pas pour toi si
                            </h3>
                            <ul className="space-y-3">
                                {badFit.map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm text-[#CBD5E1] leading-relaxed">
                                        <span className="text-[var(--color-danger)] mt-0.5 shrink-0">✕</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Bottom note */}
                    <div className="mt-10 pt-8 border-t border-[var(--color-border-default)] text-center">
                        <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed max-w-[700px] mx-auto">
                            {config?.honesty?.footer || "On travaille avec un nombre limité de clients pour garantir la qualité. L'appel sert aussi à voir si le fit est bon des deux côtés. Pas de pression, pas de forcing."}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
