import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
type FeaturedProduct = {
  _id: string;
  name: string;
  slug: string;
  imageUrl: string;
};

type Props = {
  corporate: {
    label: string;
    title: string;
    description: string;

    primaryButtonText: string;
    primaryButtonLink: string;

    secondaryButtonText: string;
    secondaryButtonLink: string;

   featuredProducts: FeaturedProduct[];
  };
};

export default function CorporateSlider({
  corporate,
}: Props) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!corporate.featuredProducts?.length) return;

    const timer = setInterval(() => {
      setCurrent((prev) =>
        (prev + 1) % corporate.featuredProducts.length
      );
    }, 3000);

    return () => clearInterval(timer);
  }, [corporate.featuredProducts]);
  const nextSlide = () => {
  setCurrent((prev) => (prev + 1) % corporate.featuredProducts.length);
};

const prevSlide = () => {
  setCurrent(
    (prev) =>
      (prev - 1 + corporate.featuredProducts.length) %
      corporate.featuredProducts.length
  );
};
const visibleImages = [
  corporate.featuredProducts[current],
  corporate.featuredProducts[(current + 1) % corporate.featuredProducts.length],
  corporate.featuredProducts[(current + 2) % corporate.featuredProducts.length],
];
  if (!corporate.featuredProducts?.length) {
    return null;
  }

  return (
    <section className="mx-auto max-w-7xl px-5 md:px-8 pb-24">

      <div className="overflow-hidden rounded-[32px] bg-[#F5F1E8] shadow-xl">

        <div className="grid lg:grid-cols-[430px_1fr]">

          {/* ================= LEFT PANEL ================= */}

          <div className="bg-[rgb(126,0,62)] text-white px-10 py-14 flex flex-col justify-center">

            <span className="text-[11px] uppercase tracking-[0.35em] text-yellow-300">
              {corporate.label}
            </span>

            <motion.h2
              initial={{
                opacity: 0,
                y: 30,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: .8,
              }}
              className="mt-5 text-5xl font-black leading-tight"
            >
              {corporate.title}
            </motion.h2>

            <motion.p
              initial={{
                opacity: 0,
                y: 25,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                delay: .2,
                duration: .8,
              }}
              className="mt-6 leading-8 text-white/80"
            >
              {corporate.description}
            </motion.p>

            <div className="mt-10 flex flex-wrap gap-4">

              <Link
                to={corporate.primaryButtonLink}
                className="rounded-lg bg-yellow-400 px-8 py-4 font-semibold text-black"
              >
                {corporate.primaryButtonText}
              </Link>

              <Link
                to={corporate.secondaryButtonLink}
                className="rounded-lg border border-yellow-300 px-8 py-4 text-yellow-300"
              >
                {corporate.secondaryButtonText}
              </Link>

            </div>

          </div>

 

{/* ================= RIGHT PANEL ================= */}

<div className="relative flex h-[620px] items-center overflow-hidden bg-[#F5F1E8] pl-8 pr-0">
<button
  onClick={prevSlide}
  className="absolute left-4 top-1/2 z-30 -translate-y-1/2 cursor-pointer flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-xl hover:scale-110 transition"
>
  <ChevronLeft size={24} />
</button>
<button
  onClick={nextSlide}
  className="absolute right-4 top-1/2 z-30 -translate-y-1/2 cursor-pointer flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-xl hover:scale-110 transition"
>
  <ChevronRight size={24} />
</button>
<motion.div
  key={current}
  initial={{
    opacity: 0,
    x: 80,
  }}
  animate={{
    opacity: 1,
    x: 0,
  }}
  transition={{
    duration: 0.6,
    ease: "easeInOut",
  }}
  className="flex items-center gap-6"
>

{visibleImages.map((item, index) => (
<motion.div
  key={index}
  whileHover={{
    y: -8,
    scale: 1.02,
  }}
  transition={{
    duration: 0.3,
  }}
  className={`relative shrink-0 ${
index === 0
  ? "w-[470px]"
  : "w-[280px]"
    }`}
  >
    <div className={`relative overflow-hidden rounded-[30px] shadow-[0_25px_60px_rgba(0,0,0,.18)] ${
  index === 0
    ? "h-[560px]"
    : "h-[500px] mt-10"
}`}>

<Link
  to="/products/$slug"
  params={{
    slug: item.slug,
  }}
>
  <motion.img
    src={item.imageUrl}
    alt={item.name}
    className="h-full w-full cursor-pointer object-cover"
    initial={{
      scale: 1.08,
    }}
    animate={{
      scale: 1,
    }}
    transition={{
      duration: 2.5,
      ease: "easeOut",
    }}
  />
</Link>

      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-6">
        <h3 className="text-2xl font-bold text-white">
          {item.name}
        </h3>
      </div>

    </div>
</motion.div>
))}
  </motion.div>

</div>

{/* ================= END RIGHT PANEL ================= */}
        </div>
      </div>
    </section>
  );
}