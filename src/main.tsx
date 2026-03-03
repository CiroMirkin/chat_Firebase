import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Firebase from './config/Firebase.tsx'
import { BrowserRouter } from 'react-router'
import { Toaster } from 'sonner'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Firebase>
      <BrowserRouter>
        <Toaster
          richColors
          position="top-right"
        />
        <App />
      </BrowserRouter>
    </Firebase>
  </StrictMode>,
)
