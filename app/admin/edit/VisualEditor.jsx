"use client";

import { useState, useCallback, useEffect } from "react";

/* ── Landing page components ── */
import Hero from "../../components/Hero";
import SocialProof from "../../components/SocialProof";
import PainPoints from "../../components/PainPoints";
import Results from "../../components/Results";
import VideoTestimonials from "../../components/VideoTestimonials";
import Services from "../../components/Services";
import Process from "../../components/Process";
import Honesty from "../../components/Honesty";
import Calendar from "../../components/Calendar";
import Testimonials from "../../components/Testimonials";
import FAQ from "../../components/FAQ";
import FinalCTA from "../../components/FinalCTA";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

/* ── Editor components ── */
import SectionWrapper from "./SectionWrapper";
import SectionEditPanel from "./SectionEditPanel";

const SECTION_MAP = {
    hero: Hero,
    socialProof: SocialProof,
    painPoints: PainPoints,
    results: Results,
    videoTestimonials: VideoTestimonials,
    services: Services,
    process: Process,
    honesty: Honesty,
    calendar: Calendar,
    testimonials: Testimonials,
    faq: FAQ,
    finalCTA: FinalCTA,
};

const ALL_SECTIONS = Object.keys(SECTION_MAP);

const SECTION_LABELS = {
    hero: "Hero",
    socialProof: "Preuve Sociale",
    painPoints: "Problèmes",
    results: "Résultats",
    videoTestimonials: "Vidéos",
    services: "Services",
    process: "Processus",
    honesty: "Transparence",
    calendar: "Calendrier",
    testimonials: "Témoignages",
    faq: "FAQ",
    finalCTA: "CTA Final",
};

export default function VisualEditor({ config: initialConfig, onSave, saving, saveMsg }) {
    const [config, setConfig] = useState(initialConfig);
    const [editingSection, setEditingSection] = useState(null);
    const [hasChanges, setHasChanges] = useState(false);
    const [showSectionManager, setShowSectionManager] = useState(false);

    const sections = config.sections || ALL_SECTIONS;

    /* ── Config update ── */
    const updateConfig = useCallback((newConfig) => {
        setConfig(newConfig);
        setHasChanges(true);
    }, []);

    /* ── Live palette preview ── */
    useEffect(() => {
        const palette = config?.design?.palette;
        if (palette) {
            document.documentElement.setAttribute("data-palette", palette);
        } else {
            document.documentElement.removeAttribute("data-palette");
        }
    }, [config?.design?.palette]);

    /* ── Live style preview ── */
    useEffect(() => {
        const style = config?.design?.style;
        if (style) {
            document.documentElement.setAttribute("data-style", style);
        } else {
            document.documentElement.removeAttribute("data-style");
        }
    }, [config?.design?.style]);

    /* ── Section reorder ── */
    const moveSection = useCallback((index, direction) => {
        const newSections = [...sections];
        const [moved] = newSections.splice(index, 1);
        newSections.splice(index + direction, 0, moved);
        updateConfig({ ...config, sections: newSections });
    }, [sections, config, updateConfig]);

    /* ── Toggle section visible/hidden ── */
    const toggleSection = useCallback((sectionKey) => {
        const current = [...sections];
        if (current.includes(sectionKey)) {
            updateConfig({ ...config, sections: current.filter((k) => k !== sectionKey) });
        } else {
            updateConfig({ ...config, sections: [...current, sectionKey] });
        }
    }, [sections, config, updateConfig]);

    /* ── Save ── */
    const handleSave = () => onSave(config);

    return (
        <div style={{ position: "relative" }}>
            {/* ════════════════════════════════
                FLOATING TOOLBAR
               ════════════════════════════════ */}
            <div style={{
                position: "fixed",
                top: 16,
                left: "50%",
                transform: "translateX(-50%)",
                zIndex: 1100,
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "8px 16px",
                background: "rgba(15,23,42,0.95)",
                backdropFilter: "blur(12px)",
                borderRadius: 12,
                border: "1px solid #1E293B",
                boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
            }}>
                {/* Logo */}
                <span style={{ fontSize: 14, fontWeight: 700, color: "#3B82F6" }}>
                    ✦ Visual Editor
                </span>

                <div style={{ width: 1, height: 24, background: "#334155" }} />

                {/* Section Manager */}
                <button
                    onClick={() => setShowSectionManager(!showSectionManager)}
                    style={{
                        ...toolbarBtnStyle,
                        background: showSectionManager ? "#3B82F6" : "transparent",
                        color: showSectionManager ? "#fff" : "#94A3B8",
                    }}
                >
                    ☰ Sections
                </button>

                {/* Global Settings */}
                <button
                    onClick={() => { setEditingSection(editingSection === "_global" ? null : "_global"); setShowSectionManager(false); }}
                    style={{
                        ...toolbarBtnStyle,
                        background: editingSection === "_global" ? "#3B82F6" : "transparent",
                        color: editingSection === "_global" ? "#fff" : "#94A3B8",
                    }}
                >
                    ⚙️ Paramètres
                </button>

                <div style={{ width: 1, height: 24, background: "#334155" }} />

                {/* Save */}
                <button
                    onClick={handleSave}
                    disabled={saving || !hasChanges}
                    style={{
                        ...toolbarBtnStyle,
                        background: hasChanges ? "#3B82F6" : "#1E293B",
                        color: hasChanges ? "#fff" : "#64748B",
                        opacity: saving ? 0.6 : 1,
                    }}
                >
                    {saving ? "⏳ Sauvegarde..." : hasChanges ? "💾 Sauvegarder" : "✓ À jour"}
                </button>

                {saveMsg && (
                    <span style={{ fontSize: 13, color: saveMsg.includes("✅") ? "#22C55E" : "#EF4444" }}>
                        {saveMsg}
                    </span>
                )}
            </div>

            {/* ════════════════════════════════
                SECTION MANAGER DROPDOWN
               ════════════════════════════════ */}
            {showSectionManager && (
                <div style={{
                    position: "fixed",
                    top: 70,
                    left: "50%",
                    transform: "translateX(-50%)",
                    zIndex: 1100,
                    width: 320,
                    background: "#0F172A",
                    border: "1px solid #1E293B",
                    borderRadius: 12,
                    padding: 16,
                    boxShadow: "0 16px 48px rgba(0,0,0,0.6)",
                }}>
                    <h4 style={{ margin: "0 0 12px", fontSize: 14, fontWeight: 700, color: "#F8FAFC" }}>
                        Sections actives
                    </h4>
                    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                        {ALL_SECTIONS.map((key) => {
                            const active = sections.includes(key);
                            return (
                                <label
                                    key={key}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 10,
                                        padding: "8px 12px",
                                        borderRadius: 8,
                                        background: active ? "#1E293B" : "transparent",
                                        cursor: "pointer",
                                        border: `1px solid ${active ? "#334155" : "transparent"}`,
                                        transition: "all 0.15s ease",
                                    }}
                                >
                                    <input
                                        type="checkbox"
                                        checked={active}
                                        onChange={() => toggleSection(key)}
                                        style={{ accentColor: "#3B82F6" }}
                                    />
                                    <span style={{ fontSize: 13, color: active ? "#F8FAFC" : "#64748B", fontWeight: active ? 600 : 400 }}>
                                        {SECTION_LABELS[key] || key}
                                    </span>
                                </label>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* ════════════════════════════════
                ACTUAL LANDING PAGE PREVIEW
               ════════════════════════════════ */}
            <div
                style={{
                    marginRight: editingSection ? 420 : 0,
                    transition: "margin-right 0.3s ease",
                    paddingTop: 60,
                }}
            >
                {/* Navbar */}
                <Navbar config={config} />

                {/* Sections */}
                <main>
                    {sections.map((key, index) => {
                        const Component = SECTION_MAP[key];
                        if (!Component) return null;
                        return (
                            <SectionWrapper
                                key={key}
                                sectionKey={key}
                                isFirst={index === 0}
                                isLast={index === sections.length - 1}
                                isEditing={editingSection === key}
                                onEdit={() => setEditingSection(editingSection === key ? null : key)}
                                onMoveUp={() => moveSection(index, -1)}
                                onMoveDown={() => moveSection(index, 1)}
                            >
                                <Component config={config} />
                            </SectionWrapper>
                        );
                    })}
                </main>

                {/* Footer */}
                <Footer config={config} />
            </div>

            {/* ════════════════════════════════
                EDIT PANEL (Right Sidebar)
               ════════════════════════════════ */}
            {editingSection && (
                <SectionEditPanel
                    sectionKey={editingSection}
                    config={config}
                    onConfigChange={updateConfig}
                    onClose={() => setEditingSection(null)}
                />
            )}
        </div>
    );
}

const toolbarBtnStyle = {
    padding: "6px 14px",
    borderRadius: 8,
    border: "1px solid #334155",
    fontSize: 13,
    cursor: "pointer",
    fontWeight: 600,
    transition: "all 0.15s ease",
    whiteSpace: "nowrap",
};
