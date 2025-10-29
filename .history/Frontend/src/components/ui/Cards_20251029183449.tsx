import React from "react";

export type CardsProps = {
  title: string;
  description?: string;
  children?: React.ReactNode; // ícone
  chart?: React.ReactNode; // gráfico
  // support both `classname` (existing) and the React convention `className`
  classname?: string;
  className?: string;
  // main value to display (used in minCard)
  value?: React.ReactNode;
  // small meta/subtext under the value
  meta?: React.ReactNode;
  variant?: "minCard" | "mediumCard" | "longCard";
};

const variants = {
  // let the grid control width; use min-height so cards can grow without overlapping
  minCard: "bg-white dark:bg-gray-800 rounded-2xl p-5 pt-4 shadow-xl w-full min-h-[7rem] transition-colors",
  mediumCard:
    "flex flex-col bg-white dark:bg-gray-800 rounded-2xl mt-5 gap-5 p-5 pt-4 shadow-xl w-full min-h-[28rem] transition-colors",
  longCard:
    "flex flex-col bg-white dark:bg-gray-800 rounded-2xl mt-5 gap-5 p-5 pt-4 shadow-xl w-full min-h-[28rem] transition-colors",
};

export function Cards({
  title,
  description,
  children,
  classname,
  className,
  value,
  meta,
  chart,
  variant = "minCard",
}: CardsProps) {
  const extraClass = className ?? classname ?? "";
  const IconClass =
    variant === "mediumCard" || variant === "longCard"
      ? "text-gray-700 dark:text-gray-300 w-12 h-12 flex items-center justify-center rounded-2xl text-2xl"
      : "text-blue-600 dark:text-blue-400 font-extrabold bg-indigo-50 dark:bg-indigo-900/50 w-12 h-12 flex items-center justify-center rounded-2xl text-2xl";

  return (
    <div className={`${variants[variant]} ${extraClass}`}>
      {/* Linha do título + ícone */}
      <div className="flex justify-between items-center">
        <div className="flex flex-col px-5 gap-2">
          <h2 className="text-xl font-extrabold text-gray-900 dark:text-white leading-tight tracking-tight">{title}</h2>
          {description && (
            <p className="text-md font-semibold text-gray-600 dark:text-gray-300 leading-snug">{description}</p>
          )}
        </div>

        <span className={IconClass}>{children}</span>
      </div>

      {/* Value (for small cards) - shown below the title row */}
      {variant === "minCard" && value && (
        <div className="px-5 mt-6">
          <div className="text-4xl font-extrabold text-gray-900 dark:text-white">{value}</div>
          {meta && <div className="text-xs text-green-500 dark:text-green-400 mt-1">{meta}</div>}
        </div>
      )}

      {/* Gráfico opcional */}
      {chart && <div className="flex justify-center items-center h-full">{chart}</div>}
    </div>
  );
}

export default Cards;
