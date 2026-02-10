"use client";

import { useState, useEffect } from "react";
import { siteConfig } from "@/site.config";

const layout = siteConfig.design?.layout || "centered";
const btnRadius = layout === "editorial" ? "rounded-xl" : layout === "minimal" ? "rounded-lg" : "rounded-lg";

export default function Navbar() {
    const { navbar } = siteConfig;
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                ? "bg-[var(--color-bg-primary)]/95 backdrop-blur-md border-b border-[var(--color-border-default)]"
                : "bg-transparent"
                }`}
        >
            <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
                {/* Logo */}
                <a href="/" className="flex items-center gap-2 text-[var(--color-text-primary)] font-bold text-lg">
                    {navbar.logo.emoji && <span className="text-xl">{navbar.logo.emoji}</span>}
                    <span className="hidden sm:inline">{navbar.logo.text}</span>
                </a>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8">
                    {navbar.links.map((link, i) => (
                        <a
                            key={i}
                            href={link.href}
                            className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
                        >
                            {link.label}
                        </a>
                    ))}
                    <a
                        href={navbar.cta.href}
                        className={`px-5 py-2 bg-[var(--color-cta)] text-[var(--color-bg-primary)] font-semibold ${btnRadius} text-sm hover:bg-[var(--color-cta-hover)] transition-colors`}
                    >
                        {navbar.cta.text}
                    </a>
                </div>

                {/* Mobile Hamburger */}
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5"
                    aria-label="Menu"
                >
                    <span className={`block w-6 h-0.5 bg-[var(--color-text-primary)] transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
                    <span className={`block w-6 h-0.5 bg-[var(--color-text-primary)] transition-all ${menuOpen ? "opacity-0" : ""}`} />
                    <span className={`block w-6 h-0.5 bg-[var(--color-text-primary)] transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
                </button>
            </div>

            {/* Mobile Menu */}
            <div
                className={`md:hidden overflow-hidden transition-all duration-300 bg-[var(--color-bg-surface)] border-b border-[var(--color-border-default)] ${menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
            >
                <div className="px-6 py-4 space-y-4">
                    {navbar.links.map((link, i) => (
                        <a
                            key={i}
                            href={link.href}
                            onClick={() => setMenuOpen(false)}
                            className="block text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                        >
                            {link.label}
                        </a>
                    ))}
                    <a
                        href={navbar.cta.href}
                        onClick={() => setMenuOpen(false)}
                        className={`block w-full text-center px-5 py-3 bg-[var(--color-cta)] text-[var(--color-bg-primary)] font-semibold ${btnRadius}`}
                    >
                        {navbar.cta.text}
                    </a>
                </div>
            </div>
        </nav>
    );
}
