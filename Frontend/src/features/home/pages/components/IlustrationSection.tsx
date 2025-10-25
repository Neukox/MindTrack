export function IllustrationSection() { 
    return (
        <>
         {/* Seção de Ilustração (Direita) */}
        <div className="w-full max-w-md lg:max-w-lg flex justify-center">
        <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-sm transform transition duration-500 hover:scale-[1.02] border border-gray-100">
            <div className="space-y-4">
            <div className="h-4 bg-blue-200 rounded-full w-3/4"></div>
            <div className="h-3 bg-purple-200 rounded-full w-2/3"></div>
            <div className="h-3 bg-green-200 rounded-full w-full"></div>
            <div className="h-3 bg-green-200 rounded-full w-5/6"></div>
            <div className="h-3 bg-green-200 rounded-full w-full"></div>
            </div>
        </div>
        </div>
        </>
    )
 }