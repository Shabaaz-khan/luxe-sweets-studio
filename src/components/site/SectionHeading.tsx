import { motion } from "framer-motion";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "text-center max-w-2xl mx-auto" : "max-w-2xl"}>
      {eyebrow && (
        <div className="inline-flex items-center gap-3 text-[11px] tracking-[0.3em] uppercase text-gold">
          <span className="w-8 h-px bg-gold/60" />
          {eyebrow}
          <span className="w-8 h-px bg-gold/60" />
        </div>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mt-4 font-display text-4xl md:text-5xl text-primary text-balance"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <p className={`mt-4 text-foreground/70 leading-relaxed ${align === "center" ? "" : "max-w-xl"}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
