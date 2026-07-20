import { Link } from "@tanstack/react-router";
import { useSettings } from "@/context/SettingsContext";

import {
  Instagram,
  Facebook,
  Youtube,
  Linkedin,
  Twitter,
  MessageCircle,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
export function Footer() {
  const { settings, loading } = useSettings();

if (loading) return null;
const socialIcons: any = {
  Instagram,
  Facebook,
  YouTube: Youtube,
  LinkedIn: Linkedin,
  Twitter,
  WhatsApp: MessageCircle,
};
  return (
    <footer className="mt-24 bg-gradient-burgundy text-primary-foreground">
      <div className="mx-auto max-w-7xl px-5 md:px-8 py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
{settings.logo ? (
<img
  src={settings.logo}
  alt={settings.companyName}
  className="w-10 h-10 rounded-full object-cover"
/>
) : (
  <span className="w-10 h-10 rounded-full bg-gold/20 border border-gold/50 grid place-items-center font-display text-xl">
    S
  </span>
)}
            <div>
<div className="font-display text-2xl text-[15px] tracking-[0.3em] uppercase text-gold-soft/80">
  {settings.companyName}
</div>
             
            </div>
          </div>
          <p className="mt-5 max-w-md text-primary-foreground/75 leading-relaxed">
{settings.tagline}
          </p>
        </div>

        <div>
          <div className="text-sm tracking-[0.24em] uppercase text-gold-soft mb-4">Explore</div>
          <ul className="space-y-2.5 text-primary-foreground/80">
            <li><Link to="/menu" className="hover:text-gold-soft">The Menu</Link></li>
            <li><Link to="/corporate" className="hover:text-gold-soft">Corporate Gifting</Link></li>
            <li><Link to="/about" className="hover:text-gold-soft">Our Story</Link></li>
            <li><Link to="/privacy" className="hover:text-gold-soft">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-gold-soft">Terms of Service</Link></li>
          </ul>
        </div>

        <div>
          <div className="text-sm tracking-[0.24em] uppercase text-gold-soft mb-4">Visit</div>
          <ul className="space-y-3 text-primary-foreground/80">
            <li className="flex items-start gap-3"><MapPin size={16} className="mt-1 text-gold" /> {settings.address}</li>
{settings.contacts?.map((contact: any, index: number) => (
  <div key={index} className="space-y-1 mb-4">
    <p className="font-semibold text-gold-soft">
      {contact.name}
    </p>

    {/* <p className="text-sm text-primary-foreground/70">
      {contact.category}
    </p> */}

    {contact.phone && (
      <li className="flex items-center gap-3">
        <Phone size={16} className="text-gold" />
        {contact.phone}
      </li>
    )}

    {contact.email && (
      <li className="flex items-center gap-3">
        <Mail size={16} className="text-gold" />
        {contact.email}
      </li>
    )}
  </div>
))}
            {settings.socialMedia?.map((item: any) => {

  const Icon = socialIcons[item.platform];

  if (!Icon) return null;

  return (
    <li key={item.platform}>
      <a
        href={item.url}
        target="_blank"
        rel="noreferrer"
        className="flex items-center gap-3 hover:text-gold-soft transition"
      >
        <Icon size={16} className="text-gold" />
        {item.platform}
      </a>
    </li>
  );
})}
          </ul>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10">
        <div className="mx-auto max-w-7xl px-5 md:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-primary-foreground/60">
          <div>© {new Date().getFullYear()} {settings.companyName}. All rights reserved.</div>
          <div className="tracking-widest uppercase text-gold-soft/70">Crafted in India</div>
        </div>
      </div>
    </footer>
  );
}
