import { z } from "zod";

/**
 * Zod helper para componentes Select e AsyncSelect.
 * Intercepta o `null` emitido ao limpar o campo e converte para string vazia `""`.
 */
export const zSelectString = z.preprocess(
  (val) => (val === null || val === undefined ? "" : val),
  z.string()
);

/**
 * Zod helper para componentes MultiSelect e MultiSelectAsync.
 * Intercepta o `null` emitido ao limpar o campo e converte para array vazio `[]`.
 */
export const zMultiSelectArray = z.preprocess(
  (val) => (val === null || val === undefined ? [] : val),
  z.array(z.string())
);
