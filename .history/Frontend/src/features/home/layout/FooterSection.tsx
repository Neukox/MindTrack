// src/components/FooterSection.tsx
import React from "react";
import { MdOutlineTrackChanges } from "react-icons/md";

const footerLinks = {
Produto: ["Recursos", "Preços", "Segurança"],
Empresa: ["Sobre", "Blog", "Contato"],
Legal: ["Privacidade", "Termos", "Cookies"],
};

interface FooterLinkGroupProps {
title: string;
links: string[];
}

const FooterLinkGroup: React.FC<FooterLinkGroupProps> = ({ title, links }) => (
<div className="text-center md:text-left">
    <h4 className="text-sm md:text-base font-semibold text-gray-900 mb-4">
    {title}
    </h4>
    <ul className="space-y-3">
    {links.map((link) => (
        <li key={link}>
        <a
            href={`#${link.toLowerCase().replace(/ /g, "-")}`}
            className="text-sm text-gray-500 hover:text-gray-900 transition-colors duration-150"
        >
            {link}
        </a>
        </li>
    ))}
    </ul>
</div>
);

const FooterSection: React.FC = () => {
return (
    <div className="min-h-screen bg-white font-sans">
      {/* Seção CTA */}
    <section
        className="py-24 bg-pink-300 sm:py-28 md:py-32"
        style={{
        backgroundImage:
            "linear-gradient(90deg, rgba(237,243,255,0.7) 0%, rgba(255,244,250,0.6) 100%)",
        }}
    >
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
            Pronto para começar sua jornada?
        </h1>
        <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Junte-se a alunos de Psicologia que estão transformando sua
            experiência acadêmica com reflexão e autoconhecimento.
        </p>

        <button
            aria-label="Criar Conta Gratuita"
            className="inline-block px-6 py-3 rounded-full bg-blue-600 text-white font-medium shadow-md hover:bg-blue-700 transition"
        >
            Criar Conta Gratuita
        </button>
        </div>
    </section>

      {/* Divisor */}
    <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <hr className="border-gray-100" />
    </div>

      {/* Rodapé */}
    <footer className="bg-white pt-12 pb-8 sm:pt-16 sm:pb-12 md:pt-20 md:pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Grid principal: logo + colunas */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-6 items-start">
            
            {/* Logo e descrição */}
            <div className="md:col-span-2 flex flex-col items-start text-left md:pr-6">
              <div className="flex items-center gap-[4px] mb-2"> {/* Ícone mais próximo do texto */}
                <span className="text-base sm:text-lg font-semibold text-gray-900">
                MindTrack
                </span>
            </div>
            <p className="text-sm text-gray-500 max-w-[240px] leading-relaxed">
                Diário de Bordo Acadêmico para alunos de Psicologia
            </p>
            </div>

            {/* Colunas de links */}
            <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
            {Object.entries(footerLinks).map(([title, links]) => (
                <FooterLinkGroup key={title} title={title} links={links} />
            ))}
            </div>
        </div>

          {/* Linha divisória e direitos autorais */}
        <div className="mt-12 sm:mt-16 border-t border-gray-100 pt-6">
            <p className="text-center text-xs text-gray-500">
            © 2025 MindTrack. Todos os direitos reservados.
            </p>
        </div>
        </div>
    </footer>
    </div>
);
};

export default FooterSection;
