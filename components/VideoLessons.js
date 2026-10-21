"use client";
import { useState } from "react";
import { branches, videos } from "@/lib/data";

// Abonelere özel video dersler. Şimdilik hepsi kilitli; giriş sistemi gelince açılacak.
export default function VideoLessons({ onSubscribe }) {
  const [filter, setFilter] = useState("hepsi");
  const list = filter === "hepsi" ? videos : videos.filter((v) => v.branch === filter);
  const tabs = [["hepsi", "Hepsi"], ...Object.entries(branches).map(([k, v]) => [k, v.label])];

  return (
    <section id="videolar" className="wrap videos">
      <div className="head">
        <h2>Video dersler</h2>
        <div className="toggle" role="tablist" aria-label="Videoları filtrele">
          {tabs.map(([k, label]) => (
            <button key={k} role="tab" aria-selected={filter === k} onClick={() => setFilter(k)}>{label}</button>
          ))}
        </div>
      </div>
      <p className="lede">Abonelere özel. Derste çalıştığın vuruşları evde tekrar izle, bir sonraki derse hazır gel. Her ay yeni video eklenir.</p>

      <ul className="video-grid">
        {list.map((v) => (
          <li key={v.id} className="video">
            <div className="thumb" aria-hidden="true">
              <span className="play" />
              <span className="dur">{v.duration}</span>
              <span className="lock">Abonelere özel</span>
            </div>
            <p className="video-meta">{branches[v.branch].label}, {v.level}</p>
            <h3>{v.title}</h3>
          </li>
        ))}
      </ul>

      <div className="video-cta">
        <p>Videolara erişim her iki abonelik paketine dahil.</p>
        <button className="btn" onClick={onSubscribe}>Abone ol, videoları aç</button>
      </div>
    </section>
  );
}
