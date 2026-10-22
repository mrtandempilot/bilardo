import { Phone, MessageCircle, MapPin, Mail, Camera, CirclePlay } from "lucide-react";
import { site } from "@/lib/data";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="foot">
      <div className="wrap foot-grid">
        <div>
          <strong className="foot-brand">{site.name}</strong>
          <p>{site.tagline}</p>
          <p>Fethiye, Ölüdeniz, Çalış ve Göcek'te birebir Amerikan pool ve 3 bant bilardo dersi.</p>
          <p className="foot-social">
            <a href={site.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Camera size={16} /> Instagram</a>
            <a href={site.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube"><CirclePlay size={16} /> YouTube</a>
          </p>
        </div>
        <div>
          <h4>İletişim</h4>
          <p><Phone size={15} /> <a href={`tel:${site.phone.replace(/[^0-9+]/g, "")}`}>{site.phone}</a></p>
          <p><MessageCircle size={15} /> <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener noreferrer">WhatsApp</a></p>
          <p><Mail size={15} /> <a href={`mailto:${site.email}`}>{site.email}</a></p>
        </div>
        <div>
          <h4>Adres</h4>
          <p><MapPin size={15} /> {site.address}</p>
          <p>{site.workingHours}</p>
        </div>
      </div>
      <div className="wrap foot-bottom">© {year} {site.name}</div>

      <a className="wa-float" href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp’tan yaz">
        <MessageCircle size={26} />
      </a>
    </footer>
  );
}
