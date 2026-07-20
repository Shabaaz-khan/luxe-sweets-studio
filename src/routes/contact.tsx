import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { SectionHeading } from "@/components/site/SectionHeading";
import CorporateInquiryForm from "@/components/site/CorporateInquiryForm";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
});
const contactPage = {
  formLabel: "Contact Us",
  formTitle: "Get in Touch",
  formDescription:
    "Fill out the form below and our team will contact you shortly.",
};


function ContactPage() {
  return (
    <div className="min-h-screen">
      <Nav />

      <main className="pt-28 md:pt-36">

        <section className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeading
            eyebrow="Contact Us"
            title="Get in Touch"
            subtitle="We'd love to hear from you. Fill out the form below and our team will contact you soon."
          />
        </section>

        <section className="mx-auto max-w-4xl px-5 md:px-8 py-20">
<CorporateInquiryForm page={contactPage} />
        </section>

      </main>

      <Footer />
    </div>
  );
}