import { AxiosError, type AxiosResponse } from "axios";
import api from "../../lib/api/axios";
import type { Emotion } from "@/lib/types/reflection.type";
import type { TypeStats } from "./metrics.service";

export type EmotionStats = Record<Emotion, TypeStats>;

export const getEmocoesRegistradas = async (): Promise<
  AxiosResponse<EmotionStats>
> => {
  try {
    const response = await api.get("/metrics/emotion");
    return response;
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
