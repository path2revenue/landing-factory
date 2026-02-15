import "./globals.css";
import { getConfig } from "@/lib/config";

export async function generateMetadata() {
    const { config } = await getConfig();
    const meta = config.meta || {};

    return {
        title: meta.title || "Landing Page",
        description: meta.description || "",
        keywords: meta.keywords || "",
        openGraph: {
            title: meta.ogTitle || meta.title || "",
            description: meta.ogDescription || meta.description || "",
            images: meta.ogImage ? [meta.ogImage] : [],
            locale: meta.lang || "fr",
            type: "website",
        },
    };
}

export const revalidate = 60;

export default async function RootLayout({ children }) {
    const { config } = await getConfig();
    const design = config.design || {};
    const tracking = config.tracking || {};
    const meta = config.meta || {};

    const fontUrl = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(
        design.fontHeading || "Inter"
    )}:wght@${design.fontWeights || "300;400;500;600;700;800"}&display=swap${design.fontBody && design.fontBody !== design.fontHeading
        ? `&family=${encodeURIComponent(design.fontBody)}:wght@${design.fontWeights || "300;400;500;600;700;800"
        }&display=swap`
        : ""
        }`;

    const faviconHref =
        meta.favicon?.startsWith("/")
            ? meta.favicon
            : `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>${encodeURIComponent(
                meta.favicon || "⚡"
            )}</text></svg>`;

    return (
        <html lang={meta.lang || "fr"} data-palette={design.palette || "trust"} data-style={design.style || "linear"}>
            <head>
                <link rel="icon" href={faviconHref} />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin="anonymous"
                />
                <link rel="dns-prefetch" href="https://i.ytimg.com" />
                <link rel="dns-prefetch" href="https://www.youtube.com" />
                <link rel="dns-prefetch" href="https://api.leadconnectorhq.com" />
                <link href={fontUrl} rel="stylesheet" />

                {/* ─── Meta Pixel ─── */}
                {tracking.metaPixelId && (
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${tracking.metaPixelId}');fbq('track','PageView');`,
                        }}
                    />
                )}
                {tracking.metaPixelId && (
                    <noscript>
                        <img
                            height="1"
                            width="1"
                            style={{ display: "none" }}
                            src={`https://www.facebook.com/tr?id=${tracking.metaPixelId}&ev=PageView&noscript=1`}
                            alt=""
                        />
                    </noscript>
                )}

                {/* ─── Google Analytics ─── */}
                {tracking.gaId && (
                    <>
                        <script
                            async
                            src={`https://www.googletagmanager.com/gtag/js?id=${tracking.gaId}`}
                        />
                        <script
                            dangerouslySetInnerHTML={{
                                __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${tracking.gaId}');`,
                            }}
                        />
                    </>
                )}
            </head>
            <body
                className="antialiased"
                style={{
                    fontFamily: `'${design.fontBody || "Inter"}', sans-serif`,
                }}
            >
                {children}
            </body>
        </html>
    );
}
