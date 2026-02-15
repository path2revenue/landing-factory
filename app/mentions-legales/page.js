"use client";

import Link from "next/link";

const sections = [
    { id: "mentions", label: "Mentions légales" },
    { id: "cgu", label: "CGU" },
    { id: "cgv", label: "CGV" },
    { id: "confidentialite", label: "Confidentialité" },
    { id: "cookies", label: "Cookies" },
];

export default function MentionsLegales() {
    return (
        <>
            {/* Navbar */}
            <nav className="sticky top-0 z-50 border-b border-[var(--color-border-default)] bg-[var(--color-bg-primary)]/90 backdrop-blur-md">
                <div className="max-w-[1100px] mx-auto px-6 h-14 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 text-lg font-bold">
                        StarsBridgeSystem
                    </Link>
                    <Link
                        href="/"
                        className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
                    >
                        ← Retour au site
                    </Link>
                </div>
            </nav>

            <main className="max-w-[800px] mx-auto px-6 py-16">
                <h1 className="text-3xl font-bold mb-2">StarsBridgeSystem</h1>
                <p className="text-[var(--color-text-secondary)] mb-1">Informations légales</p>
                <p className="text-xs text-[var(--color-text-muted)] mb-8">Dernière mise à jour : 15/02/2026</p>

                {/* Section nav */}
                <div className="flex flex-wrap gap-3 mb-10 pb-6 border-b border-[var(--color-border-default)]">
                    {sections.map((s) => (
                        <a
                            key={s.id}
                            href={`#${s.id}`}
                            className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors"
                        >
                            {s.label}
                        </a>
                    ))}
                </div>

                <p className="text-sm text-[var(--color-text-secondary)] mb-12">
                    Les informations ci-dessous sont fournies à titre de transparence et de conformité.
                </p>

                <div className="space-y-14 text-sm text-[var(--color-text-secondary)] leading-relaxed">

                    {/* Mentions légales */}
                    <section id="mentions">
                        <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-6 pb-3 border-b border-[var(--color-border-default)]">
                            Mentions légales
                        </h2>
                        <p className="mb-6">
                            Conformément aux articles 6-III et 19 de la Loi pour la Confiance dans l'Économie Numérique (LCEN), il est précisé aux utilisateurs du site starsbridgesystem.com l'identité de l'éditeur.
                        </p>

                        <h3 className="font-semibold text-[var(--color-accent)] mb-3">Éditeur du site</h3>
                        <div className="bg-[var(--color-bg-surface)] border border-[var(--color-border-default)] rounded-xl p-5 space-y-2 mb-8">
                            <p><span className="text-[var(--color-text-primary)] font-medium">BIAGGINI MATHIS</span> — Entrepreneur individuel</p>
                            <p>SIREN : 853 875 862</p>
                            <p>SIRET (siège) : 853 875 862 00015</p>
                            <p>TVA intracommunautaire : FR91853875862</p>
                            <p>RCS : 853 875 862 R.C.S. Versailles (inscrit le 20/09/2019)</p>
                            <p>RNE : inscrit le 07/09/2019</p>
                            <p>Adresse : 6 SENTE DU HARAS, 78530 BUC, France</p>
                            <p>Email : <a href="mailto:ahmedbiaggini@gmail.com" className="text-[var(--color-accent)] hover:underline">ahmedbiaggini@gmail.com</a></p>
                        </div>

                        <h3 className="font-semibold text-[var(--color-accent)] mb-3">Responsable de la publication</h3>
                        <p className="mb-8">BIAGGINI MATHIS</p>

                        <h3 className="font-semibold text-[var(--color-accent)] mb-3">Hébergement</h3>
                        <p className="mb-8">
                            Le site est hébergé par <strong className="text-[var(--color-text-primary)]">Vercel Inc.</strong>, 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis.
                        </p>

                        <h3 className="font-semibold text-[var(--color-accent)] mb-3">Business Partners & diffusion</h3>
                        <p>
                            Certaines pages ou tunnels StarsBridgeSystem peuvent être diffusés par des Business Partners indépendants. Ces partenaires agissent de manière autonome et ne sont ni salariés ni employés de BIAGGINI MATHIS.
                        </p>
                    </section>

                    {/* CGU */}
                    <section id="cgu">
                        <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-6 pb-3 border-b border-[var(--color-border-default)]">
                            Conditions Générales d'Utilisation (CGU)
                        </h2>
                        <div className="space-y-4">
                            <p>
                                Le Site a pour objet la présentation du concept StarsBridgeSystem et la mise en relation entre les utilisateurs et l'éditeur ou ses Business Partners.
                            </p>
                            <p>
                                Les informations présentées ne constituent ni un conseil financier, ni un conseil juridique, ni une promesse de revenus ou de résultats.
                            </p>
                            <p>
                                La réservation d'un appel ou la prise de contact n'emporte aucun engagement contractuel ni obligation de paiement.
                            </p>
                        </div>
                    </section>

                    {/* CGV */}
                    <section id="cgv">
                        <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-6 pb-3 border-b border-[var(--color-border-default)]">
                            Conditions Générales de Vente (CGV)
                        </h2>
                        <div className="space-y-4">
                            <p>
                                Aucune vente n'est réalisée directement via ce tunnel. Toute vente éventuelle est conclue à l'issue d'un échange explicite, après validation du besoin et accord volontaire de l'utilisateur.
                            </p>
                            <p>
                                Certains Business Partners sont autorisés à accompagner la conclusion d'une vente au nom de BIAGGINI MATHIS, uniquement lorsque le paiement est effectué via les moyens de paiement officiels mis à disposition par BIAGGINI MATHIS.
                            </p>
                            <p>
                                Aucun Business Partner n'est autorisé à encaisser des fonds en son nom propre. Il appartient à l'utilisateur de vérifier que le paiement est bien réalisé via une interface, un lien ou un compte appartenant à BIAGGINI MATHIS.
                            </p>
                            <p>
                                StarsBridgeSystem ne garantit aucun résultat financier. Les résultats dépendent exclusivement de l'implication, du contexte et des décisions de l'utilisateur.
                            </p>
                        </div>
                    </section>

                    {/* Confidentialité */}
                    <section id="confidentialite">
                        <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-6 pb-3 border-b border-[var(--color-border-default)]">
                            Politique de confidentialité (RGPD)
                        </h2>
                        <div className="space-y-4">
                            <p>
                                Les données collectées via les formulaires (nom, email, téléphone, informations fournies volontairement) sont utilisées exclusivement pour recontacter l'utilisateur et traiter sa demande.
                            </p>
                            <p>
                                Les données peuvent être partagées avec des Business Partners uniquement dans le cadre de l'organisation d'un échange, sous obligation stricte de confidentialité.
                            </p>
                            <p>
                                Aucune donnée personnelle n'est vendue ni cédée à des tiers. Conformément au RGPD, vous pouvez exercer vos droits en écrivant à{" "}
                                <a href="mailto:ahmedbiaggini@gmail.com" className="text-[var(--color-accent)] hover:underline">ahmedbiaggini@gmail.com</a>.
                            </p>
                        </div>
                    </section>

                    {/* Cookies */}
                    <section id="cookies">
                        <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-6 pb-3 border-b border-[var(--color-border-default)]">
                            Cookies & traceurs
                        </h2>
                        <div className="space-y-4">
                            <p>
                                Le site peut utiliser des cookies ou traceurs à des fins de mesure d'audience et d'efficacité publicitaire (Pixel Meta, Google Analytics).
                            </p>
                            <p>
                                Vous pouvez accepter ou refuser ces cookies via le bandeau de consentement ou les paramètres de votre navigateur.
                            </p>
                        </div>
                    </section>
                </div>

                {/* Footer */}
                <div className="mt-12 pt-6 border-t border-[var(--color-border-default)] text-center">
                    <p className="text-xs text-[var(--color-text-muted)]">
                        © {new Date().getFullYear()} StarsBridgeSystem. Tous droits réservés.
                    </p>
                    <Link
                        href="/"
                        className="text-sm text-[var(--color-accent)] hover:underline mt-3 inline-block"
                    >
                        ← Retour au site
                    </Link>
                </div>
            </main>
        </>
    );
}
