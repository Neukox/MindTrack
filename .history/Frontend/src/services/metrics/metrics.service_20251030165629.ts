// Tipos e interfaces compartilhados para serviços de métricas

export interface TypeStats {
  count: number;
  percentage?: number;
  label?: string;
}

export interface MetricsResponse<T = any> {
  data: T;
  success: boolean;
  message?: string;
}

// Utilitários comuns para métricas
export const formatPercentage = (value: number): string => {
  return `${value.toFixed(1)}%`;
};

export const formatCount = (value: number): string => {
  return value.toLocaleString();
};