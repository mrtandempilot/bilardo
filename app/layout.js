import { Archivo } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/data";

const archivo = Archivo({ subsets: ["latin", "latin-ext"], axes: ["wdth"], display: "swap" });

export const metadata = {
  title: `${site.name} | Fethiye'de bilardo dersi`,
  description: "Fethiye'de birebir Amerikan ve 3 bant bilardo dersleri. Başlangıç, orta ve ileri seviye kurslar, aylık abonelik.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr" className={archivo.className}>
      <body>{children}</body>
    </html>
  );
}
