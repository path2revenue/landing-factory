"use client";

export default function FinalCTA({ config }) {
    const waLink = config?.links?.whatsapp
        ? `https://wa.me/${config.links.whatsapp}?text=${encodeURIComponent("Bonjour, j'aimerais passer à l'action et discuter de mon projet.")}`
        : "#";

    return (
        <section className="py-24 px-6 relative overflow-hidden">
            {/* Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[var(--color-accent)]/3 rounded-full blur-[180px] pointer-events-none" />
            <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[200px] bg-[var(--color-cta)]/2 rounded-full blur-[150px] pointer-events-none" />

            <div className="relative z-10 max-w-[800px] mx-auto text-center">
                <span className="text-xs uppercase tracking-[0.2em] text-[var(--color-accent)] font-semibold">
                    {config?.finalCTA?.eyebrow || "Tu veux des résultats ?"}
                </span>
                <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-6 leading-tight">
                    {config?.finalCTA?.titleBefore || "On Est à "}
                    <span className="bg-gradient-to-r from-[var(--color-gradient-from)] to-[var(--color-gradient-to)] bg-clip-text text-transparent">
                        {config?.finalCTA?.titleHighlight || "Une Décision"}
                    </span>{" "}
                    {config?.finalCTA?.titleAfter ?? "de Tout Faire Changer"}
                </h2>

                <p className="text-lg text-[var(--color-text-secondary)] mb-10 max-w-[850px] mx-auto leading-relaxed">
                    {config?.finalCTA?.subtitle || "Chaque jour qui passe sans système, ce sont des clients que tu ne rencontres pas. On prend en charge ton marketing et ton commercial. Tu te concentres sur ton expertise."}
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                    <a
                        href={config?.finalCTA?.ctaLink || "#rdv"}
                        className="inline-flex items-center gap-2 px-10 py-5 bg-[var(--color-cta)] text-[var(--color-bg-primary)] font-bold rounded-full text-lg hover:bg-[var(--color-cta-hover)] transition-all duration-300 cursor-pointer"
                    >
                        {config?.finalCTA?.cta || "Réserver Mon Appel avec un Expert"}
                        <span>→</span>
                    </a>
                    <a
                        href={waLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-8 py-5 border border-[var(--color-border-hover)] text-[var(--color-text-secondary)] rounded-full text-lg hover:border-[var(--color-accent-light)] hover:text-white transition-all duration-300 cursor-pointer"
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg> WhatsApp
                    </a>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-[var(--color-text-muted)]">
                    <span>✅ Appel 100% gratuit</span>
                    <span>✅ Zéro engagement</span>
                    <span>✅ Réponse sous 24h</span>
                </div>
            </div>
        </section>
    );
}
