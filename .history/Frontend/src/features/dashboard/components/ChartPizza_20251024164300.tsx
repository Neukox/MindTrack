import React, { useState, useEffect } from "react";
import { PieChart, Pie, Tooltip, ResponsiveContainer } from "recharts";
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

        if (response.success && response.data.length > 0) {
          const dadosFormatados = response.data.map((categoria) => ({
            name: categoria.categoria,
            uv: categoria.quantidade,
          }));
          setData(dadosFormatados);
        } else {
          // Dados de fallback se não houver dados
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
  const fillColor = "#a78bfa";

  // ✅ O tipo correto para evitar erro de JSX.Element
  const renderCustomizedLabel = (props: unknown): React.ReactNode => {
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
    const radius = innerRadius + (outerRadius - innerRadius) * 1.1;
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
        fontSize={12}
      >
        <tspan fill={fillColor} fontWeight="bold">
          {`${item.name} (${(percent * 100).toFixed(0)}%)`}
        </tspan>
      </text>
    );
  };

  return (
    <div
      style={{
        width: "100%",
        height: 300,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ResponsiveContainer width="90%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="uv"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius="80%"
            fill={fillColor}
            labelLine={{ stroke: fillColor, strokeDasharray: "3 3" }}
            // ✅ Aqui o tipo aceita ReactNode sem erro
            label={renderCustomizedLabel}
          />
          <Tooltip
            formatter={(value: number) =>
              `${((value / total) * 100).toFixed(0)}%`
            }
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
