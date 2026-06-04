import { Grid, ColorInput } from "@mantine/core";
import { Controller, useFormContext } from "react-hook-form";
import { Select, TextInput } from "../../../components/Form";

export function TagFormFields({ isUpdate = false }: { isUpdate?: boolean }) {
  const { control } = useFormContext();

  return (
    <Grid gutter="md">
      <Grid.Col span={12}>
        <TextInput
          name="name"
          label="Nome da Tag"
          placeholder="Ex: Lançamento, Promoção"
          withAsterisk
        />
      </Grid.Col>
      <Grid.Col span={12}>
        <Controller
          name="colorHex"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <ColorInput
              {...field}
              label="Cor de Destaque"
              placeholder="Escolha a cor da tag"
              error={error?.message}
              format="hex"
            />
          )}
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
    </Grid>
  );
}
