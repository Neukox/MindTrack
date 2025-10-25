import { Helmet } from "react-helmet-async";
import { FaArrowLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Button from "../../../components/ui/Button";
import PasswordInput from "../../../components/ui/PasswordInput";
import TextInput from "../../../components/ui/TextInput";
import { useForm } from "react-hook-form";
import { FaRegUser } from "react-icons/fa";
import { IoLockClosedOutline } from "react-icons/io5";
import { toast } from "sonner";
import {
  getUserProfile,
  updateUserProfile,
  type UserProfile,
} from "../../auth/api/axiosPerfil";
import {
  changeUserPassword,
  type ChangePasswordData,
} from "../../auth/api/axiosAlterarSenha";

type ProfileFormData = {
  username: string;
  email: string;
};

type PasswordFormData = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export default function Perfil() {
  const [activeTab, setActiveTab] = useState<"informacoes" | "senha">(
    "informacoes"
  );
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  // react-hook-form para informações do perfil
  const {
    register: registerProfile,
    handleSubmit: handleSubmitProfile,
    formState: { errors: errorsProfile },
    setValue: setValueProfile,
  } = useForm<ProfileFormData>();

  // react-hook-form para alteração de senha
  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: errorsPassword },
    reset: resetPassword,
    watch: watchPassword,
  } = useForm<PasswordFormData>();

  // Carregar dados do perfil ao montar o componente
  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        setIsLoadingProfile(true);
        const profile = await getUserProfile();
        setUserProfile(profile);

        // Preencher o formulário com os dados do usuário
        setValueProfile("username", profile.username);
        setValueProfile("email", profile.email);
      } catch (error) {
        toast.error("Erro ao carregar perfil do usuário");
        console.error(error);
      } finally {
        setIsLoadingProfile(false);
      }
    };

    loadUserProfile();
  }, [setValueProfile]);

  // Função para atualizar perfil
  const onSubmitProfile = async (data: ProfileFormData) => {
    try {
      setIsUpdatingProfile(true);

      const updateData = {
        username: data.username.trim(),
      };

      const response = await updateUserProfile(updateData);

      // Atualizar estado local
      setUserProfile((prev) =>
        prev ? { ...prev, username: data.username } : null
      );

      toast.success(response.message || "Perfil atualizado com sucesso!");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Erro ao atualizar perfil"
      );
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  // Função para alterar senha
  const onSubmitPassword = async (data: PasswordFormData) => {
    console.log("Dados do formulário de senha:", data);

    // Validar se as senhas coincidem
    if (data.newPassword !== data.confirmPassword) {
      toast.error("Nova senha e confirmação não coincidem");
      return;
    }

    // Validar comprimento mínimo
    if (data.newPassword.length < 8) {
      toast.error("Nova senha deve ter no mínimo 8 caracteres");
      return;
    }

    // Validar se senha atual foi preenchida
    if (!data.currentPassword) {
      toast.error("Senha atual é obrigatória");
      return;
    }

    try {
      setIsChangingPassword(true);

      const passwordData: ChangePasswordData = {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
        confirmPassword: data.confirmPassword,
      };

      console.log("Enviando dados para API:", passwordData);

      const response = await changeUserPassword(passwordData);

      console.log("Resposta da API:", response);

      toast.success(response.message || "Senha alterada com sucesso!");

      // Limpar formulário
      resetPassword();
    } catch (error) {
      console.error("Erro ao alterar senha:", error);
      toast.error(
        error instanceof Error ? error.message : "Erro ao alterar senha"
      );
    } finally {
      setIsChangingPassword(false);
    }
  };

  // Verificar se nova senha e confirmação coincidem em tempo real
  const newPassword = watchPassword("newPassword");
  const confirmPassword = watchPassword("confirmPassword");
  const passwordsMatch =
    newPassword && confirmPassword && newPassword === confirmPassword;

  if (isLoadingProfile) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-primary-gradient">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando perfil...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Meu Perfil - MindTrack</title>
      </Helmet>

      <div className="min-h-screen flex justify-center bg-primary-gradient px-4 sm:px-6 lg:px-16 py-10">
        <div className="w-full max-w-3xl text-start">
          <Link
            to="/dashboard"
            className="text-blue-600 font-semibold text-sm mb-3 inline-flex items-center gap-2 mx-auto"
          >
            <FaArrowLeft className="w-4 h-4" />
            <span className="text-sm">Voltar</span>
          </Link>

          <h1 className="text-2xl sm:text-3xl font-bold mb-1">Meu Perfil</h1>
          <p className="text-gray-500 mb-6">
            Gerencie suas informações e preferências
          </p>

          {/* Tabs */}
          <nav className="relative gap-4 grid grid-cols-2 w-full sm:w-max mx-auto mb-6">
            <button
              onClick={() => setActiveTab("informacoes")}
              className={`pb-2 text-sm cursor-pointer font-medium text-center transition-colors ${
                activeTab === "informacoes" ? "text-blue-600" : "text-gray-400"
              }`}
              aria-current={activeTab === "informacoes" ? "page" : undefined}
            >
              <span className="flex items-center gap-2">
                <FaRegUser />
                Informações
              </span>
            </button>

            <button
              onClick={() => setActiveTab("senha")}
              className={`pb-2 cursor-pointer text-sm font-medium text-center transition-colors ${
                activeTab === "senha" ? "text-blue-600" : "text-gray-400"
              }`}
              aria-current={activeTab === "senha" ? "page" : undefined}
            >
              <span className="flex items-center gap-2 ml-4">
                <IoLockClosedOutline />
                Senha
              </span>
            </button>

            <div
              className={`absolute bottom-0 left-0 h-0.5 bg-blue-600 w-1/2 transform transition-transform duration-300 ease-in-out ${
                activeTab === "senha" ? "translate-x-full" : "translate-x-0"
              }`}
            />
          </nav>

          {/* Conteúdo */}
          <div className="w-full bg-white rounded-lg shadow-lg text-left">
            <div className="relative min-h-96 sm:min-h-96 md:min-h-96">
              {/* Painel Informações */}
              <div
                className={`absolute inset-0 transition-all duration-300 ease-in-out ${
                  activeTab === "informacoes"
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 -translate-y-2 pointer-events-none"
                }`}
                aria-hidden={activeTab !== "informacoes"}
              >
                <section className="p-6 sm:p-8">
                  <h2 className="text-lg font-semibold mb-2">
                    Informações Pessoais
                  </h2>
                  <p className="text-sm text-gray-500 mb-6">
                    Atualize suas informações de perfil
                  </p>

                  <form onSubmit={handleSubmitProfile(onSubmitProfile)}>
                    {/* Nome usando TextInput */}
                    <TextInput
                      label="Nome de Usuário"
                      placeholder={
                        userProfile?.username || "Seu nome de usuário"
                      }
                      register={registerProfile}
                      name="username"
                      error={errorsProfile.username}
                      required
                    />

                    {/* Email desabilitado */}
                    <TextInput
                      label="Email"
                      placeholder={userProfile?.email || "Seu email"}
                      register={registerProfile}
                      name="email"
                      disabled
                      error={errorsProfile.email}
                    />
                    <div className="text-xs text-gray-400 mb-6">
                      Email não pode ser alterado
                    </div>

                    <Button
                      type="submit"
                      variant="secondary"
                      className="w-full sm:w-auto"
                      disabled={isUpdatingProfile}
                    >
                      {isUpdatingProfile ? "Salvando..." : "Salvar Alterações"}
                    </Button>
                  </form>
                </section>
              </div>

              {/* Painel Senha */}
              <div
                className={`absolute inset-0 transition-all duration-300 ease-in-out ${
                  activeTab === "senha"
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 -translate-y-2 pointer-events-none"
                }`}
                aria-hidden={activeTab !== "senha"}
              >
                <section className="p-6 sm:p-8">
                  <h2 className="text-lg font-semibold mb-2">Alterar Senha</h2>
                  <p className="text-sm text-gray-500 mb-4">
                    Atualize sua senha de acesso
                  </p>

                  <form onSubmit={handleSubmitPassword(onSubmitPassword)}>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Senha Atual *
                      </label>
                      <PasswordInput
                        placeholder="Digite sua senha atual"
                        register={registerPassword}
                        name="currentPassword"
                        error={errorsPassword.currentPassword}
                        required
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nova Senha *
                      </label>
                      <PasswordInput
                        placeholder="Digite a nova senha (mín. 8 caracteres)"
                        register={registerPassword}
                        name="newPassword"
                        error={errorsPassword.newPassword}
                        required
                      />
                    </div>

                    <div className="mb-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Confirmar Nova Senha *
                      </label>
                      <PasswordInput
                        placeholder="Confirme a nova senha"
                        register={registerPassword}
                        name="confirmPassword"
                        error={errorsPassword.confirmPassword}
                        required
                      />
                      {confirmPassword && newPassword && !passwordsMatch && (
                        <p className="text-red-500 text-xs mt-1">
                          As senhas não coincidem
                        </p>
                      )}
                      {passwordsMatch && newPassword && (
                        <p className="text-green-500 text-xs mt-1">
                          ✓ Senhas coincidem
                        </p>
                      )}
                    </div>

                    <div className="flex justify-end -mt-2">
                      <Button
                        type="submit"
                        variant="secondary"
                        className="w-full sm:w-auto"
                        disabled={
                          isChangingPassword || !passwordsMatch || !newPassword
                        }
                      >
                        {isChangingPassword ? "Alterando..." : "Alterar Senha"}
                      </Button>
                    </div>
                  </form>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
