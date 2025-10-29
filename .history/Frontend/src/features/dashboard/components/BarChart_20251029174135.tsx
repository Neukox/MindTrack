import { useState, useEffect } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { getFrequenciaRegistros } from "../../auth/api/axiosFrequenciadeRegistros";

type FrequenciaData = {
  name: string;
  valor: number;
};

export default function CustomBarChart() {
  const [barSize, setBarSize] = useState(70);
  const [data, setData] = useState<FrequenciaData[]>([
    { name: "Carregando...", valor: 1 },
  ]);

  useEffect(() => {
    const carregarDados = async () => {
      try {
        const response = await getFrequenciaRegistros();

        // A API agora retorna diretamente os dados
        const dadosFormatados = [
          { name: "Semana Atual", valor: response.registrosEssaSemana },
          { name: "Semana Anterior", valor: response.registrosSemanaAnterior },
        ];
        setData(dadosFormatados);
      } catch (error) {
        console.error("Erro ao carregar frequência:", error);
        setData([{ name: "Erro ao carregar", valor: 1 }]);
      }
    };

    carregarDados();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) setBarSize(25); // mobile
      else if (width < 1024) setBarSize(40); // tablet
      else setBarSize(70); // desktop
    };

    handleResize(); // executa no mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: 400,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 10, right: 15, left: -15, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 12 }}
            tickMargin={8}
            axisLine={false}
          />
          <YAxis
            domain={[0, 60]}
            tick={{ fontSize: 12 }}
            tickCount={6}
            axisLine={false}
          />
          <Tooltip
            cursor={{ fill: "rgba(92, 108, 250, 0.1)" }}
            contentStyle={{ backgroundColor: "#fff", borderRadius: 8 }}
          />
          <Bar
            dataKey="valor"
            fill="#5C6CFA"
            barSize={barSize}
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
