import { useState } from "react";
import { Button, Center, Paper, Stack, Title } from "@mantine/core";
import { Form } from "../../../components/Form";
import { unitSchema, type UnitFormData } from "../schemas/unitSchema";
import { InventoryService } from "../api/inventoryService";
import type { ICreateUnitRequest } from "../interfaces";
import { UnitFormFields } from "./UnitFormFields";

export interface CreateUnitFormProps {
  onSuccess?: () => void;
}

export function CreateUnitForm({ onSuccess }: CreateUnitFormProps) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: UnitFormData) => {
    setLoading(true);
    const request: ICreateUnitRequest = {
      code: values.code,
      name: values.name,
      allowDecimals: values.allowDecimals,
    };

    try {
      await InventoryService.createUnit(request, () => {
        if (onSuccess) {
          onSuccess();
        }
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper p="sm">
      <Title order={3} ta="center" mb="xl" c="brainstorm.6">
        Nova Unidade de Medida
      </Title>

      <Form
        schema={unitSchema}
        onSubmit={handleSubmit}
        defaultValues={{
          code: "",
          name: "",
          allowDecimals: false,
          isActive: "true",
        }}
      >
        {() => (
          <Stack gap="md">
            <UnitFormFields />

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
        )}
      </Form>
    </Paper>
  );
}
