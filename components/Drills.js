"use client";
import { useState } from "react";
import { Target, Lightbulb } from "lucide-react";
import { branches, practiceDrills } from "@/lib/data";

export default function Drills() {
  const [filter, setFilter] = useState("hepsi");
  const tabs = [["hepsi", "Hepsi"], ...Object.entries(branches).map(([k, v]) => [k, v.label])];
  const list = filter === "hepsi" ? practiceDrills : practiceDrills.filter((d) => d.branch === filter);

  return (
    <section id="drills" className="section section-alt">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">Antrenman kütüphanesi</span>
          <h2 className="section-title">Masada tek başına <span className="text-gold">çalışabileceğin</span> egzersizler</h2>
          <p className="section-desc">Derste öğrendiğini kas hafızasına yerleştirmek için ölçülebilir hedefli drill’ler. Hedefi tutturduğunda bir sonrakine geç.</p>
        </div>

        <div className="pill-tabs" role="tablist" aria-label="Egzersizleri filtrele">
          {tabs.map(([k, label]) => (
            <button key={k} role="tab" aria-selected={filter === k} className={filter === k ? "active" : ""} onClick={() => setFilter(k)}>{label}</button>
          ))}
        </div>

        <ul className="drill-grid">
          {list.map((d) => (
            <li key={d.id} className="drill-card">
              <div className="drill-top">
                <span className="drill-branch">{branches[d.branch].label}</span>
                <span className="difficulty" aria-label={`Zorluk: ${d.difficulty}`}>
                  {[1, 2, 3].map((n) => <i key={n} className={n <= d.difficultyLevel ? "on" : ""} />)}
                  <em>{d.difficulty}</em>
                </span>
              </div>
              <h3>{d.title}</h3>
              <p>{d.description}</p>
              <p className="drill-target"><Target size={16} /> <span><strong>Hedef:</strong> {d.target}</span></p>
              <p className="drill-tip"><Lightbulb size={16} /> <span>{d.tips}</span></p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
