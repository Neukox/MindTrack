import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft, FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "sonner";
import { buscarRegistroPorId } from "../../../services/reflection/get-reflection.service";
import { excluirRegistro } from "../../../services/reflection/delete-reflection.service";
import ConfirmDeleteModal from "../../../components/modals/ConfirmDeleteModal";
import type { Reflection } from "@/lib/types/reflection.type";

export default function VerMais() {
  const { id } = useParams<{ id: string }>();
  const [registro, setRegistro] = useState<Reflection | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

  // Carregar dados do registro ao montar o componente
  useEffect(() => {
    const carregarRegistro = async (registroId: string) => {
      try {
        setIsLoading(true);

        const registroData = await buscarRegistroPorId(registroId);
        setRegistro(registroData);
      } catch (error) {
        console.error("Erro ao carregar registro:", error);
        const errorMessage =
          error instanceof Error ? error.message : "Erro ao carregar registro";
        toast.error(errorMessage);
        navigate("/registros");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      carregarRegistro(id);
    }
  }, [id, navigate]);

  // Função para formatar data
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Mapear valores do enum para display
  const getCategoryDisplay = (category: string) => {
    switch (category) {
      case "ESTUDO":
        return {
          name: "Estudo",
          icon: "📘",
          color: "bg-blue-100 text-blue-800",
        };
      case "ESTAGIO":
        return {
          name: "Estágio",
          icon: "💼",
          color: "bg-purple-100 text-purple-800",
        };
      case "PESSOAL":
        return {
          name: "Pessoal",
          icon: "💖",
          color: "bg-pink-100 text-pink-800",
        };
      case "PESQUISA":
        return {
          name: "Pesquisa",
          icon: "🔬",
          color: "bg-green-100 text-green-800",
        };
      default:
        return {
          name: category,
          icon: "📝",
          color: "bg-gray-100 text-gray-800",
        };
    }
  };

  const getEmotionDisplay = (emotion: string) => {
    switch (emotion) {
      case "ALEGRIA":
        return {
          name: "Alegria",
          emoji: "😊",
          color: "bg-yellow-100 text-yellow-800",
        };
      case "CALMA":
        return {
          name: "Calma",
          emoji: "😌",
          color: "bg-blue-100 text-blue-800",
        };
      case "ANSIEDADE":
        return {
          name: "Ansiedade",
          emoji: "😰",
          color: "bg-red-100 text-red-800",
        };
      case "REFLEXAO":
        return {
          name: "Reflexão",
          emoji: "🤔",
          color: "bg-purple-100 text-purple-800",
        };
      case "MOTIVACAO":
        return {
          name: "Motivação",
          emoji: "🚀",
          color: "bg-green-100 text-green-800",
        };
      case "TRISTEZA":
        return {
          name: "Tristeza",
          emoji: "😢",
          color: "bg-slate-100 text-slate-800",
        };
      default:
        return {
          name: emotion,
          emoji: "🙂",
          color: "bg-gray-100 text-gray-800",
        };
    }
  };

  // Função para abrir modal de confirmação de exclusão
  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  // Função para fechar modal de confirmação
  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
  };

  // Função para confirmar e executar a exclusão
  const handleDeleteConfirm = async () => {
    if (!registro || !id) return;

    try {
      setIsDeleting(true);
      await excluirRegistro(id);

      toast.success("Registro excluído com sucesso!");
      navigate("/registros");
    } catch (error) {
      console.error("Erro ao excluir registro:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Erro ao excluir registro";
      toast.error(errorMessage);
    } finally {
      setIsDeleting(false);
      setIsDeleteModalOpen(false);
    }
  };

  // Se ainda está carregando os dados, mostrar loading
  if (isLoading) {
    return (
      <div className="min-h-screen bg-primary-gradient dark:bg-linear-to-br dark:from-gray-900 dark:to-gray-800 flex items-center justify-center transition-colors duration-300">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-slate-600 dark:text-gray-300">
            Carregando registro...
          </p>
        </div>
      </div>
    );
  }

  if (!registro) {
    return (
      <div className="min-h-screen bg-primary-gradient dark:bg-linear-to-br dark:from-gray-900 dark:to-gray-800 flex items-center justify-center transition-colors duration-300">
        <div className="text-center">
          <p className="text-slate-600 dark:text-gray-300">
            Registro não encontrado
          </p>
          <Link
            to="/registros"
            className="mt-4 inline-block text-blue-600 dark:text-blue-400 hover:underline transition-colors"
          >
            Voltar para registros
          </Link>
        </div>
      </div>
    );
  }

  const categoryInfo = getCategoryDisplay(registro.category);
  const emotionInfo = getEmotionDisplay(registro.emotion);

  return (
    <>
      <Helmet>
        <title>{registro.title} - MindTrack</title>
      </Helmet>

      <div className="min-h-screen bg-primary-gradient dark:bg-linear-to-br dark:from-gray-900 dark:to-gray-800 text-slate-800 dark:text-white transition-colors duration-300">
        {/* Main content */}
        <main className="max-w-4xl mx-auto px-4 py-10">
          <Link
            to="/registros"
            className="text-blue-600 dark:text-blue-400 font-semibold text-sm mb-3 inline-flex items-center gap-2 outline-none hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
          >
            <FaArrowLeft className="w-4 h-4" />
            <span className="text-sm">Voltar</span>
          </Link>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 md:p-8 transition-colors">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
              <div className="flex-1">
                <h1 className="text-2xl md:text-3xl font-bold mb-2 text-slate-800 dark:text-white">
                  {registro.title}
                </h1>
                <p className="text-slate-500 dark:text-gray-400 text-sm">
                  Criado em {formatDate(registro.createdAt)}
                  {registro.updatedAt !== registro.createdAt && (
                    <span> • Editado em {formatDate(registro.updatedAt)}</span>
                  )}
                </p>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-3">
                <Link
                  to={`/editar-registro/${registro.id}`}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-200 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-700 transition-colors"
                >
                  <FaEdit className="w-4 h-4" />
                  <span className="text-sm font-medium">Editar</span>
                </Link>

                <button
                  onClick={handleDeleteClick}
                  className="flex items-center gap-2 px-4 py-2 bg-red-100 dark:bg-red-800 text-red-700 dark:text-red-200 rounded-lg hover:bg-red-200 dark:hover:bg-red-700 transition-colors"
                >
                  <FaTrash className="w-4 h-4" />
                  <span className="text-sm font-medium">Excluir</span>
                </button>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-3 mb-6">
              <div
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${categoryInfo.color} dark:bg-gray-700 dark:text-gray-200`}
              >
                <span className="text-lg">{categoryInfo.icon}</span>
                <span className="font-medium text-sm">{categoryInfo.name}</span>
              </div>

              <div
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${emotionInfo.color} dark:bg-gray-700 dark:text-gray-200`}
              >
                <span className="text-lg">{emotionInfo.emoji}</span>
                <span className="font-medium text-sm">{emotionInfo.name}</span>
              </div>
            </div>

            {/* Content */}
            <div className="prose prose-slate max-w-none">
              <h3 className="text-lg font-semibold mb-4 text-slate-800 dark:text-white">
                Reflexão
              </h3>
              <div className="bg-slate-50 dark:bg-gray-700 rounded-lg p-6 transition-colors">
                <p className="text-slate-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                  {registro.content}
                </p>
              </div>
            </div>

            {/* Footer info */}
            <div className="mt-8 pt-6 border-t border-slate-200 dark:border-gray-600">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-sm text-slate-500 dark:text-gray-400">
                <div>
                  ID do registro:{" "}
                  <code className="bg-slate-100 dark:bg-gray-700 dark:text-gray-300 px-2 py-1 rounded">
                    {registro.id}
                  </code>
                </div>
                <div>{registro.content.length} caracteres</div>
              </div>
            </div>
          </div>
        </main>

        {/* Modal de confirmação de exclusão */}
        <ConfirmDeleteModal
          isOpen={isDeleteModalOpen}
          onClose={handleDeleteCancel}
          onConfirm={handleDeleteConfirm}
          title={registro.title}
          isLoading={isDeleting}
        />
      </div>
    </>
  );
}
