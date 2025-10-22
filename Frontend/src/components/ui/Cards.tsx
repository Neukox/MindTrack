export type CardsProps = {
  title: string;
  description?: string;
  children?: React.ReactNode; // ícone
  classname?: string;
};

export function Cards({
  title,
  description,
  children,
  classname,
}: CardsProps) {
  return (
    <div
      className={`bg-white h-50 w-80 rounded-2xl mt-5 p-5 pt-6 shadow-xl ${classname}`}
    >
      {/* Linha do título + ícone */}
      <div className="flex items-center gap-2 mb-2 justify-between">
        <h2 className="text-lg font-bold text-gray-800">{title}</h2>
        <span className="text-blue-600 font-extrabold bg-indigo-50 w-12 h-12 flex items-center justify-center rounded-2xl text-2xl">{children}</span>

      </div>

      {/* Descrição opcional */}
      {description && (
        <p className="text-sm text-gray-600 mt-1">{description}</p>
      )}
    </div>
  );
}

export default Cards;
