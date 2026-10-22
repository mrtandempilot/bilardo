"use client";
import { useState, useEffect, useRef } from "react";
import { Play, Sparkles, Compass } from "lucide-react";

// Amerikan masası: beyaz topun vuruş sonrası izlediği yol (falsoya göre)
const CUE_START = [120, 110];
const CONTACT = [306, 110];
const cuePaths = {
  stop: [CUE_START, CONTACT, [312, 110]],
  follow: [CUE_START, CONTACT, [395, 158]],
  draw: [CUE_START, CONTACT, [215, 150]],
  left: [CUE_START, CONTACT, [352, 192], [420, 150]],
  right: [CUE_START, CONTACT, [348, 28], [415, 70]],
};
const segLen = (a, b) => Math.hypot(b[0] - a[0], b[1] - a[1]);
function cueMotion(points) {
  const d = "M " + points.map((p) => p.join(" ")).join(" L ");
  let total = 0;
  for (let i = 1; i < points.length; i++) total += segLen(points[i - 1], points[i]);
  const contact = segLen(points[0], points[1]) / total;
  return { d, contact };
}

export default function ShotSimulator() {
  const [activeTab, setActiveTab] = useState("ucbant"); // 'ucbant' | 'amerikan'

  // --- 3-BANT SİMÜLATÖR STATE ---
  const [departure, setDeparture] = useState(50); // Çıkış elması
  const [arrival, setArrival] = useState(20); // 3. Bant hedefi
  const [isAnimating3C, setIsAnimating3C] = useState(false);
  const [shot3C, setShot3C] = useState(0);
  const motion3CRef = useRef(null);
  const [caromScored, setCaromScored] = useState(false);

  // Formül: 1. Bant = Çıkış - 3. Bant
  const aimTarget = departure - arrival;

  // --- AMERİKAN SPIN LAB STATE ---
  const [spinType, setSpinType] = useState("stop"); // 'stop' | 'follow' | 'draw' | 'left' | 'right'
  const [isAnimatingPool, setIsAnimatingPool] = useState(false);
  const [poolPotted, setPoolPotted] = useState(false);
  const [shotPool, setShotPool] = useState(0);
  const cueMotionRef = useRef(null);

  // SVG animasyonlarını vuruş anında başlat
  useEffect(() => {
    if (isAnimating3C) motion3CRef.current?.beginElement?.();
  }, [isAnimating3C, shot3C]);
  useEffect(() => {
    if (isAnimatingPool) cueMotionRef.current?.beginElement?.();
  }, [isAnimatingPool, shotPool]);

  const trigger3CushionShot = () => {
    setShot3C((n) => n + 1);
    setIsAnimating3C(true);
    setCaromScored(false);
    setTimeout(() => {
      setCaromScored(true);
    }, 1800);
    setTimeout(() => {
      setIsAnimating3C(false);
    }, 2800);
  };

  const triggerPoolShot = () => {
    setShotPool((n) => n + 1);
    setIsAnimatingPool(true);
    setPoolPotted(false);
    setTimeout(() => {
      setPoolPotted(true);
    }, 1350);
    setTimeout(() => {
      setIsAnimatingPool(false);
    }, 2400);
  };

  // Dinamik SVG koordinatları hesaplama (3-Bant için)
  // Masa boyutları: 700x380, Oyun alanı: x: 45 to 655 (genişlik 610), y: 45 to 335 (yükseklik 290)
  // Departure 50 (sağ alt köşe ~ x:540, y:330)
  // AimTarget 30 (üst bant ~ x:350, y:50)
  // 2nd Rail (sol kısa bant ~ x:50, y:190)
  // 3rd Rail (alt uzun bant ~ x:260, y:330)
  // Arrival Carom Ball (~ x:380, y:180)
  const getAimX = (aim) => {
    // Üst bant elmasları: 50 -> x:120, 40 -> x:220, 30 -> x:330, 20 -> x:440, 10 -> x:550
    const ratio = (50 - aim) / 40;
    return 140 + ratio * 410;
  };

  const getDepX = (dep) => {
    // Alt bant elmasları: 50 -> x:550, 40 -> x:450, 30 -> x:350
    const ratio = (dep - 30) / 30;
    return 350 + ratio * 200;
  };

  const depX = getDepX(departure);
  const depY = 328;
  const aimX = getAimX(aimTarget);
  const aimY = 52;
  const rail2X = 52;
  const rail2Y = 160 + (arrival - 20) * 3;
  const rail3X = 180 + arrival * 5;
  const rail3Y = 328;
  const caromX = rail3X + 110;
  const caromY = 190;

  const pathD = `M ${depX} ${depY} L ${aimX} ${aimY} L ${rail2X} ${rail2Y} L ${rail3X} ${rail3Y} L ${caromX} ${caromY}`;

  const cue = cueMotion(cuePaths[spinType]);

  const spinDescriptions = {
    stop: {
      title: "Stop Shot (Merkez Vuruş)",
      falso: "Tam Merkez (Saat 12 yönü hafif alt)",
      reaction: "Beyaz top hedef topla çarpışma anında anında donup kalır.",
      tactics: "Düz hatlı vuruşlarda bir sonraki top hemen yanındaysa pozisyonu korumak için kullanılır.",
      ballOffset: { x: 0, y: 0 }
    },
    follow: {
      title: "Follow Shot (Takip / Üst Falso)",
      falso: "Üst Merkez (Saat 12 yönü +2 kat)",
      reaction: "Hedef top cebe girdikten sonra beyaz top öne doğru yuvarlanmaya devam eder.",
      tactics: "Masa boyu ilerlemek ve diğer köşedeki toplara yaklaşmak için idealdir.",
      ballOffset: { x: 0, y: -24 }
    },
    draw: {
      title: "Draw Shot (Çekme / Alt Falso)",
      falso: "Alt Merkez (Saat 6 yönü -2 kat)",
      reaction: "Hedef topla temas anında geri dönüş kramponu devreye girer ve beyaz top geriye kaçar.",
      tactics: "Arkada kalan toplara pozisyon almak veya beyaz topun cebe düşmesini engellemek için.",
      ballOffset: { x: 0, y: 24 }
    },
    left: {
      title: "Left English (Sol Falso)",
      falso: "Sol Yan (Saat 9 yönü)",
      reaction: "Banta çarptığında normalden çok daha geniş açıyla sola doğru ivmelenir.",
      tactics: "Banttan dönüş açısını genişletip kilitli topların etrafından dolaşmak için kullanılır.",
      ballOffset: { x: -24, y: 0 }
    },
    right: {
      title: "Right English (Sağ Falso)",
      falso: "Sağ Yan (Saat 3 yönü)",
      reaction: "Banta temas ettiğinde sağa doğru keskin bir açıyla fırlar.",
      tactics: "Bant kenarındaki topları sıyırmak ve sağ koridoru açmak için tercih edilir.",
      ballOffset: { x: 24, y: 0 }
    }
  };

  return (
    <section id="simulator" className="section">
      <div className="wrap">
        <div className="section-head text-center">
          <div className="inline-badge">
            <Sparkles size={14} />
            <span>İnteraktif Bilardo Laboratuvarı</span>
          </div>
          <h2 className="section-title">
            Vuruş ve Açı <span className="text-gold">Simülatörü</span>
          </h2>
          <p className="section-desc">
            Bilardo bir tahmin oyunu değil, kusursuz bir açı bilimidir. 
            Aşağıdaki simülatörle 3-Bant Diamond sistemini test edin veya Amerikan bilardoda falsonun beyaz topa etkisini canlı izleyin.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="sim-tabs-container">
          <button
            className={`sim-tab-btn ${activeTab === "ucbant" ? "active" : ""}`}
            onClick={() => setActiveTab("ucbant")}
          >
            <span className="tab-icon">🔴🟡⚪</span>
            <span>3-Bant "Diamond (Elmas)" Sistemi</span>
          </button>
          <button
            className={`sim-tab-btn ${activeTab === "amerikan" ? "active" : ""}`}
            onClick={() => setActiveTab("amerikan")}
          >
            <span className="tab-icon">🎱⚪</span>
            <span>Amerikan Pool: Falso & Beyaz Top Tepkisi</span>
          </button>
        </div>

        {/* TAB 1: 3-BANT DIAMOND SIMULATOR */}
        {activeTab === "ucbant" && (
          <div className="sim-box glass-panel">
            <div className="sim-controls-grid">
              <div className="control-group">
                <label>
                  <span>1. Çıkış Elması (Departure):</span>
                  <strong className="ctrl-value text-emerald">{departure}</strong>
                </label>
                <div className="btn-group-chips">
                  {[50, 45, 40, 35].map((val) => (
                    <button
                      key={val}
                      className={`chip-btn ${departure === val ? "selected" : ""}`}
                      onClick={() => setDeparture(val)}
                      disabled={isAnimating3C}
                    >
                      {val}
                    </button>
                  ))}
                </div>
              </div>

              <div className="control-group">
                <label>
                  <span>2. Hedef 3. Bant (Arrival):</span>
                  <strong className="ctrl-value text-gold">{arrival}</strong>
                </label>
                <div className="btn-group-chips">
                  {[30, 20, 10].map((val) => (
                    <button
                      key={val}
                      className={`chip-btn ${arrival === val ? "selected" : ""}`}
                      onClick={() => setArrival(val)}
                      disabled={isAnimating3C}
                    >
                      {val}
                    </button>
                  ))}
                </div>
              </div>

              <div className="formula-summary-card">
                <div className="formula-label">Diamond Formülü</div>
                <div className="formula-math">
                  <span className="f-part">{departure}</span> - <span className="f-part">{arrival}</span> = <span className="f-result">{aimTarget}</span>
                </div>
                <div className="formula-sub">
                  Hedef: Üst Bant <strong>{aimTarget}. Elması</strong>
                </div>
              </div>

              <div className="control-action">
                <button
                  className="btn-sim-action"
                  onClick={trigger3CushionShot}
                  disabled={isAnimating3C}
                >
                  <Play size={18} fill="#000" />
                  <span>{isAnimating3C ? "Vuruş Gerçekleşiyor..." : "Vuruşu Simüle Et"}</span>
                </button>
              </div>
            </div>

            {/* SVG Billiard Table */}
            <div className="table-canvas-wrap">
              <svg
                viewBox="0 0 700 380"
                className="svg-billiard-table"
                role="img"
                aria-label="3 Bant Diamond Sistemi Vuruş Simülasyon Masası"
              >
                <defs>
                  {/* Ahşap Bant Gradient */}
                  <linearGradient id="railWood" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3d1d12" />
                    <stop offset="50%" stopColor="#2a120a" />
                    <stop offset="100%" stopColor="#1a0b06" />
                  </linearGradient>

                  {/* Isıtmalı Simonis Çuha Gradient */}
                  <radialGradient id="feltGrad" cx="50%" cy="50%" r="60%">
                    <stop offset="0%" stopColor="#1b6343" />
                    <stop offset="80%" stopColor="#0f452e" />
                    <stop offset="100%" stopColor="#0a3321" />
                  </radialGradient>

                  {/* Top Gölgeleri */}
                  <filter id="ballShadow" x="-20%" y="-20%" width="150%" height="150%">
                    <feDropShadow dx="3" dy="5" stdDeviation="3" floodColor="#000" floodOpacity="0.5" />
                  </filter>
                </defs>

                {/* Masa Çerçevesi (Masif Ahşap) */}
                <rect x="10" y="10" width="680" height="360" rx="22" fill="url(#railWood)" stroke="#522b1c" strokeWidth="4" />
                
                {/* Altın Köşe Plakaları */}
                <circle cx="22" cy="22" r="6" fill="#d4af37" />
                <circle cx="678" cy="22" r="6" fill="#d4af37" />
                <circle cx="22" cy="358" r="6" fill="#d4af37" />
                <circle cx="678" cy="358" r="6" fill="#d4af37" />

                {/* Oyun Alanı Çuhası (Yeşil Felt) */}
                <rect x="46" y="46" width="608" height="288" rx="4" fill="url(#feltGrad)" />
                <rect x="46" y="46" width="608" height="288" rx="4" fill="none" stroke="#062215" strokeWidth="6" />

                {/* Üst ve Alt Elmaslar (Diamonds) */}
                {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                  <g key={"dia-tb-" + i}>
                    <polygon
                      points={`${46 + i * 76},26 ${46 + i * 76 - 4},30 ${46 + i * 76},34 ${46 + i * 76 + 4},30`}
                      fill="#fef08a"
                      opacity="0.9"
                    />
                    <polygon
                      points={`${46 + i * 76},346 ${46 + i * 76 - 4},350 ${46 + i * 76},354 ${46 + i * 76 + 4},350`}
                      fill="#fef08a"
                      opacity="0.9"
                    />
                  </g>
                ))}

                {/* Yan Elmaslar */}
                {[1, 2, 3].map((i) => (
                  <g key={"dia-lr-" + i}>
                    <polygon
                      points={`26,${46 + i * 72} 30,${46 + i * 72 - 4} 34,${46 + i * 72} 30,${46 + i * 72 + 4}`}
                      fill="#fef08a"
                      opacity="0.9"
                    />
                    <polygon
                      points={`666,${46 + i * 72} 670,${46 + i * 72 - 4} 674,${46 + i * 72} 670,${46 + i * 72 + 4}`}
                      fill="#fef08a"
                      opacity="0.9"
                    />
                  </g>
                ))}

                {/* Hedef Gösterge Kılavuzu (1. Bant Hedef Çizgisi) */}
                <circle cx={aimX} cy={aimY} r="8" fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3 3" />
                <text x={aimX} y={aimY - 14} fill="#fef08a" fontSize="12" fontWeight="bold" textAnchor="middle">
                  1. Bant ({aimTarget})
                </text>

                {/* 3 Bant Yörüngesi (Lazer Hattı) */}
                {isAnimating3C ? (
                  <path key={"laser-" + shot3C} d={pathD} pathLength={1} fill="none" stroke="#10b981" strokeWidth="2.5" className="laser-path-animated" />
                ) : (
                  <path d={pathD} fill="none" stroke="#10b981" strokeWidth="2.5" strokeDasharray="6 5" opacity="0.85" />
                )}

                {/* Hedef Karambol Topları (Sarı ve Kırmızı) */}
                <g filter="url(#ballShadow)">
                  {/* Kırmızı Top */}
                  <circle cx={caromX} cy={caromY} r="12" fill="#dc2626" />
                  <circle cx={caromX - 3} cy={caromY - 3} r="3" fill="#fca5a5" opacity="0.7" />

                  {/* Sarı Top */}
                  <circle cx={caromX + 32} cy={caromY - 18} r="12" fill="#eab308" />
                  <circle cx={caromX + 29} cy={caromY - 21} r="3" fill="#fef08a" opacity="0.8" />
                </g>

                {/* Beyaz Vuruş Topu (Animasyonlu veya Sabit) */}
                {isAnimating3C ? (
                  <g key={"wb-" + shot3C} filter="url(#ballShadow)">
                    <animateMotion ref={motion3CRef} begin="indefinite" dur="1.8s" fill="freeze" path={pathD} />
                    <circle cx="0" cy="0" r="12" fill="#f8fafc" />
                    <circle cx="-4" cy="-3" r="2" fill="#dc2626" />
                    <circle cx="4" cy="2" r="2" fill="#dc2626" />
                  </g>
                ) : (
                  <g filter="url(#ballShadow)" transform={`translate(${depX} ${depY})`}>
                    <circle cx="0" cy="0" r="12" fill="#f8fafc" />
                    <circle cx="-4" cy="-3" r="2" fill="#dc2626" />
                    <circle cx="4" cy="2" r="2" fill="#dc2626" />
                  </g>
                )}

                {/* Başarı Kutlaması (Carom Scored) */}
                {caromScored && (
                  <g className="score-popup">
                    <rect x={caromX - 40} y={caromY - 60} width="110" height="30" rx="15" fill="#10b981" />
                    <text x={caromX + 15} y={caromY - 40} fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">
                      🎯 SAYI! (KARAMBOL)
                    </text>
                  </g>
                )}
              </svg>
            </div>

            {/* Eğitmen Açıklama Notu */}
            <div className="coach-sim-note">
              <div className="note-icon">
                <Compass size={20} className="text-gold" />
              </div>
              <div className="note-text">
                <strong>Hakan Hoca'nın Taktik Analizi:</strong> Çıkış noktanız <strong>{departure}</strong> ve varış noktanız <strong>{arrival}</strong> olduğunda; saat 1.30 yönünde tam 2 falso ve 2. vites (orta tempo) hızla üst banttaki <strong>{aimTarget} elmasına</strong> vurduğunuzda, beyaz top 3. bantta tam <strong>{arrival}</strong> noktasına iner ve karambol sayısı kesinleşir.
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: AMERİKAN POOL SPİN LAB */}
        {activeTab === "amerikan" && (
          <div className="sim-box glass-panel">
            <div className="pool-spin-grid">
              {/* Sol: Beyaz Top Falso Seçici Kadranı */}
              <div className="spin-selector-col">
                <h4 className="spin-col-title">Istaka Ucu Vuruş Noktası</h4>
                <p className="spin-col-sub">Beyaz topun neresine vurmak istediğinizi seçin:</p>

                <div className="cue-ball-dial">
                  <div className="dial-circle">
                    <span className="dial-crosshair horizontal"></span>
                    <span className="dial-crosshair vertical"></span>

                    {/* Vuruş Noktaları Butonları */}
                    <button
                      className={`dial-hit-point top ${spinType === "follow" ? "active" : ""}`}
                      onClick={() => setSpinType("follow")} disabled={isAnimatingPool}
                      title="Follow (Takip / Üst Vuruş)"
                    >
                      ▲
                    </button>
                    <button
                      className={`dial-hit-point center ${spinType === "stop" ? "active" : ""}`}
                      onClick={() => setSpinType("stop")} disabled={isAnimatingPool}
                      title="Stop Shot (Merkez Vuruş)"
                    >
                      ●
                    </button>
                    <button
                      className={`dial-hit-point bottom ${spinType === "draw" ? "active" : ""}`}
                      onClick={() => setSpinType("draw")} disabled={isAnimatingPool}
                      title="Draw (Çekme / Alt Vuruş)"
                    >
                      ▼
                    </button>
                    <button
                      className={`dial-hit-point left ${spinType === "left" ? "active" : ""}`}
                      onClick={() => setSpinType("left")} disabled={isAnimatingPool}
                      title="Sol Falso (Left English)"
                    >
                      ◄
                    </button>
                    <button
                      className={`dial-hit-point right ${spinType === "right" ? "active" : ""}`}
                      onClick={() => setSpinType("right")} disabled={isAnimatingPool}
                      title="Sağ Falso (Right English)"
                    >
                      ►
                    </button>

                    {/* Görsel Istaka Ucu Tebeşir İzi */}
                    <div
                      className="chalk-impact-marker"
                      style={{
                        transform: `translate(${spinDescriptions[spinType].ballOffset.x}px, ${spinDescriptions[spinType].ballOffset.y}px)`
                      }}
                    ></div>
                  </div>
                </div>

                <div className="spin-quick-chips">
                  {[
                    { key: "stop", label: "Stop Shot" },
                    { key: "follow", label: "Follow (Takip)" },
                    { key: "draw", label: "Draw (Çekme)" },
                    { key: "left", label: "Sol Falso" },
                    { key: "right", label: "Sağ Falso" }
                  ].map((s) => (
                    <button
                      key={s.key}
                      className={`chip-btn ${spinType === s.key ? "selected" : ""}`}
                      onClick={() => setSpinType(s.key)}
                      disabled={isAnimatingPool}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sağ: Bilgi & Görsel Masa Reaksiyonu */}
              <div className="spin-info-col">
                <div className="spin-card-header">
                  <div>
                    <span className="spin-badge-tag">{spinDescriptions[spinType].falso}</span>
                    <h3 className="spin-card-title">{spinDescriptions[spinType].title}</h3>
                  </div>
                  <button
                    className="btn-sim-action"
                    onClick={triggerPoolShot}
                    disabled={isAnimatingPool}
                  >
                    <Play size={16} fill="#000" />
                    <span>{isAnimatingPool ? "Vuruluyor..." : "Vuruşu İzle"}</span>
                  </button>
                </div>

                <div className="spin-detail-box">
                  <div className="detail-row">
                    <span className="d-label">Topun Tepkisi:</span>
                    <span className="d-value text-emerald">{spinDescriptions[spinType].reaction}</span>
                  </div>
                  <div className="detail-row">
                    <span className="d-label">Taktik Amaç:</span>
                    <span className="d-value">{spinDescriptions[spinType].tactics}</span>
                  </div>
                </div>

                {/* Mini Amerikan Masası Animasyonu */}
                <div className="mini-pool-table">
                  <svg viewBox="0 0 500 220" className="svg-mini-pool">
                    {/* Zemin */}
                    <rect x="10" y="10" width="480" height="200" rx="14" fill="#134e35" stroke="#24140d" strokeWidth="12" />
                    
                    {/* Köşe Cepleri */}
                    <circle cx="20" cy="20" r="14" fill="#000" />
                    <circle cx="480" cy="20" r="14" fill="#000" />
                    <circle cx="20" cy="200" r="14" fill="#000" />
                    <circle cx="480" cy="200" r="14" fill="#000" />
                    <circle cx="250" cy="16" r="11" fill="#000" />
                    <circle cx="250" cy="204" r="11" fill="#000" />

                    {/* Vuruş Çizgisi */}
                    <line x1="120" y1="110" x2="330" y2="110" stroke="rgba(255,255,255,0.4)" strokeDasharray="4 4" strokeWidth="2" />
                    
                    {/* Hedef Cebe Gidiş Hattı */}
                    <line x1="330" y1="110" x2="475" y2="25" stroke="#f59e0b" strokeDasharray="3 3" strokeWidth="2" />

                    {/* Siyah 8 Numaralı Top (Hedef) */}
                    {/* Beyaz topun izleyeceği yol */}
                    <path d={cue.d} fill="none" stroke="#10b981" strokeWidth="1.5" strokeDasharray="3 4" opacity="0.7" />

                    <g key={"ob-" + shotPool} transform="translate(330 110)">
                      {isAnimatingPool && (
                        <>
                          <animateMotion id={"obMove" + shotPool} begin={`cueMove${shotPool}.begin+${(1.2 * cue.contact).toFixed(2)}s`} dur="0.6s" fill="freeze" path="M0 0 L144 -84" />
                          <animate attributeName="opacity" begin={`obMove${shotPool}.end`} dur="0.15s" from="1" to="0" fill="freeze" />
                        </>
                      )}
                      <circle cx="0" cy="0" r="12" fill="#0f172a" stroke="#fff" strokeWidth="0.5" />
                      <circle cx="0" cy="0" r="5" fill="#ffffff" />
                      <text x="0" y="3" fill="#000" fontSize="8" fontWeight="bold" textAnchor="middle">8</text>
                    </g>

                    {/* Beyaz Top (Vuruş ve Tepki) */}
                    <g key={"cb-" + shotPool} transform={isAnimatingPool ? undefined : `translate(${CUE_START[0]} ${CUE_START[1]})`}>
                      {isAnimatingPool && (
                        <animateMotion
                          ref={cueMotionRef}
                          id={"cueMove" + shotPool}
                          begin="indefinite"
                          dur="1.2s"
                          fill="freeze"
                          path={cue.d}
                          calcMode="linear"
                          keyPoints={`0;${cue.contact.toFixed(3)};1`}
                          keyTimes="0;0.5;1"
                        />
                      )}
                      <circle cx="0" cy="0" r="12" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" />
                      <circle cx="0" cy="0" r="2.5" fill="#dc2626" />
                    </g>

                    {/* Cep Kutlama Yazısı */}
                    {poolPotted && (
                      <g className="score-popup">
                        <text x="440" y="60" fill="#fef08a" fontSize="11" fontWeight="bold" textAnchor="middle">
                          🎱 CEPTE!
                        </text>
                      </g>
                    )}
                  </svg>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
