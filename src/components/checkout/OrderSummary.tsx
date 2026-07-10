import { useCart } from "@/context/CartContext";
import { SITE } from "@/lib/site";
import { createOrder } from "@/api/api";
import { verifyPayment } from "@/api/api";
import { loadRazorpay } from "@/lib/loadRazorpay";
import { useNavigate } from "@tanstack/react-router";
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
  } = useCart();
const navigate = useNavigate();
  const delivery = 0;
  const discount = 0;

  const grandTotal =
    subtotal + delivery - discount;

 const handleCheckout = async () => {

  if (!address.firstName.trim()) {
    return alert("Enter First Name");
  }

  if (!address.phone.trim()) {
    return alert("Enter Phone Number");
  }

  if (!address.email.trim()) {
    return alert("Enter Email");
  }

  if (!address.address1.trim()) {
    return alert("Enter Address");
  }

  if (!address.city.trim()) {
    return alert("Enter City");
  }

  if (!address.pincode.trim()) {
    return alert("Enter Pincode");
  }

  const payload = {

    customer: {

      name: `${address.firstName} ${address.lastName}`,

      email: address.email,

      phone: address.phone,

      address:
        `${address.address1}, ${address.address2}, ${address.landmark}`,

      city: address.city,

      pincode: address.pincode,

    },

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
  alert("Unable to load Razorpay");
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

      alert("Payment Successful");

      navigate({
        to: "/",
      });

    } catch (err) {

      console.error(err);

      alert("Payment Verification Failed");

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

    alert("Unable to create order");

  }

};

  return (
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
        onClick={handleCheckout}
        className="mt-8 w-full rounded-full bg-primary text-primary-foreground py-4 text-lg font-semibold hover:bg-primary/90"
      >
        Continue to Payment
      </button>

    </div>
  );
}