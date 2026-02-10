"use client";

import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/site.config";

export default function Testimonials() {
    const { testimonials: data } = siteConfig;
    const [current, setCurrent] = useState(0);
    const [visible, setVisible] = useState(false);
    const [autoplay, setAutoplay] = useState(true);
    const ref = useRef(null);
    const items = data.items;
    const total = items.length;

    useEffect(() => {
        const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.2 });
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!autoplay) return;
        const interval = setInterval(() => setCurrent((p) => (p + 1) % total), 6000);
        return () => clearInterval(interval);
    }, [autoplay, total]);

    const goTo = (i) => { setCurrent(i); setAutoplay(false); setTimeout(() => setAutoplay(true), 15000); };

    return (
        <section id="temoignages" ref={ref} className="py-24 px-6 bg-[var(--color-bg-surface)]/30">
            <div className={`max-w-[800px] mx-auto transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                <div className="text-center mb-12">
                    <span className="text-xs uppercase tracking-[0.2em] text-[var(--color-accent)] font-semibold">{data.eyebrow}</span>
                    <h2 className="text-3xl md:text-5xl font-bold mt-3">
                        {data.headline}{" "}
                        <span className="bg-gradient-to-r from-[var(--color-gradient-from)] to-[var(--color-gradient-to)] bg-clip-text text-transparent">{data.highlightedText}</span>{" "}
                        {data.headlineEnd}
                    </h2>
                </div>

                {/* Card */}
                <div className="relative bg-[var(--color-bg-card)] border border-[var(--color-border-default)] rounded-2xl p-8 md:p-10 min-h-[260px] overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl" style={{ background: items[current].color }} />
                    <div className="text-lg text-[var(--color-cta)] mb-4">{"★".repeat(items[current].stars)}</div>
                    <p className="text-lg md:text-xl text-[var(--color-text-primary)] italic leading-relaxed mb-6">
                        &ldquo;{items[current].quote}&rdquo;
                    </p>
                    <div>
                        <div className="text-sm font-semibold text-[var(--color-text-primary)]">{items[current].name}</div>
                        <div className="text-xs text-[var(--color-text-muted)]">{items[current].role}</div>
                    </div>
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-center gap-4 mt-6">
                    <button
                        onClick={() => goTo((current - 1 + total) % total)}
                        className="w-10 h-10 rounded-full border border-[var(--color-border-hover)] text-[var(--color-text-secondary)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors flex items-center justify-center"
                        aria-label="Previous testimonial"
                    >
                        ←
                    </button>
                    <div className="flex gap-2">
                        {items.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => goTo(i)}
                                className={`w-2.5 h-2.5 rounded-full transition-all ${i === current ? "bg-[var(--color-accent)] scale-125" : "bg-[var(--color-border-hover)]"}`}
                                aria-label={`Go to testimonial ${i + 1}`}
                            />
                        ))}
                    </div>
                    <button
                        onClick={() => goTo((current + 1) % total)}
                        className="w-10 h-10 rounded-full border border-[var(--color-border-hover)] text-[var(--color-text-secondary)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors flex items-center justify-center"
                        aria-label="Next testimonial"
                    >
                        →
                    </button>
                </div>
            </div>
        </section>
    );
}
