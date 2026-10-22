import { site, branches, subscriptions, faqs, HOURLY, packagePrice, subPrice } from "@/lib/data";

// Google için yapılandırılmış veri (JSON-LD). Adres/konum değişirse lib/data.js'i güncellemek yeterli.
export function structuredData() {
  const url = site.url;
  const org = `${url}/#akademi`;
  const person = `${url}/#egitmen`;

  const business = {
    "@type": ["SportsActivityLocation", "LocalBusiness"],
    "@id": org,
    name: site.name,
    alternateName: ["Fethiye Bilardo", "Fethiye Bilardo Dersi"],
    description: "Fethiye'de TBF lisanslı antrenörden birebir Amerikan pool (8 ve 9 top) ve 3 bant karambol bilardo dersleri; başlangıç, orta ve ileri seviye kurslar ile aylık abonelik.",
    url,
    image: [`${url}/img/hero.jpg`, `${url}/img/coach.jpg`],
    logo: `${url}/icon.svg`,
    telephone: site.phone.replace(/[^0-9+]/g, ""),
    email: site.email,
    priceRange: `${HOURLY} TL / saat`,
    currenciesAccepted: "TRY",
    address: {
      "@type": "PostalAddress",
      streetAddress: site.street,
      postalCode: site.postalCode,
      addressLocality: "Fethiye",
      addressRegion: "Muğla",
      addressCountry: "TR",
    },
    areaServed: ["Fethiye", "Ölüdeniz", "Çalış", "Göcek", "Muğla"].map((n) => ({ "@type": "Place", name: n })),
    openingHoursSpecification: [{
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "10:00",
      closes: "23:30",
    }],
    hasMap: site.mapsUrl,
    sameAs: [site.instagram, site.youtube],
    founder: { "@id": person },
    employee: { "@id": person },
    knowsAbout: ["Bilardo", "Amerikan bilardo", "Pool", "3 bant bilardo", "Karambol", "Diamond sistemi"],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Bilardo kursları ve abonelikler",
      itemListElement: [
        { "@type": "Offer", name: "Tek bilardo dersi (1 saat)", price: HOURLY, priceCurrency: "TRY" },
        ...subscriptions.map((s) => ({ "@type": "Offer", name: `Aylık abonelik – ${s.name}`, price: Math.round(subPrice(s)), priceCurrency: "TRY" })),
      ],
    },
  };

  const instructor = {
    "@type": "Person",
    "@id": person,
    name: site.instructor,
    jobTitle: site.instructorTitle,
    description: site.instructorBio,
    image: `${url}/img/coach.jpg`,
    worksFor: { "@id": org },
    sameAs: [site.instagram, site.youtube],
    hasCredential: site.achievements
      .filter((a) => a.title.includes("Antrenör"))
      .map((a) => ({ "@type": "EducationalOccupationalCredential", name: `TBF ${a.title}`, recognizedBy: { "@type": "Organization", name: "Türkiye Bilardo Federasyonu" } })),
  };

  const courses = Object.values(branches).flatMap((br) =>
    br.levels.map((l) => ({
      "@type": "Course",
      name: `${br.label} – ${l.name}`,
      description: l.description,
      inLanguage: "tr",
      provider: { "@id": org },
      offers: { "@type": "Offer", category: "Paid", price: Math.round(packagePrice(l)), priceCurrency: "TRY" },
      hasCourseInstance: {
        "@type": "CourseInstance",
        courseMode: "Onsite",
        courseWorkload: `PT${l.hours}H`,
        location: { "@id": org },
        instructor: { "@id": person },
      },
    }))
  );

  const website = { "@type": "WebSite", "@id": `${url}/#site`, url, name: site.name, inLanguage: "tr-TR", publisher: { "@id": org } };

  return { "@context": "https://schema.org", "@graph": [website, business, instructor, ...courses] };
}
