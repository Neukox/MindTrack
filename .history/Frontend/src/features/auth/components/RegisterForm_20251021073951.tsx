import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import MindLog from "../../../assets/MindTrack.png";
import { Helmet } from "react-helmet-async";
import {
  registerUser,
  validateRegisterData,
} from "../../../../auth/axios/axiosRegister";

type FormData = {
  nome: string;
  email: string;
  senha: string;
  confirmarSenha: string;
};

export default function TelaCadastro() {
  const [showSenha, setShowSenha] = useState(false);
  const [showConfirmarSenha, setShowConfirmarSenha] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: { nome: "", email: "", senha: "", confirmarSenha: "" },
  });

  async function onSubmit(data: FormData) {
    // Validação local primeiro
    const validationErrors = validateRegisterData({
      username: data.nome,
      email: data.email,
      password: data.senha,
      confirmarSenha: data.confirmarSenha,
    });

    if (validationErrors.length > 0) {
      toast.error(validationErrors[0]);
      return;
    }

    setIsLoading(true);
    try {
      const response = await registerUser({
        username: data.nome,
        email: data.email,
        password: data.senha,
      });

      toast.success(response.message || "Conta criada com sucesso!");
      navigate("/");
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Erro interno. Tente novamente.";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Helmet>
        <title>MindTrack - Cadastro</title>
      </Helmet>

      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#fff8f3] to-[#f3eef0] p-6">
        {/* Logo e título */}
        <div className="flex flex-col items-center mb-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-indigo-100 rounded-2xl shadow-lg">
              <img
                src={MindLog}
                alt="MindTrack Logo"
                className="h-14 rounded-2xl"
              />
            </div>
            <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">
              MindTrack
            </h1>
          </div>
          <p className="text-sm text-gray-500">Diário de Bordo Acadêmico</p>
        </div>

        {/* Formulário de cadastro */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-md bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg p-8"
        >
          <h2 className="text-2xl font-bold text-slate-800 mb-2">
            Criar conta
          </h2>
          <p className="text-sm text-slate-500 mb-6">
            Comece sua jornada de reflexão e autoconhecimento
          </p>

          {/* Nome completo */}
          <label className="block text-slate-700 text-sm mb-1" htmlFor="nome">
            Nome completo
          </label>
          <input
            id="nome"
            type="text"
            {...register("nome", { required: true })}
            placeholder="Seu nome"
            className="w-full mb-4 px-4 py-2 border border-slate-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          {errors.nome && (
            <p className="text-sm text-red-500">Nome é obrigatório</p>
          )}

          {/* Email */}
          <label className="block text-slate-700 text-sm mb-1" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register("email", {
              required: true,
              pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            })}
            placeholder="seu@email.com"
            className="w-full mb-4 px-4 py-2 border border-slate-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          {errors.email && (
            <p className="text-sm text-red-500">Email inválido</p>
          )}

          {/* Senha */}
          <label className="block text-slate-700 text-sm mb-1" htmlFor="senha">
            Senha
          </label>
          <div className="relative mb-4">
            <input
              id="senha"
              type={showSenha ? "text" : "password"}
              {...register("senha", { required: true, minLength: 8 })}
              placeholder="********"
              className="w-full pr-10 px-4 py-2 border border-slate-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <button
              type="button"
              onClick={() => setShowSenha((s) => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 cursor-pointer"
              aria-label={showSenha ? "Esconder senha" : "Mostrar senha"}
            >
              {showSenha ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
          {errors.senha && (
            <p className="text-sm text-red-500 mb-4">
              Senha inválida (mínimo 8 caracteres)
            </p>
          )}

          {/* Confirmar senha */}
          <label
            className="block text-slate-700 text-sm mb-1"
            htmlFor="confirmarSenha"
          >
            Confirmar senha
          </label>

          <div className="relative mb-6">
            <input
              id="confirmarSenha"
              type={showConfirmarSenha ? "text" : "password"}
              {...register("confirmarSenha", {
                required: true,
                validate: (value) =>
                  value === watch("senha") || "As senhas não coincidem",
              })}
              placeholder="********"
              className="w-full pr-10 px-4 py-2 border border-slate-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <button
              type="button"
              onClick={() => setShowConfirmarSenha((s) => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 cursor-pointer"
              aria-label={
                showConfirmarSenha ? "Esconder senha" : "Mostrar senha"
              }
            >
              {showConfirmarSenha ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
          {errors.confirmarSenha && (
            <p className="text-sm text-red-500 mb-6">
              {String(errors.confirmarSenha.message || "Confirme a senha")}
            </p>
          )}

          {/* Botão de cadastro */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 rounded-lg font-medium transition ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
            } text-white`}
          >
            {isLoading ? "Criando conta..." : "Criar Conta"}
          </button>

          {/* Link para login */}
          <div className="text-center mt-4">
            <span className="text-sm text-slate-500">Já tem uma conta? </span>
            <Link to="/" className="text-sm text-blue-600 hover:underline">
              Fazer login
            </Link>
          </div>

          {/* Rodapé */}
          <p className="text-center text-xs text-slate-400 mt-6">
            Sua jornada de autoconhecimento começa aqui
          </p>
        </form>
      </div>
    </>
  );
}
