import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Hero3D } from "@/components/site/Hero3D";
import { Marquee } from "@/components/site/Marquee";
import { SectionHeading } from "@/components/site/SectionHeading";
import { ProductCard } from "@/components/site/ProductCard";
import { products, categories } from "@/lib/menu";
import corporateImg from "@/assets/corporate-gift.jpg";
import { Sparkles, Leaf, Award, Truck } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Home,
});

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
          <div className="mx-auto max-w-7xl px-5 md:px-8 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">

            {[
              { Icon: Leaf, label: "Pure ghee, no palm oil" },
              { Icon: Sparkles, label: "Slow-cooked, hand shaped" },
              { Icon: Award, label: "FSSAI certified kitchen" },
              { Icon: Truck, label: "Pan-India cold-chain delivery" },
            ].map(({ Icon, label }) => (
              <div key={label} className="flex flex-col items-center gap-2 text-primary">
                <Icon size={22} className="text-gold" />
                <div className="text-xs tracking-widest uppercase text-foreground/75">{label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Categories */}
        <section className="mx-auto max-w-7xl px-5 md:px-8 py-24">
          <SectionHeading
            eyebrow="What we make"
            title="Three counters. One obsession with craft."
            subtitle="From heritage mithai to modern hampers — everything is prepared in small batches, the day it is dispatched."
          />

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {categories.map((c, i) => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="relative overflow-hidden rounded-3xl border border-border bg-card p-8 min-h-[280px] flex flex-col justify-between shadow-soft tilt-3d tilt-3d-hover"
              >
                <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-gradient-gold opacity-20 blur-2xl" />
                <div>
                  <div className="text-[11px] tracking-[0.3em] uppercase text-gold">0{i + 1}</div>
                  <h3 className="mt-3 font-display text-4xl text-primary">{c.label}</h3>
                  <p className="mt-2 text-foreground/70">{c.note}</p>
                </div>
                <Link
                  to="/menu"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary group"
                >
                  Discover
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Featured products */}
        <section className="mx-auto max-w-7xl px-5 md:px-8 pb-24">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <SectionHeading
              eyebrow="Signature selection"
              title="The house favourites."
              subtitle="A tasting-order of what regulars keep coming back for."
            />
            <Link to="/menu" className="text-sm text-primary hover:text-burgundy-deep underline underline-offset-4">
              View full menu →
            </Link>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((p) => (
              <ProductCard key={p.id} p={p} />
            ))}
          </div>
        </section>

        {/* Corporate strip */}
        <section className="mx-auto max-w-7xl px-5 md:px-8 pb-24">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-burgundy text-primary-foreground p-8 md:p-14 grid md:grid-cols-2 gap-10 items-center shadow-luxe">
            <div>
              <div className="text-[11px] tracking-[0.3em] uppercase text-gold-soft">Corporate & Bulk</div>
              <h2 className="mt-4 font-display text-4xl md:text-5xl leading-tight">
                Gifting your team, clients, and the years ahead.
              </h2>
              <p className="mt-5 text-primary-foreground/80 max-w-lg leading-relaxed">
                Custom-branded boxes, dedicated account manager, GST invoicing,
                and delivery across 400+ cities. Diwali, milestones, or a Tuesday —
                we scale from 20 boxes to 20,000.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to="/corporate"
                  className="inline-flex items-center gap-2 rounded-full bg-gold text-primary px-6 py-3 text-sm font-medium hover:bg-gold-soft transition-colors"
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
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-gold rounded-2xl blur-2xl opacity-25" />
              <motion.img
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                src={corporateImg}
                alt="Saatvik corporate gifting box"
                loading="lazy"
                width={1400}
                height={1000}
                className="relative rounded-2xl border border-gold/30 shadow-luxe"
              />
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="mx-auto max-w-7xl px-5 md:px-8 pb-24">
          <SectionHeading eyebrow="Kind words" title="Told at the counter." align="center" />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
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
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-2xl bg-card border border-border p-8 shadow-soft"
              >
                <div className="text-gold text-2xl font-display leading-none">“</div>
                <p className="mt-3 text-foreground/80 leading-relaxed">{t.q}</p>
                <footer className="mt-6 text-sm tracking-widest uppercase text-muted-foreground">
                  — {t.a}
                </footer>
              </motion.blockquote>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
