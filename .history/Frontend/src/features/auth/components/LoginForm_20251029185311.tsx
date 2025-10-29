import { toast } from "sonner";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import MindLog from "../../../assets/MindTrack.png";
import { Helmet } from "react-helmet-async";
import { loginUser } from "../api/axiosLogin";
import type { LoginData } from "../api/axiosLogin";
import { TogglePasswordButton } from "../../../components/ui/TogglePasswordButton";
import { Button } from "../../../components/ui/Button";
import PasswordInput from "../../../components/ui/PasswordInput";
import TextInput from "../../../components/ui/TextInput";
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../../hooks/useTheme';

export default function TelaLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

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
      navigate("/dashboard");
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Erro interno. Tente novamente.";
      toast.error(errorMessage);
      console.error("Erro no login:", error);
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

        {/* Formulário de login */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-md bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-2xl shadow-lg p-8 transition-colors"
        >
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2 transition-colors">
            Bem-vindo de volta
          </h2>
          <p className="text-sm text-slate-500 dark:text-gray-400 mb-6 transition-colors">
            Entre com sua conta para continuar sua jornada de reflexão
          </p>

          {/* Campo de e-mail */}
          <TextInput
            label="Email"
            type="email"
            placeholder="seu@email.com"
            register={register}
            name="email"
            error={errors.email}
          />

          {/* Campo de senha */}
          <label className="block text-slate-700 dark:text-gray-300 text-sm mb-1 transition-colors">Senha</label>
          <div className="relative mb-3">
            <PasswordInput
              register={register}
              name="password"
              showPassword={showPassword}
              placeholder="********"
            />
            <TogglePasswordButton
              showPassword={showPassword}
              onToggle={() => setShowPassword((s) => !s)}
            />
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
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline transition-colors"
            >
              Esqueci minha senha
            </Link>
          </div>

          {/* Botão de login */}
          <div>
            <Button
              type="submit"
              isLoading={isLoading}
              loadingText="Entrando..."
              variant="primary"
            >
              Entrar
            </Button>
          </div>

          {/* Link de criar conta */}
          <div className="text-center mt-4">
            <span className="text-sm text-slate-500 dark:text-gray-400 transition-colors">Não tem uma conta? </span>
            <Link
              to="/cadastro"
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline transition-colors"
            >
              Criar conta
            </Link>
          </div>

          {/* Rodapé */}
          <p className="text-center text-xs text-slate-400 dark:text-gray-500 mt-6 transition-colors">
            Sua jornada de autoconhecimento começa aqui
          </p>
        </form>
      </div>
    </>
  );
}
