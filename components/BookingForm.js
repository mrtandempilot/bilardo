"use client";
import { useEffect, useState } from "react";
import { Phone, MessageCircle, MapPin, Clock } from "lucide-react";
import { site, packageOptions } from "@/lib/data";

export default function BookingForm() {
  const [choice, setChoice] = useState("");
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    const onPick = (e) => {
      const label = e.detail;
      if (packageOptions.includes(label)) setChoice(label);
      setStatus((s) => (s === "sent" ? "idle" : s));
    };
    window.addEventListener("paket-sec", onPick);
    return () => window.removeEventListener("paket-sec", onPick);
  }, []);

  async function submit(e) {
    e.preventDefault();
    setStatus("sending");
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const r = await fetch("/api/rezervasyon", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!r.ok) throw new Error();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="rezervasyon" className="section section-alt">
      <div className="wrap booking-grid">
        <div>
          <span className="eyebrow">Ders ayarla</span>
          <h2 className="section-title">İlk dersini <span className="text-gold">bugün</span> planla</h2>
          <p className="section-desc">Formu doldur, uygun saatleri ayarlamak için seni arayalım. Acelen varsa direkt ara ya da WhatsApp’tan yaz.</p>
          <ul className="contact-list">
            <li><Phone size={18} /><a href={`tel:${site.phone.replace(/[^0-9+]/g, "")}`}>{site.phone}</a></li>
            <li><MessageCircle size={18} /><a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener noreferrer">WhatsApp’tan yaz</a></li>
            <li><MapPin size={18} /><span>{site.address}</span></li>
            <li><Clock size={18} /><span>{site.workingHours}</span></li>
          </ul>
        </div>

        <div className="glass-panel form-card">
          {status === "sent" ? (
            <div className="ok" role="status">
              <strong>Talebin alındı.</strong>
              <p>En geç bir gün içinde seni arayacağız.</p>
              <button className="btn btn-ghost" onClick={() => setStatus("idle")}>Yeni talep gönder</button>
            </div>
          ) : (
            <form onSubmit={submit} className="form">
              <label>Ad soyad<input name="ad" required autoComplete="name" /></label>
              <label>Telefon<input name="telefon" required type="tel" autoComplete="tel" placeholder="05xx xxx xx xx" /></label>
              <label className="full">Kurs veya abonelik
                <select name="paket" required value={choice} onChange={(e) => setChoice(e.target.value)}>
                  <option value="" disabled>Seç</option>
                  {packageOptions.map((o) => <option key={o}>{o}</option>)}
                </select>
              </label>
              <label className="full">Not (seviyen, uygun günlerin)<textarea name="not" rows={3} /></label>
              <button className="btn btn-gold btn-block full" disabled={status === "sending"}>
                {status === "sending" ? "Gönderiliyor…" : "Talebi gönder"}
              </button>
              {status === "error" && (
                <p className="err full" role="alert">Talep gönderilemedi. Bağlantını kontrol edip tekrar dene ya da WhatsApp’tan yaz.</p>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
