import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../lib/hooks/useTheme';

export function FloatingThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`
        fixed bottom-6 right-6 z-50
        p-3 rounded-full
        bg-white dark:bg-gray-800
        text-gray-800 dark:text-white
        shadow-lg dark:shadow-gray-900/50
        border border-gray-200 dark:border-gray-700
        hover:bg-gray-50 dark:hover:bg-gray-700
        transition-all duration-300 ease-in-out
        hover:scale-110 hover:shadow-xl
        focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
        group
      `}
      title={theme === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro'}
    >
      {theme === 'dark' ? (
        <Sun 
          size={24} 
          className="transition-transform duration-300 group-hover:rotate-180" 
        />
      ) : (
        <Moon 
          size={24} 
          className="transition-transform duration-300 group-hover:-rotate-12" 
        />
      )}
    </button>
  );
}