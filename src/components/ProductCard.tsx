import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Check } from 'lucide-react'
import { type Product, priceLabel, fmt } from '../data/products'
import { useCart } from '../lib/cart'
import { asset } from '../lib/asset'
import BrandTile from './BrandTile'

export default function ProductCard({ p, tone = 'light' }: { p: Product; tone?: 'light' | 'dark' }) {
  const { add, setOpen } = useCart()
  const [pick, setPick] = useState(false)
  const [done, setDone] = useState(false)
  const quick = (label: string, price: number) => {
    add(p.slug, label, price); setPick(false); setDone(true); setOpen(true)
    setTimeout(() => setDone(false), 1400)
  }
  const onAdd = () => {
    if (p.variants[0].price === 0) { window.open(`https://wa.me/254719487713?text=${encodeURIComponent('Hi Bosco, I would like ' + p.name)}`, '_blank'); return }
    if (p.variants.length > 1) setPick(v => !v); else quick(p.variants[0].label, p.variants[0].price)
  }
  const dark = tone === 'dark'
  return (
    <article className="group relative">
      <Link to={`/product/${p.slug}`} className={`block relative aspect-[4/5] overflow-hidden rounded-[22px] ${dark ? 'bg-bark' : 'bg-sand'}`}>
        {p.images[0] ? (
          <>
            <img src={asset(p.images[0])} alt={p.name} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition duration-[1.1s] ease-out group-hover:scale-[1.06]" />
            {p.images[1] && <img src={asset(p.images[1])} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover opacity-0 scale-110 transition duration-700 group-hover:opacity-100 group-hover:scale-100" />}
          </>
        ) : <BrandTile name={p.name} small />}
        <div className="absolute left-3 top-3 flex gap-2">
          {p.bestseller && <span className="bg-amber text-cocoa text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full">Bestseller</span>}
          {p.isNew && <span className="bg-white text-cocoa text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full">New</span>}
        </div>
      </Link>
      <div className="pt-3 sm:pt-4 flex items-start justify-between gap-2 sm:gap-3">
        <div>
          <div className={`text-[10px] sm:text-[11px] tracking-[.18em] uppercase font-bold ${dark ? 'text-amber/80' : 'text-honey'}`}>{p.category}</div>
          <Link to={`/product/${p.slug}`} className={`block font-display font-extrabold text-base sm:text-xl leading-tight mt-1 ${dark ? 'text-white' : 'text-ink'}`}>{p.name}</Link>
          <div className={`mt-1 text-sm sm:text-base font-semibold ${dark ? 'text-white/80' : 'text-bark'}`}>{priceLabel(p)}</div>
        </div>
        <button onClick={onAdd} aria-label={`Add ${p.name} to cart`}
          className={`shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full grid place-items-center transition duration-300 ${done ? 'bg-green-600 text-white' : 'bg-amber text-cocoa hover:rotate-90 hover:scale-110'}`}>
          {done ? <Check size={20} /> : <Plus size={22} strokeWidth={2.5} />}
        </button>
      </div>
      {pick && (
        <div className="absolute right-0 bottom-20 z-20 bg-white rounded-2xl shadow-2xl p-2 min-w-[190px] border border-black/5">
          {p.variants.map(v => (
            <button key={v.label} onClick={() => quick(v.label, v.price)} className="w-full flex justify-between gap-4 px-3 py-2.5 rounded-xl hover:bg-sand text-sm font-semibold text-ink">
              <span>{v.label}</span><span className="text-honey">{fmt(v.price)}</span>
            </button>
          ))}
        </div>
      )}
    </article>
  )
}
