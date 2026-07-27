import { createFileRoute } from "@tanstack/react-router";
import AddressBook from "@/components/accounts/AddressBook";
export const Route = createFileRoute("/account/addresses")({
  component: AddressesPage,
});

function AddressesPage() {
  return (
    <>
      <h1 className="text-4xl font-bold mb-8">
        My Addresses
      </h1>

      <AddressBook />
    </>
  );
}