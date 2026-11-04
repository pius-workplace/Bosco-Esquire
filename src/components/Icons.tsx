// Social brand marks (Lucide no longer ships brand logos).
type P = { className?: string }
export const Facebook = ({ className }: P) => <svg viewBox="0 0 24 24" className={className} fill="currentColor"><path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H7.8v3h2.6V21h3.1z"/></svg>
export const Instagram = ({ className }: P) => <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none"/></svg>
export const TikTok = ({ className }: P) => <svg viewBox="0 0 24 24" className={className} fill="currentColor"><path d="M16.6 5.8A4.6 4.6 0 0 1 15.4 3h-3.1v12.4a2.6 2.6 0 1 1-2.6-2.6c.3 0 .5 0 .8.1V9.7a5.8 5.8 0 1 0 5 5.7V9.1a7.6 7.6 0 0 0 4.5 1.4V7.4a4.5 4.5 0 0 1-3.4-1.6z"/></svg>
export const WhatsApp = ({ className }: P) => <svg viewBox="0 0 24 24" className={className} fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.4.1-.2 0-.3 0-.5l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a.9.9 0 0 0-.7.3 2.8 2.8 0 0 0-.9 2.1 5 5 0 0 0 1 2.6 11.3 11.3 0 0 0 4.3 3.8c1.6.7 2.3.7 3.1.6a2.6 2.6 0 0 0 1.7-1.2 2.1 2.1 0 0 0 .2-1.2c-.1-.2-.3-.3-.5-.4z"/></svg>
export const social = {
  facebook: 'https://www.facebook.com/share/1B4iq7d9oS/',
  instagram: 'https://www.instagram.com/bosco.esquire',
  tiktok: 'https://www.tiktok.com/', // TODO: confirm Bosco's TikTok handle
}
