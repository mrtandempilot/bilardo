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

export const tl = (n) => new Intl.NumberFormat("tr-TR").format(Math.round(n)) + " TL";
export const packagePrice = (lvl) => lvl.hours * HOURLY * (1 - lvl.discount);
export const subPrice = (s) => s.lessons * HOURLY * (1 - s.discount);
