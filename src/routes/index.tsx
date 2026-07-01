import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Hero3D } from "@/components/site/Hero3D";
import { Marquee } from "@/components/site/Marquee";
import { SectionHeading } from "@/components/site/SectionHeading";
import { ProductCard } from "@/components/site/ProductCard";
import { Reveal, RevealStagger, revealItem } from "@/components/site/Reveal";
import { products, categories } from "@/lib/menu";
import corporateImg from "@/assets/corporate-gift.jpg";
import heroPlate from "@/assets/hero-plate.jpg";
import { Sparkles, Leaf, Award, Truck } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Home,
});

function CinematicStory() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "12%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.15, 1.35]);
  const textY = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);

  return (
    <section
      ref={ref}
      className="relative h-[110vh] overflow-hidden bg-velvet text-cream"
    >
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <img
          src={heroPlate}
          alt=""
          aria-hidden
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-burgundy-deep/70 via-burgundy-deep/40 to-burgundy-deep/90" />
      </motion.div>

      <motion.div
        style={{ y: textY }}
        className="relative z-10 h-full grid place-items-center px-6"
      >
        <div className="max-w-3xl text-center">
          <div className="ornament inline-block text-[11px] tracking-[0.4em] uppercase text-gold" >
            Our story
          </div>
          <h2 className="mt-8 font-display italic text-5xl md:text-7xl leading-[1.05] text-cream">
            Six decades of{" "}
            <span className="shimmer-gold">slow craft</span>,
            <br />
            served with intention.
          </h2>
          <p className="mt-8 text-lg md:text-xl text-cream/70 leading-relaxed max-w-2xl mx-auto">
            From a single copper vessel in a Mumbai bylane to boxes travelling
            across six continents — every kaju katli, every ladoo, every chakli
            still leaves our kitchen the way it did in 1962. By hand. With
            ghee. With time.
          </p>
          <div className="mt-10 flex justify-center gap-4 flex-wrap">
            <Link
              to="/about"
              className="rounded-full border border-gold/60 px-7 py-3 text-sm tracking-widest uppercase text-cream hover:bg-gold/10 transition-colors"
            >
              The Saatvik way
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function Home() {
  const featured = products.filter((p) => p.featured);

  return (
    <div className="min-h-screen">
      <Nav />
      <main>
        <Hero3D />
        <Marquee />

        {/* Values strip */}
        <section className="border-b border-border bg-cream/60 backdrop-blur">
          <RevealStagger className="mx-auto max-w-7xl px-5 md:px-8 py-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { Icon: Leaf, label: "Pure ghee, no palm oil" },
              { Icon: Sparkles, label: "Slow-cooked, hand shaped" },
              { Icon: Award, label: "FSSAI certified kitchen" },
              { Icon: Truck, label: "Pan-India cold-chain delivery" },
            ].map(({ Icon, label }) => (
              <motion.div
                key={label}
                variants={revealItem}
                className="flex flex-col items-center gap-2 text-primary"
              >
                <Icon size={22} className="text-gold" />
                <div className="text-xs tracking-widest uppercase text-foreground/75">
                  {label}
                </div>
              </motion.div>
            ))}
          </RevealStagger>
        </section>

        {/* Cinematic story */}
        <CinematicStory />

        {/* Categories */}
        <section className="mx-auto max-w-7xl px-5 md:px-8 py-28">
          <Reveal>
            <SectionHeading
              eyebrow="What we make"
              title="Three counters. One obsession with craft."
              subtitle="From heritage mithai to modern hampers — everything is prepared in small batches, the day it is dispatched."
            />
          </Reveal>

          <RevealStagger stagger={0.15} className="mt-14 grid gap-6 md:grid-cols-3">
            {categories.map((c, i) => (
              <motion.div
                key={c.id}
                variants={revealItem}
                className="relative overflow-hidden rounded-3xl border border-border bg-card p-8 min-h-[280px] flex flex-col justify-between shadow-soft tilt-3d tilt-3d-hover"
              >
                <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-gradient-gold opacity-20 blur-2xl" />
                <div>
                  <div className="text-[11px] tracking-[0.3em] uppercase text-gold">
                    0{i + 1}
                  </div>
                  <h3 className="mt-3 font-display text-4xl text-primary">
                    {c.label}
                  </h3>
                  <p className="mt-2 text-foreground/70">{c.note}</p>
                </div>
                <Link
                  to="/menu"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary group"
                >
                  Discover
                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </motion.div>
            ))}
          </RevealStagger>
        </section>

        {/* Featured products */}
        <section className="mx-auto max-w-7xl px-5 md:px-8 pb-28">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <SectionHeading
                eyebrow="Signature selection"
                title="The house favourites."
                subtitle="A tasting-order of what regulars keep coming back for."
              />
              <Link
                to="/menu"
                className="text-sm text-primary hover:text-burgundy-deep underline underline-offset-4"
              >
                View full menu →
              </Link>
            </div>
          </Reveal>

          <RevealStagger
            stagger={0.1}
            className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {featured.map((p) => (
              <motion.div key={p.id} variants={revealItem}>
                <ProductCard p={p} />
              </motion.div>
            ))}
          </RevealStagger>
        </section>

        {/* Corporate strip */}
        <section className="mx-auto max-w-7xl px-5 md:px-8 pb-28">
          <Reveal y={60}>
            <div className="relative overflow-hidden rounded-3xl bg-gradient-burgundy text-primary-foreground p-8 md:p-14 grid md:grid-cols-2 gap-10 items-center shadow-luxe">
              <div className="absolute inset-0 bg-damask opacity-30 pointer-events-none" />
              <div className="relative">
                <div className="text-[11px] tracking-[0.3em] uppercase text-gold-soft">
                  Corporate & Bulk
                </div>
                <h2 className="mt-4 font-display text-4xl md:text-5xl leading-tight">
                  Gifting your team, clients, and the years ahead.
                </h2>
                <p className="mt-5 text-primary-foreground/80 max-w-lg leading-relaxed">
                  Custom-branded boxes, dedicated account manager, GST
                  invoicing, and delivery across 400+ cities. Diwali,
                  milestones, or a Tuesday — we scale from 20 boxes to 20,000.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    to="/corporate"
                    className="btn-luxe inline-flex items-center gap-2 rounded-full bg-gold text-primary px-6 py-3 text-sm font-medium hover:bg-gold-soft transition-colors"
                  >
                    Request a quote
                  </Link>
                  <Link
                    to="/menu"
                    className="inline-flex items-center gap-2 rounded-full border border-gold/50 text-gold-soft px-6 py-3 text-sm hover:bg-gold/10 transition-colors"
                  >
                    See hampers
                  </Link>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-2xl">
                <div className="absolute inset-0 bg-gradient-gold rounded-2xl blur-2xl opacity-25" />
                <motion.img
                  initial={{ opacity: 0, scale: 1.1 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                  src={corporateImg}
                  alt="Saatvik corporate gifting box"
                  loading="lazy"
                  width={1400}
                  height={1000}
                  className="relative rounded-2xl border border-gold/30 shadow-luxe"
                />
              </div>
            </div>
          </Reveal>
        </section>

        {/* Testimonials */}
        <section className="mx-auto max-w-7xl px-5 md:px-8 pb-28">
          <Reveal>
            <SectionHeading
              eyebrow="Kind words"
              title="Told at the counter."
              align="center"
            />
          </Reveal>
          <RevealStagger stagger={0.14} className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                q: "The kaju katli tastes like my grandmother's — but wrapped like something from Milan.",
                a: "Ananya R.",
              },
              {
                q: "We shipped 800 Diwali boxes to clients across six countries. Not one complaint. Only compliments.",
                a: "Rohan M., CFO",
              },
              {
                q: "The chakli. That's it. That's the review.",
                a: "Kunal S.",
              },
            ].map((t, i) => (
              <motion.blockquote
                key={i}
                variants={revealItem}
                className="rounded-2xl bg-card border border-border p-8 shadow-soft"
              >
                <div className="text-gold text-2xl font-display leading-none">
                  “
                </div>
                <p className="mt-3 text-foreground/80 leading-relaxed">{t.q}</p>
                <footer className="mt-6 text-sm tracking-widest uppercase text-muted-foreground">
                  — {t.a}
                </footer>
              </motion.blockquote>
            ))}
          </RevealStagger>
        </section>
      </main>
      <Footer />
    </div>
  );
}
