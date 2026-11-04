import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { bySlug } from '../data/products'

export interface Line { slug: string; variant: string; price: number; qty: number }
interface Cart {
  lines: Line[]; count: number; subtotal: number; open: boolean
  setOpen: (o: boolean) => void
  add: (slug: string, variant: string, price: number, qty?: number) => void
  setQty: (slug: string, variant: string, qty: number) => void
  clear: () => void
}
const Ctx = createContext<Cart | null>(null)
const KEY = 'bosco-cart-v1'

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<Line[]>(() => {
    try { const raw = localStorage.getItem(KEY); return raw ? JSON.parse(raw) : [] } catch { return [] }
  })
  const [open, setOpen] = useState(false)
  useEffect(() => { try { localStorage.setItem(KEY, JSON.stringify(lines)) } catch { /* storage unavailable */ } }, [lines])

  const value = useMemo<Cart>(() => ({
    lines, open, setOpen,
    count: lines.reduce((a, l) => a + l.qty, 0),
    subtotal: lines.reduce((a, l) => a + l.qty * l.price, 0),
    add: (slug, variant, price, qty = 1) => {
      if (!bySlug(slug)) return
      setLines(ls => {
        const i = ls.findIndex(l => l.slug === slug && l.variant === variant)
        if (i >= 0) { const c = [...ls]; c[i] = { ...c[i], qty: c[i].qty + qty }; return c }
        return [...ls, { slug, variant, price, qty }]
      })
    },
    setQty: (slug, variant, qty) => setLines(ls => ls.flatMap(l => l.slug === slug && l.variant === variant ? (qty > 0 ? [{ ...l, qty }] : []) : [l])),
    clear: () => setLines([]),
  }), [lines, open])
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}
export const useCart = () => { const c = useContext(Ctx); if (!c) throw new Error('CartProvider missing'); return c }
