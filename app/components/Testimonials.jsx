"use client";

import { useState, useRef, useEffect, useCallback } from "react";

export default function Testimonials({ config }) {
    const items = config?.testimonials?.items || [
        { name: "Ahmed K.", role: "CEO, Agence Digitale", quote: "Le système a transformé notre acquisition client. On est passé de 5 à 25 appels qualifiés par semaine en 3 mois.", rating: 5 },
        { name: "Sarah L.", role: "Coach Business", quote: "Enfin un partenaire qui comprend l'acquisition B2B. Les résultats parlent d'eux-mêmes : 3x notre CA en 6 mois.", rating: 5 },
        { name: "Mehdi B.", role: "Fondateur, SaaS", quote: "L'approche est chirurgicale. Chaque euro investi est tracé et optimisé. On sait exactement ce qui fonctionne.", rating: 5 },
        { name: "Julie D.", role: "Formatrice", quote: "De 0 à 8.6K€ en un seul webinaire. Le ROI est hallucinant. Et surtout, c'est reproductible.", rating: 5 },
        { name: "Karim R.", role: "Agent Immobilier", quote: "Ils ont construit tout le système de A à Z. Landing pages, pubs, CRM, relances. Je n'ai qu'à closer.", rating: 5 },
    ];

    const [current, setCurrent] = useState(0);
    const [touchStart, setTouchStart] = useState(0);
    const intervalRef = useRef(null);

    const next = useCallback(() => setCurrent((c) => (c + 1) % items.length), [items.length]);
    const prev = useCallback(() => setCurrent((c) => (c - 1 + items.length) % items.length), [items.length]);

    useEffect(() => {
        intervalRef.current = setInterval(next, 5000);
        return () => clearInterval(intervalRef.current);
    }, [next]);

    const handleTouchStart = (e) => setTouchStart(e.touches[0].clientX);
    const handleTouchEnd = (e) => {
        const diff = touchStart - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) {
            clearInterval(intervalRef.current);
            diff > 0 ? next() : prev();
        }
    };

    return (
        <section id="temoignages" className="py-24 px-6 bg-[var(--color-bg-primary)]/80">
            <div className="max-w-[700px] mx-auto">
                <div className="text-center mb-12">
                    <span className="text-xs uppercase tracking-[0.2em] text-[var(--color-accent)] font-semibold">
                        {config?.testimonials?.eyebrow || "Témoignages"}
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold mt-3">
                        {config?.testimonials?.titleBefore || "Ce Que Disent "}
                        <span className="bg-gradient-to-r from-[var(--color-gradient-from)] to-[var(--color-gradient-to)] bg-clip-text text-transparent">
                            {config?.testimonials?.titleHighlight || "Nos Clients"}
                        </span>
                    </h2>
                </div>

                {/* Carousel */}
                <div
                    className="relative bg-[var(--color-bg-surface)] border border-[var(--color-border-default)] rounded-2xl p-8 md:p-12 min-h-[240px]"
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                >
                    {/* Arrows */}
                    <button onClick={() => { clearInterval(intervalRef.current); prev(); }} className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[var(--color-bg-card)] border border-[var(--color-border-default)] flex items-center justify-center text-[var(--color-text-secondary)] hover:text-white hover:border-[var(--color-accent)] transition-all cursor-pointer">
                        ←
                    </button>
                    <button onClick={() => { clearInterval(intervalRef.current); next(); }} className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[var(--color-bg-card)] border border-[var(--color-border-default)] flex items-center justify-center text-[var(--color-text-secondary)] hover:text-white hover:border-[var(--color-accent)] transition-all cursor-pointer">
                        →
                    </button>

                    {/* Content */}
                    <div className="text-center px-8">
                        <div className="text-[var(--color-cta)] text-lg mb-4">{"★".repeat(items[current].rating || 5)}</div>
                        <blockquote className="text-lg md:text-xl text-[var(--color-text-primary)] leading-relaxed mb-6 italic transition-all duration-300">
                            &ldquo;{items[current].quote}&rdquo;
                        </blockquote>
                        <div>
                            <p className="font-bold text-[var(--color-text-primary)]">{items[current].name}</p>
                            <p className="text-sm text-[var(--color-accent)]">{items[current].role}</p>
                        </div>
                    </div>
                </div>

                {/* Dots */}
                <div className="flex items-center justify-center gap-2 mt-6">
                    {items.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => { clearInterval(intervalRef.current); setCurrent(i); }}
                            className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${i === current ? "w-6 bg-[var(--color-accent)]" : "bg-[var(--color-border-hover)]"}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
