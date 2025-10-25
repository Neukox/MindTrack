import api from '../../../lib/api/api';

// Tipos para perfil do usuário
export interface UserProfile {
  id: string;
  username: string;
  email: string;
  createdAt: string;
}

export interface UpdateProfileData {
  username?: string;
}

// Obter dados do perfil do usuário
export const getUserProfile = async (): Promise<UserProfile> => {
  try {
    const token = localStorage.getItem('token');
    
    if (!token) {
      throw new Error('Token de autenticação não encontrado');
    }

    const response = await api.get('/user/profile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Erro ao buscar perfil:', error);
    
    if (error instanceof Error && 'response' in error) {
      const axiosError = error as { response?: { data?: { message?: string } } };
      throw new Error(axiosError.response?.data?.message || 'Erro ao buscar perfil do usuário');
    }
    
    throw new Error('Erro ao buscar perfil do usuário');
  }
};

// Atualizar dados do perfil
export const updateUserProfile = async (userData: UpdateProfileData): Promise<{ message: string; user: UserProfile }> => {
  try {
    const token = localStorage.getItem('token');
    
    if (!token) {
      throw new Error('Token de autenticação não encontrado');
    }

    const response = await api.patch('/user/profile', userData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar perfil:', error);
    
    if (error instanceof Error && 'response' in error) {
      const axiosError = error as { response?: { data?: { message?: string } } };
      throw new Error(axiosError.response?.data?.message || 'Erro ao atualizar perfil');
    }
    
    throw new Error('Erro ao atualizar perfil');
  }
};