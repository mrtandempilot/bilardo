// Herhangi bir bölümden (kurs kartı, abonelik, seviye testi) rezervasyon formuna paket aktarır.
export function pickPackage(label) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("paket-sec", { detail: label }));
  document.getElementById("rezervasyon")?.scrollIntoView({ behavior: "smooth" });
}
