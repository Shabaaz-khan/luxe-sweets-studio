import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SITE } from "@/lib/site";
import { Menu, X } from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/menu", label: "Menu" },
  { to: "/corporate", label: "Orders" },
  { to: "/about", label: "Our Story" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const light = !scrolled; // sitting over dark burgundy hero at top

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-md bg-cream/85 border-b border-border shadow-soft"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8 h-16 md:h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <span className={`relative inline-flex items-center justify-center w-10 h-10 rounded-full shadow-soft ${light ? "bg-gold" : "bg-gradient-burgundy"}`}>
            <span className={`font-display text-lg leading-none ${light ? "text-primary" : "text-primary-foreground"}`}>S</span>
            <span className="absolute inset-0 rounded-full border border-gold/40" />
          </span>
          <span className="flex flex-col leading-none">
            <span className={`font-display text-lg md:text-xl ${ "text-primary"}`}>{SITE.short}</span>
            <span className={`text-[10px] md:text-[11px] tracking-[0.28em] uppercase ${"text-muted-foreground"}`}>
              Sweets & Savouries
            </span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`text-sm tracking-wide transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-gold hover:after:w-full after:transition-all ${
                 "text-foreground/80 hover:text-primary"
              }`}
              activeProps={{ className: "after:w-full" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/menu"
            className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors shadow-soft ${

                 "bg-primary text-primary-foreground hover:bg-burgundy-deep"
            }`}
          >
            Order Now
          </Link>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
          className={`md:hidden inline-flex items-center justify-center w-10 h-10 rounded-full ${light ? "bg-gold/20 text-cream border border-gold/40" : "bg-secondary text-primary"}`}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-[max-height,opacity] duration-300 ${
          open ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        } bg-cream/95 backdrop-blur border-b border-border`}
      >
        <div className="px-5 py-4 flex flex-col gap-1">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="py-3 text-base border-b border-border/60 last:border-0 text-primary"
              activeProps={{ className: "text-gold" }}
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/menu"
            onClick={() => setOpen(false)}
            className="mt-3 inline-flex justify-center rounded-full bg-primary text-primary-foreground px-5 py-3 text-sm font-medium"
          >
            Order Now
          </Link>
        </div>
      </div>
    </header>
  );
}
