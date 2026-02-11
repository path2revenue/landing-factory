"use client";

import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/site.config";
import LucideIcon from "./LucideIcon";
import SectionHeader from "./SectionHeader";

const layout = siteConfig.design?.layout || "centered";
const cardRadius = layout === "editorial" ? "rounded-xl" : layout === "minimal" ? "rounded-lg" : "rounded-2xl";
const gridCols = layout === "editorial" ? "md:grid-cols-2" : layout === "minimal" ? "md:grid-cols-2 lg:grid-cols-3" : "md:grid-cols-2 lg:grid-cols-3";
const badgeRadius = layout === "editorial" ? "rounded-md" : "rounded-full";

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
                <SectionHeader
                    eyebrow={data.eyebrow}
                    headline={data.headline}
                    highlightedText={data.highlightedText}
                    headlineEnd={data.headlineEnd}
                    subtitle={data.subtitle}
                />

                <div className={`grid ${gridCols} gap-6`}>
                    {data.items.map((svc, i) => (
                        <div
                            key={i}
                            ref={(el) => (refs.current[i] = el)}
                            className={`relative bg-[var(--color-bg-card)] border border-[var(--color-border-default)] ${cardRadius} p-6 shadow-sm hover:shadow-md hover:border-[var(--color-accent)]/40 transition-all duration-300 cursor-pointer group ${svc.span === 2 && layout === "centered" ? "md:col-span-2" : ""
                                } ${visibleCards.includes(i) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                            style={{ transitionDelay: `${i * 100}ms` }}
                        >
                            {layout === "editorial" ? (
                                /* ─ Editorial: horizontal icon + text ─ */
                                <div className="flex items-start gap-4">
                                    <div className="w-11 h-11 rounded-lg bg-[var(--color-accent)]/10 flex items-center justify-center shrink-0">
                                        <LucideIcon name={svc.icon} size={20} className="text-[var(--color-accent)]" />
                                    </div>
                                    <div>
                                        <h3 className="text-base font-bold text-[var(--color-text-primary)] mb-1.5">{svc.title}</h3>
                                        <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{svc.description}</p>
                                        {svc.badge && (
                                            <span className={`inline-block mt-3 text-[10px] uppercase tracking-wider px-2 py-0.5 ${badgeRadius} bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/20 text-[var(--color-accent)]`}>
                                                {svc.badge}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                /* ─ Centered / Minimal: icon on top ─ */
                                <>
                                    <div className="w-10 h-10 rounded-xl bg-[var(--color-accent)]/10 flex items-center justify-center mb-3">
                                        <LucideIcon name={svc.icon} size={20} className="text-[var(--color-accent)]" />
                                    </div>
                                    <h3 className="text-sm font-bold text-[var(--color-text-primary)] mb-1">{svc.title}</h3>
                                    <p className="text-xs text-[var(--color-text-secondary)]">{svc.description}</p>
                                    {svc.badge && (
                                        <span className={`inline-block mt-3 text-[10px] uppercase tracking-wider px-2 py-0.5 ${badgeRadius} bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/20 text-[var(--color-accent)]`}>
                                            {svc.badge}
                                        </span>
                                    )}
                                </>
                            )}
                            <div className="absolute inset-0 rounded-xl bg-[var(--color-accent)]/0 group-hover:bg-[var(--color-accent)]/[0.02] transition-colors duration-300 pointer-events-none" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
