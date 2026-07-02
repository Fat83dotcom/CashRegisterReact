import { useEffect, useState } from "react";
import { Button, Stack, Text, Table, Loader, Center } from "@mantine/core";
import { Form } from "../../../components/Form";
import { AsyncSelect } from "../../../components/Form/AsyncSelect";
import { InventoryService } from "../api/inventoryService";
import { showNotification } from "@mantine/notifications";
import type { InventoryRequisition } from "../interfaces";

import { fulfillRequisitionSchema, type FulfillRequisitionFormData } from "../schemas/fulfillRequisitionSchema";

export interface FulfillRequisitionFormProps {
  requisitionId: number;
  onSuccess: () => void;
}

export function FulfillRequisitionForm({ requisitionId, onSuccess }: FulfillRequisitionFormProps) {
  const [requisition, setRequisition] = useState<InventoryRequisition | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    InventoryService.getRequisitionById(requisitionId)
      .then((data) => {
        setRequisition(data);
      })
      .catch((err) => {
        console.error("Erro ao carregar requisição:", err);
        showNotification({
          title: "Erro",
          message: "Não foi possível carregar os detalhes da requisição.",
          color: "red",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [requisitionId]);

  const onSubmit = async (data: FulfillRequisitionFormData) => {
    try {
      await InventoryService.fulfillRequisition(requisitionId, {
        sourceWarehouseId: Number(data.sourceWarehouseId),
      });
      showNotification({
        title: "Sucesso",
        message: "Requisição atendida e estoque baixado com sucesso!",
        color: "green",
      });
      onSuccess();
    } catch (error) {
      console.error(error);
      showNotification({
        title: "Erro",
        message: "Falha ao atender requisição.",
        color: "red",
      });
    }
  };

  if (loading) {
    return (
      <Center py="xl">
        <Loader />
      </Center>
    );
  }

  const rows = requisition?.items?.map((item, index) => (
    <Table.Tr key={item.id || index}>
      <Table.Td>{item.productName || `Produto ID: ${item.productId}`}</Table.Td>
      <Table.Td>{item.quantity}</Table.Td>
    </Table.Tr>
  ));

  return (
    <Form<FulfillRequisitionFormData> schema={fulfillRequisitionSchema} onSubmit={onSubmit}>
      {({ formState: { isSubmitting } }) => (
        <Stack gap="md">
          <Text size="sm" fw={500}>Produtos Solicitados:</Text>
          <Table striped highlightOnHover withTableBorder>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Produto</Table.Th>
                <Table.Th>Quantidade</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>

          <Text size="sm" c="dimmed" mt="sm">
            Selecione o almoxarifado do qual todos os itens desta requisição serão retirados.
          </Text>

          <AsyncSelect
            name="sourceWarehouseId"
            label="Almoxarifado de Origem"
            placeholder="Busque o almoxarifado"
            fetcher={async (query) => {
              const res = await InventoryService.searchWarehouses({ searchTerm: query, page: 1, pageSize: 20 });
              return res.items;
            }}
            getLabel={(item: any) => item.name}
            getValue={(item: any) => item.id.toString()}
            required
          />

          <Button type="submit" loading={isSubmitting} fullWidth mt="md" color="green">
            Confirmar Baixa de Estoque
          </Button>
        </Stack>
      )}
    </Form>
  );
}
