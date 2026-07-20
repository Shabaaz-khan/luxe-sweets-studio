// import { products } from "@/lib/menu";

export function Marquee({
  items,
}: {
  items: string[];
}) {
  
  const track = [...items, ...items];

  return (
    <div className="relative bg-gradient-burgundy text-cream border-y border-gold/20 overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-burgundy-deep to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-burgundy-deep to-transparent z-10" />
      <div className="flex animate-marquee whitespace-nowrap py-6">
        {track.map((label, i) => (
          <span key={i} className="mx-8 flex items-center gap-8 shrink-0">
            <span className="font-display text-3xl md:text-4xl italic text-cream/90">{label}</span>
            <span className="w-2 h-2 rounded-full bg-gold" />
          </span>
        ))}
      </div>
    </div>
  );
}
