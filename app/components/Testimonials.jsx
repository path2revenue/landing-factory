"use client";

import { useState, useEffect, useRef } from "react";
import { siteConfig } from "@/site.config";
import SectionHeader from "./SectionHeader";

const layout = siteConfig.design?.layout || "centered";
const cardRadius = layout === "editorial" ? "rounded-xl" : layout === "minimal" ? "rounded-lg" : "rounded-2xl";

/* ═══════════════════════════════════════════
   CENTERED — card grid with navigation arrows
   ═══════════════════════════════════════════ */
function TestimonialsCentered({ data }) {
    const [page, setPage] = useState(0);
    const perPage = 3;
    const pages = Math.ceil(data.items.length / perPage);
    const items = data.items.slice(page * perPage, page * perPage + perPage);

    return (
        <>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
                {items.map((t, i) => (
                    <div key={i} className={`bg-[var(--color-bg-card)] border border-[var(--color-border-default)] ${cardRadius} p-6 shadow-sm`}>
                        <div className="flex items-center gap-1 mb-3">
                            {Array.from({ length: 5 }).map((_, j) => (
                                <svg key={j} className="w-4 h-4 text-[var(--color-accent)]" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            ))}
                        </div>
                        <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed italic mb-4">&quot;{t.text}&quot;</p>
                        <div className="flex items-center gap-3 pt-3 border-t border-[var(--color-border-default)]">
                            <div className="w-8 h-8 rounded-full bg-[var(--color-accent)]/20 flex items-center justify-center text-xs font-bold text-[var(--color-accent)]">
                                {t.name.charAt(0)}
                            </div>
                            <div>
                                <div className="text-xs font-semibold text-[var(--color-text-primary)]">{t.name}</div>
                                <div className="text-[10px] text-[var(--color-text-muted)]">{t.role}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {pages > 1 && (
                <div className="flex justify-center gap-3">
                    <button onClick={() => setPage((p) => Math.max(0, p - 1))} className="w-10 h-10 rounded-full border border-[var(--color-border-default)] flex items-center justify-center text-[var(--color-text-secondary)] hover:border-[var(--color-accent)] transition cursor-pointer" aria-label="Précédent">←</button>
                    <button onClick={() => setPage((p) => Math.min(pages - 1, p + 1))} className="w-10 h-10 rounded-full border border-[var(--color-border-default)] flex items-center justify-center text-[var(--color-text-secondary)] hover:border-[var(--color-accent)] transition cursor-pointer" aria-label="Suivant">→</button>
                </div>
            )}
        </>
    );
}

/* ═══════════════════════════════════════════
   EDITORIAL — large single quote with dots
   ═══════════════════════════════════════════ */
function TestimonialsEditorial({ data }) {
    const [active, setActive] = useState(0);
    const t = data.items[active];

    useEffect(() => {
        const timer = setInterval(() => setActive((a) => (a + 1) % data.items.length), 8000);
        return () => clearInterval(timer);
    }, [data.items.length]);

    return (
        <div className="max-w-[700px]">
            <div className={`bg-[var(--color-bg-card)] border border-[var(--color-border-default)] rounded-xl p-8 md:p-10 relative`}>
                <span className="absolute top-4 left-6 text-5xl text-[var(--color-accent)]/20 font-serif leading-none select-none">"</span>
                <p className="text-lg text-[var(--color-text-secondary)] italic leading-relaxed mt-6 mb-6">&quot;{t.text}&quot;</p>
                <div className="flex items-center gap-3 pt-4 border-t border-[var(--color-border-default)]">
                    <div className="w-10 h-10 rounded-full bg-[var(--color-accent)]/20 flex items-center justify-center text-sm font-bold text-[var(--color-accent)]">
                        {t.name.charAt(0)}
                    </div>
                    <div>
                        <div className="text-sm font-semibold text-[var(--color-text-primary)]">{t.name}</div>
                        <div className="text-xs text-[var(--color-text-muted)]">{t.role}</div>
                    </div>
                </div>
            </div>
            <div className="flex gap-2 mt-6">
                {data.items.map((_, i) => (
                    <button key={i} onClick={() => setActive(i)} className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${active === i ? "w-8 bg-[var(--color-accent)]" : "w-3 bg-[var(--color-border-default)]"}`} />
                ))}
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════
   MINIMAL — stacked quotes, no pagination
   ═══════════════════════════════════════════ */
function TestimonialsMinimal({ data }) {
    return (
        <div className="max-w-[650px] space-y-8">
            {data.items.slice(0, 3).map((t, i) => (
                <div key={i} className="border-l-2 border-[var(--color-accent)]/30 pl-6">
                    <p className="text-base text-[var(--color-text-secondary)] italic leading-relaxed mb-3">&quot;{t.text}&quot;</p>
                    <div className="text-xs text-[var(--color-text-muted)]">— <span className="text-[var(--color-text-primary)] font-medium">{t.name}</span>, {t.role}</div>
                </div>
            ))}
        </div>
    );
}

export default function Testimonials() {
    const { testimonials: data } = siteConfig;

    return (
        <section className="py-24 px-6 bg-[var(--color-bg-surface)]/30">
            <div className="max-w-[1200px] mx-auto">
                <SectionHeader
                    eyebrow={data.eyebrow}
                    headline={data.headline}
                    highlightedText={data.highlightedText}
                    subtitle={data.subtitle}
                />
                {layout === "editorial" ? <TestimonialsEditorial data={data} />
                    : layout === "minimal" ? <TestimonialsMinimal data={data} />
                        : <TestimonialsCentered data={data} />}
            </div>
        </section>
    );
}
