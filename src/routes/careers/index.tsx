import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import CareerHero from "@/components/site/CareerHero";
import CareerList from "@/components/site/CareerList";

export const Route = createFileRoute("/careers/")({
  component: CareersPage,
});

function CareersPage() {
  return (
    <div className="min-h-screen">

      <Nav />

      <main className="pt-20">

        <CareerHero />

        <CareerList />

      </main>

      <Footer />

    </div>
  );
}