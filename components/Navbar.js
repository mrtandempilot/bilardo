"use client";
import { useState, useEffect } from "react";
import { site } from "@/lib/data";
import { Phone, MessageCircle, Menu, X, Target, UserRound } from "lucide-react";
import { useAuth } from "@/components/AuthProvider";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, aktifAbone, openAuth, openAccount } = useAuth();
  const initial = (user?.user_metadata?.full_name || user?.email || "?").trim()[0].toUpperCase();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`nav-header ${scrolled ? "nav-scrolled" : ""}`}>
      <div className="wrap nav-inner">
        <a href="/" className="brand-logo" aria-label="Ana sayfa">
          <div className="logo-ball-icon">
            <span className="logo-cue-ring"></span>
            <span className="logo-dot"></span>
          </div>
          <div className="brand-text">
            <span className="brand-main">Fethiye Bilardo</span>
            <span className="brand-sub">Akademi & Masterclass</span>
          </div>
        </a>

        {/* Desktop Links */}
        <nav className="desktop-nav" aria-label="Ana menü">
          <a href="/#simulator" className="nav-link">
            <Target size={15} className="nav-icon-highlight" />
            Vuruş Simülatörü
          </a>
          <a href="/#kurslar" className="nav-link">Kurslar & Branşlar</a>
          <a href="/#abonelik" className="nav-link">Abonelik</a>
          <a href="/#egitmen" className="nav-link">Eğitmen & Salon</a>
          <a href="/#online" className="nav-link">Video Dersler</a>
          <a href="/#drills" className="nav-link">Antrenmanlar</a>
          <a href="/#sss" className="nav-link">SSS</a>
        </nav>

        {/* Action Buttons */}
        <div className="nav-actions">
          <a
            href={`https://wa.me/${site.whatsapp}?text=Merhaba%2C%20bilardo%20dersleri%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum.`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp-sm"
            title="WhatsApp ile Hızlı Mesaj"
          >
            <MessageCircle size={17} />
            <span className="hide-mobile">WhatsApp</span>
          </a>
          {user ? (
            <button className="btn-account" onClick={openAccount} title="Hesabım">
              <span className={`account-avatar ${aktifAbone ? "vip" : ""}`}>{initial}</span>
              <span className="hide-mobile">Hesabım</span>
            </button>
          ) : (
            <button className="btn-login" onClick={() => openAuth("giris")}>
              <UserRound size={17} />
              <span className="hide-mobile">Giriş yap</span>
            </button>
          )}
          <a href="/#rezervasyon" className="btn-primary-sm hide-mobile">
            <span>Ders Ayarla</span>
          </a>
          <button
            className="mobile-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menüyü aç/kapat"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileOpen && (
        <div className="mobile-dropdown">
          <div className="wrap mobile-links">
            <a href="/#simulator" onClick={() => setMobileOpen(false)}>🎯 Açı & Vuruş Simülatörü</a>
            <a href="/#kurslar" onClick={() => setMobileOpen(false)}>🎱 Kurslar & Müfredat</a>
            <a href="/#abonelik" onClick={() => setMobileOpen(false)}>⭐ Aylık VIP Abonelik</a>
            <a href="/#egitmen" onClick={() => setMobileOpen(false)}>🏆 Eğitmen & Salon</a>
            <a href="/#online" onClick={() => setMobileOpen(false)}>▶️ Online Video Arşivi</a>
            <a href="/#drills" onClick={() => setMobileOpen(false)}>📋 Antrenman Egzersizleri</a>
            <a href="/#test" onClick={() => setMobileOpen(false)}>🧭 Seviye Belirleme Testi</a>
            <a href="/#sss" onClick={() => setMobileOpen(false)}>❓ Sık Sorulan Sorular</a>
            <button className="mobile-auth-btn" onClick={() => { setMobileOpen(false); user ? openAccount() : openAuth("giris"); }}>
              <UserRound size={17} /> {user ? "Hesabım" : "Giriş yap / Üye ol"}
            </button>
            <a href="/#rezervasyon" className="btn btn-gold btn-block mobile-book" onClick={() => setMobileOpen(false)}>Ders Ayarla</a>
            <div className="mobile-contact-bar">
              <a href={`tel:${site.phone.replace(/[^0-9+]/g, "")}`} className="mobile-contact-btn">
                <Phone size={16} /> {site.phone}
              </a>
              <a
                href={`https://wa.me/${site.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mobile-contact-btn whatsapp"
              >
                <MessageCircle size={16} /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
