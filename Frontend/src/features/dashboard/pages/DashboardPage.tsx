import { Cards } from "../../../components/ui/Cards";
import { CiCalendar } from "react-icons/ci";
import { IoBookOutline, IoFlash } from "react-icons/io5";
import { FaArrowTrendUp } from "react-icons/fa6";
import { Helmet } from "react-helmet-async";
import ChartPizza from "../components/ChartPizza";
import Barchat from "../components/BarChart";
import HorizontalBarChart from "../components/HorizontalBarChart";

export function DashboardPage() {
  return (
    <>
      <Helmet>
        <title>MindTrack - Dashboard</title>
      </Helmet>

      {/* Contêiner principal responsivo */}
      <div className="min-h-screen flex flex-col bg-primary-gradient pt-6 px-4 sm:px-6 lg:px-16 overflow-x-hidden">
        {/* Header */}
        <div className="text-left max-w-full">
          <h1 className="text-3xl font-bold font-sans mt-2 wrap-break-words">
            Bem-vindo ao seu Dashboard
          </h1>
          <span className="text-md font-sans font-medium text-gray-400 block mt-1">
            Acompanhe sua evolução e reflexões ao longo do semestre
          </span>
        </div>

        {/* Cards Superiores */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 w-full">
          <Cards
            title="Entradas Criadas"
            variant="minCard"
            description="Neste semestre"
            value={42}
            meta={<span className="text-green-500">↑ 15% vs semana anterior</span>}
          >
            <IoBookOutline />
          </Cards>

          <Cards title="Última Entrada" variant="minCard" value="Hoje">
            <CiCalendar />
          </Cards>

          <Cards
            title="Semana atual"
            variant="minCard"
            description="Registros esta semana"
            value={7}
            meta={<span className="text-green-500">↑ 40% vs semana anterior</span>}
          >
            <FaArrowTrendUp />
          </Cards>

          <Cards
            title="Sequência"
            variant="minCard"
            description="Dias consecutivos"
            value="12 dias"
            meta={<span className="text-green-500">0% vs semana anterior</span>}
          >
            <IoFlash />
          </Cards>
        </div>

        {/* Gráficos */}
        <div className="mt-6 flex flex-col lg:flex-row gap-4 w-full overflow-hidden">
          <Cards
            variant="mediumCard"
            title="Frequência de Registros"
            description="Entradas feitas por semana"
            chart={<Barchat />}
            className="flex-1 min-w-0"
          />

          <Cards
            variant="mediumCard"
            title="Categorias mais usadas"
            description="Distribuição de Registros por Categoria"
            chart={<ChartPizza />}
            className="flex-1 min-w-0"
          />
        </div>

        {/* Gráfico Horizontal */}
        <div className="mt-4 mb-6 w-full overflow-hidden">
          <Cards
            variant="longCard"
            title="Emoções Registradas"
            description="Frequência de emoções registradas"
            chart={<HorizontalBarChart />}
            className="min-w-0"
          />
        </div>
      </div>
    </>
  );
}
