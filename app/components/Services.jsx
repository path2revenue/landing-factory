"use client";

import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/site.config";

export default function Services() {
    const { services: data } = siteConfig;
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
        <section id="services" className="py-24 px-6 bg-[var(--color-bg-surface)]/30">
            <div className="max-w-[1200px] mx-auto">
                <div className="text-center mb-16">
                    <span className="text-xs uppercase tracking-[0.2em] text-[var(--color-accent)] font-semibold">{data.eyebrow}</span>
                    <h2 className="text-3xl md:text-5xl font-bold mt-3 mb-4">
                        {data.headline}{" "}
                        <span className="bg-gradient-to-r from-[var(--color-gradient-from)] to-[var(--color-gradient-to)] bg-clip-text text-transparent">{data.highlightedText}</span>{" "}
                        {data.headlineEnd}
                    </h2>
                    <p className="text-[var(--color-text-secondary)] max-w-[600px] mx-auto">{data.subtitle}</p>
                </div>

                <div className="grid md:grid-cols-4 gap-5">
                    {data.items.map((svc, i) => (
                        <div
                            key={i}
                            ref={(el) => (refs.current[i] = el)}
                            className={`relative bg-[var(--color-bg-card)] border border-[var(--color-border-default)] rounded-2xl p-6 hover:border-[var(--color-accent)]/40 hover:-translate-y-1 transition-all duration-500 group ${svc.span === 2 ? "md:col-span-2" : ""
                                } ${visibleCards.includes(i) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                            style={{ transitionDelay: `${i * 100}ms` }}
                        >
                            <div className="text-3xl mb-3">{svc.icon}</div>
                            <h3 className="text-base font-bold text-[var(--color-text-primary)] mb-2">{svc.title}</h3>
                            <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{svc.description}</p>
                            {svc.badge && (
                                <span className="inline-block mt-3 text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-[var(--color-cta)]/10 border border-[var(--color-cta)]/20 text-[var(--color-cta)]">
                                    {svc.badge}
                                </span>
                            )}
                            {/* Hover glow */}
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[var(--color-accent)]/0 to-[var(--color-accent)]/0 group-hover:from-[var(--color-accent)]/[0.03] group-hover:to-transparent transition-all duration-500 pointer-events-none" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
