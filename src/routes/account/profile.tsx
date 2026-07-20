import { createFileRoute, Navigate } from "@tanstack/react-router";
import { useCustomerAuth } from "@/context/CustomerAuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/account/profile")({
  component: ProfilePage,
});

function ProfilePage() {
  const { customer, isAuthenticated } = useCustomerAuth();

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" />;
  }

  return (
    <>

      <main className="min-h-screen pt-5 pb-20 px-5">
        <div className="mx-auto max-w-3xl">

          <Card>
            <CardHeader>
              <CardTitle>My Profile</CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">

              <div>
                <Label>Full Name</Label>
                <Input value={customer?.name ?? ""} disabled />
              </div>

              <div>
                <Label>Email</Label>
                <Input value={customer?.email ?? ""} disabled />
              </div>

              <div>
                <Label>Phone</Label>
                <Input value={customer?.phone ?? ""} disabled />
              </div>

            </CardContent>
          </Card>

        </div>
      </main>
    </>
  );
}