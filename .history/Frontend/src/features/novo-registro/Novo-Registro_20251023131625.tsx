import React, { useState } from "react";
import NavBar from "../dashboard/layouts/Navbar";
import { Helmet } from "react-helmet-async";

export default function NovoRegistro() {
  const [categoria, setCategoria] = useState("Estudo");
  const [emocao, setEmocao] = useState("");
  const [titulo, setTitulo] = useState("");
  const [reflexao, setReflexao] = useState("");

  const categorias = [
    { nome: "Estudo", desc: "Aprendizados e aulas", icon: "📘" },
    { nome: "Estágio", desc: "Experiência profissional", icon: "💼" },
    { nome: "Pessoal", desc: "Reflexões pessoais", icon: "💖" },
    { nome: "Pesquisa", desc: "Projetos de pesquisa", icon: "🔬" },
  ];

  const emocaoList = [
    { nome: "Alegria", emoji: "😊", cor: "bg-yellow-100" },
    { nome: "Calma", emoji: "🙂", cor: "bg-blue-100" },
    { nome: "Ansiedade", emoji: "😰", cor: "bg-red-100" },
    { nome: "Reflexão", emoji: "🤔", cor: "bg-purple-100" },
    { nome: "Motivação", emoji: "🚀", cor: "bg-green-100" },
    { nome: "Tristeza", emoji: "😢", cor: "bg-slate-100" },
  ];

  return (
    <div className="min-h-screen bg-rose-50 text-slate-800">
      {/* Navbar */}
      <header className="bg-rose-50 border-b border-rose-100">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-md bg-indigo-500 flex items-center justify-center text-white font-bold">M</div>
            <div>
              <div className="font-semibold">MindTrack</div>
              <div className="text-xs text-slate-500">Diário Acadêmico</div>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm text-slate-600">
            <a className="hover:underline">Dashboard</a>
            <a className="hover:underline">Registros</a>
            <a className="hover:underline">Exportar</a>
          </nav>

          <div className="flex items-center gap-3">
            <button className="hidden sm:inline-flex bg-blue-600 text-white px-4 py-2 rounded-md text-sm shadow">+ Novo Registro</button>
            <div className="text-sm text-slate-600 text-right">
              <div className="font-medium">Gabrielfconline0900</div>
              <div className="text-xs">gabrielfconline0900@gmail.com</div>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-4xl mx-auto px-4 py-10">
        <a href="#" className="text-sky-600 hover:underline text-sm">← Voltar para registros</a>

        <h1 className="text-3xl font-extrabold mt-4 mb-1">Novo Registro</h1>
        <p className="text-slate-500 mb-8">Compartilhe seus pensamentos, reflexões e emoções</p>

        <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
          <h2 className="text-lg font-semibold mb-1">Criar Entrada</h2>
          <p className="text-slate-500 mb-4 text-sm">Dedique um tempo para refletir sobre sua jornada acadêmica</p>

          {/* Título */}
          <input
            type="text"
            placeholder="Ex: Reflexão sobre a aula de hoje"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="w-full border border-rose-100 rounded-lg px-4 py-3 mb-6 focus:outline-none focus:ring-2 focus:ring-rose-200"
          />

          {/* Categorias */}
          <h3 className="font-medium mb-2">Categoria</h3>
          <div className="grid sm:grid-cols-2 gap-3 mb-6">
            {categorias.map((c) => (
              <button
                key={c.nome}
                onClick={() => setCategoria(c.nome)}
                className={`border rounded-xl p-4 text-left transition-all ${categoria === c.nome ? "border-blue-500 bg-blue-50" : "border-slate-200 hover:bg-slate-50"}`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{c.icon}</span>
                  <div>
                    <div className="font-semibold">{c.nome}</div>
                    <div className="text-xs text-slate-500">{c.desc}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Emoções */}
          <h3 className="font-medium mb-2">Emoção Predominante</h3>
          <div className="flex flex-wrap gap-3 mb-6">
            {emocaoList.map((e) => (
              <button
                key={e.nome}
                onClick={() => setEmocao(e.nome)}
                className={`px-4 py-2 rounded-xl flex items-center gap-2 ${e.cor} border ${emocao === e.nome ? "border-blue-400" : "border-transparent"}`}
              >
                <span>{e.emoji}</span>
                <span className="font-medium text-sm">{e.nome}</span>
              </button>
            ))}
          </div>

          {/* Reflexão */}
          <h3 className="font-medium mb-2">Sua Reflexão</h3>
          <textarea
            value={reflexao}
            onChange={(e) => setReflexao(e.target.value)}
            placeholder="Escreva seus pensamentos, aprendizados e reflexões aqui. Não há limite de caracteres..."
            className="w-full border border-rose-100 rounded-lg p-4 h-40 focus:outline-none focus:ring-2 focus:ring-rose-200 text-slate-700"
          />

          <div className="text-xs text-slate-500 mt-1">{reflexao.length} caracteres</div>

          {/* Ações */}
          <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6">
            <button className="flex-1 sm:flex-none bg-slate-100 text-slate-700 px-6 py-2 rounded-md font-medium hover:bg-slate-200 transition">
              Cancelar
            </button>
            <button className="flex-1 sm:flex-none bg-blue-500 text-white px-6 py-2 rounded-md font-medium hover:bg-blue-600 transition">
              💾 Salvar Registro
            </button>
          </div>
        </div>

        {/* Dicas */}
        <section className="bg-rose-100/40 rounded-xl p-6 mt-8">
          <h4 className="font-semibold mb-2">Dicas para uma boa reflexão</h4>
          <ul className="list-disc list-inside space-y-1 text-slate-700 text-sm">
            <li>Seja honesto e autêntico em suas reflexões</li>
            <li>Descreva não apenas o que aconteceu, mas como você se sentiu</li>
            <li>Identifique aprendizados e insights importantes</li>
            <li>Considere como isso impacta seu desenvolvimento pessoal</li>
          </ul>
        </section>
      </main>
    </div>
  );
}