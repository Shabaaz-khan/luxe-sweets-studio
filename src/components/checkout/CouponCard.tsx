import { TicketPercent } from "lucide-react";
import { useState } from "react";
import { validateCoupon } from "@/api/api";
import { useCart } from "@/context/CartContext";
export default function CouponCard() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
const { applyCoupon: saveCoupon } = useCart();
const {
  subtotal,
  cartItems,
} = useCart();
const applyCoupon = async () => {
  if (!code.trim()) {
    setError("Please enter a coupon code.");
    setMessage("");
    return;
  }

  setLoading(true);
  setError("");
  setMessage("");

  try {
    const data = await validateCoupon({
      code: code.trim(),
      subtotal,
      items: cartItems.map(item => ({
        product: item.product._id,
        category: item.product.category?._id,
        quantity: item.qty,
      })),
    });

    saveCoupon({
      code: data.coupon.code,
      name: data.coupon.name,
      discountType: data.coupon.discountType,
      discountValue: data.coupon.discountValue,
      discount: data.discount,
      grandTotal: data.grandTotal,
    });

    setMessage(data.message || "Coupon Applied");
  } catch (err: any) {
    setError(
      err.response?.data?.error ||
      err.response?.data?.message ||
      "Failed to apply coupon."
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="rounded-3xl border border-border bg-card p-8 shadow-soft">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
          <TicketPercent className="w-6 h-6 text-primary" />
        </div>

        <div>
          <h2 className="font-display text-2xl text-primary">
            Coupon
          </h2>

          <p className="text-sm text-muted-foreground">
            Have a discount coupon?
          </p>
        </div>
      </div>

      <div className="flex gap-3">
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter coupon code"
          className="flex-1 rounded-xl border border-border px-4 py-3 outline-none focus:border-primary"
        />

        <button
          type="button"
          onClick={applyCoupon}
          disabled={loading}
          className="rounded-xl bg-primary text-primary-foreground px-6 py-3 font-medium hover:bg-burgundy-deep transition"
        >
          {loading ? "Checking..." : "Apply"}
        </button>
      </div>

      {message && (
        <p className="mt-3 text-green-600 text-sm">
          {message}
        </p>
      )}

      {error && (
        <p className="mt-3 text-red-600 text-sm">
          {error}
        </p>
      )}
    </div>
  );
}