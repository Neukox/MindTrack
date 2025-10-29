import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaAlignRight } from "react-icons/fa";
import { RxExit } from "react-icons/rx";
import { HiMoon, HiSun, HiUser } from "react-icons/hi";
import MindLog from "@/assets/MindTrack.png";
import Button from "../../../components/ui/Button";
import { getUserProfile, type UserProfile } from "../../auth/api/axiosPerfil";
import { useTheme } from "../../../contexts/ThemeContext";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        const profile = await getUserProfile();
        setUserProfile(profile);
      } catch (error) {
        console.error("Erro ao carregar perfil na navbar:", error);
      }
    };
    loadUserProfile();
  }, []);

  const getInitials = (username: string): string => {
    return username
      .split(" ")
      .map((name) => name.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

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

  return (
    <>
      <nav className="bg-primary-gradient border-b border-gray-200 shadow-2xl">
        <div className="w-full px-9">
          <div className="flex items-center h-16 w-full">
            {/* Logo Section */}
            <div className="flex items-center lg:mx-10 flex[1.2]">
              <div
                className="flex items-center space-x-3 bg-indigo-100 h-13 w-14 pl-2 pr-2 rounded-2xl text-black font-sans font-bold text-xl
                relative -left-7 cursor-pointer"
              >
                <img
                  className="h-10 rounded-2xl shadow-md"
                  src={MindLog}
                  alt="MindTrack Logo"
                  onClick={() => navigate("/dashboard")}
                />
                <div className="flex flex-col">
                  <h1>MindTrack</h1>
                  <p className="text-sm text-gray-500 flex whitespace-nowrap">
                    Diário de Bordo Acadêmico
                  </p>
                </div>
              </div>
            </div>

            {/* Nav Links (desktop) */}
            <nav
              aria-label="Primary navigation"
              className="hidden xl:flex flex-2 items-center space-x-4 mx-30 justify-between"
            >
              <div className="flex justify-center">
                <ul role="menubar" className="flex translate-x-36 space-x-5">
                  <li role="none">
                    <Button
                      variant="tertiary"
                      onClick={() => navigate("/dashboard")}
                    >
                      Dashboard
                    </Button>
                  </li>
                  <li role="none">
                    <Button
                      variant="tertiary"
                      onClick={() => navigate("/registros")}
                    >
                      Registros
                    </Button>
                  </li>
                  <li role="none">
                    <Button
                      variant="tertiary"
                      onClick={() => navigate("/exportar-relatorio")}
                    >
                      Exportar
                    </Button>
                  </li>
                </ul>
              </div>

              <div className="flex items-center gap-2 mr-5">
                <div className="flex whitespace-nowrap" aria-label="Actions">
                  <Button
                    className="flex items-center p-2 gap-2"
                    onClick={() => navigate("/novo-registro")}
                  >
                    <FaPlus />
                    Novo Registro
                  </Button>
                </div>

                {/* Dark Mode Button */}
                <button
                  onClick={toggleTheme}
                  className="p-1 rounded-full hover:bg-indigo-100 dark:hover:bg-gray-700 hover:shadow-md cursor-pointer transition-colors"
                  aria-label={theme === 'dark' ? "Ativar modo claro" : "Ativar modo escuro"}
                  title={theme === 'dark' ? "Ativar modo claro" : "Ativar modo escuro"}
                >
                  {theme === 'dark' ? (
                    <HiSun className="w-5 h-5 text-yellow-500" />
                  ) : (
                    <HiMoon className="w-5 h-5 text-gray-600" />
                  )}
                </button>

                {/* Separator Bar */}
                <div className="w-px h-8 bg-gray-300 shadow-md mx-2"></div>

                {/* User Profile Info */}
                <div
                  className="flex flex-col"
                  role="group"
                  aria-label="User profile"
                >
                  <span className="text-sm font-semibold text-right">
                    {userProfile?.username || "Carregando..."}
                  </span>
                  <span className="text-sm font-sans font-medium text-gray-500">
                    {userProfile?.email || ""}
                  </span>
                </div>

                {/* User Avatar */}
                <div className="w-8 h-8 bg-indigo-200 rounded-full shadow-md flex items-center justify-center hover:bg-indigo-300 transition-colors cursor-pointer">
                  <button
                    className="cursor-pointer"
                    aria-label="Meu Perfil"
                    title="Meu Perfil"
                    onClick={() => navigate("/perfil")}
                  >
                    {userProfile ? (
                      <span className="text-white text-sm font-semibold">
                        {getInitials(userProfile.username)}
                      </span>
                    ) : (
                      <HiUser className="w-5 h-5 text-white" />
                    )}
                  </button>
                </div>

                {/* Logout Button */}
                <button
                  className="p-2 rounded-full hover:shadow-md hover:bg-red-500 cursor-pointer hover:text-white transition-colors"
                  aria-label="Logout"
                  title="Sair"
                  onClick={() => {
                    localStorage.clear();
                    navigate("/login");
                  }}
                >
                  <RxExit className="w-5 h-5 text-gray-600 hover:text-white" />
                </button>
              </div>
            </nav>

            {/* Hamburger Mobile: visible below 1280px, hidden at >=1280px */}
            <div className="xl:hidden relative -right-3 flex-1 flex justify-end">
              <button
                ref={buttonRef}
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Abrir menu"
              >
                <FaAlignRight size={24} />
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div
              ref={menuRef}
              className="bg-[#EAE8E7] flex flex-col top-full shadow-lg p-4 rounded-md space-y-3 xl:hidden mt-2"
            >
              {/* Links principais */}
              <Button variant="tertiary" onClick={() => navigate("/dashboard")}>
                Dashboard
              </Button>
              <Button variant="tertiary" onClick={() => navigate("/registros")}>
                Registros
              </Button>
              <Button
                variant="tertiary"
                onClick={() => navigate("/exportar-relatorio")}
              >
                Exportar
              </Button>

              <Button
                className="p-2 flex items-center gap-2 mt-2"
                onClick={() => navigate("/novo-registro")}
              >
                <FaPlus />
                Novo Registro
              </Button>

              {/* Perfil */}
              <div className="flex items-center justify-between rounded-xl px-3 py-2 mt-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-indigo-200 rounded-full flex items-center justify-center">
                    <HiUser
                      className="w-5 h-5 text-white cursor-pointer"
                      onClick={() => navigate("/Perfil")}
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-gray-800">
                       {userProfile?.username || "Carregando..."}
                    </span>
                    <span className="text-xs text-gray-500">
                      {userProfile?.email || "Carregando..."}
                    </span>
                  </div>
                </div>

                <button
                  className="flex items-center text-red-600 hover:text-red-700 transition-colors"
                  onClick={() => navigate("/login")}
                >
                  <RxExit className="w-5 h-5" />
                  <span className="ml-1 text-sm font-semibold">Sair</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
