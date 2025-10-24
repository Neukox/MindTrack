import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const data = [
  { nome: "Alegria", valor: 55 },
  { nome: "Calma", valor: 30 },
  { nome: "Ansiedade", valor: 18 },
  { nome: "Reflexão", valor: 40 },
];

export default function GraficoEmocoes() {
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
