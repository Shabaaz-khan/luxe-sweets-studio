import { useCart } from "@/context/CartContext";
import { SITE } from "@/lib/site";
import { createOrder } from "@/api/api";
import { verifyPayment } from "@/api/api";
import { loadRazorpay } from "@/lib/loadRazorpay";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { useState } from "react";
import { useCustomerAuth } from "@/context/CustomerAuthContext";
import LoginDialog from "./LoginDialog";
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
};

export default function OrderSummary({
  address,
}: Props) {
const {
  cartItems,
  subtotal,
  coupon,
  discount,
  grandTotal,
} = useCart();

const delivery = 0;
const navigate = useNavigate();
const { isAuthenticated } = useCustomerAuth();

const [showLoginDialog, setShowLoginDialog] = useState(false);

const handlePaymentClick = () => {
  if (isAuthenticated) {
    handleCheckout();
  } else {
    setShowLoginDialog(true);
  }
};
 const handleCheckout = async () => {

  if (!address.firstName.trim()) {
    return toast.error("Please enter first name");
  }

 if (!/^\d{10}$/.test(address.phone)) {
  toast.error("Enter a valid mobile number");
  return;
}

if (!/\S+@\S+\.\S+/.test(address.email)) {
  toast.error("Enter a valid email");
  return;
}

  if (!address.address1.trim()) {
    return toast.error("Please enter address");
  }

  if (!address.city.trim()) {
    return toast.error("Please enter city");
  }

  if (!address.pincode.trim()) {
    return toast.error("Please enter pincode");
  }

const payload = {

  customer: {
    name: `${address.firstName} ${address.lastName}`,
    email: address.email,
    phone: address.phone,
    address: `${address.address1}, ${address.address2}, ${address.landmark}`,
    city: address.city,
    pincode: address.pincode,
  },

  couponCode: coupon?.code ?? null,

  couponName: coupon?.name,
discountType: coupon?.discountType,
discountValue: coupon?.discountValue,
discountAmount: discount,

  grandTotal,

  shippingFee: 0,

  items: cartItems.map(item => ({
    product_id: item.product._id,
    name: item.product.name,
    image: item.product.imageUrl,
    price: item.selectedVariant.price,
    quantity: item.qty,
  })),
};

  console.log(payload);

  try {

const order = await createOrder(payload);

const loaded = await loadRazorpay();

if (!loaded) {
  toast.error("Unable to load Razorpay");
  return;
}

const options = {
  key: order.razorpay_key_id,

  amount: order.amount,

  currency: order.currency,

  name: "Saatvik Sweets",

  description: "Order Payment",

  order_id: order.razorpay_order_id,

  handler: async function (response: any) {

    try {

      await verifyPayment({

        razorpay_order_id: response.razorpay_order_id,

        razorpay_payment_id: response.razorpay_payment_id,

        razorpay_signature: response.razorpay_signature,

        internal_order_id: order.internal_order_id,

      });

      toast.success("Payment successful");

      navigate({
        to: "/",
      });

    } catch (err) {

      console.error(err);

     toast.error("Payment verification failed");

    }

  },

  prefill: {

    name: `${address.firstName} ${address.lastName}`,

    email: address.email,

    contact: address.phone,

  },

  theme: {

    color: "#5A1E2A",

  },

};

const razorpay = new (window as any).Razorpay(options);

razorpay.open();

  } catch (err) {

    console.error(err);

    toast.error("Unable to create order");

  }

};

  return (
      <>
    <div className="rounded-3xl border border-border bg-card p-8 shadow-soft sticky top-28">

      <h2 className="font-display text-3xl text-primary mb-6">
        Order Summary
      </h2>

      <div className="space-y-5">
        {cartItems.map((item) => (
          <div
            key={`${item.product._id}-${item.selectedVariant.weight}`}
            className="flex justify-between border-b border-border pb-4"
          >
            <div>
              <p className="font-medium">
                {item.product.name}
              </p>

              <p className="text-sm text-muted-foreground">
                {item.selectedVariant.weight} × {item.qty}
              </p>
            </div>

            <div className="font-semibold">
              {SITE.currency}
              {item.selectedVariant.price * item.qty}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 space-y-3">

        <div className="flex justify-between">
          <span>Subtotal</span>

          <span>
            {SITE.currency}
            {subtotal}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Delivery</span>

          <span>FREE</span>
        </div>

        <div className="flex justify-between">
          <span>Discount</span>

          <span>
            -{SITE.currency}
            {discount}
          </span>
        </div>

        <div className="border-t border-border pt-4 flex justify-between">
          <span className="font-semibold text-lg">
            Grand Total
          </span>

          <span className="font-display text-3xl text-primary">
            {SITE.currency}
            {grandTotal}
          </span>
        </div>

      </div>

      <button
        onClick={handlePaymentClick}
        className="mt-8 w-full rounded-full bg-primary text-primary-foreground py-4 text-lg font-semibold hover:bg-primary/90"
      >
        Continue to Payment
      </button>

    </div>
        <LoginDialog
      open={showLoginDialog}
      onOpenChange={setShowLoginDialog}
      onContinueGuest={handleCheckout}
      address={address}
    />
    </>
  );

}