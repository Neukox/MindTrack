import React, { useState, useEffect } from "react";
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { getCategoriaMaisUsada } from "../../auth/api/axiosCategoriaMaisUsada";

type DataItem = {
  name: string;
  uv: number;
};

interface CustomLabelProps {
  cx: number | string;
  cy: number | string;
  midAngle: number | string;
  innerRadius: number | string;
  outerRadius: number | string;
  percent: number;
  index: number;
}

/** Verifica se o objeto tem os campos esperados */
function isCustomLabelProps(p: unknown): p is CustomLabelProps {
  if (!p || typeof p !== "object") return false;
  const o = p as Record<string, unknown>;
  return (
    "cx" in o &&
    "cy" in o &&
    "midAngle" in o &&
    "innerRadius" in o &&
    "outerRadius" in o &&
    "percent" in o &&
    "index" in o
  );
}

export default function ChartPizza() {
  const [data, setData] = useState<DataItem[]>([
    { name: "Carregando...", uv: 1 },
  ]);

  useEffect(() => {
    const carregarDados = async () => {
      try {
        const response = await getCategoriaMaisUsada();

        // A API agora retorna um objeto com categorias
        const dadosFormatados = Object.entries(response).map(
          ([categoria, dados]) => ({
            name: categoria,
            uv: dados.total,
          })
        );

        if (dadosFormatados.length > 0) {
          setData(dadosFormatados);
        } else {
          setData([{ name: "Sem dados", uv: 1 }]);
        }
      } catch (error) {
        console.error("Erro ao carregar categorias:", error);
        // Dados de fallback em caso de erro
        setData([{ name: "Erro ao carregar", uv: 1 }]);
      }
    };

    carregarDados();
  }, []);

  const total = data.reduce((sum, entry) => sum + entry.uv, 0);
  
  const colors = ["#8B5CF6", "#06D6A0", "#FFD23F", "#EF476F", "#118AB2", "#073B4C"];
  
  const getColorForCategory = (categoryName: string, index: number) => {
    const colorMap: { [key: string]: string } = {
      'ESTUDO': '#8B5CF6',     // Roxo
      'ESTAGIO': '#06D6A0',    // Verde água  
      'PESSOAL': '#FFD23F',    // Amarelo
      'PESQUISA': '#EF476F',   // Rosa/Vermelho
    };
    return colorMap[categoryName.toUpperCase()] || colors[index % colors.length];
  };  const renderCustomizedLabel = (props: unknown): React.ReactNode => {
    if (!isCustomLabelProps(props)) return null;

    const cx = Number(props.cx);
    const cy = Number(props.cy);
    const midAngle = Number(props.midAngle);
    const innerRadius = Number(props.innerRadius);
    const outerRadius = Number(props.outerRadius);
    const percent = Number(props.percent);
    const index = props.index;

    if (!Number.isFinite(cx) || !Number.isFinite(cy)) return null;

    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 1.2;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    const item = data[index];
    if (!item) return null;

    return (
      <text
        x={x}
        y={y}
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        fontSize={14}
        fontWeight="bold"
        style={{ filter: "drop-shadow(1px 1px 2px rgba(0,0,0,0.3))" }}
      >
        <tspan fill="#1f2937">
          {`${item.name}`}
        </tspan>
        <tspan x={x} dy="16" fill="#6b7280" fontSize="12" fontWeight="600">
          {`${(percent * 100).toFixed(1)}%`}
        </tspan>
      </text>
    );
  };

  return (
    <div
      style={{
        width: "100%",
        height: 340,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      className="group transition-all duration-300 hover:scale-[1.02]"
    >
      <ResponsiveContainer width="95%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="uv"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius="75%"
            labelLine={{ 
              stroke: "#6b7280", 
              strokeDasharray: "2 2",
              strokeWidth: 2
            }}
            label={renderCustomizedLabel}
            stroke="#ffffff"
            strokeWidth={3}
            style={{
              filter: "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.15))",
              cursor: "pointer"
            }}
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={getColorForCategory(entry.name, index)} 
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{ 
              backgroundColor: "#ffffff", 
              borderRadius: 12,
              border: "2px solid #8B5CF6",
              boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
              fontSize: "14px",
              fontWeight: "600"
            }}
            labelStyle={{ 
              color: "#1f2937", 
              fontWeight: "700",
              marginBottom: "4px"
            }}
            formatter={(value: number, name: string) => [
              `${value} registros (${((value / total) * 100).toFixed(1)}%)`,
              name
            ]}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
