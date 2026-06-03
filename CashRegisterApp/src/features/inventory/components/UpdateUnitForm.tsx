import {
  Button,
  Center,
  Paper,
  Title,
  Stack,
  LoadingOverlay,
} from "@mantine/core";
import { Form } from "../../../components/Form";
import { unitSchema, type UnitFormData } from "../schemas/unitSchema";
import { InventoryService } from "../api/inventoryService";
import type {
  IUpdateUnitRequest,
  IGetUnitByIdResponse,
} from "../interfaces";
import { useState, useEffect } from "react";
import { UnitFormFields } from "./UnitFormFields";

export interface UpdateUnitFormProps {
  unitId: number;
  onSuccess?: () => void;
}

export function UpdateUnitForm({
  unitId,
  onSuccess,
}: UpdateUnitFormProps) {
  const [loading, setLoading] = useState(true);
  const [initialData, setInitialData] = useState<IGetUnitByIdResponse | null>(
    null,
  );

  useEffect(() => {
    InventoryService.getUnitById(unitId)
      .then((data) => {
        setInitialData(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [unitId]);

  const handleSubmit = async (values: UnitFormData) => {
    setLoading(true);
    const request: IUpdateUnitRequest = {
      code: values.code,
      name: values.name,
      allowDecimals: values.allowDecimals,
      isActive: values.isActive === "true",
    };

    try {
      await InventoryService.updateUnit(unitId, request);
      if (onSuccess) onSuccess();
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

  const defaultValues: UnitFormData = {
    code: initialData?.code || "",
    name: initialData?.name || "",
    allowDecimals: initialData?.allowDecimals ?? false,
    isActive: String(initialData?.isActive ?? true),
  };

  return (
    <Paper withBorder shadow="md" p="xl" maw={600} mx="auto" mt="xl">
      <Title order={2} ta="center" mb="xl" c="brainstorm.6">
        Editar Unidade de Medida
      </Title>
      <Form
        schema={unitSchema}
        onSubmit={handleSubmit}
        defaultValues={defaultValues}
      >
        {() => {
          return (
            <Stack gap="md">
              <UnitFormFields isUpdate />

              <Center mt="xl">
                <Button
                  type="submit"
                  fullWidth
                  size="md"
                  color="brainstorm.6"
                  variant="light"
                  loading={loading}
                >
                  Atualizar Unidade
                </Button>
              </Center>
            </Stack>
          );
        }}
      </Form>
    </Paper>
  );
}
