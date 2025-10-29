import MindTrackBlue from "../../../assets/MindTracksemfund-blue.png";
import Button from '../../../components/ui/Button';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../../contexts/ThemeContext';

type HeaderProps = {
  onLogin: () => void;
  onSignup: () => void;
};

export function Header({ onLogin, onSignup }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="flex justify-between items-center px-6 sm:px-10 lg:px-20 py-4 border-b border-gray-100 dark:border-gray-700">
      <div className="flex items-center ">
        <img src={MindTrackBlue} alt="MindTrack logo" className="w-10 h-10 sm:w-12 sm:h-12 object-contain cursor-pointer" />
        <span className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-white -ml-1 cursor-pointer">MindTrack</span>
      </div>
      <div className="flex items-center space-x-3">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
          title={theme === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro'}
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <Button onClick={onLogin} variant="quaternary">Entrar</Button>
        <Button onClick={onSignup} variant="secondary">Cadastrar</Button>
      </div>
    </header>
  );
}