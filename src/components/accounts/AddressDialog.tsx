import { useEffect, useState } from "react";
import {
  createAddress,
  updateAddress,
} from "@/api/api";

type Address = {
  _id?: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address1: string;
  address2: string;
  landmark: string;
  city: string;
  state: string;
  pincode: string;
  label: string;
  isDefault: boolean;
};

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  address: Address | null;
  onSuccess: () => void;
};

const emptyAddress: Address = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  address1: "",
  address2: "",
  landmark: "",
  city: "",
  state: "",
  pincode: "",
  label: "Home",
  isDefault: false,
};

export default function AddressDialog({
  open,
  onOpenChange,
  address,
  onSuccess,
}: Props) {
  const [form, setForm] = useState<Address>(emptyAddress);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (address) {
      setForm(address);
    } else {
      setForm(emptyAddress);
    }
  }, [address, open]);

  if (!open) return null;

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    try {
      setSaving(true);

      if (address?._id) {
        await updateAddress(address._id, form);
      } else {
        await createAddress(form);
      }

      onSuccess();
      onOpenChange(false);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  }

  return (
 <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 p-5">

  <div className="flex min-h-full items-center justify-center">

    <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white shadow-xl">

        <div className="flex items-center justify-between border-b p-6">

          <h2 className="text-2xl font-bold">
            {address ? "Edit Address" : "Add Address"}
          </h2>

          <button
            onClick={() => onOpenChange(false)}
            className="text-2xl"
          >
            ×
          </button>

        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
                      <div className="grid gap-5 md:grid-cols-2">

            <div>
              <label className="mb-2 block text-sm font-medium">
                First Name
              </label>

              <input
                value={form.firstName}
                onChange={(e) =>
                  setForm({
                    ...form,
                    firstName: e.target.value,
                  })
                }
                className="w-full rounded-xl border px-4 py-3 outline-none focus:border-primary"
                placeholder="First Name"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Last Name
              </label>

              <input
                value={form.lastName}
                onChange={(e) =>
                  setForm({
                    ...form,
                    lastName: e.target.value,
                  })
                }
                className="w-full rounded-xl border px-4 py-3 outline-none focus:border-primary"
                placeholder="Last Name"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Phone
              </label>

              <input
                value={form.phone}
                onChange={(e) =>
                  setForm({
                    ...form,
                    phone: e.target.value,
                  })
                }
                className="w-full rounded-xl border px-4 py-3 outline-none focus:border-primary"
                placeholder="Phone Number"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Email
              </label>

              <input
                type="email"
                value={form.email}
                onChange={(e) =>
                  setForm({
                    ...form,
                    email: e.target.value,
                  })
                }
                className="w-full rounded-xl border px-4 py-3 outline-none focus:border-primary"
                placeholder="Email Address"
              />
            </div>

          </div>

          <div>

            <label className="mb-2 block text-sm font-medium">
              Address Line 1
            </label>

            <input
              value={form.address1}
              onChange={(e) =>
                setForm({
                  ...form,
                  address1: e.target.value,
                })
              }
              className="w-full rounded-xl border px-4 py-3 outline-none focus:border-primary"
              placeholder="House No, Building, Street"
              required
            />

          </div>

          <div>

            <label className="mb-2 block text-sm font-medium">
              Address Line 2
            </label>

            <input
              value={form.address2}
              onChange={(e) =>
                setForm({
                  ...form,
                  address2: e.target.value,
                })
              }
              className="w-full rounded-xl border px-4 py-3 outline-none focus:border-primary"
              placeholder="Apartment, Area"
            />

          </div>

          <div>

            <label className="mb-2 block text-sm font-medium">
              Landmark
            </label>

            <input
              value={form.landmark}
              onChange={(e) =>
                setForm({
                  ...form,
                  landmark: e.target.value,
                })
              }
              className="w-full rounded-xl border px-4 py-3 outline-none focus:border-primary"
              placeholder="Landmark"
            />

          </div>

          <div className="grid gap-5 md:grid-cols-2">

            <div>

              <label className="mb-2 block text-sm font-medium">
                City
              </label>

              <input
                value={form.city}
                onChange={(e) =>
                  setForm({
                    ...form,
                    city: e.target.value,
                  })
                }
                className="w-full rounded-xl border px-4 py-3 outline-none focus:border-primary"
                placeholder="City"
                required
              />

            </div>

            <div>

              <label className="mb-2 block text-sm font-medium">
                State
              </label>

              <input
                value={form.state}
                onChange={(e) =>
                  setForm({
                    ...form,
                    state: e.target.value,
                  })
                }
                className="w-full rounded-xl border px-4 py-3 outline-none focus:border-primary"
                placeholder="State"
                required
              />

            </div>

          </div>

          <div>

            <label className="mb-2 block text-sm font-medium">
              Pincode
            </label>

            <input
              value={form.pincode}
              onChange={(e) =>
                setForm({
                  ...form,
                  pincode: e.target.value,
                })
              }
              className="w-full rounded-xl border px-4 py-3 outline-none focus:border-primary"
              placeholder="Pincode"
              required
            />

          </div>

          <div className="grid gap-5 md:grid-cols-2">

            <div>

              <label className="mb-2 block text-sm font-medium">
                Label
              </label>

              <select
                value={form.label}
                onChange={(e) =>
                  setForm({
                    ...form,
                    label: e.target.value,
                  })
                }
                className="w-full rounded-xl border px-4 py-3 outline-none focus:border-primary"
              >
                <option>Home</option>
                <option>Office</option>
                <option>Other</option>
              </select>

            </div>

            <div className="flex items-end">

              <label className="flex items-center gap-3">

                <input
                  type="checkbox"
                  checked={form.isDefault}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      isDefault: e.target.checked,
                    })
                  }
                />

                Set as Default Address

              </label>

            </div>

          </div>
                    <div className="flex justify-end gap-4 border-t pt-6">

            <button
              type="button"
              onClick={() => onOpenChange(false)}
              disabled={saving}
              className="rounded-xl border border-border px-6 py-3 font-medium transition hover:bg-muted disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="rounded-xl bg-primary px-6 py-3 font-medium text-white transition hover:opacity-90 disabled:opacity-50"
            >
              {saving
                ? address
                  ? "Updating..."
                  : "Saving..."
                : address
                ? "Update Address"
                : "Save Address"}
            </button>

          </div>

        </form>

      </div>
</div>
    </div>
  );
}