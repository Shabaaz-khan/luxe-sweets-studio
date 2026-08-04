console.log("careers.$id.tsx loaded");
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "@/lib/config";
import { Nav } from "@/components/site/Nav";
import CareerApplyModal from "@/components/site/CareerApplyModal";
import { Footer } from "@/components/site/Footer";
import { MapPin, Briefcase, Clock, IndianRupee } from "lucide-react";

export const Route = createFileRoute("/careers/$id")({
  component: CareerDetails,
});

function CareerDetails() {
  const { id } = Route.useParams();

  const [career, setCareer] = useState<any>(null);
const [openApply, setOpenApply] = useState(false);
  useEffect(() => {
    loadCareer();
  }, [id]);

  const loadCareer = async () => {
    try {
      const { data } = await axios.get(
        `${API_URL}/api/careers/${id}`
      );

      setCareer(data);
    } catch (err) {
      console.log(err);
    }
  };

  if (!career) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen ">

      <Nav />

      <main className="mx-auto max-w-7xl px-5 py-24 md:px-8">

        <span className="rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
          {career.department}
        </span>

        <h1 className="mt-6 text-5xl font-black text-primary">
          {career.title}
        </h1>

        <div className="mt-8 flex flex-wrap gap-6 text-stone-600">

          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            {career.location}
          </div>

          <div className="flex items-center gap-2">
            <Briefcase className="h-5 w-5" />
            {career.employmentType}
          </div>

          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            {career.experience}
          </div>

          <div className="flex items-center gap-2">
            <IndianRupee className="h-5 w-5" />
            {career.salary}
          </div>

        </div>

        <div className="mt-12 space-y-10">

          <section>

            <h2 className="mb-4 text-2xl font-bold">
              Job Description
            </h2>

            <p className="leading-8 text-stone-600">
              {career.description}
            </p>

          </section>

          <section>

            <h2 className="mb-4 text-2xl font-bold">
              Responsibilities
            </h2>

            <ul className="list-disc space-y-3 pl-6">

              {career.responsibilities.map(
                (item: string, index: number) => (
                  <li key={index}>{item}</li>
                )
              )}

            </ul>

          </section>

          <section>

            <h2 className="mb-4 text-2xl font-bold">
              Requirements
            </h2>

            <ul className="list-disc space-y-3 pl-6">

              {career.requirements.map(
                (item: string, index: number) => (
                  <li key={index}>{item}</li>
                )
              )}

            </ul>

          </section>

          <section>

            <h2 className="mb-4 text-2xl font-bold">
              Benefits
            </h2>

            <ul className="list-disc space-y-3 pl-6">

              {career.benefits.map(
                (item: string, index: number) => (
                  <li key={index}>{item}</li>
                )
              )}

            </ul>

          </section>

       <button
  onClick={() => setOpenApply(true)}
  className="rounded-full bg-primary px-8 py-4 text-lg font-semibold text-white hover:opacity-90"
>
  Apply Now
</button>

        </div>

      </main>
<CareerApplyModal
  open={openApply}
  onClose={() => setOpenApply(false)}
  careerId={career._id}
/>
      <Footer />

    </div>
  );
}