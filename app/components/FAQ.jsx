"use client";

import { useState, useEffect, useRef } from "react";

export default function FAQ({ config }) {
    const faqs = config?.faq?.items || [
        { q: "Combien coûte un accompagnement ?", a: "Nos tarifs varient selon la complexité du projet et les services nécessaires. On commence toujours par un appel gratuit de diagnostic pour comprendre ta situation. Ensuite, on te propose un devis transparent, sans frais cachés." },
        { q: "En combien de temps je vais voir des résultats ?", a: "Ça dépend de ton marché, de ton offre, et de ta situation actuelle. En général, les premiers leads arrivent entre 7 et 21 jours après le lancement des campagnes." },
        { q: "Est-ce que vous travaillez avec tout le monde ?", a: "Non. On sélectionne nos clients avec exigence. On ne prend que des projets où on est convaincus de pouvoir apporter des résultats concrets." },
        { q: "Je ne suis pas à l'aise avec la technologie, c'est un problème ?", a: "Absolument pas. C'est justement pour ça qu'on existe. On prend en charge 100% de la partie technique." },
        { q: "Quelle est la différence entre vous et une agence classique ?", a: "Les agences classiques te vendent des clics et des impressions. Nous, on construit un système complet qui te génère des clients réels. Et on a une obsession pour le ROI." },
        { q: "Quels types d'entreprises accompagnez-vous ?", a: "On accompagne des entrepreneurs, coachs, formateurs, agences, indépendants et PME qui ont un produit ou service de qualité mais qui manquent de système pour acquérir des clients." },
        { q: "L'appel de diagnostic est vraiment gratuit ?", a: "Oui, 100% gratuit, sans engagement. C'est un échange sincère de 45 minutes où on analyse ta situation." },
    ];

    const [openIndex, setOpenIndex] = useState(null);
    const [visible, setVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => entry.isIntersecting && setVisible(true),
            { threshold: 0.1 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section id="faq" className="py-24 px-6 bg-[var(--color-bg-primary)]/80">
            <div
                ref={ref}
                className={`max-w-[800px] mx-auto transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            >
                <div className="text-center mb-16">
                    <span className="text-xs uppercase tracking-[0.2em] text-[var(--color-accent)] font-semibold">
                        {config?.faq?.eyebrow || "FAQ"}
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold mt-3 mb-4">
                        {config?.faq?.titleBefore || "Questions "}
                        <span className="bg-gradient-to-r from-[var(--color-gradient-from)] to-[var(--color-gradient-to)] bg-clip-text text-transparent">
                            {config?.faq?.titleHighlight || "Fréquentes"}
                        </span>
                    </h2>
                </div>

                <div className="space-y-3">
                    {faqs.map((faq, i) => (
                        <div
                            key={i}
                            className="bg-[var(--color-bg-surface)] border border-[var(--color-border-default)] rounded-xl overflow-hidden transition-colors hover:border-[var(--color-accent)]/30"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                className="w-full px-6 py-5 flex items-center justify-between text-left cursor-pointer"
                            >
                                <span className="font-semibold text-[var(--color-text-primary)] text-sm md:text-base pr-4">{faq.q}</span>
                                <span
                                    className={`text-[var(--color-accent)] text-xl shrink-0 transition-transform duration-300 ${openIndex === i ? "rotate-45" : ""}`}
                                >
                                    +
                                </span>
                            </button>
                            <div
                                className={`overflow-hidden transition-all duration-300 ${openIndex === i ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"}`}
                            >
                                <p className="px-6 pb-5 text-sm text-[var(--color-text-secondary)] leading-relaxed">{faq.a}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
