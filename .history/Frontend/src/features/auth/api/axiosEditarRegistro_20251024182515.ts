import api from '../../../lib/api/api';

// Tipos para edição de registro
export interface EditarRegistroData {
  title?: string;
  category?: string;
  content?: string;
  emotion?: string;
}

export interface EditarRegistroResponse {
  message: string;
  reflexao?: {
    id: string;
    title: string;
    content: string;
    category: string;
    emotion: string;
    updatedAt: string;
  };
}

// Editar um registro específico
export const editarRegistro = async (
  id: string, 
  dadosEdicao: EditarRegistroData
): Promise<EditarRegistroResponse> => {
  try {
    const token = localStorage.getItem('token');
    
    if (!token) {
      throw new Error('Token de autenticação não encontrado');
    }

    console.log(`Editando registro ID: ${id}`);
    console.log('Dados para edição:', dadosEdicao);

    const response = await api.put(`/reflexao/${id}`, dadosEdicao, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    console.log('Registro editado com sucesso:', response.data);
    return response.data;
  } catch (error) {
    console.error('Erro ao editar registro:', error);
    
    if (error instanceof Error && 'response' in error) {
      const axiosError = error as { 
        response?: { 
          data?: { message?: string };
          status?: number;
          statusText?: string;
        };
      };
      
      console.error('Status:', axiosError.response?.status);
      console.error('Status Text:', axiosError.response?.statusText);
      console.error('Response Data:', axiosError.response?.data);
      
      if (axiosError.response?.status === 404) {
        throw new Error('Registro não encontrado');
      }
      
      if (axiosError.response?.status === 403) {
        throw new Error('Você não tem permissão para editar este registro');
      }
      
      throw new Error(
        axiosError.response?.data?.message || 'Erro ao editar registro'
      );
    }
    
    throw new Error('Erro ao editar registro');
  }
};