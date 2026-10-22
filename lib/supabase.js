import { createClient } from "@supabase/supabase-js";

// Publishable (anon) anahtar tarayıcıda kullanılmak içindir; yetkiler RLS ile korunur.
const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://qwyhefiduqxuhhkaogjv.supabase.co";
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_8w1jhLr_G2pwMyHr1_tkKA_KrDpmwd-";

export const supabase = createClient(url, key, {
  auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
});
