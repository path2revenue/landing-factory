import "./globals.css";
import { siteConfig } from "@/site.config";

const { meta, design } = siteConfig;

export const metadata = {
  title: meta.title,
  description: meta.description,
  keywords: meta.keywords,
  openGraph: {
    title: meta.ogTitle || meta.title,
    description: meta.ogDescription || meta.description,
    images: meta.ogImage ? [meta.ogImage] : [],
    locale: meta.lang || "fr",
    type: "website",
  },
  icons: {
    icon: meta.favicon?.startsWith("/")
      ? meta.favicon
      : `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>${encodeURIComponent(meta.favicon || "⚡")}</text></svg>`,
  },
};

const fontUrl = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(design.fontHeading)}:wght@${design.fontWeights}&display=swap${design.fontBody !== design.fontHeading
    ? `&family=${encodeURIComponent(design.fontBody)}:wght@${design.fontWeights}&display=swap`
    : ""
  }`;

export default function RootLayout({ children }) {
  return (
    <html lang={meta.lang || "fr"} data-palette={design.palette}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href={fontUrl} rel="stylesheet" />
      </head>
      <body
        className="antialiased"
        style={{ fontFamily: `'${design.fontBody}', sans-serif` }}
      >
        {children}
      </body>
    </html>
  );
}
