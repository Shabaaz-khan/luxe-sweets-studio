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
export const Route = createFileRoute("/menu")({
validateSearch: (search: Record<string, unknown>) => ({
  category:
    typeof search.category === "string"
      ? search.category
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
};

type Product = {
  _id: string;
  name: string;
  description: string;
  imageUrl: string;
  variants: {
    weight: string;
    price: number;
  }[];
  category: {
    _id: string;
    name: string;
  };
};
function MenuPage() {
const { category } = Route.useSearch();

const [filter, setFilter] = useState(category ?? "all");
const [categories, setCategories] = useState<Category[]>([]);
const [types, setTypes] = useState([]);
const [products, setProducts] = useState<Product[]>([]);  
const [menuPage, setMenuPage] = useState<any>(null);
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
useEffect(() => {
  if (category) {
    setFilter(category);
  }
}, [category]);
const list = useMemo(() => {

  if (!menuPage) return [];

  if (filter === "all") {

    return products.filter((product) =>

      menuPage.firstTabProducts?.some(
        (selected: any) => selected._id === product._id
      )

    );

  }

  return products.filter(
    (p) => p.category?._id === filter
  );

}, [filter, products, menuPage]);

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
            {(["all", ...categories.map(c => c._id)] as Filter[]).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-full px-5 py-2 text-sm tracking-wide border transition-colors ${
                  filter === f
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-transparent text-primary border-primary/25 hover:bg-primary/5"
                }`}
              >
{f === "all"
  ? menuPage.allTabName
  : categories.find(c => c._id === f)?.name}    
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
