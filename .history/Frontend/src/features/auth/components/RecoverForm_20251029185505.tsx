import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import MindLog from "../../../assets/MindTrack.png";
import { Helmet } from "react-helmet-async";
import {
  requestPasswordRecovery,
  validateEmail,
} from "../api/axiosRecuperar-Senha";
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../../hooks/useTheme';

export default function Recuperar() {
  const [isLoading, setIsLoading] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string }>();

  async function onSubmit(data: { email: string }) {
    // Validação local
    if (!validateEmail(data.email)) {
      toast.error("Email inválido");
      return;
    }

    setIsLoading(true);
    try {
      const response = await requestPasswordRecovery({ email: data.email });
      toast.success(
        response.message || "Link de recuperação enviado! Verifique seu email."
      );
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
        <title>MindTrack - Login</title>
      </Helmet>

      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 p-6 transition-colors">
        {/* Botão de tema */}
        <div className="fixed top-6 right-6 z-10">
          <button
            onClick={toggleTheme}
            className="p-3 rounded-lg bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
            title={theme === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro'}
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        {/* Logo e título */}
        <div className="flex flex-col items-center mb-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-indigo-100 dark:bg-indigo-800 rounded-2xl shadow-lg transition-colors">
              <img
                src={MindLog}
                alt="MindTrack Logo"
                className="h-14 rounded-2xl"
              />
            </div>
            <h1 className="text-3xl font-extrabold text-gray-800 dark:text-white tracking-tight transition-colors">
              MindTrack
            </h1>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors">Diário de Bordo Acadêmico</p>
        </div>

        {/* Formulário de cadastro */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-md bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-2xl shadow-lg p-8 transition-colors"
        >
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2 transition-colors">
            Recuperar Senha
          </h2>
          <p className="text-sm text-slate-500 dark:text-gray-400 mb-6 transition-colors">
            Digite seu email para recuperar sua senha
          </p>

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

          {/* Botão */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 rounded-lg font-medium transition mt-3 ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            } text-white`}
          >
            {isLoading ? "Enviando..." : "Enviar link de recuperação"}
          </button>

          {/* Link para login */}
          <div className="text-center mt-4">
            <Link to="/" className="text-sm text-blue-600 hover:underline">
              ⭠ Voltar para login
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
