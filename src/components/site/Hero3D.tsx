import { motion, useMotionValue, useTransform, useScroll } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import heroPlate from "@/assets/hero-plate.jpg";
import ladoo from "@/assets/ladoo.png";
import katli from "@/assets/katli.png";
import sweet2 from "@/assets/sweet-2.jpg";
import savoury from "@/assets/savoury-1.jpg";

export function Hero3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  // Mouse parallax
  const rotY = useTransform(mx, [-1, 1], [-10, 10]);
  const rotX = useTransform(my, [-1, 1], [8, -8]);
  const plateTx = useTransform(mx, [-1, 1], [-18, 18]);
  const plateTy = useTransform(my, [-1, 1], [-14, 14]);
  const card1X = useTransform(mx, [-1, 1], [-46, 46]);
  const card1Y = useTransform(my, [-1, 1], [-34, 34]);
  const card2X = useTransform(mx, [-1, 1], [46, -46]);
  const card2Y = useTransform(my, [-1, 1], [34, -34]);
  const ladooX = useTransform(mx, [-1, 1], [-60, 60]);
  const ladooY = useTransform(my, [-1, 1], [-40, 40]);
  const katliX = useTransform(mx, [-1, 1], [55, -55]);
  const katliY = useTransform(my, [-1, 1], [45, -45]);

  // Scroll parallax
  const { scrollY } = useScroll();
  const plateScrollY = useTransform(scrollY, [0, 800], [0, 120]);
  const bgScrollY = useTransform(scrollY, [0, 800], [0, -80]);
  const textScrollY = useTransform(scrollY, [0, 800], [0, -60]);
  const bgScale = useTransform(scrollY, [0, 800], [1, 1.15]);

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

  const words = ["The", "taste", "of", "a", "celebration,"];
  const words2 = ["crafted", "by", "hand."];

  return (
    <section ref={containerRef} className="relative min-h-[92vh] pt-24 md:pt-28 pb-20 overflow-hidden">
      {/* Deep burgundy backdrop panel */}
      <motion.div
        style={{ y: bgScrollY, scale: bgScale }}
        className="pointer-events-none absolute inset-x-4 md:inset-x-10 top-20 bottom-10 rounded-[2.5rem] bg-velvet bg-damask shadow-luxe"
      >
        <div className="absolute inset-0 rounded-[2.5rem] ring-1 ring-inset ring-gold/20" />
        <div className="absolute inset-3 rounded-[2.25rem] ring-1 ring-inset ring-gold/10" />
      </motion.div>

      {/* Rotating gold rings */}
      <div className="pointer-events-none absolute left-1/2 top-[52%] -translate-x-1/2 -translate-y-1/2">
        <div className="absolute -inset-[280px] md:-inset-[380px] rounded-full border border-gold/25 animate-spin-slow" />
        <div className="absolute -inset-[220px] md:-inset-[310px] rounded-full border border-dashed border-gold/30 animate-spin-reverse" />
        <div className="absolute -inset-[160px] md:-inset-[240px] rounded-full border border-gold/20 animate-spin-slow" />
      </div>

      {/* Falling petals */}
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <span
          key={i}
          aria-hidden
          className="pointer-events-none absolute top-0 w-2 h-3 rounded-full bg-gold/60"
          style={{
            left: `${(i * 13 + 8) % 100}%`,
            animation: `petal-fall ${8 + (i % 4) * 2}s linear ${i * 1.4}s infinite`,
            filter: "blur(0.3px)",
            opacity: 0.55,
          }}
        />
      ))}

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12 pt-10 md:pt-16 grid lg:grid-cols-12 gap-10 items-center">
        {/* Text column */}
        <motion.div style={{ y: textScrollY }} className="lg:col-span-6 text-cream">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-burgundy-deep/40 backdrop-blur px-4 py-1.5 text-[11px] tracking-[0.28em] uppercase text-gold-soft"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            Est. 1962 · Handcrafted daily
          </motion.div>

          <h1 className="mt-7 font-display text-[3.2rem] leading-[1.02] md:text-7xl lg:text-[5.5rem] text-cream text-balance">
            <span className="block">
              {words.map((w, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 36, rotateX: -60 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ duration: 0.7, delay: 0.1 + i * 0.08, ease: [0.2, 0.8, 0.2, 1] }}
                  className="inline-block mr-3 [transform-style:preserve-3d]"
                >
                  {w}
                </motion.span>
              ))}
            </span>
            <span className="block italic mt-1">
              {words2.map((w, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 36, rotateX: -60 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ duration: 0.7, delay: 0.7 + i * 0.09, ease: [0.2, 0.8, 0.2, 1] }}
                  className={`inline-block mr-3 [transform-style:preserve-3d] ${i === words2.length - 1 ? "shimmer-gold" : ""}`}
                >
                  {w}
                </motion.span>
              ))}
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.2 }}
            className="mt-8 max-w-xl text-lg text-cream/75 leading-relaxed"
          >
            Slow-cooked mithai. Freshly roasted namkeen. Presented for the tables of today —
            wrapped in the recipes of our grandmothers.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.35 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Link
              to="/menu"
              className="btn-luxe group inline-flex items-center gap-3 rounded-full bg-gold text-primary pl-7 pr-2 py-2 text-sm font-semibold tracking-wide shadow-luxe hover:bg-gold-soft transition-colors"
            >
              Explore the menu
              <span className="grid place-items-center w-10 h-10 rounded-full bg-primary text-gold group-hover:translate-x-0.5 transition-transform">
                →
              </span>
            </Link>
            <Link
              to="/corporate"
              className="inline-flex items-center gap-2 rounded-full border border-gold/50 px-7 py-3.5 text-sm text-cream hover:bg-gold/10 transition-colors"
            >
              Corporate gifting
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.6 }}
            className="mt-14 grid grid-cols-3 gap-6 max-w-md"
          >
            {[
              { n: "60+", l: "Years of craft" },
              { n: "120+", l: "Corporate clients" },
              { n: "4.9★", l: "Google rating" },
            ].map((s) => (
              <div key={s.l}>
                <div className="font-display text-3xl md:text-4xl text-gold">{s.n}</div>
                <div className="mt-1 text-[10px] tracking-widest uppercase text-cream/60">{s.l}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* 3D stage */}
        <div className="lg:col-span-6 relative h-[460px] md:h-[600px] [perspective:1600px]">
          <motion.div
            style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d", y: plateScrollY }}
            className="absolute inset-0"
          >
            {/* Ornamental "1962" behind */}
            <div className="absolute inset-0 grid place-items-center pointer-events-none">
              <div className="font-display text-[10rem] md:text-[16rem] leading-none text-gold/10 select-none">
                1962
              </div>
            </div>

            {/* Main brass thali plate — center, mouse tilt, slow spin */}
            <motion.div
              style={{ x: plateTx, y: plateTy }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[82%] md:w-[78%] aspect-square"
            >
              <div className="relative w-full h-full [transform-style:preserve-3d]">
                <div className="absolute inset-0 rounded-full bg-gold/20 blur-3xl scale-110" />
                <div className="absolute inset-0 rounded-full animate-spin-slow">
                  <img
                    src={heroPlate}
                    alt="Assortment of handcrafted Indian sweets on a brass thali"
                    width={1200}
                    height={1200}
                    className="w-full h-full object-cover rounded-full shadow-luxe ring-2 ring-gold/40"
                  />
                </div>
                {/* pulse ring */}
                <div className="absolute inset-0 rounded-full border-2 border-gold/40 animate-pulse-ring" />
              </div>
            </motion.div>

            {/* Floating katli chip */}
            <motion.img
              src={katli}
              alt=""
              aria-hidden
              style={{ x: katliX, y: katliY }}
              className="absolute left-2 md:left-6 top-4 md:top-10 w-24 md:w-32 animate-float-slow drop-shadow-[0_20px_25px_rgba(0,0,0,0.5)]"
            />

            {/* Floating ladoo */}
            <motion.img
              src={ladoo}
              alt=""
              aria-hidden
              style={{ x: ladooX, y: ladooY }}
              className="absolute right-4 md:right-12 top-2 md:top-6 w-20 md:w-28 animate-float-med drop-shadow-[0_20px_25px_rgba(0,0,0,0.5)]"
            />

            {/* Floating card 1 */}
            <motion.div
              style={{ x: card1X, y: card1Y }}
              className="absolute -left-1 md:left-2 bottom-8 md:bottom-16 w-40 md:w-48 rounded-2xl overflow-hidden shadow-luxe rotate-[-8deg] animate-float-slow border-2 border-cream"
            >
              <img src={sweet2} alt="Rose gulab jamun" loading="lazy" className="w-full h-32 md:h-40 object-cover" width={800} height={800} />
              <div className="p-3 bg-cream/95 backdrop-blur">
                <div className="text-[10px] tracking-widest uppercase text-gold">Signature</div>
                <div className="font-display text-primary">Gulab Jamun</div>
              </div>
            </motion.div>

            {/* Floating card 2 */}
            <motion.div
              style={{ x: card2X, y: card2Y }}
              className="absolute right-0 bottom-2 md:bottom-6 w-40 md:w-52 rounded-2xl overflow-hidden shadow-luxe rotate-[7deg] animate-float-med border-2 border-cream"
            >
              <img src={savoury} alt="Traditional namkeen mix" loading="lazy" className="w-full h-32 md:h-40 object-cover" width={800} height={800} />
              <div className="p-3 bg-cream/95 backdrop-blur">
                <div className="text-[10px] tracking-widest uppercase text-gold">Freshly roasted</div>
                <div className="font-display text-primary">Namkeen</div>
              </div>
            </motion.div>

            {/* Gold "Since 1962" badge */}
            <motion.div
              style={{ x: card2X, y: card1Y }}
              className="absolute -right-2 md:right-4 top-24 md:top-32 w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-gold text-primary grid place-items-center rotate-12 shadow-luxe animate-float-tilt"
            >
              <div className="text-center leading-tight">
                <div className="text-[9px] tracking-[0.28em] uppercase">Since</div>
                <div className="font-display text-3xl md:text-4xl">1962</div>
                <div className="text-[8px] tracking-[0.28em] uppercase text-primary/70">Mumbai</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute left-1/2 bottom-6 -translate-x-1/2 flex flex-col items-center gap-2 text-cream/60 z-10">
        <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-gold to-transparent" />
      </div>
    </section>
  );
}
