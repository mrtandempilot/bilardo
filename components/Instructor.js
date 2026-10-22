import { Award, MapPin, Clock, Video, Trophy, Sparkles, MessageCircle, Phone } from "lucide-react";
import { site } from "@/lib/data";

export default function Instructor() {
  return (
    <section id="egitmen" className="section">
      <div className="wrap instructor-grid">
        <div className="instructor-media">
          <img
            src="/img/coach.jpg"
            alt={`${site.instructor} – Kupa ve Turnuva Başarıları ile`}
            className="instructor-img"
            loading="lazy"
          />
          <div className="instructor-action-badge">
            <img
              src="/img/coach-action.jpg"
              alt={`${site.instructor} – 3 Bant Turnuva Vuruş Anı`}
              className="instructor-img-sm"
              loading="lazy"
            />
            <span className="action-tag">🏆 Turnuva Maçı</span>
          </div>
        </div>

        <div>
          <span className="eyebrow">TBF Lisanslı Antrenör & Salon</span>
          <h2 className="section-title">{site.instructor}</h2>
          <p className="instructor-title">
            <Award size={18} /> {site.instructorTitle}
          </p>
          <p className="instructor-bio">{site.instructorBio}</p>

          {/* Nikola Tesla Alıntısı */}
          {site.quote && (
            <div className="coach-quote-box">
              <Sparkles size={18} className="quote-sparkle" />
              <blockquote className="coach-quote-text">
                “{site.quote}”
              </blockquote>
              <span className="coach-quote-author">— {site.quoteAuthor}</span>
            </div>
          )}

          {/* Başarılar & Dereceler */}
          <div className="achievements-wrap">
            <span className="achievements-label">Kariyer & Şampiyonluklar</span>
            <div className="achievements-grid">
              {site.achievements.map((a, i) => (
                <div key={i} className="achievement-item">
                  <span className="achieve-year">{a.year}</span>
                  <div>
                    <strong>{a.title}</strong>
                    <small>{a.detail}</small>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <ul className="feature-list">
            <li>
              <span className="feature-icon"><Video size={20} /></span>
              <div>
                <strong>Video ile vuruş analizi</strong>
                <span>Duruşun ve ıstaka hattın kayda alınır, hatayı kendi gözünle görürsün.</span>
              </div>
            </li>
            <li>
              <span className="feature-icon"><Clock size={20} /></span>
              <div>
                <strong>Esnek randevu</strong>
                <span>{site.workingHours}</span>
              </div>
            </li>
            <li>
              <span className="feature-icon"><MapPin size={20} /></span>
              <div>
                <strong>Salon</strong>
                <span>{site.address}</span>
              </div>
            </li>
          </ul>

          <div className="coach-cta-row">
            <a
              href={`https://wa.me/${site.whatsapp}?text=Merhaba%20Hakan%20Hocam%2C%20bilardo%20dersleri%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum.`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-gold"
            >
              <MessageCircle size={18} /> WhatsApp ile Yazın
            </a>
            <a
              href={`tel:${site.phone.replace(/[^0-9+]/g, "")}`}
              className="btn btn-ghost"
            >
              <Phone size={18} /> {site.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
