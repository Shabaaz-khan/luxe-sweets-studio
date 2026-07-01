import { motion, useMotionValue, useTransform } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { useEffect } from "react";
import hero from "@/assets/hero-sweets.jpg";
import sweet2 from "@/assets/sweet-2.jpg";
import savoury from "@/assets/savoury-1.jpg";

export function Hero3D() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const rotY = useTransform(mx, [-1, 1], [-8, 8]);
  const rotX = useTransform(my, [-1, 1], [6, -6]);
  const tx = useTransform(mx, [-1, 1], [-14, 14]);
  const ty = useTransform(my, [-1, 1], [-10, 10]);
  const card1X = useTransform(mx, [-1, 1], [-40, 40]);
  const card1Y = useTransform(my, [-1, 1], [-30, 30]);
  const card2X = useTransform(mx, [-1, 1], [40, -40]);
  const card2Y = useTransform(my, [-1, 1], [30, -30]);
  const badgeX = useTransform(mx, [-1, 1], [20, -20]);
  const badgeY = useTransform(my, [-1, 1], [-20, 20]);


  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      mx.set(nx);
      my.set(ny);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  return (
    <section className="relative pt-28 md:pt-32 pb-16 md:pb-24 overflow-hidden">
      {/* Decorative gold rings */}
      <div className="pointer-events-none absolute -top-24 -right-24 w-[480px] h-[480px] rounded-full border border-gold/25 animate-spin-slow" />
      <div className="pointer-events-none absolute -top-8 -right-8 w-[320px] h-[320px] rounded-full border border-gold/20 animate-spin-slow" style={{ animationDirection: "reverse" }} />

      <div className="mx-auto max-w-7xl px-5 md:px-8 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-cream/60 backdrop-blur px-4 py-1.5 text-[11px] tracking-[0.24em] uppercase text-primary"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-gold" />
            Est. 1962 · Handcrafted daily
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mt-6 font-display text-5xl md:text-6xl lg:text-7xl leading-[1.02] text-balance text-primary"
          >
            The taste of a{" "}
            <span className="italic">celebration</span>,
            <br />
            crafted <span className="shimmer-gold">by hand</span>.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-6 max-w-xl text-lg text-foreground/75 leading-relaxed"
          >
            Saatvik brings you slow-cooked mithai and freshly roasted savouries —
            the recipes of our grandmothers, presented for the tables of today.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <Link
              to="/menu"
              className="group inline-flex items-center gap-3 rounded-full bg-primary text-primary-foreground pl-6 pr-2 py-2 text-sm font-medium shadow-luxe hover:bg-burgundy-deep transition-colors"
            >
              Explore the menu
              <span className="grid place-items-center w-9 h-9 rounded-full bg-gold text-primary group-hover:translate-x-0.5 transition-transform">→</span>
            </Link>
            <Link
              to="/corporate"
              className="inline-flex items-center gap-2 rounded-full border border-primary/30 px-6 py-3 text-sm text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              Corporate gifting
            </Link>
          </motion.div>

          <div className="mt-12 flex items-center gap-8 text-xs tracking-widest uppercase text-muted-foreground">
            <div>
              <div className="font-display text-3xl text-primary">60+</div>
              <div>Years of craft</div>
            </div>
            <div className="w-px h-10 bg-border" />
            <div>
              <div className="font-display text-3xl text-primary">120+</div>
              <div>Corporate clients</div>
            </div>
            <div className="w-px h-10 bg-border hidden sm:block" />
            <div className="hidden sm:block">
              <div className="font-display text-3xl text-primary">4.9★</div>
              <div>Rated on Google</div>
            </div>
          </div>
        </div>

        {/* 3D stage */}
        <div className="relative h-[440px] md:h-[560px] [perspective:1400px]">
          <motion.div
            style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }}
            className="absolute inset-0"
          >
            {/* Main hero plate */}
            <motion.div
              style={{ x: tx, y: ty }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[78%] aspect-square rounded-full overflow-hidden shadow-luxe border-4 border-cream"
            >
              <img src={hero} alt="Signature assortment of Indian sweets" className="w-full h-full object-cover" width={1600} height={1600} />
              <div className="absolute inset-0 rounded-full ring-1 ring-gold/30" />
            </motion.div>

            {/* Floating card 1 */}
            <motion.div
              style={{ x: useTransform(mx, [-1, 1], [-40, 40]), y: useTransform(my, [-1, 1], [-30, 30]) }}
              className="absolute -left-2 top-6 md:top-10 w-40 md:w-48 rounded-2xl overflow-hidden shadow-luxe rotate-[-8deg] animate-float-slow border border-cream"
            >
              <img src={sweet2} alt="Rose gulab jamun" loading="lazy" className="w-full h-40 md:h-48 object-cover" width={800} height={800} />
              <div className="p-3 bg-cream/95 backdrop-blur">
                <div className="text-[10px] tracking-widest uppercase text-gold">Signature</div>
                <div className="font-display text-primary">Gulab Jamun</div>
              </div>
            </motion.div>

            {/* Floating card 2 */}
            <motion.div
              style={{ x: useTransform(mx, [-1, 1], [40, -40]), y: useTransform(my, [-1, 1], [30, -30]) }}
              className="absolute right-0 bottom-6 md:bottom-10 w-40 md:w-52 rounded-2xl overflow-hidden shadow-luxe rotate-[7deg] animate-float-med border border-cream"
            >
              <img src={savoury} alt="Traditional namkeen mix" loading="lazy" className="w-full h-40 md:h-48 object-cover" width={800} height={800} />
              <div className="p-3 bg-cream/95 backdrop-blur">
                <div className="text-[10px] tracking-widest uppercase text-gold">Freshly roasted</div>
                <div className="font-display text-primary">Namkeen</div>
              </div>
            </motion.div>

            {/* Gold badge */}
            <motion.div
              style={{ x: useTransform(mx, [-1, 1], [20, -20]), y: useTransform(my, [-1, 1], [-20, 20]) }}
              className="absolute -right-3 md:right-6 top-2 w-24 h-24 md:w-28 md:h-28 rounded-full bg-gradient-gold text-primary grid place-items-center rotate-12 shadow-luxe"
            >
              <div className="text-center leading-tight">
                <div className="font-display text-lg">Since</div>
                <div className="font-display text-3xl">1962</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
