import { useState } from "react";
import { z } from "zod";
import { CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

import { SITE } from "@/lib/site";
import { submitCorporateInquiry } from "@/api/api";

type Props = {
  page: any;
};

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

export default function CorporateInquiryForm({ page }: Props) {
  const [submitted, setSubmitted] = useState(false);

  const [errors, setErrors] = useState<
    Partial<Record<keyof Inquiry, string>>
  >({});

  const [loading, setLoading] = useState(false);

  const onSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const formElement = e.currentTarget;

    const form = new FormData(formElement);

    const raw = Object.fromEntries(
      form.entries()
    ) as Record<string, string>;

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

    try {
      await submitCorporateInquiry(parsed.data);

      toast.success("Inquiry submitted successfully");

      formElement.reset();

      setSubmitted(true);
    } catch (err: any) {
      toast.error(
        err?.response?.data?.error ||
          err?.message ||
          "Unable to submit inquiry"
      );
    }

    setLoading(false);
  };

  return (
    <div className="rounded-3xl bg-card border border-border shadow-soft p-6 md:p-12">

      {submitted ? (

        <div className="text-center py-10">

          <CheckCircle2
            className="mx-auto text-gold"
            size={44}
          />

          <h3 className="mt-4 font-display text-3xl text-primary">
            Inquiry sent
          </h3>

          <p className="mt-3 text-foreground/70 max-w-md mx-auto">
            We've received your inquiry.

            Our team will contact you shortly.

            You can also reach us at{" "}

            <span className="text-primary">
              {SITE.email}
            </span>

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

            <div className="text-[11px] tracking-[0.3em] uppercase text-gold">

              {page.formLabel}

            </div>

            <h3 className="mt-2 font-display text-3xl md:text-4xl text-primary">

              {page.formTitle}

            </h3>

            <p className="mt-2 text-foreground/70">

              {page.formDescription}

            </p>

          </div>

          <form
            onSubmit={onSubmit}
            className="grid gap-5 sm:grid-cols-2"
            noValidate
          >
                        <Field
              name="company"
              label="Company"
              error={errors.company}
              required
            />

            <Field
              name="contact"
              label="Your Name"
              error={errors.contact}
              required
            />

            <Field
              name="email"
              label="Work Email"
              type="email"
              error={errors.email}
              required
            />

            <Field
              name="phone"
              label="Phone"
              type="tel"
              error={errors.phone}
              required
            />

            <Field
              name="quantity"
              label="Estimated Quantity (Boxes)"
              error={errors.quantity}
              placeholder="e.g. 250 Boxes"
              required
            />

            <Field
              name="eventDate"
              label="Event Date"
              type="date"
              error={errors.eventDate}
            />

            <Field
              name="budget"
              label="Budget Per Box"
              error={errors.budget}
              placeholder="₹500 - ₹1000"
            />

            <div className="sm:col-span-2">

              <label className="text-xs tracking-widest uppercase text-muted-foreground">
                Anything Else
              </label>

              <textarea
                name="message"
                rows={4}
                maxLength={1200}
                placeholder="Branding requirements, delivery locations, custom packaging..."
                className="mt-2 w-full rounded-xl bg-background border border-input px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />

              {errors.message && (
                <p className="mt-1 text-xs text-destructive">
                  {errors.message}
                </p>
              )}

            </div>

            <div className="sm:col-span-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">

              <p className="text-xs text-muted-foreground max-w-md">
                By submitting this form you agree to be contacted regarding your enquiry.
              </p>

              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center gap-3 rounded-full bg-primary text-primary-foreground pl-6 pr-2 py-2 text-sm font-medium shadow-luxe hover:bg-burgundy-deep transition-colors disabled:opacity-60"
              >
                {loading ? "Sending..." : "Send Inquiry"}

                <span className="grid place-items-center w-9 h-9 rounded-full bg-gold text-primary">
                  →
                </span>

              </button>

            </div>

          </form>

        </>

      )}

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

      <label
        htmlFor={name}
        className="text-xs tracking-widest uppercase text-muted-foreground"
      >
        {label}

        {required && (
          <span className="text-gold">
            {" "}*
          </span>
        )}

      </label>

      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        aria-invalid={!!error}
        className={`mt-2 w-full rounded-xl bg-background border px-4 py-3 outline-none focus:ring-2 focus:ring-primary/20 ${
          error
            ? "border-destructive"
            : "border-input focus:border-primary"
        }`}
      />

      {error && (
        <p className="mt-1 text-xs text-destructive">
          {error}
        </p>
      )}

    </div>
  );
}