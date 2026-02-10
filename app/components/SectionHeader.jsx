/**
 * SectionHeader — Renders section header based on layout variant.
 *
 * Layout modes:
 * - "centered"   → classic centered header
 * - "editorial"  → left-aligned with vertical accent bar
 * - "minimal"    → left-aligned, no bar, more spacing
 *
 * @param {Object} props
 * @param {string} props.eyebrow       – small uppercase label
 * @param {string} props.headline      – main headline text
 * @param {string} props.highlightedText – gradient-styled highlighted word(s)
 * @param {string} props.headlineEnd   – optional text after highlighted
 * @param {string} props.subtitle      – optional subtitle paragraph
 * @param {string} [props.accentColor] – CSS variable for accent (default: --color-accent)
 * @param {boolean} [props.gradient]   – use gradient on highlighted text (default: true)
 */

import { siteConfig } from "@/site.config";

const layout = siteConfig.design?.layout || "centered";

export default function SectionHeader({ eyebrow, headline, highlightedText, headlineEnd, subtitle, accentColor, gradient = true }) {
    const accent = accentColor || "var(--color-accent)";

    const highlightEl = gradient ? (
        <span className="bg-gradient-to-r from-[var(--color-gradient-from)] to-[var(--color-gradient-to)] bg-clip-text text-transparent">
            {highlightedText}
        </span>
    ) : (
        <span style={{ color: accent }}>{highlightedText}</span>
    );

    /* ─── CENTERED ─── */
    if (layout === "centered") {
        return (
            <div className="text-center mb-16">
                {eyebrow && <span className="text-xs uppercase tracking-[0.2em] font-semibold" style={{ color: accent }}>{eyebrow}</span>}
                <h2 className="text-3xl md:text-5xl font-bold mt-3 mb-4">
                    {headline} {highlightEl} {headlineEnd}
                </h2>
                {subtitle && <p className="text-[var(--color-text-secondary)] max-w-[600px] mx-auto">{subtitle}</p>}
            </div>
        );
    }

    /* ─── EDITORIAL ─── */
    if (layout === "editorial") {
        return (
            <div className="mb-16">
                {eyebrow && <span className="text-xs uppercase tracking-[0.2em] font-semibold" style={{ color: accent }}>{eyebrow}</span>}
                <div className="flex items-start gap-4 mt-3">
                    <div className="w-1 h-16 rounded-full shrink-0 mt-1" style={{ background: `linear-gradient(to bottom, ${accent}, transparent)` }} />
                    <div>
                        <h2 className="text-3xl md:text-5xl font-bold mb-3">
                            {headline} {highlightEl} {headlineEnd}
                        </h2>
                        {subtitle && <p className="text-[var(--color-text-secondary)] max-w-[600px]">{subtitle}</p>}
                    </div>
                </div>
            </div>
        );
    }

    /* ─── MINIMAL ─── */
    return (
        <div className="mb-20">
            {eyebrow && <span className="text-xs uppercase tracking-[0.3em] font-medium text-[var(--color-text-muted)]">{eyebrow}</span>}
            <h2 className="text-3xl md:text-4xl font-semibold mt-4 mb-4 max-w-[700px]">
                {headline} {highlightEl} {headlineEnd}
            </h2>
            {subtitle && <p className="text-[var(--color-text-secondary)] max-w-[550px]">{subtitle}</p>}
        </div>
    );
}
