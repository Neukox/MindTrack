import api from "../../../lib/api/api";

// Tipos para criação de registro (userId será extraído do token no backend)
export interface CriarRegistroData {
  title: string;
  category: "ESTUDO" | "ESTAGIO" | "PESSOAL" | "PESQUISA";
  emotion:
    | "ALEGRIA"
    | "CALMA"
    | "ANSIEDADE"
    | "REFLEXAO"
    | "MOTIVACAO"
    | "TRISTEZA";
  content: string;
}

export interface CriarRegistroResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    title: string;
    category: string;
    emotion: string;
    content: string;
    createdAt: string;
    updatedAt: string;
  };
}

// Função para criar um novo registro
export const criarRegistro = async (
  registroData: CriarRegistroData
): Promise<CriarRegistroResponse> => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("Token de autenticação não encontrado");
    }

    const response = await api.post("/reflexao", registroData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return {
      success: true,
      message: "Registro criado com sucesso!",
      data: response.data,
    };
  } catch (error: unknown) {
    console.error("Erro ao criar registro:", error);

    if (error instanceof Error && "response" in error) {
      const axiosError = error as {
        response?: { status?: number; data?: { message?: string } };
      };

      if (axiosError.response?.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }

      throw new Error(
        axiosError.response?.data?.message || "Erro ao criar registro"
      );
    }

    throw new Error("Erro ao criar registro");
  }
};
