"use client";

import { useState, useEffect, useRef } from "react";
import { siteConfig } from "@/site.config";

const layout = siteConfig.design?.layout || "centered";

function AnimatedCounter({ target, suffix = "", duration = 2000 }) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const started = useRef(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !started.current) {
                    started.current = true;
                    const start = performance.now();
                    const animate = (now) => {
                        const progress = Math.min((now - start) / duration, 1);
                        const eased = 1 - Math.pow(1 - progress, 3);
                        setCount(Math.floor(eased * target));
                        if (progress < 1) requestAnimationFrame(animate);
                    };
                    requestAnimationFrame(animate);
                }
            },
            { threshold: 0.3 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [target, duration]);

    return (
        <span ref={ref}>
            {count.toLocaleString("fr-FR")}
            {suffix}
        </span>
    );
}

const WhatsAppIcon = () => (
    <svg className="w-5 h-5 inline-block mr-1" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
);

function resolveHref(href) {
    if (href === "__whatsapp__") return siteConfig.links.whatsapp;
    return href;
}

const btnRadius = layout === "editorial" ? "rounded-xl" : layout === "minimal" ? "rounded-lg" : "rounded-full";

/* ─── SHARED: CTA Button ─── */
function CTAButton({ cta }) {
    return (
        <a
            href={resolveHref(cta.href)}
            target={cta.href === "__whatsapp__" ? "_blank" : undefined}
            rel={cta.href === "__whatsapp__" ? "noopener noreferrer" : undefined}
            className={
                cta.style === "primary"
                    ? `group px-8 py-4 bg-[var(--color-cta)] text-white font-bold ${btnRadius} text-lg hover:bg-[var(--color-cta-hover)] transition-all duration-300 cursor-pointer`
                    : `px-8 py-4 border border-[var(--color-border-hover)] text-[var(--color-text-secondary)] ${btnRadius} text-lg hover:border-[var(--color-accent)] hover:text-white transition-all duration-300 cursor-pointer`
            }
        >
            {cta.icon === "whatsapp" && <WhatsAppIcon />}
            {cta.text}
            {cta.arrow && <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>}
        </a>
    );
}

/* ═══════════════════════════════════════════
   LAYOUT: CENTERED (classic — StarsBridge style)
   ═══════════════════════════════════════════ */
function HeroCentered({ hero }) {
    return (
        <section className="relative flex flex-col items-center justify-center overflow-hidden pt-12 pb-16">
            <MeshBG />
            <div className="relative z-10 max-w-[1200px] mx-auto px-6 w-full flex flex-col items-center text-center">
                <Eyebrow text={hero.eyebrow} />
                <h1 className="text-4xl md:text-6xl font-extrabold leading-[1.08] tracking-tight max-w-3xl mb-4 animate-[fadeInUp_0.8s_ease-out]">
                    {hero.headline}{" "}
                    <GradientText>{hero.highlightedText}</GradientText>{" "}
                    <span className="text-[var(--color-text-primary)]">{hero.headlineEnd}</span>
                </h1>
                <Sub html={hero.subheadline} center />
                <VSL url={hero.vslUrl} title={hero.vslTitle} />
                <div className="flex flex-col sm:flex-row items-center gap-4 mt-8 animate-[fadeInUp_1.1s_ease-out]">
                    {hero.ctas.map((cta, i) => <CTAButton key={i} cta={cta} />)}
                </div>
                <Stats stats={hero.stats} />
                <TrustBadges badges={hero.trustBadges} />
            </div>
        </section>
    );
}

/* ═══════════════════════════════════════════
   LAYOUT: EDITORIAL (Reitere style — left-aligned, split)
   ═══════════════════════════════════════════ */
function HeroEditorial({ hero }) {
    return (
        <section className="relative overflow-hidden pt-12 pb-16">
            <MeshBG />
            <div className="relative z-10 max-w-[1200px] mx-auto px-6 w-full">
                <div className="grid md:grid-cols-2 gap-10 items-center mb-12">
                    {/* LEFT: Text */}
                    <div>
                        <Eyebrow text={hero.eyebrow} />
                        <h1 className="text-3xl md:text-5xl font-extrabold leading-[1.1] tracking-tight mb-4 animate-[fadeInUp_0.8s_ease-out]">
                            {hero.headline}{" "}
                            <GradientText>{hero.highlightedText}</GradientText>{" "}
                            <span className="text-[var(--color-text-primary)]">{hero.headlineEnd}</span>
                        </h1>
                        <Sub html={hero.subheadline} />
                        <div className="flex flex-col sm:flex-row items-start gap-4 mt-8 animate-[fadeInUp_1.1s_ease-out]">
                            {hero.ctas.map((cta, i) => <CTAButton key={i} cta={cta} />)}
                        </div>
                    </div>
                    {/* RIGHT: Video */}
                    <VSL url={hero.vslUrl} title={hero.vslTitle} />
                </div>
                <Stats stats={hero.stats} border />
                <TrustBadges badges={hero.trustBadges} />
            </div>
        </section>
    );
}

/* ═══════════════════════════════════════════
   LAYOUT: MINIMAL (clean, airy, single-column)
   ═══════════════════════════════════════════ */
function HeroMinimal({ hero }) {
    return (
        <section className="relative overflow-hidden pt-20 pb-20">
            <div className="relative z-10 max-w-[720px] mx-auto px-6 w-full">
                <Eyebrow text={hero.eyebrow} />
                <h1 className="text-3xl md:text-5xl font-bold leading-[1.15] tracking-tight mb-6 animate-[fadeInUp_0.8s_ease-out]">
                    {hero.headline}{" "}
                    <GradientText>{hero.highlightedText}</GradientText>{" "}
                    <span className="text-[var(--color-text-primary)]">{hero.headlineEnd}</span>
                </h1>
                <Sub html={hero.subheadline} />
                <div className="flex flex-col sm:flex-row items-start gap-4 mt-8 mb-12 animate-[fadeInUp_1.1s_ease-out]">
                    {hero.ctas.map((cta, i) => <CTAButton key={i} cta={cta} />)}
                </div>
                <VSL url={hero.vslUrl} title={hero.vslTitle} />
                <Stats stats={hero.stats} border />
                <TrustBadges badges={hero.trustBadges} />
            </div>
        </section>
    );
}

/* ─── Sub-components ─── */
function MeshBG() {
    return (
        <div className="absolute inset-0 z-0">
            <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] animate-[meshMove_20s_ease-in-out_infinite]">
                <div className="absolute top-[10%] left-[20%] w-[500px] h-[500px] rounded-full bg-[var(--color-accent)]/5 blur-[200px]" />
                <div className="absolute top-[50%] right-[15%] w-[400px] h-[400px] rounded-full bg-[var(--color-accent)]/3 blur-[180px]" />
            </div>
        </div>
    );
}

function Eyebrow({ text }) {
    if (!text) return null;
    return (
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg border border-[var(--color-border-default)] bg-[var(--color-bg-surface)]/80 text-xs text-[var(--color-text-secondary)] mb-5 animate-[fadeInUp_0.6s_ease-out]">
            {text.dot !== false && <span className="w-2 h-2 rounded-full bg-[var(--color-cta)] animate-pulse" />}
            {typeof text === "string" ? text : text.text}
        </div>
    );
}

function GradientText({ children }) {
    return (
        <span className="bg-gradient-to-r from-[var(--color-gradient-from)] via-[var(--color-accent)] to-[var(--color-gradient-to)] bg-clip-text text-transparent animate-[gradientShift_6s_ease_infinite] bg-[length:200%_auto]">
            {children}
        </span>
    );
}

function Sub({ html, center }) {
    if (!html) return null;
    return (
        <p
            className={`text-base md:text-lg text-[var(--color-text-secondary)] max-w-[550px] leading-relaxed mb-2 animate-[fadeInUp_1s_ease-out] ${center ? "mx-auto text-center" : ""}`}
            dangerouslySetInnerHTML={{ __html: html }}
        />
    );
}

function VSL({ url, title }) {
    if (!url) return null;
    return (
        <div className="w-full max-w-3xl relative rounded-xl overflow-hidden animate-[fadeInUp_1.05s_ease-out] border border-[var(--color-accent)]/20">
            <div className="relative rounded-xl overflow-hidden" style={{ paddingBottom: "56.25%" }}>
                <iframe
                    src={url}
                    style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: 0 }}
                    allow="fullscreen; picture-in-picture; accelerometer; encrypted-media; gyroscope"
                    allowFullScreen
                    title={title || "Video"}
                />
            </div>
        </div>
    );
}

function Stats({ stats, border }) {
    if (!stats) return null;
    return (
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 max-w-[900px] mx-auto animate-[fadeInUp_1.3s_ease-out] pt-8 mt-4 ${border ? "border-t border-[var(--color-border-default)]" : ""}`}>
            {stats.map((stat, i) => (
                <div key={i} className="text-center">
                    <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[var(--color-gradient-from)] to-[var(--color-gradient-to)] bg-clip-text text-transparent">
                        <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="text-xs text-[var(--color-text-muted)] mt-1">{stat.label}</div>
                </div>
            ))}
        </div>
    );
}

function TrustBadges({ badges }) {
    if (!badges) return null;
    return (
        <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-xs text-[var(--color-text-muted)]">
            {badges.map((badge, i) => (
                <span key={i} className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-success)]" />
                    {badge}
                </span>
            ))}
        </div>
    );
}

/* ─── EXPORT: pick layout ─── */
export default function Hero() {
    const { hero } = siteConfig;
    if (layout === "editorial") return <HeroEditorial hero={hero} />;
    if (layout === "minimal") return <HeroMinimal hero={hero} />;
    return <HeroCentered hero={hero} />;
}
