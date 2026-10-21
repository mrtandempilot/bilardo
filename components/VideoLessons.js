"use client";
import { useState } from "react";
import { branches, videos, freeVideos } from "@/lib/data";

// YouTube videosu: önce kapak resmi, tıklayınca oynatıcı yüklenir (sayfa hızlı açılsın diye).
function YouTubeCard({ v }) {
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
            <span className="free">Ücretsiz</span>
          </button>
        )}
      </div>
      <p className="video-meta">{branches[v.branch].label}, YouTube: {v.channel}</p>
      <h3>{v.title}</h3>
    </li>
  );
}

export default function VideoLessons({ onSubscribe }) {
  const [filter, setFilter] = useState("hepsi");
  const byFilter = (list) => (filter === "hepsi" ? list : list.filter((v) => v.branch === filter));
  const tabs = [["hepsi", "Hepsi"], ...Object.entries(branches).map(([k, v]) => [k, v.label])];
  const free = byFilter(freeVideos);
  const locked = byFilter(videos);

  return (
    <section id="online" className="wrap videos">
      <div className="head">
        <h2>Online dersler</h2>
        <div className="toggle" role="tablist" aria-label="Online dersleri filtrele">
          {tabs.map(([k, label]) => (
            <button key={k} role="tab" aria-selected={filter === k} onClick={() => setFilter(k)}>{label}</button>
          ))}
        </div>
      </div>
      <p className="lede">Derste çalıştığın vuruşları evde tekrar izle, bir sonraki derse hazır gel. Aşağıdaki örnek dersler herkese açık; tam arşiv abonelere özel ve her ay yeni ders eklenir.</p>

      <h3 className="sub-head">Ücretsiz örnek dersler</h3>
      <ul className="video-grid">
        {free.map((v) => <YouTubeCard key={v.id} v={v} />)}
      </ul>

      <h3 className="sub-head">Abonelere özel</h3>
      <ul className="video-grid">
        {locked.map((v) => (
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
        <p>Online derslere erişim her iki abonelik paketine dahil.</p>
        <button className="btn" onClick={onSubscribe}>Abone ol, online dersleri aç</button>
      </div>
    </section>
  );
}
