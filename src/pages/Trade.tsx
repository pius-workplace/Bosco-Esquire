import { useState } from 'react'
import { Plus, Trash2, Check } from 'lucide-react'
import { products, fmt, waLink } from '../data/products'
import { asset } from '../lib/asset'

export default function Trade() {
  const [rows, setRows] = useState([{ slug: 'raw-honey', qty: 24 }, { slug: 'aromatherapy-candles', qty: 12 }])
  const [sent, setSent] = useState(false)
  const [org, setOrg] = useState('')
  const summary = rows.map(r => `${r.qty} × ${products.find(p => p.slug === r.slug)?.name}`).join(', ')
  return (
    <div>
      <section className="relative bg-cocoa text-white pt-40 pb-20 overflow-hidden">
        <img src={asset('img/products/wine-pour.jpg')} alt="" className="absolute right-0 top-0 h-full w-1/2 object-cover opacity-40 [mask-image:linear-gradient(to_left,black,transparent)]" />
        <div className="relative mx-auto max-w-[1400px] px-5 md:px-10">
          <div className="eyebrow !text-amber">Trade & corporate gifting</div>
          <h1 className="display-l mt-3 max-w-4xl">Bosco for your guests, your team and your shelves.</h1>
          <p className="mt-5 text-white/75 max-w-xl">Hotels, restaurants, offices and retailers: build a list, tell us where it goes, and we send a quote — on WhatsApp or email.</p>
          <div className="mt-8 flex flex-wrap gap-2 text-sm font-semibold">{['Hotel amenities', 'Restaurant honey & wine', 'Corporate gift boxes', 'Retail stockists', 'Event favours'].map(t => <span key={t} className="bg-white/10 rounded-full px-4 py-2">{t}</span>)}</div>
        </div>
      </section>
      <section className="mx-auto max-w-[1100px] px-5 md:px-10 py-20">
        {sent ? (
          <div className="text-center py-16"><div className="w-20 h-20 rounded-full bg-amber grid place-items-center mx-auto"><Check size={36} /></div><h2 className="display-m mt-6">Quote request ready</h2><p className="mt-3 text-bark">We've opened WhatsApp with your list so you can send it to Bosco.</p></div>
        ) : (
          <form onSubmit={e => { e.preventDefault(); window.open(waLink(`Trade quote request from ${org}: ${summary}`), '_blank'); setSent(true) }} className="grid lg:grid-cols-[1.4fr_1fr] gap-10">
            <div>
              <h2 className="display-m">Build your list</h2>
              <div className="mt-6 space-y-3">
                {rows.map((r, i) => (
                  <div key={i} className="flex gap-3 items-center bg-sand rounded-2xl p-3">
                    <select value={r.slug} onChange={e => setRows(rows.map((x, k) => k === i ? { ...x, slug: e.target.value } : x))} className="flex-1 bg-white rounded-xl px-3 py-3 font-semibold outline-none">
                      {products.map(p => <option key={p.slug} value={p.slug}>{p.name} — {fmt(p.variants[0].price)}</option>)}
                    </select>
                    <input type="number" min={1} value={r.qty} onChange={e => setRows(rows.map((x, k) => k === i ? { ...x, qty: +e.target.value } : x))} className="w-24 bg-white rounded-xl px-3 py-3 font-bold outline-none" aria-label="Quantity" />
                    <button type="button" onClick={() => setRows(rows.filter((_, k) => k !== i))} className="w-11 h-11 grid place-items-center rounded-xl hover:bg-white" aria-label="Remove"><Trash2 size={18} /></button>
                  </div>
                ))}
              </div>
              <button type="button" onClick={() => setRows([...rows, { slug: products[0].slug, qty: 10 }])} className="mt-4 btn btn-ghost"><Plus size={18} /> Add a product</button>
            </div>
            <div className="bg-cocoa text-white rounded-[28px] p-8 space-y-4">
              <h2 className="font-display font-extrabold text-2xl">Your details</h2>
              {[['Business name', 'text', org, setOrg], ['Contact person', 'text'], ['Phone', 'tel'], ['Email', 'email'], ['Delivery location', 'text']].map(([l, t, val, set]) => (
                <label key={l as string} className="block"><span className="text-sm text-white/70">{l as string}</span>
                  <input required type={t as string} value={val as string | undefined} onChange={set ? e => (set as (s: string) => void)(e.target.value) : undefined} className="mt-1 w-full bg-white/10 rounded-xl px-4 py-3 outline-none focus:ring-2 ring-amber" /></label>
              ))}
              <button className="btn btn-amber w-full justify-center">Request a quote</button>
              <p className="text-xs text-white/50">Quotes are usually sent within one working day.</p>
            </div>
          </form>
        )}
      </section>
    </div>
  )
}
