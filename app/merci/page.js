import { getConfig } from "@/lib/config";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { CheckCircle, Gift, ExternalLink } from "lucide-react";

export default async function MerciPage() {
    const { config } = await getConfig();
    const { merci } = config;

    // Fallback if config is missing (though getConfig handles it)
    if (!merci) return null;

    return (
        <>
            <Navbar config={config} />
            <main className="min-h-screen flex flex-col items-center justify-center px-4 py-20 bg-slate-50">

                {/* Hero Confirmation */}
                <div className="text-center max-w-2xl mx-auto mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 text-green-600 mb-8">
                        <CheckCircle className="w-10 h-10" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
                        {merci.headline || "Merci !"}
                        <span className="block text-blue-600 mt-2">
                            {merci.highlightedText || "C'est validé."}
                        </span>
                    </h1>
                    <p className="text-lg text-slate-600 leading-relaxed">
                        {merci.subtitle || "Nous avons bien reçu votre demande. Une confirmation vous a été envoyée par email."}
                    </p>
                </div>

                {/* Gift / Bonus Card */}
                {merci.gift && (
                    <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                        <div className="bg-blue-600 p-1"></div>
                        <div className="p-8">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wide mb-3">
                                        {merci.gift.badge || "Bonus"}
                                    </span>
                                    <h2 className="text-xl font-bold text-slate-900">
                                        {merci.gift.title || "Cadeau de bienvenue"}
                                    </h2>
                                </div>
                                <Gift className="w-6 h-6 text-blue-500" />
                            </div>

                            <p className="text-slate-600 text-sm mb-8">
                                {merci.gift.description}
                            </p>

                            <a
                                href={merci.gift.cta?.url || "#"}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors group"
                            >
                                {merci.gift.cta?.text || "Accéder maintenant"}
                                <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </a>

                            {merci.gift.footnote && (
                                <p className="text-center text-xs text-slate-400 mt-4">
                                    {merci.gift.footnote}
                                </p>
                            )}
                        </div>
                    </div>
                )}

                {/* Back Link */}
                <div className="mt-12">
                    <a
                        href="/"
                        className="text-slate-500 hover:text-slate-900 text-sm font-medium transition-colors border-b border-transparent hover:border-slate-300 pb-0.5"
                    >
                        ← Retour à l'accueil
                    </a>
                </div>

            </main>
            <Footer config={config} />
        </>
    );
}
