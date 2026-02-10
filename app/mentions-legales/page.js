"use client";

import { siteConfig } from "@/site.config";

export default function MentionsLegales() {
    return (
        <>
            {/* Minimal Navbar */}
            <nav className="sticky top-0 z-50 border-b border-[var(--color-border-default)] bg-[var(--color-bg-primary)]/90 backdrop-blur-md">
                <div className="max-w-[1100px] mx-auto px-6 h-14 flex items-center justify-between">
                    <a href="/" className="flex items-center gap-2 text-lg font-bold">
                        <span>{siteConfig.navbar?.logo?.emoji}</span>
                        <span>{siteConfig.navbar?.logo?.text || siteConfig.footer?.brand}</span>
                    </a>
                    <a
                        href="/"
                        className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
                    >
                        ← Retour au site
                    </a>
                </div>
            </nav>

            <main className="max-w-[800px] mx-auto px-6 py-16">
                <h1 className="text-3xl font-bold mb-8">Mentions légales</h1>

                <div className="space-y-8 text-[var(--color-text-secondary)] leading-relaxed text-sm">
                    {/* Éditeur */}
                    <section>
                        <h2 className="text-lg font-semibold text-[var(--color-text-primary)] mb-3">
                            1. Éditeur du site
                        </h2>
                        <p>
                            Le présent site est édité par :<br />
                            <strong className="text-[var(--color-text-primary)]">MONSIEUR BILAL EL-JINDI</strong><br />
                            Entrepreneur individuel<br />
                            SIREN : 814 962 585<br />
                            SIRET : 814 962 585 00042<br />
                            N° TVA intracommunautaire : FR51814962585<br />
                            Activité (NAF/APE) : Vente à distance sur catalogue général (4791A)<br />
                            Adresse : 34 Avenue de la Pierrerie, Bâtiment 3, 77680 Roissy-en-Brie, France<br />
                            Dirigeant : Bilal El-Jindi<br />
                            Date de création : 04 décembre 2015<br />
                            E-mail : <a href="mailto:bilal@path2revenue.com" className="text-[var(--color-accent)] hover:underline">bilal@path2revenue.com</a>
                        </p>
                    </section>

                    {/* Hébergement */}
                    <section>
                        <h2 className="text-lg font-semibold text-[var(--color-text-primary)] mb-3">
                            2. Hébergement
                        </h2>
                        <p>
                            Ce site est hébergé par :<br />
                            <strong className="text-[var(--color-text-primary)]">Vercel Inc.</strong><br />
                            340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis<br />
                            Site : <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-[var(--color-accent)] hover:underline">vercel.com</a>
                        </p>
                    </section>

                    {/* Propriété intellectuelle */}
                    <section>
                        <h2 className="text-lg font-semibold text-[var(--color-text-primary)] mb-3">
                            3. Propriété intellectuelle
                        </h2>
                        <p>
                            L'ensemble des contenus présents sur ce site (textes, images, vidéos, logos, graphismes, icônes)
                            est protégé par les lois relatives à la propriété intellectuelle.
                            Toute reproduction, représentation, modification, publication ou adaptation de tout ou partie
                            des éléments du site est interdite sans autorisation écrite préalable.
                        </p>
                    </section>

                    {/* Données personnelles / RGPD */}
                    <section>
                        <h2 className="text-lg font-semibold text-[var(--color-text-primary)] mb-3">
                            4. Protection des données personnelles (RGPD)
                        </h2>
                        <p className="mb-3">
                            Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi
                            « Informatique et Libertés » du 6 janvier 1978 modifiée, vous disposez des droits suivants
                            sur vos données personnelles :
                        </p>
                        <ul className="list-disc pl-6 space-y-1 mb-3">
                            <li>Droit d'accès</li>
                            <li>Droit de rectification</li>
                            <li>Droit à l'effacement (« droit à l'oubli »)</li>
                            <li>Droit à la limitation du traitement</li>
                            <li>Droit à la portabilité des données</li>
                            <li>Droit d'opposition</li>
                        </ul>
                        <p className="mb-3">
                            <strong className="text-[var(--color-text-primary)]">Responsable du traitement :</strong> Bilal El-Jindi
                        </p>
                        <p className="mb-3">
                            <strong className="text-[var(--color-text-primary)]">Données collectées :</strong> Les données personnelles
                            collectées sur ce site sont limitées aux informations nécessaires à la prise de contact et au suivi
                            de la relation commerciale (nom, prénom, adresse e-mail, numéro de téléphone).
                        </p>
                        <p className="mb-3">
                            <strong className="text-[var(--color-text-primary)]">Finalité du traitement :</strong> Les données sont utilisées
                            uniquement pour répondre à vos demandes de contact, planifier des rendez-vous, et assurer le suivi
                            de la relation commerciale. Elles ne sont jamais vendues ni cédées à des tiers.
                        </p>
                        <p className="mb-3">
                            <strong className="text-[var(--color-text-primary)]">Durée de conservation :</strong> Les données sont conservées
                            pour une durée maximale de 3 ans à compter du dernier contact.
                        </p>
                        <p>
                            Pour exercer vos droits ou pour toute question relative à la protection de vos données,
                            contactez-nous à : <a href="mailto:bilal@path2revenue.com" className="text-[var(--color-accent)] hover:underline">bilal@path2revenue.com</a>
                        </p>
                        <p className="mt-3">
                            En cas de litige, vous pouvez adresser une réclamation à la CNIL : <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-[var(--color-accent)] hover:underline">www.cnil.fr</a>
                        </p>
                    </section>

                    {/* Cookies */}
                    <section>
                        <h2 className="text-lg font-semibold text-[var(--color-text-primary)] mb-3">
                            5. Cookies
                        </h2>
                        <p>
                            Ce site peut utiliser des cookies strictement nécessaires à son fonctionnement.
                            Aucun cookie publicitaire ou de tracking tiers n'est déposé sans votre consentement.
                            Vous pouvez à tout moment configurer votre navigateur pour refuser les cookies.
                        </p>
                    </section>

                    {/* Limitation de responsabilité */}
                    <section>
                        <h2 className="text-lg font-semibold text-[var(--color-text-primary)] mb-3">
                            6. Limitation de responsabilité
                        </h2>
                        <p>
                            Les informations contenues sur ce site sont aussi précises que possible et sont régulièrement
                            mises à jour. Toutefois, elles sont fournies à titre indicatif et ne sauraient engager la
                            responsabilité de l'éditeur en cas d'erreur, d'omission ou de résultats obtenus suite à
                            l'utilisation de ces informations. L'éditeur ne saurait être tenu responsable des dommages
                            directs ou indirects résultant de l'utilisation du site.
                        </p>
                    </section>

                    {/* Droit applicable */}
                    <section>
                        <h2 className="text-lg font-semibold text-[var(--color-text-primary)] mb-3">
                            7. Droit applicable
                        </h2>
                        <p>
                            Le présent site et ses mentions légales sont soumis au droit français.
                            En cas de litige, les tribunaux français seront seuls compétents.
                        </p>
                    </section>
                </div>

                {/* Back link */}
                <div className="mt-12 pt-6 border-t border-[var(--color-border-default)]">
                    <a
                        href="/"
                        className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
                    >
                        ← Retour au site
                    </a>
                </div>
            </main>
        </>
    );
}
