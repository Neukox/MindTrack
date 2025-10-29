import MindTrackBlue from "../../../assets/MindTracksemfund-blue.png";
import Button from '../../../components/ui/Button';
type HeaderProps = {
  onLogin: () => void;
  onSignup: () => void;
};

export function Header({ onLogin, onSignup }: HeaderProps) {
  return (
<<<<<<< HEAD
<<<<<<<< HEAD:.history/Frontend/src/features/home/layout/Header_20251029185054.tsx
=======
>>>>>>> 773b987 (Adicionando modo escuro em todas as paginas. Também, adicionei um botao de HOME no layout de login, registro e recuperação de senha.)
    <header className="flex justify-between items-center px-6 sm:px-10 lg:px-20 py-4 border-b border-gray-100 dark:border-gray-700">
      <div className="flex items-center ">
        <img src={MindTrackBlue} alt="MindTrack logo" className="w-10 h-10 sm:w-12 sm:h-12 object-contain cursor-pointer" />
        <span className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-white -ml-1 cursor-pointer">MindTrack</span>
<<<<<<< HEAD
========
    <header className="flex justify-between items-center px-6 sm:px-10 lg:px-20 py-4 border-b border-gray-100">
      <div className="flex items-center ">
        <img src={MindTrackBlue} alt="MindTrack logo" className="w-10 h-10 sm:w-12 sm:h-12 object-contain cursor-pointer" />
        <span className="text-xl sm:text-2xl font-semibold text-gray-800 -ml-1 cursor-pointer">MindTrack</span>
>>>>>>>> fedf7e7 (Refatorando rotas,cores, espaçamentos do homePage):Frontend/src/features/home/layout/Header.tsx
=======
>>>>>>> 773b987 (Adicionando modo escuro em todas as paginas. Também, adicionei um botao de HOME no layout de login, registro e recuperação de senha.)
      </div>
      <div className="flex items-center space-x-3">
        <Button onClick={onLogin} variant="quaternary">Entrar</Button>
        <Button onClick={onSignup} variant="secondary">Cadastrar</Button>
      </div>
    </header>
  );
}