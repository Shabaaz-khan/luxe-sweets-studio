import type { Product } from "@/routes/menu";
import { SITE } from "@/lib/site";
import { useNavigate } from "@tanstack/react-router";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ShoppingBag,
  Sparkles,
  Star,
  ArrowRight,
} from "lucide-react";
import {
  useMemo,
  useState,
   useEffect,
  type MouseEvent,
} from "react";
import { toast } from "sonner";

export function ProductCard({
  p,
  onOrder,
}: {
  p: Product;
  onOrder?: (
    product: Product,
    variant: Product["variants"][0],
    qty?: number
  ) => void;
}) {
  const navigate = useNavigate();

  /* =======================
        3D Tilt
  ======================= */

  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const rotateX = useSpring(
    useTransform(my, [-0.5, 0.5], [6, -6]),
    {
      stiffness: 170,
      damping: 18,
    }
  );

  const rotateY = useSpring(
    useTransform(mx, [-0.5, 0.5], [-6, 6]),
    {
      stiffness: 170,
      damping: 18,
    }
  );

  const handleMouseMove = (
    e: MouseEvent<HTMLElement>
  ) => {
    const rect =
      e.currentTarget.getBoundingClientRect();

    mx.set(
      (e.clientX - rect.left) /
        rect.width -
        0.5
    );

    my.set(
      (e.clientY - rect.top) /
        rect.height -
        0.5
    );
  };

  const handleLeave = () => {
    mx.set(0);
    my.set(0);
  };

  /* =======================
      Variant Logic
  ======================= */

  const cheapestVariant = useMemo(() => {
    if (!p.variants?.length) return null;

    return p.variants.reduce((a, b) =>
      a.price < b.price ? a : b
    );
  }, [p]);

  const [selectedVariant, setSelectedVariant] =
    useState(
      cheapestVariant ??
        p.variants?.[0]
    );
const originalPrice = selectedVariant?.price ?? 0;

const sellingPrice =
  selectedVariant?.discount ?? originalPrice;

const saveAmount = originalPrice - sellingPrice;

const discountPercent =
  saveAmount > 0
    ? Math.round((saveAmount / originalPrice) * 100)
    : 0;

const [showPercentage, setShowPercentage] = useState(true);

useEffect(() => {
  if (saveAmount <= 0) return;

  const interval = setInterval(() => {
    setShowPercentage((prev) => !prev);
  }, 2500);

  return () => clearInterval(interval);
}, [saveAmount]);
  const [added, setAdded] =
    useState(false);

  return (
    <motion.article
      initial={{
        opacity: 0,
        y: 30,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        duration: 0.6,
      }}
      whileHover={{
        y: -6,
      }}
      onMouseMove={
        handleMouseMove
      }
      onMouseLeave={
        handleLeave
      }
      onClick={() =>
        navigate({
          to: "/products/$slug",
          params: {
            slug: p.slug,
          },
        })
      }
      // style={{
      //   rotateX,
      //   rotateY,
      //   transformStyle:
      //     "preserve-3d",
      // }}
      className="
        group
        relative
        flex
       h-full
        w-full
        cursor-pointer
        flex-col
        overflow-hidden
        rounded-[30px]
        border
        border-[#ede3d7]
        bg-[#FCFBF8]
        transition-all
        duration-500
      "
    >

      {/* White Border */}

      <div className="pointer-events-none absolute inset-0 rounded-[30px] border border-white/80" />

      {/* =========================
              HEADER
      ========================= */}

      <div className="relative flex items-center justify-between px-6 pt-6">

        {/* LEFT */}

        <div className="flex items-center gap-3">

          <div
            className="
            flex
            h-8
            w-8
            items-center
            justify-center
            rounded-full
            border
            border-[#E5D7C5]
            bg-[#F8F2EA]
            text-[13px]
            font-medium
            text-[#8E7C68]
          "
          >
            07
          </div>

          <div
            className="
            text-[11px]
            uppercase
            tracking-[0.30em]
            text-[#B28C6A]
          "
          >
            {p.category?.name?.toUpperCase() ??
              "FESTIVE COLLECTION"}
          </div>

        </div>

        {/* RIGHT */}

        <div>

          {(p.featured ||
            p.badge) && (
            <div
              className="
              rounded-full
              border
              border-[#ECD8A5]
              bg-[#FFF8DC]
              px-4
              py-2
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.28em]
              text-[#B68619]
            "
            >
              {p.badge
                ? p.badge
                : "BESTSELLER"}
            </div>
          )}

        </div>

      </div>

    {/* =========================
        IMAGE SECTION
========================= */}

{/* =========================
        IMAGE SECTION
========================= */}

<div className="relative mt-4 px-4">

  <div className="h-[180px] overflow-hidden rounded-[24px] bg-[#FFF8EF]">
<div
  className="
    absolute
    left-1/2
    top-4
    z-30
    -translate-x-1/2
    -translate-y-3
    opacity-0
    group-hover:translate-y-0
    group-hover:opacity-100
    transition-all
    duration-300
  "
>
  <div
    className="
      flex
      items-center
      justify-between
      w-[250px]
      h-[48px]
      rounded-full
      bg-[#44210E]
      px-4
      shadow-xl
    "
  >
    <div className="flex flex-col leading-none">
      <span
        className="
          whitespace-nowrap
          text-[10px]
          uppercase
          tracking-[0.18em]
          font-semibold
          text-[#E8D2B0]
        "
      >
        FROM SAATVIK DISPLAY
      </span>

      <span className="mt-1 text-[16px] font-bold text-white">
        {selectedVariant?.weight}
      </span>
    </div>

    <span className="h-2 w-2 rounded-full bg-[#C88A2A]" />
  </div>
</div>
    <motion.img
      src={p.imageUrl}
      alt={p.name}
      loading="lazy"
      animate={{ y: [0, -6, 0] }}
      transition={{
        repeat: Infinity,
        duration: 4,
        ease: "easeInOut",
      }}
      className="
        h-full
        w-full
        object-cover
        transition-all
        duration-500
        group-hover:scale-105
      "
    />

  </div>

  {/* Floating Circle */}

  <motion.div
    whileHover={{
      rotate: 90,
    }}
    transition={{
      duration: 0.4,
    }}
    className="
      absolute
      right-6
      top-0
      flex
      h-11
      w-11
      items-center
      justify-center
      rounded-full
      border
      border-[#16A34A]
      bg-[#FFF8EF]
      shadow-md
    "
  >
    <div
      className="
        h-3
        w-3
        rounded-full
          bg-[#16A34A]
      "
    />
  </motion.div>

</div>
{/* =========================
        CONTENT
========================= */}

<div
  className="relative flex flex-1 flex-col px-6 pt-6 pb-6"
  // style={{
  //   transform: "translateZ(25px)",
  // }}
>

  {/* Product Name */}

  <h2
    className="
    font-serif
    text-[20px]
    leading-[1.05]
    text-[rgb(126,0,62)]
    line-clamp-2
   min-h-[30px]
    "
  >
   {p.name
  .split(" ")
  .map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  )
  .join(" ")}
  </h2>

  {/* Description */}

<p
  className="
    mt-2
    min-h-[40px]
    max-h-[72px]
    overflow-hidden
    line-clamp-3
    text-[12.5px]
    leading-5
    text-[#7A6D5F]
  "
>
  {p.description}
</p>

  {/* Bottom */}

  <div className="mt-auto">

    <div className="flex items-end justify-between">

      {/* Left */}

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();

          navigate({
            to: "/products/$slug",
            params: {
              slug: p.slug,
            },
          });
        }}
        className="
        group/view
        flex
        items-center
        cursor-pointer
        gap-4
        uppercase
        tracking-[0.28em]
        text-[13px]
        text-[#B68F69]
        "
      >
 
        <span>
          View
        </span>

        <span
          className="
          h-[1px]
          w-12
          bg-[#DCC9B3]
          transition-all
          duration-300
          group-hover/view:w-16
          "
        />

        <ArrowRight
          className="
          h-4
          w-4
          opacity-0
          transition-all
          duration-300
          group-hover/view:translate-x-1
          group-hover/view:opacity-100
          "
        />

      </button>

      {/* Price */}

<div className="text-right">

  {/* Price */}

  <div className="flex items-center justify-end gap-2">

    <span className="font-serif text-[24px] font-bold leading-none text-[#6E4A2D]">
      {SITE.currency}
      {sellingPrice}
    </span>

    {saveAmount > 0 && (
      <span className="text-base text-gray-400 line-through">
        {SITE.currency}
        {originalPrice}
      </span>
    )}

  </div>

  {/* Animated Text */}

  {saveAmount > 0 && (
    <motion.div
      key={showPercentage ? "off" : "drop"}
      initial={{
        opacity: 0,
        y: 6,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
      }}
      transition={{
        duration: 0.3,
      }}
      className="mt-1 h-[20px] overflow-hidden"
    >
      <span
        className="
          text-[13px]
          font-semibold
          uppercase
          tracking-wide
          text-red-600
        "
      >
        {showPercentage
          ? `${discountPercent}% OFF`
          : "PRICE DROP"}
      </span>
    </motion.div>
  )}

  {/* Weight */}

  {/* <div className="mt-1 text-[11px] uppercase tracking-[0.22em] text-[#B89C7F]">
    {selectedVariant?.weight}
  </div> */}

</div>

    </div>

  </div>



{/* =========================
        VARIANTS
========================= */}

{/* <div className="mt-7">

  <div className="mb-4 flex items-center justify-between">

    <div className="flex items-center gap-2">

      <div className="h-2 w-2 rounded-full bg-[rgb(126,0,62)]" />

      <span className="text-[11px] uppercase tracking-[0.28em] text-[#A58768]">
        Select Weight
      </span>

    </div>

    <span className="text-xs text-[#B89C7F]">
      {p.variants.length} Options
    </span>

  </div>

  <div className="grid grid-cols-2 gap-3">

    {p.variants.map((variant) => {

      const active =
        selectedVariant?.weight ===
        variant.weight;

      return (

        <motion.button
          key={variant.weight}
          whileHover={{
            y: -3,
            scale: 1.02,
          }}
          whileTap={{
            scale: 0.98,
          }}
          onClick={(e) => {
            e.stopPropagation();
            setSelectedVariant(variant);
          }}
          className={`relative overflow-hidden rounded-2xl border p-4 transition-all duration-300 ${
            active
              ? "border-[rgb(126,0,62)] bg-[rgb(126,0,62)] text-white shadow-[0_12px_25px_rgba(126,0,62,0.25)]"
              : "border-[#E7DCCD] bg-[#FFFCF8] hover:border-[rgb(126,0,62)]"
          }`}
        >

          {active && (
            <motion.div
              layoutId="variant"
              className="absolute inset-0 bg-[rgb(126,0,62)]"
              transition={{
                type: "spring",
                bounce: 0.25,
                duration: 0.5,
              }}
            />
          )}

          <div className="relative z-10">

            <div
              className={`text-sm font-semibold ${
                active
                  ? "text-white"
                  : "text-[#5C4533]"
              }`}
            >
              {variant.weight}
            </div>

            <div
              className={`mt-2 font-serif text-xl ${
                active
                  ? "text-white"
                  : "text-[rgb(126,0,62)]"
              }`}
            >
              {SITE.currency}
              {variant.price}
            </div>

          </div>

        </motion.button>

      );

    })}

  </div>

</div> */}

{/* =========================
        ADD TO CART
========================= */}

<motion.button
  whileHover={{
    scale: 1.02,
  }}
  whileTap={{
    scale: 0.98,
  }}
  onClick={(e) => {
    e.stopPropagation();

    if (!selectedVariant) return;

    onOrder?.(
      p,
      selectedVariant,
      1
    );

    setAdded(true);

    toast.success(
      `${p.name} added to cart`,
      {
description: `${selectedVariant.weight} • ${SITE.currency}${sellingPrice}`,   
   }
    );

    setTimeout(() => {
      setAdded(false);
    }, 1800);
  }}
className={`
  relative
  mt-4
  w-[200px]
  mx-auto
  cursor-pointer
  overflow-hidden
  rounded-[100px]
  py-4
  text-[15px]
  font-semibold
  tracking-[0.18em]
  transition-all
  duration-300
  ${
    added
      ? "bg-green-600 text-white shadow-[0_12px_30px_rgba(34,197,94,0.30)]"
      : "bg-[rgb(126,0,62)] text-white hover:bg-[#98004b] shadow-[0_12px_30px_rgba(126,0,62,0.25)]"
  }
`}
>

  {/* Shine */}

  <span
    className="
    absolute
    inset-0
    -translate-x-full
    bg-gradient-to-r
    from-transparent
    via-white/25
    to-transparent
    transition-transform
    duration-1000
    group-hover:translate-x-full
    "
  />

  <span className="relative flex items-center justify-center gap-3">

    {added ? (
      <>
        ✓ Added
      </>
    ) : (
      <>
        <ShoppingBag className="h-5 w-5  text-[15px]" />
        Add To Cart
      </>
    )}

  </span>

</motion.button>
  {/* Divider */}

  <div
    className="
    mt-2
    h-px
    bg-gradient-to-r
    from-transparent
    via-[#E4D5C4]
    to-transparent
    "
  />
{/* =========================
      FOOTER
========================= */}

{/* <div className="mt-6 flex items-center justify-center">

  <div className="h-px w-16 bg-[#DCCAB5]" />

  <div className="mx-3 flex h-8 w-8 items-center justify-center rounded-full border border-[#E7DCCD] bg-[#FFFDF9]">

    <Star
      className="h-3 w-3 fill-[#D6A339] text-[#D6A339]"
    />

  </div>

  <div className="h-px w-16 bg-[#DCCAB5]" />

</div> */}
</div>
{/* Bottom Brown Strip */}

<div
  className="
  absolute
  bottom-0
  left-0
  h-[10px]
  w-full
  bg-[#7e003e]
  "
/>

{/* White Border */}

<div
  className="
  pointer-events-none
  absolute
  inset-0
  rounded-[30px]
  border
  border-white/70
  "
/>

</motion.article>
  );
}