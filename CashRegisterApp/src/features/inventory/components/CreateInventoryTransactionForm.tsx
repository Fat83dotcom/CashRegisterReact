import { useState } from "react";
import { Button, Center, Paper, Stack, Title } from "@mantine/core";
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
      userId: 1, // Fixado provisoriamente, pois o backend usa o token para rastreio ou injeta na claim
      transactionType: values.transactionType,
      referenceDocument: values.referenceDocument,
      items: values.items,
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
    userId: 1,
    transactionType: "PurchaseEntry",
    referenceDocument: "",
    items: [],
  };

  return (
    <Paper withBorder shadow="md" p="xl" maw={700} mx="auto" mt="xl">
      <Title order={2} ta="center" mb="xl" c="brainstorm.6">
        Nova Movimentação de Estoque
      </Title>

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
    </Paper>
  );
}
