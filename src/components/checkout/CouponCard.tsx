import { TicketPercent } from "lucide-react";

export default function CouponCard() {
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
          placeholder="Enter coupon code"
          className="flex-1 rounded-xl border border-border px-4 py-3 outline-none focus:border-primary"
        />

        <button
          type="button"
          className="rounded-xl bg-primary text-primary-foreground px-6 py-3 font-medium hover:bg-burgundy-deep transition"
        >
          Apply
        </button>

      </div>

    </div>
  );
}