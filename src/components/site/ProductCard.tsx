import type { Product } from "@/lib/menu";
import { SITE } from "@/lib/site";
import { motion, useMotionValue, useTransform } from "framer-motion";
import type { MouseEvent } from "react";

export function ProductCard({ p, onOrder }: { p: Product; onOrder?: (p: Product) => void }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotY = useTransform(mx, [-0.5, 0.5], [-8, 8]);
  const rotX = useTransform(my, [-0.5, 0.5], [6, -6]);

  const onMouse = (e: MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6 }}
      onMouseMove={onMouse}
      onMouseLeave={onLeave}
      style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }}
      className="group relative rounded-2xl bg-card border border-border overflow-hidden shadow-soft hover:shadow-luxe transition-shadow will-change-transform"
    >
      {/* gold gradient sheen on hover */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-gold/0 via-gold/0 to-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

      <div className="relative aspect-[4/3] overflow-hidden [transform:translateZ(30px)]">
        <img
          src={p.image}
          alt={p.name}
          loading="lazy"
          width={800}
          height={600}
          className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-burgundy-deep/60 via-transparent to-transparent" />
        {p.featured && (
          <span className="absolute top-3 left-3 rounded-full bg-gold text-primary text-[10px] tracking-[0.22em] uppercase px-3 py-1 shadow-soft">
            Signature
          </span>
        )}
        <div className="absolute bottom-3 right-3 rounded-full bg-cream/90 backdrop-blur text-primary px-3 py-1.5 text-sm font-display shadow-soft">
          {SITE.currency}{p.price}
          <span className="text-[10px] tracking-widest uppercase text-muted-foreground ml-1">/ {p.unit}</span>
        </div>
      </div>
      <div className="p-5 [transform:translateZ(20px)]">
        <h3 className="font-display text-2xl text-primary leading-tight">{p.name}</h3>
        {p.hindi && <div className="mt-0.5 text-sm text-muted-foreground">{p.hindi}</div>}
        <p className="mt-3 text-sm text-foreground/70 leading-relaxed line-clamp-2">{p.desc}</p>
        <button
          onClick={() => onOrder?.(p)}
          className="mt-5 w-full inline-flex items-center justify-center gap-2 rounded-full border border-primary/30 py-2.5 text-sm text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
        >
          Add to order
        </button>
      </div>
    </motion.article>
  );
}
