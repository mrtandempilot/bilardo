"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  LayoutDashboard, Inbox, Users, Crown, Phone, MessageCircle, Trash2, RefreshCw,
  CalendarPlus, ArrowLeft, LogOut, Search, StickyNote, TrendingUp, Clock,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/components/AuthProvider";
import { subscriptions, subPrice, tl } from "@/lib/data";

const DURUMLAR = {
  yeni: { label: "Yeni", cls: "st-yeni" },
  arandi: { label: "Arandı", cls: "st-arandi" },
  onaylandi: { label: "Onaylandı", cls: "st-onay" },
  iptal: { label: "İptal", cls: "st-iptal" },
};
const PAKETLER = subscriptions.map((s) => s.name);

const bugun = () => new Date().toISOString().slice(0, 10);
const ayEkle = (iso, n = 1) => {
  const d = new Date((iso || bugun()) + "T00:00:00");
  d.setMonth(d.getMonth() + n);
  return d.toISOString().slice(0, 10);
};
const gunFarki = (iso) => Math.round((new Date(iso + "T00:00:00") - new Date(bugun() + "T00:00:00")) / 864e5);
const tarih = (v, saat) =>
  v ? new Date(v).toLocaleString("tr-TR", saat ? { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" } : { day: "numeric", month: "short", year: "numeric" }) : "—";
const waNo = (tel) => {
  let d = String(tel).replace(/\D/g, "");
  if (d.startsWith("0")) d = "9" + d;
  else if (d.length === 10) d = "90" + d;
  return d;
};
const paketFiyat = (ad) => {
  const s = subscriptions.find((x) => x.name === ad);
  return s ? subPrice(s) : 0;
};

/* ---------------- Sekmeler ---------------- */

function Ozet({ talepler, aboneler, uyeler, git }) {
  const ayBasi = bugun().slice(0, 8) + "01";
  const yeni = talepler.filter((t) => t.durum === "yeni").length;
  const buAy = talepler.filter((t) => t.created_at.slice(0, 10) >= ayBasi).length;
  const aktif = aboneler.filter((a) => a.bitis >= bugun());
  const aylikGelir = aktif.reduce((t, a) => t + paketFiyat(a.paket), 0);
  const yaklasan = aktif.filter((a) => gunFarki(a.bitis) <= 7).sort((a, b) => a.bitis.localeCompare(b.bitis));

  const kartlar = [
    { icon: Inbox, deger: yeni, etiket: "Yeni talep", alt: "aranmayı bekliyor", vurgu: yeni > 0, tab: "talepler" },
    { icon: TrendingUp, deger: buAy, etiket: "Bu ay gelen talep", alt: "tüm durumlar", tab: "talepler" },
    { icon: Crown, deger: aktif.length, etiket: "Aktif abone", alt: aylikGelir ? `≈ ${tl(aylikGelir)} / ay` : "henüz yok", tab: "aboneler" },
    { icon: Users, deger: uyeler.length, etiket: "Kayıtlı üye", alt: "sitede hesap açan", tab: "uyeler" },
  ];

  return (
    <div className="yt-stack">
      <div className="yt-stats">
        {kartlar.map((k) => (
          <button key={k.etiket} className={`yt-stat ${k.vurgu ? "hot" : ""}`} onClick={() => git(k.tab)}>
            <span className="yt-stat-icon"><k.icon size={20} /></span>
            <span className="yt-stat-val">{k.deger}</span>
            <span className="yt-stat-lbl">{k.etiket}</span>
            <span className="yt-stat-sub">{k.alt}</span>
          </button>
        ))}
      </div>

      <div className="yt-two">
        <section className="yt-card">
          <header><h3>Son talepler</h3><button className="yt-link" onClick={() => git("talepler")}>Tümü</button></header>
          {talepler.length === 0 ? <p className="yt-empty">Henüz talep yok. Sitedeki formdan gelenler burada görünür.</p> : (
            <ul className="yt-mini">
              {talepler.slice(0, 5).map((t) => (
                <li key={t.id}>
                  <div><strong>{t.ad}</strong><span>{t.paket}</span></div>
                  <span className={`yt-badge ${DURUMLAR[t.durum].cls}`}>{DURUMLAR[t.durum].label}</span>
                </li>
              ))}
            </ul>
          )}
        </section>
        <section className="yt-card">
          <header><h3>7 gün içinde biten abonelikler</h3><button className="yt-link" onClick={() => git("aboneler")}>Tümü</button></header>
          {yaklasan.length === 0 ? <p className="yt-empty">Yakında biten abonelik yok.</p> : (
            <ul className="yt-mini">
              {yaklasan.map((a) => (
                <li key={a.email}>
                  <div><strong>{a.ad || a.email}</strong><span>{a.paket}</span></div>
                  <span className="yt-badge st-arandi">{gunFarki(a.bitis) === 0 ? "Bugün" : `${gunFarki(a.bitis)} gün`}</span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}

function Talepler({ talepler, yenile, setHata }) {
  const [filtre, setFiltre] = useState("hepsi");
  const [ara, setAra] = useState("");
  const liste = talepler.filter((t) =>
    (filtre === "hepsi" || t.durum === filtre) &&
    (!ara || `${t.ad} ${t.telefon} ${t.paket}`.toLocaleLowerCase("tr").includes(ara.toLocaleLowerCase("tr")))
  );

  async function durumDegis(id, durum) {
    const { error } = await supabase.from("rezervasyonlar").update({ durum }).eq("id", id);
    if (error) setHata("Durum güncellenemedi."); else yenile();
  }
  async function sil(t) {
    if (!window.confirm(`${t.ad} adlı kişinin talebi silinsin mi?`)) return;
    const { error } = await supabase.from("rezervasyonlar").delete().eq("id", t.id);
    if (error) setHata("Silinemedi."); else yenile();
  }

  return (
    <div className="yt-stack">
      <div className="yt-toolbar">
        <div className="yt-chips">
          {["hepsi", ...Object.keys(DURUMLAR)].map((k) => (
            <button key={k} className={filtre === k ? "on" : ""} onClick={() => setFiltre(k)}>
              {k === "hepsi" ? "Hepsi" : DURUMLAR[k].label}
              <span>{k === "hepsi" ? talepler.length : talepler.filter((t) => t.durum === k).length}</span>
            </button>
          ))}
        </div>
        <label className="yt-search"><Search size={16} /><input placeholder="İsim, telefon, paket…" value={ara} onChange={(e) => setAra(e.target.value)} /></label>
      </div>

      {liste.length === 0 ? <p className="yt-empty yt-card">Bu filtrede talep yok.</p> : (
        <ul className="yt-list">
          {liste.map((t) => (
            <li key={t.id} className={`yt-row ${t.durum === "yeni" ? "is-new" : ""}`}>
              <div className="yt-row-main">
                <div className="yt-row-top">
                  <strong>{t.ad}</strong>
                  <span className="yt-muted"><Clock size={13} /> {tarih(t.created_at, true)}</span>
                </div>
                <p className="yt-paket">{t.paket}</p>
                {t.not_metni && <p className="yt-note"><StickyNote size={14} /> {t.not_metni}</p>}
              </div>
              <div className="yt-row-actions">
                <a className="yt-icon-btn" href={`tel:${t.telefon.replace(/[^0-9+]/g, "")}`} title="Ara"><Phone size={16} /> <span>{t.telefon}</span></a>
                <a className="yt-icon-btn wa" target="_blank" rel="noopener noreferrer" title="WhatsApp"
                   href={`https://wa.me/${waNo(t.telefon)}?text=${encodeURIComponent(`Merhaba ${t.ad.split(" ")[0]}, Fethiye Bilardo Akademisi'nden yazıyorum. "${t.paket}" talebin için uygun gün ve saatleri konuşalım mı?`)}`}>
                  <MessageCircle size={16} />
                </a>
                <select className={`yt-select ${DURUMLAR[t.durum].cls}`} value={t.durum} onChange={(e) => durumDegis(t.id, e.target.value)} aria-label="Durum">
                  {Object.entries(DURUMLAR).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
                </select>
                <button className="yt-icon-btn danger" onClick={() => sil(t)} title="Sil"><Trash2 size={16} /></button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Aboneler({ aboneler, yenile, setHata, taslak, setTaslak }) {
  const [busy, setBusy] = useState(false);

  async function kaydet(e) {
    e.preventDefault();
    setBusy(true);
    const kayit = { email: taslak.email.trim().toLowerCase(), ad: taslak.ad.trim() || null, paket: taslak.paket, bitis: taslak.bitis };
    const { error } = await supabase.from("aboneler").upsert(kayit, { onConflict: "email" });
    setBusy(false);
    if (error) return setHata("Abone kaydedilemedi: " + error.message);
    setTaslak({ email: "", ad: "", paket: PAKETLER[0], bitis: ayEkle() });
    yenile();
  }
  async function uzat(a) {
    const baz = a.bitis >= bugun() ? a.bitis : bugun();
    const { error } = await supabase.from("aboneler").update({ bitis: ayEkle(baz) }).eq("email", a.email);
    if (error) setHata("Uzatılamadı."); else yenile();
  }
  async function sil(a) {
    if (!window.confirm(`${a.email} aboneliği silinsin mi?`)) return;
    const { error } = await supabase.from("aboneler").delete().eq("email", a.email);
    if (error) setHata("Silinemedi."); else yenile();
  }

  const sirali = [...aboneler].sort((a, b) => b.bitis.localeCompare(a.bitis));

  return (
    <div className="yt-stack">
      <form className="yt-card yt-form" onSubmit={kaydet}>
        <h3><CalendarPlus size={18} /> Abone ekle / güncelle</h3>
        <p className="yt-muted">Öğrenci siteye bu e-postayla giriş yapınca video arşivi açılır. Aynı e-posta varsa güncellenir.</p>
        <div className="yt-form-grid">
          <label>E-posta<input type="email" required value={taslak.email} onChange={(e) => setTaslak({ ...taslak, email: e.target.value })} placeholder="ogrenci@mail.com" /></label>
          <label>Ad soyad<input value={taslak.ad} onChange={(e) => setTaslak({ ...taslak, ad: e.target.value })} placeholder="İsteğe bağlı" /></label>
          <label>Paket
            <select value={taslak.paket} onChange={(e) => setTaslak({ ...taslak, paket: e.target.value })}>
              {[...new Set([...PAKETLER, taslak.paket])].map((p) => <option key={p}>{p}</option>)}
            </select>
          </label>
          <label>Bitiş tarihi<input type="date" required value={taslak.bitis} onChange={(e) => setTaslak({ ...taslak, bitis: e.target.value })} /></label>
        </div>
        <button className="btn btn-gold" disabled={busy}>{busy ? "Kaydediliyor…" : "Kaydet"}</button>
      </form>

      {sirali.length === 0 ? <p className="yt-empty yt-card">Henüz abone yok.</p> : (
        <ul className="yt-list">
          {sirali.map((a) => {
            const kalan = gunFarki(a.bitis);
            const aktif = kalan >= 0;
            return (
              <li key={a.email} className="yt-row">
                <div className="yt-row-main">
                  <div className="yt-row-top">
                    <strong>{a.ad || a.email}</strong>
                    <span className={`yt-badge ${aktif ? (kalan <= 7 ? "st-arandi" : "st-onay") : "st-iptal"}`}>
                      {aktif ? (kalan === 0 ? "Bugün bitiyor" : `${kalan} gün kaldı`) : "Bitti"}
                    </span>
                  </div>
                  <p className="yt-paket">{a.paket} · bitiş {tarih(a.bitis)}</p>
                  {a.ad && <p className="yt-muted">{a.email}</p>}
                </div>
                <div className="yt-row-actions">
                  <button className="yt-icon-btn" onClick={() => uzat(a)} title="1 ay uzat"><RefreshCw size={16} /> <span>+1 ay</span></button>
                  <button className="yt-icon-btn" onClick={() => setTaslak({ email: a.email, ad: a.ad || "", paket: a.paket, bitis: a.bitis })} title="Düzenle">Düzenle</button>
                  <button className="yt-icon-btn danger" onClick={() => sil(a)} title="Sil"><Trash2 size={16} /></button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

function Uyeler({ uyeler, aboneler, aboneYap }) {
  const aboneMap = useMemo(() => Object.fromEntries(aboneler.map((a) => [a.email, a])), [aboneler]);
  return (
    <div className="yt-stack">
      {uyeler.length === 0 ? <p className="yt-empty yt-card">Henüz üye yok.</p> : (
        <ul className="yt-list">
          {uyeler.map((u) => {
            const a = aboneMap[u.email];
            const aktif = a && a.bitis >= bugun();
            return (
              <li key={u.email} className="yt-row">
                <div className="yt-row-main">
                  <div className="yt-row-top">
                    <strong>{u.ad || u.email}</strong>
                    {aktif ? <span className="yt-badge st-onay"><Crown size={12} /> Abone</span> : a ? <span className="yt-badge st-iptal">Aboneliği bitti</span> : null}
                  </div>
                  <p className="yt-muted">{u.email} · {u.saglayici === "google" ? "Google" : "E-posta"} · kayıt {tarih(u.kayit)} · son giriş {tarih(u.son_giris)}</p>
                </div>
                <div className="yt-row-actions">
                  <button className="yt-icon-btn" onClick={() => aboneYap(u, a)}><Crown size={16} /> <span>{a ? "Aboneliği düzenle" : "Abone yap"}</span></button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

/* ---------------- Sayfa ---------------- */

const SEKMELER = [
  ["ozet", "Özet", LayoutDashboard],
  ["talepler", "Talepler", Inbox],
  ["aboneler", "Aboneler", Crown],
  ["uyeler", "Üyeler", Users],
];

export default function Yonetim() {
  const { user, ready, isAdmin, openAuth, signOut } = useAuth();
  const [tab, setTab] = useState("ozet");
  const [veri, setVeri] = useState({ talepler: [], aboneler: [], uyeler: [] });
  const [yukleniyor, setYukleniyor] = useState(true);
  const [hata, setHata] = useState("");
  const [taslak, setTaslak] = useState({ email: "", ad: "", paket: PAKETLER[0], bitis: ayEkle() });

  const yenile = useCallback(async () => {
    const [t, a, u] = await Promise.all([
      supabase.from("rezervasyonlar").select("*").order("created_at", { ascending: false }),
      supabase.from("aboneler").select("*"),
      supabase.rpc("admin_uyeler"),
    ]);
    if (t.error || a.error || u.error) setHata("Veriler alınamadı. Sayfayı yenileyip tekrar dene.");
    setVeri({ talepler: t.data || [], aboneler: a.data || [], uyeler: u.data || [] });
    setYukleniyor(false);
  }, []);

  useEffect(() => { if (isAdmin) yenile(); }, [isAdmin, yenile]);
  useEffect(() => {
    if (!isAdmin) return;
    const id = setInterval(yenile, 60000);
    return () => clearInterval(id);
  }, [isAdmin, yenile]);
  useEffect(() => { if (hata) { const id = setTimeout(() => setHata(""), 5000); return () => clearTimeout(id); } }, [hata]);

  if (!ready) return <div className="yt-gate"><p>Yükleniyor…</p></div>;
  if (!user) return (
    <div className="yt-gate">
      <div className="yt-gate-card glass-panel">
        <LayoutDashboard size={28} className="text-gold" />
        <h1>Yönetim paneli</h1>
        <p>Devam etmek için yönetici hesabınla giriş yap.</p>
        <button className="btn btn-gold btn-block" onClick={() => openAuth("giris")}>Giriş yap</button>
        <a href="/" className="yt-link">Siteye dön</a>
      </div>
    </div>
  );
  if (!isAdmin) return (
    <div className="yt-gate">
      <div className="yt-gate-card glass-panel">
        <h1>Yetkin yok</h1>
        <p><strong>{user.email}</strong> yönetici olarak tanımlı değil.</p>
        <a href="/" className="btn btn-ghost btn-block">Siteye dön</a>
      </div>
    </div>
  );

  const yeniSayi = veri.talepler.filter((t) => t.durum === "yeni").length;

  return (
    <div className="yt-shell">
      <aside className="yt-side">
        <a href="/" className="yt-brand">
          <div className="logo-ball-icon"><span className="logo-cue-ring"></span><span className="logo-dot"></span></div>
          <div><strong>Fethiye Bilardo</strong><span>Yönetim</span></div>
        </a>
        <nav className="yt-nav">
          {SEKMELER.map(([k, label, Icon]) => (
            <button key={k} className={tab === k ? "on" : ""} onClick={() => setTab(k)}>
              <Icon size={18} /> <span>{label}</span>
              {k === "talepler" && yeniSayi > 0 && <em>{yeniSayi}</em>}
            </button>
          ))}
        </nav>
        <div className="yt-side-foot">
          <a href="/"><ArrowLeft size={16} /> <span>Siteye dön</span></a>
          <button onClick={signOut}><LogOut size={16} /> <span>Çıkış</span></button>
        </div>
      </aside>

      <main className="yt-main">
        <header className="yt-head">
          <div>
            <h1>{SEKMELER.find(([k]) => k === tab)[1]}</h1>
            <p className="yt-muted">{user.email}</p>
          </div>
          <button className="yt-icon-btn" onClick={() => { setYukleniyor(true); yenile(); }} title="Yenile"><RefreshCw size={16} className={yukleniyor ? "spin" : ""} /> <span>Yenile</span></button>
        </header>
        {hata && <p className="yt-error" role="alert">{hata}</p>}

        {yukleniyor && veri.talepler.length === 0 && veri.uyeler.length === 0 ? <p className="yt-empty">Yükleniyor…</p> : (
          <>
            {tab === "ozet" && <Ozet {...veri} git={setTab} />}
            {tab === "talepler" && <Talepler talepler={veri.talepler} yenile={yenile} setHata={setHata} />}
            {tab === "aboneler" && <Aboneler aboneler={veri.aboneler} yenile={yenile} setHata={setHata} taslak={taslak} setTaslak={setTaslak} />}
            {tab === "uyeler" && (
              <Uyeler uyeler={veri.uyeler} aboneler={veri.aboneler}
                aboneYap={(u, a) => { setTaslak(a ? { email: a.email, ad: a.ad || "", paket: a.paket, bitis: a.bitis } : { email: u.email, ad: u.ad || "", paket: PAKETLER[0], bitis: ayEkle() }); setTab("aboneler"); }} />
            )}
          </>
        )}
      </main>
    </div>
  );
}
