import { Routes, Route } from "react-router-dom";
/* Rotas de autênticação*/
import Login from "./features/auth/pages/LoginPage";
import Cadastro from "./features/auth/pages/RegisterPage";
import Recuperar from "./features/auth/pages/RecoverPage";

/* Rotas do Dashboard*/
import DashboardLayout from "./features/dashboard/layouts/DashbboardLayout";
import { DashboardPage } from "./features/dashboard/pages/DashboardPage";
import HomePage from "./features/home/pages/HomePage";
import MindTrackRecords from "./features/registros-criados/pages/registros-criados";
import NovoRegistro from "./features/novo-registro/pages/Novo-Registro";
import ExportReportPage from "./features/exportar-relatorio/pages/Exportar-Relatorio";
import Perfil from "./features/perfil/pages/Perfil";
import EditarRegistro from "./features/editar-registros/page/EditarRegistros";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/recuperar" element={<Recuperar />} />

        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/registros" element={<MindTrackRecords />} />
          <Route path="/novo-registro" element={<NovoRegistro />} />
          <Route path="/exportar-relatorio" element={<ExportReportPage />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/editar-registro/:id" element={<EditarRegistro />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
