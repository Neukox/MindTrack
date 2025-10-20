
import { Routes, Route } from 'react-router-dom'
{/* Rotas de autênticação*/ }
import Login from './pages/auth/Login'
import Cadastro from './pages/auth/Cadastro'
import Recuperar from './Components/auth/Recuperar'

{/* Rotas do Dashboard*/ }
import DashboardPage from './pages/dashboard'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/cadastro' element={<Cadastro />} />
        <Route path='/recuperar' element={<Recuperar />} />
        <Route path='/dashboard' element={<DashboardPage />} />
      </Routes>

      
    </>
  
  )
}

export default App
