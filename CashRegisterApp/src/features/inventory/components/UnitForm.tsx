import { useState } from "react";
import {
  Button,
  Center,
  Grid,
  Paper,
  Title,
  Stack,
  Checkbox,
} from "@mantine/core";
import { Form, TextInput } from "../../../components/Form";
import { unitSchema, type UnitFormData } from "../schemas/unitSchema";
import { Controller, useFormContext } from "react-hook-form";
import { InventoryService } from "../api/inventoryService";
import type { IUnitRequest } from "../interfaces";

// Wrapper temporário para Checkbox já que não temos um no components/Form ainda
function CheckboxInput({ name, label }: { name: string; label: string }) {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Checkbox
          label={label}
          checked={field.value}
          onChange={(event) => field.onChange(event.currentTarget.checked)}
          error={false} // Mantine check doesn't show string errors usually, but let's keep it simple
        />
      )}
    />
  );
}

export function UnitForm() {
  const [loading, setLoading] = useState(false);
  let resetForm: (() => void) | undefined;

  const handleSubmit = async (values: UnitFormData) => {
    setLoading(true);
    const request = values as IUnitRequest;
    
    try {
      await InventoryService.createUnit(request, () => {
        if (resetForm) {
          resetForm();
        }
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper withBorder shadow="md" p="xl" maw={600} mx="auto" mt="xl">
      <Title order={2} ta="center" mb="xl" c="brainstorm.6">
        Nova Unidade de Medida
      </Title>

      <Form
        schema={unitSchema}
        onSubmit={handleSubmit}
        defaultValues={{
          code: "",
          name: "",
          allowDecimals: false,
        }}
      >
        {(methods) => {
          resetForm = methods.reset;
          return (
          <Stack gap="md">
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
              <Grid.Col span={12}>
                <CheckboxInput
                  name="allowDecimals"
                  label="Permitir casas decimais (Ex: 1.5kg)"
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
                Salvar Unidade
              </Button>
            </Center>
          </Stack>
          );
        }}
      </Form>
    </Paper>
  );
}
