"use client";

import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/site.config";

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
                <div className="text-center mb-16">
                    <span className="text-xs uppercase tracking-[0.2em] text-[var(--color-accent)] font-semibold">{data.eyebrow}</span>
                    <h2 className="text-3xl md:text-5xl font-bold mt-3">
                        {data.headline}{" "}
                        <span className="bg-gradient-to-r from-[var(--color-gradient-from)] to-[var(--color-gradient-to)] bg-clip-text text-transparent">
                            {data.highlightedText}
                        </span>
                    </h2>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {data.items.map((item, i) => (
                        <div
                            key={i}
                            className={`bg-[var(--color-bg-surface)] border border-[var(--color-border-default)] rounded-2xl p-6 text-center hover:border-[var(--color-accent)]/30 hover:-translate-y-1 transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                                }`}
                            style={{ transitionDelay: `${i * 150}ms` }}
                        >
                            <div className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-[var(--color-gradient-from)] to-[var(--color-gradient-to)] bg-clip-text text-transparent mb-2">
                                {item.metric}
                            </div>
                            <div className="text-sm font-semibold text-[var(--color-text-primary)] mb-1">{item.label}</div>
                            <p className="text-xs text-[var(--color-text-muted)]">{item.description}</p>
                            {item.badge && (
                                <span className="inline-block mt-3 text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full border border-[var(--color-accent)]/20 text-[var(--color-accent-light)]">
                                    {item.badge}
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
