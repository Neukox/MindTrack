import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import TelaLogin from './componentes/TelaLogin.tsx'
import TelaCadastro from './componentes/TelaCadastro.tsx'
import Recuperar from './componentes/Recuperar.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TelaLogin /> 
    <TelaCadastro />
    <Recuperar />
  </StrictMode>,
)
