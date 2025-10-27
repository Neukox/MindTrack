import React from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { IllustrationSection } from "./components/IlustrationSection";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Home - MindTrack</title>
      </Helmet>

      <div className="min-h-screen bg-white text-gray-800">
        {/* Cabeçalho */}
        <Header
          onLogin={() => navigate("/login")}
          onSignup={() => navigate("/cadastro")}
        />

        {/* Conteúdo Principal */}
        <main className="flex flex-col lg:flex-row items-center justify-center lg:justify-between px-6 lg:px-16  mx-16 lg:space-y-0">
          {/* Seção de Texto (Esquerda) */}
          <HeroSection
            onStart={() => navigate("/cadastro")}
            onLogin={() => navigate("/login")}
          />

          {/* Seção de Ilustração (Direita) */}
          <IllustrationSection />
        </main>
      </div>
    </>
  );
};

export default HomePage;
