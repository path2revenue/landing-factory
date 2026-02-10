"use client";

import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/site.config";

export default function VideoTestimonials() {
    const { videoTestimonials: data } = siteConfig;
    const [visible, setVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.2 });
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    if (!data?.videos?.length) return null;

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
                <div className={`grid ${data.videos.length === 1 ? "max-w-[700px] mx-auto" : "md:grid-cols-2"} gap-8`}>
                    {data.videos.map((vid, i) => (
                        <div
                            key={i}
                            className={`rounded-2xl overflow-hidden border border-[var(--color-border-default)] bg-[var(--color-bg-surface)] transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                            style={{ transitionDelay: `${i * 200}ms` }}
                        >
                            <div className="relative" style={{ paddingBottom: "56.25%" }}>
                                <iframe
                                    src={vid.url}
                                    className="absolute inset-0 w-full h-full"
                                    allow="fullscreen; picture-in-picture"
                                    allowFullScreen
                                    title={vid.title}
                                />
                            </div>
                            {vid.caption && (
                                <div className="p-4 text-sm text-[var(--color-text-secondary)]">{vid.caption}</div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
