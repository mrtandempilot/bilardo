"use client";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import AuthModal from "@/components/AuthModal";

const AuthCtx = createContext(null);
export const useAuth = () => useContext(AuthCtx);

const today = () => new Date().toISOString().slice(0, 10);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [abonelik, setAbonelik] = useState(null); // { paket, bitis } | null
  const [ready, setReady] = useState(false);
  const [modal, setModal] = useState(null); // null | "giris" | "kayit" | "hesap"

  const loadAbonelik = useCallback(async (u) => {
    if (!u?.email) return setAbonelik(null);
    const { data } = await supabase.from("aboneler").select("paket, bitis").eq("email", u.email.toLowerCase()).maybeSingle();
    setAbonelik(data || null);
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      const u = data.session?.user ?? null;
      setUser(u);
      loadAbonelik(u).finally(() => setReady(true));
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      const u = session?.user ?? null;
      setUser(u);
      loadAbonelik(u);
    });
    return () => sub.subscription.unsubscribe();
  }, [loadAbonelik]);

  // /#giris veya /#hesabim ile gelinirse pencereyi aç
  useEffect(() => {
    if (!ready) return;
    const h = window.location.hash;
    if (h === "#giris" || h === "#hesabim") {
      setModal(h === "#hesabim" && user ? "hesap" : "giris");
      history.replaceState(null, "", window.location.pathname);
    }
  }, [ready, user]);

  const aktifAbone = !!abonelik && abonelik.bitis >= today();

  const value = {
    user, abonelik, aktifAbone, ready,
    openAuth: (mode = "giris") => setModal(mode),
    openAccount: () => setModal("hesap"),
    closeModal: () => setModal(null),
    signOut: async () => { await supabase.auth.signOut(); setModal(null); },
  };

  return (
    <AuthCtx.Provider value={value}>
      {children}
      {modal && <AuthModal mode={modal} setMode={setModal} />}
    </AuthCtx.Provider>
  );
}
