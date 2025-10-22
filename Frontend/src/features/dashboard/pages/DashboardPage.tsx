import { Cards } from "../../../components/ui/Cards";
import { CiCalendar } from "react-icons/ci";
import { IoBookOutline } from "react-icons/io5";
import { FaArrowTrendUp } from "react-icons/fa6";
import { IoFlash } from "react-icons/io5";
import { Helmet } from "react-helmet-async";


export function DashboardPage() {

  
  return (
<>
      <Helmet>
        <title>MindTrack - Dashboard</title>
      </Helmet>
    <div className="min-h-screen flex flex-col bg-primary-gradient">
      <div className="ml-26">
      <h1 className="text-3xl font-bold font-sans mt-4 ">Bem-vindo ao seu Dashboard</h1>
      <span className=" text-md font-sans font-medium text-gray-400">Acompanhe sua evolução e reflexões ao longo do semestre</span>
      </div>

       <div className="flex flex-row justify-center items-center mt-10 gap-x-4">

      <Cards title="Entradas Criadas" classname={`bg-indigo-50`} > <IoBookOutline /> </Cards>
      
      <Cards title="Ultima Entrada" classname={`bg-indigo-50`} > <CiCalendar />  </Cards>

      <Cards title="Semana atual" classname={`bg-indigo-50`} > <FaArrowTrendUp /> </Cards>

      <Cards title="Sequência" classname={`bg-indigo-50`} > <IoFlash /> </Cards>

      </div>
    </div>

</>
  )
    
}