import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import MindLog from "../../../assets/MindTrack.png";
import { Helmet } from "react-helmet-async";
import { registerUser, validateRegisterData } from "../api/axiosRegister";
import { TogglePasswordButton } from "../../../components/ui/TogglePasswordButton";
import { Button } from "../../../components/ui/Button";
import PasswordInput from "../../../components/ui/PasswordInput";
import TextInput from "../../../components/ui/TextInput";

// Tipagem do formulário
type FormData = {
  nome: string;
  email: string;
  senha: string;
  confirmarSenha: string;
};

export default function TelaCadastro() {
  // 👇 Estados separados para cada olho
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: { nome: "", email: "", senha: "", confirmarSenha: "" },
  });

  async function onSubmit(data: FormData) {
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
      navigate("/dashboard");
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

        {/* Formulário de cadastro */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-md bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg p-8"
        >
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Criar conta</h2>
          <p className="text-sm text-slate-500 mb-6">
            Comece sua jornada de reflexão e autoconhecimento
          </p>

          {/* Nome completo */}
          <TextInput
            label="Nome completo"
            placeholder="Seu nome"
            register={register}
            name="nome"
            error={errors.nome}
          />

          {/* Email */}
          <TextInput
            label="Email"
            type="email"
            placeholder="seu@email.com"
            register={register}
            name="email"
            error={errors.email}
          />

          {/* Senha */}
          <label className="block text-slate-700 text-sm mb-1" htmlFor="senha">
            Senha
          </label>
          <div className="relative mb-3">
            <PasswordInput<FormData>
              register={register}
              name="senha"
              showPassword={showPassword}
              placeholder="********"
            />
            <TogglePasswordButton
              showPassword={showPassword}
              onToggle={() => setShowPassword((s) => !s)}
            />
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
            <PasswordInput<FormData>
              register={register}
              name="confirmarSenha"
              showPassword={showConfirmPassword}
              placeholder="********"
            />
            <TogglePasswordButton
              showPassword={showConfirmPassword}
              onToggle={() => setShowConfirmPassword((s) => !s)}
            />
          </div>
          {errors.confirmarSenha && (
            <p className="text-sm text-red-500 mb-6">
              {String(errors.confirmarSenha.message || "Confirme a senha")}
            </p>
          )}

          {/* Botão de cadastro */}
          <Button
            type="submit"
            isLoading={isLoading}
            loadingText="Criando Conta..."
          >
            Criar Conta
          </Button>

          {/* Link para login */}
          <div className="text-center mt-4">
            <span className="text-sm text-slate-500">Já tem uma conta? </span>
            <Link to="/login" className="text-sm text-blue-600 hover:underline">
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
