import { useState, useEffect } from "react";
import {
  Button,
  Center,
  Paper,
  Title,
  Stack,
  LoadingOverlay,
  Grid,
} from "@mantine/core";
import { Form, Select } from "../../../components/Form";
import {
  updateWarehouseSchema,
  type UpdateWarehouseFormData,
} from "../schemas/warehouseSchema";
import { WarehouseFormFields } from "./base/WarehouseFormFields";
import { InventoryService } from "../api/inventoryService";
import type { IUpdateWarehouseRequest } from "../interfaces";

export interface UpdateWarehouseFormProps {
  id: number;
  onSuccess: () => void;
}

export function UpdateWarehouseForm({
  id,
  onSuccess,
}: UpdateWarehouseFormProps) {
  const [loading, setLoading] = useState(true);
  const [initialData, setInitialData] = useState<any | null>(null);

  useEffect(() => {
    InventoryService.getWarehouseById(id)
      .then((data) => {
        setInitialData(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = async (values: UpdateWarehouseFormData) => {
    setLoading(true);
    const request: IUpdateWarehouseRequest = {
      name: values.name,
      type: values.type,
      isActive: values.isActive === "true",
      isPrincipal: values.isPrincipal,
    };

    try {
      await InventoryService.updateWarehouse(id, request).then((response) => {
        if (response && response.id > 0) onSuccess();
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading && !initialData) {
    return (
      <Paper p="xl" pos="relative" h={300}>
        <LoadingOverlay visible={true} overlayProps={{ blur: 2 }} />
      </Paper>
    );
  }

  const defaultValues: UpdateWarehouseFormData = {
    name: initialData?.name || "",
    type: initialData?.type || "",
    isActive: String(initialData?.isActive ?? true),
    isPrincipal: initialData?.isPrincipal || false,
  };

  return (
    <Paper
      withBorder
      shadow="md"
      p="xl"
      maw={600}
      mx="auto"
      mt="xl"
      pos="relative"
    >
      <LoadingOverlay visible={loading} />
      <Title order={2} ta="center" mb="xl" c="brainstorm.6">
        Editar Almoxarifado
      </Title>

      <Form
        schema={updateWarehouseSchema}
        onSubmit={handleSubmit}
        defaultValues={defaultValues}
      >
        {() => (
          <Stack gap="md">
            <WarehouseFormFields />

            <Grid gutter="md">
              <Grid.Col span={12}>
                <Select
                  name="isActive"
                  label="Status"
                  placeholder="Selecione o status"
                  data={[
                    { value: "true", label: "Ativo" },
                    { value: "false", label: "Inativo" },
                  ]}
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
                Atualizar Almoxarifado
              </Button>
            </Center>
          </Stack>
        )}
      </Form>
    </Paper>
  );
}
