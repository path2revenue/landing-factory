"use client";

import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/site.config";

export default function Honesty() {
    const { honesty: data } = siteConfig;
    const [visible, setVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.2 });
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    if (!data) return null;

    return (
        <section ref={ref} className="py-24 px-6">
            <div className={`max-w-[800px] mx-auto transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                <div className="text-center mb-12">
                    <span className="text-xs uppercase tracking-[0.2em] text-[var(--color-accent)] font-semibold">{data.eyebrow}</span>
                    <h2 className="text-3xl md:text-5xl font-bold mt-3">
                        {data.headline}{" "}
                        <span className="bg-gradient-to-r from-[var(--color-gradient-from)] to-[var(--color-gradient-to)] bg-clip-text text-transparent">{data.highlightedText}</span>
                    </h2>
                </div>

                <div className="bg-[var(--color-bg-surface)] border border-[var(--color-border-default)] rounded-2xl p-8 md:p-12 space-y-6">
                    {data.paragraphs.map((p, i) => (
                        <p key={i} className="text-[var(--color-text-secondary)] leading-relaxed text-base md:text-lg">
                            {p}
                        </p>
                    ))}
                    {data.signature && (
                        <div className="pt-4 border-t border-[var(--color-border-default)]">
                            <div className="text-sm font-semibold text-[var(--color-text-primary)]">— {data.signature.name}</div>
                            <div className="text-xs text-[var(--color-text-muted)]">{data.signature.role}</div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
