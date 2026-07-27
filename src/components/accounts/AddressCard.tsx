import { MapPin, Pencil, Trash2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { setDefaultAddress } from "@/api/api";
import { Address } from "./AddressBook";

type Props = {
  address: Address;
  onEdit: () => void;
  onDelete: () => void;
  onRefresh: () => void;
};

export default function AddressCard({
  address,
  onEdit,
  onDelete,
  onRefresh,
}: Props) {
  async function handleDefault() {
    try {
      await setDefaultAddress(address._id);
      onRefresh();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm hover:shadow-md transition">

      <div className="flex justify-between items-start">

        <div className="flex items-center gap-2">

          <MapPin className="h-5 w-5 text-primary" />

          <h3 className="font-semibold text-lg">
            {address.label}
          </h3>

          {address.isDefault && (
            <Badge>Default</Badge>
          )}

        </div>

      </div>

      <div className="mt-4 space-y-1 text-sm">

        <p className="font-medium">
          {address.firstName} {address.lastName}
        </p>

        <p>{address.phone}</p>

        {address.email && (
          <p>{address.email}</p>
        )}

        <p>{address.address1}</p>

        {address.address2 && (
          <p>{address.address2}</p>
        )}

        {address.landmark && (
          <p>{address.landmark}</p>
        )}

        <p>
          {address.city}, {address.state}
        </p>

        <p>{address.pincode}</p>

      </div>

      <div className="mt-6 flex flex-wrap gap-3">

        <Button
          size="sm"
          variant="outline"
          onClick={onEdit}
        >
          <Pencil className="mr-2 h-4 w-4" />
          Edit
        </Button>

        <Button
          size="sm"
          variant="destructive"
          onClick={onDelete}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </Button>

        {!address.isDefault && (
          <Button
            size="sm"
            onClick={handleDefault}
          >
            <Check className="mr-2 h-4 w-4" />
            Make Default
          </Button>
        )}

      </div>

    </div>
  );
}