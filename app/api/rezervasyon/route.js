import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://qwyhefiduqxuhhkaogjv.supabase.co",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_8w1jhLr_G2pwMyHr1_tkKA_KrDpmwd-",
  { auth: { persistSession: false } }
);

const temiz = (v, max) => String(v ?? "").trim().slice(0, max);

// Ders talebini Supabase'deki rezervasyonlar tablosuna kaydeder; yönetim panelinde görünür.
export async function POST(req) {
  const body = await req.json().catch(() => null);
  const ad = temiz(body?.ad, 100);
  const telefon = temiz(body?.telefon, 30);
  const paket = temiz(body?.paket, 120);
  const not_metni = temiz(body?.not, 1000) || null;

  if (ad.length < 2 || telefon.replace(/\D/g, "").length < 7 || !paket) {
    return Response.json({ error: "Ad, telefon ve paket zorunlu." }, { status: 400 });
  }

  const { error } = await supabase.from("rezervasyonlar").insert({ ad, telefon, paket, not_metni });
  if (error) {
    console.error("Rezervasyon kaydedilemedi:", error.message);
    return Response.json({ error: "Kaydedilemedi" }, { status: 500 });
  }
  return Response.json({ ok: true });
}
