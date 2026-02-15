"use client";

import { useState } from "react";
import Input from "../components/ui/Input";
import Textarea from "../components/ui/Textarea";
import Select from "../components/ui/Select";
import FileUpload from "../components/ui/FileUpload";
import RepeaterField from "../components/ui/RepeaterField";
import {
    Save,
    ExternalLink,
    Layout,
    Type,
    Target,
    BarChart3,
    Route,
    MessageSquareQuote,
    Palette,
    Settings,
} from "lucide-react";

/* ───────── Tab config ───────── */
const TABS = [
    { id: "hero", label: "Hero & Intro", icon: Layout },
    { id: "probleme", label: "Problème", icon: Target },
    { id: "resultats", label: "Résultats", icon: BarChart3 },
    { id: "services", label: "Services", icon: Type },
    { id: "parcours", label: "Parcours", icon: Route },
    { id: "social", label: "Preuve Sociale", icon: MessageSquareQuote },
    { id: "design", label: "Design & Thème", icon: Palette },
    { id: "seo", label: "SEO & Config", icon: Settings },
];

/* ───────── Color palette options ───────── */
const PALETTES = [
    { value: "trust", label: "🔵 Trust — Bleu professionnel" },
    { value: "vibrant", label: "🟣 Vibrant — Violet / Magenta" },
    { value: "luxury", label: "🟡 Luxury — Or & Noir" },
    { value: "healthcare", label: "🟢 Healthcare — Vert apaisant" },
    { value: "creative", label: "🟠 Creative — Orange & Coral" },
    { value: "dark", label: "⚫ Dark — Gris & Blanc" },
    { value: "obsidian", label: "🔴 Obsidian — Rouge & Or" },
    { value: "sunset", label: "🌅 Sunset — Rose & Doré" },
    { value: "ocean", label: "🌊 Ocean — Bleu teal" },
];

const STYLES = [
    { value: "linear", label: "Linear — Clean & Moderne" },
    { value: "glassmorphism", label: "Glassmorphism — Verre & Flou" },
    { value: "aurora", label: "Aurora — Gradients néon" },
    { value: "bento", label: "Bento — Grille japonaise" },
    { value: "minimal", label: "Minimal — Espace & Simplicité" },
    { value: "brutalist", label: "Brutalist — Bold & Brut" },
];

const FONTS = [
    { value: "Inter", label: "Inter — Moderne & Lisible" },
    { value: "Montserrat", label: "Montserrat — Géométrique" },
    { value: "Playfair Display", label: "Playfair — Élégant & Serif" },
    { value: "Roboto", label: "Roboto — Google standard" },
    { value: "Lato", label: "Lato — Humaniste" },
    { value: "Space Grotesk", label: "Space Grotesk — Tech" },
    { value: "DM Sans", label: "DM Sans — Friendly" },
    { value: "Outfit", label: "Outfit — Contemporary" },
];

/* ═══════════════════════════════════════ */
export default function Dashboard({ config, onSave, saving, saveMsg }) {
    const [activeTab, setActiveTab] = useState("hero");
    const [formData, setFormData] = useState(config || {});

    /* Helper: deeply set a nested field */
    const updateField = (section, key, value) => {
        setFormData((prev) => ({
            ...prev,
            [section]: { ...prev[section], [key]: value },
        }));
    };

    const updateItems = (section, items) => {
        setFormData((prev) => ({
            ...prev,
            [section]: { ...prev[section], items },
        }));
    };

    /* ── Shared heading component ── */
    const SectionHeading = ({ children }) => (
        <h3 className="text-lg font-semibold text-white border-b border-slate-800 pb-2 mb-4">
            {children}
        </h3>
    );

    return (
        <div className="min-h-screen bg-slate-900 text-slate-50 flex">
            {/* ───── Sidebar ───── */}
            <aside className="w-64 border-r border-slate-800 p-6 flex flex-col gap-6 shrink-0 sticky top-0 h-screen overflow-y-auto">
                <div className="flex items-center gap-2 px-2">
                    <span className="text-2xl">🏭</span>
                    <span className="font-bold text-sm">Landing Factory</span>
                </div>

                <nav className="flex flex-col gap-1">
                    {TABS.map((tab) => {
                        const Icon = tab.icon;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === tab.id
                                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                                    : "text-slate-400 hover:text-white hover:bg-slate-800"
                                    }`}
                            >
                                <Icon className="w-4 h-4" />
                                {tab.label}
                            </button>
                        );
                    })}
                </nav>

                <div className="mt-auto pt-6 border-t border-slate-800 space-y-2">
                    <a
                        href="/"
                        target="_blank"
                        className="flex items-center gap-2 px-3 py-2 text-sm text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                    >
                        <ExternalLink className="w-4 h-4" />
                        Voir le site
                    </a>
                </div>
            </aside>

            {/* ───── Main ───── */}
            <main className="flex-1 flex flex-col min-w-0">
                {/* Header bar */}
                <header className="h-16 border-b border-slate-800 flex items-center justify-between px-8 bg-slate-900/80 backdrop-blur sticky top-0 z-10">
                    <h1 className="text-lg font-semibold">
                        {TABS.find((t) => t.id === activeTab)?.label}
                    </h1>
                    <div className="flex items-center gap-4">
                        {saveMsg && (
                            <span className="text-sm text-green-400 animate-pulse">
                                {saveMsg}
                            </span>
                        )}
                        <button
                            onClick={() => onSave(formData)}
                            disabled={saving}
                            className="flex items-center gap-2 px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium text-sm transition-all disabled:opacity-50 shadow-lg shadow-blue-600/20"
                        >
                            <Save className="w-4 h-4" />
                            {saving ? "Sauvegarde..." : "Enregistrer"}
                        </button>
                    </div>
                </header>

                {/* Content */}
                <div className="p-8 max-w-4xl overflow-y-auto flex-1">
                    {/* ============================================
                        TAB 1: HERO & INTRO
                    ============================================ */}
                    {activeTab === "hero" && (
                        <div className="space-y-10">
                            <section className="space-y-4">
                                <SectionHeading>Texte principal</SectionHeading>
                                <Input
                                    label="Headline (H1)"
                                    value={formData.hero?.headline || ""}
                                    onChange={(e) => updateField("hero", "headline", e.target.value)}
                                    placeholder="Votre promesse principale"
                                />
                                <Textarea
                                    label="Sous-titre (subheadline)"
                                    value={formData.hero?.subheadline || ""}
                                    onChange={(e) => updateField("hero", "subheadline", e.target.value)}
                                    rows={2}
                                    placeholder="Développez votre proposition de valeur..."
                                />
                            </section>

                            <section className="space-y-4">
                                <SectionHeading>Call to Action</SectionHeading>
                                <div className="grid grid-cols-2 gap-4">
                                    <Input
                                        label="Texte du bouton"
                                        value={formData.hero?.cta || ""}
                                        onChange={(e) => updateField("hero", "cta", e.target.value)}
                                        placeholder="Réserver un appel"
                                    />
                                    <Input
                                        label="Lien du CTA"
                                        value={formData.hero?.ctaLink || ""}
                                        onChange={(e) => updateField("hero", "ctaLink", e.target.value)}
                                        placeholder="#calendar"
                                    />
                                </div>
                                <Input
                                    label="Texte de réassurance (sous le bouton)"
                                    value={formData.hero?.subtext || ""}
                                    onChange={(e) => updateField("hero", "subtext", e.target.value)}
                                    placeholder="Sans engagement · 100% gratuit"
                                />
                            </section>

                            <section className="space-y-4">
                                <SectionHeading>Médias Hero</SectionHeading>
                                <FileUpload
                                    label="Image Hero (ou portrait)"
                                    folder="hero"
                                    value={formData.hero?.image || ""}
                                    onChange={(url) => updateField("hero", "image", url)}
                                />
                                <Input
                                    label="OU Vidéo YouTube (URL ou ID)"
                                    value={formData.hero?.videoUrl || ""}
                                    onChange={(e) => updateField("hero", "videoUrl", e.target.value)}
                                    placeholder="https://youtube.com/watch?v=..."
                                />
                            </section>

                            <section className="space-y-4">
                                <SectionHeading>Compteurs Hero</SectionHeading>
                                <RepeaterField
                                    label="Statistiques clés"
                                    items={formData.hero?.stats || []}
                                    onChange={(items) => updateField("hero", "stats", items)}
                                    newItem={() => ({ value: "", label: "" })}
                                    addLabel="Ajouter un compteur"
                                    max={4}
                                    renderItem={(item, i, update) => (
                                        <div className="grid grid-cols-2 gap-3">
                                            <Input label="Valeur" value={item.value || ""} onChange={(e) => update({ ...item, value: e.target.value })} placeholder="2M+" />
                                            <Input label="Label" value={item.label || ""} onChange={(e) => update({ ...item, label: e.target.value })} placeholder="CA généré" />
                                        </div>
                                    )}
                                />
                            </section>

                            <section className="space-y-4">
                                <SectionHeading>Bandeau Social Proof (défilement)</SectionHeading>
                                <RepeaterField
                                    label="Noms clients / marques"
                                    items={formData.socialProof?.items || []}
                                    onChange={(items) => updateItems("socialProof", items)}
                                    simple
                                    simplePlaceholder="Nom du client ou marque"
                                    addLabel="Ajouter un nom"
                                    max={20}
                                />
                            </section>
                        </div>
                    )}

                    {/* ============================================
                        TAB 2: PROBLÈME
                    ============================================ */}
                    {activeTab === "probleme" && (
                        <div className="space-y-10">
                            <section className="space-y-4">
                                <SectionHeading>En-tête de section</SectionHeading>
                                <Input label="Sur-titre (eyebrow)" value={formData.painPoints?.eyebrow || ""} onChange={(e) => updateField("painPoints", "eyebrow", e.target.value)} placeholder="Le Problème" />
                                <Input label="Titre" value={formData.painPoints?.title || ""} onChange={(e) => updateField("painPoints", "title", e.target.value)} />
                                <Input label="Sous-titre" value={formData.painPoints?.subtitle || ""} onChange={(e) => updateField("painPoints", "subtitle", e.target.value)} />
                            </section>

                            <section className="space-y-4">
                                <RepeaterField
                                    label="Points de douleur"
                                    items={formData.painPoints?.items || []}
                                    onChange={(items) => updateItems("painPoints", items)}
                                    newItem={() => ({ icon: "", title: "", description: "", tag: "" })}
                                    addLabel="Ajouter un pain point"
                                    max={6}
                                    renderItem={(item, i, update) => (
                                        <div className="space-y-3">
                                            <div className="grid grid-cols-[80px_1fr] gap-3">
                                                <Input label="Emoji" value={item.icon || ""} onChange={(e) => update({ ...item, icon: e.target.value })} placeholder="📦" />
                                                <Input label="Titre" value={item.title || ""} onChange={(e) => update({ ...item, title: e.target.value })} />
                                            </div>
                                            <Textarea label="Description" value={item.description || ""} onChange={(e) => update({ ...item, description: e.target.value })} rows={2} />
                                            <Input label="Tag (badge)" value={item.tag || ""} onChange={(e) => update({ ...item, tag: e.target.value })} placeholder="Budget perdu" />
                                        </div>
                                    )}
                                />
                            </section>
                        </div>
                    )}

                    {/* ============================================
                        TAB 3: RÉSULTATS
                    ============================================ */}
                    {activeTab === "resultats" && (
                        <div className="space-y-10">
                            {/* Results / Case Studies */}
                            <section className="space-y-4">
                                <SectionHeading>Études de cas</SectionHeading>
                                <div className="grid grid-cols-2 gap-4">
                                    <Input label="Sur-titre (eyebrow)" value={formData.results?.eyebrow || ""} onChange={(e) => updateField("results", "eyebrow", e.target.value)} placeholder="Études de Cas" />
                                    <Input label="Titre highlight" value={formData.results?.titleHighlight || ""} onChange={(e) => updateField("results", "titleHighlight", e.target.value)} />
                                </div>
                            </section>

                            <section className="space-y-4">
                                <RepeaterField
                                    label="Clients / Cas"
                                    items={formData.results?.items || []}
                                    onChange={(items) => updateItems("results", items)}
                                    newItem={() => ({ name: "", domain: "", image: "", quote: "", metrics: [{ value: 0, suffix: "", label: "" }] })}
                                    addLabel="Ajouter un cas client"
                                    max={8}
                                    renderItem={(item, i, update) => (
                                        <div className="space-y-3">
                                            <div className="grid grid-cols-2 gap-3">
                                                <Input label="Nom" value={item.name || ""} onChange={(e) => update({ ...item, name: e.target.value })} />
                                                <Input label="Domaine / Niche" value={item.domain || ""} onChange={(e) => update({ ...item, domain: e.target.value })} />
                                            </div>
                                            <FileUpload
                                                label="Photo du client"
                                                folder="results"
                                                value={item.image || ""}
                                                onChange={(url) => update({ ...item, image: url })}
                                            />
                                            <Textarea label="Citation / Témoignage" value={item.quote || ""} onChange={(e) => update({ ...item, quote: e.target.value })} rows={2} />
                                            <div className="border-t border-slate-700 pt-3 mt-2">
                                                <p className="text-xs font-medium text-slate-400 mb-2">📊 Métriques</p>
                                                {(item.metrics || []).map((m, mi) => (
                                                    <div key={mi} className="grid grid-cols-[100px_80px_1fr_40px] gap-2 mb-2 items-end">
                                                        <Input label={mi === 0 ? "Valeur" : ""} type="number" value={m.value || 0} onChange={(e) => { const mets = [...(item.metrics || [])]; mets[mi] = { ...mets[mi], value: Number(e.target.value) }; update({ ...item, metrics: mets }); }} />
                                                        <Input label={mi === 0 ? "Suf." : ""} value={m.suffix || ""} onChange={(e) => { const mets = [...(item.metrics || [])]; mets[mi] = { ...mets[mi], suffix: e.target.value }; update({ ...item, metrics: mets }); }} placeholder="K€" />
                                                        <Input label={mi === 0 ? "Label" : ""} value={m.label || ""} onChange={(e) => { const mets = [...(item.metrics || [])]; mets[mi] = { ...mets[mi], label: e.target.value }; update({ ...item, metrics: mets }); }} />
                                                        <button type="button" onClick={() => { update({ ...item, metrics: (item.metrics || []).filter((_, j) => j !== mi) }); }} className="text-xs text-red-400 hover:text-red-300 pb-2">✕</button>
                                                    </div>
                                                ))}
                                                <button type="button" onClick={() => update({ ...item, metrics: [...(item.metrics || []), { value: 0, suffix: "", label: "" }] })} className="text-xs text-blue-400 hover:text-blue-300 mt-1">+ Ajouter métrique</button>
                                            </div>
                                        </div>
                                    )}
                                />
                            </section>

                            {/* Video Testimonials */}
                            <section className="space-y-4">
                                <SectionHeading>Témoignages Vidéo</SectionHeading>
                                <RepeaterField
                                    label="Vidéos YouTube"
                                    items={formData.videoTestimonials?.items || []}
                                    onChange={(items) => updateItems("videoTestimonials", items)}
                                    newItem={() => ({ name: "", videoId: "", highlight: "" })}
                                    addLabel="Ajouter une vidéo"
                                    max={6}
                                    renderItem={(item, i, update) => (
                                        <div className="space-y-3">
                                            <div className="grid grid-cols-3 gap-3">
                                                <Input label="Nom" value={item.name || ""} onChange={(e) => update({ ...item, name: e.target.value })} />
                                                <Input label="YouTube Video ID" value={item.videoId || ""} onChange={(e) => update({ ...item, videoId: e.target.value })} placeholder="dQw4w9WgXcQ" />
                                                <Input label="Highlight" value={item.highlight || ""} onChange={(e) => update({ ...item, highlight: e.target.value })} placeholder="+200% CA" />
                                            </div>
                                            <FileUpload
                                                label="Miniature personnalisée (optionnel)"
                                                folder="videos"
                                                value={item.thumbnail || ""}
                                                onChange={(url) => update({ ...item, thumbnail: url })}
                                            />
                                        </div>
                                    )}
                                />
                            </section>
                        </div>
                    )}

                    {/* ============================================
                        TAB 4: SERVICES
                    ============================================ */}
                    {activeTab === "services" && (
                        <div className="space-y-10">
                            <section className="space-y-4">
                                <SectionHeading>En-tête</SectionHeading>
                                <Input label="Sur-titre (eyebrow)" value={formData.services?.eyebrow || ""} onChange={(e) => updateField("services", "eyebrow", e.target.value)} />
                                <Input label="Titre" value={formData.services?.title || ""} onChange={(e) => updateField("services", "title", e.target.value)} />
                                <Input label="Sous-titre" value={formData.services?.subtitle || ""} onChange={(e) => updateField("services", "subtitle", e.target.value)} />
                            </section>

                            <section className="space-y-4">
                                <RepeaterField
                                    label="Services / Prestations"
                                    items={formData.services?.items || []}
                                    onChange={(items) => updateItems("services", items)}
                                    newItem={() => ({ icon: "", title: "", description: "", badge: "", image: "" })}
                                    addLabel="Ajouter un service"
                                    max={8}
                                    renderItem={(item, i, update) => (
                                        <div className="space-y-3">
                                            <div className="grid grid-cols-[80px_1fr_120px] gap-3">
                                                <Input label="Emoji" value={item.icon || ""} onChange={(e) => update({ ...item, icon: e.target.value })} placeholder="🎯" />
                                                <Input label="Titre" value={item.title || ""} onChange={(e) => update({ ...item, title: e.target.value })} />
                                                <Input label="Badge" value={item.badge || ""} onChange={(e) => update({ ...item, badge: e.target.value })} placeholder="Core" />
                                            </div>
                                            <Textarea label="Description" value={item.description || ""} onChange={(e) => update({ ...item, description: e.target.value })} rows={2} />
                                            <FileUpload
                                                label="Image / Illustration (optionnel)"
                                                folder="services"
                                                value={item.image || ""}
                                                onChange={(url) => update({ ...item, image: url })}
                                            />
                                        </div>
                                    )}
                                />
                            </section>
                        </div>
                    )}

                    {/* ============================================
                        TAB 5: PARCOURS
                    ============================================ */}
                    {activeTab === "parcours" && (
                        <div className="space-y-10">
                            {/* Process / Timeline */}
                            <section className="space-y-4">
                                <SectionHeading>Processus / Étapes</SectionHeading>
                                <Input label="Sur-titre" value={formData.process?.eyebrow || ""} onChange={(e) => updateField("process", "eyebrow", e.target.value)} />
                                <Input label="Titre" value={formData.process?.title || ""} onChange={(e) => updateField("process", "title", e.target.value)} />
                                <RepeaterField
                                    label="Étapes du parcours"
                                    items={formData.process?.items || []}
                                    onChange={(items) => updateItems("process", items)}
                                    newItem={() => ({ number: "", title: "", description: "" })}
                                    addLabel="Ajouter une étape"
                                    max={6}
                                    renderItem={(item, i, update) => (
                                        <div className="space-y-3">
                                            <div className="grid grid-cols-[80px_1fr] gap-3">
                                                <Input label="Nº" value={item.number || ""} onChange={(e) => update({ ...item, number: e.target.value })} placeholder="01" />
                                                <Input label="Titre" value={item.title || ""} onChange={(e) => update({ ...item, title: e.target.value })} />
                                            </div>
                                            <Textarea label="Description" value={item.description || ""} onChange={(e) => update({ ...item, description: e.target.value })} rows={2} />
                                        </div>
                                    )}
                                />
                            </section>

                            {/* Honesty */}
                            <section className="space-y-4">
                                <SectionHeading>Pour qui / Pas pour qui (Honesty)</SectionHeading>
                                <Input label="Titre section" value={formData.honesty?.title || ""} onChange={(e) => updateField("honesty", "title", e.target.value)} />
                                <div className="grid grid-cols-2 gap-6">
                                    <RepeaterField
                                        label="✅ Bon fit — C'est pour vous si..."
                                        items={formData.honesty?.goodFit || []}
                                        onChange={(items) => updateField("honesty", "goodFit", items)}
                                        simple simplePlaceholder="Profil idéal" addLabel="Ajouter" max={8}
                                    />
                                    <RepeaterField
                                        label="❌ Pas pour vous si..."
                                        items={formData.honesty?.badFit || []}
                                        onChange={(items) => updateField("honesty", "badFit", items)}
                                        simple simplePlaceholder="Profil incompatible" addLabel="Ajouter" max={8}
                                    />
                                </div>
                            </section>

                            {/* Calendar / Booking */}
                            <section className="space-y-4">
                                <SectionHeading>Calendrier / Prise de RDV</SectionHeading>
                                <Input label="URL iframe (GoHighLevel / Calendly)" value={formData.calendar?.bookingUrl || ""} onChange={(e) => updateField("calendar", "bookingUrl", e.target.value)} placeholder="https://api.leadconnectorhq.com/widget/booking/..." />
                                <Input label="Titre section" value={formData.calendar?.title || ""} onChange={(e) => updateField("calendar", "title", e.target.value)} />
                                <RepeaterField
                                    label="Liste d'avantages (checklist)"
                                    items={formData.calendar?.benefits || []}
                                    onChange={(items) => updateField("calendar", "benefits", items)}
                                    simple simplePlaceholder="Analyse gratuite de votre situation" addLabel="Ajouter un avantage" max={6}
                                />
                            </section>
                        </div>
                    )}

                    {/* ============================================
                        TAB 6: PREUVE SOCIALE
                    ============================================ */}
                    {activeTab === "social" && (
                        <div className="space-y-10">
                            {/* Testimonials */}
                            <section className="space-y-4">
                                <SectionHeading>Témoignages (Carousel)</SectionHeading>
                                <Input label="Titre section" value={formData.testimonials?.title || ""} onChange={(e) => updateField("testimonials", "title", e.target.value)} />
                                <RepeaterField
                                    label="Témoignages"
                                    items={formData.testimonials?.items || []}
                                    onChange={(items) => updateItems("testimonials", items)}
                                    newItem={() => ({ name: "", role: "", text: "", avatar: "" })}
                                    addLabel="Ajouter un témoignage"
                                    max={12}
                                    renderItem={(item, i, update) => (
                                        <div className="space-y-3">
                                            <div className="grid grid-cols-2 gap-3">
                                                <Input label="Nom" value={item.name || ""} onChange={(e) => update({ ...item, name: e.target.value })} />
                                                <Input label="Rôle / Entreprise" value={item.role || ""} onChange={(e) => update({ ...item, role: e.target.value })} />
                                            </div>
                                            <Textarea label="Texte du témoignage" value={item.text || ""} onChange={(e) => update({ ...item, text: e.target.value })} rows={3} />
                                            <FileUpload
                                                label="Photo / Avatar (optionnel)"
                                                folder="testimonials"
                                                value={item.avatar || ""}
                                                onChange={(url) => update({ ...item, avatar: url })}
                                            />
                                        </div>
                                    )}
                                />
                            </section>

                            {/* FAQ */}
                            <section className="space-y-4">
                                <SectionHeading>FAQ</SectionHeading>
                                <Input label="Titre section" value={formData.faq?.title || ""} onChange={(e) => updateField("faq", "title", e.target.value)} />
                                <RepeaterField
                                    label="Questions / Réponses"
                                    items={formData.faq?.items || []}
                                    onChange={(items) => updateItems("faq", items)}
                                    newItem={() => ({ q: "", a: "" })}
                                    addLabel="Ajouter une FAQ"
                                    max={12}
                                    renderItem={(item, i, update) => (
                                        <div className="space-y-3">
                                            <Input label="Question" value={item.q || ""} onChange={(e) => update({ ...item, q: e.target.value })} />
                                            <Textarea label="Réponse" value={item.a || ""} onChange={(e) => update({ ...item, a: e.target.value })} rows={3} />
                                        </div>
                                    )}
                                />
                            </section>

                            {/* Final CTA */}
                            <section className="space-y-4">
                                <SectionHeading>CTA Final (en bas de page)</SectionHeading>
                                <Input label="Headline" value={formData.finalCTA?.headline || ""} onChange={(e) => updateField("finalCTA", "headline", e.target.value)} placeholder="Prêt à transformer vos résultats ?" />
                                <Input label="Sous-titre" value={formData.finalCTA?.subtitle || ""} onChange={(e) => updateField("finalCTA", "subtitle", e.target.value)} />
                                <div className="grid grid-cols-2 gap-4">
                                    <Input label="Texte bouton" value={formData.finalCTA?.ctaText || ""} onChange={(e) => updateField("finalCTA", "ctaText", e.target.value)} placeholder="Réserver mon appel" />
                                    <Input label="Lien bouton" value={formData.finalCTA?.ctaLink || ""} onChange={(e) => updateField("finalCTA", "ctaLink", e.target.value)} placeholder="#calendar" />
                                </div>
                                <FileUpload
                                    label="Image de fond (optionnel)"
                                    folder="cta"
                                    value={formData.finalCTA?.bgImage || ""}
                                    onChange={(url) => updateField("finalCTA", "bgImage", url)}
                                />
                            </section>
                        </div>
                    )}

                    {/* ============================================
                        TAB 7: DESIGN & THÈME
                    ============================================ */}
                    {activeTab === "design" && (
                        <div className="space-y-10">
                            <section className="space-y-4">
                                <SectionHeading>🎨 Palette de couleurs</SectionHeading>
                                <p className="text-sm text-slate-400 -mt-2">
                                    Choisissez l'ambiance visuelle de votre landing page
                                </p>
                                <Select
                                    label="Palette"
                                    value={formData.design?.palette || "trust"}
                                    onChange={(e) => updateField("design", "palette", e.target.value)}
                                    options={PALETTES}
                                />
                                <div className="flex items-center gap-4 mt-2">
                                    <label className="text-sm text-slate-300">Couleur d'accentuation personnalisée</label>
                                    <input
                                        type="color"
                                        value={formData.design?.accentColor || "#3b82f6"}
                                        onChange={(e) => updateField("design", "accentColor", e.target.value)}
                                        className="w-10 h-10 rounded-lg border border-slate-700 cursor-pointer bg-transparent"
                                    />
                                    <span className="text-xs text-slate-500 font-mono">
                                        {formData.design?.accentColor || "#3b82f6"}
                                    </span>
                                </div>
                            </section>

                            <section className="space-y-4">
                                <SectionHeading>✨ Style visuel</SectionHeading>
                                <Select
                                    label="Style"
                                    value={formData.design?.style || "linear"}
                                    onChange={(e) => updateField("design", "style", e.target.value)}
                                    options={STYLES}
                                />
                            </section>

                            <section className="space-y-4">
                                <SectionHeading>🔤 Typographie</SectionHeading>
                                <div className="grid grid-cols-2 gap-4">
                                    <Select
                                        label="Police des titres"
                                        value={formData.design?.fontHeading || "Inter"}
                                        onChange={(e) => updateField("design", "fontHeading", e.target.value)}
                                        options={FONTS}
                                    />
                                    <Select
                                        label="Police du corps"
                                        value={formData.design?.fontBody || "Inter"}
                                        onChange={(e) => updateField("design", "fontBody", e.target.value)}
                                        options={FONTS}
                                    />
                                </div>
                            </section>

                            <section className="space-y-4">
                                <SectionHeading>🖼 Branding</SectionHeading>
                                <div className="grid grid-cols-2 gap-6">
                                    <FileUpload
                                        label="Logo principal"
                                        folder="brand"
                                        value={formData.meta?.logo || ""}
                                        onChange={(url) => updateField("meta", "logo", url)}
                                    />
                                    <FileUpload
                                        label="Favicon"
                                        folder="brand"
                                        value={formData.meta?.favicon || ""}
                                        onChange={(url) => updateField("meta", "favicon", url)}
                                    />
                                </div>
                                <FileUpload
                                    label="Image OG (partage réseaux sociaux)"
                                    folder="brand"
                                    value={formData.meta?.ogImage || ""}
                                    onChange={(url) => updateField("meta", "ogImage", url)}
                                />
                            </section>

                            <section className="space-y-4">
                                <SectionHeading>🌙 Mode sombre</SectionHeading>
                                <div className="flex items-center gap-4">
                                    <label className="text-sm text-slate-300">Mode sombre activé</label>
                                    <button
                                        type="button"
                                        onClick={() => updateField("design", "darkMode", !(formData.design?.darkMode ?? true))}
                                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${(formData.design?.darkMode ?? true) ? "bg-blue-600" : "bg-slate-700"
                                            }`}
                                    >
                                        <span className={`inline-block h-4 w-4 transform bg-white rounded-full transition-transform ${(formData.design?.darkMode ?? true) ? "translate-x-6" : "translate-x-1"
                                            }`} />
                                    </button>
                                </div>
                                <p className="text-xs text-slate-500">Le mode sombre est recommandé pour les landing pages premium</p>
                            </section>
                        </div>
                    )}

                    {/* ============================================
                        TAB 8: SEO & CONFIG
                    ============================================ */}
                    {activeTab === "seo" && (
                        <div className="space-y-10">
                            <section className="space-y-4">
                                <SectionHeading>Métadonnées SEO</SectionHeading>
                                <Input label="Titre de la page (balise title)" value={formData.meta?.title || ""} onChange={(e) => updateField("meta", "title", e.target.value)} placeholder="StarsBridgeSystem — Votre Scaling Partner" />
                                <Input label="Nom de marque (navbar/footer)" value={formData.meta?.brandName || ""} onChange={(e) => updateField("meta", "brandName", e.target.value)} />
                                <Textarea label="Meta description" value={formData.meta?.description || ""} onChange={(e) => updateField("meta", "description", e.target.value)} rows={3} placeholder="Description de votre landing page pour Google (max 160 caractères)" />
                            </section>

                            <section className="space-y-4">
                                <SectionHeading>Liens & Contact</SectionHeading>
                                <Input label="Lien prise de RDV (calendrier)" value={formData.links?.calendar || ""} onChange={(e) => updateField("links", "calendar", e.target.value)} />
                                <Input label="WhatsApp" value={formData.links?.whatsapp || ""} onChange={(e) => updateField("links", "whatsapp", e.target.value)} placeholder="https://wa.me/33612345678" />
                                <Input label="Email de contact" value={formData.links?.email || ""} onChange={(e) => updateField("links", "email", e.target.value)} />
                                <Input label="Instagram" value={formData.links?.instagram || ""} onChange={(e) => updateField("links", "instagram", e.target.value)} />
                                <Input label="LinkedIn" value={formData.links?.linkedin || ""} onChange={(e) => updateField("links", "linkedin", e.target.value)} />
                                <Input label="TikTok" value={formData.links?.tiktok || ""} onChange={(e) => updateField("links", "tiktok", e.target.value)} />
                            </section>

                            <section className="space-y-4">
                                <SectionHeading>Tracking & Analytics</SectionHeading>
                                <Input label="Meta Pixel ID" value={formData.tracking?.metaPixelId || ""} onChange={(e) => updateField("tracking", "metaPixelId", e.target.value)} placeholder="123456789012345" />
                                <Input label="Google Analytics ID" value={formData.tracking?.gaId || ""} onChange={(e) => updateField("tracking", "gaId", e.target.value)} placeholder="G-XXXXXXXXXX" />
                                <Input label="Google Tag Manager ID" value={formData.tracking?.gtmId || ""} onChange={(e) => updateField("tracking", "gtmId", e.target.value)} placeholder="GTM-XXXXXXX" />
                            </section>

                            <section className="space-y-4">
                                <SectionHeading>Page de remerciement (/merci)</SectionHeading>
                                <Input label="Titre" value={formData.merci?.title || ""} onChange={(e) => updateField("merci", "title", e.target.value)} placeholder="Merci pour votre inscription !" />
                                <Textarea label="Message" value={formData.merci?.message || ""} onChange={(e) => updateField("merci", "message", e.target.value)} rows={3} />
                                <Input label="Texte du bouton retour" value={formData.merci?.ctaText || ""} onChange={(e) => updateField("merci", "ctaText", e.target.value)} placeholder="Retour à l'accueil" />
                            </section>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
