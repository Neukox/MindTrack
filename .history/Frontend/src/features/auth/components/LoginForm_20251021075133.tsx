import { toast } from "sonner";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import MindLog from "../../../assets/MindTrack.png";
import { Helmet } from "react-helmet-async";
import { loginUser } from "../../../../auth/axios/axiosLogin";
import type { LoginData } from "../../../../auth/axios/axiosLogin";

export default function TelaLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    defaultValues: { email: "", password: "" },
  });

  async function onSubmit(data: LoginData) {
    setIsLoading(true);
    
    try {
      const response = await loginUser(data);
      toast.success(response.message || "Login realizado com sucesso!");
      navigate("/home");
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Erro interno. Tente novamente.";
      toast.error(errorMessage);
      console.error('Erro no login:', error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Helmet>
        <title>MindTrack - Login</title>
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

        {/* Formulário de login */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-md bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg p-8"
        >
          <h2 className="text-2xl font-bold text-slate-800 mb-2">
            Bem-vindo de volta
          </h2>
          <p className="text-sm text-slate-500 mb-6">
            Entre com sua conta para continuar sua jornada de reflexão
          </p>

          {/* Campo de e-mail */}
          <label className="block text-slate-700 text-sm mb-1">Email</label>
          <input
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

          {/* Campo de senha */}
          <label className="block text-slate-700 text-sm mb-1">Senha</label>
          <div className="relative mb-3">
            <input
              type={showPassword ? "text" : "password"}
              {...register("password", { required: true, minLength: 8 })}
              placeholder="********"
              className="w-full pr-10 px-4 py-2 border border-slate-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
            />

            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 cursor-pointer"
              aria-label={showPassword ? "Esconder senha" : "Mostrar senha"}
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>

          {errors.password && (
            <p className="text-sm text-red-500">
              Senha inválida (mínimo 8 caracteres)
            </p>
          )}

          {/* Link de esqueci senha */}
          <div className="mb-6">
            <Link
              to="/recuperar"
              className="text-sm text-blue-600 hover:underline"
            >
              Esqueci minha senha
            </Link>
          </div>

          {/* Botão de login */}
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 rounded-lg font-medium transition ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
              } text-white`}
            >
              {isLoading ? "Entrando..." : "Entrar"}
            </button>
          </div>

          {/* Link de criar conta */}
          <div className="text-center mt-4">
            <span className="text-sm text-slate-500">Não tem uma conta? </span>
            <Link
              to="/cadastro"
              className="text-sm text-blue-600 hover:underline"
            >
              Criar conta
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
