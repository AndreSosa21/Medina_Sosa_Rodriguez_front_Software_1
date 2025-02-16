import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Movimientos from '../src/mis_movimientos/mis_movimientos.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Movimientos />
  </StrictMode>,
)
