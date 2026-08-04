import { Link } from "@tanstack/react-router";
import { MapPin, Briefcase, Clock } from "lucide-react";
import { motion } from "framer-motion";

type Props = {
  career: {
    _id: string;
    title: string;
    department: string;
    location: string;
    employmentType: string;
    experience: string;
  };
};

export default function CareerCard({
  career,
}: Props) {
     console.log(career);
  return (
    <motion.div
      whileHover={{
        y: -6,
      }}
      transition={{
        duration: 0.3,
      }}
      className="rounded-3xl border border-stone-200 bg-white p-8 shadow-sm transition-all hover:shadow-xl"
    >
      <div className="mb-4 inline-flex rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
        {career.department}
      </div>

      <h2 className="text-3xl font-bold text-primary">
        {career.title}
      </h2>

      <div className="mt-6 flex flex-wrap gap-5 text-sm text-stone-600">

        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4" />
          {career.location}
        </div>

        <div className="flex items-center gap-2">
          <Briefcase className="h-4 w-4" />
          {career.employmentType}
        </div>

        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4" />
          {career.experience}
        </div>

      </div>

      <Link
        to="/careers/$id"
        params={{
          id: career._id,
        }}
        className="mt-8 inline-flex rounded-full bg-primary px-7 py-3 font-semibold text-white transition hover:opacity-90"
      >
        View Details
      </Link>
    </motion.div>
  );
}