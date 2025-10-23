import React from 'react';
import { useNavigate } from 'react-router-dom';
import MindTrackBlue from "../../../assets/MindTracksemfund-blue.png";


// Componente principal da Landing Page
const HomePage: React.FC = () => {
  const navigate = useNavigate(); // hook para navegação

return (
    <div className="min-h-screen bg-white text-gray-800">
    
      {/* Cabeçalho */}
    <header className="flex justify-between items-center px-6 sm:px-10 lg:px-20 py-4 border-b border-gray-100">
        
        {/* Logo/Nome do Aplicativo */}
        <div className="flex items-center space-x-2">
        <img
            src={MindTrackBlue}
            alt="MindTrack logo"
            className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
        />
        <span className="text-xl sm:text-2xl font-semibold text-gray-800">
            MindTrack
        </span>
        </div>

        {/* Botões de Ação do Cabeçalho */}
        <div className="flex items-center space-x-3">
        <button
            onClick={() => navigate('/login')}
            className="text-sm font-medium text-gray-700 hover:text-blue-600 px-4 py-2 transition duration-200 ease-in-out cursor-pointer"
        >
            Entrar
        </button>
        <button
            onClick={() => navigate('/cadastro')}
            className="text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 hover:scale-105 active:scale-95 rounded-md px-5 py-2 shadow-md transition-all duration-200 ease-in-out cursor-pointer"
        >
            Cadastrar
        </button>
        </div>
    </header>

      {/* Conteúdo Principal */}
    <main className="flex flex-col lg:flex-row items-center justify-center min-h-[calc(100vh-64px)] px-6 sm:px-10 lg:px-20 py-16">
        
        {/* Seção de Texto e Ação (Esquerda) */}
        <div className="max-w-xl lg:mr-20 mb-12 lg:mb-0 text-center lg:text-left">
        
          {/* Título Principal */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 text-gray-900">
            Seu Diário de Bordo Acadêmico
        </h1>

          {/* Subtítulo/Descrição */}
        <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-lg mx-auto lg:mx-0">
            Registre suas reflexões, acompanhe suas emoções e acompanhe sua evolução
            pessoal e acadêmica ao longo do semestre.
        </p>

          {/* Botões de Chamada para Ação */}
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 justify-center lg:justify-start">
            <button
              onClick={() => navigate('/cadastro')} // Navega para cadastro
            className="text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 hover:shadow-lg hover:scale-[1.03] active:scale-95 font-medium rounded-lg text-base px-6 py-3 shadow-md transition-all duration-200 ease-in-out cursor-pointer"
            >
            🚀 Começar Agora
            </button>
            <button
              onClick={() => navigate('/login')} // Navega para login
            className="text-gray-700 bg-gray-100 hover:bg-gray-200 hover:text-gray-900 hover:shadow-md hover:scale-[1.03] active:scale-95 font-medium rounded-lg text-base px-6 py-3 transition-all duration-200 ease-in-out border border-gray-200 cursor-pointer"
            >
            🔑 Já tenho conta
            </button>
        </div>

          {/* Mensagem de Confiança */}
        <div className="mt-8 text-sm text-gray-500 flex justify-center lg:justify-start space-x-4">
            <p>
            <span className="text-amber-500">*</span> Gratuito
            </p>
            <p>
            <span className="text-amber-500">*</span> Seguro
            </p>
            <p>
            <span className="text-amber-500">*</span> Sem compromisso
            </p>
        </div>
        </div>

        {/* Seção de Ilustração (Direita) */}
        <div className="w-full max-w-md lg:max-w-lg flex justify-center">
        <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-sm transform transition duration-500 hover:scale-[1.02] border border-gray-100">
            <div className="space-y-4">
            <div className="h-4 bg-blue-200 rounded-full w-3/4"></div>
            <div className="h-3 bg-purple-200 rounded-full w-2/3"></div>
            <div className="h-3 bg-green-200 rounded-full w-full"></div>
            <div className="h-3 bg-green-200 rounded-full w-5/6"></div>
            <div className="h-3 bg-green-200 rounded-full w-full"></div>
            </div>
        </div>

        
        </div>
    </main>
    </div>
);
};

export default HomePage;
