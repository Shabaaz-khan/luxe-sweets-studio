import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, X } from "lucide-react";
import { API_URL } from "@/lib/config";
import { SITE } from "@/lib/site";
import type { CartItem } from "@/context/CartContext";
import { useNavigate } from "@tanstack/react-router";
type CartDrawerProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  cartItems: CartItem[];
  subtotal: number;
  setQty: (
    productId: string,
    weight: string,
    qty: number
  ) => void;
  changeVariant: (
    productId: string,
    weight: string
  ) => void;
  checkout: () => void;
};

export default function CartDrawer({
  open,
  setOpen,
  cartItems,
  subtotal,
  setQty,
  changeVariant,
  checkout,
}: CartDrawerProps) {
  const navigate = useNavigate();
  return (
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
  transition={{
    type: "tween",
    duration: 0.35,
    ease: [0.2, 0.8, 0.2, 1],
  }}
  className="fixed inset-y-0 right-0 z-[70] w-full sm:w-[430px] bg-cream flex flex-col overflow-hidden shadow-luxe"
>
            {/* Header */}
            <header className="flex items-center justify-between p-6 border-b border-border">
              <div className="font-display text-2xl text-primary">
                Your Order
              </div>

              <button
                onClick={() => setOpen(false)}
                className="p-2 rounded-full hover:bg-secondary"
              >
                <X size={18} />
              </button>
            </header>

            {/* Body */}
            <div   className="flex-1 min-h-0 overflow-y-auto p-6 space-y-4"
>
              {cartItems.length === 0 && (
                <div className="text-sm text-muted-foreground">
                  Your order is empty. Add a signature to begin.
                </div>
              )}

              {cartItems.map((i) => (
                <div
                  key={`${i.product._id}-${i.selectedVariant.weight}`}
                  className="rounded-xl bg-card border border-border p-4"
                >
                  {/* Product */}
                  <div className="flex gap-4">
                  <img
  src={i.product.imageUrl}
  alt={i.product.name}
                      className="w-20 h-20 rounded-lg object-cover"
                    />

                    <div className="flex-1">
                      <h3 className="font-display text-lg text-primary">
                        {i.product.name}
                      </h3>

                      <p className="text-sm text-muted-foreground mt-1">
                        Selected :
                        <span className="ml-1 font-medium text-primary">
                          {i.selectedVariant.weight}
                        </span>
                        {" • "}
                        {SITE.currency}
                        {i.selectedVariant.price}
                      </p>
                    </div>
                  </div>

                  {/* Weight Selection */}
<div className="mt-6">
  <h3 className="text-sm font-semibold mb-3">
    Select Size
  </h3>

  <div className="flex flex-wrap gap-3">
    {i.product.variants.map((variant) => {
      const active =
        i.selectedVariant.weight === variant.weight;

      return (
        <button
          key={variant.weight}
          type="button"
          onClick={() =>
            changeVariant(
              i.product._id,
              variant.weight
            )
          }
          className={`rounded-2xl px-5 py-4 min-w-[90px] transition-all duration-200 ${
            active
              ? "bg-primary text-white shadow-lg"
              : "bg-stone-100 hover:bg-stone-200 text-stone-700"
          }`}
        >
          <div className="font-semibold text-base">
            {variant.weight} /            {SITE.currency}
            {variant.price}
          </div>

          {/* <div
            className={`text-sm mt-1 ${
              active
                ? "text-white/90"
                : "text-stone-500"
            }`}
          >

          </div> */}
        </button>
      );
    })}
  </div>
</div>

                  {/* Quantity */}
                  <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                    <div className="inline-flex items-center rounded-full border border-border overflow-hidden">
                      <button
                        onClick={() =>
                          setQty(
                            i.product._id,
                            i.selectedVariant.weight,
                            i.qty - 1
                          )
                        }
                        className="p-2 hover:bg-secondary"
                      >
                        <Minus size={16} />
                      </button>

                      <span className="px-4 text-sm font-medium">
                        {i.qty}
                      </span>

                      <button
                        onClick={() =>
                          setQty(
                            i.product._id,
                            i.selectedVariant.weight,
                            i.qty + 1
                          )
                        }
                        className="p-2 hover:bg-secondary"
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">
                        Total
                      </p>

                      <p className="font-display text-xl text-primary">
                        {SITE.currency}
                        {i.selectedVariant.price * i.qty}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <footer className="p-6 border-t border-border space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  Subtotal
                </span>

                <span className="font-medium">
                  {SITE.currency}
                  {subtotal}
                </span>
              </div>

              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Shipping & taxes</span>
                <span>Calculated at checkout</span>
              </div>

              <button
                onClick={() => {
  setOpen(false);

  navigate({
    to: "/checkout",
  });
}}
                disabled={cartItems.length === 0}
                className="w-full rounded-full bg-primary text-primary-foreground py-3.5 text-sm font-medium hover:bg-burgundy-deep transition-colors disabled:opacity-50 shadow-soft"
              >
                Secure Checkout →
              </button>

              <p className="text-[11px] text-center text-muted-foreground">
                Card, UPI and Net Banking accepted at checkout.
              </p>
            </footer>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}