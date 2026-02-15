"use client";

import { useState, useEffect, useRef } from "react";

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

export default function Hero({ config }) {
    const { hero, links } = config;

    const waLink = links?.whatsapp
        ? `https://wa.me/${links.whatsapp}?text=${encodeURIComponent("Bonjour, j'aimerais en savoir plus sur vos services.")}`
        : "#";

    const stats = hero?.stats || [
        { value: 900, suffix: "K€+", label: "CA généré pour nos clients" },
        { value: 538, suffix: "%", label: "ROAS moyen sur campagnes" },
        { value: 50, suffix: "+", label: "Entrepreneurs accompagnés" },
    ];

    const trustItems = hero?.trustItems || [
        "Résultats vérifiables sur LinkedIn",
        "Appel 100% gratuit",
        "Zéro engagement",
    ];

    return (
        <section className="relative flex flex-col items-center justify-center overflow-hidden pt-10 pb-10">
            {/* Animated Mesh Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] animate-[meshMove_20s_ease-in-out_infinite]">
                    <div className="absolute top-[10%] left-[20%] w-[500px] h-[500px] rounded-full bg-[var(--color-accent)]/3 blur-[180px]" />
                    <div className="absolute top-[50%] right-[15%] w-[400px] h-[400px] rounded-full bg-[var(--color-accent)]/2 blur-[150px]" />
                </div>
            </div>

            <div className="relative z-10 max-w-[1100px] mx-auto px-6 w-full">
                {/* ===== TOP: Promise ===== */}
                <div className="text-center mb-6">
                    {/* Eyebrow */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--color-border-default)] bg-[var(--color-bg-surface)]/80 text-xs text-[var(--color-text-secondary)] mb-4 animate-[fadeInUp_0.6s_ease-out]">
                        <span className="w-2 h-2 rounded-full bg-[var(--color-cta)] animate-pulse" />
                        {hero?.eyebrow || "+800K€ de CA généré pour nos clients"}
                    </div>

                    {/* Headline */}
                    <h1 className="text-3xl md:text-5xl font-extrabold leading-[1.1] tracking-tight mb-3 animate-[fadeInUp_0.8s_ease-out]">
                        {hero?.headlineBefore || "On Prend en Charge Ton "}
                        <span className="bg-gradient-to-r from-[var(--color-gradient-from)] via-[var(--color-accent)] to-[var(--color-gradient-to)] bg-clip-text text-transparent animate-[gradientShift_6s_ease_infinite] bg-[length:200%_auto]">
                            {hero?.headlineHighlight || "Marketing & Commercial"}
                        </span>{" "}
                        <span className="text-[var(--color-text-primary)]">
                            {hero?.headlineAfter ?? "Pour Que Tu Signes Plus."}
                        </span>
                    </h1>

                    {/* Subheadline */}
                    <p className="text-base md:text-lg text-[var(--color-text-secondary)] max-w-[700px] mx-auto leading-relaxed animate-[fadeInUp_1s_ease-out]">
                        {hero?.subheadline || (
                            <>Un <span className="text-[var(--color-text-primary)] font-semibold">système complet</span> qui génère des clients <span className="text-[var(--color-text-primary)] font-semibold">de façon prévisible</span>.</>
                        )}
                    </p>
                </div>

                {/* ===== CENTER: VSL VIDEO ===== */}
                {hero?.videoUrl && (
                    <div className="relative rounded-2xl overflow-hidden mb-10 animate-[fadeInUp_1.1s_ease-out] border border-[var(--color-accent)]/20">
                        <div className="relative rounded-2xl overflow-hidden" style={{ paddingBottom: '56.25%' }}>
                            <iframe
                                src={hero.videoUrl.includes("embed") ? hero.videoUrl : `https://www.youtube.com/embed/${hero.videoUrl.split("v=")[1]?.split("&")[0] || hero.videoUrl}?rel=0&modestbranding=1`}
                                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
                                allow="fullscreen; picture-in-picture; accelerometer; encrypted-media; gyroscope"
                                allowFullScreen
                                title="Présentation"
                            />
                        </div>
                    </div>
                )}

                {/* ===== CTAs ===== */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-[fadeInUp_1.3s_ease-out]">
                    <a
                        href={hero?.ctaLink || "#rdv"}
                        className="group px-8 py-4 bg-[var(--color-cta)] text-[var(--color-bg-primary)] font-bold rounded-full text-lg hover:bg-[var(--color-cta-hover)] transition-all duration-300 cursor-pointer"
                    >
                        {hero?.cta || "Réserver Mon Appel avec un Expert"}
                        <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
                    </a>
                    <a
                        href={waLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-8 py-4 border border-[var(--color-border-hover)] text-[var(--color-text-secondary)] rounded-full text-lg hover:border-[var(--color-accent-light)] hover:text-white transition-all duration-300 cursor-pointer"
                    >
                        <svg className="w-5 h-5 inline-block mr-1" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg> Échanger sur WhatsApp
                    </a>
                </div>

                {/* ===== STATS ===== */}
                <div className={`grid grid-cols-2 ${stats.length === 3 ? 'md:grid-cols-3' : stats.length <= 2 ? 'md:grid-cols-2' : 'md:grid-cols-4'} gap-6 max-w-[800px] mx-auto animate-[fadeInUp_1.5s_ease-out]`}>
                    {stats.map((stat, i) => (
                        <div key={i} className="text-center">
                            <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[var(--color-gradient-from)] to-[var(--color-gradient-to)] bg-clip-text text-transparent">
                                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                            </div>
                            <div className="text-xs text-[var(--color-text-muted)] mt-1">{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* Trust bar */}
                <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-xs text-[var(--color-text-muted)]">
                    {trustItems.map((item, i) => (
                        <span key={i} className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-success)]" />
                            {typeof item === "string" ? item : item?.text || JSON.stringify(item)}
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
}
