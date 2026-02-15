"use client";
import Image from "next/image";

import { useState, useEffect, useRef } from "react";

function AnimatedCounter({ target, suffix = "", duration = 2000 }) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const started = useRef(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !started.current) {
                    started.current = true;
                    const start = performance.now();
                    const animate = (now) => {
                        const progress = Math.min((now - start) / duration, 1);
                        const eased = 1 - Math.pow(1 - progress, 3);
                        setCount(Math.floor(eased * target));
                        if (progress < 1) requestAnimationFrame(animate);
                    };
                    requestAnimationFrame(animate);
                }
            },
            { threshold: 0.3 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [target, duration]);

    return <span ref={ref}>{count.toLocaleString("fr-FR")}{suffix}</span>;
}

export default function Results({ config }) {
    const caseStudies = config?.results?.items || [
        {
            name: "MentorClass Corporation",
            domain: "Formation & Mentorat",
            quote: "De 0 à plus de 100K€ de revenus mensuels grâce au système d'acquisition StarsBridgesSystem.",
            metrics: [{ value: 100, suffix: "K+/mois", label: "Revenus mensuels" }],
        },
        {
            name: "Mohammed Boclet",
            domain: "Coaching & Consulting",
            image: "/mohamed_boclet.jpg",
            quote: "24 appels qualifiés générés pour un chiffre d'affaires de 30K€.",
            metrics: [
                { value: 24, suffix: "", label: "Appels qualifiés" },
                { value: 30, suffix: "K€", label: "CA généré" },
            ],
        },
        {
            name: "Franck Nicolas",
            domain: "Consulting haut de gamme",
            image: "/franck_nicolas.jpg",
            quote: "7 appels générés pour 20K€ encaissés. Un système ultra-qualitatif orienté résultats premium.",
            metrics: [
                { value: 7, suffix: "", label: "Appels générés" },
                { value: 20, suffix: "K€", label: "Encaissés" },
            ],
        },
        {
            name: "Yomi Denzel",
            domain: "Infopreneuriat & E-commerce",
            image: "/yomi.jpg",
            quote: "100K€ contractés grâce à une stratégie d'acquisition et de closing structurée.",
            metrics: [{ value: 100, suffix: "K€", label: "Contractés" }],
        },
        {
            name: "Immo Éthique Formation",
            domain: "Formation immobilière",
            image: "/immo_ethique.jpg",
            quote: "8.6K encaissés, 90 présents, +30 RDVs qualifiés en un seul webinaire.",
            metrics: [
                { value: 8600, suffix: "€", label: "Encaissés" },
                { value: 90, suffix: "", label: "Présents live" },
                { value: 30, suffix: "+", label: "RDVs qualifiés" },
            ],
        },
        {
            name: "Agence Événementielle",
            domain: "Organisation d'événements",
            quote: "188€ investis en publicité, 1200€ de CA encaissés. Création complète du système marketing et commercial.",
            metrics: [
                { value: 188, suffix: "€", label: "Investis en pub" },
                { value: 1200, suffix: "€", label: "CA généré" },
                { value: 538, suffix: "%", label: "ROI" },
            ],
        },
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
        <section id="resultats" className="py-24 px-6">
            <div className="max-w-[1200px] mx-auto">
                <div className="text-center mb-16">
                    <span className="text-xs uppercase tracking-[0.2em] text-[var(--color-accent)] font-semibold">
                        {config?.results?.eyebrow || "Études de Cas"}
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold mt-3 mb-4">
                        {config?.results?.titleBefore || "Des Résultats "}
                        <span className="bg-gradient-to-r from-[var(--color-gradient-from)] to-[var(--color-gradient-to)] bg-clip-text text-transparent">
                            {config?.results?.titleHighlight || "Concrets & Vérifiables"}
                        </span>
                    </h2>
                    <p className="text-[var(--color-text-secondary)] max-w-[700px] mx-auto">
                        {config?.results?.subtitle || "Chaque résultat est documenté. Chaque client peut témoigner. Transparence totale."}
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {caseStudies.map((cs, i) => (
                        <div
                            key={i}
                            ref={(el) => (refs.current[i] = el)}
                            className={`bg-[var(--color-bg-surface)] border border-[var(--color-border-default)] rounded-2xl p-8 hover:border-[var(--color-accent)]/30 transition-all duration-500 ${visibleCards.includes(i)
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-8"
                                }`}
                            style={{ transitionDelay: `${i * 150}ms` }}
                        >
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    {cs.image && (
                                        <Image src={cs.image} alt={cs.name} width={48} height={48} className="w-12 h-12 rounded-full object-cover border-2 border-[var(--color-accent)]/30" unoptimized />
                                    )}
                                    <div>
                                        <h3 className="font-bold text-[var(--color-text-primary)] text-lg">{cs.name}</h3>
                                        <p className="text-xs text-[var(--color-accent)]">{cs.domain}</p>
                                    </div>
                                </div>
                                <div className="text-[var(--color-cta)] text-sm">★★★★★</div>
                            </div>

                            <div className="flex flex-wrap gap-6 mb-6">
                                {cs.metrics.map((m, j) => (
                                    <div key={j}>
                                        <div className="text-2xl font-bold bg-gradient-to-r from-[var(--color-gradient-from)] to-[var(--color-gradient-to)] bg-clip-text text-transparent">
                                            <AnimatedCounter target={m.value} suffix={m.suffix} />
                                        </div>
                                        <div className="text-xs text-[var(--color-text-muted)]">{m.label}</div>
                                    </div>
                                ))}
                            </div>

                            <blockquote className="text-sm text-[var(--color-text-secondary)] leading-relaxed border-l-2 border-[var(--color-accent)]/30 pl-4 italic">
                                &ldquo;{cs.quote}&rdquo;
                            </blockquote>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
