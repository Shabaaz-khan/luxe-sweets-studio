import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { SectionHeading } from "@/components/site/SectionHeading";
import { ProductCard } from "@/components/site/ProductCard";
import { categories, products, type Product } from "@/lib/menu";
import { SITE } from "@/lib/site";
import { ShoppingBag, Minus, Plus, X } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "The Menu — Saatvik Sweets & Savouries" },
      {
        name: "description",
        content:
          "Explore Saatvik's full menu of handcrafted Indian sweets, freshly roasted savouries, and gift hampers.",
      },
      { property: "og:title", content: "The Menu — Saatvik Sweets & Savouries" },
      {
        property: "og:description",
        content: "Handcrafted mithai, roasted namkeen, and luxury hampers.",
      },
    ],
  }),
  component: MenuPage,
});

type Filter = "all" | (typeof categories)[number]["id"];

function MenuPage() {
  const [filter, setFilter] = useState<Filter>("all");
  const [cart, setCart] = useState<Record<string, number>>({});
  const [open, setOpen] = useState(false);

  const list = useMemo(
    () => (filter === "all" ? products : products.filter((p) => p.category === filter)),
    [filter],
  );

  const cartItems = useMemo(
    () =>
      Object.entries(cart)
        .map(([id, qty]) => ({ product: products.find((p) => p.id === id)!, qty }))
        .filter((i) => i.product && i.qty > 0),
    [cart],
  );
  const subtotal = cartItems.reduce((s, i) => s + i.product.price * i.qty, 0);

  const addToCart = (p: Product) => {
    setCart((c) => ({ ...c, [p.id]: (c[p.id] || 0) + 1 }));
    toast.success(`Added ${p.name}`, { description: `${SITE.currency}${p.price} · ${p.unit}` });
  };
  const setQty = (id: string, qty: number) => {
    setCart((c) => {
      const next = { ...c };
      if (qty <= 0) delete next[id];
      else next[id] = qty;
      return next;
    });
  };

  const checkout = () => {
    if (cartItems.length === 0) return;
    toast.info("Checkout coming online shortly", {
      description:
        "Secure card payments are being connected. Your order has been saved — we'll message you.",
    });
  };

  return (
    <div className="min-h-screen">
      <Nav />
      <main className="pt-28 md:pt-36">
        <section className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeading
            eyebrow="The Menu"
            title="Every counter, every craft."
            subtitle="Prices per portion. Items are packed the day of dispatch to preserve freshness."
          />

          {/* Filter chips */}
          <div className="mt-10 flex flex-wrap items-center gap-3">
            {(["all", ...categories.map((c) => c.id)] as Filter[]).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-full px-5 py-2 text-sm tracking-wide border transition-colors ${
                  filter === f
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-transparent text-primary border-primary/25 hover:bg-primary/5"
                }`}
              >
                {f === "all" ? "Everything" : categories.find((c) => c.id === f)?.label}
              </button>
            ))}
            <div className="ml-auto">
              <button
                onClick={() => setOpen(true)}
                className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-sm shadow-soft"
              >
                <ShoppingBag size={16} />
                Cart · {cartItems.reduce((s, i) => s + i.qty, 0)}
              </button>
            </div>
          </div>

          {/* Grid */}
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {list.map((p) => (
              <ProductCard key={p.id} p={p} onOrder={addToCart} />
            ))}
          </div>
        </section>
      </main>

      {/* Cart drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[60] bg-burgundy-deep/50 backdrop-blur-sm"
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
              className="fixed right-0 top-0 bottom-0 z-[70] w-full sm:max-w-md bg-cream flex flex-col shadow-luxe"
            >
              <header className="flex items-center justify-between p-6 border-b border-border">
                <div className="font-display text-2xl text-primary">Your order</div>
                <button onClick={() => setOpen(false)} className="p-2 rounded-full hover:bg-secondary">
                  <X size={18} />
                </button>
              </header>

              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {cartItems.length === 0 && (
                  <div className="text-sm text-muted-foreground">Your order is empty. Add a signature to begin.</div>
                )}
                {cartItems.map((i) => (
                  <div key={i.product.id} className="flex gap-4 rounded-xl bg-card border border-border p-3">
                    <img src={i.product.image} alt="" className="w-16 h-16 object-cover rounded-lg" />
                    <div className="flex-1">
                      <div className="font-display text-lg text-primary leading-tight">{i.product.name}</div>
                      <div className="text-xs text-muted-foreground">{SITE.currency}{i.product.price} · {i.product.unit}</div>
                      <div className="mt-2 inline-flex items-center gap-1 rounded-full border border-border">
                        <button onClick={() => setQty(i.product.id, i.qty - 1)} className="p-1.5"><Minus size={14} /></button>
                        <span className="min-w-6 text-center text-sm">{i.qty}</span>
                        <button onClick={() => setQty(i.product.id, i.qty + 1)} className="p-1.5"><Plus size={14} /></button>
                      </div>
                    </div>
                    <div className="font-display text-primary">{SITE.currency}{i.product.price * i.qty}</div>
                  </div>
                ))}
              </div>

              <footer className="p-6 border-t border-border space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">{SITE.currency}{subtotal}</span>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Shipping & taxes</span>
                  <span>Calculated at checkout</span>
                </div>
                <button
                  onClick={checkout}
                  disabled={cartItems.length === 0}
                  className="w-full rounded-full bg-primary text-primary-foreground py-3.5 text-sm font-medium hover:bg-burgundy-deep transition-colors disabled:opacity-50 shadow-soft"
                >
                  Secure checkout →
                </button>
                <p className="text-[11px] text-muted-foreground text-center">
                  Card, UPI and net-banking accepted at checkout.
                </p>
              </footer>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
