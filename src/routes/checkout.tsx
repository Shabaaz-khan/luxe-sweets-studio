import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";

import AddressForm from "@/components/checkout/AddressForm";
import CouponCard from "@/components/checkout/CouponCard";
import OrderSummary from "@/components/checkout/OrderSummary";

export const Route = createFileRoute("/checkout")({
  component: CheckoutPage,
});

function CheckoutPage() {

  const [address, setAddress] = useState({
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
    saveAddress: false,
  });
useEffect(() => {
  const savedAddress = sessionStorage.getItem("checkout-address");

  if (savedAddress) {
    setAddress(JSON.parse(savedAddress));
  }
}, []);
  return (
    <div className="min-h-screen bg-background">

      <Nav />

      <main className="pt-28 pb-20">

        <div className="mx-auto max-w-7xl px-5">

          <h1 className="font-display text-5xl text-primary mb-10">
            Checkout
          </h1>

          <div className="grid lg:grid-cols-[1.6fr_0.8fr] gap-8">

            <div className="space-y-8">

              <CouponCard />

              <AddressForm
                address={address}
                setAddress={setAddress}
              />

            </div>

            <OrderSummary
              address={address}
            />

          </div>

        </div>

      </main>

      <Footer />

    </div>
  );
}