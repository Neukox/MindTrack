
import {  Routes, Route } from 'react-router-dom';
/* Rotas de autênticação*/ 
import Login from './features/auth/pages/LoginPage'
import Cadastro from './features/auth/pages/RegisterPage'
import Recuperar from './features/auth/pages/RecoverPage'

/* Rotas do Dashboard*/ 
import DashboardLayout from './features/dashboard/layouts/DashbboardLayout'
import { DashboardPage } from './features/dashboard/pages/DashboardPage';
import HomePage from './features/home/pages/HomePage';
import MindTrackRecords from './features/registros-criados/registros-criados';
function App() {

  return (
    <>
      
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/cadastro' element={<Cadastro />} />
        <Route path='/recuperar' element={<Recuperar />} />
     
     
        <Route element={<DashboardLayout />}>
          <Route path='/dashboard' element={<DashboardPage />} />
          <Route path='/registros' element={<MindTrackRecords />} />
        </Route>
      </Routes>
      
    
      
    </>
  
  )
}

export default App
