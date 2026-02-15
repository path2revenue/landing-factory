"use client";

import { useState, useEffect, useRef } from "react";

export default function VideoTestimonials({ config }) {
    const videos = config?.videoTestimonials?.items || [
        {
            name: "Immo Éthique Formation",
            role: "Formation immobilière",
            videoId: "8FSJQjU9j-I",
            summary: "8.6K encaissés, 90 présents, +30 RDVs qualifiés en un seul webinaire.",
            highlight: "8.6K encaissés",
        },
        {
            name: "MVDProduction",
            role: "Vidéaste professionnel",
            videoId: "SPCEnm_h1ZM",
            summary: "De petits contrats à plus de 15K générés grâce à un système d'acquisition complet.",
            highlight: "+15K générés",
        },
        {
            name: "Hana Events",
            role: "Système commercial & marketing",
            videoId: "S8qzw3fKiZw",
            summary: "188€ investis en publicité, 1200€ de CA. Système marketing et commercial mis en place.",
            highlight: "ROI 538%",
        },
        {
            name: "HighLevel Mentorat",
            role: "Coaching haut de gamme",
            videoId: "-juqTMLVlhs",
            summary: "Accompagnement marketing et commercial pour un programme de mentorat haut de gamme.",
            highlight: "100K+ CA",
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
        <section className="py-24 px-6 bg-[var(--color-bg-primary)]/80">
            <div className="max-w-[1200px] mx-auto">
                <div className="text-center mb-16">
                    <span className="text-xs uppercase tracking-[0.2em] text-[var(--color-accent)] font-semibold">
                        {config?.videoTestimonials?.eyebrow || "Témoignages Vidéo"}
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold mt-3 mb-4">
                        {config?.videoTestimonials?.titleBefore || "Les Résultats de "}
                        <span className="bg-gradient-to-r from-[var(--color-gradient-from)] to-[var(--color-gradient-to)] bg-clip-text text-transparent">
                            {config?.videoTestimonials?.titleHighlight || "Nos Clients"}
                        </span>
                        {config?.videoTestimonials?.titleAfter ?? " en Vidéo"}
                    </h2>
                    <p className="text-[var(--color-text-secondary)] max-w-[700px] mx-auto">
                        {config?.videoTestimonials?.subtitle || "Des témoignages authentiques. Des résultats vérifiables sur la page LinkedIn d'Ahmed."}
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {videos.map((vid, i) => (
                        <div
                            key={i}
                            ref={(el) => (refs.current[i] = el)}
                            className={`group bg-[var(--color-bg-surface)] border border-[var(--color-border-default)] rounded-2xl overflow-hidden hover:border-[var(--color-accent)]/40 transition-all duration-500 ${visibleCards.includes(i)
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-8"
                                }`}
                            style={{ transitionDelay: `${i * 150}ms` }}
                        >
                            {/* YouTube Embed */}
                            <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
                                <iframe
                                    src={`https://www.youtube.com/embed/${vid.videoId}?rel=0&modestbranding=1`}
                                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
                                    allow="fullscreen; picture-in-picture; accelerometer; encrypted-media; gyroscope"
                                    allowFullScreen
                                    title={vid.name}
                                />
                            </div>

                            {/* Info */}
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-2">
                                    <div>
                                        <h3 className="font-bold text-[var(--color-text-primary)]">{vid.name}</h3>
                                        <p className="text-xs text-[var(--color-accent)]">{vid.role}</p>
                                    </div>
                                    <span className="px-2 py-0.5 bg-[var(--color-cta)]/15 border border-[var(--color-cta)]/40 rounded text-xs text-[var(--color-cta)] font-semibold">
                                        {vid.highlight}
                                    </span>
                                </div>
                                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{vid.summary}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
