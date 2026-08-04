import { motion } from "framer-motion";

export default function CareerHero() {
  return (
    <section className="relative overflow-hidden bg-[rgb(126,0,62)] py-24 text-white">

      <div className="mx-auto max-w-7xl px-5 md:px-8">

        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.8,
          }}
          className="max-w-3xl"
        >

          <span className="text-sm uppercase tracking-[0.35em] text-yellow-300">
            Careers
          </span>

          <h1 className="mt-5 text-5xl md:text-7xl font-black leading-tight">
            Join The Saatvik Family
          </h1>

          <p className="mt-8 text-lg leading-9 text-white/80">
            We are always looking for passionate people who want to
            build something meaningful. Explore exciting opportunities
            and grow your career with us.
          </p>

        </motion.div>

      </div>

    </section>
  );
}