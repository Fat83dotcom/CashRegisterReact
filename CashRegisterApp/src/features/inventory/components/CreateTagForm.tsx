import {
  Button,
  Center,
  Grid,
  Paper,
  Title,
  Stack,
  ColorInput as MantineColorInput,
} from "@mantine/core";
import { Form, TextInput } from "../../../components/Form";
import { useFormContext, Controller } from "react-hook-form";
import { tagSchema, type TagFormData } from "../schemas/tagSchema";
import { InventoryService } from "../api/inventoryService";
import type { ICreateTagRequest } from "../interfaces";
import { useState } from "react";

// Wrapper inline for ColorInput since we only need it here or it can be moved to @/components/Form later
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

export interface TagFormProps {
  onSuccess?: () => void;
}

export function CreateTagForm({ onSuccess }: TagFormProps) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: TagFormData) => {
    setLoading(true);
    const request = values as ICreateTagRequest;

    try {
      await InventoryService.createTag(request, () => {
        if (onSuccess) {
          onSuccess();
        }
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper withBorder shadow="md" p="xl" maw={500} mx="auto" mt="xl">
      <Title order={2} ta="center" mb="xl" c="brainstorm.6">
        Nova Tag
      </Title>
      <Form
        schema={tagSchema}
        onSubmit={handleSubmit}
        defaultValues={{
          name: "",
          colorHex: "#228be6", // Default Mantine blue
        }}
      >
        {() => (
          <Stack gap="md">
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

            <Center mt="xl">
              <Button
                type="submit"
                fullWidth
                size="md"
                color="brainstorm.6"
                variant="light"
                loading={loading}
              >
                Salvar Tag
              </Button>
            </Center>
          </Stack>
        )}
      </Form>
    </Paper>
  );
}
