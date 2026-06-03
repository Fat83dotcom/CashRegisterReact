import { Checkbox, Grid } from "@mantine/core";
import { Controller, useFormContext } from "react-hook-form";
import { Select, TextInput } from "../../../components/Form";

export function UnitFormFields({ isUpdate = false }: { isUpdate?: boolean }) {
  const { control } = useFormContext();

  return (
    <Grid gutter="md">
      <Grid.Col span={4}>
        <TextInput
          name="code"
          label="Código/Sigla"
          placeholder="Ex: UN, KG, LT"
          withAsterisk
        />
      </Grid.Col>
      <Grid.Col span={8}>
        <TextInput
          name="name"
          label="Nome da Unidade"
          placeholder="Ex: Unidade, Kilograma, Litro"
          withAsterisk
        />
      </Grid.Col>
      
      {isUpdate && (
        <Grid.Col span={12}>
          <Select
            name="isActive"
            label="Status"
            placeholder="Selecione o status"
            data={[
              { value: "true", label: "Ativo" },
              { value: "false", label: "Inativo" },
            ]}
            allowDeselect={false}
          />
        </Grid.Col>
      )}

      <Grid.Col span={12}>
        <Controller
          name="allowDecimals"
          control={control}
          render={({ field }) => (
            <Checkbox
              label="Permitir casas decimais (Ex: 1.5kg)"
              checked={field.value}
              onChange={(event) => field.onChange(event.currentTarget.checked)}
            />
          )}
        />
      </Grid.Col>
    </Grid>
  );
}
