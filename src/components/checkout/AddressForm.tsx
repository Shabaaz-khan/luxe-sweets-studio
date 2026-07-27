import { useEffect, useState } from "react";
import { useCustomerAuth } from "@/context/CustomerAuthContext";
import { getAddresses } from "@/api/api";

type Address = {
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
  saveAddress: boolean;
};

type SavedAddress = {
  _id: string;
  label: string;
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
  isDefault: boolean;
};

type Props = {
  address: Address;
  setAddress: React.Dispatch<React.SetStateAction<Address>>;
};

export default function AddressForm({
  address,
  setAddress,
}: Props) {
  const { isAuthenticated } = useCustomerAuth();

  const [savedAddresses, setSavedAddresses] = useState<SavedAddress[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState("");
const [showForm, setShowForm] = useState(!isAuthenticated);
  useEffect(() => {
    if (isAuthenticated) {
      loadAddresses();
    }
  }, [isAuthenticated]);

  async function loadAddresses() {
    try {
      const data = await getAddresses();
      setSavedAddresses(data || []);
    } catch (err) {
      console.error(err);
      setSavedAddresses([]);
    }
  }

  const handleSelectAddress = (item: SavedAddress) => {
    setSelectedAddressId(item._id);

    setAddress({
      firstName: item.firstName,
      lastName: item.lastName,
      phone: item.phone,
      email: item.email,
      address1: item.address1,
      address2: item.address2,
      landmark: item.landmark,
      city: item.city,
      state: item.state,
      pincode: item.pincode,
      saveAddress: true,
    });

    setShowForm(true);
  };

  return (
    <div className="space-y-8">
            {isAuthenticated && (
        <section className="rounded-3xl border border-border bg-card p-8 shadow-soft">

          <h2 className="font-display text-3xl text-primary mb-6">
            Saved Addresses
          </h2>

          {savedAddresses.length === 0 ? (

            <div className="rounded-2xl border border-dashed border-border py-10 text-center text-muted-foreground">
              No saved addresses found.
            </div>

          ) : (

            <div className="space-y-5">

              {savedAddresses.map((item) => (

                <div
                  key={item._id}
                  onClick={() => handleSelectAddress(item)}
                  className={`rounded-2xl border p-6 cursor-pointer transition-all duration-300
                  ${
                    selectedAddressId === item._id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary"
                  }`}
                >

                  <div className="flex items-start justify-between">

                    <div>

                      <div className="flex items-center gap-3">

                        <h3 className="font-semibold text-lg">
                          {item.label || "Home"}
                        </h3>

                        {item.isDefault && (
                          <span className="rounded-full bg-primary px-3 py-1 text-xs text-white">
                            Default
                          </span>
                        )}

                      </div>

                      <p className="mt-3 font-medium">
                        {item.firstName} {item.lastName}
                      </p>

                      <p>{item.phone}</p>

                      <p>{item.address1}</p>

                      {item.address2 && (
                        <p>{item.address2}</p>
                      )}

                      {item.landmark && (
                        <p>{item.landmark}</p>
                      )}

                      <p>
                        {item.city}, {item.state} - {item.pincode}
                      </p>

                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectAddress(item);
                      }}
                      className="rounded-full border border-primary px-5 py-2 text-sm text-primary hover:bg-primary hover:text-white transition"
                    >
                      Use
                    </button>

                  </div>

                </div>

              ))}

            </div>

          )}

          <button
            type="button"
            onClick={() => {
              setSelectedAddressId("");

              setAddress({
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
                saveAddress: true,
              });

              setShowForm(true);
            }}
            className="mt-6 w-full rounded-2xl border-2 border-dashed border-border py-5 font-medium hover:border-primary hover:bg-primary/5 transition"
          >
            + Add New Address
          </button>

        </section>
      )}

<section className="rounded-3xl border border-border bg-card p-8 shadow-soft">

  <div className="flex items-center justify-between mb-8">

    <div>
      <h2 className="font-display text-3xl text-primary">
        Delivery Address
      </h2>

      <p className="text-muted-foreground mt-1">
        Please enter your delivery address details.
      </p>
    </div>

  </div>

  {showForm && (

    <>

      <div className="grid gap-6 md:grid-cols-2">

        <div>

          <label className="mb-2 block text-sm font-medium">
            First Name
          </label>

          <input
            type="text"
            value={address.firstName}
            onChange={(e) =>
              setAddress({
                ...address,
                firstName: e.target.value,
              })
            }
            placeholder="Enter First Name"
            className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none focus:border-primary"
          />

        </div>

        <div>

          <label className="mb-2 block text-sm font-medium">
            Last Name
          </label>

          <input
            type="text"
            value={address.lastName}
            onChange={(e) =>
              setAddress({
                ...address,
                lastName: e.target.value,
              })
            }
            placeholder="Enter Last Name"
            className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none focus:border-primary"
          />

        </div>

        <div>

          <label className="mb-2 block text-sm font-medium">
            Phone Number
          </label>

          <input
            type="tel"
            value={address.phone}
            onChange={(e) =>
              setAddress({
                ...address,
                phone: e.target.value,
              })
            }
            placeholder="+91 9876543210"
            className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none focus:border-primary"
          />

        </div>

        <div>

          <label className="mb-2 block text-sm font-medium">
            Email Address
          </label>

          <input
            type="email"
            value={address.email}
            onChange={(e) =>
              setAddress({
                ...address,
                email: e.target.value,
              })
            }
            placeholder="Enter Email"
            className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none focus:border-primary"
          />

        </div>

      </div>

      <div className="mt-6">

        <label className="mb-2 block text-sm font-medium">
          Address Line 1
        </label>

        <input
          value={address.address1}
          onChange={(e) =>
            setAddress({
              ...address,
              address1: e.target.value,
            })
          }
          placeholder="House No, Building, Street"
          className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none focus:border-primary"
        />

      </div>

      <div className="mt-6">

        <label className="mb-2 block text-sm font-medium">
          Address Line 2
        </label>

        <input
          value={address.address2}
          onChange={(e) =>
            setAddress({
              ...address,
              address2: e.target.value,
            })
          }
          placeholder="Apartment, Area"
          className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none focus:border-primary"
        />

      </div>

      <div className="mt-6">

        <label className="mb-2 block text-sm font-medium">
          Landmark
        </label>

        <input
          value={address.landmark}
          onChange={(e) =>
            setAddress({
              ...address,
              landmark: e.target.value,
            })
          }
          placeholder="Near Temple, School..."
          className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none focus:border-primary"
        />

      </div>
            <div className="mt-6 grid gap-6 md:grid-cols-2">

        <div>

          <label className="mb-2 block text-sm font-medium">
            City
          </label>

          <input
            value={address.city}
            onChange={(e) =>
              setAddress({
                ...address,
                city: e.target.value,
              })
            }
            placeholder="Enter City"
            className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none focus:border-primary"
          />

        </div>

        <div>

          <label className="mb-2 block text-sm font-medium">
            State
          </label>

          <input
            value={address.state}
            onChange={(e) =>
              setAddress({
                ...address,
                state: e.target.value,
              })
            }
            placeholder="Enter State"
            className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none focus:border-primary"
          />

        </div>

      </div>

      <div className="mt-6">

        <label className="mb-2 block text-sm font-medium">
          Pincode
        </label>

        <input
          value={address.pincode}
          onChange={(e) =>
            setAddress({
              ...address,
              pincode: e.target.value,
            })
          }
          placeholder="Enter Pincode"
          className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none focus:border-primary"
        />

      </div>

      <div className="mt-8 rounded-2xl border border-border bg-background p-5">

        <label className="flex cursor-pointer items-center gap-3">

          <input
            type="checkbox"
            checked={address.saveAddress}
            onChange={(e) =>
              setAddress({
                ...address,
                saveAddress: e.target.checked,
              })
            }
            className="h-5 w-5 accent-primary"
          />

          <div>

            <p className="font-medium">
              Save this address
            </p>

            <p className="text-sm text-muted-foreground">
              Save this address for faster checkout next time.
            </p>

          </div>

        </label>

      </div>

    </>

  )}

</section>

</div>

);
}