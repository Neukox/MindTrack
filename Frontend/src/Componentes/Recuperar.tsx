import React, { useState } from "react";
import { BookOpen } from "lucide-react";

export default function Recuperar() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (senha !== confirmarSenha) {
      alert("As senhas não coincidem!");
      return;
    }
    console.log({ nome, email, senha });
    alert("Cadastro realizado! (veja console)");
}

return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#fff8f3] to-[#f3eef0] p-6">
      {/* Logo e título */}
    <div className="flex flex-col items-center mb-10">
        <div className="flex items-center gap-3 mb-2">
        <div className="p-3 bg-indigo-100 rounded-2xl shadow-lg">
            <BookOpen className="w-8 h-8 text-indigo-600" />
        </div>
        <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">
            MindTrack
        </h1>
        </div>
        <p className="text-sm text-gray-500">Diário de Bordo Acadêmico</p>
    </div>

      {/* Formulário de cadastro */}
    <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg p-8"
    >
        <h2 className="text-2xl font-bold text-slate-800 mb-2">
        Recuperar Senha
        </h2>
        <p className="text-sm text-slate-500 mb-6">
        Digite seu email para recuperar sua senha
        </p>


        {/* Email */}
        <label className="block text-slate-700 text-sm mb-1" htmlFor="email">
        Email
        </label>
        <input
        id="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="seu@email.com"
        required
        className="w-full mb-4 px-4 py-2 border border-slate-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
        />

        {/* Botão */}
        <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
        >
        Enviar link de recuperação
        </button>

        {/* Link para login */}
        <div className="text-center mt-4">
        <a href="#" className="text-sm text-blue-600 hover:underline">
            ⭠ Voltar para login
        </a>
        </div>
    </form>
    </div>
);
}
