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

type Props = {
  address: Address;
  setAddress: React.Dispatch<React.SetStateAction<Address>>;
};

export default function AddressForm({
  address,
  setAddress,
}: Props) {
  return (
    <div className="rounded-3xl border border-border bg-card p-8 shadow-soft">

      <h2 className="font-display text-3xl text-primary mb-6">
        Delivery Address
      </h2>

      <div className="grid md:grid-cols-2 gap-5">

        <div>
          <label className="block text-sm mb-2">
            First Name
          </label>

          <input
            value={address.firstName}
            onChange={(e) =>
              setAddress({
                ...address,
                firstName: e.target.value,
              })
            }
            className="w-full rounded-xl border border-border p-3"
            placeholder="John"
          />
        </div>

        <div>
          <label className="block text-sm mb-2">
            Last Name
          </label>

          <input
            value={address.lastName}
            onChange={(e) =>
              setAddress({
                ...address,
                lastName: e.target.value,
              })
            }
            className="w-full rounded-xl border border-border p-3"
            placeholder="Doe"
          />
        </div>

        <div>
          <label className="block text-sm mb-2">
            Phone
          </label>

          <input
            value={address.phone}
            onChange={(e) =>
              setAddress({
                ...address,
                phone: e.target.value,
              })
            }
            className="w-full rounded-xl border border-border p-3"
            placeholder="+91 XXXXX XXXXX"
          />
        </div>

        <div>
          <label className="block text-sm mb-2">
            Email
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
            className="w-full rounded-xl border border-border p-3"
            placeholder="john@gmail.com"
          />
        </div>

      </div>

      <div className="mt-5">

        <label className="block text-sm mb-2">
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
          className="w-full rounded-xl border border-border p-3"
          placeholder="House No, Street"
        />

      </div>

      <div className="mt-5">

        <label className="block text-sm mb-2">
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
          className="w-full rounded-xl border border-border p-3"
          placeholder="Apartment, Area"
        />

      </div>

      <div className="mt-5">

        <label className="block text-sm mb-2">
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
          className="w-full rounded-xl border border-border p-3"
          placeholder="Near Temple"
        />

      </div>

      <div className="grid md:grid-cols-2 gap-5 mt-5">

        <div>

          <label className="block text-sm mb-2">
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
            className="w-full rounded-xl border border-border p-3"
            placeholder="Hyderabad"
          />

        </div>

        <div>

          <label className="block text-sm mb-2">
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
            className="w-full rounded-xl border border-border p-3"
            placeholder="Telangana"
          />

        </div>

      </div>

      <div className="mt-5">

        <label className="block text-sm mb-2">
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
          className="w-full rounded-xl border border-border p-3"
          placeholder="500001"
        />

      </div>

      <div className="mt-6 flex items-center gap-3">

        <input
          type="checkbox"
          checked={address.saveAddress}
          onChange={(e) =>
            setAddress({
              ...address,
              saveAddress: e.target.checked,
            })
          }
        />

        <span>
          Save this address
        </span>

      </div>

    </div>
  );
}