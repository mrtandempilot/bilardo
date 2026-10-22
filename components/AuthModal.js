"use client";
import { useEffect, useState } from "react";
import { X, Mail, Lock, LogOut, Star, CalendarDays, CheckCircle2, LayoutDashboard } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/components/AuthProvider";
import { pickPackage } from "@/lib/pick";
import { subscriptions, subLabel } from "@/lib/data";

const HATALAR = {
  gecersiz_eposta: "Geçerli bir e-posta adresi gir.",
  kisa_sifre: "Şifre en az 6 karakter olmalı.",
  eposta_kayitli: "Bu e-posta zaten kayıtlı. Giriş yap sekmesini kullan.",
  "Invalid login credentials": "E-posta ya da şifre hatalı.",
  "Email not confirmed": "E-posta adresin henüz onaylanmamış.",
};
const cevir = (msg = "") => {
  for (const k of Object.keys(HATALAR)) if (msg.includes(k)) return HATALAR[k];
  return "Bir sorun oluştu, tekrar dene.";
};

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"/>
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z"/>
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z"/>
    </svg>
  );
}

function Hesap() {
  const { user, abonelik, aktifAbone, isAdmin, signOut, closeModal } = useAuth();
  const ad = user.user_metadata?.full_name || user.user_metadata?.name;
  const tarih = (d) => new Date(d + "T00:00:00").toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });
  return (
    <div className="auth-account">
      <span className="eyebrow">Hesabım</span>
      <h3>{ad || "Hoş geldin"}</h3>
      <p className="auth-email"><Mail size={15} /> {user.email}</p>

      <div className={`auth-sub ${aktifAbone ? "on" : ""}`}>
        {aktifAbone ? (
          <>
            <p className="auth-sub-title"><CheckCircle2 size={18} /> Aboneliğin aktif</p>
            <p><Star size={15} /> {abonelik.paket}</p>
            <p><CalendarDays size={15} /> Bitiş: {tarih(abonelik.bitis)}</p>
          </>
        ) : abonelik ? (
          <>
            <p className="auth-sub-title">Aboneliğin sona erdi</p>
            <p><CalendarDays size={15} /> Bitiş: {tarih(abonelik.bitis)}</p>
          </>
        ) : (
          <>
            <p className="auth-sub-title">Aktif aboneliğin yok</p>
            <p>Abone olunca video arşivinin tamamı bu hesapla açılır.</p>
          </>
        )}
      </div>

      <div className="auth-actions">
        {isAdmin && <a href="/yonetim" className="btn btn-ghost btn-block"><LayoutDashboard size={16} /> Yönetim paneli</a>}
        {aktifAbone ? (
          <a href="#online" className="btn btn-gold btn-block" onClick={closeModal}>Video derslere git</a>
        ) : (
          <button className="btn btn-gold btn-block" onClick={() => { closeModal(); pickPackage(subLabel(subscriptions[0])); }}>
            {abonelik ? "Aboneliği yenile" : "Abone ol"}
          </button>
        )}
        <button className="btn btn-ghost btn-block" onClick={signOut}><LogOut size={16} /> Çıkış yap</button>
      </div>
      <p className="auth-fine">Ödemeni yaptıktan sonra abonelik bu e-posta adresine tanımlanır.</p>
    </div>
  );
}

export default function AuthModal({ mode, setMode }) {
  const { user, closeModal } = useAuth();
  const [email, setEmail] = useState("");
  const [sifre, setSifre] = useState("");
  const [state, setState] = useState({ busy: false, err: "", info: "" });

  const kayit = mode === "kayit";
  const showAccount = mode === "hesap" || !!user;

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && closeModal();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [closeModal]);

  useEffect(() => setState({ busy: false, err: "", info: "" }), [mode]);

  async function submit(e) {
    e.preventDefault();
    setState({ busy: true, err: "", info: "" });
    const em = email.trim().toLowerCase();
    try {
      if (kayit) {
        const { error } = await supabase.rpc("kayit_ol", { p_email: em, p_password: sifre });
        if (error) throw error;
      }
      const { error } = await supabase.auth.signInWithPassword({ email: em, password: sifre });
      if (error) throw error;
      setState({ busy: false, err: "", info: "" });
      setMode("hesap");
    } catch (err) {
      setState({ busy: false, err: cevir(err.message), info: "" });
    }
  }

  async function google() {
    setState({ busy: true, err: "", info: "" });
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: window.location.origin + window.location.pathname },
    });
    if (error) setState({ busy: false, err: cevir(error.message), info: "" });
  }

  async function sifremiUnuttum() {
    const em = email.trim().toLowerCase();
    if (!em) return setState({ busy: false, err: "Önce e-posta adresini yaz.", info: "" });
    setState({ busy: true, err: "", info: "" });
    const { error } = await supabase.auth.signInWithOtp({
      email: em,
      options: { shouldCreateUser: false, emailRedirectTo: window.location.origin },
    });
    setState(error
      ? { busy: false, err: "Bağlantı gönderilemedi. E-postanı kontrol et ya da Google ile gir.", info: "" }
      : { busy: false, err: "", info: "Giriş bağlantısı e-postana gönderildi. Gelen kutunu kontrol et." });
  }

  return (
    <div className="auth-overlay" onMouseDown={(e) => e.target === e.currentTarget && closeModal()}>
      <div className="auth-modal glass-panel" role="dialog" aria-modal="true" aria-label={showAccount ? "Hesabım" : kayit ? "Üye ol" : "Giriş yap"}>
        <button className="auth-close" onClick={closeModal} aria-label="Kapat"><X size={20} /></button>

        {showAccount ? <Hesap /> : (
          <>
            <div className="auth-brand">
              <div className="logo-ball-icon"><span className="logo-cue-ring"></span><span className="logo-dot"></span></div>
              <div>
                <h3>{kayit ? "Üye ol" : "Tekrar hoş geldin"}</h3>
                <p>{kayit ? "Hesap aç, aboneliğin ve video derslerin tek yerde olsun." : "Hesabına gir, video derslerine devam et."}</p>
              </div>
            </div>

            <div className="auth-tabs" role="tablist">
              <button role="tab" aria-selected={!kayit} className={!kayit ? "active" : ""} onClick={() => setMode("giris")}>Giriş yap</button>
              <button role="tab" aria-selected={kayit} className={kayit ? "active" : ""} onClick={() => setMode("kayit")}>Üye ol</button>
            </div>

            <button className="btn btn-google btn-block" onClick={google} disabled={state.busy}>
              <GoogleIcon /> Google ile devam et
            </button>
            <div className="auth-or"><span>ya da e-posta ile</span></div>

            <form className="auth-form" onSubmit={submit}>
              <label>E-posta
                <span className="auth-input"><Mail size={16} />
                  <input type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="ornek@mail.com" />
                </span>
              </label>
              <label>Şifre
                <span className="auth-input"><Lock size={16} />
                  <input type="password" required minLength={6} autoComplete={kayit ? "new-password" : "current-password"} value={sifre} onChange={(e) => setSifre(e.target.value)} placeholder={kayit ? "En az 6 karakter" : "••••••"} />
                </span>
              </label>
              {!kayit && <button type="button" className="auth-link" onClick={sifremiUnuttum} disabled={state.busy}>Şifremi unuttum, e-postama giriş linki gönder</button>}
              <button className="btn btn-gold btn-block" disabled={state.busy}>
                {state.busy ? "Bekle…" : kayit ? "Hesap oluştur" : "Giriş yap"}
              </button>
              {state.err && <p className="err" role="alert">{state.err}</p>}
              {state.info && <p className="auth-info" role="status">{state.info}</p>}
            </form>
            <p className="auth-fine">
              {kayit ? <>Zaten üye misin? <button className="auth-link" onClick={() => setMode("giris")}>Giriş yap</button></>
                     : <>Hesabın yok mu? <button className="auth-link" onClick={() => setMode("kayit")}>Üye ol</button></>}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
