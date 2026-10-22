"use client";
import { useState } from "react";
import { branches, videos, freeVideos, subscriptions, subLabel } from "@/lib/data";
import { pickPackage } from "@/lib/pick";
import { useAuth } from "@/components/AuthProvider";

// YouTube videosu: önce kapak resmi, tıklayınca oynatıcı yüklenir (sayfa hızlı açılsın diye).
function YouTubeCard({ v, member }) {
  const [playing, setPlaying] = useState(false);
  return (
    <li className="video">
      <div className="thumb yt">
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${v.id}?autoplay=1&rel=0`}
            title={v.title}
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button className="yt-cover" onClick={() => setPlaying(true)} aria-label={`${v.title} videosunu oynat`}>
            <img src={`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`} alt="" loading="lazy" />
            <span className="play" />
            <span className="free">{member ? "Abone" : "Ücretsiz"}</span>
          </button>
        )}
      </div>
      <p className="video-meta">{branches[v.branch].label} · {member ? v.level : v.channel}</p>
      <h3>{v.title}</h3>
    </li>
  );
}

export default function VideoLessons() {
  const [filter, setFilter] = useState("hepsi");
  const byFilter = (list) => (filter === "hepsi" ? list : list.filter((v) => v.branch === filter));
  const tabs = [["hepsi", "Hepsi"], ...Object.entries(branches).map(([k, v]) => [k, v.label])];
  const free = byFilter(freeVideos);
  const locked = byFilter(videos);
  const { user, aktifAbone, openAuth } = useAuth();

  return (
    <section id="online" className="section">
      <div className="wrap">
      <div className="section-head">
        <span className="eyebrow">Video dersler</span>
        <h2 className="section-title">Derste çalıştığını <span className="text-gold">evde tekrar izle</span></h2>
        <p className="section-desc">Örnek dersler herkese açık; tam arşiv abonelere özel ve her ay yeni ders eklenir.</p>
      </div>
      <div className="pill-tabs" role="tablist" aria-label="Online dersleri filtrele">
        {tabs.map(([k, label]) => (
          <button key={k} role="tab" aria-selected={filter === k} className={filter === k ? "active" : ""} onClick={() => setFilter(k)}>{label}</button>
        ))}
      </div>

      <h3 className="sub-head">Ücretsiz örnek dersler</h3>
      <ul className="video-grid">
        {free.map((v) => <YouTubeCard key={v.id} v={v} />)}
      </ul>

      <h3 className="sub-head">Abonelere özel {aktifAbone && <span className="sub-head-ok">· Arşiv açık</span>}</h3>
      <ul className="video-grid">
        {locked.map((v) => aktifAbone && v.youtube ? (
          <YouTubeCard key={v.id} v={{ ...v, id: v.youtube }} member />
        ) : (
          <li key={v.id} className="video">
            <div className="thumb" aria-hidden="true">
              <span className="play" />
              <span className="dur">{v.duration}</span>
              <span className={aktifAbone ? "free" : "lock"}>{aktifAbone ? "Yakında" : "Abonelere özel"}</span>
            </div>
            <p className="video-meta">{branches[v.branch].label} · {v.level}</p>
            <h3>{v.title}</h3>
          </li>
        ))}
      </ul>

      {!aktifAbone && (
        <div className="video-cta">
          <p>{user ? "Online derslere erişim her iki abonelik paketine dahil." : "Abonesen giriş yap, arşiv hesabında açılsın. Değilsen abone ol."}</p>
          <div className="video-cta-btns">
            {!user && <button className="btn btn-ghost" onClick={() => openAuth("giris")}>Giriş yap</button>}
            <button className="btn btn-gold" onClick={() => pickPackage(subLabel(subscriptions[0]))}>Abone ol, online dersleri aç</button>
          </div>
        </div>
      )}
      </div>
    </section>
  );
}
