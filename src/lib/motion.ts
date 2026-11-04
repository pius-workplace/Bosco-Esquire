import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)
// Phones resize the viewport as the address bar shows/hides while scrolling; recalculating
// every pinned section on each of those resizes makes them jump or stall.
ScrollTrigger.config({ ignoreMobileResize: true })
export { gsap, ScrollTrigger }

export const reduceMotion = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

let lenis: Lenis | null = null
export function startSmoothScroll() {
  if (lenis || reduceMotion()) return
  // Native scrolling stays on touch devices; Lenis only smooths wheel input.
  lenis = new Lenis({ duration: 1.1, smoothWheel: true, syncTouch: false })
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add(t => lenis?.raf(t * 1000))
  gsap.ticker.lagSmoothing(0)
}
export function scrollToTop(immediate = true) {
  if (lenis) lenis.scrollTo(0, { immediate }); else window.scrollTo(0, 0)
}
export function scrollToEl(el: Element, offset = -80) {
  if (lenis) lenis.scrollTo(el as HTMLElement, { offset })
  else window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + offset, behavior: 'smooth' })
}
export const getLenis = () => lenis

/** Split a heading's words into masked spans so they can rise into view. */
export function splitWords(el: HTMLElement) {
  if (el.dataset.split) return el.querySelectorAll<HTMLElement>('.mask-line > span')
  el.dataset.split = '1'
  const walk = (node: Node): Node[] => {
    if (node.nodeType === 3) {
      return (node.textContent || '').split(/(\s+)/).filter(Boolean).map(w => {
        if (/^\s+$/.test(w)) return document.createTextNode(' ')
        const o = document.createElement('span'); o.className = 'mask-line'; o.style.display = 'inline-block'
        const i = document.createElement('span'); i.textContent = w; o.appendChild(i); return o
      })
    }
    if (node.nodeType === 1) {
      const e = node as HTMLElement; const kids = [...e.childNodes]; e.innerHTML = ''
      kids.flatMap(walk).forEach(k => e.appendChild(k)); return [e]
    }
    return [node]
  }
  const kids = [...el.childNodes]; el.innerHTML = ''; kids.flatMap(walk).forEach(k => el.appendChild(k))
  return el.querySelectorAll<HTMLElement>('.mask-line > span')
}
