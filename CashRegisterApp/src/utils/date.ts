import dayjs from "dayjs";

/**
 * Formata uma data para o padrão 'DD/MM/YYYY'.
 * Utiliza o dayjs para respeitar a configuração global de fuso horário.
 * Se a data for inválida ou não fornecida, retorna '-' (ou o fallback especificado).
 */
export const formatDate = (date: string | Date | null | undefined, fallback: string = "-"): string => {
  if (!date) return fallback;
  const d = dayjs.utc(date).tz();
  return d.isValid() ? d.format("DD/MM/YYYY") : fallback;
};

/**
 * Formata uma data e hora para o padrão 'DD/MM/YYYY HH:mm'.
 * Utiliza o dayjs para respeitar a configuração global de fuso horário.
 * Se a data for inválida ou não fornecida, retorna '-' (ou o fallback especificado).
 */
export const formatDateTime = (date: string | Date | null | undefined, fallback: string = "-"): string => {
  if (!date) return fallback;
  const d = dayjs.utc(date).tz();
  return d.isValid() ? d.format("DD/MM/YYYY HH:mm") : fallback;
};
