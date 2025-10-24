import { Helmet } from "react-helmet-async";
import { FaArrowLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useState } from "react";
import Button from "../../../components/ui/Button";
import PasswordInput from "../../../components/ui/PasswordInput";
import TextInput from "../../../components/ui/TextInput";
import { useForm } from "react-hook-form";
import { FaRegUser } from "react-icons/fa";
import { IoLockClosedOutline } from "react-icons/io5";

type FormData = {
  nome: string;
  email: string;
};

export default function Perfil() {
  const [activeTab, setActiveTab] = useState<"informacoes" | "senha">("informacoes");

  // Dados do usuário (exemplo)
  const userName = "Davi";
  const userEmail = "davi31323@gmail.com";

  // react-hook-form
  const { register, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      nome: userName,
      email: userEmail,
    },
  });

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
          <p className="text-gray-500 mb-6">Gerencie suas informações e preferências</p>

          {/* Tabs */}
          <nav className="relative gap-4 grid grid-cols-2 w-full sm:w-max mx-auto mb-6">
            <button
              onClick={() => setActiveTab("informacoes")}
              className={`pb-2 text-sm cursor-pointer font-medium text-center transition-colors ${
                activeTab === "informacoes" ? "text-blue-600" : "text-gray-400"
              }`}
              aria-current={activeTab === "informacoes" ? "page" : undefined}
            >
             <span className="flex items-center gap-2"><FaRegUser />Informações</span> 

            </button>

            <button
              onClick={() => setActiveTab("senha")}
              className={`pb-2 cursor-pointer text-sm font-medium text-center transition-colors ${
                activeTab === "senha" ? "text-blue-600" : "text-gray-400"
              }`}
              aria-current={activeTab === "senha" ? "page" : undefined}
            >
             <span className="flex items-center gap-2 ml-4"><IoLockClosedOutline />Senha</span>

            </button>

            <div
              className={`absolute bottom-0 left-0 h-0.5 bg-blue-600 w-1/2 transform transition-transform duration-300 ease-in-out ${
                activeTab === "senha" ? "translate-x-full" : "translate-x-0"
              }`}
            />
          </nav>

          {/* Conteúdo */}
          <div className="w-full bg-white rounded-lg shadow-lg text-left">
            <div className="relative min-h-[25rem] sm:min-h-[420px] md:min-h-[25rem]">

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
                  <h2 className="text-lg font-semibold mb-2">Informações Pessoais</h2>
                  <p className="text-sm text-gray-500 mb-6">Atualize suas informações de perfil</p>

                  {/* Nome usando TextInput */}
                  <TextInput
                    label="Nome"
                    placeholder="Seu nome"
                    register={register}
                    name="nome"
                    error={errors.nome}
                  />

                  {/* Email desabilitado */}
                  <TextInput
                    label="Email"
                    placeholder="Seu email"
                    register={register}
                    name="email"
                    disabled
                    error={errors.email}
                  />
                  <div className="text-xs text-gray-400 mb-6">Email não pode ser alterado</div>

                  <Button variant="secondary" className="w-full sm:w-auto">
                    Editar Perfil
                  </Button>
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
                  <p className="text-sm text-gray-500 mb-4">Atualize sua senha de acesso</p>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Senha Atual</label>
                    <PasswordInput placeholder="Digite sua senha atual" />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nova Senha</label>
                    <PasswordInput placeholder="Digite a nova senha" />
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Confirmar Nova Senha</label>
                    <PasswordInput placeholder="Confirme a nova senha" />
                  </div>

                  <div className="flex justify-end">
                    <Button variant="secondary" className="w-full sm:w-auto">
                      Salvar
                    </Button>
                  </div>
                </section>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
