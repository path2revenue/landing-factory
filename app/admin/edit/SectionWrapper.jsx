"use client";

import { useState } from "react";

const SECTION_LABELS = {
    hero: "🎯 Hero",
    socialProof: "📢 Preuve Sociale",
    painPoints: "🔴 Problèmes",
    results: "📊 Résultats",
    videoTestimonials: "🎬 Vidéos",
    services: "🛠 Services",
    process: "📋 Processus",
    honesty: "✅ Transparence",
    calendar: "📅 Calendrier",
    testimonials: "💬 Témoignages",
    faq: "❓ FAQ",
    finalCTA: "🚀 CTA Final",
};

export default function SectionWrapper({
    sectionKey,
    children,
    onEdit,
    onMoveUp,
    onMoveDown,
    isFirst,
    isLast,
    isEditing,
}) {
    const [hovered, setHovered] = useState(false);
    const label = SECTION_LABELS[sectionKey] || sectionKey;

    return (
        <div
            className="section-wrapper"
            style={{
                position: "relative",
                outline: hovered || isEditing
                    ? "2px dashed #3B82F6"
                    : "2px solid transparent",
                outlineOffset: "-2px",
                transition: "outline-color 0.2s ease",
                borderRadius: "4px",
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {/* Section label + Controls */}
            {(hovered || isEditing) && (
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        zIndex: 50,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "6px 12px",
                        background: "rgba(59,130,246,0.9)",
                        backdropFilter: "blur(8px)",
                        color: "#fff",
                        fontSize: "13px",
                        fontWeight: 600,
                    }}
                >
                    <span>{label}</span>
                    <div style={{ display: "flex", gap: "4px" }}>
                        {!isFirst && (
                            <button
                                onClick={(e) => { e.stopPropagation(); onMoveUp(); }}
                                style={btnStyle}
                                title="Monter"
                            >
                                ↑
                            </button>
                        )}
                        {!isLast && (
                            <button
                                onClick={(e) => { e.stopPropagation(); onMoveDown(); }}
                                style={btnStyle}
                                title="Descendre"
                            >
                                ↓
                            </button>
                        )}
                        <button
                            onClick={(e) => { e.stopPropagation(); onEdit(); }}
                            style={{
                                ...btnStyle,
                                background: isEditing ? "#fff" : "rgba(255,255,255,0.2)",
                                color: isEditing ? "#3B82F6" : "#fff",
                            }}
                            title="Éditer"
                        >
                            ✏️ Éditer
                        </button>
                    </div>
                </div>
            )}

            {/* Actual component */}
            <div style={{ pointerEvents: isEditing ? "none" : "auto" }}>
                {children}
            </div>
        </div>
    );
}

const btnStyle = {
    padding: "4px 10px",
    borderRadius: "4px",
    border: "1px solid rgba(255,255,255,0.3)",
    background: "rgba(255,255,255,0.15)",
    color: "#fff",
    fontSize: "12px",
    cursor: "pointer",
    fontWeight: 600,
    transition: "all 0.15s ease",
};
