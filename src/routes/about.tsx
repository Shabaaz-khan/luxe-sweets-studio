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
      <main className="pt-24 md:pt-26">


<section className="w-full">
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7 }}
     className="relative overflow-hidden"
  >
  <div className="absolute inset-0 bg-gradient-gold opacity-15 blur-3xl rounded-3xl" />

<div className="relative w-full h-[70vh] overflow-hidden">
        {page.videoFile ? (
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          controls={false}
          disablePictureInPicture
          controlsList="nodownload noplaybackrate noremoteplayback"
          onContextMenu={(e) => e.preventDefault()}
        >
          <source src={page.videoFile} type="video/mp4" />
        </video>
      ) : page.videoUrl ? (
        <iframe
          className="w-full h-full"
          src={getYoutubeEmbedUrl(page.videoUrl)}
          title="About Video"
          allowFullScreen
        />
      ) : null}
    </div>
  </motion.div>
</section>
<section className="mx-auto max-w-7xl px-5 md:px-8 mt-16">
  <SectionHeading
    eyebrow={page.eyebrow}
    title={page.title}
    subtitle={page.subtitle}
  />

  <div className="mt-10 max-w-4xl space-y-6 text-foreground/80 leading-relaxed">
    <p className="text-xl font-display text-primary">
      {page.quote}
    </p>

    <p>{page.story1}</p>

    <p>{page.story2}</p>
  </div>
</section>
        {/* Team Members */}
{page.team?.length > 0 && (
  <section className="mx-auto max-w-7xl px-5 md:px-8 mt-24 mb-24">
    <SectionHeading
      eyebrow="Our Leadership"
      title="Meet Our Team"
      subtitle="The passionate people who carry forward the legacy of Saatvik Sweets & Savouries."
    />

    <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {page.team.map((member: any, index: number) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.5,
            delay: index * 0.1,
          }}
          className="group overflow-hidden rounded-3xl border border-border bg-card shadow-soft hover:-translate-y-2 hover:shadow-xl transition-all duration-300"
        >
          {/* Top Banner */}
          <div className="h-24 bg-gradient-gold" />

          {/* Profile Image */}
          <div className="-mt-14 flex justify-center">
            <div className="rounded-full bg-white p-2 shadow-lg">
              <img
                src={member.image}
                alt={member.name}
                className="h-28 w-28 rounded-full object-cover"
              />
            </div>
          </div>

          {/* Content */}
          <div className="px-8 pb-8 pt-5 text-center">
            <h3 className="font-display text-2xl text-primary">
              {member.name}
            </h3>

            <p className="mt-1 text-sm font-semibold uppercase tracking-wider text-gold">
              {member.designation}
            </p>

            <div className="mx-auto mt-5 h-1 w-16 rounded-full bg-primary" />

            <p className="mt-6 text-foreground/70 leading-7">
              {member.description}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  </section>
)}
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
