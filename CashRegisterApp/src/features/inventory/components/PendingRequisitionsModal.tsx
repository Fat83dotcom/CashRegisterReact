import { useEffect, useState } from "react";
import {
  Modal,
  Button,
  Table,
  Group,
  Badge,
  Text,
  ActionIcon,
  Tooltip,
  Stack,
} from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";
import { InventoryService } from "../api/inventoryService";
import type { InventoryRequisition } from "../interfaces";
import { showNotification } from "@mantine/notifications";
import dayjs from "dayjs";
import { FulfillRequisitionForm } from "./FulfillRequisitionForm";
import { useGenericModal } from "../../../hooks/useGenericModal";

interface Props {
  opened: boolean;
  onClose: () => void;
  onFulfill: () => void;
}

export function PendingRequisitionsModal({
  opened,
  onClose,
  onFulfill,
}: Props) {
  const [requisitions, setRequisitions] = useState<InventoryRequisition[]>([]);
  const [loading, setLoading] = useState(false);
  const modal = useGenericModal();

  const fetchPending = async () => {
    try {
      setLoading(true);
      // Status 0 = Pendente
      const response = await InventoryService.searchRequisitions({
        page: 1,
        pageSize: 50,
        status: "Pending",
      });
      setRequisitions(response.items);
    } catch (error) {
      console.error(error);
      showNotification({
        title: "Erro",
        message: "Falha ao buscar requisições pendentes.",
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (opened) {
      fetchPending();
    }
  }, [opened]);

  const handleOpenFulfillModal = (id: number) => {
    modal({
      title: "Atender Requisição de Material",
      Form: (props) => (
        <FulfillRequisitionForm
          requisitionId={id}
          onSuccess={() => {
            props.onSuccess();
            fetchPending(); // Refresh list
            onFulfill(); // Trigger parent reload
          }}
        />
      ),
    });
  };

  const rows = requisitions.map((req) => (
    <Table.Tr key={req.id}>
      <Table.Td>{req.id}</Table.Td>
      <Table.Td>{req.originModule}</Table.Td>
      <Table.Td>{req.requestedByUserName}</Table.Td>
      <Table.Td>{dayjs(req.createdAt).format("DD/MM/YYYY HH:mm")}</Table.Td>
      <Table.Td>
        <Badge color="orange">Pendente</Badge>
      </Table.Td>
      <Table.Td>
        <Group gap="xs">
          <Tooltip label="Atender Requisição">
            <ActionIcon
              color="green"
              variant="light"
              onClick={() => handleOpenFulfillModal(req.id)}
            >
              <IconCheck size={18} />
            </ActionIcon>
          </Tooltip>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Requisições de Estoque Pendentes"
      size="xl"
    >
      <Stack>
        {requisitions.length === 0 && !loading ? (
          <Text c="dimmed" ta="center" py="xl">
            Nenhuma requisição pendente no momento.
          </Text>
        ) : (
          <Table striped highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>ID</Table.Th>
                <Table.Th>Módulo</Table.Th>
                <Table.Th>Solicitante</Table.Th>
                <Table.Th>Data Solicitação</Table.Th>
                <Table.Th>Status</Table.Th>
                <Table.Th>Ações</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        )}
        <Group justify="flex-end">
          <Button variant="default" onClick={onClose}>
            Fechar
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
}
