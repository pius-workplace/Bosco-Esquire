import { Suspense, lazy, useLayoutEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Minus, Plus, Truck, ShieldCheck, Store, Box } from 'lucide-react'
import { bySlug, products, fmt, waLink } from '../data/products'
import { useCart } from '../lib/cart'
import { asset } from '../lib/asset'
import { gsap } from '../lib/motion'
import ProductCard from '../components/ProductCard'
import BrandTile from '../components/BrandTile'
import { WhatsApp } from '../components/Icons'
import NotFound from './NotFound'

const Jar3D = lazy(() => import('../components/Jar3D'))

export default function Product() {
  const { slug = '' } = useParams()
  const p = bySlug(slug)
  const [v, setV] = useState(0)
  const [qty, setQty] = useState(1)
  const [img, setImg] = useState(0)
  const [view3d, setView3d] = useState(false)
  const { add, setOpen } = useCart()
  const root = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    setV(0); setQty(1); setImg(0); setView3d(false)
    const ctx = gsap.context(() => {
      gsap.from('.pd-media', { clipPath: 'inset(0 0 100% 0 round 28px)', duration: 1.3, ease: 'expo.out' })
      gsap.from('.pd-rise', { y: 40, opacity: 0, stagger: 0.07, duration: 0.9, ease: 'power3.out', delay: 0.2 })
    }, root)
    return () => ctx.revert()
  }, [slug])

  if (!p) return <NotFound />
  const variant = p.variants[v]
  const related = products.filter(x => x.slug !== p.slug && x.category === p.category).concat(products.filter(x => x.slug !== p.slug && x.collection === p.collection && x.category !== p.category && x.images.length)).slice(0, 4)
  const onRequest = variant.price === 0

  return (
    <div ref={root} className="pt-28 md:pt-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <Link to="/shop" className="inline-flex items-center gap-2 text-sm font-bold text-bark hover:text-honey"><ArrowLeft size={16} /> Back to shop</Link>
        <div className="mt-6 grid lg:grid-cols-[1.15fr_1fr] gap-10 lg:gap-16">
          <div>
            <div className="pd-media relative aspect-[4/5] rounded-[28px] overflow-hidden bg-sand">
              {view3d && p.has3d ? (
                <div className="absolute inset-0 bg-gradient-to-b from-amber/25 to-cream"><Suspense fallback={null}><Jar3D size={variant.label} /></Suspense></div>
              ) : p.images.length ? (
                p.images.map((s, i) => <img key={s} src={asset(s)} alt={p.name} className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${i === img ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`} />)
              ) : <BrandTile name={p.name} />}
              {p.has3d && (
                <button onClick={() => setView3d(x => !x)} className="absolute right-4 top-4 btn btn-amber !py-2.5 !px-4 text-sm"><Box size={16} />{view3d ? 'Photos' : 'View in 3D'}</button>
              )}
            </div>
            {p.images.length > 1 && !view3d && (
              <div className="mt-3 flex gap-3">
                {p.images.map((s, i) => <button key={s} onClick={() => setImg(i)} className={`w-20 h-24 rounded-xl overflow-hidden border-2 transition ${i === img ? 'border-amber' : 'border-transparent opacity-70'}`}><img src={asset(s)} alt="" className="w-full h-full object-cover" /></button>)}
              </div>
            )}
          </div>

          <div className="lg:pt-6">
            <div className="pd-rise eyebrow">{p.collection === 'atelier' ? 'Bosco Atelier' : 'Bosco Naturals'} · {p.category}</div>
            <h1 className="pd-rise display-l mt-3">{p.name}</h1>
            <div className="pd-rise mt-4 font-display font-extrabold text-3xl text-honey">{fmt(variant.price)}</div>
            <p className="pd-rise mt-5 text-lg text-bark leading-relaxed">{p.short}</p>

            {p.variants.length > 1 && (
              <div className="pd-rise mt-7">
                <div className="text-sm font-bold mb-2">Choose</div>
                <div className="flex flex-wrap gap-2">
                  {p.variants.map((x, i) => (
                    <button key={x.label} onClick={() => setV(i)} className={`px-5 py-3 rounded-2xl border-2 text-left transition ${i === v ? 'border-cocoa bg-cocoa text-white' : 'border-black/10 hover:border-cocoa/40'}`}>
                      <div className="font-bold">{x.label}</div><div className={`text-sm ${i === v ? 'text-amber' : 'text-honey'}`}>{fmt(x.price)}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="pd-rise mt-7 flex flex-wrap gap-3">
              {!onRequest && (
                <div className="flex items-center border-2 border-black/10 rounded-full">
                  <button className="w-12 h-12 grid place-items-center" onClick={() => setQty(Math.max(1, qty - 1))} aria-label="Decrease quantity"><Minus size={16} /></button>
                  <span className="w-8 text-center font-bold">{qty}</span>
                  <button className="w-12 h-12 grid place-items-center" onClick={() => setQty(qty + 1)} aria-label="Increase quantity"><Plus size={16} /></button>
                </div>
              )}
              {!onRequest && <button className="btn btn-amber flex-1 justify-center" onClick={() => { add(p.slug, variant.label, variant.price, qty); setOpen(true) }}>Add to basket — {fmt(variant.price * qty)}</button>}
              <a href={waLink(`Hi Bosco Esquire, I'd like to order ${qty} × ${p.name} (${variant.label}).`)} target="_blank" rel="noreferrer" className="btn bg-[#25D366] text-white flex-1 justify-center"><WhatsApp className="w-5 h-5" /> Order on WhatsApp</a>
            </div>

            <div className="pd-rise mt-8 grid sm:grid-cols-3 gap-3 text-sm">
              <div className="bg-sand rounded-2xl p-4"><Truck className="text-honey" size={20} /><div className="font-bold mt-2">Delivery</div><div className="text-bark">Nairobi & countrywide</div></div>
              <div className="bg-sand rounded-2xl p-4"><ShieldCheck className="text-honey" size={20} /><div className="font-bold mt-2">M-Pesa</div><div className="text-bark">Prompt sent to your phone</div></div>
              <div className="bg-sand rounded-2xl p-4"><Store className="text-honey" size={20} /><div className="font-bold mt-2">Pick up</div><div className="text-bark">The Imaara Mall</div></div>
            </div>

            {(p.details.length > 0 || p.source) && (
              <div className="pd-rise mt-8 border-t pt-6">
                <div className="font-display font-extrabold text-xl">Good to know</div>
                <ul className="mt-3 space-y-2">{p.details.map(d => <li key={d} className="flex gap-3"><span className="mt-2 w-2 h-2 rotate-45 bg-amber shrink-0" />{d}</li>)}</ul>
              </div>
            )}
            {p.category === 'Honey & Hive' && (
              <div className="pd-rise mt-6 rounded-2xl bg-cocoa text-white p-6 honeycomb-bg">
                <div className="font-display font-extrabold text-xl text-amber">Proof of purity</div>
                <dl className="mt-3 grid grid-cols-2 gap-y-2 text-sm">
                  <dt className="text-white/60">Source</dt><dd className="font-semibold">{p.source ?? 'Bosco apiaries'}</dd>
                  <dt className="text-white/60">Batch</dt><dd className="font-semibold">Printed on your jar</dd>
                  <dt className="text-white/60">Lab report</dt><dd className="font-semibold">Published as each batch is tested</dd>
                </dl>
              </div>
            )}
          </div>
        </div>

        {related.length > 0 && (
          <section className="py-24">
            <h2 className="display-m">You may also like</h2>
            <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-x-4 md:gap-x-6 gap-y-10">{related.map(r => <ProductCard key={r.slug} p={r} />)}</div>
          </section>
        )}
      </div>
    </div>
  )
}
