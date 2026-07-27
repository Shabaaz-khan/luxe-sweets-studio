import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  getAddresses,
  deleteAddress,
} from "@/api/api";
import AddressCard from "./AddressCard";
import AddressDialog from "./AddressDialog";

export type Address = {
  _id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email?: string;
  address1: string;
  address2?: string;
  landmark?: string;
  city: string;
  state: string;
  pincode: string;
  label: string;
  isDefault: boolean;
};

export default function AddressBook() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingAddress, setEditingAddress] =
    useState<Address | null>(null);

  async function loadAddresses() {
    try {
      setLoading(true);

      const data = await getAddresses();

      setAddresses(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAddresses();
  }, []);

  async function handleDelete(id: string) {
    const ok = window.confirm(
      "Delete this address?"
    );

    if (!ok) return;

    try {
      await deleteAddress(id);

      await loadAddresses();
    } catch (err) {
      console.error(err);
    }
  }

  function handleAdd() {
    setEditingAddress(null);
    setDialogOpen(true);
  }

  function handleEdit(address: Address) {
    setEditingAddress(address);
    setDialogOpen(true);
  }

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-xl font-semibold">
            Saved Addresses
          </h2>

          <p className="text-muted-foreground text-sm">
            Manage your delivery addresses.
          </p>
        </div>

        <Button onClick={handleAdd}>
          <Plus className="mr-2 h-4 w-4" />
          Add Address
        </Button>
      </div>

      {loading ? (
        <div className="py-20 text-center">
          Loading addresses...
        </div>
      ) : addresses.length === 0 ? (
        <div className="border rounded-xl p-12 text-center">
          <h3 className="text-lg font-semibold">
            No addresses found
          </h3>

          <p className="text-muted-foreground mt-2">
            Add your first delivery address.
          </p>

          <Button
            className="mt-6"
            onClick={handleAdd}
          >
            Add Address
          </Button>
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2">
          {addresses.map((address) => (
            <AddressCard
              key={address._id}
              address={address}
              onEdit={() => handleEdit(address)}
              onDelete={() =>
                handleDelete(address._id)
              }
              onRefresh={loadAddresses}
            />
          ))}
        </div>
      )}

      <AddressDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        address={editingAddress}
        onSuccess={loadAddresses}
      />
    </>
  );
}