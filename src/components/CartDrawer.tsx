import { Link } from 'react-router-dom'
import { X, Minus, Plus } from 'lucide-react'
import { useCart } from '../lib/cart'
import { bySlug, fmt } from '../data/products'
import { asset } from '../lib/asset'
import BrandTile from './BrandTile'

export const FREE_DELIVERY = 5000

export default function CartDrawer() {
  const { open, setOpen, lines, setQty, subtotal, count } = useCart()
  const left = Math.max(0, FREE_DELIVERY - subtotal)
  return (
    <div className={`fixed inset-0 z-[70] ${open ? '' : 'pointer-events-none'}`} aria-hidden={!open}>
      <div onClick={() => setOpen(false)} className={`absolute inset-0 bg-black/50 transition-opacity duration-500 ${open ? 'opacity-100' : 'opacity-0'}`} />
      <aside className={`absolute right-0 top-0 h-full w-full max-w-[440px] bg-white flex flex-col transition-transform duration-500 ease-[cubic-bezier(.7,0,.2,1)] ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center justify-between px-6 py-5 border-b">
          <div className="font-display font-extrabold text-2xl">Your basket <span className="text-honey">({count})</span></div>
          <button onClick={() => setOpen(false)} aria-label="Close basket" className="w-10 h-10 grid place-items-center rounded-full hover:bg-sand"><X /></button>
        </div>
        <div className="px-6 py-4 bg-sand/60">
          <div className="text-sm font-semibold">{left > 0 ? <>Add <b className="text-honey">{fmt(left)}</b> for free Nairobi delivery</> : 'You have free Nairobi delivery'}</div>
          <div className="mt-2 h-2 rounded-full bg-white overflow-hidden"><div className="h-full bg-amber transition-all duration-700" style={{ width: `${Math.min(100, (subtotal / FREE_DELIVERY) * 100)}%` }} /></div>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4" data-lenis-prevent>
          {lines.length === 0 && <div className="text-center py-16"><div className="font-display font-extrabold text-2xl">Your basket is empty</div><Link to="/shop" onClick={() => setOpen(false)} className="btn btn-amber mt-6">Start shopping</Link></div>}
          {lines.map(l => { const p = bySlug(l.slug)!; return (
            <div key={l.slug + l.variant} className="flex gap-4">
              <div className="relative w-20 h-24 rounded-xl overflow-hidden bg-sand shrink-0">{p.images[0] ? <img src={asset(p.images[0])} alt="" className="w-full h-full object-cover" /> : <BrandTile name="" small />}</div>
              <div className="flex-1">
                <div className="font-bold leading-tight">{p.name}</div>
                <div className="text-sm text-bark/70">{l.variant}</div>
                <div className="mt-2 flex items-center justify-between">
                  <div className="flex items-center border rounded-full">
                    <button className="w-8 h-8 grid place-items-center" onClick={() => setQty(l.slug, l.variant, l.qty - 1)} aria-label="Decrease"><Minus size={14} /></button>
                    <span className="w-6 text-center text-sm font-bold">{l.qty}</span>
                    <button className="w-8 h-8 grid place-items-center" onClick={() => setQty(l.slug, l.variant, l.qty + 1)} aria-label="Increase"><Plus size={14} /></button>
                  </div>
                  <div className="font-bold">{fmt(l.price * l.qty)}</div>
                </div>
              </div>
            </div>) })}
        </div>
        {lines.length > 0 && (
          <div className="border-t px-6 py-5">
            <div className="flex justify-between font-display font-extrabold text-xl"><span>Subtotal</span><span>{fmt(subtotal)}</span></div>
            <p className="text-xs text-bark/70 mt-1">Delivery calculated at checkout. Pay securely with M-Pesa.</p>
            <Link to="/checkout" onClick={() => setOpen(false)} className="btn btn-amber w-full justify-center mt-4">Checkout with M-Pesa</Link>
          </div>
        )}
      </aside>
    </div>
  )
}
