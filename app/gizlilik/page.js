import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { site } from "@/lib/data";

export const metadata = {
  title: "Gizlilik politikası",
  description: `${site.name} gizlilik politikası: hangi bilgileri topladığımız, nasıl kullandığımız ve haklarınız.`,
  alternates: { canonical: "/gizlilik" },
};

export default function Gizlilik() {
  return (
    <>
      <Navbar />
      <main className="section legal">
        <div className="wrap prose">
          <span className="eyebrow">Yasal</span>
          <h1>Gizlilik politikası</h1>
          <p className="fine">Son güncelleme: 22 Ekim 2026</p>

          <h2>Topladığımız bilgiler</h2>
          <p>Ders talep formunda adını, telefon numaranı, seçtiğin kursu ve yazdığın notu alırız. Üye olduğunda e-posta adresini kaydederiz. Google ile giriş yaparsan Google’dan yalnızca adını, e-posta adresini ve profil fotoğrafını alırız.</p>

          <h2>Bilgileri ne için kullanırız</h2>
          <p>Ders saatini ayarlamak için seninle iletişime geçmek, hesabına giriş yapmanı sağlamak ve online derslere erişimini yönetmek için. Bilgilerini satmayız, reklam için kullanmayız ve üçüncü kişilerle paylaşmayız.</p>

          <h2>Bilgiler nerede saklanır</h2>
          <p>Veriler Supabase altyapısında, site ise Vercel üzerinde barındırılır. Bu hizmetler verileri yalnızca bizim adımıza işler.</p>

          <h2>Haklarını kullanmak</h2>
          <p>Bilgilerinin silinmesini veya düzeltilmesini istersen {site.phone} numarasından ya da {site.email} adresinden bize ulaşabilirsin. Talebini en geç 30 gün içinde yerine getiririz.</p>
        </div>
      </main>
      <Footer />
    </>
  );
}
