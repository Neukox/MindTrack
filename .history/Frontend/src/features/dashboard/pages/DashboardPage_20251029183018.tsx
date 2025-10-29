import { useState, useEffect } from "react";
import Cards from "../../../components/ui/Cards";
import { CiCalendar } from "react-icons/ci";
import { IoBookOutline, IoFlash } from "react-icons/io5";
import { FaArrowTrendUp } from "react-icons/fa6";
import { Helmet } from "react-helmet-async";
import { toast } from "sonner";
import ChartPizza from "../components/ChartPizza";
import Barchat from "../components/BarChart";
import HorizontalBarChart from "../components/HorizontalBarChart";

// Importar as funções axios
import { getEntradasCriadas } from "../../auth/api/axiosEntradasCriadas";
import { getUltimaEntrada } from "../../auth/api/axiosUltimaEntrada";
import { getEstatisticasSemanaAtual } from "../../auth/api/axiosSemanaAtual";
import { getDiasConsecutivos } from "../../auth/api/axiosDiasConsecutivos";

export function DashboardPage() {
  // Estados para os dados dos cards
  const [entradasCriadas, setEntradasCriadas] = useState<number>(0);
  const [crescimentoEntradas, setCrescimentoEntradas] = useState<number>(0);
  const [ultimaEntrada, setUltimaEntrada] = useState<string>("Carregando...");
  const [registrosSemana, setRegistrosSemana] = useState<number>(0);
  const [crescimentoSemana, setCrescimentoSemana] = useState<number>(0);
  const [diasConsecutivos, setDiasConsecutivos] = useState<string>("0 dias");
  const [isLoading, setIsLoading] = useState(true);

  // Função para carregar todos os dados
  const carregarDados = async () => {
    try {
      setIsLoading(true);

      // Carregar dados em paralelo para melhor performance
      const [
        dadosEntradas,
        dadosUltimaEntrada,
        dadosEstatisticasSemana,
        dadosDiasConsecutivos,
      ] = await Promise.all([
        getEntradasCriadas(),
        getUltimaEntrada(),
        getEstatisticasSemanaAtual(),
        getDiasConsecutivos(),
      ]);

      // Atualizar estados com dados reais
      if (dadosEntradas.success) {
        setEntradasCriadas(dadosEntradas.data.entradasEsseSemestre || 0);
        setCrescimentoEntradas(dadosEntradas.data.crescimentoPercentual || 0);
      }

      if (dadosUltimaEntrada.success) {
        const tempo = dadosUltimaEntrada.data.tempoDesdeUltimaReflexao;
        setUltimaEntrada(tempo || "Nunca");
      }

      if (dadosEstatisticasSemana.success) {
        setRegistrosSemana(
          dadosEstatisticasSemana.data.registrosEssaSemana || 0
        );
        setCrescimentoSemana(
          dadosEstatisticasSemana.data.crescimentoPercentual || 0
        );
      }

      if (dadosDiasConsecutivos) {
        const dias = dadosDiasConsecutivos.diasConsecutivosAtual;
        setDiasConsecutivos(`${dias} ${dias === 1 ? "dia" : "dias"}`);
      }
    } catch (error) {
      console.error("Erro ao carregar dados do dashboard:", error);
      toast.error("Erro ao carregar dados do dashboard");
    } finally {
      setIsLoading(false);
    }
  };

  // Carregar dados ao montar o componente
  useEffect(() => {
    carregarDados();
  }, []);

  // Função para formatar percentual
  const formatarPercentual = (valor: number) => {
    const sinal = valor > 0 ? "↑" : valor < 0 ? "↓" : "";
    const cor =
      valor > 0
        ? "text-green-500"
        : valor < 0
        ? "text-red-500"
        : "text-gray-500";
    return (
      <span className={cor}>
        {sinal} {Math.abs(valor)}% vs semana anterior
      </span>
    );
  };

  return (
    <>
      <Helmet>
        <title>MindTrack - Dashboard</title>
      </Helmet>

      {/* Contêiner principal responsivo */}
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 pt-6 px-4 sm:px-6 lg:px-16 overflow-x-hidden transition-colors">
        {/* Header */}
        <div className="text-left max-w-full">
          <h1 className="text-3xl font-bold font-sans mt-2 wrap-break-words text-gray-900 dark:text-white">
            Bem-vindo ao seu Dashboard
          </h1>
          <span className="text-md font-sans font-medium text-gray-400 dark:text-gray-500 block mt-1">
            Acompanhe sua evolução e reflexões ao longo do semestre
          </span>
        </div>

        {/* Cards Superiores */}
        {/* Responsive grid: each card has a min width and will fit on a single row when space allows */}
        <div className="grid gap-4 mt-6 w-full grid-cols-[repeat(auto-fit,minmax(240px,1fr))]">
          <Cards
            title="Entradas Criadas"
            variant="minCard"
            description="Neste semestre"
            value={isLoading ? "..." : entradasCriadas}
            meta={isLoading ? null : formatarPercentual(crescimentoEntradas)}
          >
            <IoBookOutline />
          </Cards>

          <Cards
            title="Última Entrada"
            variant="minCard"
            value={isLoading ? "..." : ultimaEntrada}
          >
            <CiCalendar />
          </Cards>

          <Cards
            title="Semana atual"
            variant="minCard"
            description="Registros esta semana"
            value={isLoading ? "..." : registrosSemana}
            meta={isLoading ? null : formatarPercentual(crescimentoSemana)}
          >
            <FaArrowTrendUp />
          </Cards>

          <Cards
            title="Sequência"
            variant="minCard"
            description="Dias consecutivos"
            value={isLoading ? "..." : diasConsecutivos}
            meta={<span className="text-blue-500">Mantenha o ritmo!</span>}
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
