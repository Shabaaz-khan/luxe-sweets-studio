import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { getCategories, getTypes } from "@/api/api";
type MenuDropdownProps = {
  mobile?: boolean;
  onNavigate?: () => void;
};

export function MenuDropdown({
  mobile = false,
  onNavigate,
}: MenuDropdownProps) {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [types, setTypes] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState<any>(null);

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadMenu() {
      try {
        const [cats, tps] = await Promise.all([
          getCategories(),
          getTypes(),
        ]);

        setCategories(cats);
        setTypes(tps);

        if (cats.length) {
          setActiveCategory(cats[0]);
        }
      } catch (err) {
        console.error(err);
      }
    }

    loadMenu();
  }, []);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClick);

    return () =>
      document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
<button
  onClick={() => setOpen((v) => !v)}
  className={
    mobile
      ? "w-full text-left py-3 text-base"
      : "text-sm tracking-wide hover:text-primary"
  }
>
  Menu
</button>

      {open && (
<div
  className={
    mobile
      ? "mt-2 rounded-xl border bg-white"
      : "absolute left-0 top-full mt-3 flex w-[650px] rounded-2xl border bg-white shadow-xl z-50 overflow-hidden"
  }
>
          {/* Categories */}

          <div className="w-64 border-r bg-gray-50">
            {categories.map((category) => (
              <button
                key={category._id}
               onMouseEnter={() => {
  if (!mobile) setActiveCategory(category);
}}
onClick={() => {
  if (mobile) setActiveCategory(category);
}}
                className={`flex w-full items-center justify-between px-5 py-3 text-left hover:bg-primary hover:text-white transition ${
                  activeCategory?._id === category._id
                    ? "bg-primary text-white"
                    : ""
                }`}
              >
                {category.name}

                <ChevronRight size={18} />
              </button>
            ))}
          </div>

          {/* Types */}

          <div className="flex-1 p-5">
            <h3 className="mb-4 text-lg font-semibold">
              {activeCategory?.name}
            </h3>

            <div className="grid grid-cols-2 gap-2">
              {types
                .filter(
                  (type: any) =>
                    type.category?._id ===
                    activeCategory?._id
                )
                .map((type: any) => (
<Link
  to="/collections/$slug"
  params={{
    slug: type.slug,
  }}
 onClick={() => {
  setOpen(false);
  onNavigate?.();
}}
  className="rounded-lg px-3 py-2 hover:bg-primary hover:text-white transition"
>
  {type.name}
</Link>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}