import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { getProduct } from "@/api/api";
import { useCart } from "@/context/CartContext";
import { Crown } from "lucide-react";
export const Route = createFileRoute("/products/$slug")({
  component: ProductDetails,
});

function ProductDetails() {

 const { slug } = Route.useParams();
  const [product, setProduct] = useState<any>(null);
const [selectedVariant, setSelectedVariant] = useState<any>(null);
const [qty, setQty] = useState(1);
const [animatedPrice, setAnimatedPrice] = useState(1); // ✅ Move here
const cheapestVariant =
  product?.variants?.length
    ? product.variants.reduce((min: any, current: any) =>
        (current.discount ?? current.price) <
        (min.discount ?? min.price)
          ? current
          : min
      )
    : null;
const {
  addToCart,
} = useCart();
  useEffect(() => {
    loadProduct();
 }, [slug]);
const animatePrice = (variant: any) => {
  if (!variant) return;

  const target = variant.discount ?? variant.price;

  let current = 1;

  setAnimatedPrice(1);

  const increment = Math.max(1, Math.ceil(target / 40));

  const timer = setInterval(() => {
    current += increment;

    if (current >= target) {
      current = target;
      clearInterval(timer);
    }

    setAnimatedPrice(current);
  }, 25);
};
  const loadProduct = async () => {
    try {
     const data = await getProduct(slug);
     setProduct(data);

if (data.variants?.length) {
  const firstVariant = data.variants[0];

  setSelectedVariant(firstVariant);

  animatePrice(firstVariant);
}
    } catch (err) {
      console.error(err);
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

const handleAddToCart = () => {
  if (!selectedVariant) return;

  addToCart(product, selectedVariant, qty);
};


  return (
    <div className="min-h-screen ">

      <Nav />

      <main className="pt-28">

<div className="grid lg:grid-cols-2 gap-12">

<div className="relative w-fit mx-auto">

  {product.badge?.trim() && (
    <div className="absolute left-5 top-5 z-20 inline-flex items-center gap-2 rounded-full bg-[#fff7e8] border border-[#efcf7a] px-4 py-2 shadow-lg">
      <Crown className="h-4 w-4 text-[#9d6a00]" />
      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9d6a00]">
        {product.badge}
      </span>
    </div>
  )}

  <img
    src={product.imageUrl}
    alt={product.name}
    className="w-[420px] h-[420px] object-cover rounded-3xl shadow-xl"
  />

</div>

  <div>

    <h1 className="text-4xl lg:text-5xl font-display text-primary leading-tight">
      {product.name}
    </h1>
<div className="mt-5">

  <div className="text-sm uppercase tracking-widest text-muted-foreground">

    Starting From

  </div>

<div className="flex items-end gap-3">

  <span className="text-5xl font-display">
    ₹{animatedPrice.toLocaleString()}
  </span>

{selectedVariant?.price >
  (selectedVariant?.discount ?? selectedVariant?.price) && (
  <span className="text-lg line-through text-muted-foreground">
    ₹{selectedVariant.price.toLocaleString()}
  </span>
)}

</div>

  <div className="text-sm text-muted-foreground">

    {selectedVariant?.weight}

  </div>

</div>
    <p className="mt-8 text-base leading-8 text-muted-foreground">
      {product.description}
    </p>
<div className="mt-10">
  <h3 className="text-lg font-semibold text-primary mb-4">
    Select Size
  </h3>

  <div className="flex flex-wrap gap-4">
    {product.variants?.map((variant: any) => {
      const active = selectedVariant?.weight === variant.weight;

      return (
        <button
          key={variant.weight}
          type="button"
          onClick={() => {
  setSelectedVariant(variant);
  animatePrice(variant);
}}
          className={`min-w-[95px] rounded-2xl px-5 py-4 text-center transition-all duration-300 ${
            active
              ? "bg-primary text-white shadow-lg"
              : "bg-secondary hover:bg-secondary/80 text-primary"
          }`}
        >
          <div className="font-semibold text-base">
            {variant.weight}
          </div>

          {/* <div
            className={`mt-1 text-sm ${
              active ? "text-white/90" : "text-muted-foreground"
            }`}
          >
            ₹{variant.price}
          </div> */}
        </button>
      );
    })}
  </div>
</div>
<div className="mt-8">

  <h3 className="text-lg font-semibold text-primary mb-4">
    Quantity
  </h3>

  <div className="inline-flex items-center rounded-full border border-border overflow-hidden">

    <button
      onClick={() => setQty((q) => Math.max(1, q - 1))}
      className="w-12 h-12 flex items-center justify-center hover:bg-primary/5"
    >
      -
    </button>

    <div className="w-14 text-center font-semibold">
      {qty}
    </div>

    <button
      onClick={() => setQty((q) => q + 1)}
      className="w-12 h-12 flex items-center justify-center hover:bg-primary/5"
    >
      +
    </button>

  </div>

</div>
<div className="mt-8 flex items-center justify-between">

  <span className="text-lg text-muted-foreground">
    Total
  </span>

  <span className="text-4xl font-display text-primary">
   ₹{((selectedVariant.discount ?? selectedVariant.price) * qty).toLocaleString()}
  </span>

</div>
<button
  onClick={() => {
    handleAddToCart();
  
  }}
  className="mt-8 w-full rounded-full bg-primary text-primary-foreground py-4 text-lg font-semibold hover:bg-primary/90 transition"
>
  Add To Cart
</button>
  </div>

</div>

      </main>

      <Footer />

    </div>
  );
}