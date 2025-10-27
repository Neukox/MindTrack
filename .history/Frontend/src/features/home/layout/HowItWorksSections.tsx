import React from 'react';

// Subcomponente StepCard (Integrado)
interface StepCardProps {
step: number;
title: string;
description: string;
  iconBgClass: string; // Classe de fundo do ícone (ex: 'bg-blue-200/50')
  iconTextClass: string; // Classe de texto do ícone (ex: 'text-blue-700')
}

const StepCard: React.FC<StepCardProps> = ({ step, title, description, iconBgClass, iconTextClass }) => {
return (
    <div className="flex flex-col items-center text-center p-6 w-full md:w-1/3 flex-1 min-h-[260px] bg-white rounded-2xl shadow-sm hover:shadow-md transition-transform duration-300 ease-in-out transform hover:-translate-y-2">
      {/* Círculo do Ícone */}
    <div className={`w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold mb-4 ${iconBgClass} ${iconTextClass} ring-4 ring-white shadow-md transition duration-300 ease-in-out`}>
        {step}
    </div>
    
      {/* Título */}
    <h3 className="text-xl font-semibold mb-2 text-gray-800">
        {title}
    </h3>
    
      {/* Descrição */}
    <p className="text-gray-500 max-w-xs text-base leading-relaxed mt-2">
        {description}
    </p>

      {/* Espaçador flexível para manter alinhamento consistente */}
    <div className="mt-auto" />
    </div>
);
};

// Componente Principal
const HowItWorksSections: React.FC = () => {

  // Definição dos dados dos passos
const steps = [
    {
    step: 1,
    title: "Crie sua Conta",
    description: "Cadastre-se com seu e-mail e crie uma senha segura em menos de um minuto.",
    iconBgClass: "bg-blue-200",
    iconTextClass: "text-blue-700",
    },
    {
    step: 2,
    title: "Registre Reflexões",
    description: "Comece a registrar suas reflexões, emoções e aprendizados diariamente.",
    iconBgClass: "bg-purple-200",
    iconTextClass: "text-purple-700",
    },
    {
    step: 3,
    title: "Acompanhe Progresso",
    description: "Visualize gráficos e análises que mostram sua evolução ao longo do tempo.",
    iconBgClass: "bg-green-200",
    iconTextClass: "text-green-700",
    },
];

return (
    // O fundo levemente cinza/branco (bg-white ou bg-gray-50) se assemelha à imagem.
    <section className="bg-pink-50 pt-12 pb-16 text-gray-800">
    <div className="max-w-6xl mx-auto">
        
        {/* Título Principal e Subtítulo */}
        <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3">
            Como Funciona
        </h2>
        <p className="text-lg text-gray-500">
            Três passos simples para começar sua jornada de autoconhecimento
        </p>
        </div>

        {/* Container dos Passos (Flexbox Responsivo) */}
        {/* Usamos 'md:flex-row' para empilhar em telas pequenas e alinhar em telas médias/grandes */}
        <div className="flex flex-col md:flex-row justify-center items-stretch gap-8 md:gap-6">
        
        {steps.map((stepData) => (
            <React.Fragment key={stepData.step}>
              {/* Card do Passo */}
            <StepCard 
                step={stepData.step}
                title={stepData.title}
                description={stepData.description}
                iconBgClass={stepData.iconBgClass}
                iconTextClass={stepData.iconTextClass}
            />
            </React.Fragment>
        ))}
        </div>
    </div>
    </section>
);
};

export default HowItWorksSections;
