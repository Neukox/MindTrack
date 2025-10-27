import type { Profile } from "@/lib/types/user.type";
import api from "../../lib/api/axios";
import { AxiosError } from "axios";

export interface UpdateProfileData {
  username?: string;
}

// Obter dados do perfil do usuário
export const getUserProfile = async (): Promise<Profile> => {
  try {
    const response = await api.get("/user/profile");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar perfil:", error);

    if (error instanceof AxiosError) {
      throw new Error(
        error?.response?.data.message || "Erro ao buscar perfil do usuário",
      );
    }

    throw new Error("Erro ao buscar perfil do usuário");
  }
};

// Atualizar dados do perfil
export const updateUserProfile = async (
  userData: UpdateProfileData,
): Promise<{ message: string; user: Profile }> => {
  try {
    const response = await api.patch("/user/profile", userData);
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar perfil:", error);

    if (error instanceof AxiosError) {
      throw new Error(
        error?.response?.data.message || "Erro ao atualizar perfil",
      );
    }

    throw new Error("Erro ao atualizar perfil");
  }
};
