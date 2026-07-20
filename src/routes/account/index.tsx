import { createFileRoute, Link, Navigate } from "@tanstack/react-router";
import {
  User,
  Package,
  MapPin,
  Shield,
  ChevronRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useCustomerAuth } from "@/context/CustomerAuthContext";

export const Route = createFileRoute("/account/")({
  component: AccountDashboard,
});

function AccountDashboard() {
  const { customer, isAuthenticated } = useCustomerAuth();

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" />;
  }

  const cards = [
    {
      title: "My Profile",
      description: "View and update your profile.",
      icon: User,
      to: "/account/profile",
    },
    {
      title: "My Orders",
      description: "Track all your orders.",
      icon: Package,
      to: "/account/orders",
    },
    {
      title: "Saved Addresses",
      description: "Manage delivery addresses.",
      icon: MapPin,
      to: "/account/addresses",
    },
    {
      title: "Security",
      description: "Change your password.",
      icon: Shield,
      to: "/account/security",
    },
  ];

  return (
    <>

      <main className="min-h-screen pt-0 pb-20 px-5">
        <div className="mx-auto max-w-7xl">

          <div className="mb-10">
            <h1 className="text-4xl font-bold">
              Welcome, {customer?.name}
            </h1>

            <p className="text-muted-foreground mt-2">
              Manage your account and orders.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">

            {cards.map((card) => {
              const Icon = card.icon;

              return (
                <Link
                  key={card.title}
                  to={card.to as any}
                >
                  <Card className="hover:shadow-xl transition cursor-pointer h-full">

                    <CardContent className="flex items-center justify-between p-6">

                      <div className="flex items-center gap-4">

                        <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">

                          <Icon className="text-primary" />

                        </div>

                        <div>

                          <h2 className="font-semibold text-lg">
                            {card.title}
                          </h2>

                          <p className="text-sm text-muted-foreground">
                            {card.description}
                          </p>

                        </div>

                      </div>

                      <ChevronRight />

                    </CardContent>

                  </Card>
                </Link>
              );
            })}

          </div>

        </div>
      </main>

    </>
  );
}