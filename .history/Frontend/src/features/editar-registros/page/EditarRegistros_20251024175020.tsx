import { useState } from 'react';

export default function EditarRegistro() {
  const [titulo, setTitulo] = useState('');
  const [reflexao, setReflexao] = useState('');
  const [categoria, setCategoria] = useState('Pessoal');
  const [emocao, setEmocao] = useState('Calma');

  const categorias = [
    { nome: 'Estudo', descricao: 'Aprendizados e aulas', icone: '📘' },
    { nome: 'Estágio', descricao: 'Experiência profissional', icone: '💼' },
    { nome: 'Pessoal', descricao: 'Reflexões pessoais', icone: '💖' },
    { nome: 'Pesquisa', descricao: 'Projetos de pesquisa', icone: '🔬' }
  ];

  const emocaoList = [
    { nome: 'Alegria', emoji: '😊', cor: 'bg-yellow-100' },
    { nome: 'Calma', emoji: '😌', cor: 'bg-blue-100' },
    { nome: 'Ansiedade', emoji: '😰', cor: 'bg-purple-100' },
    { nome: 'Reflexão', emoji: '🤔', cor: 'bg-pink-100' },
    { nome: 'Motivação', emoji: '🚀', cor: 'bg-green-100' },
    { nome: 'Tristeza', emoji: '😢', cor: 'bg-indigo-100' }
  ];

  return (
    <div className="min-h-screen bg-[#FFF8F3] flex flex-col items-center p-4 sm:p-8">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-sm p-6 sm:p-10">
        <button className="text-blue-600 text-sm mb-4 hover:underline">← Voltar para registro</button>

        <h1 className="text-2xl sm:text-3xl font-bold mb-6">Editar Registro</h1>

        {/* Campo Título */}
        <div className="mb-5">
          <label className="block text-gray-700 font-medium mb-2">Título</label>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="Digite o título"
            className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Campo Reflexão */}
        <div className="mb-5">
          <label className="block text-gray-700 font-medium mb-2">Reflexão</label>
          <textarea
            value={reflexao}
            onChange={(e) => setReflexao(e.target.value)}
            placeholder="Digite sua reflexão"
            rows="5"
            className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Categoria */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Categoria</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {categorias.map((cat) => (
              <button
                key={cat.nome}
                onClick={() => setCategoria(cat.nome)}
                className={`p-3 rounded-xl border text-center transition-all ${
                  categoria === cat.nome
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-2xl">{cat.icone}</div>
                <div className="font-semibold text-gray-800">{cat.nome}</div>
                <div className="text-xs text-gray-500">{cat.descricao}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Emoção Predominante */}
        <div className="mb-8">
          <label className="block text-gray-700 font-medium mb-3">Emoção Predominante</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {emocaoList.map((emo) => (
              <button
                key={emo.nome}
                onClick={() => setEmocao(emo.nome)}
                className={`flex items-center justify-center gap-2 py-3 rounded-xl border transition-all ${
                  emocao === emo.nome
                    ? 'border-blue-500 bg-blue-50'
                    : `${emo.cor} border-gray-200 hover:border-gray-300`
                }`}
              >
                <span className="text-xl">{emo.emoji}</span>
                <span className="font-medium text-gray-700">{emo.nome}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Botões */}
        <div className="flex flex-col sm:flex-row gap-3 justify-end">
          <button className="bg-blue-600 text-white px-5 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all">
            💾 Salvar Alterações
          </button>
          <button className="bg-gray-100 text-gray-800 px-5 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-all">
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
