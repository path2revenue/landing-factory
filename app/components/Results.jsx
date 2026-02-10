"use client";

import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/site.config";
import LucideIcon from "./LucideIcon";
import SectionHeader from "./SectionHeader";

const layout = siteConfig.design?.layout || "centered";
const cardRadius = layout === "editorial" ? "rounded-xl" : layout === "minimal" ? "rounded-lg" : "rounded-2xl";
const gridCols = layout === "editorial" ? "sm:grid-cols-2" : layout === "minimal" ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-4";
const badgeRadius = layout === "editorial" ? "rounded-md" : "rounded-full";

export default function Results() {
    const { results: data } = siteConfig;
    const [visible, setVisible] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setVisible(true); },
            { threshold: 0.2 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section id="resultats" ref={sectionRef} className="py-24 px-6">
            <div className="max-w-[1200px] mx-auto">
                <SectionHeader
                    eyebrow={data.eyebrow}
                    headline={data.headline}
                    highlightedText={data.highlightedText}
                    subtitle={data.subtitle}
                />

                <div className={`grid ${gridCols} gap-6`}>
                    {data.items.map((item, i) => (
                        <div
                            key={i}
                            className={`bg-[var(--color-bg-surface)] border border-[var(--color-border-default)] ${cardRadius} p-6 shadow-sm hover:shadow-md hover:border-[var(--color-accent)]/30 transition-all duration-300 cursor-pointer ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                                } ${layout === "centered" ? "text-center" : ""}`}
                            style={{ transitionDelay: `${i * 150}ms` }}
                        >
                            {layout === "editorial" || layout === "minimal" ? (
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-lg bg-[var(--color-accent)]/10 flex items-center justify-center shrink-0">
                                        <LucideIcon name={item.metric} size={24} className="text-[var(--color-accent)]" />
                                    </div>
                                    <div>
                                        <div className="text-base font-semibold text-[var(--color-text-primary)] mb-1">{item.label}</div>
                                        <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{item.description}</p>
                                        {item.badge && (
                                            <span className={`inline-block mt-3 text-[10px] uppercase tracking-wider px-2 py-0.5 ${badgeRadius} border border-[var(--color-accent)]/20 text-[var(--color-accent-light)]`}>
                                                {item.badge}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className="w-12 h-12 rounded-xl bg-[var(--color-accent)]/10 flex items-center justify-center mx-auto mb-3">
                                        <LucideIcon name={item.metric} size={24} className="text-[var(--color-accent)]" />
                                    </div>
                                    <div className="text-sm font-semibold text-[var(--color-text-primary)] mb-1">{item.label}</div>
                                    <p className="text-xs text-[var(--color-text-muted)]">{item.description}</p>
                                    {item.badge && (
                                        <span className={`inline-block mt-3 text-[10px] uppercase tracking-wider px-2 py-0.5 ${badgeRadius} border border-[var(--color-accent)]/20 text-[var(--color-accent-light)]`}>
                                            {item.badge}
                                        </span>
                                    )}
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
