import { useEffect, useState } from "react";
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
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showModal]);

  if (!open || !video) return null;

  return (
    <>
      {/* Floating Video */}
      <div
        className={`fixed bottom-6 z-50 ${
          position === "right" ? "right-6" : "left-6"
        }`}
      >
        <div className="relative w-28 overflow-hidden rounded-2xl bg-white shadow-2xl">
          <button
            onClick={() => setOpen(false)}
            className="absolute top-2 right-2 z-10 rounded-full bg-black/60 p-1 text-white"
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
            onClick={() => setShowModal(true)}
            className="h-52 w-full cursor-pointer object-cover"
          />
        </div>
      </div>

      {/* Fullscreen Modal */}
      {showModal && (
  <div
  className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-sm p-6"
  onClick={() => setShowModal(false)}
>
          <div
            className="relative w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowModal(false)}
className="absolute top-4 right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md hover:bg-black"            >
              <X size={24} />
            </button>

<video
  src={video}
  controls
  autoPlay
  className="w-full max-h-[90vh] rounded-3xl bg-black object-contain"
/>
          </div>
        </div>
      )}
    </>
  );
}