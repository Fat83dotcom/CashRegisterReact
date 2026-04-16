import { Grid } from "@mantine/core";
import { useFormContext } from "react-hook-form";
import { TextInput, Select } from "../../../components/Form";
import { DateInput } from "../../../components/Form/DateInput";

export function PersonForm() {
  const { watch } = useFormContext();
  const personType = watch("person.personType");
  // Permite suportar strings caso venha do select antes de ser parseado
  const isLegalPerson = personType === 2 || personType === "2";

  return (
    <Grid grow gutter={{ base: 5, xs: "md", md: "xl" }}>
      <Grid.Col span={12}>
        <Select
          name="person.personType"
          withAsterisk
          label="Tipo de Pessoa"
          placeholder="Selecione o tipo de pessoa"
          data={[
            { value: "1", label: "Pessoa Física" },
            { value: "2", label: "Pessoa Jurídica" },
          ]}
        />
      </Grid.Col>

      <Grid.Col span={6}>
        <TextInput
          name="person.firstName"
          withAsterisk
          label="Nome"
          placeholder="Digite o nome ou razão social"
        />
      </Grid.Col>
      <Grid.Col span={6}>
        <TextInput
          name="person.lastName"
          withAsterisk
          label="Sobrenome"
          placeholder="Digite o sobrenome"
        />
      </Grid.Col>
      <Grid.Col span={4}>
        <DateInput
          name="person.birthdate"
          withAsterisk
          label="Nascimento / Fundação"
          placeholder="Selecione a data"
        />
      </Grid.Col>
      <Grid.Col span={8}>
        <TextInput
          name="person.taxId"
          withAsterisk
          label="Documento (CPF/CNPJ)"
          placeholder="Digite o documento"
        />
      </Grid.Col>

      {isLegalPerson && (
        <>
          <Grid.Col span={12}>
            <TextInput
              name="person.tradeName"
              label="Nome Fantasia"
              placeholder="Digite o nome fantasia"
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <TextInput
              name="person.stateRegistration"
              label="Inscrição Estadual"
              placeholder="Digite a inscrição estadual"
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <TextInput
              name="person.municipalRegistration"
              label="Inscrição Municipal"
              placeholder="Digite a inscrição municipal"
            />
          </Grid.Col>
        </>
      )}

      <Grid.Col span={6}>
        <TextInput
          name="person.email"
          withAsterisk
          label="Email"
          placeholder="Digite o email"
        />
      </Grid.Col>

      <Grid.Col span={6}>
        <Select
          name="person.gender"
          label="Gênero"
          placeholder="Selecione"
          data={[
            { value: "Male", label: "Masculino" },
            { value: "Female", label: "Feminino" },
            { value: "Other", label: "Outro" },
          ]}
        />
      </Grid.Col>

      <Grid.Col span={6}>
        <TextInput
          name="person.cellPhone"
          label="Celular"
          placeholder="Digite o celular"
        />
      </Grid.Col>

      <Grid.Col span={6}>
        <TextInput
          name="person.phone"
          label="Telefone"
          placeholder="Digite o telefone"
        />
      </Grid.Col>
    </Grid>
  );
}
