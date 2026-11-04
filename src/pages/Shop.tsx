import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, SlidersHorizontal } from 'lucide-react'
import { products, priceOf, type Category } from '../data/products'
import ProductCard from '../components/ProductCard'
import { gsap } from '../lib/motion'
import { asset } from '../lib/asset'

const naturalsCats: Category[] = ['Honey & Hive', 'Body Care', 'Home & Aroma', 'Pantry', 'Apéritifs & Digestifs']
const atelierCats: Category[] = ['Leather Bags', 'Small Leather', 'Canvas & Knit', 'Objects & Drinkware']

export default function Shop() {
  const [params, setParams] = useSearchParams()
  const coll = params.get('c') as 'naturals' | 'atelier' | null
  const cat = params.get('cat')
  const [q, setQ] = useState('')
  const [sort, setSort] = useState('featured')
  const grid = useRef<HTMLDivElement>(null)
  const head = useRef<HTMLDivElement>(null)

  const list = useMemo(() => {
    let l = products.filter(p => (!coll || p.collection === coll) && (!cat || p.category === cat) && (!q || (p.name + p.short + p.category).toLowerCase().includes(q.toLowerCase())))
    if (sort === 'low') l = [...l].sort((a, b) => (priceOf(a) || 1e9) - (priceOf(b) || 1e9))
    if (sort === 'high') l = [...l].sort((a, b) => priceOf(b) - priceOf(a))
    if (sort === 'featured') l = [...l].sort((a, b) => (Number(!!b.bestseller) * 2 + Number(b.images.length > 0)) - (Number(!!a.bestseller) * 2 + Number(a.images.length > 0)))
    return l
  }, [coll, cat, q, sort])

  useLayoutEffect(() => {
    gsap.from(head.current!.querySelectorAll('.rise'), { y: 50, opacity: 0, stagger: 0.08, duration: 1, ease: 'power3.out' })
  }, [])
  useEffect(() => {
    if (!grid.current) return
    gsap.fromTo(grid.current.children, { y: 40, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.035, duration: 0.7, ease: 'power3.out' })
  }, [list])

  const set = (k: string, v: string | null) => { const n = new URLSearchParams(params); if (v) n.set(k, v); else n.delete(k); if (k === 'c') n.delete('cat'); setParams(n) }
  const cats = coll === 'atelier' ? atelierCats : coll === 'naturals' ? naturalsCats : [...naturalsCats, ...atelierCats]
  const heroImg = coll === 'atelier' ? 'img/products/leather-messenger.jpg' : 'img/products/honey.jpg'

  return (
    <div>
      <div ref={head} className="relative bg-cocoa text-white pt-36 pb-16 overflow-hidden">
        <img src={asset(heroImg)} alt="" className="absolute right-0 top-0 h-full w-1/2 object-cover opacity-40 [mask-image:linear-gradient(to_left,black,transparent)]" />
        <div className="relative mx-auto max-w-[1400px] px-5 md:px-10">
          <div className="eyebrow !text-amber rise">{coll === 'atelier' ? 'Bosco Atelier' : coll === 'naturals' ? 'Bosco Naturals' : 'The full collection'}</div>
          <h1 className="display-l mt-3 rise">{cat ?? (coll === 'atelier' ? 'Handcrafted leather & more' : coll === 'naturals' ? 'From the hive & the field' : 'Shop everything')}</h1>
          <p className="mt-4 text-white/70 rise">{list.length} products · Pay with M-Pesa · Delivery across Kenya</p>
          <div className="mt-8 flex flex-wrap gap-2 rise">
            {[{ v: null, l: 'All' }, { v: 'naturals', l: 'Bosco Naturals' }, { v: 'atelier', l: 'Bosco Atelier' }].map(o => (
              <button key={o.l} onClick={() => set('c', o.v)} className={`px-5 py-2.5 rounded-full font-bold text-sm transition ${coll === o.v ? 'bg-amber text-cocoa' : 'bg-white/10 hover:bg-white/20'}`}>{o.l}</button>
            ))}
          </div>
        </div>
      </div>

      <div className="sticky top-[72px] z-30 bg-white/90 backdrop-blur-xl border-b">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10 py-3 flex flex-wrap gap-3 items-center">
          <div className="flex gap-2 overflow-x-auto no-scrollbar flex-1 min-w-0">
            <button onClick={() => set('cat', null)} className={`shrink-0 px-4 py-2 rounded-full text-sm font-semibold border ${!cat ? 'bg-cocoa text-white border-cocoa' : 'border-black/10'}`}>All categories</button>
            {cats.map(c => <button key={c} onClick={() => set('cat', c)} className={`shrink-0 px-4 py-2 rounded-full text-sm font-semibold border transition ${cat === c ? 'bg-cocoa text-white border-cocoa' : 'border-black/10 hover:border-cocoa/40'}`}>{c}</button>)}
          </div>
          <label className="flex items-center gap-2 bg-sand rounded-full px-4 py-2 w-full sm:w-64"><Search size={16} /><input value={q} onChange={e => setQ(e.target.value)} placeholder="Search honey, bags…" className="bg-transparent outline-none text-sm w-full" /></label>
          <label className="flex items-center gap-2 text-sm font-semibold"><SlidersHorizontal size={16} />
            <select value={sort} onChange={e => setSort(e.target.value)} className="bg-transparent outline-none font-semibold">
              <option value="featured">Featured</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option>
            </select>
          </label>
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-5 md:px-10 py-14">
        {list.length === 0 && <div className="text-center py-24"><div className="display-m">Nothing matches "{q}"</div><p className="mt-3 text-bark">Ask us on WhatsApp — we may have it in the shop.</p></div>}
        <div ref={grid} className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 md:gap-x-6 gap-y-12">
          {list.map(p => <ProductCard key={p.slug} p={p} />)}
        </div>
      </div>
    </div>
  )
}
