import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useCart } from "@/context/CartContext";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Hero3D } from "@/components/site/Hero3D";
import { Marquee } from "@/components/site/Marquee";
import { SectionHeading } from "@/components/site/SectionHeading";
import { ProductCard } from "@/components/site/ProductCard";
import { Reveal, RevealStagger, revealItem } from "@/components/site/Reveal";
import { useEffect, useState } from "react";
import { getCategories, getProducts,  getHomePage,} from "@/api/api";
// import corporateImg from "@/assets/corporate-gift.jpg";
// import heroPlate from "@/assets/hero-plate.jpg";
import { Sparkles, Leaf, Award, Truck } from "lucide-react";
export const Route = createFileRoute("/")({
  component: Home,
});

function CinematicStory({
  story,
}: {
  story: any;
}) {
  if (!story) return null;
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
          src={story.image}
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
           {story.label}
          </div>
          <h2 className="mt-8 font-display italic text-5xl md:text-7xl leading-[1.05] text-cream">
            {story.title}
            <span className="shimmer-gold">slow craft</span>,
            <br />
            served with intention.
          </h2>
          <p className="mt-8 text-lg md:text-xl text-cream/70 leading-relaxed max-w-2xl mx-auto">
            {story.description}
          </p>
          <div className="mt-10 flex justify-center gap-4 flex-wrap">
            <Link
                to={story.buttonLink}
              className="rounded-full border border-gold/60 px-7 py-3 text-sm tracking-widest uppercase text-cream hover:bg-gold/10 transition-colors"
            >
               {story.buttonText}
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function Home() {
const [categories, setCategories] = useState<any[]>([]);
const [products, setProducts] = useState<any[]>([]);
const { addToCart } = useCart();
const [home, setHome] = useState<any>(null);
useEffect(() => {
  loadHome();
  loadCategories();
  
  loadProducts();
}, []);
// const loadSignatureProducts = async () => {
//   try {
//     const categories = await getCategories();

//     const signatureCategory = categories.find(
//       (c: any) =>
//         c.name.toLowerCase() === "signature selection"
//     );

//     if (!signatureCategory) return;

//     const products = await getProducts();

//     const signatureProducts = products.filter(
//       (p: any) =>
//         p.category?._id === signatureCategory._id
//     );

//     setFeatured(signatureProducts);

//   } catch (err) {
//     console.log(err);
//   }
// };
const loadCategories = async () => {
  try {
    const data = await getCategories();

    console.log("API DATA:", data);
    console.log("Length:", data.length);

    setCategories(data);

  } catch (err) {
    console.log(err);
  }
};
const loadProducts = async () => {
  try {
    const data = await getProducts();
    setProducts(data);
  } catch (err) {
    console.log(err);
  }
};
const loadHome = async () => {
  try {
    const data = await getHomePage();
    setHome(data);
  } catch (err) {
    console.log(err);
  }
};
if (!home) return null;
const featured = home.signature?.category
  ? products
      .filter(
        (p) =>
          p.category?._id === home.signature.category
      )
      .slice(0, home.signature.limit)
  : [];
  return (
    <div className="min-h-screen">
      <Nav />
      <main>
       <Hero3D hero={home.hero} />
        <Marquee items={home.marquee.items} />

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
       <CinematicStory story={home.story} />

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
            {categories.map((c: any, i: number) => (
<motion.div
  key={c._id}
  variants={revealItem}
  className="relative overflow-hidden rounded-3xl h-[350px] shadow-soft group"
>
    <Link
    to="/menu"
      search={{ category: c._id }}
    className="relative block overflow-hidden rounded-3xl h-[350px] shadow-soft group"
  >
  {/* Background Image */}
  <img
    src={c.imageUrl}
    alt={c.name}
    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
  />

  {/* Dark Overlay */}
  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/45 transition-all duration-300" />

  {/* Content */}
 <div className="relative z-10 h-full flex flex-col justify-end p-8 text-white opacity-0 translate-y-6 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
    <div className="text-xs tracking-[0.3em] uppercase text-yellow-300">
      0{i + 1}
    </div>

    <h3 className="mt-2 font-display text-4xl">
      {c.name}
    </h3>

    <p className="mt-2 text-white/80 line-clamp-2">
      {c.description}
    </p>

<div className="mt-6 inline-flex items-center gap-2 font-medium">
  Discover
  <span className="group-hover:translate-x-1 transition-transform">
    →
  </span>
</div>
  </div>
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
  eyebrow={home.signature.eyebrow}
  title={home.signature.title}
  subtitle={home.signature.subtitle}
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
              <motion.div key={p._id} variants={revealItem}>
               <ProductCard
  p={p}
  onOrder={addToCart}
/>
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
                  {home.corporate.label}
                </div>
                <h2 className="mt-4 font-display text-4xl md:text-5xl leading-tight">
                  {home.corporate.title}
                </h2>
                <p className="mt-5 text-primary-foreground/80 max-w-lg leading-relaxed">
{home.corporate.description}
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                     to={home.corporate.primaryButtonLink}
                    className="btn-luxe inline-flex items-center gap-2 rounded-full bg-gold text-primary px-6 py-3 text-sm font-medium hover:bg-gold-soft transition-colors"
                  >
                    {home.corporate.primaryButtonText}
                  </Link>
                  <Link
                     to={home.corporate.secondaryButtonLink}
                    className="inline-flex items-center gap-2 rounded-full border border-gold/50 text-gold-soft px-6 py-3 text-sm hover:bg-gold/10 transition-colors"
                  >
                    {home.corporate.secondaryButtonText}
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
                  src={home.corporate.image}
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

  <RevealStagger
    stagger={0.14}
    className="mt-12 grid gap-6 md:grid-cols-3"
  >
    {home.testimonials.map((t: any, i: number) => (
      <motion.blockquote
        key={i}
        variants={revealItem}
        className="rounded-2xl bg-card border border-border p-8 shadow-soft"
      >
        {t.image && (
          <img
            src={t.image}
            alt={t.name}
            className="w-16 h-16 rounded-full object-cover mx-auto mb-4"
          />
        )}

        <p className="text-foreground/80 leading-relaxed">
          "{t.review}"
        </p>

        <footer className="mt-6 text-center">
          <h4 className="font-semibold">
            {t.name}
          </h4>

          <p className="text-sm text-muted-foreground">
            {t.designation}
          </p>
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
