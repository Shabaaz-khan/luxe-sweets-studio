import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronDown, ChevronRight } from "lucide-react";
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
const closeTimer = useRef<NodeJS.Timeout | null>(null);
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
<div
 className="relative"
  ref={menuRef}
 onMouseEnter={() => {
  if (!mobile) {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  }
}}

onMouseLeave={() => {
  if (!mobile) {
    closeTimer.current = setTimeout(() => {
      setOpen(false);
    }, 200);
  }
}}
>
  <button
    onClick={() => mobile && setOpen((v) => !v)}
    className={
      mobile
        ? "w-full flex items-center justify-between py-3 text-base"
        : "flex items-center gap-1 text-sm tracking-wide hover:text-primary transition-colors"
    }
  >
    Shop All

    <ChevronDown
      size={16}
      className={`transition-transform duration-300 ${
        open ? "rotate-180" : ""
      }`}
    />
  </button>

      {open && (
<div
  className={
    mobile
      ? "mt-2 rounded-xl border bg-white"
: "absolute left-0 top-full flex w-[560px] rounded-3xl border border-gray-100 bg-white shadow-2xl z-50 overflow-hidden"  }
>
          {/* Categories */}

          <div className="w-64 border-r bg-gray-50 p-3">
            {categories.map((category) => (
              <button
                key={category._id}
               onMouseEnter={() => {
  if (!mobile) setActiveCategory(category);
}}
onClick={() => {
  if (mobile) setActiveCategory(category);
}}
className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left transition-all duration-300 ${                  activeCategory?._id === category._id
                    ? "bg-[rgb(126,0,62)] text-white shadow"
                  : "hover:bg-gray-100"
                }`}
              >
                {category.name}

                <ChevronRight size={18} />
              </button>
            ))}
          </div>

          {/* Types */}

         <div className="w-80 p-6">
          <h3 className="mb-5 text-xs uppercase tracking-[0.3em] text-muted-foreground">
             Types
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
className="rounded-xl px-4 py-3 hover:bg-[rgb(126,0,62)] hover:text-white transition-all duration-300">
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