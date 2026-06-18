import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import {CanvasProvider} from "./contexts/CanvasContext"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <CanvasProvider>
      <App />
    </CanvasProvider>
    </BrowserRouter>
  </StrictMode>,
)
