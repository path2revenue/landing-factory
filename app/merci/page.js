"use client";

import { siteConfig } from "@/site.config";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const WhatsAppIcon = () => (
    <svg className="w-6 h-6 inline-block mr-2" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
);

export default function MerciPage() {
    const { merci } = siteConfig;

    return (
        <>
            <Navbar />
            <main className="min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16">
                {/* Confirmation */}
                <div className="text-center max-w-[600px] animate-[fadeInUp_0.8s_ease-out]">
                    <div className="text-6xl mb-6">✅</div>
                    <h1 className="text-3xl md:text-5xl font-bold mb-4">
                        {merci.headline}{" "}
                        <span className="bg-gradient-to-r from-[var(--color-gradient-from)] to-[var(--color-gradient-to)] bg-clip-text text-transparent">
                            {merci.highlightedText}
                        </span>
                    </h1>
                    <p className="text-[var(--color-text-secondary)] text-lg leading-relaxed mb-10">
                        {merci.subtitle}
                    </p>
                </div>

                {/* Gift Card */}
                {merci.gift && (
                    <div className="max-w-[500px] w-full bg-[var(--color-bg-surface)] border border-[var(--color-border-default)] rounded-2xl p-8 animate-[fadeInUp_1.2s_ease-out]">
                        <div className="text-center mb-6">
                            <span className="inline-block px-3 py-1 rounded-full bg-[var(--color-cta)]/10 border border-[var(--color-cta)]/20 text-sm text-[var(--color-cta)] font-semibold mb-3">
                                {merci.gift.badge}
                            </span>
                            <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-2">{merci.gift.title}</h2>
                            <p className="text-sm text-[var(--color-text-secondary)]">{merci.gift.description}</p>
                        </div>

                        {/* Benefits */}
                        <div className="flex justify-center gap-6 mb-6">
                            {merci.gift.benefits.map((b, i) => (
                                <div key={i} className="text-center">
                                    <div className="text-2xl mb-1">{b.icon}</div>
                                    <div className="text-xs text-[var(--color-text-muted)]">{b.label}</div>
                                </div>
                            ))}
                        </div>

                        {/* CTA */}
                        <a
                            href={merci.gift.cta.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full flex items-center justify-center px-6 py-4 bg-[#25D366] text-white font-bold rounded-xl text-lg hover:bg-[#22c55e] hover:-translate-y-0.5 transition-all duration-300"
                        >
                            {merci.gift.cta.icon === "whatsapp" && <WhatsAppIcon />}
                            {merci.gift.cta.text}
                        </a>

                        {merci.gift.footnote && (
                            <p className="text-xs text-[var(--color-text-muted)] text-center mt-4">{merci.gift.footnote}</p>
                        )}
                    </div>
                )}

                {/* Back link */}
                {merci.backLink && (
                    <a href={merci.backLink.url} className="mt-8 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors">
                        {merci.backLink.text}
                    </a>
                )}
            </main>
            <Footer />
        </>
    );
}
