import { useState } from "react";
import { FaPlus, FaAlignRight } from "react-icons/fa";
import { RxExit } from "react-icons/rx";
import MindLog from '@/assets/MindTrack.png';
import Button from '../../../components/ui/Button';
import { Helmet } from "react-helmet-async";
export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (

    <>

          <Helmet>
            <title>MindTrack - Dashboard</title>
          </Helmet>

    <nav className="bg-primary-gradient border-b border-gray-200 shadow-2xl">
      <div className="max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="flex items-center md:mx-10 mx-2 h-16">

          {/* Logo Section */}
          <div className="flex items-center ml-8 space-x-3 bg-indigo-100 h-14 w-14 pl-2 pr-2 rounded-2xl text-black font-sans font-bold text-xl">
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

          {/* Nav Links */}
          <div className="hidden sm:flex flex-1 items-center space-x-6 mx-60">

            <div className="flex translate-x-40 space-x-5">
              <span className="text-primary text-shadow-2xs whitespace-nowrap">Dashboard</span>
              <span className="text-primary text-shadow-2xs whitespace-nowrap">Registros</span>
              <span className="text-primary text-shadow-2xs whitespace-nowrap">Exportar</span>
            </div>

            <div className="flex ml-80 whitespace-nowrap">
              <Button className="p-2 flex items-center gap-2">
                <FaPlus />
                Novo Registro
              </Button>
            </div>

            {/* User Profile Info */}
            <div className="border-r-2 border-gray-200 h-8"></div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-right">DaviLeal444</span>
              <span className="text-sm font-sans font-medium text-gray-500">
                davi.leal@example.com
              </span>
            </div>

            {/* Logout Button */}
            <div>
              <button className="flex items-center">
                <RxExit className="font-extrabold" size={21} />
              </button>
            </div>
          </div>

          {/* Hamburger Mobile */}
          <div className="sm:hidden fixed right-4 top-4 z-50">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <FaAlignRight size={24} /> : <FaAlignRight size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="absolute bg-[#EAE8E7] flex flex-col right-4 top-16 shadow-lg p-3 pl-4 rounded-md space-y-3 sm:hidden text-right justify-betwen">
              
              <span className="text-primary text-shadow-2xs">Dashboard</span>
              <span className="text-primary text-shadow-2xs">Registros</span>
              <span className="text-primary text-shadow-2xs">Exportar</span>

              <Button className="p-2 flex items-center gap-2 mt-2">
                <FaPlus />
                Novo Registro
              </Button>

              <div className="flex flex-col">
                <span className="text-sm font-semibold text-right">DaviLeal444</span>
                <span className="text-sm font-sans font-medium text-gray-500">
                  davi.leal@example.com
                </span>
              </div>

              <div className="flex flex-row justify-end gap-3">
                <span className="text-sm text-gray-500 font-semibold">Sair</span>
                <button className="flex items-center">
                  <RxExit className="font-extrabold" size={21} />
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </nav>
    </>
  );
}
