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
import FloatingVideo from "@/components/site/FloatingVideo";
import CorporateSlider from "@/components/site/CorporateSlider";
// import corporateImg from "@/assets/corporate-gift.jpg";
// import heroPlate from "@/assets/hero-plate.jpg";
import { Sparkles, Leaf, Award, Truck, Linkedin, ChevronLeft, ChevronRight} from "lucide-react";
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
className="relative h-[110vh] overflow-hidden bg-[rgb(126,0,62)] text-cream"    >
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
const [current, setCurrent] = useState(0);
const [testimonialCurrent, setTestimonialCurrent] = useState(0);
const [corporateCurrent, setCorporateCurrent] = useState(0);

useEffect(() => {
  if (!home?.corporate?.images?.length) return;

  const timer = setInterval(() => {
    setCorporateCurrent(
      (prev) =>
        (prev + 1) % home.corporate.images.length
    );
  }, 3000);

  return () => clearInterval(timer);
}, [home?.corporate?.images]);
const nextTestimonial = () => {
  if (!home?.testimonials?.length) return;

  setTestimonialCurrent((prev) =>
    prev >= home.testimonials.length - 2 ? 0 : prev + 1
  );
};

const prevTestimonial = () => {
  if (!home?.testimonials?.length) return;

  setTestimonialCurrent((prev) =>
    prev === 0 ? Math.max(0, home.testimonials.length - 2) : prev - 1
  );
};
const nextSlide = () => {
  if (!home?.videoTestimonials?.length) return;

  setCurrent((prev) =>
    prev === home.videoTestimonials.length - 1 ? 0 : prev + 1
  );
};

const prevSlide = () => {
  if (!home?.videoTestimonials?.length) return;

  setCurrent((prev) =>
    prev === 0 ? home.videoTestimonials.length - 1 : prev - 1
  );
};

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
  const visibleTestimonials =
  home?.testimonials?.slice(
    testimonialCurrent,
    testimonialCurrent + 2
  ) || [];
  return (
    <div className="min-h-screen">
      <Nav />
          {home?.floatingVideo?.enabled && (
      <FloatingVideo
        video={home.floatingVideo.videoUrl}
        position={home.floatingVideo.position}
      />
    )}
      <main>
       <Hero3D hero={home.hero} />
        <Marquee items={home.marquee.items} />

        {/* Values strip */}
        <section className="border-b border-border bg-[oklch(0.97_0.07_96.58)] backdrop-blur">
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
     to="/collections/$slug"
  params={{
    slug: c.slug,
  }}
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
  className="mt-12 grid auto-rows-fr gap-6 sm:grid-cols-2 lg:grid-cols-3"
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
<CorporateSlider
  corporate={home.corporate}
/>
{/* Video Testimonials */}

<section className="mx-auto max-w-7xl px-5 md:px-8 py-0">
  <SectionHeading
    eyebrow="Customer Stories"
    title="Watch Our Happy Customers"
    subtitle="Real experiences shared by our customers."
    align="center"
  />

  <div className="relative mt-12">
    {/* Video */}
    <div className="overflow-hidden rounded-2xl border bg-card shadow-soft">
      <video
        key={home.videoTestimonials[current]._id}
        src={home?.videoTestimonials?.[current]?.videoUrl}
        controls
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-[600px] object-cover"
      />
    </div>

    {/* Previous Button */}
<button
  onClick={prevSlide}
  className="absolute left-4 top-1/2 -translate-y-1/2 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white shadow-lg transition-all duration-300 hover:scale-110 hover:bg-black/80"
>
  <ChevronLeft className="h-6 w-6" />
</button>

<button
  onClick={nextSlide}
  className="absolute right-4 top-1/2 -translate-y-1/2 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white shadow-lg transition-all duration-300 hover:scale-110 hover:bg-black/80"
>
  <ChevronRight className="h-6 w-6" />
</button>

    {/* Dots */}
    <div className="mt-6 flex justify-center gap-2">
      {home.videoTestimonials.map((_: any, index: number) => (
        <button
          key={index}
          onClick={() => setCurrent(index)}
          className={`h-3 w-3 rounded-full transition-all ${
            current === index
              ? "bg-[rgb(126,0,62)] w-8"
              : "bg-gray-300"
          }`}
        />
      ))}
    </div>
  </div>
</section>
        {/* Testimonials */}
<section className="mx-auto max-w-7xl px-5 md:px-8 pb-28">
  {/* <Reveal>
    <SectionHeading
      eyebrow="Kind words"
      title="Told at the counter."
      align="center"
    />
  </Reveal> */}

<div className="relative mt-12">

  <div className="grid gap-6 md:grid-cols-2">
    {visibleTestimonials.map((t: any, i: number) => (
<motion.blockquote
  key={i}
  variants={revealItem}
  className="
    rounded-[24px]
    border
    border-[#ECE7DF]
    bg-white
    p-8
    shadow-[0_8px_30px_rgba(0,0,0,0.06)]
    transition-all
    duration-300
    hover:-translate-y-1
    hover:shadow-[0_18px_40px_rgba(0,0,0,0.12)]
  "
>
  {/* Top */}

  <div className="flex items-start gap-5">

    <div className="relative shrink-0">

      <img
        src={t.image}
        alt={t.name}
        className="
          h-20
          w-20
          rounded-full
          object-cover
          border-4
          border-[#F5F2EC]
        "
      />

 {t.linkedin && (
  <a
    href={t.linkedin}
    target="_blank"
    rel="noreferrer"
    className="
      absolute
      -right-1
      bottom-1
      flex
      h-7
      w-7
      items-center
      justify-center
      rounded-full
      bg-[#0077B5]
      text-white
    "
  >
    <Linkedin size={14} fill="white" />
  </a>
)}

    </div>

    <div className="flex-1">

      <h3 className="text-xl font-bold text-[#1F2937]">
        {t.name}
      </h3>

<p className="mt-1 text-[15px] text-[#5F6368]">
  {t.designation}
  {t.company && `, ${t.company}`}
</p>

      {t.companyLogo && (
        <img
          src={t.companyLogo}
          alt=""
          className="mt-4 h-10 object-contain"
        />
      )}

    </div>

  </div>

  {/* Quote */}

  <h4
    className="
      mt-8
      text-[32px]
      leading-[1.3]
      font-medium
      text-[#202124]
    "
  >
    {t.title}
  </h4>

  {/* Review */}

  <p
    className="
      mt-6
      text-[17px]
      leading-8
      text-[#4B5563]
    "
  >
    {t.review}
  </p>

</motion.blockquote>
    ))}
  </div>

<button
  onClick={prevTestimonial}
  className="absolute left-4 top-1/2 -translate-y-1/2 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white shadow-lg transition-all duration-300 hover:scale-110 hover:bg-black/80"
>
  <ChevronLeft className="h-6 w-6" />
</button>

<button
  onClick={nextTestimonial}
  className="absolute right-4 top-1/2 -translate-y-1/2 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white shadow-lg transition-all duration-300 hover:scale-110 hover:bg-black/80"
>
  <ChevronRight className="h-6 w-6" />
</button>

</div>
</section>
      </main>
      <Footer />
    </div>
  );
}
