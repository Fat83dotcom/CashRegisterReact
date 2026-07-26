import { Button, Center, Paper, Title, Stack } from "@mantine/core";

import { Form } from "../../../components/Form";
import {
  conversionSchema,
  type ConversionFormData,
} from "../schemas/conversionSchema";
import { InventoryService } from "../api/inventoryService";
import type { ICreateConversionRequest } from "../interfaces";
import { useState } from "react";

import { CreateProductForm } from "./CreateProductForm";
import { useGenericModal } from "../../../hooks/useGenericModal";
import { ConversionFormFields } from "./base/ConversionFormFields";
import { CreateUnitForm } from "./CreateUnitForm";

export interface ConversionFormProps {
  onSuccess?: () => void;
}

export function CreateConversionForm({ onSuccess }: ConversionFormProps) {
  const [loading, setLoading] = useState(false);
  const openModal = useGenericModal();

  const handleOpenUnitModal = () => {
    openModal({ title: "Nova Unidade", Form: CreateUnitForm });
  };

  const handleOpenProductModal = () => {
    openModal({ title: "Novo Produto", Form: CreateProductForm });
  };

  const handleSubmit = async (values: ConversionFormData) => {
    setLoading(true);

    const request: ICreateConversionRequest = {
      fromUomId: Number(values.fromUomId),
      toUomId: Number(values.toUomId),
      multiplier: values.multiplier,
      productId: values.productId ? Number(values.productId) : null,
    };

    try {
      await InventoryService.createConversion(request);
      if (onSuccess) onSuccess();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper withBorder shadow="md" p="xl" maw={800} mx="auto" mt="xl">
      <Title order={2} ta="center" mb="md" c="brainstorm.6">
        Regra de Conversão
      </Title>

      <Form
        schema={conversionSchema}
        onSubmit={handleSubmit}
        defaultValues={{
          multiplier: 1,
          productId: "",
          fromUomId: "",
          toUomId: "",
          isActive: "true",
        }}
      >
        {() => (
            <Stack gap="md">
              <ConversionFormFields
                onAddUnit={handleOpenUnitModal}
                onAddProduct={handleOpenProductModal}
              />

              <Center mt="xl">
                <Button
                  type="submit"
                  fullWidth
                  size="md"
                  color="brainstorm.6"
                  variant="light"
                  loading={loading}
                >
                  Salvar Regra de Conversão
                </Button>
              </Center>
            </Stack>
        )}
      </Form>
    </Paper>
  );
}
