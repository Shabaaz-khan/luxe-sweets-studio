import { Link } from "@tanstack/react-router";
import { SITE } from "@/lib/site";
import { Instagram, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-24 bg-gradient-burgundy text-primary-foreground">
      <div className="mx-auto max-w-7xl px-5 md:px-8 py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-full bg-gold/20 border border-gold/50 grid place-items-center font-display text-xl">
              S
            </span>
            <div>
              <div className="font-display text-2xl">{SITE.short}</div>
              <div className="text-[11px] tracking-[0.3em] uppercase text-gold-soft/80">
                Sweets & Savouries
              </div>
            </div>
          </div>
          <p className="mt-5 max-w-md text-primary-foreground/75 leading-relaxed">
            Three generations of craft. Every ladoo shaped by hand, every namkeen
            roasted to order. A modern home for classical Indian sweets.
          </p>
        </div>

        <div>
          <div className="text-sm tracking-[0.24em] uppercase text-gold-soft mb-4">Explore</div>
          <ul className="space-y-2.5 text-primary-foreground/80">
            <li><Link to="/menu" className="hover:text-gold-soft">The Menu</Link></li>
            <li><Link to="/corporate" className="hover:text-gold-soft">Corporate Gifting</Link></li>
            <li><Link to="/about" className="hover:text-gold-soft">Our Story</Link></li>
          </ul>
        </div>

        <div>
          <div className="text-sm tracking-[0.24em] uppercase text-gold-soft mb-4">Visit</div>
          <ul className="space-y-3 text-primary-foreground/80">
            <li className="flex items-start gap-3"><MapPin size={16} className="mt-1 text-gold" /> {SITE.address}</li>
            <li className="flex items-center gap-3"><Phone size={16} className="text-gold" /> {SITE.phone}</li>
            <li className="flex items-center gap-3"><Mail size={16} className="text-gold" /> {SITE.email}</li>
            <li className="flex items-center gap-3"><Instagram size={16} className="text-gold" /> @saatviksweets</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10">
        <div className="mx-auto max-w-7xl px-5 md:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-primary-foreground/60">
          <div>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</div>
          <div className="tracking-widest uppercase text-gold-soft/70">Crafted in India</div>
        </div>
      </div>
    </footer>
  );
}
