import { Cards } from "../../../components/ui/Cards";
import { CiCalendar } from "react-icons/ci";
import { IoBookOutline, IoFlash } from "react-icons/io5";
import { FaArrowTrendUp } from "react-icons/fa6";
import { Helmet } from "react-helmet-async";
import ChartPizza from "../components/ChartPizza";
import Barchat from "../components/BarChart";

export function DashboardPage() {
  return (
    <>
      <Helmet>
        <title>MindTrack - Dashboard</title>
      </Helmet>

      {/* Main Dashboard Container */}
      <div className="min-h-screen flex flex-col bg-primary-gradient pt-10 px-4 sm:px-6 lg:px-16">
        {/* Header */}
        <div className="text-left">
          <h1 className="text-3xl font-bold font-sans mt-4">
            Bem-vindo ao seu Dashboard
          </h1>
          <span className="text-md font-sans font-medium text-gray-400 block mt-1">
            Acompanhe sua evolução e reflexões ao longo do semestre
          </span>
        </div>

        {/* Top Cards (minCard) */}
        <div className="flex flex-wrap justify-center sm:justify-start items-center gap-4 mt-10 w-full">
          <Cards title="Entradas Criadas" variant="minCard" className={`mx-2 sm:mx-0`}>
            <IoBookOutline />
          </Cards>

          <Cards title="Ultima Entrada" variant="minCard" className={`mx-2 sm:mx-0`}>
            <CiCalendar />
          </Cards>

          <Cards title="Semana atual" variant="minCard" className={`mx-2 sm:mx-0`}>
            <FaArrowTrendUp />
          </Cards>

          <Cards title="Sequência" variant="minCard" className={`mx-2 sm:mx-0`}>
            <IoFlash />
          </Cards>
        </div>

        {/* Medium Cards (Charts) */}
        <div className="mt-8 mb-8 flex flex-col lg:flex-row gap-6 w-full">
          <Cards
            variant="mediumCard"
            title="Frequência de Registros"
            description="Entradas feitas por semana"
            chart={<Barchat />}
            className={`flex-1`}
          />

          <Cards
            variant="mediumCard"
            title="Categorias mais usadas"
            description="Distribuição de Registros por Categoria"
            chart={<ChartPizza />}
            className={`flex-1`}
          />
        </div>
      </div>
    </>
  );
}
