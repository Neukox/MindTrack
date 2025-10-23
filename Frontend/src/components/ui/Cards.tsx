import React from "react";

export type CardsProps = {
  title: string;
  description?: string;
  children?: React.ReactNode; // ícone
  chart?: React.ReactNode; // gráfico
  // support both `classname` (existing) and the React convention `className`
  classname?: string;
  className?: string;
  variant?: "minCard" | "mediumCard";
};

const variants = {
  minCard: "bg-white h-50 w-full sm:w-[21rem] rounded-2xl mt-5 p-5 pt-6 shadow-xl",
  mediumCard:
    "flex flex-col bg-white h-[35rem] w-full lg:w-6/12 rounded-2xl mt-5 gap-5 p-5 pt-6 shadow-xl",
};

export function Cards({
  title,
  description,
  children,
  classname,
  className,
  chart,
  variant = "minCard",
}: CardsProps) {
  const extraClass = className ?? classname ?? "";
  const IconClass =
    variant === "mediumCard"
      ? "text-gray-700 w-12 h-12 flex items-center justify-center rounded-2xl text-2xl"
      : "text-blue-600 font-extrabold bg-indigo-50 w-12 h-12 flex items-center justify-center rounded-2xl text-2xl";

  return (
    <div className={`${variants[variant]} ${extraClass}`}>
      {/* Linha do título + ícone */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-800">{title}</h2>
        <span className={IconClass}>{children}</span>
      </div>

      {/* Descrição opcional */}
      {description && (
        <p className="text-md font-semibold text-gray-600">{description}</p>
      )}

      {/* Gráfico opcional */}
      {chart && <div className="flex justify-center items-center">{chart}</div>}
    </div>
  );
}

export default Cards;
