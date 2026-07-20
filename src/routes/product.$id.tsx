import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { getProduct } from "@/api/api";
import { useCart } from "@/context/CartContext";
export const Route = createFileRoute("/product/$id")({
  component: ProductDetails,
});

function ProductDetails() {

  const { id } = Route.useParams();

  const [product, setProduct] = useState<any>(null);
const [selectedVariant, setSelectedVariant] = useState<any>(null);
const [qty, setQty] = useState(1);
const {
  addToCart,
} = useCart();
  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    try {
      const data = await getProduct(id);
     setProduct(data);

if (data.variants?.length) {
  setSelectedVariant(data.variants[0]);
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
const cheapestVariant =
  product?.variants?.length
    ? product.variants.reduce((min: any, current: any) =>
        current.price < min.price ? current : min
      )
    : null;
  return (
    <div className="min-h-screen bg-background">

      <Nav />

      <main className="pt-28">

<div className="grid lg:grid-cols-2 gap-12">

  <div>

    <img
      src={product.imageUrl}
      alt={product.name}
 className="w-[420px] h-[420px] object-cover rounded-3xl shadow-xl mx-auto"    />

  </div>

  <div>

    <h1 className="text-4xl lg:text-5xl font-display text-primary leading-tight">
      {product.name}
    </h1>
<div className="mt-5">

  <div className="text-sm uppercase tracking-widest text-muted-foreground">

    Starting From

  </div>

  <div className="text-4xl font-display text-primary mt-1">

    ₹{cheapestVariant?.price}

  </div>

  <div className="text-sm text-muted-foreground">

    {cheapestVariant?.weight}

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
          onClick={() => setSelectedVariant(variant)}
          className={`min-w-[95px] rounded-2xl px-5 py-4 text-center transition-all duration-300 ${
            active
              ? "bg-primary text-white shadow-lg"
              : "bg-secondary hover:bg-secondary/80 text-primary"
          }`}
        >
          <div className="font-semibold text-base">
            {variant.weight}
          </div>

          <div
            className={`mt-1 text-sm ${
              active ? "text-white/90" : "text-muted-foreground"
            }`}
          >
            ₹{variant.price}
          </div>
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
    ₹{selectedVariant.price * qty}
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