import React from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Header } from "./Header";
import { HeroSection } from "./HeroSection";
import FooterSection from "./FooterSection";
import { IllustrationSection } from "./IlustrationSection";
import { CardSection } from "../components/CardSection";
import HowItWorksSections from "../components/HowItWorksSections";
import useAuthStore from "@/features/auth/store/auth.store";

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  return (
    <>
      <Helmet>
        <title>Home - MindTrack</title>
      </Helmet>

      <div className="min-h-screen bg-primary-gradient dark:bg-linear-to-br dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-white transition-colors duration-300">
        {/* Cabeçalho */}
        <Header
          onLogin={() => {
            if (user) {
              navigate("/dashboard");
            } else {
              navigate("/login");
            }
          }}
          onSignup={() => navigate("/cadastro")}
        />

        {/* Conteúdo Principal */}
        <main className="flex flex-col lg:flex-row items-center justify-center lg:justify-between px-6 lg:px-16  mx-16 lg:space-y-0">
          {/* Seção de Texto (Esquerda) */}
          <HeroSection
            onStart={() => navigate("/cadastro")}
            onLogin={() => {
              if (user) {
                navigate("/dashboard");
              } else {
                navigate("/login");
              }
            }}
          />

          {/* Seção de Ilustração (Direita) */}
          <IllustrationSection />
        </main>
        <CardSection />
        <HowItWorksSections />
        <FooterSection />
      </div>
    </>
  );
};

export default HomePage;
