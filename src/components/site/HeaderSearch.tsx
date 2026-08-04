import { Search, X } from "lucide-react";
import { Link } from "@tanstack/react-router";

type Props = {
  open: boolean;
  onClose: () => void;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  products: any[];
  categories: any[];
};

export function HeaderSearch({
  open,
  onClose,
  search,
  setSearch,
  products,
  categories,
}: Props) {
  if (!open) return null;

  const keyword = search.trim().toLowerCase();

  const filteredProducts = keyword
    ? products.filter((p: any) =>
        p.name.toLowerCase().includes(keyword)
      )
    : [];

  const filteredCategories = keyword
    ? categories.filter((c: any) =>
        c.name.toLowerCase().includes(keyword)
      )
    : [];

  return (
  <>
  {/* Overlay */}
  <div
    className="fixed inset-0 z-[90] bg-black/40 backdrop-blur-sm"
    onClick={onClose}
  />

  {/* Search Header */}
  <div className="fixed top-0 left-0 right-0 z-[100] bg-white shadow-xl">

    <div className="mx-auto flex h-20 max-w-7xl items-center gap-5 px-6">

      <div className="relative flex-1">

        <Search
          size={20}
          className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          autoFocus
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search sweets, snacks..."
          className="h-12 w-full rounded-full border border-gray-300 bg-white pl-12 pr-12 outline-none focus:border-primary"
        />

        <button
          onClick={onClose}
          className="absolute right-4 top-1/2 -translate-y-1/2"
        >
          <X size={20} />
        </button>

      </div>

    </div>
          <div className="border-t bg-white">

        <div className="mx-auto max-w-5xl px-6 py-6">

          {search.trim() === "" ? (

            <>
              <h3 className="mb-5 text-lg font-semibold">
                Popular Searches
              </h3>

              <div className="flex flex-wrap gap-3">

                {[
                  "Kaju Katli",
                  "Mysore Pak",
                  "Murukku",
                  "Laddu",
                  "Mixture",
                  "Badam Halwa",
                ].map((item) => (
                  <button
                    key={item}
                    onClick={() => setSearch(item)}
                    className="rounded-full border border-primary px-4 py-2 text-sm hover:bg-primary hover:text-white transition"
                  >
                    {item}
                  </button>
                ))}

              </div>
            </>

          ) : (

            <div className="max-h-[60vh] overflow-y-auto space-y-8">
              {/* Products */}
{filteredProducts.length > 0 && (
  <div>
    <h3 className="mb-4 text-lg font-semibold">Products</h3>

    <div className="space-y-2">
      {filteredProducts.map((product: any) => (
        <Link
          key={product._id}
          to="/products/$slug"
          params={{ slug: product.slug }}
          onClick={onClose}
          className="flex items-center gap-4 rounded-xl p-3 hover:bg-gray-100 transition"
        >
          <img
            src={
              product.imageUrl ||
              product.image ||
              product.images?.[0] ||
              "/placeholder.png"
            }
            alt={product.name}
            className="h-14 w-14 rounded-lg object-cover"
          />

          <div className="flex-1">
            <p className="font-medium">{product.name}</p>

            <p className="text-sm text-primary">
          ₹{product.variants?.[0]?.price}
            </p>
          </div>
        </Link>
      ))}
    </div>
  </div>
)}
{/* Categories */}
{filteredCategories.length > 0 && (
  <div>
    <h3 className="mb-4 text-lg font-semibold">
      Categories
    </h3>

    <div className="space-y-2">
      {filteredCategories.map((category: any) => (
        <Link
          key={category._id}
          to="/menu"
          search={{
            category: category.slug,
          }}
          onClick={onClose}
          className="block rounded-xl p-3 hover:bg-gray-100 transition"
        >
          {category.name}
        </Link>
      ))}
    </div>
  </div>
)}
{keyword &&
  filteredProducts.length === 0 &&
  filteredCategories.length === 0 && (
    <div className="py-16 text-center text-gray-500">
      No Results Found
    </div>
)}
          </div>
        )}

      </div>
    </div>
  </div>
</>
);
}