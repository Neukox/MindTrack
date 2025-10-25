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
import { getEmocoesRegistradas } from "../../auth/api/axiosEmocoesRegistradas";

type EmocaoData = {
  nome: string;
  valor: number;
};

export default function GraficoEmocoes() {
  const [data, setData] = useState<EmocaoData[]>([
    { nome: "Carregando...", valor: 1 }
  ]);

  useEffect(() => {
    const carregarDados = async () => {
      try {
        const response = await getEmocoesRegistradas();
        
        if (response.success && response.data.length > 0) {
          const dadosFormatados = response.data.map(emocao => ({
            nome: emocao.emocao,
            valor: emocao.quantidade
          }));
          setData(dadosFormatados);
        } else {
          setData([
            { nome: "Sem dados", valor: 1 }
          ]);
        }
      } catch (error) {
        console.error("Erro ao carregar emoções:", error);
        setData([
          { nome: "Erro ao carregar", valor: 1 }
        ]);
      }
    };

    carregarDados();
  }, []);
  return (
    <div style={{ width: "100%", height: 350 }}>
      <ResponsiveContainer>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 10, right: 20, left: 60, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis type="category" dataKey="nome" />
          <Tooltip />
          <Bar dataKey="valor" fill="#9ad5b3" radius={[5, 5, 5, 5]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
