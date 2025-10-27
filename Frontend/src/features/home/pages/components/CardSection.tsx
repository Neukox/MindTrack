

// Definição das cores para os ícones baseadas na imagem (azul, roxo, verde)
const iconColors = {
blue: {
    bg: "bg-[#EAF2FF]", // Fundo azul claro
    text: "text-[#2B6CB0]", // Ícone azul escuro
},
    purple: {
    bg: "bg-[#F3EAFB]", // Fundo roxo claro
    text: "text-[#9F7AEA]", // Ícone roxo escuro
},
green: {
    bg: "bg-[#E9F8EE]", // Fundo verde claro
    text: "text-[#2F855A]", // Ícone verde escuro
},
};

// Dados dos cards com informações idênticas à imagem (textos e ordem)
const cardData = [
{
    title: "Registre Reflexões",
    description: "Capture seus pensamentos, aprendizados e insights de forma organizada e estruturada.",
    colors: iconColors.blue,
    icon: (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Ícone de livro ou anotação (baseado na imagem) */}
        <path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4ZM10 8H14M10 12H14M10 16H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
    ),
},
{
    title: "Acompanhe Emoções",
    description: "Registre suas emoções e identifique padrões ao longo do tempo para melhor autoconhecimento.",
    colors: iconColors.purple,
    icon: (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Ícone de coração (baseado na imagem) */}
        <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.03L12 21.35Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
    ),
},
{
    title: "Visualize Progresso",
    description: "Gráficos intuitivos mostram sua evolução e padrões de comportamento ao longo do semestre.",
    colors: iconColors.green,
    icon: (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Ícone de gráfico de linha (baseado na imagem) */}
        <path d="M3 18L9 12L13 16L21 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M17 8H21V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
    ),
},
{
    title: "Interface Intuitiva",
    // O texto exato está cortado na imagem, mas o texto do código original será mantido pois é um bom placeholder
    description: "Design limpo e moderno que facilita seu fluxo de registros e consultas.",
    colors: iconColors.blue,
    icon: (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Ícone de raio/velocidade (baseado na imagem) */}
        <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
    )
},
{
    title: "Seus Dados Seguros",
    // O texto exato está cortado na imagem, o código original será ajustado para o mais provável na imagem.
    description: "Seus registros são privados e protegidos com boas práticas de segurança.",
    colors: iconColors.purple,
    icon: (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Ícone de escudo (baseado na imagem) */}
        <path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8 12L11 15L16 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
    ),
},
{
    title: "Autoconhecimento",
    // O texto exato está cortado na imagem. Vou usar um que combine.
    description: "Desenvolva maior consciência sobre seus padrões e comportamentos ao longo do tempo.",
    colors: iconColors.green,
    icon: (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Ícone de chaves/código (baseado na imagem) */}
        <path d="M6 15V19C6 19.5523 6.44772 20 7 20H17C17.5523 20 18 19.5523 18 19V15M6 9V5C6 4.44772 6.44772 4 7 4H17C17.5523 4 18 4.44772 18 5V9M10 12L8 14M14 12L16 14M14 12L16 10M10 12L8 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
    ),
},
];


export function CardSection() {
return (
    // Ajustando para um bege/off-white mais sutil e cinzas
    <section className="bg-pink-50 pt-12 pb-16 text-gray-800">
    <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-gray-900">
        Por que usar MindTrack?
        </h2>
        <p className="mt-2 text-center text-gray-500 max-w-2xl mx-auto">
        Uma plataforma completa para sua jornada de autoconhecimento e desenvolvimento acadêmico
        </p>

        {/* Ajustando o gap para um valor padrão do Tailwind (gap-8) e usando 3 colunas em lg */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

        {cardData.map((card, index) => (
            <article key={index} className="flex items-start gap-4 p-8 bg-white rounded-xl shadow-sm border border-transparent hover:shadow-md transition">
            <div className={`flex-none ${card.colors.bg} rounded-lg p-3`}>
                <div className={card.colors.text}>
                {card.icon}
                </div>
            </div>
            <div>
                <h3 className="font-semibold text-gray-900">{card.title}</h3>
                <p className="mt-1 text-gray-500 text-sm">
                {card.description}
                </p>
            </div>
            </article>
        ))}

        </div>
    </div>
    </section>
);
}

export default CardSection;