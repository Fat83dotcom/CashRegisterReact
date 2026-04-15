import { Grid, Select, TextInput } from "@mantine/core";
import { useForm, type UseFormReturnType } from "@mantine/form";
import { useImperativeHandle, type Ref } from "react";
import { DateInputBr } from "../../../components/Layout/DateInputPt-BR";
import type { ICreatePersonRequest } from "./Interfaces/ICreatePersonRequest";

export interface PersonFormRef {
  form: UseFormReturnType<ICreatePersonRequest>;
}

export interface PersonFormProps {
  ref?: Ref<PersonFormRef>;
}

export function PersonForm({ ref }: PersonFormProps) {
  const form = useForm<ICreatePersonRequest>({
    initialValues: {
      personType: 1, // 1 = Física por padrão
      firstName: "",
      lastName: "",
      taxId: "",
      birthdate: "",
      email: "",
      tradeName: "",
      stateRegistration: "",
      municipalRegistration: "",
      cellPhone: "",
      phone: "",
      gender: "",
    },
    validate: {
      firstName: (value) =>
        !value || value.trim().length === 0 ? "Nome é obrigatório." : null,

      lastName: (value) =>
        !value || value.trim().length === 0 ? "Sobrenome é obrigatório." : null,

      birthdate: (value) =>
        !value ? "Data de nascimento/fundação é obrigatória." : null,

      taxId: (value) =>
        !value || value.length < 11
          ? "Documento deve ter no mínimo 11 dígitos."
          : null,

      email: (value) =>
        !value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? "E-mail inválido."
          : null,

      tradeName: (value, values) =>
        values.personType === 2 && (!value || value.trim().length === 0)
          ? "Nome Fantasia é obrigatório para Pessoa Jurídica."
          : null,

      cellPhone: (value) =>
        value && value.length > 0 && value.length < 10
          ? "Celular inválido."
          : null,

      phone: (value) =>
        value && value.length > 0 && value.length < 10
          ? "Telefone inválido."
          : null,
    },
  });

  useImperativeHandle(ref, () => ({
    form,
  }));

  const personType = form.values.personType;
  const isLegalPerson = personType === 2;

  return (
    <Grid grow gutter={{ base: 5, xs: "md", md: "xl" }}>
      <Grid.Col span={12}>
        <Select
          withAsterisk
          label="Tipo de Pessoa"
          placeholder="Selecione o tipo de pessoa"
          data={[
            { value: "1", label: "Pessoa Física" },
            { value: "2", label: "Pessoa Jurídica" },
          ]}
          {...form.getInputProps("personType")}
        />
      </Grid.Col>

      <Grid.Col span={6}>
        <TextInput
          withAsterisk
          label="Nome"
          placeholder="Digite o nome ou razão social"
          {...form.getInputProps("firstName")}
        />
      </Grid.Col>
      <Grid.Col span={6}>
        <TextInput
          withAsterisk
          label="Sobrenome"
          placeholder="Digite o sobrenome"
          {...form.getInputProps("lastName")}
        />
      </Grid.Col>
      <Grid.Col span={4}>
        <DateInputBr
          props={{
            label: "Nascimento / Fundação",
            placeholder: "Selecione a data",
            value: form.values["birthdate"],
            withAsterisk: true,
          }}
          getInputProps={form.getInputProps("birthdate")}
        />
      </Grid.Col>
      <Grid.Col span={8}>
        <TextInput
          withAsterisk
          label="Documento (CPF/CNPJ)"
          placeholder="Digite o documento"
          {...form.getInputProps("taxId")}
        />
      </Grid.Col>

      {isLegalPerson && (
        <>
          <Grid.Col span={12}>
            <TextInput
              label="Nome Fantasia"
              placeholder="Digite o nome fantasia"
              {...form.getInputProps("tradeName")}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <TextInput
              label="Inscrição Estadual"
              placeholder="Digite a inscrição estadual"
              {...form.getInputProps("stateRegistration")}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <TextInput
              label="Inscrição Municipal"
              placeholder="Digite a inscrição municipal"
              {...form.getInputProps("municipalRegistration")}
            />
          </Grid.Col>
        </>
      )}

      <Grid.Col span={6}>
        <TextInput
          withAsterisk
          label="Email"
          placeholder="Digite o email"
          {...form.getInputProps("email")}
        />
      </Grid.Col>

      <Grid.Col span={6}>
        <Select
          label="Gênero"
          placeholder="Selecione"
          data={[
            { value: "Male", label: "Masculino" },
            { value: "Female", label: "Feminino" },
            { value: "Other", label: "Outro" },
          ]}
          {...form.getInputProps("gender")}
        />
      </Grid.Col>

      <Grid.Col span={6}>
        <TextInput
          label="Celular"
          placeholder="Digite o celular"
          {...form.getInputProps("cellPhone")}
        />
      </Grid.Col>

      <Grid.Col span={6}>
        <TextInput
          label="Telefone"
          placeholder="Digite o telefone"
          {...form.getInputProps("phone")}
        />
      </Grid.Col>
    </Grid>
  );
}
