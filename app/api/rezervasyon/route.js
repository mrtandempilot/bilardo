// Şimdilik talebi loglar. Sonraki adım: Supabase'e kaydet + iyzico ödeme linki üret.
export async function POST(req) {
  const body = await req.json().catch(() => null);
  if (!body?.ad || !body?.telefon || !body?.paket) {
    return Response.json({ error: "Ad, telefon ve paket zorunlu." }, { status: 400 });
  }
  console.log("Yeni rezervasyon:", body);
  return Response.json({ ok: true });
}
