import { Outlet, createFileRoute } from "@tanstack/react-router";
import { CustomerLayout } from "@/components/customer/CustomerLayout";

export const Route = createFileRoute("/account")({
  component: AccountLayout,
});

function AccountLayout() {
  return (
    <CustomerLayout>
      <Outlet />
    </CustomerLayout>
  );
}