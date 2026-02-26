import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import Firebase from './config/Firebase.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Firebase>
        <App />
    </Firebase>
  </StrictMode>,
)
