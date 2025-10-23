import React, { useState } from "react";
import NavBar from "../dashboard/layouts/Navbar";

export default function MindTrackRecords() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Todas");
  const [emotion, setEmotion] = useState("Todas");
  const [month, setMonth] = useState("Todos os meses");

  const records = [
    {
      id: 1,
      title: "Me sentindo feliz",
      date: "20 de out. de 2025 às 13:08",
      body: "sssss",
      category: "Pessoal",
      emotion: "Calma",
    },
  ];

  const filtered = records.filter((r) => {
    if (category !== "Todas" && r.category !== category) return false;
    if (emotion !== "Todas" && r.emotion !== emotion) return false;
    if (query && !(`${r.title} ${r.body}`.toLowerCase().includes(query.toLowerCase()))) return false;
    // month filter omitted for demo (would compare date)
    return true;
  });

  return (
    <div className="min-h-screen bg-rose-50 text-slate-800">
      <NavBar />

      {/* Page content */}
      <main className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-extrabold mb-1">Meus Registros</h1>
        <p className="text-sm text-slate-500 mb-6">{records.length} registro{records.length !== 1 ? "s" : ""} encontrado{records.length !== 1 ? "s" : ""}</p>

        {/* Filters card */}
        <section className="bg-white rounded-xl shadow-sm p-4 md:p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4 md:items-center">
            <div className="flex-1">
              <label className="sr-only">Buscar</label>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar registros..."
                className="w-full border border-rose-100 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-200"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full md:w-auto">
              <select value={category} onChange={(e) => setCategory(e.target.value)} className="rounded-lg border border-rose-100 px-3 py-2">
                <option>Todas</option>
                <option>Pessoal</option>
                <option>Trabalho</option>
              </select>
              <select value={emotion} onChange={(e) => setEmotion(e.target.value)} className="rounded-lg border border-rose-100 px-3 py-2">
                <option>Todas</option>
                <option>Feliz</option>
                <option>Calma</option>
                <option>Ansioso</option>
              </select>
              <select value={month} onChange={(e) => setMonth(e.target.value)} className="rounded-lg border border-rose-100 px-3 py-2">
                <option>Todos os meses</option>
                <option>Outubro</option>
                <option>Setembro</option>
              </select>
            </div>
          </div>
        </section>

        {/* Records list */}
        <section className="space-y-4">
          {filtered.map((r) => (
            <article key={r.id} className="bg-white rounded-xl p-6 shadow-sm">
              <div className="md:flex md:justify-between">
                <div>
                  <h2 className="text-lg font-semibold">{r.title}</h2>
                  <div className="text-sm text-slate-500 mt-1">{r.date}</div>
                </div>

                <div className="flex items-start gap-3 mt-4 md:mt-0">
                  <button className="p-2 rounded-full hover:bg-rose-50">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-rose-500" viewBox="0 0 20 20" fill="currentColor"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"/></svg>
                  </button>
                  <button className="p-2 rounded-full hover:bg-rose-50">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v1h12V4a2 2 0 00-2-2H6zm-1 7a1 1 0 011-1h8a1 1 0 011 1v6a2 2 0 01-2 2H7a2 2 0 01-2-2V9z" clipRule="evenodd"/></svg>
                  </button>
                </div>
              </div>

              <p className="mt-4 text-slate-700">{r.body}</p>

              <div className="border-t border-rose-100 mt-4 pt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 opacity-80" viewBox="0 0 20 20" fill="currentColor"><path d="M3 8a4 4 0 018 0v1h6v7a1 1 0 01-1 1H2a1 1 0 01-1-1V8h2z"/></svg>
                    <span className="font-medium">{r.category}</span>
                  </span>

                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-sm">
                    <span className="text-sm">🙂</span>
                    <span className="font-medium">{r.emotion}</span>
                  </span>
                </div>

                <a className="text-sm text-sky-600 hover:underline self-end">Ver mais</a>
              </div>
            </article>
          ))}

          {filtered.length === 0 && (
            <div className="bg-white rounded-xl p-6 text-center text-slate-500">Nenhum registro encontrado.</div>
          )}
        </section>
      </main>

      {/* Footer spacing */}
      <div className="h-16" />
    </div>
  );
}
