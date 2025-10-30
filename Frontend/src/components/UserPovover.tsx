import type { Profile } from "@/lib/types/user.type";
import { cn } from "@/utils/cn";
import { useState, useRef, useEffect } from "react";
import { HiUser } from "react-icons/hi";
import { RxExit } from "react-icons/rx";
import { useNavigate } from "react-router-dom";

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

  return (
    <div className={cn("relative", className)}>
      <button ref={buttonRef} onClick={() => setIsOpen(!isOpen)}>
        <div className="w-8 h-8 bg-indigo-200 rounded-full shadow-md flex items-center justify-center hover:bg-indigo-300 transition-colors cursor-pointer">
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
          className="bg-white rounded-xl absolute top-12 right-0 p-4 flex items-center gap-2 shadow-lg z-50"
        >
          <div
            className="flex flex-col"
            role="group"
            aria-label="User profile"
          >
            <span className="text-sm font-semibold text-right">
              {user?.username || "Carregando..."}
            </span>
            <span className="text-sm font-sans font-medium text-gray-500">
              {user?.email || ""}
            </span>
          </div>
          <button
            className="p-2 rounded-full hover:shadow-md hover:bg-red-500 cursor-pointer text-red-500 hover:text-white transition-colors"
            aria-label="Logout"
            title="Sair"
            onClick={() => {
              localStorage.clear();
              navigate("/login");
            }}
          >
            <RxExit className="size-5" />
          </button>
        </div>
      )}
    </div>
  );
}
