import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { SectionHeading } from "@/components/site/SectionHeading";
import CorporateInquiryForm from "@/components/site/CorporateInquiryForm";

import { getCorporatePage } from "@/api/api";

import {
  Briefcase,
  Package,
  Sparkles,
} from "lucide-react";

export const Route = createFileRoute("/corporate")({
  head: () => ({
    meta: [
      {
        title: "Corporate Gifting — Saatvik Sweets & Savouries",
      },
      {
        name: "description",
        content:
          "Custom-branded corporate gift boxes, bulk mithai orders, and pan-India delivery from Saatvik.",
      },
      {
        property: "og:title",
        content: "Corporate Gifting — Saatvik",
      },
      {
        property: "og:description",
        content:
          "Custom-branded gift boxes, GST invoicing, delivery across 400+ cities.",
      },
    ],
  }),
  component: CorporatePage,
});

function CorporatePage() {
  const [page, setPage] = useState<any>(null);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    try {
      const data = await getCorporatePage();
      setPage(data);
    } catch (err) {
      console.error(err);
    }
  }

  if (!page) return null;

  const icons: Record<string, any> = {
    Briefcase,
    Package,
    Sparkles,
  };

  return (
    <div className="min-h-screen">
      <Nav />

      <main className="pt-28 md:pt-36">

        <section className="mx-auto max-w-7xl px-5 md:px-8 grid lg:grid-cols-2 gap-12 items-center">

          <div>

            <SectionHeading
              eyebrow={page.eyebrow}
              title={page.title}
              subtitle={page.subtitle}
            />

            <div className="mt-8 grid sm:grid-cols-3 gap-4">

              {page.features?.map((feature: any) => {

                const Icon =
                  icons[feature.icon] ?? Briefcase;

                return (
                  <div
                    key={feature.title}
                    className="rounded-xl border border-border bg-card p-4 flex items-center gap-3"
                  >
                    <Icon
                      size={18}
                      className="text-gold"
                    />

                    <span className="text-sm">
                      {feature.title}
                    </span>
                  </div>
                );
              })}

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
              src={page.heroImage}
              alt="Corporate Gifting"
              className="relative rounded-3xl border border-gold/30 shadow-luxe"
            />
          </motion.div>

        </section>

        <section className="mx-auto max-w-4xl px-5 md:px-8 py-24">

          <CorporateInquiryForm page={page} />

        </section>

      </main>

      <Footer />

    </div>
  );
}