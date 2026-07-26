import { useState } from "react";
import { Button, Center, Stack } from "@mantine/core";
import { Form } from "../../../components/Form";
import { CreateInventoryTransactionSchema, type CreateInventoryTransactionFormData } from "../schemas/inventoryTransactionSchema";
import { InventoryService } from "../api/inventoryService";
import type { ICreateInventoryTransactionRequest } from "../interfaces";
import { InventoryTransactionFormFields } from "./base/InventoryTransactionFormFields";
import { notifications } from "@mantine/notifications";

export interface CreateInventoryTransactionFormProps {
  onSuccess?: () => void;
}

export function CreateInventoryTransactionForm({ onSuccess }: CreateInventoryTransactionFormProps) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: CreateInventoryTransactionFormData) => {
    setLoading(true);
    const request: ICreateInventoryTransactionRequest = {
      transactionType: values.transactionType,
      referenceDocument: values.referenceDocument,
      name: values.name,
      description: values.description,
      items: values.items.map(item => ({
        ...item,
        productId: Number(item.productId),
        uomId: Number(item.uomId),
        sourceWarehouseId: values.globalSourceWarehouseId ? Number(values.globalSourceWarehouseId) : undefined,
        destinationWarehouseId: values.globalDestinationWarehouseId ? Number(values.globalDestinationWarehouseId) : undefined,
      })),
    };

    try {
      await InventoryService.createTransaction(request);
      notifications.show({
          title: "Sucesso",
          message: "Movimentação registrada com sucesso!",
          color: "green",
      });
      if (onSuccess) onSuccess();
    } catch (error) {
       // Erros já são tratados globalmente pelo interceptor, mas podemos adicionar feedbacks extras aqui se necessário
    } finally {
      setLoading(false);
    }
  };

  const defaultValues: CreateInventoryTransactionFormData = {
    transactionType: "PurchaseEntry",
    referenceDocument: "",
    name: "",
    description: "",
    items: [],
  };

  return (
    <Form
      schema={CreateInventoryTransactionSchema}
      onSubmit={handleSubmit}
      defaultValues={defaultValues}
    >
      {() => (
        <Stack gap="md">
          <InventoryTransactionFormFields />

          <Center mt="xl">
            <Button
              type="submit"
              fullWidth
              size="md"
              color="brainstorm.6"
              variant="light"
              loading={loading}
            >
              Registrar Movimentação
            </Button>
          </Center>
        </Stack>
      )}
    </Form>
  );
}
