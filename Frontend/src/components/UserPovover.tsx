import type { Profile } from "@/lib/types/user.type";
import logoutUser from "@/services/auth/logout.service";
import { cn } from "@/utils/cn";
import { UserIcon } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { HiUser } from "react-icons/hi";
import { RxExit } from "react-icons/rx";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";

export type UserPopoverProps = {
  user: Profile | null;
  className?: string;
};

export default function UserPopover({ className, user }: UserPopoverProps) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function handleOutsideClick(e: Event) {
      const target = e.target as Node | null;
      if (!isOpen) return;
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
  // Função para gerar iniciais do nome de usuário
  const getInitials = (username: string): string => {
    return username
      .split(" ")
      .map((name) => name.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const logout = async () => {
    try {
      await logoutUser();
      localStorage.removeItem("user-storage");
      navigate("/login");
    } catch {
      toast.error("Erro ao fazer logout. Tente novamente.");
    }
  };

  return (
    <div className={cn("relative", className)}>
      <button ref={buttonRef} onClick={() => setIsOpen(!isOpen)}>
        <div className="w-8 h-8 bg-indigo-200 dark:bg-indigo-600 rounded-full shadow-md flex items-center justify-center hover:bg-indigo-300 transition-colors cursor-pointer">
          {user ? (
            <span className="text-white text-sm font-semibold">
              {getInitials(user.username)}
            </span>
          ) : (
            <HiUser className="w-5 h-5 text-white" />
          )}
        </div>
      </button>
      {isOpen && (
        <div
          ref={menuRef}
          className="bg-white dark:bg-gray-800 rounded-xl absolute top-12 right-0 p-4 flex flex-col items-center gap-4 shadow-lg z-50"
        >
          <div className="flex flex-col" role="group" aria-label="User profile">
            <span className="text-sm font-semibold text-right">
              {user?.username || "Carregando..."}
            </span>
            <span className="text-sm font-sans font-medium text-gray-700 dark:text-gray-200">
              {user?.email || ""}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Link
              to="/perfil"
              className="px-3 py-2 rounded-full hover:shadow-md bg-blue-600 hover:bg-blue-700 cursor-pointer text-white transition-colors flex items-center gap-2 flex-1"
              aria-label="Perfil"
              title="Ir para o perfil"
            >
              <UserIcon className="size-5" />
              Perfil
            </Link>
            <button
              className="px-3 py-2 rounded-full hover:shadow-md bg-red-500 hover:bg-red-600 cursor-pointer text-white transition-colors flex items-center gap-2 flex-1"
              aria-label="Logout"
              title="Sair"
              onClick={() => {
                logout();
              }}
            >
              <RxExit className="size-5" />
              Sair
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
