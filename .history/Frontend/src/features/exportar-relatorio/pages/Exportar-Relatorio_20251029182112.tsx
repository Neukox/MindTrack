import { useState, useEffect } from "react";
import Button from "../../../components/ui/Button";
import { Calendar } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { FaArrowLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import {
  exportarRelatorioPDF,
  validarFormatoData,
  gerarParametrosUltimoMes,
} from "../../auth/api/axiosExportarPDF";
import {
  buscarRegistros,
  type RegistroData,
} from "../../auth/api/axiosBuscarRegistros";

export default function ExportReportPage() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [totalRegistros, setTotalRegistros] = useState(0);
  const [isLoadingCount, setIsLoadingCount] = useState(false);
  const [todosRegistros, setTodosRegistros] = useState<RegistroData[]>([]);
  const [hasDadosGerais, setHasDadosGerais] = useState(false);
  const [isLoadingTodos, setIsLoadingTodos] = useState(false);

  // Função para buscar todos os registros (verificar se há dados)
  const buscarTodosRegistros = async () => {
    try {
      setIsLoadingTodos(true);
      const response = await buscarRegistros(); // Sem filtros = todos os registros
      setTodosRegistros(response.data || []);
      setHasDadosGerais((response.data?.length || 0) > 0);
      return response.data || [];
    } catch {
      setTodosRegistros([]);
      setHasDadosGerais(false);
      return [];
    } finally {
      setIsLoadingTodos(false);
    }
  };

  // Função para sugerir período com dados
  const sugerirPeriodoComDados = () => {
    if (todosRegistros.length === 0) return null;

    // Encontrar a data mais antiga e mais recente
    const datas = todosRegistros.map((r) => new Date(r.createdAt));
    const dataMinima = new Date(Math.min(...datas.map((d) => d.getTime())));
    const dataMaxima = new Date(Math.max(...datas.map((d) => d.getTime())));

    return {
      inicio: dataMinima.toISOString().split("T")[0],
      fim: dataMaxima.toISOString().split("T")[0],
    };
  };

  // Definir datas padrão ao carregar o componente
  useEffect(() => {
    const params = gerarParametrosUltimoMes();

    // Buscar todos os registros para verificar se há dados
    buscarTodosRegistros();

    setStartDate(params.startDate);
    setEndDate(params.endDate);
  }, []);

  // Função para contar registros
  const contarRegistros = async () => {
    try {
      setIsLoadingCount(true);
      const response = await buscarRegistros({
        startDate: startDate,
        endDate: endDate,
      });
      setTotalRegistros(response.data?.length || 0);
    } catch (error) {
      console.error("Erro ao contar registros:", error);
      setTotalRegistros(0);
    } finally {
      setIsLoadingCount(false);
    }
  };

  // Atualizar contagem de registros quando as datas mudarem
  useEffect(() => {
    if (
      startDate &&
      endDate &&
      validarFormatoData(startDate) &&
      validarFormatoData(endDate)
    ) {
      contarRegistros();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate, endDate]);

  const handleExportarPDF = async () => {
    try {
      // Validações
      if (!startDate || !endDate) {
        toast.error("Por favor, selecione ambas as datas");
        return;
      }

      if (!validarFormatoData(startDate) || !validarFormatoData(endDate)) {
        toast.error("Formato de data inválido");
        return;
      }

      const inicio = new Date(startDate);
      const fim = new Date(endDate);

      if (inicio > fim) {
        toast.error("A data inicial deve ser anterior à data final");
        return;
      }

      if (totalRegistros === 0) {
        toast.error("Nenhum registro encontrado no período selecionado");
        return;
      }

      setIsLoading(true);
      toast.loading("Gerando relatório PDF...");

      await exportarRelatorioPDF({
        startDate,
        endDate,
      });

      toast.dismiss();
      toast.success("Relatório PDF baixado com sucesso!");
    } catch (error) {
      toast.dismiss();
      console.error("Erro ao exportar PDF:", error);

      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Erro ao gerar relatório. Tente novamente.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const definirPeriodoRapido = (
    tipo: "ultimoMes" | "este_ano" | "ultimos_3_meses" | "todos_os_registros"
  ) => {
    const hoje = new Date();
    let inicio: Date;

    switch (tipo) {
      case "ultimoMes":
        inicio = new Date();
        inicio.setMonth(hoje.getMonth() - 1);
        break;
      case "ultimos_3_meses":
        inicio = new Date();
        inicio.setMonth(hoje.getMonth() - 3);
        break;
      case "este_ano":
        inicio = new Date(hoje.getFullYear(), 0, 1);
        break;
      case "todos_os_registros":
        // Período amplo para pegar todos os registros
        inicio = new Date(2020, 0, 1);
        break;
      default:
        return;
    }

    setStartDate(inicio.toISOString().split("T")[0]);
    setEndDate(hoje.toISOString().split("T")[0]);
  };

  return (
    <>
      <Helmet>
        <title>MindTrack - Exportar Relatório</title>
      </Helmet>

      <div className="min-h-screen bg-primary-gradient text-gray-800 flex flex-col items-center p-4 sm:p-6 md:p-10">
        <div className="w-full max-w-6xl">
          <Link
            to="/dashboard"
            className=" text-blue-600 font-bold text-sm mb-3 flex items-center gap-1 outline-none "
          >
            <FaArrowLeft />
            Voltar
          </Link>

          <h1 className="text-2xl sm:text-3xl font-bold mb-1">
            Exportar Relatório
          </h1>
          <p className="text-gray-500 mb-6">
            Gere um PDF com seus registros e estatísticas
          </p>

          <div className="mb-8 shadow-md bg-white rounded-lg border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg sm:text-xl font-semibold">
                Gerar Relatório em PDF
              </h3>
              <p className="text-sm text-gray-500">
                Selecione o período desejado para exportar seus registros
              </p>
            </div>
            <div className="px-6 py-4">
              {/* Botões de períodos rápidos */}
              <div className="mb-4">
                <label className="text-sm font-medium text-gray-600 mb-2 block">
                  Períodos Rápidos
                </label>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => definirPeriodoRapido("ultimoMes")}
                    className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                  >
                    Último mês
                  </button>
                  <button
                    onClick={() => definirPeriodoRapido("ultimos_3_meses")}
                    className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                  >
                    Últimos 3 meses
                  </button>
                  <button
                    onClick={() => definirPeriodoRapido("este_ano")}
                    className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                  >
                    Este ano
                  </button>
                  <button
                    onClick={() => definirPeriodoRapido("todos_os_registros")}
                    className="px-3 py-1 text-xs bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-md transition-colors border border-blue-300"
                  >
                    Todos os registros
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-600 mb-1">
                    Data Inicial
                  </label>
                  <div className="flex items-center border border-gray-300 rounded-lg p-2 bg-[#f8f4ef]">
                    <Calendar className="w-4 h-4 text-gray-500 mr-2" />
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="bg-transparent w-full focus:outline-none text-gray-700"
                    />
                  </div>
                </div>

                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-600 mb-1">
                    Data Final
                  </label>
                  <div className="flex items-center border border-gray-300 rounded-lg p-2 bg-[#f8f4ef]">
                    <Calendar className="w-4 h-4 text-gray-500 mr-2" />
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="bg-transparent w-full focus:outline-none text-gray-700"
                    />
                  </div>
                </div>
              </div>

              <div
                className={`p-3 rounded-lg text-center mb-4 ${
                  totalRegistros > 0
                    ? "bg-[#eaf3ec] text-green-700"
                    : "bg-[#fef3f3] text-red-700"
                }`}
              >
                {isLoadingCount ? (
                  "Contando registros..."
                ) : totalRegistros > 0 ? (
                  `${totalRegistros} registro${
                    totalRegistros !== 1 ? "s" : ""
                  } será${totalRegistros !== 1 ? "ão" : ""} incluído${
                    totalRegistros !== 1 ? "s" : ""
                  } no relatório`
                ) : (
                  <div>
                    <div className="font-medium mb-1">
                      Nenhum registro encontrado no período
                    </div>
                    <div className="text-xs text-red-600">
                      {isLoadingTodos ? (
                        "Verificando dados disponíveis..."
                      ) : hasDadosGerais ? (
                        <div>
                          <div className="mb-1">
                            Existem {todosRegistros.length} registros
                            cadastrados, mas não no período selecionado.
                          </div>
                          {(() => {
                            const periodo = sugerirPeriodoComDados();
                            if (periodo) {
                              return (
                                <button
                                  onClick={() => {
                                    setStartDate(periodo.inicio);
                                    setEndDate(periodo.fim);
                                  }}
                                  className="text-blue-600 hover:text-blue-800 underline font-medium"
                                >
                                  Clique aqui para usar o período completo (
                                  {new Date(
                                    periodo.inicio
                                  ).toLocaleDateString()}{" "}
                                  - {new Date(periodo.fim).toLocaleDateString()}
                                  )
                                </button>
                              );
                            }
                            return null;
                          })()}
                        </div>
                      ) : (
                        "Nenhum registro foi encontrado. Você precisa criar algumas reflexões primeiro."
                      )}
                    </div>
                  </div>
                )}
              </div>

              <Button
                onClick={handleExportarPDF}
                disabled={isLoading || totalRegistros === 0}
                className={`w-full py-2 rounded-lg flex justify-center items-center gap-2 transition-all ${
                  isLoading || totalRegistros === 0
                    ? "bg-gray-400 cursor-not-allowed text-gray-600"
                    : "bg-blue-500 hover:bg-blue-600 text-white"
                }`}
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Gerando PDF...
                  </>
                ) : (
                  <>
                    <span>📄</span> Gerar e Baixar PDF
                  </>
                )}
              </Button>
            </div>
          </div>

          <div className="shadow-sm border border-[#f2e6da] bg-[#fdf3ee] rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">
                O que está incluído no relatório?
              </h3>
            </div>
            <div className="px-6 py-4">
              <ul className="list-disc pl-6 space-y-2 text-sm text-gray-700">
                <li>Informações do aluno e período do relatório</li>
                <li>Estatísticas de categorias e emoções</li>
                <li>Todos os registros do período com conteúdo completo</li>
                <li>Data e hora de geração do relatório</li>
                <li>Branding profissional do MindTrack</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
