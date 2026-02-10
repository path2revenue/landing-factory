"use client";

import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/site.config";

export default function Process() {
    const { process: data } = siteConfig;
    const [visible, setVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.2 });
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section ref={ref} className="py-24 px-6">
            <div className="max-w-[1200px] mx-auto">
                <div className="text-center mb-16">
                    <span className="text-xs uppercase tracking-[0.2em] text-[var(--color-accent)] font-semibold">{data.eyebrow}</span>
                    <h2 className="text-3xl md:text-5xl font-bold mt-3">
                        {data.headline}{" "}
                        <span className="bg-gradient-to-r from-[var(--color-gradient-from)] to-[var(--color-gradient-to)] bg-clip-text text-transparent">{data.highlightedText}</span>
                    </h2>
                </div>

                <div className="relative">
                    {/* Vertical line */}
                    <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[var(--color-accent)]/60 via-[var(--color-accent)]/20 to-transparent" />

                    <div className="space-y-12 md:space-y-16">
                        {data.steps.map((step, i) => {
                            const isLeft = i % 2 === 0;
                            return (
                                <div
                                    key={i}
                                    className={`relative flex flex-col md:flex-row items-center gap-6 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                                        } ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}
                                    style={{ transitionDelay: `${i * 200}ms` }}
                                >
                                    {/* Content */}
                                    <div className={`flex-1 bg-[var(--color-bg-surface)] border border-[var(--color-border-default)] rounded-2xl p-6 md:p-8 ${isLeft ? "md:text-right" : "md:text-left"}`}>
                                        <span className="text-sm font-mono text-[var(--color-accent)] mb-2 block">{step.number}</span>
                                        <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-2">{step.title}</h3>
                                        <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{step.description}</p>
                                    </div>

                                    {/* Circle on line */}
                                    <div className="hidden md:flex w-12 h-12 rounded-full border-2 border-[var(--color-accent)] bg-[var(--color-bg-primary)] items-center justify-center text-sm font-bold text-[var(--color-accent)] shrink-0 z-10">
                                        {step.number}
                                    </div>

                                    {/* Spacer for opposite side */}
                                    <div className="hidden md:block flex-1" />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
