"use client";

import { useState } from "react";
import Input from "../components/ui/Input";
import Select from "../components/ui/Select";
import FileUpload from "../components/ui/FileUpload";
import { ArrowLeft, ArrowRight, Check, Rocket } from "lucide-react";

const PALETTES = [
    { value: "trust", label: "🔵 Trust (Bleu/Marine)", colors: ["#3B82F6", "#1E3A8A"] },
    { value: "vibrant", label: "🟣 Vibrant (Violet/Cyan)", colors: ["#8B5CF6", "#06B6D4"] },
    { value: "luxury", label: "🟡 Luxury (Or/Noir)", colors: ["#D4AF37", "#000000"] },
    { value: "healthcare", label: "🟢 Healthcare (Vert/Blanc)", colors: ["#10B981", "#ECFDF5"] },
    { value: "creative", label: "🟠 Creative (Orange/Rose)", colors: ["#F97316", "#EC4899"] },
    { value: "dark", label: "⚫ Dark (Gris/Néon)", colors: ["#0F172A", "#38BDF8"] },
];

const STYLES = [
    { value: "linear", label: "Linear (SaaS, Clean)" },
    { value: "glassmorphism", label: "Glassmorphism (Moderne)" },
    { value: "aurora", label: "Aurora (Dégradés doux)" },
    { value: "bento", label: "Bento (Grilles)" },
    { value: "minimal", label: "Minimal (Épuré)" },
];

const FONTS = [
    { value: "Inter", label: "Inter (Standard)" },
    { value: "Roboto", label: "Roboto (Tech)" },
    { value: "Playfair Display", label: "Playfair (Luxe)" },
    { value: "Montserrat", label: "Montserrat (Moderne)" },
    { value: "Lato", label: "Lato (Humaniste)" },
];

export default function OnboardingWizard({ config, onComplete, saving }) {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState(config || {});

    const updateField = (section, key, value) => {
        setFormData((prev) => ({
            ...prev,
            [section]: {
                ...prev[section],
                [key]: value,
            },
        }));
    };

    const nextStep = () => setStep((s) => Math.min(s + 1, 6));
    const prevStep = () => setStep((s) => Math.max(s - 1, 1));

    return (
        <div className="min-h-screen bg-slate-900 text-slate-50 flex flex-col items-center py-10 px-4">
            {/* Progress Bar */}
            <div className="w-full max-w-2xl mb-8">
                <div className="flex justify-between text-xs text-slate-400 mb-2 uppercase tracking-wider">
                    <span>Identité</span>
                    <span>Design</span>
                    <span>Hero</span>
                    <span>Contenu</span>
                    <span>Liens</span>
                    <span>Review</span>
                </div>
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-blue-500 transition-all duration-300 ease-out"
                        style={{ width: `${(step / 6) * 100}%` }}
                    />
                </div>
            </div>

            {/* Card */}
            <div className="w-full max-w-2xl bg-slate-800 border border-slate-700 rounded-xl p-8 shadow-2xl">
                {step === 1 && (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold">Identité du site</h2>
                        <p className="text-slate-400">Commençons par les bases de votre marque.</p>

                        <div className="space-y-4">
                            <Input
                                label="Nom du site / Marque"
                                value={formData.meta?.title || ""}
                                onChange={(e) => updateField("meta", "title", e.target.value)}
                                placeholder="Ex: MonSuperSaaS"
                            />
                            <Input
                                label="Description courte (SEO)"
                                value={formData.meta?.description || ""}
                                onChange={(e) => updateField("meta", "description", e.target.value)}
                                placeholder="Une phrase pour décrire votre activité"
                            />
                            <FileUpload
                                label="Logo (ou Favicon)"
                                folder="brand"
                                value={formData.meta?.favicon || ""}
                                onChange={(url) => updateField("meta", "favicon", url)}
                            />
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold">Design & Style</h2>
                        <p className="text-slate-400">Choisissez l'apparence de votre landing page.</p>

                        <div className="grid grid-cols-2 gap-4">
                            {PALETTES.map((p) => (
                                <button
                                    key={p.value}
                                    onClick={() => updateField("design", "palette", p.value)}
                                    className={`flex items-center gap-3 p-3 rounded-lg border text-left transition-all ${formData.design?.palette === p.value
                                            ? "border-blue-500 bg-blue-500/10 ring-1 ring-blue-500"
                                            : "border-slate-700 hover:bg-slate-750"
                                        }`}
                                >
                                    <div className="flex h-6 w-6 rounded-full overflow-hidden border border-slate-600">
                                        <div className="h-full w-1/2" style={{ backgroundColor: p.colors[0] }} />
                                        <div className="h-full w-1/2" style={{ backgroundColor: p.colors[1] }} />
                                    </div>
                                    <span className="text-sm font-medium">{p.label}</span>
                                </button>
                            ))}
                        </div>

                        <div className="space-y-4 pt-4 border-t border-slate-700">
                            <Select
                                label="Style visuel"
                                value={formData.design?.style || "linear"}
                                onChange={(e) => updateField("design", "style", e.target.value)}
                                options={STYLES}
                            />
                            <Select
                                label="Police principale"
                                value={formData.design?.fontHeading || "Inter"}
                                onChange={(e) => {
                                    updateField("design", "fontHeading", e.target.value);
                                    updateField("design", "fontBody", e.target.value);
                                }}
                                options={FONTS}
                            />
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold">Hero Section</h2>
                        <p className="text-slate-400">La première chose que vos visiteurs verront.</p>

                        <div className="space-y-4">
                            <Input
                                label="Headline (Accroche principale)"
                                value={formData.hero?.headline || ""}
                                onChange={(e) => updateField("hero", "headline", e.target.value)}
                                placeholder="Transformez votre business..."
                            />
                            <Input
                                label="Subheadline (Sous-titre)"
                                value={formData.hero?.subheadline || ""}
                                onChange={(e) => updateField("hero", "subheadline", e.target.value)}
                                placeholder="Une promesse claire et concise."
                            />
                            <Input
                                label="Texte Bouton CTA"
                                value={formData.hero?.cta || ""}
                                onChange={(e) => updateField("hero", "cta", e.target.value)}
                                placeholder="Commencer maintenant"
                            />
                            <Input
                                label="Lien Bouton CTA"
                                value={formData.hero?.ctaLink || ""}
                                onChange={(e) => updateField("hero", "ctaLink", e.target.value)}
                                placeholder="#pricing ou https://..."
                            />
                            <Input
                                label="URL Vidéo (Optionnel)"
                                value={formData.hero?.videoUrl || ""}
                                onChange={(e) => updateField("hero", "videoUrl", e.target.value)}
                                placeholder="https://youtube.com/..."
                            />
                        </div>
                    </div>
                )}

                {step === 4 && (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold">Contenu</h2>
                        <p className="text-slate-400">Ajoutons un peu de substance.</p>

                        <div className="space-y-4">
                            <div className="p-4 bg-slate-900 rounded-lg border border-slate-700">
                                <h3 className="font-medium mb-2 text-blue-400">Services</h3>
                                <p className="text-sm text-slate-400 mb-4">Vous pourrez ajouter le détail des services plus tard dans le dashboard.</p>
                                <Input
                                    label="Titre section Services"
                                    value={formData.services?.title || ""}
                                    onChange={(e) => updateField("services", "title", e.target.value)}
                                    placeholder="Nos expertises"
                                />
                            </div>

                            <div className="p-4 bg-slate-900 rounded-lg border border-slate-700">
                                <h3 className="font-medium mb-2 text-blue-400">Preuve Sociale</h3>
                                <Input
                                    label="Titre Témoignages"
                                    value={formData.testimonials?.title || ""}
                                    onChange={(e) => updateField("testimonials", "title", e.target.value)}
                                    placeholder="Ce que disent nos clients"
                                />
                            </div>
                        </div>
                    </div>
                )}

                {step === 5 && (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold">Liens & Tracking</h2>
                        <p className="text-slate-400">Connectez vos outils.</p>

                        <div className="space-y-4">
                            <Input
                                label="Lien Calendrier (Calendly, GHL...)"
                                value={formData.links?.calendar || ""}
                                onChange={(e) => updateField("links", "calendar", e.target.value)}
                                placeholder="https://calendly.com/..."
                            />
                            <Input
                                label="Numéro WhatsApp (Format intl)"
                                value={formData.links?.whatsapp || ""}
                                onChange={(e) => updateField("links", "whatsapp", e.target.value)}
                                placeholder="33612345678"
                            />
                            <div className="border-t border-slate-700 pt-4 mt-4">
                                <h3 className="text-sm font-medium text-slate-300 mb-3 block">Analytique (Optionnel)</h3>
                                <Input
                                    label="Meta Pixel ID"
                                    value={formData.tracking?.metaPixelId || ""}
                                    onChange={(e) => updateField("tracking", "metaPixelId", e.target.value)}
                                    placeholder="1234567890"
                                />
                                <Input
                                    label="Google Analytics ID (V4)"
                                    value={formData.tracking?.gaId || ""}
                                    onChange={(e) => updateField("tracking", "gaId", e.target.value)}
                                    placeholder="G-XXXXXXXXXX"
                                />
                            </div>
                        </div>
                    </div>
                )}

                {step === 6 && (
                    <div className="space-y-6 text-center">
                        <div className="w-16 h-16 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Check className="w-8 h-8" />
                        </div>
                        <h2 className="text-2xl font-bold">Tout est prêt !</h2>
                        <p className="text-slate-400 max-w-md mx-auto">
                            Votre configuration est prête à être déployée. Cliquez ci-dessous pour publier votre site.
                        </p>

                        <div className="bg-slate-900 rounded-lg p-4 text-left border border-slate-700 text-sm space-y-2 mt-6">
                            <div className="flex justify-between">
                                <span className="text-slate-500">Nom:</span>
                                <span>{formData.meta?.title}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-500">Palette:</span>
                                <span className="capitalize">{formData.design?.palette}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-500">Headline:</span>
                                <span className="truncate max-w-[200px]">{formData.hero?.headline}</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Footer Buttons */}
                <div className="flex justify-between mt-8 pt-6 border-t border-slate-700">
                    <button
                        onClick={prevStep}
                        disabled={step === 1}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Retour
                    </button>

                    {step < 6 ? (
                        <button
                            onClick={nextStep}
                            className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors"
                        >
                            Suivant
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    ) : (
                        <button
                            onClick={() => onComplete(formData)}
                            disabled={saving}
                            className="flex items-center gap-2 px-8 py-3 bg-green-600 hover:bg-green-500 text-white rounded-lg font-bold shadow-lg shadow-green-900/20 transition-all hover:scale-105"
                        >
                            {saving ? (
                                <>Enregistrement...</>
                            ) : (
                                <>
                                    <Rocket className="w-5 h-5" />
                                    Lancer le site
                                </>
                            )}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
