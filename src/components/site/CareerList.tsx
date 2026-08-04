import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "@/lib/config";
import CareerCard from "./CareerCard";

type Career = {
  _id: string;
  title: string;
  department: string;
  location: string;
  employmentType: string;
  experience: string;
  isActive: boolean;
};

export default function CareerList() {
  const [careers, setCareers] = useState<Career[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCareers();
  }, []);

  const loadCareers = async () => {
    try {
      const { data } = await axios.get(
        `${API_URL}/api/careers`
      );

      setCareers(
        data.filter((career: Career) => career.isActive)
      );
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="mx-auto max-w-7xl px-5 py-20 md:px-8">
        <div className="text-center text-lg">
          Loading careers...
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-5 py-20 md:px-8">

      <div className="mb-12">

        <span className="text-sm uppercase tracking-[0.3em] text-primary">
          Open Positions
        </span>

        <h2 className="mt-4 text-5xl font-black text-primary">
          Current Opportunities
        </h2>

        <p className="mt-5 max-w-2xl text-stone-600">
          Explore our latest openings and become part of
          the Saatvik family.
        </p>

      </div>

      {careers.length === 0 ? (

        <div className="rounded-2xl border bg-white py-20 text-center">

          <h3 className="text-2xl font-semibold">
            No openings available right now.
          </h3>

          <p className="mt-3 text-stone-500">
            Please check back later.
          </p>

        </div>

      ) : (

        <div className="grid gap-8">

          {careers.map((career) => (

            <CareerCard
              key={career._id}
              career={career}
            />

          ))}

        </div>

      )}

    </section>
  );
}