/**
 * Esta implementação agora delega a chamada ao serviço centralizado em
 * `src/services/metrics/metrics.service.ts`.
 *
 * Observações:
 * - A lógica de busca de token (localStorage) foi removida.
 * - Tratamento específico para status 401 (Unauthorized) foi removido.
 * - A função exportada aqui é um re-export do serviço de métricas.
 */

export { getCategoriaMaisUsada } from "@/services/metrics/metrics.service";
