import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import './index.css'
import App from './App'
import { CartProvider } from './lib/cart'

// HashRouter lets the site run from any static host or folder.
// For production on boscoesquire.com, switch to BrowserRouter (or migrate to Next.js) for clean URLs.
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <CartProvider>
        <App />
      </CartProvider>
    </HashRouter>
  </StrictMode>,
)
