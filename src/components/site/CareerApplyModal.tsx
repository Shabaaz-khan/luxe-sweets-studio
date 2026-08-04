import { useState } from "react";
import axios from "axios";
import { API_URL } from "@/lib/config";
import { toast } from "sonner";
type Props = {
  open: boolean;
  onClose: () => void;
  careerId: string;
};

export default function CareerApplyModal({
  open,
  onClose,
  careerId,
}: Props) {
const [form, setForm] = useState({
  fullName: "",
  email: "",
  phone: "",
  currentLocation: "",
  experience: "",
  coverLetter: "",
  resume: "",
});

const [uploadingResume, setUploadingResume] = useState(false);

  if (!open) return null;
const handleResumeUpload = async (
  e: React.ChangeEvent<HTMLInputElement>
) => {
  const file = e.target.files?.[0];

  if (!file) return;

  try {
    setUploadingResume(true);

    const formData = new FormData();

    // IMPORTANT
    formData.append("image", file);

    // Optional folder
    formData.append("folder", "careers");

    const { data } = await axios.post(
      `${API_URL}/api/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    setForm((prev) => ({
      ...prev,
      resume: data.imageUrl,
    }));
toast.success("Resume uploaded successfully!");
  } catch (err) {
   console.log(err);

toast.error("Resume upload failed", {
  description: "Please try again.",
});
  } finally {
    setUploadingResume(false);
  }
};
  const submitApplication = async () => {
    try {
      await axios.post(
        `${API_URL}/api/career-applications`,
        {
          career: careerId,
          ...form,
        }
      );

    toast.success("Application submitted successfully!", {
  description: "Our HR team will review your application and contact you soon.",
});

      onClose();

      setForm({
        fullName: "",
        email: "",
        phone: "",
        currentLocation: "",
        experience: "",
        coverLetter: "",
        resume: "",
      });

    } catch (err) {
  console.log(err);

  toast.error("Failed to submit application", {
    description: "Please try again.",
  });
}
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/40">

      <div className="flex min-h-screen items-center justify-center p-6">

        <div className="w-full max-w-2xl rounded-3xl bg-white p-8">

          <div className="mb-8 flex items-center justify-between">

            <h2 className="text-3xl font-bold">
              Apply Now
            </h2>

            <button
              onClick={onClose}
              className="text-3xl"
            >
              ×
            </button>

          </div>

          <div className="grid gap-5">

            <input
              className="input"
              placeholder="Full Name"
              value={form.fullName}
              onChange={(e) =>
                setForm({
                  ...form,
                  fullName: e.target.value,
                })
              }
            />

            <input
              className="input"
              placeholder="Email"
              value={form.email}
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value,
                })
              }
            />

            <input
              className="input"
              placeholder="Phone"
              value={form.phone}
              onChange={(e) =>
                setForm({
                  ...form,
                  phone: e.target.value,
                })
              }
            />

            <input
              className="input"
              placeholder="Current Location"
              value={form.currentLocation}
              onChange={(e) =>
                setForm({
                  ...form,
                  currentLocation: e.target.value,
                })
              }
            />

            <input
              className="input"
              placeholder="Experience"
              value={form.experience}
              onChange={(e) =>
                setForm({
                  ...form,
                  experience: e.target.value,
                })
              }
            />

<div>

  <label className="mb-2 block font-semibold">
    Resume
  </label>

  <input
    type="file"
    accept=".pdf,.doc,.docx"
    onChange={handleResumeUpload}
    className="input"
  />

  {uploadingResume && (
    <p className="mt-2 text-primary">
      Uploading Resume...
    </p>
  )}

  {!uploadingResume && form.resume && (
    <p className="mt-2 text-green-600">
      ✓ Resume uploaded successfully
    </p>
  )}

</div>

            <textarea
              rows={5}
              className="input"
              placeholder="Cover Letter"
              value={form.coverLetter}
              onChange={(e) =>
                setForm({
                  ...form,
                  coverLetter: e.target.value,
                })
              }
            />
<button
  disabled={uploadingResume}
  onClick={submitApplication}
              className="rounded-xl bg-primary py-4 text-lg font-semibold text-white"
            >
              Submit Application
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}