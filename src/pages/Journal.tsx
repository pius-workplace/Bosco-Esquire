import { Link, useParams } from 'react-router-dom'
import { articles } from '../data/content'
import { bySlug } from '../data/products'
import { asset } from '../lib/asset'
import ProductCard from '../components/ProductCard'
import NotFound from './NotFound'

export function JournalList() {
  const [lead, ...rest] = articles
  return (
    <div className="pt-36 pb-24 mx-auto max-w-[1400px] px-5 md:px-10">
      <div className="eyebrow">The Bosco Journal</div>
      <h1 className="display-l mt-3">Stories from the hive, the field and the workshop.</h1>
      <Link to={`/journal/${lead.slug}`} className="group mt-12 grid lg:grid-cols-2 gap-8 items-center">
        <div className="aspect-[4/3] rounded-[28px] overflow-hidden"><img src={asset(lead.image)} alt="" className="w-full h-full object-cover group-hover:scale-105 transition duration-700" /></div>
        <div><div className="text-xs font-bold tracking-widest uppercase text-honey">{lead.category} · {lead.date}</div><h2 className="display-m mt-3 group-hover:text-honey transition">{lead.title}</h2><p className="mt-4 text-bark text-lg">{lead.body[0]}</p></div>
      </Link>
      <div className="mt-16 grid md:grid-cols-2 gap-8">
        {rest.map(a => (
          <Link key={a.slug} to={`/journal/${a.slug}`} className="group">
            <div className="aspect-[16/10] rounded-[24px] overflow-hidden"><img src={asset(a.image)} alt="" className="w-full h-full object-cover group-hover:scale-105 transition duration-700" /></div>
            <div className="mt-4 text-xs font-bold tracking-widest uppercase text-honey">{a.category} · {a.read}</div>
            <h3 className="font-display font-extrabold text-2xl mt-2">{a.title}</h3>
          </Link>
        ))}
      </div>
    </div>
  )
}

export function Article() {
  const { slug } = useParams()
  const a = articles.find(x => x.slug === slug)
  if (!a) return <NotFound />
  return (
    <article>
      <div className="relative h-[70vh] min-h-[480px]">
        <img src={asset(a.image)} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-cocoa via-cocoa/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-[900px] px-5 pb-14 text-white">
          <div className="eyebrow !text-amber">{a.category} · {a.date} · {a.read}</div>
          <h1 className="display-l mt-3">{a.title}</h1>
        </div>
      </div>
      <div className="mx-auto max-w-[760px] px-5 py-16 space-y-6 text-lg leading-relaxed text-bark">{a.body.map((p, i) => <p key={i}>{p}</p>)}</div>
      <div className="mx-auto max-w-[1100px] px-5 pb-24">
        <div className="font-display font-extrabold text-2xl">Shop this story</div>
        <div className="mt-6 grid grid-cols-2 gap-6">{a.products.map(s => bySlug(s)).filter(Boolean).map(p => <ProductCard key={p!.slug} p={p!} />)}</div>
      </div>
    </article>
  )
}
