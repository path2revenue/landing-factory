"use client";

import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/site.config";
import SectionHeader from "./SectionHeader";

const layout = siteConfig.design?.layout || "centered";
const cardRadius = layout === "editorial" ? "rounded-xl" : layout === "minimal" ? "rounded-lg" : "rounded-2xl";
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

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {data.items.map((item, i) => (
                        <div
                            key={i}
                            className={`relative bg-[var(--color-bg-surface)] border border-[var(--color-border-default)] ${cardRadius} p-6 hover:border-[var(--color-accent)]/30 transition-all duration-500 group ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                            style={{ transitionDelay: `${i * 100}ms` }}
                        >
                            {/* Metric callout */}
                            <div className="flex items-center gap-3 mb-4">
                                <span className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-[var(--color-gradient-from)] to-[var(--color-gradient-to)] bg-clip-text text-transparent">
                                    {item.metric}
                                </span>
                                {item.badge && (
                                    <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 ${badgeRadius} bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/20 text-[var(--color-accent-light)] font-medium`}>
                                        {item.badge}
                                    </span>
                                )}
                            </div>

                            {/* Label */}
                            <h3 className="text-base font-bold text-[var(--color-text-primary)] mb-2 leading-snug">
                                {item.label}
                            </h3>

                            {/* Description */}
                            <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                                {item.description}
                            </p>

                            {/* Hover glow */}
                            <div className="absolute inset-0 rounded-2xl bg-[var(--color-accent)]/0 group-hover:bg-[var(--color-accent)]/[0.02] transition-colors duration-300 pointer-events-none" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
