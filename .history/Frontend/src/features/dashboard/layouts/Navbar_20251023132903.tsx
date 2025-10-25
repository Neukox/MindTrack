import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaAlignRight } from "react-icons/fa";
import { RxExit } from "react-icons/rx";
import MindLog from "@/assets/MindTrack.png";
import Button from "../../../components/ui/Button";
import { Helmet } from "react-helmet-async";

interface NavBarProps {
  title?: string;
}

export default function NavBar({ title }: NavBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      {title && (
        <Helmet>
          <title>{title}</title>
        </Helmet>
      )}

      <nav className="bg-primary-gradient border-b border-gray-200 shadow-2xl">
        <div className="max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="flex items-center md:mx-10 h-16 w-full">
            {/* Logo Section */}
            <div
              className="flex items-center space-x-3 bg-indigo-100 h-13 w-14 pl-2 pr-2 rounded-2xl text-black font-sans font-bold text-xl
                relative left-0 md:-left-8 lg:-left-4"
            >
              <img
                className="h-10 rounded-2xl shadow-md"
                src={MindLog}
                alt="MindTrack Logo"
              />
              <div className="flex flex-col">
                <h1>MindTrack</h1>
                <p className="text-sm text-gray-500 flex whitespace-nowrap">
                  Diário de Bordo Acadêmico
                </p>
              </div>
            </div>

            {/* Nav Links (desktop) */}
            <nav
              aria-label="Primary navigation"
              className="hidden sm:flex flex-1 items-center space-x-6 mx-60"
            >
              <ul role="menubar" className="flex translate-x-40 space-x-5">
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

              <div
                className="flex ml-80 whitespace-nowrap"
                aria-label="Actions"
              >
                <Button
                  className="p-2 flex items-center gap-2"
                  onClick={() => navigate("/novo-registro")}
                >
                  <FaPlus />
                  Novo Registro
                </Button>
              </div>

              {/* User Profile Info */}
              <div
                className="border-r-2 border-gray-200 h-8"
                aria-hidden="true"
              />
              <div
                className="flex flex-col"
                role="group"
                aria-label="User profile"
              >
                <span className="text-sm font-semibold text-right">
                  DaviLeal444
                </span>
                <span className="text-sm font-sans font-medium text-gray-500">
                  davi.leal@example.com
                </span>
              </div>

              {/* Logout Button */}
              <div>
                <button className="flex items-center" aria-label="Logout">
                  <RxExit className="font-extrabold" size={21} />
                </button>
              </div>
            </nav>

            {/* Hamburger Mobile */}
            <div className="sm:hidden ml-auto">
              <button onClick={() => setIsOpen(!isOpen)}>
                <FaAlignRight size={24} />
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="bg-[#EAE8E7] flex flex-col right-0 top-full shadow-lg p-3 pl-4 rounded-md space-y-3 sm:hidden text-right justify-between mt-2">
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

              <div className="flex flex-col">
                <span className="text-sm font-semibold text-right">
                  DaviLeal444
                </span>
                <span className="text-sm font-sans font-medium text-gray-500">
                  davi.leal@example.com
                </span>
              </div>

              <div className="flex flex-row justify-end gap-3">
                <span className="text-sm text-gray-500 font-semibold">
                  Sair
                </span>
                <button className="flex items-center">
                  <RxExit className="font-extrabold" size={21} />
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
