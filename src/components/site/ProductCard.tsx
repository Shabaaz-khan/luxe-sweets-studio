import type { Product } from "@/lib/menu";
import { SITE } from "@/lib/site";
import { motion } from "framer-motion";

export function ProductCard({ p, onOrder }: { p: Product; onOrder?: (p: Product) => void }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5 }}
      className="group tilt-3d tilt-3d-hover rounded-2xl bg-card border border-border overflow-hidden shadow-soft"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={p.image}
          alt={p.name}
          loading="lazy"
          width={800}
          height={600}
          className="w-full h-full object-cover transition-transform duration-[900ms] group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-burgundy-deep/40 via-transparent to-transparent" />
        {p.featured && (
          <span className="absolute top-3 left-3 rounded-full bg-gold text-primary text-[10px] tracking-[0.22em] uppercase px-3 py-1">
            Signature
          </span>
        )}
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-display text-2xl text-primary leading-tight">{p.name}</h3>
            {p.hindi && (
              <div className="mt-0.5 text-sm text-muted-foreground">{p.hindi}</div>
            )}
          </div>
          <div className="text-right shrink-0">
            <div className="font-display text-xl text-primary">
              {SITE.currency}{p.price}
            </div>
            <div className="text-[11px] tracking-widest uppercase text-muted-foreground">
              / {p.unit}
            </div>
          </div>
        </div>
        <p className="mt-3 text-sm text-foreground/70 leading-relaxed">{p.desc}</p>
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
