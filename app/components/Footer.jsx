import { siteConfig } from "@/site.config";

export default function Footer() {
    const { footer } = siteConfig;

    return (
        <footer className="border-t border-[var(--color-border-default)] bg-[var(--color-bg-surface)]/30">
            <div className="max-w-[1200px] mx-auto px-6 py-12">
                <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
                    {/* Brand */}
                    <div className="text-center md:text-left">
                        <div className="text-lg font-bold text-[var(--color-text-primary)] mb-2">{footer.brand}</div>
                        <p className="text-sm text-[var(--color-text-muted)] max-w-[300px]">{footer.tagline}</p>
                    </div>

                    {/* Links */}
                    <div className="flex gap-6">
                        {footer.links.map((link, i) => (
                            <a key={i} href={link.href} className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">
                                {link.label}
                            </a>
                        ))}
                    </div>
                </div>

                {/* Bottom */}
                <div className="mt-8 pt-6 border-t border-[var(--color-border-default)] flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-[var(--color-text-muted)]">{footer.legal}</p>
                    {footer.socials?.length > 0 && (
                        <div className="flex gap-4">
                            {footer.socials.map((s, i) => (
                                <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" className="text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors text-sm">
                                    {s.platform}
                                </a>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </footer>
    );
}
