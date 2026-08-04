import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
type Card = {
  title: string;
  description: string;
  icon: string;
};

type ShowcaseImage = {
  image: string;
};

type Showcase = {
  badge: string;
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  images: ShowcaseImage[];
};

type Props = {
  showcase: Showcase;
};

export default function CorporateShowcase({
  showcase,
}: Props) {
    const [current, setCurrent] = useState(0);

useEffect(() => {
  if (!showcase.images?.length) return;

  const timer = setInterval(() => {
    setCurrent((prev) => (prev + 1) % showcase.images.length);
  }, 7000);

  return () => clearInterval(timer);
}, [showcase.images]);
    const mouseX = useMotionValue(0);
const mouseY = useMotionValue(0);

const x = useSpring(mouseX, {
  stiffness: 80,
  damping: 20,
});

const y = useSpring(mouseY, {
  stiffness: 80,
  damping: 20,
});

const rotateX = useTransform(y, [-20, 20], [6, -6]);
const rotateY = useTransform(x, [-20, 20], [-6, 6]);

const handleMove = (
  e: React.MouseEvent<HTMLDivElement>
) => {
  const rect = e.currentTarget.getBoundingClientRect();

  mouseX.set(
    ((e.clientX - rect.left) / rect.width - 0.5) * 30
  );

  mouseY.set(
    ((e.clientY - rect.top) / rect.height - 0.5) * 30
  );
};
  return (
<section
  onMouseMove={handleMove}
  className="relative h-[650px] sm:h-[700px] lg:h-[760px] xl:h-[600px] overflow-hidden"
>

      {/* Background */}
<AnimatePresence mode="sync">

<motion.img
  key={current}
  src={showcase.images[current]?.image}
  className="absolute inset-0 h-full w-full object-cover"

  initial={{
    opacity: 0,
    scale: 1.12,
  }}

  animate={{
    opacity: 1,
    scale: 1,
  }}

  exit={{
    opacity: 0,
    scale: 0.96,
  }}

  transition={{
    opacity: {
      duration: 1.4,
      ease: "easeInOut",
    },
    scale: {
      duration: 7,
      ease: "linear",
    },
  }}
/>

</AnimatePresence>


      {/* Dark Overlay */}

     <div className="absolute inset-0 " />

      {/* Luxury Gradient */}


      {/* Golden Glow */}

      {/* Content */}

      <div className="relative z-10 flex h-full items-center justify-center">

        <div className="mx-auto max-w-7xl px-6 text-center">

          {/* Badge */}

<AnimatePresence mode="wait">

<motion.span

key={current}

initial={{
opacity:0,
y:15
}}

animate={{
opacity:1,
y:0
}}

exit={{
opacity:0,
y:-15
}}

transition={{
duration:.5
}}

className="text-xs uppercase tracking-[0.35em] text-white"

>

{showcase.badge}

</motion.span>

</AnimatePresence>

          {/* Title */}
<div className="relative inline-block overflow-hidden">
<AnimatePresence mode="wait">

<motion.h2

key={current}

initial={{
opacity:0,
y:40
}}

animate={{
opacity:1,
y:0
}}

exit={{
opacity:0,
y:-40
}}

transition={{
duration:.7
}}

className="mx-auto mt-10 max-w-5xl text-6xl font-black leading-[1.05] tracking-tight text-white md:text-8xl"

>

{showcase.title}

</motion.h2>

</AnimatePresence>
<motion.div
  initial={{
    left: "-40px",
  }}
  animate={{
    left: "calc(100% + 40px)",
  }}
  transition={{
    duration: 2.5,
    ease: "linear",
    repeat: Infinity,
    repeatDelay: 1,
  }}
  className="absolute top-0 bottom-0 w-[2px] pointer-events-none"
>
  <div className="h-full w-full bg-[#FFD76A]" />

  <div className="absolute inset-0 w-[14px] -left-[6px] bg-[#FFD76A]/60 blur-md" />
</motion.div>
</div>
          {/* Subtitle */}

<AnimatePresence mode="wait">

<motion.p

key={current}

initial={{
opacity:0,
y:20
}}

animate={{
opacity:1,
y:0
}}

exit={{
opacity:0,
y:-20
}}

transition={{
duration:.6
}}

className="mx-auto mt-10 max-w-3xl text-lg leading-8 text-white/80"

>

{showcase.subtitle}

</motion.p>

</AnimatePresence>

          {/* CTA */}

          <motion.div
            initial={{
              opacity:0,
              y:30
            }}
            whileInView={{
              opacity:1,
              y:0
            }}
            viewport={{
              once:true
            }}
            transition={{
              delay:.55,
              duration:.8
            }}
            className="mt-14"
          >

            <Link
              to={showcase.buttonLink}
              className="group inline-flex items-center gap-3 rounded-full bg-primary px-10 py-4 font-medium text-white transition-all duration-500 hover:scale-105"
            >
              {showcase.buttonText}

              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />

            </Link>

          </motion.div>

        {/* Floating Luxury Card */}



        </div>

      </div>

    </section>
  );
}