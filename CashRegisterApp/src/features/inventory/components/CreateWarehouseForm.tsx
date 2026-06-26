import { useState } from "react";
import { Button, Center, Paper, Title, Stack } from "@mantine/core";

import {
  warehouseSchema,
  type WarehouseFormData,
} from "../schemas/warehouseSchema";
import { WarehouseFormFields } from "./base/WarehouseFormFields";
import { InventoryService } from "../api/inventoryService";
import type { ICreateWarehouseRequest } from "../interfaces";
import { Form } from "../../../components/Form/Form";

export interface CreateWarehouseFormProps {
  onSuccess: () => void;
}

export function CreateWarehouseForm({ onSuccess }: CreateWarehouseFormProps) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: WarehouseFormData) => {
    setLoading(true);
    const request: ICreateWarehouseRequest = {
      name: values.name,
      type: values.type,
      isPrincipal: values.isPrincipal,
    };

    try {
      await InventoryService.createWarehouse(request).then((response) => {
        if (response && response.id > 0) {
          onSuccess();
        }
      });
    } finally {
      setLoading(false);
    }
  };

  const defaultValues: WarehouseFormData = {
    name: "",
    type: "",
    isPrincipal: false,
  };

  return (
    <Paper withBorder shadow="md" p="xl" maw={600} mx="auto" mt="xl">
      <Title order={2} ta="center" mb="xl" c="brainstorm.6">
        Novo Almoxarifado
      </Title>

      <Form
        schema={warehouseSchema}
        onSubmit={handleSubmit}
        defaultValues={defaultValues}
      >
        {() => (
          <Stack gap="md">
            <WarehouseFormFields />

            <Center mt="xl">
              <Button
                type="submit"
                fullWidth
                size="md"
                color="brainstorm.6"
                variant="light"
                loading={loading}
              >
                Salvar Almoxarifado
              </Button>
            </Center>
          </Stack>
        )}
      </Form>
    </Paper>
  );
}
