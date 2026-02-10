"use client";

import { useState, useEffect, useRef } from "react";
import { siteConfig } from "@/site.config";

export default function PainPoints() {
    const { painPoints: data } = siteConfig;
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
            { threshold: 0.3 }
        );
        refs.current.forEach((el) => el && observer.observe(el));
        return () => observer.disconnect();
    }, []);

    return (
        <section className="py-24 px-6">
            <div className="max-w-[1200px] mx-auto">
                <div className="text-center mb-16">
                    <span className="text-xs uppercase tracking-[0.2em] text-[var(--color-danger)] font-semibold">
                        {data.eyebrow}
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold mt-3 mb-4">
                        {data.headline}{" "}
                        <span className="text-[var(--color-danger)]">{data.highlightedText}</span> ?
                    </h2>
                    <p className="text-[var(--color-text-secondary)] max-w-[600px] mx-auto">{data.subtitle}</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {data.items.map((pain, i) => (
                        <div
                            key={i}
                            ref={(el) => (refs.current[i] = el)}
                            className={`relative bg-[var(--color-bg-surface)] border border-[var(--color-border-default)] rounded-2xl p-8 hover:border-[var(--color-danger)]/30 transition-all duration-600 group ${visibleCards.includes(i) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                                }`}
                            style={{ transitionDelay: `${i * 200}ms` }}
                        >
                            <div className="text-4xl mb-4">{pain.icon}</div>
                            <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-3 leading-snug">{pain.title}</h3>
                            <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-4">{pain.description}</p>
                            <div className="inline-block px-3 py-1 bg-[var(--color-danger)]/10 border border-[var(--color-danger)]/20 rounded-full text-xs text-[var(--color-danger)] font-medium">
                                {pain.stat}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
