"use client";

import { useState, useEffect, useRef } from "react";
import { siteConfig } from "@/site.config";
import LucideIcon from "./LucideIcon";
import SectionHeader from "./SectionHeader";

const layout = siteConfig.design?.layout || "centered";
const cardRadius = layout === "editorial" ? "rounded-xl" : layout === "minimal" ? "rounded-lg" : "rounded-2xl";

/* ═══════════════════════════════════════════
   CENTERED — alternating left/right cards
   ═══════════════════════════════════════════ */
function ProcessCentered({ data }) {
    const [vis, setVis] = useState([]);
    const refs = useRef([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const idx = refs.current.indexOf(entry.target);
                    if (idx !== -1) setVis((prev) => [...new Set([...prev, idx])]);
                }
            }),
            { threshold: 0.3 }
        );
        refs.current.forEach((el) => el && observer.observe(el));
        return () => observer.disconnect();
    }, []);

    return (
        <div className="relative max-w-[900px] mx-auto">
            {/* Center line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[var(--color-accent)] via-[var(--color-accent)]/40 to-transparent hidden md:block" />

            <div className="space-y-16 md:space-y-0">
                {data.steps.map((step, i) => {
                    const isLeft = i % 2 === 0;
                    return (
                        <div
                            key={i}
                            ref={(el) => (refs.current[i] = el)}
                            className={`relative md:flex md:items-center md:py-8 ${vis.includes(i) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                            style={{ transition: "all 0.6s ease-out", transitionDelay: `${i * 200}ms` }}
                        >
                            {/* Step number */}
                            <div className="absolute left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[var(--color-bg-primary)] border-2 border-[var(--color-accent)] flex items-center justify-center z-10 hidden md:flex">
                                <span className="text-[var(--color-accent)] font-bold text-sm">{String(i + 1).padStart(2, "0")}</span>
                            </div>

                            {/* Content card */}
                            <div className={`md:w-[45%] ${isLeft ? "md:mr-auto md:pr-12 md:text-right" : "md:ml-auto md:pl-12"}`}>
                                <div className={`bg-[var(--color-bg-card)] border border-[var(--color-border-default)] ${cardRadius} p-6 hover:border-[var(--color-accent)]/30 transition-all duration-300`}>
                                    <div className={`flex items-center gap-3 mb-3 ${isLeft ? "md:flex-row-reverse" : ""}`}>
                                        <div className="w-10 h-10 rounded-xl bg-[var(--color-accent)]/10 flex items-center justify-center">
                                            <LucideIcon name={step.icon} size={20} className="text-[var(--color-accent)]" />
                                        </div>
                                        <h3 className="text-lg font-bold text-[var(--color-text-primary)]">{step.title}</h3>
                                    </div>
                                    <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{step.description}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════
   EDITORIAL — horizontal 3-col timeline
   ═══════════════════════════════════════════ */
function ProcessEditorial({ data }) {
    return (
        <div className="relative">
            {/* Timeline line */}
            <div className="hidden md:block absolute top-6 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-accent)]/40 to-transparent" />

            <div className="grid md:grid-cols-3 gap-8">
                {data.steps.map((step, i) => (
                    <div key={i} className="relative pt-12">
                        {/* Number circle */}
                        <div className="absolute top-0 left-4 w-12 h-12 rounded-full border-2 border-[var(--color-accent)]/40 bg-[var(--color-bg-primary)] flex items-center justify-center">
                            <span className="text-[var(--color-accent)] font-bold text-lg">{String(i + 1).padStart(2, "0")}</span>
                        </div>

                        <div className={`bg-[var(--color-bg-card)] border border-[var(--color-border-default)] rounded-xl p-6 mt-2 hover:border-[var(--color-accent)]/30 transition-all duration-300`}>
                            <div className="flex items-center gap-3 mb-3">
                                <LucideIcon name={step.icon} size={20} className="text-[var(--color-accent)]" />
                                <h3 className="text-base font-bold text-[var(--color-text-primary)]">{step.title}</h3>
                            </div>
                            <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{step.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════
   MINIMAL — numbered list, no line
   ═══════════════════════════════════════════ */
function ProcessMinimal({ data }) {
    return (
        <div className="max-w-[700px] space-y-8">
            {data.steps.map((step, i) => (
                <div key={i} className="flex gap-6 items-start">
                    <span className="text-3xl font-bold text-[var(--color-accent)]/30 shrink-0 leading-none mt-1">{String(i + 1).padStart(2, "0")}</span>
                    <div>
                        <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-1">{step.title}</h3>
                        <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{step.description}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default function Process() {
    const { process: data } = siteConfig;

    return (
        <section className="py-24 px-6 bg-[var(--color-bg-surface)]/30">
            <div className="max-w-[1200px] mx-auto">
                <SectionHeader
                    eyebrow={data.eyebrow}
                    headline={data.headline}
                    highlightedText={data.highlightedText}
                    subtitle={data.subtitle}
                />
                {layout === "editorial" ? <ProcessEditorial data={data} />
                    : layout === "minimal" ? <ProcessMinimal data={data} />
                        : <ProcessCentered data={data} />}
            </div>
        </section>
    );
}
