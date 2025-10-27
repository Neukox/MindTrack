import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { getEmocoesRegistradas } from "@/services/metrics/emocoes-registradas.service";

type EmocaoData = {
  nome: string;
  valor: number;
};

export default function GraficoEmocoes() {
  const [data, setData] = useState<EmocaoData[]>([
    { nome: "Carregando...", valor: 1 },
  ]);

  useEffect(() => {
    const carregarDados = async () => {
      try {
        const response = await getEmocoesRegistradas();

        // A API agora retorna um objeto com emoções
        const dadosFormatados = Object.entries(response).map(
          ([emocao, dados]) => ({
            nome: emocao,
            valor: dados.total,
          })
        );

        if (dadosFormatados.length > 0) {
          setData(dadosFormatados);
        } else {
          setData([{ nome: "Sem dados", valor: 1 }]);
        }
      } catch (error) {
        console.error("Erro ao carregar emoções:", error);
        setData([{ nome: "Erro ao carregar", valor: 1 }]);
      }
    };

    carregarDados();
  }, []);

  return (
    <div
      style={{ width: "100%", height: 400 }}
      className="group transition-all duration-300 hover:scale-[1.01]"
    >
      <ResponsiveContainer>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 15, right: 30, left: 80, bottom: 15 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#e5e7eb"
            horizontal={true}
            vertical={false}
          />
          <XAxis
            type="number"
            tick={{ fontSize: 12, fontWeight: 500, fill: "#6b7280" }}
            className="dark:[&_text]:fill-gray-300"
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            type="category"
            dataKey="nome"
            tick={{ fontSize: 14, fontWeight: 600, fill: "#374151" }}
            className="dark:[&_text]:fill-white"
            axisLine={false}
            tickLine={false}
            width={70}
          />
          <Tooltip
            cursor={{
              fill: "rgba(34, 197, 94, 0.1)",
              stroke: "#22C55E",
              strokeWidth: 2,
            }}
            contentStyle={{
              backgroundColor: "#ffffff",
              borderRadius: 12,
              border: "2px solid #22C55E",
              boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
              fontSize: "14px",
              fontWeight: "600",
            }}
            wrapperClassName="dark:[&_.recharts-tooltip-wrapper]:bg-gray-800 dark:[&_.recharts-tooltip-item]:text-white dark:[&_.recharts-tooltip-label]:text-white"
            labelStyle={{
              color: "#1f2937",
              fontWeight: "700",
              marginBottom: "4px",
            }}
            formatter={(value: number, name: string) => [
              `${value} registros`,
              name === "valor" ? "Quantidade" : name,
            ]}
          />
          <Bar
            dataKey="valor"
            fill="#22C55E"
            radius={[0, 8, 8, 0]}
            stroke="#16A34A"
            strokeWidth={2}
            style={{
              filter: "drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))",
              cursor: "pointer",
            }}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
