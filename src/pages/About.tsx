import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { gsap, splitWords } from '../lib/motion'
import { asset } from '../lib/asset'
import { reasons } from '../data/content'

export default function About() {
  const root = useRef<HTMLDivElement>(null)
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      root.current!.querySelectorAll<HTMLElement>('[data-split]').forEach(el => gsap.from(splitWords(el), { yPercent: 115, stagger: 0.05, duration: 1, ease: 'power4.out', scrollTrigger: { trigger: el, start: 'top 85%' } }))
      gsap.utils.toArray<HTMLElement>('[data-rise]').forEach(el => gsap.from(el, { y: 50, opacity: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%' } }))
      gsap.utils.toArray<HTMLElement>('.par').forEach(el => gsap.fromTo(el, { yPercent: -10 }, { yPercent: 10, ease: 'none', scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } }))
      gsap.from('.collage > *', { y: 120, rotate: (i) => [-6, 4, -3, 5][i % 4], opacity: 0, stagger: 0.12, duration: 1.4, ease: 'expo.out', delay: 0.3 })
    }, root)
    return () => ctx.revert()
  }, [])
  return (
    <div ref={root}>
      <section className="relative bg-cocoa text-white pt-40 pb-24 overflow-hidden">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="eyebrow !text-amber">About us</div>
            <h1 className="display-l mt-4" data-split>Organically & bespokely you.</h1>
            <p className="mt-8 text-lg text-white/80 max-w-xl" data-rise>Bosco Esquire is a one-stop home for everyday organic essentials and locally made luxury goods. Our honey, hive products and body care come from Bosco Farms and the Kenyan producers we work with; our leather and apparel are handmade by local artisans, many pieces made to order.</p>
          </div>
          <div className="collage relative h-[520px]">
            <img src={asset('img/products/market-stall.jpg')} alt="Bosco Esquire market stall" className="absolute left-0 top-0 w-[55%] h-[62%] object-cover rounded-3xl shadow-2xl" />
            <img src={asset('img/products/apparel-crew.jpg')} alt="Bosco Esquire apparel crew" className="absolute right-0 top-10 w-[48%] h-[48%] object-cover rounded-3xl shadow-2xl" />
            <img src={asset('img/products/customers.jpg')} alt="Customers with Bosco products" className="absolute left-[18%] bottom-0 w-[44%] h-[46%] object-cover rounded-3xl shadow-2xl" />
            <img src={asset('img/products/award.jpg')} alt="Bosco Esquire receiving recognition" className="absolute right-[4%] bottom-6 w-[34%] h-[40%] object-cover rounded-3xl shadow-2xl" />
          </div>
        </div>
      </section>

      <section className="bg-white py-24 md:py-32">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10 grid md:grid-cols-2 gap-6">
          <div className="rounded-[28px] bg-amber text-cocoa p-10 md:p-14" data-rise>
            <div className="eyebrow !text-cocoa/70">Our mission</div>
            <p className="display-m mt-4">To be a convenient one-stop fulfilment zone for everyday needs, while promoting quality, locally produced luxury Kenyan goods.</p>
          </div>
          <div className="rounded-[28px] bg-cocoa text-white p-10 md:p-14" data-rise>
            <div className="eyebrow !text-amber">Our vision</div>
            <p className="display-m mt-4">A healthier, elevated lifestyle built on organic products from Bosco Farms and Kenyan entrepreneurs who share our values.</p>
          </div>
        </div>
      </section>

      <section className="bg-cream py-24 md:py-32 overflow-hidden">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <div className="eyebrow">Why choose us</div>
          <h2 className="display-l mt-3" data-split>Why buy from Bosco?</h2>
          <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reasons.map(r => (
              <div key={r.title} className="group rounded-[28px] overflow-hidden bg-white shadow-sm" data-rise>
                <div className="relative h-64 overflow-hidden"><img src={asset(r.image)} alt="" className="par absolute inset-0 w-full h-[120%] object-cover" /></div>
                <div className="p-7"><h3 className="font-display font-extrabold text-2xl">{r.title}</h3><p className="mt-3 text-bark">{r.text}</p></div>
              </div>
            ))}
            <div className="rounded-[28px] bg-cocoa text-white p-8 flex flex-col justify-between" data-rise>
              <div><div className="font-display font-extrabold text-3xl">Retail, wholesale and gifting</div><p className="mt-3 text-white/75">Individual orders and bulk orders are welcome — ask for trade pricing.</p></div>
              <Link to="/trade" className="btn btn-amber mt-8 self-start">Trade enquiries <ArrowRight size={18} /></Link>
            </div>
          </div>
        </div>
      </section>

      <section className="relative h-[80vh] overflow-hidden">
        <img src={asset('img/products/bee-hive.jpg')} alt="Honeybees on comb" className="par absolute inset-0 w-full h-[120%] object-cover" />
        <div className="absolute inset-0 bg-cocoa/60 grid place-items-center text-center text-white px-6">
          <div><h2 className="display-l max-w-4xl" data-split>Rooted in Kenya. Made to be shared.</h2><Link to="/shop" className="btn btn-amber mt-10">Shop the collection</Link></div>
        </div>
      </section>
    </div>
  )
}
