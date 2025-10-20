import React, { useState } from "react";
import { BookOpen } from "lucide-react";

export default function TelaCadastro() {
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
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        placeholder="Seu nome"
        required
        className="w-full mb-4 px-4 py-2 border border-slate-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
        />

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

        {/* Senha */}
        <label className="block text-slate-700 text-sm mb-1" htmlFor="senha">
        Senha
        </label>
        <input
        id="senha"
        type="password"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        placeholder="********"
        required
        className="w-full mb-4 px-4 py-2 border border-slate-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
        />

        {/* Confirmar senha */}
        <label className="block text-slate-700 text-sm mb-1" htmlFor="confirmarSenha">
        Confirmar senha
        </label>
        <input
        id="confirmarSenha"
        type="password"
        value={confirmarSenha}
        onChange={(e) => setConfirmarSenha(e.target.value)}
        placeholder="********"
        required
        className="w-full mb-6 px-4 py-2 border border-slate-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
        />

        {/* Botão */}
        <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
        >
        Criar Conta
        </button>

        {/* Link para login */}
        <div className="text-center mt-4">
        <span className="text-sm text-slate-500">Já tem uma conta? </span>
        <a href="#" className="text-sm text-blue-600 hover:underline">
            Fazer login
        </a>
        </div>

        {/* Rodapé */}
        <p className="text-center text-xs text-slate-400 mt-6">
        Sua jornada de autoconhecimento começa aqui
        </p>
    </form>
    </div>
);
}
