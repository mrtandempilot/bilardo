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

Sonraki adımlar:
1. Supabase: `rezervasyonlar` tablosu, `app/api/rezervasyon/route.js` içinde kayıt.
2. iyzico: paket için tek seferlik ödeme, abonelik için iyzico Subscription.
3. Vercel'e deploy.
