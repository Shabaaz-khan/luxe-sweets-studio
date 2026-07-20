import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { getLegalPage } from "../api/api";

import { Nav } from "@/components/site/Nav";
import {Footer} from "@/components/site/Footer";

export const Route = createFileRoute("/terms")({
  component: TermsPage,
});

function TermsPage() {
  const [loading, setLoading] = useState(true);

  const [terms, setTerms] = useState({
    title: "",
    content: "",
  });

  useEffect(() => {
    load();
  }, []);

  async function load() {
    try {
      const data = await getLegalPage();

      setTerms(
        data.terms || {
          title: "",
          content: "",
        }
      );
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="container py-20 text-center">
        Loading...
      </div>
    );
  }

  return (
    <>
      <Nav />

      <section className="container py-16">

        <div className="max-w-5xl mx-auto">

          <h1 className="text-4xl font-bold mb-8">
            {terms.title}
          </h1>

          <div className="whitespace-pre-wrap leading-8 text-stone-700">
            {terms.content}
          </div>

        </div>

      </section>

      <Footer />
    </>
  );
}