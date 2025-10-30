import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Helmet } from "react-helmet-async";
import MindLog from "../../../assets/MindTrack.png";
import { resetPassword, validateResetToken } from "../api/axiosRecuperar-Senha";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../../hooks/useTheme";
import PasswordInput from "../../../components/ui/PasswordInput";
import Button from "../../../components/ui/Button";

interface ResetFormData {
  password: string;
  confirmPassword: string;
}

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const token = searchParams.get("token");

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ResetFormData>();

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");
  const passwordsMatch = password && confirmPassword && password === confirmPassword;

  useEffect(() => {
    if (!token || !validateResetToken(token)) {
      toast.error("Token de recuperação inválido ou ausente");
      navigate("/login");
    }
  }, [token, navigate]);

  async function onSubmit(data: ResetFormData) {
    if (!token) {
      toast.error("Token não encontrado");
      return;
    }

    if (data.password !== data.confirmPassword) {
      toast.error("As senhas não coincidem");
      return;
    }

    if (data.password.length < 8) {
      toast.error("A senha deve ter pelo menos 8 caracteres");
      return;
    }

    setIsLoading(true);
    try {
      const response = await resetPassword({
        token,
        new_password: data.password,
      });

      toast.success(response.message || "Senha alterada com sucesso!");
      navigate("/login");
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

  if (!token) {
    return null;
  }

  return (
    <>
      <Helmet>
        <title>MindTrack - Redefinir Senha</title>
      </Helmet>

      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 p-6 transition-colors">
        {/* Botão do tema */}
        <div className="fixed top-6 right-6 z-10">
          <button
            onClick={toggleTheme}
            className="p-3 rounded-lg bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
            title={
              theme === "dark" ? "Ativar modo claro" : "Ativar modo escuro"
            }
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        {/* Logo e título */}
        <div className="flex flex-col items-center mb-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-indigo-100 dark:bg-indigo-800 rounded-2xl shadow-lg transition-colors">
              <img
                src={MindLog}
                alt="MindTrack Logo"
                className="w-12 h-12 object-contain"
              />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              MindTrack
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-center max-w-md">
            Defina sua nova senha para continuar acessando sua conta
          </p>
        </div>

        {/* Formulário */}
        <div className="w-full max-w-md">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 transition-colors">
            <h2 className="text-2xl font-semibold text-center text-gray-900 dark:text-white mb-6">
              Redefinir Senha
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Nova Senha *
                </label>
                <PasswordInput
                  placeholder="Digite sua nova senha"
                  register={register}
                  name="password"
                  error={errors.password}
                  required
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Mínimo de 8 caracteres
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Confirmar Nova Senha *
                </label>
                <PasswordInput
                  placeholder="Confirme sua nova senha"
                  register={register}
                  name="confirmPassword"
                  error={errors.confirmPassword}
                  required
                />
                {confirmPassword && password && !passwordsMatch && (
                  <p className="text-red-500 text-xs mt-1">
                    As senhas não coincidem
                  </p>
                )}
                {passwordsMatch && password && (
                  <p className="text-green-500 text-xs mt-1">
                    ✓ Senhas coincidem
                  </p>
                )}
              </div>

              <Button
                type="submit"
                variant="primary"
                className="w-full py-3"
                disabled={isLoading || !passwordsMatch || !password}
              >
                {isLoading ? "Alterando..." : "Redefinir Senha"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <button
                onClick={() => navigate("/login")}
                className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 transition-colors"
              >
                Voltar para o Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}