import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import { toast } from "sonner";
import {
  criarRegistro,
  type CriarRegistroData,
} from "../../auth/api/axiosCriarRegistros";

export default function NovoRegistro() {
  const [categoria, setCategoria] = useState("ESTUDO");
  const [emocao, setEmocao] = useState("");
  const [titulo, setTitulo] = useState("");
  const [reflexao, setReflexao] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Mapeamento de categorias para o backend
  const categorias = [
    {
      nome: "Estudo",
      desc: "Aprendizados e aulas",
      icon: "📘",
      value: "ESTUDO",
    },
    {
      nome: "Estágio",
      desc: "Experiência profissional",
      icon: "💼",
      value: "ESTAGIO",
    },
    {
      nome: "Pessoal",
      desc: "Reflexões pessoais",
      icon: "💖",
      value: "PESSOAL",
    },
    {
      nome: "Pesquisa",
      desc: "Projetos de pesquisa",
      icon: "🔬",
      value: "PESQUISA",
    },
  ];

  // Mapeamento de emoções para o backend
  const emocaoList = [
    { nome: "Alegria", emoji: "😊", cor: "bg-yellow-100", value: "ALEGRIA" },
    { nome: "Calma", emoji: "🙂", cor: "bg-blue-100", value: "CALMA" },
    { nome: "Ansiedade", emoji: "😰", cor: "bg-red-100", value: "ANSIEDADE" },
    { nome: "Reflexão", emoji: "🤔", cor: "bg-purple-100", value: "REFLEXAO" },
    { nome: "Motivação", emoji: "🚀", cor: "bg-green-100", value: "MOTIVACAO" },
    { nome: "Tristeza", emoji: "😢", cor: "bg-slate-100", value: "TRISTEZA" },
  ];

  // Handler para seleção de emoção
  const handleEmocaoSelect = (emocaoDisplayName: string) => {
    setEmocao(emocaoDisplayName);
  };

  // Validação do formulário
  const validarFormulario = () => {
    if (!titulo.trim()) {
      toast.error("Por favor, insira um título para o registro");
      return false;
    }
    if (!categoria) {
      toast.error("Por favor, selecione uma categoria");
      return false;
    }
    if (!emocao) {
      toast.error("Por favor, selecione uma emoção");
      return false;
    }
    if (!reflexao.trim()) {
      toast.error("Por favor, escreva sua reflexão");
      return false;
    }
    return true;
  };

  // Função para salvar o registro
  const handleSalvarRegistro = async () => {
    if (!validarFormulario()) return;

    setIsLoading(true);
    try {
      // Mapear categoria do nome exibido para o enum
      let categoriaEnum = "";
      switch (categoria) {
        case "ESTUDO":
          categoriaEnum = "ESTUDO";
          break;
        case "PESSOAL":
          categoriaEnum = "PESSOAL";
          break;
        case "ESTAGIO":
          categoriaEnum = "ESTAGIO";
          break;
        case "PESQUISA":
          categoriaEnum = "PESQUISA";
          break;
        default:
          throw new Error("Categoria inválida");
      }

      // Mapear emoção do nome exibido para o enum
      let emocaoEnum = "";
      switch (emocao) {
        case "Alegria":
          emocaoEnum = "ALEGRIA";
          break;
        case "Calma":
          emocaoEnum = "CALMA";
          break;
        case "Ansiedade":
          emocaoEnum = "ANSIEDADE";
          break;
        case "Reflexão":
          emocaoEnum = "REFLEXAO";
          break;
        case "Motivação":
          emocaoEnum = "MOTIVACAO";
          break;
        case "Tristeza":
          emocaoEnum = "TRISTEZA";
          break;
        default:
          throw new Error("Emoção inválida");
      }

      const dadosRegistro: CriarRegistroData = {
        title: titulo.trim(),
        category: categoriaEnum as CriarRegistroData["category"],
        emotion: emocaoEnum as CriarRegistroData["emotion"],
        content: reflexao.trim(),
      };

      await criarRegistro(dadosRegistro);

      toast.success("Registro salvo com sucesso!");

      // Limpar formulário
      setTitulo("");
      setCategoria("ESTUDO");
      setEmocao("");
      setReflexao("");

      // Redirecionar para a página de registros após 1 segundo
      setTimeout(() => {
        navigate("/registros");
      }, 1000);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Erro ao salvar registro";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Função para cancelar
  const handleCancelar = () => {
    if (titulo || reflexao || emocao) {
      if (
        confirm("Você tem alterações não salvas. Deseja realmente cancelar?")
      ) {
        navigate("/registros");
      }
    } else {
      navigate("/registros");
    }
  };

  return (
    <>
      <Helmet>
        <title>MindTrack - Novo Registro</title>
      </Helmet>

      <div className="min-h-screen bg-primary-gradient dark:bg-linear-to-br dark:from-gray-900 dark:to-gray-800 text-slate-800 dark:text-white transition-colors duration-300">
        {/* Main content */}
        <main className="max-w-4xl mx-auto px-4 py-10">
          <Link
            to="/dashboard"
            className="text-blue-600 dark:text-blue-400 font-semibold text-sm mb-3 inline-flex items-center gap-2 outline-none hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
          >
            <FaArrowLeft className="w-4 h-4" />
            <span className="text-sm">Voltar</span>
          </Link>

          <h1 className="text-3xl font-extrabold mt-4 mb-1 text-slate-800 dark:text-white">Novo Registro</h1>
          <p className="text-slate-500 dark:text-gray-400 mb-8">
            Compartilhe seus pensamentos, reflexões e emoções
          </p>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 md:p-8 transition-colors">
            <h2 className="text-lg font-semibold mb-1 text-slate-800 dark:text-white">Criar Entrada</h2>
            <p className="text-slate-500 dark:text-gray-400 mb-4 text-sm">
              Dedique um tempo para refletir sobre sua jornada acadêmica
            </p>

            {/* Título */}
            <input
              type="text"
              placeholder="Ex: Reflexão sobre a aula de hoje"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              className="w-full border border-rose-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-4 py-3 mb-6 focus:outline-none focus:ring-2 focus:ring-rose-200 dark:focus:ring-blue-500 transition-colors"
            />

            {/* Categorias */}
            <h3 className="font-medium mb-2 text-slate-800 dark:text-white">Categoria</h3>
            <div className="grid sm:grid-cols-2 gap-3 mb-6">
              {categorias.map((c) => (
                <button
                  key={c.nome}
                  onClick={() => setCategoria(c.value)}
                  className={`border rounded-xl p-4 text-left transition-all ${
                    categoria === c.value
                      ? "border-blue-500 bg-blue-50 dark:border-blue-400 dark:bg-blue-900/30"
                      : "border-slate-200 dark:border-gray-600 hover:bg-slate-50 dark:hover:bg-gray-700"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{c.icon}</span>
                    <div>
                      <div className="font-semibold text-slate-800 dark:text-white">{c.nome}</div>
                      <div className="text-xs text-slate-500 dark:text-gray-400">{c.desc}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Emoções */}
            <h3 className="font-medium mb-2 text-slate-800 dark:text-white">Emoção Predominante</h3>
            <div className="flex flex-wrap gap-3 mb-6">
              {emocaoList.map((e) => (
                <button
                  key={e.nome}
                  onClick={() => handleEmocaoSelect(e.nome)}
                  className={`px-4 py-2 cursor-pointer rounded-xl flex items-center gap-2 transition-colors ${
                    e.cor
                  } dark:bg-gray-700 border ${
                    emocao === e.nome ? "border-blue-400 dark:border-blue-500" : "border-transparent dark:border-gray-600"
                  }`}
                >
                  <span>{e.emoji}</span>
                  <span className="font-medium text-sm text-slate-800 dark:text-white">{e.nome}</span>
                </button>
              ))}
            </div>

            {/* Reflexão */}
            <h3 className="font-medium mb-2 text-slate-800 dark:text-white">Sua Reflexão</h3>
            <textarea
              value={reflexao}
              onChange={(e) => setReflexao(e.target.value)}
              placeholder="Escreva seus pensamentos, aprendizados e reflexões aqui. Não há limite de caracteres..."
              className="w-full border border-rose-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg p-4 h-40 focus:outline-none focus:ring-2 focus:ring-rose-200 dark:focus:ring-blue-500 text-slate-700 transition-colors"
            />

            <div className="text-xs text-slate-500 dark:text-gray-400 mt-1">
              {reflexao.length} caracteres
            </div>

            {/* Ações */}
            <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6">
              <button
                onClick={handleCancelar}
                disabled={isLoading}
                className="flex-1 sm:flex-none bg-slate-100 dark:bg-gray-600 text-slate-700 dark:text-white px-6 py-2 rounded-md font-medium hover:bg-slate-200 dark:hover:bg-gray-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancelar
              </button>
              <button
                onClick={handleSalvarRegistro}
                disabled={isLoading}
                className="flex-1 sm:flex-none bg-blue-500 dark:bg-blue-600 text-white px-6 py-2 rounded-md font-medium hover:bg-blue-600 dark:hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "💾 Salvando..." : "💾 Salvar Registro"}
              </button>
            </div>
          </div>

          {/* Dicas */}
          <section className="bg-rose-100/40 dark:bg-gray-800/60 rounded-xl p-6 mt-8 transition-colors">
            <h4 className="font-semibold mb-2 text-slate-800 dark:text-white">Dicas para uma boa reflexão</h4>
            <ul className="list-disc list-inside space-y-1 text-slate-700 dark:text-gray-300 text-sm">
              <li>Seja honesto e autêntico em suas reflexões</li>
              <li>
                Descreva não apenas o que aconteceu, mas como você se sentiu
              </li>
              <li>Identifique aprendizados e insights importantes</li>
              <li>Considere como isso impacta seu desenvolvimento pessoal</li>
            </ul>
          </section>
        </main>
      </div>
    </>
  );
}
