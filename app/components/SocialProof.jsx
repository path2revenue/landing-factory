"use client";

import { siteConfig } from "@/site.config";

export default function SocialProof() {
    const { socialProof } = siteConfig;
    if (!socialProof?.items?.length) return null;

    const doubled = [...socialProof.items, ...socialProof.items];

    return (
        <section className="py-6 overflow-hidden border-y border-[var(--color-border-default)] bg-[var(--color-bg-surface)]/50">
            <div className="flex animate-[marquee_30s_linear_infinite] whitespace-nowrap">
                {doubled.map((item, i) => {
                    const isObj = typeof item === "object";
                    const text = isObj ? item.text : item;
                    const img = isObj ? item.image : null;

                    return (
                        <span
                            key={i}
                            className="inline-flex items-center gap-3 mx-8 text-sm text-[var(--color-text-secondary)] font-medium shrink-0"
                        >
                            {img && (
                                <img
                                    src={img}
                                    alt={text.split("·")[0]?.trim() || "client"}
                                    width={28}
                                    height={28}
                                    className="rounded-full object-cover w-7 h-7"
                                />
                            )}
                            {text}
                        </span>
                    );
                })}
            </div>
        </section>
    );
}
