"use client";
import { useState } from "react";
import { Check, Clock, Star } from "lucide-react";
import { branches, subscriptions, tl, packagePrice, subPrice, HOURLY, levelLabel, subLabel } from "@/lib/data";
import { pickPackage } from "@/lib/pick";

export default function Courses() {
  const [branch, setBranch] = useState("amerikan");
  const b = branches[branch];

  return (
    <>
      <section id="kurslar" className="section">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">Kurslar & Branşlar</span>
            <h2 className="section-title">Seviyene göre <span className="text-gold">saat saat</span> planlanmış kurslar</h2>
            <p className="section-desc">{b.intro}</p>
          </div>

          <div className="seg" role="tablist" aria-label="Branş seç">
            {Object.entries(branches).map(([k, v]) => (
              <button key={k} role="tab" aria-selected={branch === k} className={branch === k ? "active" : ""} onClick={() => setBranch(k)}>
                <strong>{v.label}</strong>
                <span>{v.shortDesc}</span>
              </button>
            ))}
          </div>

          <ol className="course-grid">
            {b.levels.map((l, i) => (
              <li key={l.key} className="course-card">
                <div className="course-top">
                  <span className="course-step">{i + 1}. seviye · {l.badge}</span>
                  <h3>{l.name}</h3>
                  <p className="course-hours"><Clock size={15} /> {l.hours} saat birebir</p>
                  <p className="course-desc">{l.description}</p>
                </div>
                <ul className="check-list">
                  {l.topics.map((t) => (
                    <li key={t}><Check size={16} /> <span>{t}</span></li>
                  ))}
                </ul>
                <div className="course-foot">
                  <div className="price-row">
                    <s>{tl(l.hours * HOURLY)}</s>
                    <strong>{tl(packagePrice(l))}</strong>
                    <span className="save">%{Math.round(l.discount * 100)} paket indirimi</span>
                  </div>
                  <button className="btn btn-gold btn-block" onClick={() => pickPackage(levelLabel(b, l))}>Bu kursa yazıl</button>
                </div>
              </li>
            ))}
          </ol>
          <p className="fine">Tek ders {tl(HOURLY)}. Ödeme ilk derste ya da online alınır.</p>
        </div>
      </section>

      <section id="abonelik" className="section section-alt">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">Aylık abonelik</span>
            <h2 className="section-title">Kursu bitirdin, <span className="text-gold">oynamaya devam</span></h2>
            <p className="section-desc">Her ay ders hakkın yenilenir, istediğin branşta kullanırsın. Online video arşivi dahil. İstediğin ay bırakırsın.</p>
          </div>

          <div className="sub-grid">
            {subscriptions.map((s) => (
              <div key={s.key} className={`sub-card ${s.popular ? "popular" : ""}`}>
                {s.popular && <span className="popular-tag"><Star size={13} fill="currentColor" /> {s.badge}</span>}
                {!s.popular && <span className="course-step">{s.badge}</span>}
                <h3>{s.name}</h3>
                <p className="sub-note">{s.note}</p>
                <div className="price-row big">
                  <s>{tl(s.lessons * HOURLY)}</s>
                  <strong>{tl(subPrice(s))}</strong>
                  <span>/ ay</span>
                </div>
                <ul className="check-list">
                  {s.features.map((f) => (
                    <li key={f}><Check size={16} /> <span>{f}</span></li>
                  ))}
                </ul>
                <button className={`btn btn-block ${s.popular ? "btn-gold" : "btn-ghost"}`} onClick={() => pickPackage(subLabel(s))}>
                  Aboneliği başlat
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
