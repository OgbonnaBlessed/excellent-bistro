import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { CartProvider } from './CartContext/CartContext.jsx'
import { HeroUIProvider } from "@heroui/system";
import { StrictMode } from 'react'
import { Toaster } from "sonner"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HeroUIProvider>
      <CartProvider>
        <BrowserRouter>
          <App />
          <Toaster richColors position="bottom-right" />
        </BrowserRouter>
      </CartProvider>
    </HeroUIProvider>
  </StrictMode>
)