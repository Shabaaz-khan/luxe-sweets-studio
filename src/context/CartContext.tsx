import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

type Variant = {
  weight: string;
  price: number;
};

type Product = {
  _id: string;
  name: string;
   description: string;
  imageUrl: string;
  variants: Variant[];
};

export type CartItem = {
  product: Product;
  selectedVariant: Variant;
  qty: number;
};

type AppliedCoupon = {
  code: string;
  name: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  discount: number;
  grandTotal: number;
};

type CartContextType = {
  cart: CartItem[];
  open: boolean;

  setOpen: React.Dispatch<React.SetStateAction<boolean>>;

  cartItems: CartItem[];

  subtotal: number;

  coupon: AppliedCoupon | null;

  discount: number;

  grandTotal: number;

  applyCoupon: (coupon: AppliedCoupon) => void;

  removeCoupon: () => void;

  addToCart: (
    product: Product,
    variant: Variant,
    qty?: number
  ) => void;

  setQty: (
    productId: string,
    weight: string,
    qty: number
  ) => void;

  changeVariant: (
    productId: string,
    weight: string
  ) => void;

  checkout: () => void;
};
const CART_STORAGE_KEY = "saatvik-cart";
const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [cart, setCart] = useState<CartItem[]>([]);
const [open, setOpen] = useState(false);
const [coupon, setCoupon] =
  useState<AppliedCoupon | null>(null);
  useEffect(() => {
  if (typeof window === "undefined") return;

  const savedCart = window.localStorage.getItem(
    CART_STORAGE_KEY
  );

  if (savedCart) {
    try {
      setCart(JSON.parse(savedCart));
    } catch {
      setCart([]);
    }
  }
}, []);
useEffect(() => {
  if (typeof window === "undefined") return;

  window.localStorage.setItem(
    CART_STORAGE_KEY,
    JSON.stringify(cart)
  );
}, [cart]);
const cartItems = cart;

const subtotal = cart.reduce(
  (sum, item) =>
    sum + item.selectedVariant.price * item.qty,
  0
);

const discount = coupon?.discount ?? 0;

const grandTotal =
  subtotal - discount;
const addToCart = (
  product: Product,
  variant: Variant,
  qty = 1
) => {
  setCart((current) => {
    const existing = current.find(
      (item) =>
        item.product._id === product._id &&
        item.selectedVariant.weight === variant.weight
    );

    if (existing) {
      return current.map((item) =>
        item === existing
          ? {
              ...item,
              qty: item.qty + qty,
            }
          : item
      );
    }

    return [
      ...current,
      {
        product,
        selectedVariant: variant,
        qty,
      },
    ];
  });

  // setOpen(true);
  setCoupon(null);
};
const setQty = (
  productId: string,
  weight: string,
  qty: number
) => {
  setCart((current) =>
    current
      .map((item) => {
        if (
          item.product._id === productId &&
          item.selectedVariant.weight === weight
        ) {
          return {
            ...item,
            qty,
          };
        }

        return item;
      })
      .filter((item) => item.qty > 0)
  );
  setCoupon(null);
};
const changeVariant = (
  productId: string,
  weight: string
) => {
  setCart((current) =>
    current.map((item) => {
      if (item.product._id !== productId)
        return item;

      const variant =
        item.product.variants.find(
          (v) => v.weight === weight
        )!;

      return {
        ...item,
        selectedVariant: variant,
      };
    })
  );
  setCoupon(null);
};
const applyCoupon = (couponData: AppliedCoupon) => {
  setCoupon(couponData);
};

const removeCoupon = () => {
  setCoupon(null);
};
const checkout = () => {
  console.log("Checkout");
};
  return (
<CartContext.Provider
  value={{
    cart,
    open,
    setOpen,

    cartItems,

    subtotal,

    coupon,
    discount,
    grandTotal,

    applyCoupon,
    removeCoupon,

    addToCart,
    setQty,
    changeVariant,
    checkout,
  }}
>
  {children}
</CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used inside CartProvider"
    );
  }

  return context;
}