import { asset } from "../lib/asset";
// Shown until Bosco's product photo shoot covers this item. Uses the real Bosco mark, not a stock image.
export default function BrandTile({
  name,
  small = false,
}: {
  name: string;
  small?: boolean;
}) {
  return (
    <div className="absolute inset-0 bg-cocoa honeycomb-bg flex flex-col items-center justify-center text-center p-6">
      <img
        src={asset("img/logo.png")}
        alt=""
        className={small ? "w-14 h-14 mb-3" : "w-24 h-24 mb-5"}
      />
      <div
        className={`font-display font-extrabold text-amber leading-tight ${small ? "text-lg" : "text-2xl"}`}
      >
        {name}
      </div>
      <div className="mt-2 text-[10px] tracking-[.25em] uppercase text-white/50">
        Photo shoot coming
      </div>
    </div>
  );
}
