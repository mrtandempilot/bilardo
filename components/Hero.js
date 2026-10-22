"use client";
import { site } from "@/lib/data";
import { Award, Clock, Trophy, Target, ArrowRight, Play, Sparkles } from "lucide-react";

const statIcons = {
  Clock: Clock,
  Trophy: Trophy,
  Award: Award,
  Target: Target,
};

export default function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-bg-overlay"></div>
      
      <div className="wrap hero-container">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-pulse"></span>
            <Sparkles size={14} className="badge-sparkle" />
            <span>TBF lisanslı antrenör · Birebir özel ders</span>
          </div>

          <h1 className="hero-title">
            <span className="hero-kicker">Fethiye Bilardo Dersi ve Kursu</span>
            Bilardoyu Şansa Değil, <span className="text-gold-gradient">Geometri ve Fiziğe</span> Bırak.
          </h1>

          <p className="hero-desc">
            İlk kez ıstaka tutuşundan şampiyona hazırlığına kadar; Fethiye'de Simonis çuhalı resmi masalarda, 
            yüksek hızlı kamera ve açı simülasyonlarıyla <strong>Amerikan (Pool)</strong> ve <strong>3 Bant (Karambol)</strong> birebir özel dersleri.
          </p>

          <div className="hero-buttons">
            <a href="#kurslar" className="btn-hero-primary">
              <span>Kursları ve Seviyeleri İncele</span>
              <ArrowRight size={18} />
            </a>
            <a href="#simulator" className="btn-hero-secondary">
              <span className="btn-icon-circle"><Play size={14} fill="#eab308" /></span>
              <span>Açı & Vuruş Simülatörü</span>
            </a>
          </div>

          {/* Quick Perks Bar */}
          <div className="hero-perks">
            <div className="perk-item">
              <span className="perk-dot"></span>
              <span>Birebir Özel Antrenör</span>
            </div>
            <div className="perk-item">
              <span className="perk-dot"></span>
              <span>Lazer & Video Vuruş Analizi</span>
            </div>
            <div className="perk-item">
              <span className="perk-dot"></span>
              <span>Esnek Randevu Saatleri</span>
            </div>
          </div>
        </div>

        {/* Hero Interactive Visual Card */}
        <div className="hero-card-side">
          <div className="glass-hero-card">
            <div className="card-header-badge">
              <span className="live-indicator"></span> Canlı Eğitim Salonu
            </div>
            
            <div className="hero-table-preview">
              <img
                src="/img/hero.jpg"
                alt="Fethiye Bilardo Akademisi Turnuva Masası"
                className="hero-card-img"
              />
              <div className="table-overlay-tag">
                <span className="table-tag-title">Simonis 300 Turnuva Çuhası</span>
                <span className="table-tag-sub">Resmi TBF Standartlarında</span>
              </div>
            </div>

            <div className="hero-card-footer">
              <div className="coach-quick-info">
                <img
                  src="/img/coach-avatar.jpg"
                  alt={site.instructor}
                  className="coach-avatar-sm"
                />
                <div>
                  <div className="coach-name">{site.instructor}</div>
                  <div className="coach-role">TBF 2. Kademe Antrenör</div>
                </div>
              </div>
              <a href="#rezervasyon" className="card-quick-cta">
                Randevu Al →
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Counter Ribbon */}
      <div className="hero-stats-ribbon">
        <div className="wrap stats-grid">
          {site.stats.map((s, idx) => {
            const IconComponent = statIcons[s.icon] || Trophy;
            return (
              <div key={idx} className="stat-card">
                <div className="stat-icon-wrap">
                  <IconComponent size={22} />
                </div>
                <div>
                  <div className="stat-value">{s.value}</div>
                  <div className="stat-label">{s.label}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
