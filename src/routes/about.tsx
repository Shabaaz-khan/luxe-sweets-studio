import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { SectionHeading } from "@/components/site/SectionHeading";
import hero from "@/assets/hero-sweets.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Our Story — Saatvik Sweets & Savouries" },
      {
        name: "description",
        content:
          "Three generations, one obsession. The story of Saatvik Sweets & Savouries — from a Mumbai side-street counter to a modern house of mithai.",
      },
      { property: "og:title", content: "Our Story — Saatvik" },
      {
        property: "og:description",
        content: "Three generations of craft. Every recipe by hand.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main className="pt-28 md:pt-36">
        <section className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeading
            eyebrow="Our Story"
            title="A recipe passed down. A counter built up."
            subtitle="From a single glass counter in 1962 to a modern kitchen serving 400+ cities — the ingredients haven't changed."
          />
        </section>

        <section className="mx-auto max-w-7xl px-5 md:px-8 mt-16 grid lg:grid-cols-2 gap-14 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="absolute -inset-6 bg-gradient-gold opacity-15 blur-3xl rounded-3xl" />
            <img
              src={hero}
              alt="Signature mithai on brass thali"
              width={1600}
              height={1600}
              className="relative rounded-3xl border border-gold/25 shadow-luxe"
            />
          </motion.div>
          <div className="space-y-6 text-foreground/80 leading-relaxed">
            <p className="text-xl font-display text-primary">
              "The best mithai isn't made faster. It's made slower."
            </p>
            <p>
              Saatvik began in 1962 when our grandfather set up a small counter
              opposite the Heritage Lane market in Mumbai. He believed three
              things: pure ghee, patient hands, and no shortcuts. Sixty years
              later, that counter has grown into a modern kitchen — but the
              rules haven't moved an inch.
            </p>
            <p>
              Today, we ship across 400+ Indian cities and to families in more
              than 20 countries. Every ladoo is still shaped by hand. Every
              chakli is still roasted the morning it's dispatched. The counter
              hasn't gotten faster. Only larger.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 md:px-8 mt-24 grid md:grid-cols-3 gap-6">
          {[
            {
              year: "1962",
              title: "The counter opens",
              body: "A single glass shelf, four ladoo trays, and one cast-iron kadhai.",
            },
            {
              year: "1998",
              title: "A modern kitchen",
              body: "The next generation opens a certified, temperature-controlled kitchen.",
            },
            {
              year: "Today",
              title: "Made for the world",
              body: "Corporate gifting, pan-India delivery, and international shipping.",
            },
          ].map((s, i) => (
            <motion.div
              key={s.year}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="rounded-2xl border border-border bg-card p-8 shadow-soft"
            >
              <div className="font-display text-4xl shimmer-gold">{s.year}</div>
              <h3 className="mt-3 font-display text-2xl text-primary">{s.title}</h3>
              <p className="mt-2 text-foreground/70">{s.body}</p>
            </motion.div>
          ))}
        </section>
      </main>
      <Footer />
    </div>
  );
}
