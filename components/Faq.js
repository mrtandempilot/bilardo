import { faqs } from "@/lib/data";

export default function Faq() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  return (
    <section id="sss" className="section">
      <div className="wrap faq-wrap">
        <div className="section-head">
          <span className="eyebrow">SSS</span>
          <h2 className="section-title">Sık sorulan <span className="text-gold">sorular</span></h2>
        </div>
        <div className="faq-list">
          {faqs.map((f, i) => (
            <details key={i} className="faq-item" open={i === 0}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </section>
  );
}
