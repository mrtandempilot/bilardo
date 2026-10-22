# Fethiye Bilardo Akademisi

    npm install
    npm run dev   # http://localhost:3000

İçerik ve fiyatlar: `lib/data.js` (eğitmen, telefon, adres, saatlik ücret, indirimler, SSS, drill'ler).

Bölümler: Navbar · Hero · Vuruş Simülatörü · Kurslar · Abonelik · Eğitmen · Seviye Testi · Video Dersler · Antrenmanlar · (Yorumlar) · SSS · Rezervasyon · Footer.
Kurs kartı, abonelik ve seviye testindeki butonlar rezervasyon formundaki paketi otomatik seçer (`lib/pick.js`).

Yorumlar bölümü: `lib/data.js` içindeki örnek yorumlar `ornek: true` olduğu için gizli. Gerçek (izinli) öğrenci yorumu girip `ornek` alanını silince bölüm kendiliğinden açılır.

Üyelik (Supabase Auth):
- Navbar'da "Giriş yap" → e-posta+şifre (kayıt `kayit_ol` RPC ile, onay maili gerekmez), Google ile giriş, şifremi unuttum (e-postaya giriş linki).
- Girişten sonra "Hesabım": abonelik durumu `aboneler` tablosundan (email + bitis) okunur.
- Abonelik aktifse (bitis >= bugün) video arşivi açılır. Videoyu yükleyince `lib/data.js` → `videos` içinde ilgili derse `youtube: "VIDEO_ID"` ekle.
- Abone eklemek: Supabase → Table editor → aboneler → email (küçük harf), paket, bitis.
- Ayarlar `.env.local` içinde (NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY). Vercel'de de aynı iki değişkeni ekle.

Yönetim paneli (`/yonetim`):
- Sadece `yoneticiler` tablosundaki e-postalar girebilir (şu an mrtandempilot@gmail.com ve hakan.cvsoglu@gmail.com). Yeni yönetici: Supabase → yoneticiler tablosuna e-posta ekle.
- Özet, Talepler (formdan gelenler; ara / WhatsApp / durum / sil), Aboneler (ekle, +1 ay uzat, düzenle, sil), Üyeler (kayıtlı hesaplar, tek tıkla abone yap).
- Yetkiler veritabanında (RLS) kontrol edilir; sayfa Google'a kapalı.

SEO:
- Başlık/açıklama/OG/canonical: `app/layout.js`. Yapılandırılmış veri (LocalBusiness, Person, Course): `lib/seo.js`. SSS şeması: `components/Faq.js`.
- `robots.txt`, `sitemap.xml`, favicon (`app/icon.svg`) ve paylaşım görseli (`app/opengraph-image.jpg`) otomatik.
- Search Console doğrulaması: Vercel'e `GOOGLE_SITE_VERIFICATION` ortam değişkeni ekle (HTML etiketi yöntemindeki content değeri).

Sonraki adımlar:
1. Supabase: `rezervasyonlar` tablosu, `app/api/rezervasyon/route.js` içinde kayıt.
2. iyzico: paket için tek seferlik ödeme, abonelik için iyzico Subscription.
3. Vercel'e deploy.
