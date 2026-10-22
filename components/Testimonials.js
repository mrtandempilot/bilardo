import { Star, Quote } from "lucide-react";
import { testimonials } from "@/lib/data";

// Sadece gerçek yorumlar gösterilir (data.js'de ornek: true olanlar gizli).
export default function Testimonials() {
  const real = testimonials.filter((t) => !t.ornek);
  if (real.length === 0) return null;

  return (
    <section id="yorumlar" className="section">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">Öğrenciler</span>
          <h2 className="section-title">Derslerden <span className="text-gold">sonra</span></h2>
        </div>
        <ul className="testi-grid">
          {real.map((t) => (
            <li key={t.name} className="testi-card">
              <Quote size={28} className="testi-quote" />
              <div className="stars" aria-label={`${t.stars} yıldız`}>
                {Array.from({ length: t.stars }).map((_, i) => <Star key={i} size={15} fill="currentColor" />)}
              </div>
              <p>{t.text}</p>
              <div className="testi-person">
                <span className="avatar">{t.avatar}</span>
                <div><strong>{t.name}</strong><span>{t.course}</span></div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
