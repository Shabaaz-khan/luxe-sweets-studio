import { createFileRoute } from "@tanstack/react-router";
import { API_URL } from "@/lib/config";
import { motion, AnimatePresence } from "framer-motion";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { useCart } from "@/context/CartContext";
import { SectionHeading } from "@/components/site/SectionHeading";
import { ProductCard } from "@/components/site/ProductCard";
import { getCategories, getProducts, getTypes, getMenuPage, } from "@/api/api";
import { useEffect, useMemo, useState } from "react";
import { SITE } from "@/lib/site";
import { ShoppingBag, Minus, Plus, X } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";
export const Route = createFileRoute("/menu")({
validateSearch: (search: Record<string, unknown>) => ({
  category:
    typeof search.category === "string"
      ? search.category
      : "all",

  type:
    typeof search.type === "string"
      ? search.type
      : "all",
}),

  head: () => ({
    meta: [
      { title: "The Menu — Saatvik Sweets & Savouries" },
      {
        name: "description",
        content:
          "Explore Saatvik's full menu of handcrafted Indian sweets, freshly roasted savouries, and gift hampers.",
      },
      { property: "og:title", content: "The Menu — Saatvik Sweets & Savouries" },
      {
        property: "og:description",
        content: "Handcrafted mithai, roasted namkeen, and luxury hampers.",
      },
    ],
  }),
component: MenuPage,
});

type Filter = string;
type Category = {
  _id: string;
  name: string;
  slug: string;
};

type Type = {
  _id: string;
  name: string;
  slug: string;
  category: {
    _id: string;
  };
};

export type Product = {
  _id: string;
  name: string;
  description: string;
  imageUrl: string;
  badge?: string;
  variants: {
    weight: string;
     discount: number;
    price: number;
  }[];
  category: {
    _id: string;
    name: string;
    slug: string;
  };
  types?: {
    _id: string;
    name: string;
    slug: string;
  };
};
function MenuPage() {
const { category, type } = Route.useSearch();
const [categories, setCategories] = useState<Category[]>([]);
const [types, setTypes] = useState<Type[]>([]);
const [products, setProducts] = useState<Product[]>([]);  
const [menuPage, setMenuPage] = useState<any>(null);
const navigate = useNavigate();
const {
  cartItems,
  subtotal,
  addToCart,
  setQty,
  changeVariant,
  checkout,
  open,
  setOpen,
} = useCart();
  // const [open, setOpen] = useState(false);

useEffect(() => {
  const loadData = async () => {
    try {
      const [cats, products, types,menu] = await Promise.all([
        getCategories(),
        getProducts(),
        getTypes(),
          getMenuPage(),
      ]);

      setCategories(cats);
      setProducts(products);
      console.log(products[0]);
      setTypes(types);
setMenuPage(menu);
      console.log("Categories :", cats);
      console.log("Types :", types);
      console.log("Products :", products);
    } catch (err) {
      console.error(err);
    }
  };

  loadData();
}, []);

const filteredTypes = useMemo(() => {
  if (category === "all") return [];

  return types.filter(
    (t) => t.category?._id === category
  );
}, [types, category]);
const list = useMemo(() => {
  return products.filter((p) => {
const categoryMatch =
  category === "all" ||
  p.category?.slug === category;

const typeMatch =
  type === "all" ||
  p.types?.slug === type;

    return categoryMatch && typeMatch;
  });
}, [products, category, type]);

if (!menuPage) return null;

  return (
    <div className="min-h-screen">
      <Nav />
      <main className="pt-28 md:pt-36">
        <section className="mx-auto max-w-7xl px-5 md:px-8">
<SectionHeading
  eyebrow={menuPage.eyebrow}
  title={menuPage.title}
  subtitle={menuPage.subtitle}
/>

          {/* Filter chips */}
          <div className="mt-10 flex flex-wrap items-center gap-3">
            {(["all", ...categories.map(c => c.slug)] as Filter[]).map((f) => (
              <button
                key={f}
onClick={() =>
navigate({
  to: "/collections/$slug",
  params: {
    slug: f,
  },
})
}
                className={`rounded-full px-5 py-2 text-sm tracking-wide border transition-colors ${
                 category === f
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-transparent text-primary border-primary/25 hover:bg-primary/5"
                }`}
              >
{f === "all"
  ? menuPage.allTabName
  : categories.find(c => c.slug === f)?.name
  }    
            </button>
            ))}
            {/* <div className="ml-auto">
              <button
                onClick={() => setOpen(true)}
                className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-sm shadow-soft"
              >
                <ShoppingBag size={16} />
                Cart · {cartItems.reduce((s, i) => s + i.qty, 0)}
              </button>
            </div> */}
          </div>

          {/* Grid */}
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {list.map((p) => (
              <ProductCard key={p._id} p={p} onOrder={addToCart} />
            ))}
          </div>
        </section>
      </main>

      {/* Cart drawer */}
{/* <CartDrawer
  open={open}
  setOpen={setOpen}
  cartItems={cartItems}
  subtotal={subtotal}
  setQty={setQty}
  changeVariant={changeVariant}
  checkout={checkout}
/> */}

      <Footer />
    </div>
  );
}
