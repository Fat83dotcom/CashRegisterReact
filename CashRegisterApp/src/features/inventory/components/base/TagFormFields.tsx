import { Grid, ColorInput as MantineColorInput } from "@mantine/core";
import { TextInput } from "../../../../components/Form";
import { useFormContext, Controller } from "react-hook-form";

function ColorInputForm({
  name,
  label,
  placeholder,
}: {
  name: string;
  label: string;
  placeholder?: string;
}) {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <MantineColorInput
          {...field}
          label={label}
          placeholder={placeholder}
          error={error?.message}
          format="hex"
          swatches={[
            "#2e2e2e",
            "#868e96",
            "#fa5252",
            "#e64980",
            "#be4bdb",
            "#7950f2",
            "#4c6ef5",
            "#228be6",
            "#15aabf",
            "#12b886",
            "#20c997",
            "#40c057",
            "#82c91e",
            "#fab005",
            "#fd7e14",
            "#e67700",
            "#d9480f",
          ]}
        />
      )}
    />
  );
}

export function TagFormFields() {
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
        <ColorInputForm
          name="colorHex"
          label="Cor de Destaque"
          placeholder="Escolha a cor da tag"
        />
      </Grid.Col>
    </Grid>
  );
}
