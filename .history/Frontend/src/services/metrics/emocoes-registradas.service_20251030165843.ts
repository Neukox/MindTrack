import { AxiosError, type AxiosResponse } from "axios";import { AxiosError, type AxiosResponse } from "axios";import { AxiosError, type AxiosResponse } from "axios";

import api from "@/lib/api/axios";

import type { Emotion } from "@/lib/types/reflection.type";import api from "@/lib/api/axios";import api from "@/lib/api/axios";

import type { TypeStats } from "./metrics.service";

import type { Emotion } from "@/lib/types/reflection.type";import type { Emotion } from "@/lib/types/reflection.type";

export type EmotionStats = Record<Emotion, TypeStats>;

import type { TypeStats } from "./metrics.service";import type { TypeStats } from "./metrics.service";

export const getEmocoesRegistradas = async (): Promise<AxiosResponse<EmotionStats>> => {

  try {

    const response = await api.get<EmotionStats>("/contagem-emocoes-registradas");

    return response;export type EmotionStats = Record<Emotion, TypeStats>;export type EmotionStats = Record<Emotion, TypeStats>;

  } catch (error: unknown) {

    if (error instanceof AxiosError) {

      throw new Error(

        error.response?.data?.message || "Erro ao buscar estatísticas de emoções"export const getEmocoesRegistradas = async (): Promise<export const getEmocoesRegistradas = async (): Promise<

      );

    }  AxiosResponse<EmotionStats>  AxiosResponse<EmotionStats>

    throw new Error("Erro inesperado ao buscar estatísticas de emoções");

  }> => {> => {

};
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
