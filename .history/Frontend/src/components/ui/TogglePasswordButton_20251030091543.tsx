import { Eye, EyeOff } from "lucide-react"; // ou de onde você estiver importando
import { cn } from "../../utils/cn";

type TogglePasswordButtonProps = {
  showPassword: boolean;
  onToggle: () => void;
  className?: string;
};

/**
 * Botão de alternância de visibilidade da senha.
 * Usa o mesmo padrão de estilo e componentização dos outros botões.
 */
export function TogglePasswordButton({
  showPassword,
  onToggle,
  className,
}: TogglePasswordButtonProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={cn(
        "absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 cursor-pointer transition-colors duration-200 hover:text-slate-700",
        className
      )}
      aria-label={showPassword ? "Esconder senha" : "Mostrar senha"}
    >
      {showPassword ? (
        <EyeOff className="w-5 h-5" />
      ) : (
        <Eye className="w-5 h-5" />
      )}
    </button>
  );
}
