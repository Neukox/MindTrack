import { useState } from 'react';
import { Pencil, Trash2 } from 'lucide-react';

export default function VisualizarRegistro() {
  const [titulo] = useState('Me sentindo feliz');
  const [data] = useState('segunda-feira, 20 de outubro de 2025 às 13:08');
  const [categoria] = useState('Pessoal');
  const [emocao] = useState('Calma');
  const [conteudo] = useState('SSSS');

  return (
    <div className="min-h-screen bg-[#FFF8F3] flex flex-col items-center p-4 sm:p-8">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-sm p-6 sm:p-10">
        {/* Voltar */}
        <button className="text-blue-600 text-sm mb-4 hover:underline">← Voltar para registros</button>

        {/* Cabeçalho */}
        <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-gray-900">{titulo}</h1>

        {/* Data e metadados */}
        <div className="text-gray-500 text-sm mb-4 flex flex-wrap items-center gap-2">
          <span>{data}</span>
          <div className="flex items-center gap-2 text-gray-700 font-medium">
            <span className="flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-600 font-semibold rounded-full text-sm">P</span>
            <span>{categoria}</span>
            <span className="flex items-center gap-1">😌 {emocao}</span>
          </div>
        </div>

        <hr className="border-gray-200 mb-4" />

        {/* Conteúdo */}
        <p className="text-gray-800 mb-6 leading-relaxed break-words">{conteudo}</p>

        <hr className="border-gray-200 mb-6" />

        {/* Botões */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button className="flex items-center justify-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all">
            <Pencil size={18} /> Editar
          </button>
          <button className="flex items-center justify-center gap-2 bg-red-100 text-red-600 px-5 py-3 rounded-lg font-semibold hover:bg-red-200 transition-all">
            <Trash2 size={18} /> Deletar
          </button>
        </div>
      </div>
    </div>
  );
}
