"use client";
import { useState } from "react";
import { branches, subscriptions, tl, packagePrice, subPrice, HOURLY } from "@/lib/data";
import VideoLessons from "@/components/VideoLessons";

export default function Courses() {
  const [branch, setBranch] = useState("amerikan");
  const [choice, setChoice] = useState("");
  const [status, setStatus] = useState("idle");
  const b = branches[branch];

  const pick = (label) => {
    setChoice(label);
    document.getElementById("rezervasyon")?.scrollIntoView({ behavior: "smooth" });
  };

  async function submit(e) {
    e.preventDefault();
    setStatus("sending");
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const r = await fetch("/api/rezervasyon", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      if (!r.ok) throw new Error();
      setStatus("sent");
    } catch { setStatus("error"); }
  }

  const options = [
    ...Object.values(branches).flatMap((br) => br.levels.map((l) => `${br.label} – ${l.name} (${l.hours} saat)`)),
    ...subscriptions.map((s) => `Abonelik – ${s.name}`),
    "Tek ders (1 saat)",
  ];

  return (
    <>
      <section id="kurslar" className="wrap">
        <div className="head">
          <h2>Kurslar</h2>
          <div className="toggle" role="tablist" aria-label="Branş seç">
            {Object.entries(branches).map(([k, v]) => (
              <button key={k} role="tab" aria-selected={branch === k} onClick={() => setBranch(k)}>{v.label}</button>
            ))}
          </div>
        </div>
        <p className="lede">{b.intro} Her seviye birebir, saatlik derslerle ilerler. Tek ders {tl(HOURLY)}.</p>

        <ol className="levels">
          {b.levels.map((l, i) => (
            <li key={l.key} className="level">
              <div className="level-top">
                <span className="step">{i + 1}. seviye</span>
                <h3>{l.name}</h3>
                <p className="hours">{l.hours} saat</p>
              </div>
              <ul className="topics">{l.topics.map((t) => <li key={t}>{t}</li>)}</ul>
              <div className="price">
                <s>{tl(l.hours * HOURLY)}</s>
                <strong>{tl(packagePrice(l))}</strong>
              </div>
              <button className="btn" onClick={() => pick(`${b.label} – ${l.name} (${l.hours} saat)`)}>Bu kursa yazıl</button>
            </li>
          ))}
        </ol>
      </section>

      <section id="abonelik" className="band">
        <div className="wrap">
          <h2>Aylık abonelik</h2>
          <p className="lede">Kursu bitirdin ama oynamaya devam mı? Her ay ders hakkın yenilenir, istediğin branşta kullanırsın. Video derslere erişim de dahil. İstediğin ay bırakırsın.</p>
          <div className="subs">
            {subscriptions.map((s) => (
              <div key={s.key} className="sub">
                <h3>{s.name}</h3>
                <p>{s.note}</p>
                <p className="sub-price"><strong>{tl(subPrice(s))}</strong> / ay</p>
                <button className="btn btn-light" onClick={() => pick(`Abonelik – ${s.name}`)}>Aboneliği başlat</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <VideoLessons onSubscribe={() => pick("Abonelik – Ayda 4 ders")} />

      <section id="rezervasyon" className="wrap form-wrap">
        <h2>Ders ayarla</h2>
        <p className="lede">Formu doldur, uygun saatleri ayarlamak için seni arayalım. Ödeme ilk derste veya online alınır.</p>
        {status === "sent" ? (
          <p className="ok" role="status">Talebin alındı. En geç bir gün içinde seni arayacağız.</p>
        ) : (
          <form onSubmit={submit} className="form">
            <label>Ad soyad<input name="ad" required autoComplete="name" /></label>
            <label>Telefon<input name="telefon" required type="tel" autoComplete="tel" /></label>
            <label className="full">Kurs veya abonelik
              <select name="paket" required value={choice} onChange={(e) => setChoice(e.target.value)}>
                <option value="" disabled>Seç</option>
                {options.map((o) => <option key={o}>{o}</option>)}
              </select>
            </label>
            <label className="full">Not (seviyen, uygun günlerin)<textarea name="not" rows={3} /></label>
            <button className="btn full" disabled={status === "sending"}>{status === "sending" ? "Gönderiliyor…" : "Talebi gönder"}</button>
            {status === "error" && <p className="err full" role="alert">Talep gönderilemedi. İnternet bağlantını kontrol edip tekrar dene ya da WhatsApp’tan yaz.</p>}
          </form>
        )}
      </section>
    </>
  );
}
