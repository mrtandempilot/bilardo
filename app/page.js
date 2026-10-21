import TableHero from "@/components/TableHero";
import Courses from "@/components/Courses";
import { site } from "@/lib/data";

export default function Home() {
  return (
    <main>
      <header className="hero">
        <nav className="wrap nav">
          <span className="brand">{site.name}</span>
          <div className="links">
            <a href="#kurslar">Kurslar</a>
            <a href="#abonelik">Abonelik</a>
            <a href="#rezervasyon">Ders ayarla</a>
          </div>
        </nav>
        <div className="wrap hero-grid">
          <div>
            <h1>Bilardoyu açı açı öğren.</h1>
            <p>Fethiye’de birebir Amerikan ve 3 bant dersleri. İlk kez ıstaka tutandan turnuvaya hazırlanana kadar, seviyene göre saat saat planlanmış kurslar.</p>
            <a className="btn btn-light" href="#kurslar">Kursları gör</a>
          </div>
          <TableHero />
        </div>
      </header>

      <section className="wrap about">
        <h2>Eğitmen</h2>
        <p><strong>{site.instructor}</strong> ile her ders birebir. [Buraya eğitmenin deneyimi, oynadığı turnuvalar ve öğretme yaklaşımı gelecek.]</p>
      </section>

      <Courses />

      <footer className="foot">
        <div className="wrap foot-grid">
          <div><strong>{site.name}</strong><p>{site.address}</p></div>
          <div>
            <p><a href={`tel:${site.phone.replace(/\s/g, "")}`}>{site.phone}</a></p>
            <p><a href={`https://wa.me/${site.whatsapp}`}>WhatsApp’tan yaz</a></p>
          </div>
        </div>
      </footer>
    </main>
  );
}
