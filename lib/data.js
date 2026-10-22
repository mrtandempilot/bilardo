// Tüm içerik, eğitmen bilgileri, dersler ve fiyatlar
export const site = {
  name: "Fethiye Bilardo Akademisi",
  tagline: "Geometri, Fizik ve Zihinsel Odaklanmanın Buluştuğu Yer",
  instructor: "Hakan Çavuşoğlu",
  instructorTitle: "TBF 2. Kademe Bilardo Antrenörü & Ege Bölge Şampiyonu",
  instructorBio: "1989 İstanbul doğumlu Hakan Çavuşoğlu, 20 yılı aşkın 3 Bant Bilardo kariyerinde Türkiye 3.'lüğü, İstanbul 2.'liği ve 2018 Ege Bölge Şampiyonluğu (1.390 genel ortalama) elde etmiştir. 2016'da 1. Kademe, 2018'de 2. Kademe TBF Antrenörlük belgesini alarak aktif bilardo antrenörlüğüne başlamıştır. Oyuncularına yüksek konsantrasyon, vuruş hassasiyeti, diamond sistemleri ve maç psikolojisi kazandırarak yeni nesil şampiyonlar yetiştirmeyi ilke edinmiştir.",
  city: "Fethiye",
  phone: "+90 (536) 277 86 04",
  whatsapp: "905362778604",
  email: "hakan.cvsoglu@gmail.com",
  instagram: "https://instagram.com/hakan.cavusoglu.165",
  youtube: "https://youtube.com/@hakan5891",
  address: "Taşyaka Mah. Ölüdeniz Cad. No: 42, Fethiye / Muğla",
  workingHours: "Her gün 10:00 - 23:30 (Randevulu Özel Dersler)",
  quote: "Bilardo; Satranç kombinasyonları, fizik yasaları ve insan beyni ile vücut hareketleri arasındaki gözle görülür dikkat çekici bağlantının birleşiminden oluşan algılanması belki de en güç mükemmelliğin oyunudur.",
  quoteAuthor: "Nikola Tesla",
  achievements: [
    { year: "2018", title: "Ege Bölge Şampiyonluğu", detail: "8 maç, 1.390 genel ortalama" },
    { year: "2018", title: "TBF 2. Kademe Antrenörlük", detail: "Türkiye Bilardo Federasyonu Resmi Lisansı" },
    { year: "2016", title: "TBF 1. Kademe Antrenörlük", detail: "Temel ve Teknik Bilardo Eğitmenliği" },
    { year: "2011", title: "İstanbul İkinciliği", detail: "3 Bant Şampiyonası Finalisti" },
    { year: "2005", title: "Gençler Türkiye Üçüncülüğü", detail: "Ulusal Gençler Şampiyonası Kürsüsü" },
  ],
  stats: [
    { value: "20+", label: "Yıllık 3-Bant Deneyimi", icon: "Clock" },
    { value: "2. Kademe", label: "TBF Lisanslı Antrenör", icon: "Award" },
    { value: "1.390", label: "Ege Şampiyonası Ortalaması", icon: "Target" },
    { value: "Ege Şampiyonu", label: "Kupa & Madalya Dereceleri", icon: "Trophy" }
  ]
};

export const HOURLY = 2000; // TL, 1 saatlik özel ders

export const branches = {
  amerikan: {
    label: "Amerikan Pool (8 & 9 Top)",
    tag: "Pool Billiards",
    shortDesc: "Vuruş doğruluğu, beyaz top pozisyonu ve hatasız masa temizleme sanatı.",
    intro: "8 top, 9 top ve 10 top disiplinlerinde doğru duruş, düz ıstaka salınımı ve beyaz topun her vuruştan sonra bir sonraki hedefe santimetrik oturması için planlanmış adım adım profesyonel eğitim.",
    levels: [
      {
        key: "baslangic",
        name: "Temel Teknik & Mekanik",
        hours: 8,
        discount: 0.10,
        badge: "Giriş Seviyesi",
        description: "Istakayı doğru kavramak, omuz ve çene hattı hizalama ve düz ıstaka çıkışı.",
        topics: [
          "Doğru duruş geometrisi ve ağırlık merkezi dengesi",
          "Açık & kapalı köprü (bridge) çeşitleri ve kilitlenme",
          "Göz-ıstaka-hedef doğrusal nişan hattı oluşturma",
          "Stop shot (durdurma), Follow (takip) ve Draw (çekme) fiziği",
          "Top giriş açısı ve teğet çizgisi (90 derece kuralı)",
          "Resmi WPA 8-top kuralları ve faul disiplini"
        ]
      },
      {
        key: "orta",
        name: "Pozisyon Oyunu & Falso Dinamiği",
        hours: 10,
        discount: 0.10,
        badge: "Gelişmiş Seviye",
        description: "Beyaz topu istediğin bölgeye sürme, falso tepkileri ve 3 topluk seri planı.",
        topics: [
          "Sağ ve sol falso (English) ve beyaz topun saptırma açısı",
          "Banttan geri sekme açıları ve hız-falso dengesi",
          "3 top önceden pozisyon planlama (Runout Stratejisi)",
          "Kümeli ve kilitli topları güvenle açma teknikleri",
          "Temel safety (defansif vuruş) ve rakibi kilitleme",
          "9-top kırış (break) mekaniği ve top kontrolü"
        ]
      },
      {
        key: "ileri",
        name: "Usta Seviye & Turnuva Zihniyeti",
        hours: 12,
        discount: 0.10,
        badge: "Master / Turnuva",
        description: "Baskı altında hatasız masa bitirme, jump & masse vuruşlar ve psikolojik hazırlık.",
        topics: [
          "Karmaşık kombinasyonlar, kiss & carom vuruşları",
          "Jump (sıçratma) ve Masse vuruş teknikleri",
          "Elit seviye safety savaşları ve snooker'dan kaçış yolları",
          "Maksimum enerji aktarımıyla 9/10-top profesyonel break",
          "Vuruş öncesi 15 saniyelik zihinsel rutin (Pre-shot routine)",
          "Turnuva psikolojisi, maç yönetimi ve tempo kontrolü"
        ]
      }
    ]
  },
  ucbant: {
    label: "3 Bant Karambol (Carom)",
    tag: "3-Cushion Master",
    shortDesc: "Üç top, en az üç bant. Matematiksel açı hesaplama ve diamond sistemleri.",
    intro: "Delsiz masada saf fizik ve geometri! Elmas (diamond) sistemleri, falso katsayıları, vuruş hızı ve top kalınlığı analizleriyle karambol sanatında ustalaşın.",
    levels: [
      {
        key: "baslangic",
        name: "Karambol Temelleri & Kalınlık",
        hours: 8,
        discount: 0.10,
        badge: "Giriş Seviyesi",
        description: "Karambol vuruş hissiyatı, top kalınlıkları (1/8, 1/4, 1/2) ve vuruş ritmi.",
        topics: [
          "Karambol ıstaka tutuşu ve uzun strok dinamikleri",
          "Düz vuruş ve vuruş kalınlıklarının (1/8 - tam top) geometrisi",
          "Hız dereceleri (1-5 vites kuralı) ve masa boyu mesafe kontrolü",
          "Temel 1 ve 2 bant doğal dönüş yolları",
          "Karambol sayısı alma prensipleri ve faul kuralları",
          "Topların temas sonrası ayrılma enerjisi ve yönü"
        ]
      },
      {
        key: "orta",
        name: "Diamond Sistemi & Bricole",
        hours: 10,
        discount: 0.10,
        badge: "Sistemik Seviye",
        description: "Klasik 50-30 elmas sistemi, falso açıları ve önce banttan gelişler.",
        topics: [
          "Klasik Diamond Sistemi: Çıkış - 1. Bant = 3. Bant formülü",
          "Falsonun banttan sonraki ivmelenme ve açılma katsayısı",
          "Bricole (önce bant) vuruşlarında açı okuma",
          "Kısa-uzun-kısa ve uzun-kısa-uzun klasik yollar",
          "İkinci top kontrolü ve pozisyon bırakma düşüncesi",
          "Masa ısısı ve nemin bant tepkisine etkisi"
        ]
      },
      {
        key: "ileri",
        name: "İleri Sistemler & Turnuva Ustası",
        hours: 12,
        discount: 0.10,
        badge: "Pro Master",
        description: "Plus sistemi, Maestro, ters falso, kilit kurtarma ve seri karambol.",
        topics: [
          "Plus Sistemi ve Maestro kısa bant kombinasyonları",
          "Ters falso (reverse english) ile beklenmedik dönüş hatları",
          "Masse, piqué ve yüksek açılı kavisli kurtarma vuruşları",
          "Topları toplama (cadre mantığı) ve peş peşe 5+ seri yapma",
          "Turnuva seti taktiği: Ne zaman risk, ne zaman defans?",
          "Dünya standartlarında maç konsantrasyonu ve nefes disiplini"
        ]
      }
    ]
  }
};

export const subscriptions = [
  {
    key: "ay4",
    name: "Gelişim Paketi (Haftada 1)",
    lessons: 4,
    discount: 0.15,
    popular: false,
    badge: "Düzenli Hobi",
    note: "Haftada 1 ders ile ritmini kaybetmeden düzenli ilerlemek isteyen bilardoseverler için ideal.",
    features: [
      "Ayda 4 saat birebir antrenör eşliğinde özel ders",
      "Kişiye özel vuruş ve teknik analiz formu",
      "Ders günlerinde 1 saat ücretsiz serbest masa antrenmanı",
      "Tüm online video eğitim arşivine sınırsız erişim",
      "Antrenörle özel WhatsApp soru & pozisyon hattı"
    ]
  },
  {
    key: "ay8",
    name: "Turnuva & Master Paketi (Haftada 2)",
    lessons: 8,
    discount: 0.20,
    popular: true,
    badge: "En Çok Tercih Edilen",
    note: "Hızlı seviye atlamak, seri yapmak ve bölgesel turnuvalara hazırlanmak isteyen tutkulu oyuncular için.",
    features: [
      "Ayda 8 saat yoğun birebir antrenör eşliğinde özel ders",
      "Yüksek hızlı kamera ve lazer açı analiz seansları",
      "Haftalık 3 saat ücretsiz serbest antrenman masa hakkı",
      "Müfredat kitapçığı ve kişisel drill çizelgesi",
      "Resmi TBF sporcu lisansı çıkarma danışmanlığı",
      "Tüm online video arşivi + yeni derslere öncelikli erişim"
    ]
  }
];

// Egzersiz & Antrenman Kütüphanesi (Drills)
export const practiceDrills = [
  {
    id: "drill-1",
    title: "Ghost Ball & Çizgi Üstü Düz Istaka Testi",
    branch: "amerikan",
    difficulty: "Başlangıç",
    difficultyLevel: 1,
    target: "10 denemede 8+ tam temas",
    description: "Istakanın sapmadan doğrusal hareket ettiğini ve çene-omuz hattının kusursuz olduğunu kanıtlayan temel test.",
    tips: "Geri çekişte duraklayın, topa değil hayali temas noktasına odaklanın."
  },
  {
    id: "drill-2",
    title: "Stop Shot & Beyaz Top Santimetre Hakimiyeti",
    branch: "amerikan",
    difficulty: "Orta",
    difficultyLevel: 2,
    target: "Beyaz top hedef topun yerinde 1 cm kıpırdamadan dursun",
    description: "Vuruş anındaki merkez altı falso ve hız dengesini mükemmelleştiren elzem egzersiz.",
    tips: "Istakayı sıkmayın, bilek gevşek kalsın ve vuruş mesafesine göre yükseklik ayarlayın."
  },
  {
    id: "drill-3",
    title: "Klasik 50-30 Diamond Rotası & Doğrulama",
    branch: "ucbant",
    difficulty: "Orta",
    difficultyLevel: 2,
    target: "3. bant 20 elmasına 5 kez üst üste temas",
    description: "50 çıkışından 30 elmasına atılarak 20 varışına ulaşan ana karambol formülünün kas hafızasına kazınması.",
    tips: "2 vites hız ve saat 1.30 yönünde tam 2 falso verin."
  },
  {
    id: "drill-4",
    title: "Kümeyi Açma & 3 Topluk Seri Pozisyonu",
    branch: "amerikan",
    difficulty: "İleri",
    difficultyLevel: 3,
    target: "Kümeyi açtıktan sonra ardışık 3 topu cebe indirme",
    description: "Beyaz topun doğal teğet hattını kullanarak kilitli iki topu çözüp bir sonraki cebe hazır pozisyon bırakma.",
    tips: "Açıları banttan sonraki yola göre hesaplayın, aşırı güçten kaçının."
  },
  {
    id: "drill-5",
    title: "Bricole (Önce Bant) ile Dar Açı Kurtarma",
    branch: "ucbant",
    difficulty: "İleri",
    difficultyLevel: 3,
    target: "10 denemede 7 karambol sayısı",
    description: "Doğrudan vurulamayan kırmızı topa önce kısa banttan vurarak genişletilmiş açıyla gitme tekniği.",
    tips: "Istaka ucunu tebeşirleyin, falso transferini hissetmek için masanın temizliğine dikkat edin."
  }
];

// Herkese açık örnek YouTube dersleri
export const freeVideos = [
  {
    id: "xkqNkdfro-I",
    branch: "amerikan",
    title: "Kusursuz Köprü (Bridge) ve Istaka Tutuşu",
    channel: "STARSHOT",
    duration: "11:20",
    views: "18.4K",
    highlight: "Sallantısız vuruşun 3 altın anahtarı"
  },
  {
    id: "FYBvMjLhTc8",
    branch: "amerikan",
    title: "Falso ve Bant Açısı ile Beyaz Top Pozisyonu",
    channel: "Allisonant Gr",
    duration: "14:45",
    views: "24.1K",
    highlight: "90 ve 30 derece teğet hatları"
  },
  {
    id: "np9M8vV1t54",
    branch: "ucbant",
    title: "3 Bant Diamond (Elmas) Sistemi Mantığı",
    channel: "3C Billiards BM",
    duration: "16:10",
    views: "42.8K",
    highlight: "Çıkış - Hedef = 3. Bant formülü"
  },
  {
    id: "0vaXMU1aPjI",
    branch: "ucbant",
    title: "Diamond Sisteminde Falso ve Açı Değişimleri",
    channel: "3C Billiards BM",
    duration: "19:05",
    views: "31.5K",
    highlight: "Masa hızı ve falso katsayısı uyumu"
  }
];

// Abonelere özel video dersler
// Videoyu yükleyince (YouTube'da "Liste dışı") ID'sini youtube alanına yaz: { ..., youtube: "VIDEO_ID" }
// Aktif abone giriş yapınca oynatılabilir hale gelir; youtube alanı olmayanlar "Yakında" görünür.
export const videos = [
  { id: "a1", branch: "amerikan", level: "Başlangıç", title: "Duruş Geometrisi & Göz-Hedef Hizalama", duration: "14:40", tag: "Temel Mekanik" },
  { id: "a2", branch: "amerikan", level: "Başlangıç", title: "Stop, Takip ve Çekme (Draw) Fiziği", duration: "18:15", tag: "Beyaz Top" },
  { id: "a3", branch: "amerikan", level: "Orta", title: "Kilitli Kümeleri Dağıtma & Kaçış Açıları", duration: "15:30", tag: "Strateji" },
  { id: "a4", branch: "amerikan", level: "İleri", title: "9-Top Kırış (Break) & Profesyonel Seri", duration: "21:05", tag: "Turnuva" },
  { id: "u1", branch: "ucbant", level: "Başlangıç", title: "Top Kalınlığını Santimetrik Okumak", duration: "16:20", tag: "Temel Karambol" },
  { id: "u2", branch: "ucbant", level: "Orta", title: "50-30 Diamond Sistemi İle Sayı Üretimi", duration: "24:45", tag: "Diamond Sistem" },
  { id: "u3", branch: "ucbant", level: "Orta", title: "Önce Banttan (Bricole) Hassas Vuruşlar", duration: "19:10", tag: "Bant Sanatı" },
  { id: "u4", branch: "ucbant", level: "İleri", title: "Plus & Maestro Sistemleri ile Seri Karambol", duration: "28:30", tag: "Master Class" }
];

// Öğrenci Görüşleri & Yorumlar
// DİKKAT: Aşağıdakiler ÖRNEK metinlerdir (ornek: true). Sitede gösterilmezler.
// Gerçek öğrenci yorumu (izinli) eklediğinde ornek alanını sil, bölüm otomatik açılır.
export const testimonials = [
  {
    name: "Emre Çağlar",
    role: "Yazılım Mühendisi / Amerikan Pool Tutkunu",
    ornek: true,
    avatar: "EC",
    stars: 5,
    text: "Arkadaş ortamında sadece şansına vuruyordum. 8 saatlik başlangıç kursundan sonra ıstakayı tutuşumdan beyaz topu istediğim yerde durdurmaya kadar oyunum seviye atladı. Duruşumu videoya çekip analiz etmeleri inanılmaz fark yarattı.",
    course: "Amerikan – Temel Teknik"
  },
  {
    name: "Dr. Selim Karahan",
    role: "Genel Cerrahi Uzmanı / 3-Bant Sporcusu",
    ornek: true,
    avatar: "SK",
    stars: 5,
    text: "Hakan Hoca'nın diamond sistemini anlatışı tam bir cerrahi hassasiyette. Yıllardır bant açılarını ezbere vurup kaçırıyordum; şimdi tahtaya çizip hesaplar gibi rahat sayılar alıyorum. Fethiye'de böyle bir eğitim salonu olması büyük şans.",
    course: "3 Bant – Diamond & Sistemik"
  },
  {
    name: "Deniz Yılmaz",
    role: "Üniversite Öğrencisi / Lisanslı Genç Sporcu",
    ornek: true,
    avatar: "DY",
    stars: 5,
    text: "Aylık 8 derslik paketi aldım ve 3 ayda Fethiye yerel turnuvasında çeyrek finale çıktım. Sadece vuruş değil, maç esnasındaki stres kontrolünü ve taktiği de öğretiyorlar. Herkese tavsiye ederim.",
    course: "Abonelik – Turnuva & Master"
  }
];

// Sık Sorulan Sorular (FAQ)
export const faqs = [
  {
    q: "Daha önce hiç bilardo oynamadım, sıfırdan başlayabilir miyim?",
    a: "Kesinlikle! Öğrencilerimizin yaklaşık %60'ı ilk kez ıstaka tutan kişilerden oluşuyor. Derslerimiz birebir olduğu için tamamen sizin öğrenme hızınıza göre ilerler ve doğru alışkanlıkları en baştan edinmenizi sağlar."
  },
  {
    q: "Kendi ıstakam olmalı mı, yoksa salonda temin ediliyor mu?",
    a: "Akademimizde eğitim süresince profesyonel ağırlık ve uç dengesine sahip ıstakalar tamamen ücretsiz kullanımınıza sunulur. İlerleyen süreçte kendi ıstakanızı almak isterseniz bütçenize göre doğru ıstaka ve uç seçimi konusunda da danışmanlık veriyoruz."
  },
  {
    q: "Ders saatleri nasıl belirleniyor?",
    a: "Haftanın 7 günü 10:00 - 23:30 saatleri arasında sizin ve eğitmenimizin ortak takvimine göre esnek randevu sistemiyle planlanır. İptal veya ertelemeleri 24 saat önceden bildirerek telafi dersi alabilirsiniz."
  },
  {
    q: "Amerikan bilardo mu yoksa 3-Bant karambol mü seçmeliyim?",
    a: "Eğer hızlı cebe sokma, dinamik masa temizleme ve renkli toplar ilginizi çekiyorsa Amerikan Pool ile başlamanızı; saf geometri, açı hesaplamaları ve zihinsel strateji arıyorsanız 3-Bant Karambol'ü öneririz. Dilerseniz ilk derste her ikisini de deneyimleyip karar verebilirsiniz."
  },
  {
    q: "Derslerde video veya lazer teknolojisi kullanılıyor mu?",
    a: "Evet! Özellikle duruş, köprü stabilitesi ve ıstaka düzlüğünü ölçmek için yüksek hızlı kamera kayıtları ve vuruş hattı lazer kılavuzları kullanılmaktadır. Bu sayede hatalarınızı kendi gözlerinizle görüp hızla düzeltirsiniz."
  }
];

export const tl = (n) => new Intl.NumberFormat("tr-TR").format(Math.round(n)) + " TL";
export const packagePrice = (lvl) => lvl.hours * HOURLY * (1 - lvl.discount);
export const subPrice = (s) => s.lessons * HOURLY * (1 - s.discount);

// Rezervasyon formundaki seçenekler (kurs kartları, abonelik ve seviye testi aynı etiketleri kullanır)
export const levelLabel = (br, l) => `${br.label} – ${l.name} (${l.hours} saat)`;
export const subLabel = (s) => `Abonelik – ${s.name}`;
export const SINGLE_LESSON = "Tek ders (1 saat)";
export const packageOptions = [
  ...Object.values(branches).flatMap((br) => br.levels.map((l) => levelLabel(br, l))),
  ...subscriptions.map(subLabel),
  SINGLE_LESSON,
];
