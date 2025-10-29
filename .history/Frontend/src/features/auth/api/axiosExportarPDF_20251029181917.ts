import api from "../../../lib/api/api";

// Tipos para exportação de PDF
export interface ExportarPDFParams {
  startDate: string; // formato: YYYY-MM-DD
  endDate: string; // formato: YYYY-MM-DD
}

// Função para exportar relatório em PDF
export const exportarRelatorioPDF = async (
  params: ExportarPDFParams
): Promise<void> => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("Token de autenticação não encontrado");
    }

    // Validar datas
    const startDate = new Date(params.startDate);
    const endDate = new Date(params.endDate);

    if (startDate > endDate) {
      throw new Error("A data de início deve ser anterior à data de fim");
    }

    // Fazer requisição para gerar PDF
    const response = await api.get("/reports/reflections", {
      params: {
        startDate: params.startDate,
        endDate: params.endDate,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
      responseType: "blob", // Importante para receber arquivo binário
    });

    // Criar URL do blob para download
    const blob = new Blob([response.data], { type: "application/pdf" });
    const url = window.URL.createObjectURL(blob);

    // Criar elemento de link temporário para download
    const link = document.createElement("a");
    link.href = url;

    // Gerar nome do arquivo com as datas
    const formatDate = (date: string) => {
      return new Date(date).toLocaleDateString("pt-BR").replace(/\//g, "-");
    };

    const fileName = `relatorio-reflexoes_${formatDate(
      params.startDate
    )}_${formatDate(params.endDate)}.pdf`;
    link.download = fileName;

    // Adicionar ao DOM temporariamente e clicar
    document.body.appendChild(link);
    link.click();

    // Limpar
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    console.log("Relatório PDF baixado com sucesso!");
  } catch (error: unknown) {
    console.error("Erro ao exportar relatório PDF:", error);

    if (error instanceof Error && "response" in error) {
      const axiosError = error as {
        response?: { status?: number; data?: { message?: string } };
      };

      if (axiosError.response?.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login";
        throw new Error("Sessão expirada. Faça login novamente.");
      }

      if (axiosError.response?.status === 400) {
        throw new Error("Parâmetros inválidos para exportação");
      }

      if (axiosError.response?.status === 404) {
        throw new Error("Nenhuma reflexão encontrada no período selecionado");
      }

      throw new Error("Erro no servidor ao gerar relatório");
    }

    if (error instanceof Error) {
      throw error;
    }

    throw new Error("Erro desconhecido ao exportar relatório");
  }
};

// Função auxiliar para validar formato de data
export const validarFormatoData = (date: string): boolean => {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(date)) return false;

  const dateObj = new Date(date);
  return dateObj instanceof Date && !isNaN(dateObj.getTime());
};

// Função para gerar parâmetros de data padrão (último mês)
export const gerarParametrosUltimoMes = (): ExportarPDFParams => {
  const hoje = new Date();
  const umMesAtras = new Date();
  umMesAtras.setMonth(hoje.getMonth() - 1);

  return {
    startDate: umMesAtras.toISOString().split("T")[0],
    endDate: hoje.toISOString().split("T")[0],
  };
};

// Função para gerar parâmetros de data padrão (este ano)
export const gerarParametrosEsteAno = (): ExportarPDFParams => {
  const hoje = new Date();
  const inicioAno = new Date(hoje.getFullYear(), 0, 1);

  return {
    startDate: inicioAno.toISOString().split("T")[0],
    endDate: hoje.toISOString().split("T")[0],
  };
};
