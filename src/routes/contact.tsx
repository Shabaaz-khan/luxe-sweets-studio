import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { SectionHeading } from "@/components/site/SectionHeading";
import CorporateInquiryForm from "@/components/site/CorporateInquiryForm";
import { useEffect, useState } from "react";
import { getContactPage } from "@/api/api";
export const Route = createFileRoute("/contact")({
  component: ContactPage,
});

function ContactPage() {
  const [page, setPage] = useState<any>(null);

useEffect(() => {
  async function load() {
    const data = await getContactPage();
    setPage(data);
  }

  load();
}, []);

if (!page) return null; // or a loading spinner
  return (
    <div className="min-h-screen">
      <Nav />

      <main className="pt-28">
<section className="relative h-[350px] overflow-hidden">
  <img
    src={page.hero.image}
    alt={page.hero.title}
    className="absolute inset-0 h-full w-full object-cover"
  />

  <div className="absolute inset-0 " />

  <div className="relative z-10 flex h-full items-center justify-center">
    <div className="text-center text-white">
      {/* <h1 className="text-5xl font-bold">
        {page.hero.title}
      </h1>

      <p className="mt-4 text-lg">
        {page.hero.subtitle}
      </p> */}
    </div>
  </div>
</section>
        <section className="mx-auto max-w-7xl px-5 md:px-8">
<SectionHeading
  eyebrow={page.form.label}
  title={page.hero.title}
  subtitle={page.hero.subtitle}
/>
        </section>

<section className="mx-auto max-w-7xl px-5 md:px-8 py-20">

  <div className="overflow-hidden rounded-3xl border border-border shadow-soft">

    <div className="grid lg:grid-cols-2">

      <div className="hidden lg:block">

        <img
          src={page.form.image}
          alt={page.form.title}
          className="h-full w-full object-cover"
        />

      </div>

      <CorporateInquiryForm
        page={{
          formLabel: page.form.label,
          formTitle: page.form.title,
          formDescription: page.form.description,
        }}
      />

    </div>

  </div>

</section>

      </main>

      <Footer />
    </div>
  );
}