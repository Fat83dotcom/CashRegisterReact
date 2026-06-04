import {
  Button,
  Center,
  Paper,
  Title,
  Stack,
  LoadingOverlay,
} from "@mantine/core";
import { Form } from "../../../components/Form";
import {
  conversionSchema,
  type ConversionFormData,
} from "../schemas/conversionSchema";
import { InventoryService } from "../api/inventoryService";
import type {
  IUpdateConversionResponse,
  IUpdateConversionRequest,
} from "../interfaces";
import { useState, useEffect } from "react";

import { CreateProductForm } from "./CreateProductForm";
import { useGenericModal } from "../../../hooks/useGenericModal";
import { ConversionFormFields } from "./base/ConversionFormFields";
import { CreateUnitForm } from "./CreateUnitForm";

export interface UpdateConversionFormProps {
  conversionId: number;
  onSuccess: () => void;
}

export function UpdateConversionForm({
  conversionId,
  onSuccess,
}: UpdateConversionFormProps) {
  const [loading, setLoading] = useState(true);
  const [initialData, setInitialData] =
    useState<IUpdateConversionResponse | null>(null);
  const modal = useGenericModal();

  useEffect(() => {
    InventoryService.getConversionById(conversionId)
      .then((data) => {
        setInitialData(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [conversionId]);

  const handleSubmit = async (values: ConversionFormData) => {
    setLoading(true);
    const request: IUpdateConversionRequest = {
      fromUomId: Number(values.fromUomId),
      toUomId: Number(values.toUomId),
      multiplier: values.multiplier,
      productId: values.productId ? Number(values.productId) : null,
      isActive: values.isActive === "true",
    };

    try {
      await InventoryService.updateConversion(conversionId, request).then(
        (response) => {
          if (response && response.id > 0) onSuccess();
        },
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading && !initialData) {
    return (
      <Paper p="xl" pos="relative" h={400}>
        <LoadingOverlay visible={true} overlayProps={{ blur: 2 }} />
      </Paper>
    );
  }

  const defaultValues: ConversionFormData = {
    fromUomId: initialData?.fromUomId?.toString() || "",
    toUomId: initialData?.toUomId?.toString() || "",
    multiplier: initialData?.multiplier || 1,
    productId: initialData?.productId?.toString() || null,
    isActive: String(initialData?.isActive ?? true),
  };

  return (
    <Paper withBorder shadow="md" p="xl" maw={800} mx="auto" mt="xl">
      <Title order={2} ta="center" mb="xl" c="blue.6">
        Editar Regra de Conversão
      </Title>
      <Form
        schema={conversionSchema}
        onSubmit={handleSubmit}
        defaultValues={defaultValues}
      >
        {() => (
          <Stack gap="md">
            <ConversionFormFields
              isEdit
              onAddUnit={() =>
                modal({ title: "Nova Unidade", Form: CreateUnitForm })
              }
              onAddProduct={() =>
                modal({ title: "Novo Produto", Form: CreateProductForm })
              }
            />

            <Center mt="xl">
              <Button
                type="submit"
                fullWidth
                size="md"
                color="blue.6"
                variant="light"
                loading={loading}
              >
                Atualizar Regra
              </Button>
            </Center>
          </Stack>
        )}
      </Form>
    </Paper>
  );
}
