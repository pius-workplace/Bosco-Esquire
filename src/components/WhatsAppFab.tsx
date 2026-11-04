import { WhatsApp } from './Icons'
import { waLink } from '../data/products'
export default function WhatsAppFab() {
  return (
    <a href={waLink('Hi Bosco Esquire, I have a question')} target="_blank" rel="noreferrer" aria-label="Chat with Bosco on WhatsApp"
      className="fixed right-5 bottom-5 z-40 w-14 h-14 rounded-full bg-[#25D366] text-white grid place-items-center shadow-xl hover:scale-110 transition">
      <WhatsApp className="w-7 h-7" />
    </a>
  )
}
