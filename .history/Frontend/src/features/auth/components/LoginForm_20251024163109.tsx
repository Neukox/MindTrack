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
      navigate("/dashboard");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Erro interno. Tente novamente.";
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

      <div className="min-h-screen flex flex-col items-center justify-center bg-primary-gradient p-6">
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
          <TextInput
            label="Email"
            type="email"
            placeholder="seu@email.com"
            register={register}
            name="email"
            error={errors.email}
          />

          {/* Campo de senha */}
          <label className="block text-slate-700 text-sm mb-1">Senha</label>
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
              className="text-sm text-blue-600 hover:underline"
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
