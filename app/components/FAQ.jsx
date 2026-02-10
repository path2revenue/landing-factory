"use client";

import { useState, useEffect, useRef } from "react";
import { siteConfig } from "@/site.config";

export default function FAQ() {
    const { faq: data } = siteConfig;
    const [open, setOpen] = useState(null);
    const [visible, setVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.2 });
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section id="faq" ref={ref} className="py-24 px-6">
            <div className={`max-w-[800px] mx-auto transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                <div className="text-center mb-16">
                    <span className="text-xs uppercase tracking-[0.2em] text-[var(--color-accent)] font-semibold">{data.eyebrow}</span>
                    <h2 className="text-3xl md:text-5xl font-bold mt-3">
                        {data.headline}{" "}
                        <span className="bg-gradient-to-r from-[var(--color-gradient-from)] to-[var(--color-gradient-to)] bg-clip-text text-transparent">{data.highlightedText}</span>
                    </h2>
                </div>

                <div className="space-y-3">
                    {data.items.map((item, i) => (
                        <div
                            key={i}
                            className="bg-[var(--color-bg-surface)] border border-[var(--color-border-default)] rounded-xl overflow-hidden hover:border-[var(--color-accent)]/30 transition-colors"
                        >
                            <button
                                onClick={() => setOpen(open === i ? null : i)}
                                className="w-full flex items-center justify-between px-6 py-5 text-left"
                            >
                                <span className="text-sm md:text-base font-semibold text-[var(--color-text-primary)] pr-4">{item.q}</span>
                                <span className={`text-[var(--color-accent)] text-xl transition-transform ${open === i ? "rotate-45" : ""}`}>+</span>
                            </button>
                            <div className={`overflow-hidden transition-all duration-300 ${open === i ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}>
                                <p className="px-6 pb-5 text-sm text-[var(--color-text-secondary)] leading-relaxed">{item.a}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
