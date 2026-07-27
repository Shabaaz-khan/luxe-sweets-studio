import { useState } from "react";
import { X } from "lucide-react";

type Props = {
  video: string;
  position?: "left" | "right";
};

export default function FloatingVideo({
  video,
  position = "right",
}: Props) {
  const [open, setOpen] = useState(true);

  if (!open || !video) return null;

  return (
    <div
      className={`fixed bottom-6 z-50 ${
        position === "right" ? "right-6" : "left-6"
      }`}
    >
      <div className="relative w-28 rounded-2xl overflow-hidden shadow-2xl bg-white">

        <button
          onClick={() => setOpen(false)}
          className="absolute top-2 right-2 z-10 bg-black/60 text-white rounded-full p-1"
        >
          <X size={14} />
        </button>

        <video
          src={video}
          autoPlay
          muted
          loop
          playsInline
          controls={false}
          className="w-full h-52 object-cover"
        />
      </div>
    </div>
  );
}