// Tüm içerik ve fiyatlar burada. Değiştirmek için sadece bu dosyayı düzenle.
export const site = {
  name: "Fethiye Bilardo Akademisi",
  instructor: "[Eğitmen adı]",
  city: "Fethiye",
  phone: "+90 5XX XXX XX XX",
  whatsapp: "905XXXXXXXXX",
  address: "[Salon adresi], Fethiye / Muğla",
};

export const HOURLY = 2000; // TL, 1 saatlik ders

export const branches = {
  amerikan: {
    label: "Amerikan",
    intro: "8 ve 9 top. Sağlam vuruş, beyaz top kontrolü ve seri kurma.",
    levels: [
      { key: "baslangic", name: "Başlangıç", hours: 8, discount: 0.10,
        topics: ["Duruş ve denge", "Istaka tutuşu ve köprü", "Düz vuruş ve nişan alma", "Stop, takip, geri çekme", "Basit pozisyon fikri", "8 top kuralları"] },
      { key: "orta", name: "Orta", hours: 10, discount: 0.10,
        topics: ["Sağ-sol falso ve etkisi", "Banttan dönüş açıları", "3 topluk pozisyon planı", "Kümeleri dağıtma", "Kolay defans", "9 top'a giriş"] },
      { key: "ileri", name: "İleri", hours: 12, discount: 0.10,
        topics: ["Uzun seri planlama", "Kombinasyon ve kiss vuruşlar", "Bilinçli defans ve safety", "Kırış (break) tekniği", "Maç baskısı ve rutin", "Turnuva hazırlığı"] },
    ],
  },
  ucbant: {
    label: "3 Bant",
    intro: "Üç top, en az üç bant. Açı okuma, diamond sistemleri ve hız kontrolü.",
    levels: [
      { key: "baslangic", name: "Başlangıç", hours: 8, discount: 0.10,
        topics: ["Duruş, tutuş ve köprü", "Düz ve kesik vuruş", "Top kalınlığı okuma", "Hız ve mesafe kontrolü", "Temel bant açıları", "Kurallar ve sayı"] },
      { key: "orta", name: "Orta", hours: 10, discount: 0.10,
        topics: ["Falsonun bant açısına etkisi", "Diamond sistemine giriş", "Önce banttan (bricole)", "Uzun açı ve ters açı", "Kırmızı topla pozisyon", "Seri düşünmeye başlama"] },
      { key: "ileri", name: "İleri", hours: 12, discount: 0.10,
        topics: ["Plus ve Maestro sistemleri", "Masse ve zor kurtarmalar", "Defansif oynama", "Pozisyonla seri yapma", "Maç taktiği ve tempo", "Turnuva hazırlığı"] },
    ],
  },
};

export const subscriptions = [
  { key: "ay4", name: "Ayda 4 ders", lessons: 4, discount: 0.15, note: "Haftada bir ders. Düzenli ilerlemek isteyenler için." },
  { key: "ay8", name: "Ayda 8 ders", lessons: 8, discount: 0.15, note: "Haftada iki ders. Hızlı gelişim ve turnuva hedefi için." },
];

// Herkese açık örnek dersler (YouTube). id = YouTube video kimliği.
export const freeVideos = [
  { id: "xkqNkdfro-I", branch: "amerikan", title: "Köprü nasıl kurulur", channel: "STARSHOT" },
  { id: "FYBvMjLhTc8", branch: "amerikan", title: "Falso ve bant ile pozisyon alma", channel: "Allisonant Gr" },
  { id: "np9M8vV1t54", branch: "ucbant", title: "Diamond (elmas) sistemi", channel: "3C Billiards BM" },
  { id: "0vaXMU1aPjI", branch: "ucbant", title: "Diamond sistemi: falso ve açılar", channel: "3C Billiards BM" },
];

// Abonelere özel video dersler. src alanları videolar yüklenince doldurulacak.
export const videos = [
  { id: "a1", branch: "amerikan", level: "Başlangıç", title: "Doğru duruş ve köprü", duration: "8:40" },
  { id: "a2", branch: "amerikan", level: "Başlangıç", title: "Stop, takip ve geri çekme", duration: "12:15" },
  { id: "a3", branch: "amerikan", level: "Orta", title: "Kümeleri dağıtmak", duration: "10:30" },
  { id: "a4", branch: "amerikan", level: "İleri", title: "Kırış (break) tekniği", duration: "14:05" },
  { id: "u1", branch: "ucbant", level: "Başlangıç", title: "Top kalınlığını okumak", duration: "9:20" },
  { id: "u2", branch: "ucbant", level: "Orta", title: "Diamond sistemine giriş", duration: "16:45" },
  { id: "u3", branch: "ucbant", level: "Orta", title: "Önce banttan vuruşlar", duration: "11:10" },
  { id: "u4", branch: "ucbant", level: "İleri", title: "Plus sistemi", duration: "18:30" },
];

export const tl = (n) => new Intl.NumberFormat("tr-TR").format(Math.round(n)) + " TL";
export const packagePrice = (lvl) => lvl.hours * HOURLY * (1 - lvl.discount);
export const subPrice = (s) => s.lessons * HOURLY * (1 - s.discount);
