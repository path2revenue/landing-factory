"use client";

import { useState, useEffect } from "react";
import Input from "../components/ui/Input";
import Textarea from "../components/ui/Textarea";
import FileUpload from "../components/ui/FileUpload";

/* ────────────────────────────────────────────────
   Inline repeater — simpler than the generic one,
   optimized for the visual editor's slide panel
   ──────────────────────────────────────────────── */
function MiniRepeater({ items, onUpdate, fields, label }) {
    const add = () => onUpdate([...items, fields.reduce((o, f) => ({ ...o, [f.key]: f.default ?? "" }), {})]);
    const remove = (i) => onUpdate(items.filter((_, idx) => idx !== i));
    const update = (i, key, val) => {
        const next = [...items];
        next[i] = { ...next[i], [key]: val };
        onUpdate(next);
    };

    return (
        <div style={{ marginBottom: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: "#94A3B8" }}>{label}</span>
                <button onClick={add} style={addBtnStyle}>+ Ajouter</button>
            </div>
            {items.map((item, i) => (
                <div key={i} style={{ background: "#1E293B", borderRadius: 8, padding: 12, marginBottom: 8, border: "1px solid #334155" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                        <span style={{ fontSize: 11, color: "#64748B", fontWeight: 600 }}>#{i + 1}</span>
                        <button onClick={() => remove(i)} style={{ background: "none", border: "none", color: "#EF4444", cursor: "pointer", fontSize: 12, fontWeight: 600 }}>✕ Supprimer</button>
                    </div>
                    {fields.map((f) => (
                        <div key={f.key} style={{ marginBottom: 8 }}>
                            <label style={miniLabelStyle}>{f.label}</label>
                            {f.type === "textarea" ? (
                                <textarea
                                    value={item[f.key] || ""}
                                    onChange={(e) => update(i, f.key, e.target.value)}
                                    rows={2}
                                    style={inputStyle}
                                />
                            ) : f.type === "number" ? (
                                <input
                                    type="number"
                                    value={item[f.key] ?? ""}
                                    onChange={(e) => update(i, f.key, parseFloat(e.target.value) || 0)}
                                    style={inputStyle}
                                />
                            ) : f.type === "image" ? (
                                <FileUpload
                                    value={item[f.key] || ""}
                                    onChange={(url) => update(i, f.key, url)}
                                    folder={f.folder || "images"}
                                />
                            ) : f.type === "metrics" ? (
                                <MetricsEditor
                                    metrics={item[f.key] || []}
                                    onChange={(m) => update(i, f.key, m)}
                                />
                            ) : (
                                <input
                                    value={item[f.key] || ""}
                                    onChange={(e) => update(i, f.key, e.target.value)}
                                    style={inputStyle}
                                />
                            )}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}

/* ── Metrics sub-editor (for Results items) ── */
function MetricsEditor({ metrics, onChange }) {
    const add = () => onChange([...metrics, { value: 0, suffix: "", label: "" }]);
    const remove = (i) => onChange(metrics.filter((_, idx) => idx !== i));
    const update = (i, key, val) => {
        const next = [...metrics];
        next[i] = { ...next[i], [key]: val };
        onChange(next);
    };

    return (
        <div style={{ paddingLeft: 8, borderLeft: "2px solid #3B82F6" }}>
            {metrics.map((m, i) => (
                <div key={i} style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 6 }}>
                    <input type="number" value={m.value ?? 0} onChange={(e) => update(i, "value", parseFloat(e.target.value) || 0)} style={{ ...inputStyle, width: 70 }} placeholder="Val" />
                    <input value={m.suffix || ""} onChange={(e) => update(i, "suffix", e.target.value)} style={{ ...inputStyle, width: 50 }} placeholder="Sfx" />
                    <input value={m.label || ""} onChange={(e) => update(i, "label", e.target.value)} style={{ ...inputStyle, flex: 1 }} placeholder="Label" />
                    <button onClick={() => remove(i)} style={{ background: "none", border: "none", color: "#EF4444", cursor: "pointer", fontSize: 14 }}>✕</button>
                </div>
            ))}
            <button onClick={add} style={{ ...addBtnStyle, fontSize: 11, padding: "2px 8px" }}>+ Métrique</button>
        </div>
    );
}

/* ── Simple text list editor ── */
function TextListEditor({ items, onUpdate, label }) {
    const add = () => onUpdate([...items, ""]);
    const remove = (i) => onUpdate(items.filter((_, idx) => idx !== i));
    const update = (i, val) => {
        const next = [...items];
        next[i] = val;
        onUpdate(next);
    };

    return (
        <div style={{ marginBottom: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <span style={miniLabelStyle}>{label}</span>
                <button onClick={add} style={addBtnStyle}>+ Ajouter</button>
            </div>
            {items.map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 6, marginBottom: 6 }}>
                    <input value={item} onChange={(e) => update(i, e.target.value)} style={{ ...inputStyle, flex: 1 }} />
                    <button onClick={() => remove(i)} style={{ background: "none", border: "none", color: "#EF4444", cursor: "pointer" }}>✕</button>
                </div>
            ))}
        </div>
    );
}

/* ════════════════════════════════════════════
   SECTION FIELD DEFINITIONS
   ════════════════════════════════════════════ */

function renderSectionFields(sectionKey, config, updateField) {
    const s = config[sectionKey] || {};

    const field = (key, label, type = "text", opts = {}) => {
        const val = s[key] ?? opts.fallback ?? "";
        const onChange = (v) => updateField(sectionKey, key, v);

        return (
            <div key={key} style={{ marginBottom: 12 }}>
                <label style={miniLabelStyle}>{label}</label>
                {type === "textarea" ? (
                    <textarea value={val} onChange={(e) => onChange(e.target.value)} rows={3} style={inputStyle} />
                ) : type === "image" ? (
                    <FileUpload value={val} onChange={onChange} folder={opts.folder || sectionKey} />
                ) : (
                    <input value={val} onChange={(e) => onChange(e.target.value)} style={inputStyle} />
                )}
            </div>
        );
    };

    switch (sectionKey) {
        case "hero":
            return (
                <>
                    <SectionTitle>Hero</SectionTitle>
                    {field("eyebrow", "Eyebrow (badge haut)")}
                    {field("headlineBefore", "Titre (avant highlight)")}
                    {field("headlineHighlight", "Titre (highlight coloré)")}
                    {field("headlineAfter", "Titre (après highlight)")}
                    {field("subheadline", "Sous-titre", "textarea")}
                    {field("cta", "Texte bouton CTA")}
                    {field("ctaLink", "Lien CTA")}
                    {field("videoUrl", "URL Vidéo YouTube")}
                    <MiniRepeater
                        label="Statistiques"
                        items={config.hero?.stats || []}
                        onUpdate={(v) => updateField("hero", "stats", v)}
                        fields={[
                            { key: "value", label: "Valeur", type: "number", default: 0 },
                            { key: "suffix", label: "Suffixe (K+, %, etc.)", default: "" },
                            { key: "label", label: "Label", default: "" },
                        ]}
                    />
                    <TextListEditor
                        label="Trust items (badges bas)"
                        items={config.hero?.trustItems || []}
                        onUpdate={(v) => updateField("hero", "trustItems", v)}
                    />
                </>
            );

        case "socialProof":
            return (
                <>
                    <SectionTitle>Preuve Sociale (Bandeau)</SectionTitle>
                    <TextListEditor
                        label="Noms des clients"
                        items={s.clients || []}
                        onUpdate={(v) => updateField("socialProof", "clients", v)}
                    />
                </>
            );

        case "painPoints":
            return (
                <>
                    <SectionTitle>Problèmes</SectionTitle>
                    {field("eyebrow", "Eyebrow")}
                    {field("titleBefore", "Titre (avant)")}
                    {field("titleHighlight", "Titre (highlight)")}
                    {field("titleAfter", "Titre (après)")}
                    {field("subtitle", "Sous-titre", "textarea")}
                    <MiniRepeater
                        label="Pain Points"
                        items={s.items || []}
                        onUpdate={(v) => updateField("painPoints", "items", v)}
                        fields={[
                            { key: "icon", label: "Emoji/Icône", default: "🔴" },
                            { key: "title", label: "Titre", default: "" },
                            { key: "description", label: "Description", type: "textarea", default: "" },
                            { key: "stat", label: "Tag/Stat", default: "" },
                        ]}
                    />
                </>
            );

        case "results":
            return (
                <>
                    <SectionTitle>Résultats / Études de Cas</SectionTitle>
                    {field("eyebrow", "Eyebrow")}
                    {field("titleBefore", "Titre (avant)")}
                    {field("titleHighlight", "Titre (highlight)")}
                    {field("subtitle", "Sous-titre", "textarea")}
                    <MiniRepeater
                        label="Études de cas"
                        items={s.items || []}
                        onUpdate={(v) => updateField("results", "items", v)}
                        fields={[
                            { key: "name", label: "Nom client", default: "" },
                            { key: "domain", label: "Domaine", default: "" },
                            { key: "image", label: "Photo", type: "image", folder: "results" },
                            { key: "quote", label: "Témoignage", type: "textarea", default: "" },
                            { key: "metrics", label: "Métriques", type: "metrics" },
                        ]}
                    />
                </>
            );

        case "videoTestimonials":
            return (
                <>
                    <SectionTitle>Témoignages Vidéo</SectionTitle>
                    {field("eyebrow", "Eyebrow")}
                    {field("titleBefore", "Titre (avant)")}
                    {field("titleHighlight", "Titre (highlight)")}
                    {field("titleAfter", "Titre (après)")}
                    {field("subtitle", "Sous-titre", "textarea")}
                    <MiniRepeater
                        label="Vidéos"
                        items={s.items || []}
                        onUpdate={(v) => updateField("videoTestimonials", "items", v)}
                        fields={[
                            { key: "name", label: "Nom", default: "" },
                            { key: "role", label: "Rôle", default: "" },
                            { key: "videoId", label: "YouTube Video ID", default: "" },
                            { key: "summary", label: "Résumé", type: "textarea", default: "" },
                            { key: "highlight", label: "Tag highlight", default: "" },
                        ]}
                    />
                </>
            );

        case "services":
            return (
                <>
                    <SectionTitle>Services</SectionTitle>
                    {field("eyebrow", "Eyebrow")}
                    {field("titleBefore", "Titre (avant)")}
                    {field("titleHighlight", "Titre (highlight)")}
                    {field("subtitle", "Sous-titre", "textarea")}
                    <MiniRepeater
                        label="Services"
                        items={s.items || []}
                        onUpdate={(v) => updateField("services", "items", v)}
                        fields={[
                            { key: "icon", label: "Emoji", default: "🎯" },
                            { key: "title", label: "Titre", default: "" },
                            { key: "description", label: "Description", type: "textarea", default: "" },
                            { key: "badge", label: "Badge", default: "" },
                        ]}
                    />
                </>
            );

        case "process":
            return (
                <>
                    <SectionTitle>Processus</SectionTitle>
                    {field("eyebrow", "Eyebrow")}
                    {field("titleBefore", "Titre (avant)")}
                    {field("titleHighlight", "Titre (highlight)")}
                    {field("subtitle", "Sous-titre", "textarea")}
                    <MiniRepeater
                        label="Étapes"
                        items={s.items || []}
                        onUpdate={(v) => updateField("process", "items", v)}
                        fields={[
                            { key: "number", label: "Numéro", default: "01" },
                            { key: "title", label: "Titre", default: "" },
                            { key: "description", label: "Description", type: "textarea", default: "" },
                            { key: "detail", label: "Détail", default: "" },
                        ]}
                    />
                </>
            );

        case "honesty":
            return (
                <>
                    <SectionTitle>Transparence</SectionTitle>
                    {field("eyebrow", "Eyebrow")}
                    {field("title", "Titre")}
                    {field("subtitle", "Sous-titre", "textarea")}
                    <TextListEditor
                        label="✅ C'est pour toi si…"
                        items={s.goodFit || []}
                        onUpdate={(v) => updateField("honesty", "goodFit", v)}
                    />
                    <TextListEditor
                        label="❌ Ce n'est pas pour toi si…"
                        items={s.badFit || []}
                        onUpdate={(v) => updateField("honesty", "badFit", v)}
                    />
                    {field("footer", "Note de bas", "textarea")}
                </>
            );

        case "calendar":
            return (
                <>
                    <SectionTitle>Calendrier</SectionTitle>
                    {field("eyebrow", "Eyebrow")}
                    {field("titleBefore", "Titre (avant)")}
                    {field("titleHighlight", "Titre (highlight)")}
                    {field("embedUrl", "URL du calendrier (embed)")}
                    <TextListEditor
                        label="Bénéfices listés"
                        items={s.benefits || []}
                        onUpdate={(v) => updateField("calendar", "benefits", v)}
                    />
                </>
            );

        case "testimonials":
            return (
                <>
                    <SectionTitle>Témoignages écrits</SectionTitle>
                    {field("eyebrow", "Eyebrow")}
                    {field("titleBefore", "Titre (avant)")}
                    {field("titleHighlight", "Titre (highlight)")}
                    <MiniRepeater
                        label="Témoignages"
                        items={s.items || []}
                        onUpdate={(v) => updateField("testimonials", "items", v)}
                        fields={[
                            { key: "name", label: "Nom", default: "" },
                            { key: "role", label: "Rôle", default: "" },
                            { key: "quote", label: "Citation", type: "textarea", default: "" },
                            { key: "rating", label: "Note (1-5)", type: "number", default: 5 },
                        ]}
                    />
                </>
            );

        case "faq":
            return (
                <>
                    <SectionTitle>FAQ</SectionTitle>
                    {field("eyebrow", "Eyebrow")}
                    {field("titleBefore", "Titre (avant)")}
                    {field("titleHighlight", "Titre (highlight)")}
                    <MiniRepeater
                        label="Questions"
                        items={s.items || []}
                        onUpdate={(v) => updateField("faq", "items", v)}
                        fields={[
                            { key: "q", label: "Question", default: "" },
                            { key: "a", label: "Réponse", type: "textarea", default: "" },
                        ]}
                    />
                </>
            );

        case "finalCTA":
            return (
                <>
                    <SectionTitle>CTA Final</SectionTitle>
                    {field("eyebrow", "Eyebrow")}
                    {field("titleBefore", "Titre (avant)")}
                    {field("titleHighlight", "Titre (highlight)")}
                    {field("titleAfter", "Titre (après)")}
                    {field("subtitle", "Sous-titre", "textarea")}
                    {field("cta", "Texte bouton")}
                    {field("ctaLink", "Lien CTA")}
                </>
            );

        case "_global": {
            // Global fields use different top-level paths
            const globalField = (section, key, label, type = "text") => {
                const val = (config[section] || {})[key] ?? "";
                const onChange = (v) => updateField(section, key, v);
                return (
                    <div key={`${section}.${key}`} style={{ marginBottom: 12 }}>
                        <label style={miniLabelStyle}>{label}</label>
                        {type === "textarea" ? (
                            <textarea value={val} onChange={(e) => onChange(e.target.value)} rows={3} style={inputStyle} />
                        ) : type === "image" ? (
                            <FileUpload value={val} onChange={onChange} folder="branding" />
                        ) : type === "select" ? null : (
                            <input value={val} onChange={(e) => onChange(e.target.value)} style={inputStyle} />
                        )}
                    </div>
                );
            };

            const themes = [
                { value: "trust", label: "🔵 Trust (Bleu nuit)" },
                { value: "vibrant", label: "🟣 Vibrant (Indigo)" },
                { value: "luxury", label: "🟤 Luxury (Or noir)" },
                { value: "healthcare", label: "🟢 Healthcare (Teal)" },
                { value: "creative", label: "🟡 Creative (Rose-violet)" },
                { value: "dark", label: "⚫ Dark (Noir pur)" },
                { value: "obsidian", label: "🔴 Obsidian (Rouge-or)" },
            ];

            return (
                <>
                    <SectionTitle>🏷️ Marque</SectionTitle>
                    {globalField("meta", "brandName", "Nom de la marque")}
                    {globalField("meta", "logo", "Logo (URL ou upload)", "image")}
                    {globalField("meta", "tagline", "Tagline / Slogan")}
                    {globalField("meta", "favicon", "Favicon (emoji ou URL)")}
                    {globalField("navbar", "ctaText", "Texte bouton Navbar (ex: Réserver un Appel)")}
                    <MiniRepeater
                        label="🧭 Liens de navigation"
                        items={config?.navbar?.links || [
                            { href: "#services", label: "Services" },
                            { href: "#resultats", label: "Résultats" },
                            { href: "#temoignages", label: "Témoignages" },
                            { href: "#processus", label: "Processus" },
                            { href: "#faq", label: "FAQ" },
                        ]}
                        onUpdate={(v) => updateField("navbar", "links", v)}
                        fields={[
                            { key: "label", label: "Texte", default: "" },
                            { key: "href", label: "Ancre (ex: #services)", default: "#" },
                        ]}
                    />

                    <SectionTitle>🔗 Liens globaux</SectionTitle>
                    {globalField("links", "whatsapp", "Numéro WhatsApp (ex: 33612345678)")}
                    {globalField("links", "calendly", "URL Calendly")}
                    {globalField("links", "calendar", "URL calendrier RDV")}

                    <SectionTitle>🎨 Design</SectionTitle>
                    <div style={{ marginBottom: 12 }}>
                        <label style={miniLabelStyle}>Palette de couleurs</label>
                        <select
                            value={config?.design?.palette || "trust"}
                            onChange={(e) => updateField("design", "palette", e.target.value)}
                            style={{ ...inputStyle, cursor: "pointer" }}
                        >
                            {themes.map((t) => (
                                <option key={t.value} value={t.value}>{t.label}</option>
                            ))}
                        </select>
                    </div>
                    {globalField("design", "fontHeading", "Police titres (Google Fonts)")}
                    {globalField("design", "fontBody", "Police corps (Google Fonts)")}

                    <SectionTitle>📊 Tracking</SectionTitle>
                    {globalField("tracking", "metaPixelId", "Meta Pixel ID")}
                    {globalField("tracking", "gaId", "Google Analytics ID")}

                    <SectionTitle>📝 SEO / Méta</SectionTitle>
                    {globalField("meta", "title", "Titre de la page")}
                    {globalField("meta", "description", "Meta description", "textarea")}
                    {globalField("meta", "keywords", "Mots-clés (séparés par virgule)")}
                    {globalField("meta", "ogTitle", "OG Title (partage social)")}
                    {globalField("meta", "ogDescription", "OG Description", "textarea")}
                    {globalField("meta", "ogImage", "OG Image", "image")}
                </>
            );
        }

        default:
            return <p style={{ color: "#94A3B8", fontSize: 14 }}>Pas de champs éditables pour cette section.</p>;
    }
}

/* ════════════════════════════════════════════
   MAIN PANEL COMPONENT
   ════════════════════════════════════════════ */

export default function SectionEditPanel({ sectionKey, config, onConfigChange, onClose }) {
    if (!sectionKey) return null;

    const updateField = (section, key, value) => {
        onConfigChange({
            ...config,
            [section]: {
                ...(config[section] || {}),
                [key]: value,
            },
        });
    };

    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                right: 0,
                width: 420,
                height: "100vh",
                background: "#0F172A",
                borderLeft: "1px solid #1E293B",
                zIndex: 1000,
                display: "flex",
                flexDirection: "column",
                boxShadow: "-4px 0 30px rgba(0,0,0,0.4)",
            }}
        >
            {/* Header */}
            <div style={{
                padding: "16px 20px",
                borderBottom: "1px solid #1E293B",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexShrink: 0,
            }}>
                <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: "#F8FAFC" }}>
                    Éditer la section
                </h3>
                <button
                    onClick={onClose}
                    style={{
                        background: "#1E293B",
                        border: "1px solid #334155",
                        borderRadius: 6,
                        padding: "6px 14px",
                        color: "#94A3B8",
                        cursor: "pointer",
                        fontSize: 13,
                        fontWeight: 600,
                    }}
                >
                    ✕ Fermer
                </button>
            </div>

            {/* Scrollable content */}
            <div style={{
                flex: 1,
                overflowY: "auto",
                padding: "16px 20px",
            }}>
                {renderSectionFields(sectionKey, config, updateField)}
            </div>
        </div>
    );
}

/* ── Shared styles ── */
function SectionTitle({ children }) {
    return (
        <h4 style={{
            fontSize: 14,
            fontWeight: 700,
            color: "#3B82F6",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            marginBottom: 16,
            paddingBottom: 8,
            borderBottom: "1px solid #1E293B",
        }}>
            {children}
        </h4>
    );
}

const inputStyle = {
    width: "100%",
    padding: "8px 12px",
    borderRadius: 6,
    border: "1px solid #334155",
    background: "#1E293B",
    color: "#F8FAFC",
    fontSize: 13,
    fontFamily: "inherit",
    outline: "none",
    resize: "vertical",
    boxSizing: "border-box",
};

const miniLabelStyle = {
    display: "block",
    fontSize: 11,
    fontWeight: 600,
    color: "#64748B",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    marginBottom: 4,
};

const addBtnStyle = {
    padding: "4px 12px",
    borderRadius: 6,
    border: "1px solid #3B82F6",
    background: "transparent",
    color: "#3B82F6",
    fontSize: 12,
    cursor: "pointer",
    fontWeight: 600,
};
