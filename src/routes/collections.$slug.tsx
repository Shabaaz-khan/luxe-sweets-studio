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
export const Route = createFileRoute("/collections/$slug")({


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

type Product = {
  _id: string;
  name: string;
  description: string;
  imageUrl: string;
  badge?: string;
  variants: {
    weight: string;
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
const { slug } = Route.useParams();
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


const list = useMemo(() => {
  return products.filter((p) => {
    return (
      p.category?.slug === slug ||
      p.types?.slug === slug
    );
  });
}, [products, slug]);

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


          {/* Grid */}
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
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
