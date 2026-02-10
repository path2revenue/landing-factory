"use client";

import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/site.config";

const layout = siteConfig.design?.layout || "centered";
const btnRadius = layout === "editorial" ? "rounded-xl" : layout === "minimal" ? "rounded-lg" : "rounded-full";

function resolveHref(href) {
    return href === "__whatsapp__" ? siteConfig.links.whatsapp : href;
}

const WhatsAppIcon = () => (
    <svg className="w-5 h-5 inline-block mr-1" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
);

export default function FinalCTA() {
    const { finalCTA: data } = siteConfig;
    const [visible, setVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.2 });
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section ref={ref} className="py-24 px-6 relative overflow-hidden">
            {/* Background glows */}
            <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-[var(--color-accent)]/5 rounded-full blur-[150px] pointer-events-none" />
            <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] bg-[var(--color-cta)]/5 rounded-full blur-[120px] pointer-events-none" />

            <div className={`relative max-w-[700px] mx-auto text-center transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                <span className="text-xs uppercase tracking-[0.2em] text-[var(--color-accent)] font-semibold">{data.eyebrow}</span>
                <h2 className="text-3xl md:text-5xl font-bold mt-3 mb-4">
                    {data.headline}{" "}
                    <span className="bg-gradient-to-r from-[var(--color-gradient-from)] to-[var(--color-gradient-to)] bg-clip-text text-transparent animate-[gradientShift_6s_ease_infinite] bg-[length:200%_auto]">
                        {data.highlightedText}
                    </span>{" "}
                    {data.headlineEnd}
                </h2>
                <p className="text-[var(--color-text-secondary)] mb-10 max-w-[500px] mx-auto">{data.subtitle}</p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                    {data.ctas.map((cta, i) => (
                        <a
                            key={i}
                            href={resolveHref(cta.href)}
                            target={cta.href === "__whatsapp__" ? "_blank" : undefined}
                            rel={cta.href === "__whatsapp__" ? "noopener noreferrer" : undefined}
                            className={
                                cta.style === "primary"
                                    ? `group px-8 py-4 bg-[var(--color-cta)] text-[var(--color-bg-primary)] font-bold ${btnRadius} text-lg hover:bg-[var(--color-cta-hover)] hover:-translate-y-1 transition-all duration-300 shadow-[0_0_0_0_var(--color-cta-glow)] hover:shadow-[0_8px_30px_var(--color-cta-glow)] animate-[pulseGlow_3s_ease-in-out_infinite]`
                                    : `px-8 py-4 border border-[var(--color-border-hover)] text-[var(--color-text-secondary)] ${btnRadius} text-lg hover:border-[var(--color-accent-light)] hover:text-white transition-all duration-300`
                            }
                        >
                            {cta.icon === "whatsapp" && <WhatsAppIcon />}
                            {cta.text}
                            {cta.arrow && <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>}
                        </a>
                    ))}
                </div>

                {data.badges && (
                    <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-[var(--color-text-muted)]">
                        {data.badges.map((badge, i) => (
                            <span key={i}>{badge}</span>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
