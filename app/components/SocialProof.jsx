"use client";

export default function SocialProof({ config }) {
    const clients = config?.socialProof?.clients || [
        "Immo Éthique Formation",
        "MVDProduction",
        "ComptaStar",
        "Easyloc Immobilier",
        "Sales Influence",
        "Agence Take Care",
    ];

    return (
        <section className="py-10 overflow-hidden border-y border-[var(--color-border-default)] bg-[var(--color-bg-primary)]/50">
            <div className="relative">
                {/* Fade edges */}
                <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[var(--color-bg-primary)] to-transparent z-10" />
                <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[var(--color-bg-primary)] to-transparent z-10" />

                {/* Marquee */}
                <div className="flex animate-[marquee_25s_linear_infinite] hover:[animation-play-state:paused]">
                    {[...clients, ...clients].map((client, i) => (
                        <div
                            key={i}
                            className="flex-shrink-0 mx-10 text-lg font-semibold text-[var(--color-border-hover)] hover:text-[var(--color-accent-light)] transition-colors duration-300 whitespace-nowrap cursor-default select-none"
                        >
                            {client}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
