import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Check, Smartphone, Loader2 } from 'lucide-react'
import { useCart } from '../lib/cart'
import { bySlug, fmt, waLink } from '../data/products'
import { asset } from '../lib/asset'
import BrandTile from '../components/BrandTile'
import { FREE_DELIVERY } from '../components/CartDrawer'

// Placeholder delivery options — Bosco sets the real zones and fees in the admin.
const DELIVERY = [
  { id: 'nairobi', label: 'Nairobi delivery', note: 'Same or next day', fee: 300 },
  { id: 'kenya', label: 'Countrywide courier', note: '1–3 days', fee: 600 },
  { id: 'pickup', label: 'Pick up at The Imaara Mall', note: 'Ready in 2 hours', fee: 0 },
]

export default function Checkout() {
  const { lines, subtotal, clear } = useCart()
  const [del, setDel] = useState('nairobi')
  const [phone, setPhone] = useState('')
  const [stage, setStage] = useState<'form' | 'stk' | 'done'>('form')
  const [order, setOrder] = useState('')
  const opt = DELIVERY.find(d => d.id === del)!
  const fee = opt.fee && subtotal >= FREE_DELIVERY && del === 'nairobi' ? 0 : opt.fee
  const total = subtotal + fee

  useEffect(() => {
    if (stage !== 'stk') return
    const t = setTimeout(() => { setOrder('BE-' + Math.floor(100000 + Math.random() * 899999)); setStage('done'); clear() }, 4500)
    return () => clearTimeout(t)
  }, [stage, clear])

  if (stage === 'done') return (
    <div className="min-h-screen grid place-items-center bg-cream px-5 pt-28 pb-16">
      <div className="max-w-lg w-full bg-white rounded-[32px] p-10 text-center shadow-xl">
        <div className="w-20 h-20 rounded-full bg-amber grid place-items-center mx-auto"><Check size={40} className="text-cocoa" /></div>
        <h1 className="display-m mt-6">Asante! Order received.</h1>
        <p className="mt-3 text-bark">Order <b>{order}</b> is confirmed. We'll send updates to {phone || 'your phone'} on WhatsApp as it's packed and dispatched.</p>
        <div className="mt-6 text-xs uppercase tracking-widest text-honey font-bold">Prototype — no real payment was taken</div>
        <Link to="/shop" className="btn btn-dark mt-8">Keep shopping</Link>
      </div>
    </div>
  )

  if (!lines.length) return (
    <div className="min-h-[80vh] grid place-items-center text-center px-5 pt-28"><div><h1 className="display-m">Your basket is empty</h1><Link to="/shop" className="btn btn-amber mt-6">Go to the shop</Link></div></div>
  )

  return (
    <div className="bg-cream min-h-screen pt-32 pb-24">
      <div className="mx-auto max-w-[1200px] px-5 md:px-10">
        <h1 className="display-l">Checkout</h1>
        <form onSubmit={e => { e.preventDefault(); setStage('stk') }} className="mt-10 grid lg:grid-cols-[1.3fr_1fr] gap-8">
          <div className="space-y-6">
            <div className="bg-white rounded-[28px] p-7">
              <h2 className="font-display font-extrabold text-2xl">Your details</h2>
              <div className="mt-5 grid sm:grid-cols-2 gap-4">
                <label className="block"><span className="text-sm font-semibold">Full name</span><input required className="mt-1 w-full bg-sand rounded-xl px-4 py-3 outline-none focus:ring-2 ring-amber" /></label>
                <label className="block"><span className="text-sm font-semibold">Email (optional)</span><input type="email" className="mt-1 w-full bg-sand rounded-xl px-4 py-3 outline-none focus:ring-2 ring-amber" /></label>
              </div>
            </div>
            <div className="bg-white rounded-[28px] p-7">
              <h2 className="font-display font-extrabold text-2xl">Delivery</h2>
              <div className="mt-5 space-y-3">
                {DELIVERY.map(d => (
                  <label key={d.id} className={`flex items-center justify-between gap-4 rounded-2xl border-2 p-4 cursor-pointer transition ${del === d.id ? 'border-cocoa bg-sand' : 'border-black/10'}`}>
                    <span className="flex items-center gap-3"><input type="radio" name="del" checked={del === d.id} onChange={() => setDel(d.id)} className="accent-[#2B2416] w-5 h-5" /><span><b>{d.label}</b><br /><span className="text-sm text-bark">{d.note}</span></span></span>
                    <b>{d.fee ? fmt(d.fee) : 'Free'}</b>
                  </label>
                ))}
              </div>
              {del !== 'pickup' && <label className="block mt-4"><span className="text-sm font-semibold">Delivery address & landmark</span><input required className="mt-1 w-full bg-sand rounded-xl px-4 py-3 outline-none focus:ring-2 ring-amber" placeholder="e.g. Kilimani, Argwings Kodhek Rd, next to…" /></label>}
            </div>
            <div className="bg-white rounded-[28px] p-7">
              <h2 className="font-display font-extrabold text-2xl flex items-center gap-3"><span className="bg-[#4CAF50] text-white text-sm font-extrabold px-3 py-1 rounded-lg">M-PESA</span> Pay with M-Pesa</h2>
              <label className="block mt-5"><span className="text-sm font-semibold">M-Pesa phone number</span>
                <input required value={phone} onChange={e => setPhone(e.target.value)} pattern="^(?:\+?254|0)?7\d{8}$|^(?:\+?254|0)?1\d{8}$" placeholder="07XX XXX XXX" className="mt-1 w-full bg-sand rounded-xl px-4 py-3 outline-none focus:ring-2 ring-amber text-lg font-bold tracking-wide" /></label>
              <p className="mt-2 text-sm text-bark">You'll get a prompt on this phone. Enter your M-Pesa PIN to pay — we never see it.</p>
            </div>
          </div>
          <aside className="bg-white rounded-[28px] p-7 h-max lg:sticky lg:top-28">
            <h2 className="font-display font-extrabold text-2xl">Order summary</h2>
            <div className="mt-5 space-y-4 max-h-[300px] overflow-auto" data-lenis-prevent>
              {lines.map(l => { const p = bySlug(l.slug)!; return (
                <div key={l.slug + l.variant} className="flex gap-3 items-center">
                  <div className="relative w-14 h-16 rounded-lg overflow-hidden bg-sand shrink-0">{p.images[0] ? <img src={asset(p.images[0])} alt="" className="w-full h-full object-cover" /> : <BrandTile name="" small />}</div>
                  <div className="flex-1 text-sm"><b>{p.name}</b><div className="text-bark">{l.variant} × {l.qty}</div></div><b className="text-sm">{fmt(l.price * l.qty)}</b>
                </div>) })}
            </div>
            <div className="mt-6 border-t pt-4 space-y-2 text-sm">
              <div className="flex justify-between"><span>Subtotal</span><b>{fmt(subtotal)}</b></div>
              <div className="flex justify-between"><span>Delivery</span><b>{fee ? fmt(fee) : 'Free'}</b></div>
              <div className="flex justify-between font-display font-extrabold text-2xl pt-2"><span>Total</span><span>{fmt(total)}</span></div>
            </div>
            <button className="btn btn-amber w-full justify-center mt-6 text-base"><Smartphone size={20} /> Pay {fmt(total)} with M-Pesa</button>
            <a href={waLink('Hi Bosco, I need help with my order')} target="_blank" rel="noreferrer" className="block text-center text-sm font-semibold mt-4 underline">Need help? Chat on WhatsApp</a>
          </aside>
        </form>
      </div>
      {stage === 'stk' && (
        <div className="fixed inset-0 z-[80] bg-black/60 grid place-items-center px-5">
          <div className="bg-white rounded-[32px] p-10 max-w-sm w-full text-center">
            <div className="mx-auto w-24 h-40 rounded-[22px] border-4 border-cocoa relative grid place-items-center">
              <div className="absolute top-2 w-8 h-1 rounded bg-cocoa/30" />
              <div className="bg-[#4CAF50] text-white text-[10px] font-bold rounded-lg px-2 py-3 mx-2 animate-pulse">Enter M-Pesa PIN to pay {fmt(total)}</div>
            </div>
            <h2 className="font-display font-extrabold text-2xl mt-6">Check your phone</h2>
            <p className="text-bark mt-2">We've sent an M-Pesa prompt to {phone}. Enter your PIN to complete payment.</p>
            <div className="mt-6 flex items-center justify-center gap-2 text-sm font-semibold text-honey"><Loader2 className="animate-spin" size={18} /> Waiting for confirmation…</div>
            <div className="mt-4 text-[11px] uppercase tracking-widest text-bark/60">Prototype simulation</div>
          </div>
        </div>
      )}
    </div>
  )
}
