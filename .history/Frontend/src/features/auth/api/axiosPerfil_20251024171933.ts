import api from '../../lib/axios/api';

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
  } catch (error: any) {
    console.error('Erro ao buscar perfil:', error);
    throw new Error(error.response?.data?.message || 'Erro ao buscar perfil do usuário');
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
  } catch (error: any) {
    console.error('Erro ao atualizar perfil:', error);
    throw new Error(error.response?.data?.message || 'Erro ao atualizar perfil');
  }
};