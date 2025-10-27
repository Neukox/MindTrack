import { AxiosError } from "axios";
import api from "../../lib/api/axios";

export interface EmocoesRegistradasResponse {
  success?: boolean;
  data: Array<{
    emotion: string;
    count: number;
  }>;
}

export const getEmocoesRegistradas =
  async (): Promise<EmocoesRegistradasResponse> => {
    try {
      const response = await api.get("/reflexao/emocoes-estatisticas");
      return response.data as EmocoesRegistradasResponse;
    } catch (error: unknown) {
      console.error("Erro ao buscar emoções registradas:", error);

      if (error instanceof AxiosError) {
        throw new Error(
          error?.response?.data.message || "Erro ao buscar emoções registradas",
        );
      }

      throw new Error("Erro ao buscar emoções registradas");
    }
  };
