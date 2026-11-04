import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus } from 'lucide-react'
import { waLink } from '../data/products'
import { FREE_DELIVERY } from '../components/CartDrawer'
import { asset } from '../lib/asset'

type QA = { q: string; a: string }
// Answers are based on what the site already says. Bosco should review before launch.
const faqs: { category: string; items: QA[] }[] = [
  { category: 'Orders & Payment', items: [
    { q: 'How do I pay?', a: 'We take M-Pesa. At checkout you enter your M-Pesa number, a payment prompt pops up on your phone, and you confirm with your PIN. We never see your PIN.' },
    { q: 'Can I order on WhatsApp instead?', a: 'Yes. Message us on +254 719 487 713 with what you would like and we will help you place the order.' },
    { q: 'Some products say "Ask on WhatsApp". Why?', a: 'Those items are made to order or have prices that change with the batch. Tap the WhatsApp button on the product and we will send you a price.' },
  ] },
  { category: 'Delivery & Pickup', items: [
    { q: 'Where do you deliver?', a: 'Across Nairobi (same or next day) and countrywide by courier (1–3 days).' },
    { q: 'How much is delivery?', a: `Nairobi delivery is KES 300 and countrywide courier is KES 600. Nairobi delivery is free on orders of KES ${FREE_DELIVERY.toLocaleString('en-KE')} and above.` },
    { q: 'Can I pick up my order?', a: 'Yes. Choose "Pick up at The Imaara Mall" at checkout. Pickup is free and your order is usually ready in about 2 hours.' },
    { q: 'How do I track my order?', a: 'We send order updates on WhatsApp, from confirmation through to delivery.' },
  ] },
  { category: 'Products', items: [
    { q: 'Is your honey really raw?', a: 'Yes. It is strained, never heated or blended, and every jar shows its source and batch. Lab results go on each honey product page once that batch has been tested.' },
    { q: 'My honey has gone solid. Is it bad?', a: 'No, that is a good sign. Raw honey crystallises naturally in cool weather. Stand the jar in warm (not boiling) water and it will turn liquid again.' },
    { q: 'How do I care for my leather bag?', a: 'Wipe it with a dry cloth, keep it away from direct heat, and feed it with a little beeswax balm twice a year. Light scratches on full-grain leather can often be buffed out with a warm thumb.' },
    { q: 'Who can buy wines and brandy?', a: 'Our wines and brandy are for over-18s only.' },
  ] },
  { category: 'Visiting Us', items: [
    { q: 'Where is the shop?', a: 'The Imaara Mall, off Mombasa Road, Nairobi. You can also find us on weekends at The Hub Karen and the Organic Farmers Market.' },
    { q: 'What are your opening hours?', a: 'Message or call us on +254 719 487 713 for current opening hours, stock, or to book a private visit.' },
  ] },
  { category: 'Trade & Gifting', items: [
    { q: 'Do you supply hotels, restaurants and offices?', a: 'Yes. We supply hotel amenities, restaurant honey and wine, corporate gift boxes, retail stockists and event favours. Build a list on our Trade page and we will send a quote, usually within one working day.' },
    { q: 'Can you make custom gift boxes?', a: 'Yes. Tell us the occasion, quantity and budget on the Trade page or on WhatsApp and we will put a box together for you.' },
  ] },
]

const all = 'All'

export default function FAQ() {
  const [cat, setCat] = useState(all)
  const [open, setOpen] = useState<string | null>(faqs[0].items[0].q)
  const shown = cat === all ? faqs : faqs.filter(f => f.category === cat)

  return (
    <div>
      <section className="relative bg-cocoa text-white pt-40 pb-20 overflow-hidden">
        <img src={asset('img/products/bee-hive.jpg')} alt="" className="absolute right-0 top-0 h-full w-1/2 object-cover opacity-40 [mask-image:linear-gradient(to_left,black,transparent)]" />
        <div className="relative mx-auto max-w-[1400px] px-5 md:px-10">
          <div className="eyebrow !text-amber">Help & answers</div>
          <h1 className="display-l mt-3 max-w-4xl">Frequently asked questions</h1>
          <p className="mt-5 text-white/75 max-w-xl">Orders, delivery, our products and visiting the shop. Can't find what you need? Message us on WhatsApp.</p>
        </div>
      </section>

      <section className="mx-auto max-w-[1100px] px-5 md:px-10 py-16">
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="FAQ categories">
          {[all, ...faqs.map(f => f.category)].map(c => (
            <button key={c} role="tab" aria-selected={cat === c} onClick={() => setCat(c)}
              className={`rounded-full px-5 py-2.5 text-sm font-bold transition ${cat === c ? 'bg-cocoa text-white' : 'bg-sand hover:bg-amber/30'}`}>{c}</button>
          ))}
        </div>

        <div className="mt-12 space-y-14">
          {shown.map(group => (
            <div key={group.category}>
              <h2 className="font-display font-extrabold text-2xl md:text-3xl">{group.category}</h2>
              <div className="mt-5 divide-y divide-black/10 border-y border-black/10">
                {group.items.map(({ q, a }) => {
                  const isOpen = open === q
                  return (
                    <div key={q}>
                      <button onClick={() => setOpen(isOpen ? null : q)} aria-expanded={isOpen}
                        className="w-full flex items-center justify-between gap-6 py-5 text-left font-semibold text-lg hover:text-honey transition">
                        {q}
                        <Plus size={22} className={`shrink-0 text-honey transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`} />
                      </button>
                      <div className={`grid transition-[grid-template-rows] duration-300 ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                        <p className="overflow-hidden text-bark max-w-3xl">
                          <span className="block pb-6">{a}</span>
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 bg-sand rounded-[28px] p-8 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h2 className="font-display font-extrabold text-2xl">Still have a question?</h2>
            <p className="text-bark mt-1">Send us a message on WhatsApp or call +254 719 487 713.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href={waLink('Hi Bosco Esquire, I have a question')} target="_blank" rel="noreferrer" className="btn btn-amber">Ask on WhatsApp</a>
            <Link to="/" className="btn btn-ghost">Back to Home</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
