/** @type {import('next').NextConfig} */
const nextConfig = {
  // Eski sürümdeki sayfalar artık ana sayfadaki pencereyle açılıyor
  async redirects() {
    return [
      { source: "/giris", destination: "/#giris", permanent: true },
      { source: "/hesabim", destination: "/#hesabim", permanent: true },
    ];
  },
};
export default nextConfig;
