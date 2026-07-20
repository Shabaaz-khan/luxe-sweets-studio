import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getAboutPage } from "@/api/api";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { SectionHeading } from "@/components/site/SectionHeading";
// import hero from "@/assets/hero-sweets.jpg";

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
function getYoutubeEmbedUrl(url: string) {
  if (!url) return "";

  try {
    // Already an embed URL
    if (url.includes("/embed/")) {
      return url;
    }

    // Short URL
    if (url.includes("youtu.be/")) {
      const id = url.split("youtu.be/")[1].split("?")[0];
      return `https://www.youtube.com/embed/${id}`;
    }

    // Normal watch URL
    if (url.includes("youtube.com/watch")) {
      const id = new URL(url).searchParams.get("v");
      if (id) {
        return `https://www.youtube.com/embed/${id}`;
      }
    }
  } catch (err) {
    console.log(err);
  }

  return "";
}
function AboutPage() {
  const [page, setPage] = useState<any>(null);

useEffect(() => {
  load();
}, []);

async function load() {
  try {
    const data = await getAboutPage();
    setPage(data);
  } catch (err) {
    console.log(err);
  }
}

if (!page) return null;
  return (
    <div className="min-h-screen">
      <Nav />
      <main className="pt-28 md:pt-36">
        <section className="mx-auto max-w-7xl px-5 md:px-8">
<SectionHeading
  eyebrow={page.eyebrow}
  title={page.title}
  subtitle={page.subtitle}
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
<div className="relative rounded-3xl overflow-hidden border border-gold/25 shadow-luxe aspect-video">

  <iframe
    className="w-full h-full"
    src={getYoutubeEmbedUrl(page.videoUrl)}
    title="Welcome to Saatvik Sweets & Savouries"
    frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerPolicy="strict-origin-when-cross-origin"
    allowFullScreen
  />

</div>
          </motion.div>
          <div className="space-y-6 text-foreground/80 leading-relaxed">
   <p className="text-xl font-display text-primary">
  {page.quote}
</p>
<p>
  {page.story1}
</p>
<p>
  {page.story2}
</p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 md:px-8 mt-24 grid md:grid-cols-3 gap-6">
 {page.timeline?.map((s: any, i: number) => (
            <motion.div
              key={i}
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
