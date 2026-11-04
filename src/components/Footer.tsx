import { Link } from 'react-router-dom'
import { useState } from 'react'
import { asset } from '../lib/asset'
import { Facebook, Instagram, TikTok, WhatsApp, social } from './Icons'
import { waLink } from '../data/products'

export default function Footer() {
  const [sent, setSent] = useState(false)
  return (
    <footer className="relative bg-cocoa text-white overflow-hidden grain">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10 pt-24 pb-10">
        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-14 items-end">
          <div>
            <div className="eyebrow !text-amber">Stay close</div>
            <h2 className="display-l mt-4">New harvests, first.</h2>
            <p className="mt-4 text-white/70 max-w-md">Fresh batches, market dates and members-only gift sets — straight to your inbox. No spam.</p>
          </div>
          <form onSubmit={e => { e.preventDefault(); setSent(true) }} className="flex gap-2 bg-white/10 p-2 rounded-full">
            <input required type="email" placeholder="Your email address" className="flex-1 bg-transparent px-5 outline-none placeholder:text-white/50" aria-label="Email" />
            <button className="btn btn-amber">{sent ? 'Subscribed' : 'Subscribe'}</button>
          </form>
        </div>
        <div className="mt-20 grid sm:grid-cols-2 lg:grid-cols-4 gap-10 text-sm">
          <div>
            <Link to="/" aria-label="Bosco Esquire home" className="inline-block"><img src={asset('img/logo.png')} alt="Bosco Esquire" className="w-16 h-16" /></Link>
            <p className="mt-4 text-white/70 max-w-xs">A one-stop home for organic Kenyan goods and handcrafted luxury — from Bosco Farms and the makers we work with.</p>
          </div>
          <div><div className="font-bold text-amber mb-3">Shop</div><ul className="space-y-2 text-white/80">
            <li><Link to="/shop?c=naturals">Bosco Naturals</Link></li><li><Link to="/shop?c=atelier">Bosco Atelier</Link></li><li><Link to="/trade">Trade & Corporate Gifts</Link></li><li><Link to="/checkout">Checkout</Link></li></ul></div>
          <div><div className="font-bold text-amber mb-3">Company</div><ul className="space-y-2 text-white/80">
            <li><Link to="/">Home</Link></li><li><Link to="/about">About Us</Link></li><li><Link to="/visit">Visit the Shop</Link></li><li><Link to="/journal">Journal</Link></li><li><Link to="/faq">FAQs</Link></li><li><a href={waLink('Hi Bosco Esquire')} target="_blank" rel="noreferrer">Customer care</a></li></ul></div>
          <div><div className="font-bold text-amber mb-3">Find us</div>
            <p className="text-white/80">The Imaara Mall, off Mombasa Road, Nairobi, Kenya</p>
            <p className="text-white/80 mt-2">+254 719 487 713</p>
            <div className="flex gap-3 mt-5">
              {[{ h: social.facebook, I: Facebook, l: 'Facebook' }, { h: social.instagram, I: Instagram, l: 'Instagram' }, { h: social.tiktok, I: TikTok, l: 'TikTok' }, { h: waLink('Hi Bosco Esquire'), I: WhatsApp, l: 'WhatsApp' }].map(({ h, I, l }) => (
                <a key={l} href={h} target="_blank" rel="noreferrer" aria-label={l} className="w-11 h-11 rounded-full bg-white/10 grid place-items-center hover:bg-amber hover:text-cocoa transition"><I className="w-5 h-5" /></a>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-16 font-display font-extrabold text-[15vw] leading-none tracking-tighter text-white/[.06] select-none whitespace-nowrap">BOSCO ESQUIRE</div>
        <div className="mt-6 flex flex-wrap justify-between gap-4 text-xs text-white/50">
          <span>© {new Date().getFullYear()} Bosco Esquire. All rights reserved.</span>
          <span>Pay with M-Pesa · Delivery across Kenya · Over-18s only for wines & brandy</span>
        </div>
      </div>
    </footer>
  )
}
