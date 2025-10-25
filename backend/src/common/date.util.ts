/**
 * Utilitário de datas para uso em vários módulos.
 *
 * Funções incluídas:
 * - formatToPtBr: formata uma `Date` (ou string/número) para o padrão pt-BR (dd/MM/yyyy [HH:mm:ss])
 * - parseDate: converte uma string para `Date` (suporta ISO e formato pt-BR `dd/MM/yyyy[ HH:mm[:ss]]`)
 * - getWeekRange: retorna início e fim da semana para uma data (semana iniciando em segunda por padrão)
 */

export interface WeekRange {
  start: Date;
  end: Date;
}

export default class DateUtils {
  /**
   * Converte entrada para `Date` validada.
   * Aceita `Date`, timestamp (number) e strings nos formatos:
   * - ISO (ex: 2023-10-05T12:34:56Z)
   * - pt-BR: "dd/MM/yyyy" ou "dd/MM/yyyy HH:mm" ou "dd/MM/yyyy HH:mm:ss"
   *
   * Lança um `Error` se a data for inválida.
   */
  static parseDate(input: Date | string | number): Date {
    if (input instanceof Date) {
      const d = new Date(input.getTime());
      if (isNaN(d.getTime())) throw new Error('Data inválida.');
      return d;
    }

    if (typeof input === 'number') {
      const d = new Date(input);
      if (isNaN(d.getTime())) throw new Error('Data inválida.');
      return d;
    }

    if (typeof input === 'string') {
      const trimmed = input.trim();

      // Detecta formato pt-BR: dd/MM/yyyy[ HH:mm[:ss]]
      const ptBrRegex =
        /^(\d{2})\/(\d{2})\/(\d{4})(?:\s+(\d{2}):(\d{2})(?::(\d{2}))?)?$/;
      const m = trimmed.match(ptBrRegex);
      if (m) {
        const day = parseInt(m[1], 10);
        const month = parseInt(m[2], 10) - 1; // mês 0-based
        const year = parseInt(m[3], 10);
        const hour = m[4] ? parseInt(m[4], 10) : 0;
        const minute = m[5] ? parseInt(m[5], 10) : 0;
        const second = m[6] ? parseInt(m[6], 10) : 0;

        const d = new Date(year, month, day, hour, minute, second);
        // Valida componentes (p.ex. 31/02/2023 deve falhar)
        if (
          d.getFullYear() === year &&
          d.getMonth() === month &&
          d.getDate() === day &&
          d.getHours() === hour &&
          d.getMinutes() === minute &&
          d.getSeconds() === second
        ) {
          return d;
        } else {
          throw new Error('Data inválida.');
        }
      }

      // Tenta parser nativo (ISO e outros formatos reconhecidos)
      const parsed = new Date(trimmed);
      if (!isNaN(parsed.getTime())) {
        return parsed;
      }

      throw new Error('Data inválida.');
    }

    throw new Error('Tipo de entrada para data não suportado.');
  }

  /**
   * Formata uma data para o padrão pt-BR: "dd/MM/yyyy" ou "dd/MM/yyyy HH:mm:ss" se `includeTime` for true.
   * Aceita `Date`, timestamp ou string (que será parseada).
   *
   * Exemplo:
   * DateUtils.formatToPtBr(new Date(), { includeTime: true })
   */
  static formatToPtBr(
    input: Date | string | number,
    options?: { includeTime?: boolean },
  ): string {
    const includeTime = options?.includeTime ?? false;
    const d = DateUtils.parseDate(input);

    const optionsDate: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: includeTime ? '2-digit' : undefined,
      minute: includeTime ? '2-digit' : undefined,
      second: includeTime ? '2-digit' : undefined,
      hour12: false,
    };

    return new Intl.DateTimeFormat('pt-BR', optionsDate).format(d);
  }

  /**
   * Retorna o início e o fim da semana para a data informada.
   *
   * Parâmetros:
   * - input: Date | string | number (se omitido, usa `new Date()`)
   * - weekStartsOnMonday: se true, a semana começa na segunda-feira (comportamento padrão). Se false, começa no domingo.
   *
   * O horário do `start` é ajustado para 00:00:00.000 e o `end` para 23:59:59.999 no fuso local.
   */
  static getWeekRange(
    input?: Date | string | number,
    weekStartsOnMonday = true,
  ): WeekRange {
    const base = input === undefined ? new Date() : DateUtils.parseDate(input);
    // clone
    const date = new Date(base.getTime());

    const day = date.getDay(); // 0 (domingo) .. 6 (sábado)
    let start: Date;
    if (weekStartsOnMonday) {
      // calcular diferença para segunda-feira
      // se day === 0 (domingo) então diff = -6 (ir para segunda anterior)
      const diffToMonday = day === 0 ? -6 : 1 - day;
      start = new Date(date);
      start.setDate(date.getDate() + diffToMonday);
    } else {
      // semana começa no domingo
      const diffToSunday = -day;
      start = new Date(date);
      start.setDate(date.getDate() + diffToSunday);
    }

    // normaliza início para 00:00:00.000
    start.setHours(0, 0, 0, 0);

    // fim = start + 6 dias, set 23:59:59.999
    const end = new Date(start.getTime());
    end.setDate(start.getDate() + 6);
    end.setHours(23, 59, 59, 999);

    return { start, end };
  }

  /**
   * Retorna true se a entrada é uma data válida (suporta mesmos formatos do parseDate).
   */
  static isValid(input: Date | string | number): boolean {
    try {
      DateUtils.parseDate(input);
      return true;
    } catch {
      return false;
    }
  }
}
