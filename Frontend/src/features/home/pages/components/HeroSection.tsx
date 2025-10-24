import Button from "../../../../components/ui/Button";

type HeroSectionProps = {
  onStart: () => void;
  onLogin: () => void;
};

export function HeroSection(props: HeroSectionProps & React.HTMLAttributes<HTMLElement>) {
  const { onStart, onLogin, } = props;
  return (
    <section className="flex flex-col lg:flex-row items-center justify-center min-h-[calc(100vh-64px)] px-6 sm:px-10 lg:px-20 py-16">
      <div className="max-w-xl lg:mr-20 mb-12 lg:mb-0 text-center lg:text-left">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-2 text-gray-900">
          Seu Diário de Bordo Acadêmico
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-lg mx-auto lg:mx-0">
          Registre suas reflexões, acompanhe suas emoções e acompanhe sua evolução
          pessoal e acadêmica ao longo do semestre.
        </p>

        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 justify-center lg:justify-start">
          <Button onClick={onStart} variant="secondary">
            🚀 Começar Agora
          </Button>
          <Button onClick={onLogin} variant="neutral">
            🔑 Já tenho conta
          </Button>
        </div>

        <div className="mt-8 text-sm text-gray-500 flex justify-center lg:justify-start space-x-4">
          <p><span className="text-amber-500">*</span> Gratuito</p>
          <p><span className="text-amber-500">*</span> Seguro</p>
          <p><span className="text-amber-500">*</span> Sem compromisso</p>
        </div>
      </div>
    </section>
  );
}


