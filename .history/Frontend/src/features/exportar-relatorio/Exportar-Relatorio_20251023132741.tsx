import { useState } from "react";
import Button from "../../components/ui/Button";
import { Calendar } from "lucide-react";
import { Helmet } from "react-helmet-async";

export default function ExportReportPage() {
  const [startDate, setStartDate] = useState("2025-10-01");
  const [endDate, setEndDate] = useState("2025-10-31");

  return (
    <>
      <Helmet>
        <title>MindTrack - Exportar Relatório</title>
      </Helmet>
      
      <div className="min-h-screen bg-[#fdf7f2] text-gray-800 flex flex-col items-center p-4 sm:p-6 md:p-10">
      <div className="w-full max-w-6xl">
        <a
          href="/dashboard"
          className="text-blue-600 text-sm mb-3 inline-block hover:underline"
        >
          ← Voltar para dashboard
        </a>

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

            <div className="p-3 rounded-lg bg-[#eaf3ec] text-center text-gray-600 mb-4">
              0 registros serão incluídos no relatório
            </div>

            <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg flex justify-center items-center gap-2">
              <span>📄</span> Gerar e Baixar PDF
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
