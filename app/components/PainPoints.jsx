"use client";

import { useState, useEffect, useRef } from "react";
import { siteConfig } from "@/site.config";
import LucideIcon from "./LucideIcon";
import SectionHeader from "./SectionHeader";

const layout = siteConfig.design?.layout || "centered";
const cardRadius = layout === "editorial" ? "rounded-xl" : layout === "minimal" ? "rounded-lg" : "rounded-2xl";
const gridCols = layout === "editorial" ? "md:grid-cols-2" : "md:grid-cols-2";
const badgeRadius = layout === "editorial" ? "rounded-md" : "rounded-full";

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
                <SectionHeader
                    eyebrow={data.eyebrow}
                    headline={data.headline}
                    highlightedText={data.highlightedText}
                    subtitle={data.subtitle}
                    accentColor="var(--color-danger)"
                    gradient={false}
                />

                <div className={`grid ${gridCols} gap-6`}>
                    {data.items.map((pain, i) => (
                        <div
                            key={i}
                            ref={(el) => (refs.current[i] = el)}
                            className={`relative bg-[var(--color-bg-surface)] border border-[var(--color-border-default)] ${cardRadius} p-7 hover:border-[var(--color-danger)]/30 transition-all duration-300 cursor-pointer group ${visibleCards.includes(i) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                                }`}
                            style={{ transitionDelay: `${i * 150}ms` }}
                        >
                            {layout === "editorial" || layout === "minimal" ? (
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-[var(--color-danger)]/10 flex items-center justify-center shrink-0">
                                        <LucideIcon name={pain.icon} size={20} className="text-[var(--color-danger)]" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-2 leading-snug">{pain.title}</h3>
                                        <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-3">{pain.description}</p>
                                        <div className={`inline-block px-3 py-1 bg-[var(--color-danger)]/10 border border-[var(--color-danger)]/20 ${badgeRadius} text-xs text-[var(--color-danger)] font-medium`}>
                                            {pain.stat}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className="w-10 h-10 rounded-xl bg-[var(--color-danger)]/10 flex items-center justify-center mb-4">
                                        <LucideIcon name={pain.icon} size={20} className="text-[var(--color-danger)]" />
                                    </div>
                                    <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-3 leading-snug">{pain.title}</h3>
                                    <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-4">{pain.description}</p>
                                    <div className={`inline-block px-3 py-1 bg-[var(--color-danger)]/10 border border-[var(--color-danger)]/20 ${badgeRadius} text-xs text-[var(--color-danger)] font-medium`}>
                                        {pain.stat}
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
