import { Grid } from "@mantine/core";
import { TextInput, Select } from "../../../../components/Form";

export function WarehouseFormFields() {
  return (
    <Grid gutter="md">
      <Grid.Col span={12}>
        <TextInput
          name="name"
          label="Nome do Almoxarifado"
          placeholder="Ex: Depósito Central, Loja Principal"
          withAsterisk
        />
      </Grid.Col>
      <Grid.Col span={12}>
        <Select
          name="type"
          label="Tipo de Almoxarifado"
          placeholder="Selecione o tipo"
          data={[
            { value: "Principal", label: "Principal" },
            { value: "Filial", label: "Filial" },
            { value: "Virtual", label: "Virtual" },
            { value: "Terceiros", label: "Terceiros" }
          ]}
          withAsterisk
        />
      </Grid.Col>
    </Grid>
  );
}
