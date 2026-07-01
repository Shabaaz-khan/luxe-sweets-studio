import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { motion } from "framer-motion";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { SectionHeading } from "@/components/site/SectionHeading";
import { SITE } from "@/lib/site";
import corporateImg from "@/assets/corporate-gift.jpg";
import { CheckCircle2, Briefcase, Package, Sparkles } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/corporate")({
  head: () => ({
    meta: [
      { title: "Corporate Gifting — Saatvik Sweets & Savouries" },
      {
        name: "description",
        content:
          "Custom-branded corporate gift boxes, bulk mithai orders, and pan-India delivery from Saatvik.",
      },
      { property: "og:title", content: "Corporate Gifting — Saatvik" },
      {
        property: "og:description",
        content: "Custom-branded gift boxes, GST invoicing, delivery across 400+ cities.",
      },
    ],
  }),
  component: CorporatePage,
});

const inquirySchema = z.object({
  company: z.string().trim().min(2, "Company name is too short").max(120),
  contact: z.string().trim().min(2, "Please share your name").max(80),
  email: z.string().trim().email("Please enter a valid email").max(200),
  phone: z.string().trim().min(6, "Phone looks too short").max(20),
  quantity: z.string().trim().min(1, "Estimated quantity is required").max(40),
  eventDate: z.string().trim().max(40).optional().or(z.literal("")),
  budget: z.string().trim().max(60).optional().or(z.literal("")),
  message: z.string().trim().max(1200).optional().or(z.literal("")),
});

type Inquiry = z.infer<typeof inquirySchema>;

function CorporatePage() {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof Inquiry, string>>>({});
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const raw = Object.fromEntries(form.entries()) as Record<string, string>;
    const parsed = inquirySchema.safeParse(raw);
    if (!parsed.success) {
      const errs: Partial<Record<keyof Inquiry, string>> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof Inquiry;
        errs[key] = issue.message;
      }
      setErrors(errs);
      toast.error("Please check the highlighted fields");
      return;
    }
    setErrors({});
    setLoading(true);

    // Compose an email to the bakery's Gmail inbox with the inquiry details.
    const subject = `Corporate inquiry — ${parsed.data.company}`;
    const bodyLines = [
      `Company: ${parsed.data.company}`,
      `Contact: ${parsed.data.contact}`,
      `Email: ${parsed.data.email}`,
      `Phone: ${parsed.data.phone}`,
      `Estimated quantity: ${parsed.data.quantity}`,
      parsed.data.eventDate ? `Event date: ${parsed.data.eventDate}` : "",
      parsed.data.budget ? `Budget: ${parsed.data.budget}` : "",
      "",
      parsed.data.message || "",
    ]
      .filter(Boolean)
      .join("\n");

    // Open the user's mail client pre-filled. A backend submission endpoint
    // can be wired later without changing this UI.
    setTimeout(() => {
      window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines)}`;
      setSubmitted(true);
      setLoading(false);
    }, 400);
  };

  return (
    <div className="min-h-screen">
      <Nav />
      <main className="pt-28 md:pt-36">
        {/* Hero */}
        <section className="mx-auto max-w-7xl px-5 md:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHeading
              eyebrow="For teams & brands"
              title="Corporate gifting, done with taste."
              subtitle="Trusted by 120+ companies for Diwali, product launches, board rooms, and everyday appreciation."
            />
            <div className="mt-8 grid sm:grid-cols-3 gap-4">
              {[
                { Icon: Briefcase, label: "GST invoicing" },
                { Icon: Package, label: "Custom branding" },
                { Icon: Sparkles, label: "Dedicated manager" },
              ].map(({ Icon, label }) => (
                <div key={label} className="rounded-xl border border-border bg-card p-4 flex items-center gap-3">
                  <Icon size={18} className="text-gold" />
                  <span className="text-sm">{label}</span>
                </div>
              ))}
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="absolute -inset-6 bg-gradient-gold opacity-20 blur-3xl rounded-3xl" />
            <img
              src={corporateImg}
              alt="Saatvik custom-branded corporate gift box"
              width={1400}
              height={1000}
              className="relative rounded-3xl border border-gold/30 shadow-luxe"
            />
          </motion.div>
        </section>

        {/* Form */}
        <section className="mx-auto max-w-4xl px-5 md:px-8 py-24">
          <div className="rounded-3xl bg-card border border-border shadow-soft p-6 md:p-12">
            {submitted ? (
              <div className="text-center py-10">
                <CheckCircle2 className="mx-auto text-gold" size={44} />
                <h3 className="mt-4 font-display text-3xl text-primary">Inquiry sent</h3>
                <p className="mt-3 text-foreground/70 max-w-md mx-auto">
                  We've opened your mail client to send your inquiry to{" "}
                  <span className="text-primary">{SITE.email}</span>. Our team
                  replies within one business day.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm"
                >
                  Send another
                </button>
              </div>
            ) : (
              <>
                <div className="mb-8">
                  <div className="text-[11px] tracking-[0.3em] uppercase text-gold">Request a quote</div>
                  <h3 className="mt-2 font-display text-3xl md:text-4xl text-primary">Tell us about your order.</h3>
                  <p className="mt-2 text-foreground/70">
                    Share a few details — we'll reply with samples, pricing, and packaging options.
                  </p>
                </div>

                <form onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-2" noValidate>
                  <Field name="company" label="Company" error={errors.company} required />
                  <Field name="contact" label="Your name" error={errors.contact} required />
                  <Field name="email" label="Work email" type="email" error={errors.email} required />
                  <Field name="phone" label="Phone" type="tel" error={errors.phone} required />
                  <Field name="quantity" label="Estimated quantity (boxes)" error={errors.quantity} placeholder="e.g. 250 boxes" required />
                  <Field name="eventDate" label="Event date" type="date" error={errors.eventDate} />
                  <Field name="budget" label="Budget per box (optional)" error={errors.budget} placeholder="e.g. ₹1500 – ₹2500" />
                  <div className="sm:col-span-2">
                    <label className="text-xs tracking-widest uppercase text-muted-foreground">Anything else</label>
                    <textarea
                      name="message"
                      rows={4}
                      maxLength={1200}
                      placeholder="Branding needs, delivery cities, dietary requirements…"
                      className="mt-2 w-full rounded-xl bg-background border border-input px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                    {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message}</p>}
                  </div>

                  <div className="sm:col-span-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
                    <p className="text-xs text-muted-foreground max-w-md">
                      By submitting you agree to be contacted about your inquiry. We reply within one business day.
                    </p>
                    <button
                      type="submit"
                      disabled={loading}
                      className="inline-flex items-center gap-3 rounded-full bg-primary text-primary-foreground pl-6 pr-2 py-2 text-sm font-medium shadow-luxe hover:bg-burgundy-deep transition-colors disabled:opacity-60"
                    >
                      {loading ? "Sending…" : "Send inquiry"}
                      <span className="grid place-items-center w-9 h-9 rounded-full bg-gold text-primary">→</span>
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function Field({
  name,
  label,
  type = "text",
  error,
  placeholder,
  required,
}: {
  name: string;
  label: string;
  type?: string;
  error?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="text-xs tracking-widest uppercase text-muted-foreground">
        {label}{required && <span className="text-gold"> *</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        aria-invalid={!!error}
        className={`mt-2 w-full rounded-xl bg-background border px-4 py-3 outline-none focus:ring-2 focus:ring-primary/20 ${
          error ? "border-destructive" : "border-input focus:border-primary"
        }`}
      />
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}
