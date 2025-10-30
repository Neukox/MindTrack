import { AxiosError, type AxiosResponse } from "axios";import { AxiosError, type AxiosResponse } from "axios";

import api from "@/lib/api/axios";import api from "@/lib/api/axios";

import type { Emotion } from "@/lib/types/reflection.type";import type { Emotion } from "@/lib/types/reflection.type";

import type { TypeStats } from "./metrics.service";import type { TypeStats } from "./metrics.service";



export type EmotionStats = Record<Emotion, TypeStats>;export type EmotionStats = Record<Emotion, TypeStats>;



export const getEmocoesRegistradas = async (): Promise<export const getEmocoesRegistradas = async (): Promise<

  AxiosResponse<EmotionStats>  AxiosResponse<EmotionStats>

> => {> => {

  try {  try {

    const response = await api.get<EmotionStats>(    const response = await api.get("/metrics/emotion");

      "/contagem-emocoes-registradas"    return response;

    );  } catch (error: unknown) {

    return response;    console.error("Erro ao buscar emoções registradas:", error);

  } catch (error) {

    if (error instanceof AxiosError) {    if (error instanceof AxiosError) {

      throw new Error(      throw new Error(

        error.response?.data?.message ||        error?.response?.data.message || "Erro ao buscar emoções registradas",

          "Erro ao buscar estatísticas de emoções"      );

      );    }

    }

    throw new Error("Erro inesperado ao buscar estatísticas de emoções");    throw new Error("Erro ao buscar emoções registradas");

  }  }

};};
