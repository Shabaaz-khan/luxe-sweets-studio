import hero from "@/assets/hero-sweets.jpg";
import sweet2 from "@/assets/sweet-2.jpg";
import savoury1 from "@/assets/savoury-1.jpg";
import corporate from "@/assets/corporate-gift.jpg";

export type Product = {
  id: string;
  name: string;
  hindi?: string;
  category: "sweets" | "savouries" | "gifting";
  price: number; // per 250g or per box
  unit: string;
  image: string;
  desc: string;
  featured?: boolean;
};

export const products: Product[] = [
  {
    id: "kaju-katli",
    name: "Kaju Katli Royale",
    hindi: "काजू कतली",
    category: "sweets",
    price: 780,
    unit: "250g",
    image: hero,
    desc: "Slow-cooked cashew fudge with edible silver leaf. A house signature.",
    featured: true,
  },
  {
    id: "gulab-jamun",
    name: "Rose Gulab Jamun",
    hindi: "गुलाब जामुन",
    category: "sweets",
    price: 460,
    unit: "12 pcs",
    image: sweet2,
    desc: "Milk dumplings bathed in rose-cardamom syrup with pistachio.",
    featured: true,
  },
  {
    id: "pista-barfi",
    name: "Pistachio Kesar Barfi",
    hindi: "पिस्ता केसर बर्फी",
    category: "sweets",
    price: 890,
    unit: "250g",
    image: hero,
    desc: "Ground pistachio pressed with saffron milk and cardamom.",
  },
  {
    id: "motichoor",
    name: "Motichoor Ladoo",
    hindi: "मोतीचूर लड्डू",
    category: "sweets",
    price: 520,
    unit: "8 pcs",
    image: hero,
    desc: "Fine pearls of gram flour bound in ghee and warm sugar.",
  },
  {
    id: "chakli",
    name: "Bhaajni Chakli",
    hindi: "चकली",
    category: "savouries",
    price: 340,
    unit: "250g",
    image: savoury1,
    desc: "Traditional multi-grain spiral, roasted, never fried heavy.",
    featured: true,
  },
  {
    id: "sev",
    name: "Ratlami Sev",
    hindi: "रतलामी सेव",
    category: "savouries",
    price: 280,
    unit: "250g",
    image: savoury1,
    desc: "Fine clove-pepper sev from a 60-year-old family recipe.",
  },
  {
    id: "chivda",
    name: "Bombay Chivda",
    hindi: "चिवड़ा",
    category: "savouries",
    price: 320,
    unit: "250g",
    image: savoury1,
    desc: "Poha, peanuts, curry leaf, a whisper of sugar.",
  },
  {
    id: "corporate-box",
    name: "The Signature Corporate Box",
    category: "gifting",
    price: 2400,
    unit: "assorted",
    image: corporate,
    desc: "Twelve-piece assortment in a hand-finished burgundy box with gold foil.",
    featured: true,
  },
  {
    id: "diwali-box",
    name: "Diwali Heritage Hamper",
    category: "gifting",
    price: 3800,
    unit: "hamper",
    image: corporate,
    desc: "A curated celebration hamper — sweets, savouries, dry fruits, tea.",
  },
];

export const categories = [
  { id: "sweets", label: "Sweets", note: "Slow-crafted mithai" },
  { id: "savouries", label: "Savouries", note: "Salted, spiced, roasted" },
  { id: "gifting", label: "Gifting", note: "Corporate & celebration" },
] as const;
