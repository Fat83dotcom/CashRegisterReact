import { Grid, ActionIcon } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useFormContext } from "react-hook-form";
import { TextInput, Select } from "../../../components/Form";
import { DateInput } from "../../../components/Form/DateInput";
import { useCnpjConsultation } from "../../../lib/publicApi/useCnpjConsultation";

export function PersonFormFields() {
  const { watch } = useFormContext();
  const personType = watch("person.personType");
  const isLegalPerson = personType === "Legal";
  const { isConsulting, handleConsultar } = useCnpjConsultation();

  return (
    <Grid grow gutter={{ base: 5, xs: "md", md: "xl" }}>
      <Grid.Col span={12}>
        <Select
          name="person.personType"
          withAsterisk
          label="Tipo de Pessoa"
          placeholder="Selecione o tipo de pessoa"
          data={[
            { value: "Physical", label: "Pessoa Física" },
            { value: "Legal", label: "Pessoa Jurídica" },
          ]}
        />
      </Grid.Col>

      <Grid.Col span={isLegalPerson ? 12 : 6}>
        <TextInput
          name="person.firstName"
          withAsterisk
          label={isLegalPerson ? "Razão Social" : "Nome"}
          placeholder={
            isLegalPerson ? "Digite a razão social" : "Digite o nome"
          }
        />
      </Grid.Col>
      {!isLegalPerson && (
        <Grid.Col span={6}>
          <TextInput
            name="person.lastName"
            withAsterisk
            label="Sobrenome"
            placeholder="Digite o sobrenome"
          />
        </Grid.Col>
      )}
      <Grid.Col span={4}>
        <DateInput
          name="person.birthdate"
          withAsterisk
          label={isLegalPerson ? "Data de Fundação" : "Data de Nascimento"}
          placeholder="Selecione a data"
        />
      </Grid.Col>
      <Grid.Col span={8}>
        <TextInput
          name="person.taxId"
          withAsterisk
          label={isLegalPerson ? "CNPJ" : "CPF"}
          placeholder={isLegalPerson ? "Digite o CNPJ" : "Digite o CPF"}
          rightSectionPointerEvents="all"
          rightSection={
            isLegalPerson ? (
              <ActionIcon
                variant="transparent"
                color="brainstorm.6"
                loading={isConsulting}
                onClick={handleConsultar}
                title="Consultar dados da empresa na Receita"
              >
                <IconSearch size={18} />
              </ActionIcon>
            ) : undefined
          }
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

      {!isLegalPerson && (
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
      )}

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
