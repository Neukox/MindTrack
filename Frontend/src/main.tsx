import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import TelaLogin from './Componentes/TelaLogin.tsx'
import TelaCadastro from './Componentes/TelaCadastro.tsx'
import Recuperar from './Componentes/Recuperar.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TelaLogin /> 
    <TelaCadastro />
    <Recuperar />
  </StrictMode>,
)
