import { cn } from "@/utils/cn";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Button from "./ui/Button";
import { ChevronDown, PlusIcon } from "lucide-react";

export type NavPopoverProps = {
  className?: string;
};

export type ActiveName = "Dashboard" | "Registros" | "Relatório" | "Perfil";

export default function NavPopover({ className }: NavPopoverProps) {
  const [activeName, setActiveName] = useState<ActiveName>("Dashboard");
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const location = useLocation();

  useEffect(() => {
    if (
      location.pathname.includes("registro") ||
      location.pathname.includes("ver-mais")
    ) {
      setActiveName("Registros");
    } else if (location.pathname.includes("exportar-relatorio")) {
      setActiveName("Relatório");
    } else if (location.pathname.includes("perfil")) {
      setActiveName("Perfil");
    } else {
      setActiveName("Dashboard");
    }
  }, [location.pathname]);

  useEffect(() => {
    if (!isOpen) return;

    function handleOutsideClick(e: Event) {
      const target = e.target as Node | null;
      if (
        menuRef.current &&
        !menuRef.current.contains(target) &&
        buttonRef.current &&
        !buttonRef.current.contains(target)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("touchstart", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
    };
  }, [isOpen]);

  return (
    <div className={cn("relative", className)}>
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 hover:bg-blue-700/10  rounded-xl flex gap-2 items-center text-primary hover:text-white dark:text-white dark:hover:text-white font-medium"
      >
        <ChevronDown
          className={cn(
            "size-5 inline-block",
            isOpen && "rotate-180 transform transition-transform",
            !isOpen && "transition-transform",
          )}
        />
        {activeName}
      </button>
      {isOpen && (
        <div
          ref={menuRef}
          className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-gray-800 border rounded-md shadow-lg z-50"
        >
          <ul role="menubar" className="flex flex-col gap-4 p-4">
            <li role="none">
              <Link
                to="/dashboard"
                className="text-primary text-shadow-2xs whitespace-nowrap font-medium transition disabled:text-gray-400 disabled:cursor-not-allowed dark:text-white"
              >
                Dashboard
              </Link>
            </li>
            <li role="none">
              <Link
                to="/registros"
                className="text-primary text-shadow-2xs whitespace-nowrap font-medium transition disabled:text-gray-400 disabled:cursor-not-allowed dark:text-white"
              >
                Registros
              </Link>
            </li>
            <li role="none">
              <Link
                to="/exportar-relatorio"
                className="text-primary text-shadow-2xs whitespace-nowrap font-medium transition disabled:text-gray-400 disabled:cursor-not-allowed dark:text-white"
              >
                Relatório
              </Link>
            </li>
            <li role="none" className="md:hidden block">
              <Button variant="primary" className="flex items-center gap-2 p-2">
                <PlusIcon className="size-5" />
                Novo Registro
              </Button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
