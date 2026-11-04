import { Suspense, lazy } from "react";
import { Link } from "react-router-dom";
import { MapPin, Phone, Rotate3d, Camera } from "lucide-react";
import { waLink } from "../data/products";
import { hotspots } from "../data/tour";

const Tour360 = lazy(() => import("../components/Tour360"));

export default function Visit() {
  return (
    <div className="bg-cocoa text-white">
      <section className="relative h-[100svh] min-h-[620px]">
        <Suspense
          fallback={
            <div className="absolute inset-0 grid place-items-center text-amber">
              Loading the shop…
            </div>
          }
        >
          <Tour360 />
        </Suspense>
        <div className="pointer-events-none absolute inset-x-0 top-0 pt-28 pb-16 bg-gradient-to-b from-cocoa/90 to-transparent">
          <div className="mx-auto max-w-[1400px] px-5 md:px-10">
            <div className="eyebrow !text-amber">Virtual visit</div>
            <h1 className="display-l mt-2">Inside Bosco Esquire</h1>
            <p className="mt-3 text-white/80 flex items-center gap-2">
              <Rotate3d className="text-amber" size={20} /> Drag to look around
              · tap a hotspot to open the product
            </p>
          </div>
        </div>
        <div className="absolute left-5 md:left-10 bottom-6 max-w-md bg-white/10 backdrop-blur-xl rounded-2xl p-4 text-sm flex gap-3">
          <Camera className="text-amber shrink-0" size={20} />
          <span>
            <b>Preview Tour.</b>
            
          </span>
        </div>
      </section>
      <section className="mx-auto max-w-[1400px] px-5 md:px-10 py-20 grid md:grid-cols-3 gap-6">
        <div className="rounded-3xl bg-white/5 p-8">
          <MapPin className="text-amber" />
          <h2 className="font-display font-extrabold text-2xl mt-4">
            The Imaara Mall
          </h2>
          <p className="text-white/70 mt-2">Off Mombasa Road, Nairobi, Kenya</p>
          <a
            className="btn btn-amber mt-6"
            href="https://www.google.com/maps/search/?api=1&query=The+Imaara+Mall+Mombasa+Road+Nairobi"
            target="_blank"
            rel="noreferrer"
          >
            Get directions
          </a>
        </div>
        <div className="rounded-3xl bg-white/5 p-8">
          <Phone className="text-amber" />
          <h2 className="font-display font-extrabold text-2xl mt-4">
            Call or WhatsApp
          </h2>
          <p className="text-white/70 mt-2">
            +254 719 487 713 — ask about opening hours, stock or a private
            tasting.
          </p>
          <a
            className="btn btn-ghost mt-6"
            href={waLink("Hi Bosco, I would like to visit the shop")}
            target="_blank"
            rel="noreferrer"
          >
            Message us
          </a>
        </div>
        <div className="rounded-3xl bg-white/5 p-8">
          <h2 className="font-display font-extrabold text-2xl">In the tour</h2>
          <ul className="mt-4 space-y-2">
            {hotspots.map((h) => (
              <li key={h.label}>
                <Link
                  className="text-amber font-semibold hover:underline"
                  to={h.to}
                >
                  {h.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
