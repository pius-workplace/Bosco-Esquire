import { useLayoutEffect, useRef } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Nav from './components/Nav'
import Footer from './components/Footer'
import CartDrawer from './components/CartDrawer'
import WhatsAppFab from './components/WhatsAppFab'
import Home from './pages/Home'
import Shop from './pages/Shop'
import Product from './pages/Product'
import About from './pages/About'
import Visit from './pages/Visit'
import { JournalList, Article } from './pages/Journal'
import Trade from './pages/Trade'
import Checkout from './pages/Checkout'
import FAQ from './pages/FAQ'
import NotFound from './pages/NotFound'
import { gsap, ScrollTrigger, scrollToTop, startSmoothScroll } from './lib/motion'
import { asset } from './lib/asset'
import { useCart } from './lib/cart'

export default function App() {
  const { pathname, search } = useLocation()
  const curtain = useRef<HTMLDivElement>(null)
  const first = useRef(true)
  const { setOpen } = useCart()

  useLayoutEffect(() => { startSmoothScroll() }, [])
  useLayoutEffect(() => {
    scrollToTop()
    setOpen(false)
    if (first.current) {
      // brand intro on first load
      gsap.timeline()
        .set(curtain.current, { yPercent: 0 })
        .from('.curtain-logo', { scale: 0.4, rotate: -90, opacity: 0, duration: 0.8, ease: 'back.out(1.6)' })
        .to(curtain.current, { yPercent: -100, duration: 0.9, ease: 'power4.inOut', delay: 0.25 })
      first.current = false
    } else {
      gsap.timeline()
        .set(curtain.current, { yPercent: 0 })
        .to(curtain.current, { yPercent: -100, duration: 0.8, ease: 'power4.inOut', delay: 0.1 })
    }
    const t = setTimeout(() => ScrollTrigger.refresh(), 400)
    return () => clearTimeout(t)
  }, [pathname, search])

  return (
    <>
      <div ref={curtain} className="fixed inset-0 z-[90] bg-amber grid place-items-center pointer-events-none" aria-hidden>
        <img src={asset('img/logo.png')} alt="" className="curtain-logo w-28 h-28" />
      </div>
      <Nav />
      <CartDrawer />
      <main key={pathname}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:slug" element={<Product />} />
          <Route path="/about" element={<About />} />
          <Route path="/visit" element={<Visit />} />
          <Route path="/journal" element={<JournalList />} />
          <Route path="/journal/:slug" element={<Article />} />
          <Route path="/trade" element={<Trade />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {pathname !== '/visit' && <Footer />}
      <WhatsAppFab />
    </>
  )
}
