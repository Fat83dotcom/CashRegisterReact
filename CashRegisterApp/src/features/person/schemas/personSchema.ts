import { z } from "zod";
import { zSelectString } from "../../../lib/zodUtils";

export const personSchema = z
  .object({
    personType: zSelectString.refine((val) => val === "Physical" || val === "Legal", "Tipo de pessoa inválido").default("Physical"),
    firstName: z.string().trim().min(1, "Nome é obrigatório.").max(255, "Máximo de 255 caracteres."),
    lastName: z.string().trim().max(255, "Máximo de 255 caracteres.").optional(),
    taxId: z.string().transform((v) => (v ? v.replace(/[^A-Z0-9]/gi, "").toUpperCase() : "")),
    birthdate: z.preprocess(
      (arg) => {
        if (arg == null || arg === "") return undefined;
        return new Date(arg as any);
      },
      z.date({
        message: "Data inválida ou obrigatória.",
      }),
    ),
    email: z.email("E-mail inválido.").min(1, "E-mail é obrigatório."),
    tradeName: z.string().max(200, "Máximo de 200 caracteres.").optional(),
    stateRegistration: z
      .string()
      .max(20, "Máximo de 20 caracteres.")
      .optional(),
    municipalRegistration: z
      .string()
      .max(20, "Máximo de 20 caracteres.")
      .optional(),
    cellPhone: z
      .string()
      .transform((v) => (v ? v.replace(/\D/g, "") : v))
      .optional(),
    phone: z
      .string()
      .transform((v) => (v ? v.replace(/\D/g, "") : v))
      .optional(),
    gender: zSelectString.optional(),
  })
  .superRefine((data, ctx) => {
    if (data.personType === "Legal") {
      if (!data.tradeName || data.tradeName.trim().length === 0) {
        ctx.addIssue({
          code: "custom",
          message: "Nome Fantasia é obrigatório para Pessoa Jurídica.",
          path: ["tradeName"],
        });
      }
      if (!data.taxId || data.taxId.length === 0) {
        ctx.addIssue({
          code: "custom",
          message: "CNPJ é obrigatório.",
          path: ["taxId"],
        });
      } else if (data.taxId.length !== 14) {
        ctx.addIssue({
          code: "custom",
          message: "CNPJ deve ter exatamente 14 dígitos.",
          path: ["taxId"],
        });
      } else if (!/^[A-Z0-9]{12}[0-9]{2}$/.test(data.taxId)) {
        ctx.addIssue({
          code: "custom",
          message: "Formato de CNPJ inválido.",
          path: ["taxId"],
        });
      }
    } else {
      if (!data.taxId || data.taxId.length === 0) {
        ctx.addIssue({
          code: "custom",
          message: "CPF é obrigatório.",
          path: ["taxId"],
        });
      } else if (data.taxId.length !== 11) {
        ctx.addIssue({
          code: "custom",
          message: "CPF deve ter exatamente 11 dígitos.",
          path: ["taxId"],
        });
      }
      
      if (!data.lastName || data.lastName.trim().length === 0) {
        ctx.addIssue({
          code: "custom",
          message: "Sobrenome é obrigatório para Pessoa Física.",
          path: ["lastName"],
        });
      }
    }

    if (
      data.cellPhone &&
      data.cellPhone.length > 0 &&
      data.cellPhone.length < 10
    ) {
      ctx.addIssue({
        code: "custom",
        message: "Celular inválido.",
        path: ["cellPhone"],
      });
    }
    if (data.phone && data.phone.length > 0 && data.phone.length < 10) {
      ctx.addIssue({
        code: "custom",
        message: "Telefone inválido.",
        path: ["phone"],
      });
    }
  });

export type PersonFormData = z.infer<typeof personSchema>;
