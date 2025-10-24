import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { FaArrowLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import {
  buscarRegistros,
  type RegistroData,
} from "../../auth/api/axiosBuscarRegistros";
import { excluirRegistro } from "../../auth/api/axiosExcluirRegistro";
import ConfirmDeleteModal from "../../../components/modals/ConfirmDeleteModal";

export default function MindTrackRecords() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Todas");
  const [emotion, setEmotion] = useState("Todas");
  const [month, setMonth] = useState("Todos os meses");
  const [records, setRecords] = useState<RegistroData[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState<RegistroData | null>(null);

  // Carregar registros ao montar o componente
  useEffect(() => {
    carregarRegistros();
  }, []);

  const carregarRegistros = async () => {
    try {
      setLoading(true);
      const response = await buscarRegistros();
      setRecords(response.data);
    } catch (error) {
      console.error("Erro ao carregar registros:", error);
      toast.error("Erro ao carregar registros");
    } finally {
      setLoading(false);
    }
  };

  // Mapear valores do enum para display
  const getCategoryDisplay = (category: string) => {
    switch (category) {
      case "ESTUDO":
        return "Estudo";
      case "ESTAGIO":
        return "Estágio";
      case "PESSOAL":
        return "Pessoal";
      case "PESQUISA":
        return "Pesquisa";
      default:
        return category;
    }
  };

  const getEmotionDisplay = (emotion: string) => {
    switch (emotion) {
      case "ALEGRIA":
        return "Alegria";
      case "CALMA":
        return "Calma";
      case "ANSIEDADE":
        return "Ansiedade";
      case "REFLEXAO":
        return "Reflexão";
      case "MOTIVACAO":
        return "Motivação";
      case "TRISTEZA":
        return "Tristeza";
      default:
        return emotion;
    }
  };

  // Funções para controle do modal de exclusão
  const handleDeleteClick = (record: RegistroData) => {
    setRecordToDelete(record);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
    setRecordToDelete(null);
  };

  const handleDeleteConfirm = async () => {
    if (!recordToDelete) return;

    try {
      setIsDeleting(true);
      await excluirRegistro(recordToDelete.id.toString());
      
      // Atualizar a lista de registros removendo o registro excluído
      setRecords(prevRecords => 
        prevRecords.filter(record => record.id !== recordToDelete.id)
      );
      
      toast.success("Registro excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir registro:", error);
      const errorMessage = error instanceof Error 
        ? error.message 
        : "Erro ao excluir registro";
      toast.error(errorMessage);
    } finally {
      setIsDeleting(false);
      setIsDeleteModalOpen(false);
      setRecordToDelete(null);
    }
  };

  // Função para formatar data
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date
      .toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
      .replace(" de ", " de ")
      .replace(" às ", " às ");
  };

  const filtered = records.filter((r) => {
    const categoryDisplay = getCategoryDisplay(r.category);
    const emotionDisplay = getEmotionDisplay(r.emotion);

    if (category !== "Todas" && categoryDisplay !== category) return false;
    if (emotion !== "Todas" && emotionDisplay !== emotion) return false;
    if (
      query &&
      !`${r.title} ${r.content}`.toLowerCase().includes(query.toLowerCase())
    )
      return false;
    // month filter omitted for demo (would compare date)
    return true;
  });

  return (
    <>
      <Helmet>
        <title>MindTrack - Registros</title>
      </Helmet>

      <div className="min-h-screen bg-primary-gradient text-slate-800">
        {/* Page content */}
        <main className="max-w-6xl mx-auto px-4 py-10">
          <Link
            to="/dashboard"
            className=" text-blue-600 font-bold text-sm mb-3 flex items-center gap-1 outline-none "
          >
            <FaArrowLeft className="w-4 h-4" />
            <span className="text-sm">Voltar</span>
          </Link>
          <h1 className="text-3xl font-extrabold mb-1">Meus Registros</h1>
          <p className="text-sm text-slate-500 mb-6">
            {records.length} registro{records.length !== 1 ? "s" : ""}{" "}
            encontrado{records.length !== 1 ? "s" : ""}
          </p>

          {/* Filters card */}
          <section className="bg-white rounded-xl shadow-sm p-4 md:p-6 mb-6">
            <div className="flex flex-col md:flex-row gap-4 md:items-center">
              <div className="flex-1">
                <label className="sr-only">Buscar</label>
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Buscar registros..."
                  className="w-full border border-rose-100 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-200"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full md:w-auto">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="rounded-lg border border-rose-100 px-3 py-2"
                >
                  <option>Todas</option>
                  <option>Estudo</option>
                  <option>Estágio</option>
                  <option>Pessoal</option>
                  <option>Pesquisa</option>
                </select>
                <select
                  value={emotion}
                  onChange={(e) => setEmotion(e.target.value)}
                  className="rounded-lg border border-rose-100 px-3 py-2"
                >
                  <option>Todas</option>
                  <option>Alegria</option>
                  <option>Calma</option>
                  <option>Ansiedade</option>
                  <option>Reflexão</option>
                  <option>Motivação</option>
                  <option>Tristeza</option>
                </select>
                <select
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  className="rounded-lg border border-rose-100 px-3 py-2"
                >
                  <option>Todos os meses</option>
                  <option>Janeiro</option>
                  <option>Fevereiro</option>
                  <option>Março</option>
                  <option>Abril</option>
                  <option>Maio</option>
                  <option>Junho</option>
                  <option>Julho</option>
                  <option>Agosto</option>
                  <option>Setembro</option>
                  <option>Outubro</option>
                  <option>Novembro</option>
                  <option>Dezembro</option>
                </select>
              </div>
            </div>
          </section>

          {/* Records list */}
          <section className="space-y-4">
            {loading ? (
              <div className="bg-white rounded-xl p-8 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-slate-600">Carregando registros...</p>
              </div>
            ) : filtered.length === 0 ? (
              <div className="bg-white rounded-xl p-8 text-center">
                <p className="text-slate-600 mb-2">
                  {records.length === 0
                    ? "Nenhum registro encontrado. Crie seu primeiro registro!"
                    : "Nenhum registro encontrado com os filtros aplicados."}
                </p>
                {records.length === 0 && (
                  <Link
                    to="/novo-registro"
                    className="inline-block mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    Criar primeiro registro
                  </Link>
                )}
              </div>
            ) : (
              filtered.map((r) => (
                <article
                  key={r.id}
                  className="bg-white rounded-xl p-6 shadow-sm"
                >
                  <div className="md:flex md:justify-between">
                    <div>
                      <h2 className="text-lg font-semibold">{r.title}</h2>
                      <div className="text-sm text-slate-500 mt-1">
                        {formatDate(r.createdAt)}
                      </div>
                    </div>

                    <div className="flex items-start gap-3 mt-4 md:mt-0">
                      <Link
                        to={`/editar-registro/${r.id}`}
                        className="p-2 rounded-full hover:bg-rose-50 inline-block"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-rose-500"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                        </svg>
                      </Link>
                      <button 
                        onClick={() => handleDeleteClick(r)}
                        className="p-2 rounded-full hover:bg-rose-50"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-red-500"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M6 2a2 2 0 00-2 2v1h12V4a2 2 0 00-2-2H6zm-1 7a1 1 0 011-1h8a1 1 0 011 1v6a2 2 0 01-2 2H7a2 2 0 01-2-2V9z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <p className="mt-4 text-slate-700">{r.content}</p>

                  <div className="border-t border-rose-100 mt-4 pt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-sm">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 opacity-80"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M3 8a4 4 0 018 0v1h6v7a1 1 0 01-1 1H2a1 1 0 01-1-1V8h2z" />
                        </svg>
                        <span className="font-medium">
                          {getCategoryDisplay(r.category)}
                        </span>
                      </span>

                      <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-sm">
                        <span className="text-sm">🙂</span>
                        <span className="font-medium">
                          {getEmotionDisplay(r.emotion)}
                        </span>
                      </span>
                    </div>

                    <Link
                      to={`/ver-mais/${r.id}`}
                      className="text-sm text-sky-600 hover:underline self-end"
                    >
                      Ver mais
                    </Link>
                  </div>
                </article>
              ))
            )}
          </section>
        </main>

        {/* Footer spacing */}
        <div className="h-16" />

        {/* Modal de confirmação de exclusão */}
        <ConfirmDeleteModal
          isOpen={isDeleteModalOpen}
          onClose={handleDeleteCancel}
          onConfirm={handleDeleteConfirm}
          title={recordToDelete?.title || ""}
          isLoading={isDeleting}
        />
      </div>
    </>
  );
}
