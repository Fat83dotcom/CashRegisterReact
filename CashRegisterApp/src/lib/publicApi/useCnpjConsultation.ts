import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { notifications } from "@mantine/notifications";
import { CnpjService } from "./cnpjService";

export function useCnpjConsultation() {
  const [isConsulting, setIsConsulting] = useState(false);
  const { setValue, getValues } = useFormContext();

  const handleConsultar = async () => {
    const cnpj = getValues("person.taxId");
    if (!cnpj) {
      notifications.show({
        title: "Atenção",
        message: "Por favor, digite o CNPJ antes de consultar.",
        color: "yellow",
      });
      return;
    }

    setIsConsulting(true);
    try {
      const dados = await CnpjService.consultar(cnpj);
      
      setValue("person.firstName", dados.razaoSocial, { shouldValidate: true, shouldDirty: true });
      setValue("person.tradeName", dados.nomeFantasia, { shouldValidate: true, shouldDirty: true });
      
      if (dados.email) {
        setValue("person.email", dados.email, { shouldValidate: true, shouldDirty: true });
      }

      if (dados.telefone) {
        // Tenta preencher no campo de telefone principal
        setValue("person.phone", dados.telefone, { shouldValidate: true, shouldDirty: true });
        // Se desejar, também poderia ser clonado para celular: setValue("person.cellPhone", dados.telefone)
      }

      if (dados.inscricaoEstadual) {
        setValue("person.stateRegistration", dados.inscricaoEstadual, { shouldValidate: true, shouldDirty: true });
      }

      if (dados.dataAbertura) {
        // dataAbertura costuma vir como "YYYY-MM-DD"
        // Construindo a data via construtor local para não cair em fuso horário (off-by-one day)
        const dateParts = dados.dataAbertura.split("-");
        if (dateParts.length === 3) {
          const [year, month, day] = dateParts.map(Number);
          const parsedDate = new Date(year, month - 1, day);
          if (!isNaN(parsedDate.getTime())) {
            setValue("person.birthdate", parsedDate, { shouldValidate: true, shouldDirty: true });
          }
        }
      }
      
      notifications.show({
        title: "Sucesso",
        message: "Dados carregados automaticamente.",
        color: "green",
      });
    } catch (error) {
      notifications.show({
        title: "Consulta Indisponível",
        message: "Não foi possível buscar os dados. Por favor, preencha manualmente.",
        color: "yellow",
      });
    } finally {
      setIsConsulting(false);
    }
  };

  return { isConsulting, handleConsultar };
}
