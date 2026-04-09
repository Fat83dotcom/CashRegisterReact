import { Grid, Select, TextInput } from "@mantine/core";
import { type UseFormReturnType } from "@mantine/form";
import { DateInputBr } from "../DateInputPt-BR";

interface PersonFormProps {
  form: UseFormReturnType<any>;
  basePath?: string; // Para casos onde os campos estão aninhados, ex: form.getInputProps("person.firstName")
}

export function PersonForm({ form, basePath }: PersonFormProps) {
  const getFieldPath = (fieldName: string) =>
    basePath ? `${basePath}.${fieldName}` : fieldName;

  return (
    <Grid grow gutter={{ base: 5, xs: "md", md: "xl" }}>
      <Grid.Col span={6}>
        <TextInput
          withAsterisk
          label="Nome"
          placeholder="Digite o primeiro nome"
          {...form.getInputProps(getFieldPath("firstName"))}
        />
      </Grid.Col>
      <Grid.Col span={6}>
        <TextInput
          withAsterisk
          label="Sobrenome"
          placeholder="Digite o sobrenome"
          {...form.getInputProps(getFieldPath("lastName"))}
        />
      </Grid.Col>
      <Grid.Col span={4}>
        <DateInputBr
          props={{
            label: "Data de Nascimento",
            placeholder: "Selecione a data",
            value: form.values[getFieldPath("birthDate")],
            withAsterisk: true,
          }}
          getInputProps={form.getInputProps(getFieldPath("birthDate"))}
        />
      </Grid.Col>
      <Grid.Col span={8}>
        <TextInput
          withAsterisk
          label="Documento (CPF/CNPJ)"
          placeholder="Digite o documento"
          {...form.getInputProps(getFieldPath("taxId"))}
        />
      </Grid.Col>

      <Grid.Col span={6}>
        <TextInput
          withAsterisk
          label="Email"
          placeholder="Digite o email"
          {...form.getInputProps(getFieldPath("email"))}
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
          {...form.getInputProps(getFieldPath("gender"))}
        />
      </Grid.Col>

      <Grid.Col span={6}>
        <TextInput
          withAsterisk
          label="Celular"
          placeholder="Digite o celular"
          {...form.getInputProps(getFieldPath("cellPhone"))}
        />
      </Grid.Col>

      <Grid.Col span={6}>
        <TextInput
          withAsterisk
          label="Telefone"
          placeholder="Digite o telefone"
          {...form.getInputProps(getFieldPath("phone"))}
        />
      </Grid.Col>
    </Grid>
  );
}
