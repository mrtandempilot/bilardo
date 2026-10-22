import { Archivo } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/data";
import AuthProvider from "@/components/AuthProvider";

const archivo = Archivo({ subsets: ["latin", "latin-ext"], axes: ["wdth"], display: "swap" });

const title = "Fethiye Bilardo Dersi ve Kursu | Fethiye Bilardo Akademisi";
const description =
  "Fethiye'de TBF lisanslı antrenör Hakan Çavuşoğlu'ndan birebir bilardo dersi. Amerikan pool ve 3 bant kursları, başlangıçtan turnuvaya. Saatlik 2.000 TL, paket ve abonelik indirimi.";

export const metadata = {
  metadataBase: new URL(site.url),
  title: { default: title, template: `%s | ${site.name}` },
  description,
  alternates: { canonical: "/" },
  applicationName: site.name,
  authors: [{ name: site.instructor }],
  category: "sports",
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "/",
    siteName: site.name,
    title,
    description,
  },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  // Google Search Console doğrulama kodu: Vercel'e GOOGLE_SITE_VERIFICATION olarak ekle
  verification: process.env.GOOGLE_SITE_VERIFICATION ? { google: process.env.GOOGLE_SITE_VERIFICATION } : undefined,
  other: { "geo.region": "TR-48", "geo.placename": "Fethiye" },
};

export const viewport = { themeColor: "#08110D" };

export default function RootLayout({ children }) {
  return (
    <html lang="tr" className={archivo.className}>
      <body><AuthProvider>{children}</AuthProvider></body>
    </html>
  );
}
