"use client";

import { useState, useEffect, useRef } from "react";
import { siteConfig } from "@/site.config";
import SectionHeader from "./SectionHeader";

const layout = siteConfig.design?.layout || "centered";
const cardRadius = layout === "editorial" ? "rounded-xl" : layout === "minimal" ? "rounded-lg" : "rounded-2xl";

export default function Process() {
    const { process: data } = siteConfig;
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
        <section id="methode" className="py-24 px-6 bg-[var(--color-bg-surface)]/30">
            <div className="max-w-[1200px] mx-auto">
                <SectionHeader
                    eyebrow={data.eyebrow}
                    headline={data.headline}
                    highlightedText={data.highlightedText}
                    subtitle={data.subtitle}
                />

                {/* Horizontal timeline connector (desktop) */}
                <div className="relative mt-10">
                    <div className="hidden lg:block absolute top-8 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-[var(--color-accent)]/30 to-transparent" />

                    <div className="grid md:grid-cols-3 gap-8">
                        {data.steps.map((step, i) => (
                            <div
                                key={i}
                                ref={(el) => (refs.current[i] = el)}
                                className={`relative ${vis.includes(i) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                                style={{ transition: "all 0.6s ease-out", transitionDelay: `${i * 200}ms` }}
                            >
                                {/* Step number */}
                                <div className="flex items-center gap-4 mb-5">
                                    <div className="w-14 h-14 rounded-2xl bg-[var(--color-bg-primary)] border border-[var(--color-accent)]/30 flex items-center justify-center shrink-0">
                                        <span className="text-xl font-extrabold bg-gradient-to-r from-[var(--color-gradient-from)] to-[var(--color-gradient-to)] bg-clip-text text-transparent">
                                            {step.number || String(i + 1).padStart(2, "0")}
                                        </span>
                                    </div>
                                    <h3 className="text-lg font-bold text-[var(--color-text-primary)] leading-snug">
                                        {step.title}
                                    </h3>
                                </div>

                                {/* Content card */}
                                <div className={`bg-[var(--color-bg-card)] border border-[var(--color-border-default)] ${cardRadius} p-6 hover:border-[var(--color-accent)]/20 transition-all duration-300 h-full`}>
                                    <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
