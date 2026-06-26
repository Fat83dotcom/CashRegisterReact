import { Modal, Table, Text, Group, Badge, Stack, Paper, Divider } from "@mantine/core";
import type { IInventoryTransactionDetailsResponse } from "../interfaces";
import { transactionTypeLabels } from "../pages/Stock/Search";

interface TransactionDetailsModalProps {
  opened: boolean;
  onClose: () => void;
  transaction: IInventoryTransactionDetailsResponse | null;
  loading?: boolean;
}

export function TransactionDetailsModal({
  opened,
  onClose,
  transaction,
  loading,
}: TransactionDetailsModalProps) {
  if (!transaction && !loading) return null;

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={
        <Stack gap={4}>
          <Text fw={600} size="lg">
            Detalhes da Movimentação #{transaction?.id} {transaction?.name ? `- ${transaction.name}` : ""}
          </Text>
          {transaction?.description && (
            <Text size="sm" c="dimmed">
              {transaction.description}
            </Text>
          )}
        </Stack>
      }
      size="xl"
    >
      {loading ? (
        <Text c="dimmed" ta="center" py="xl">
          Carregando...
        </Text>
      ) : transaction ? (
        <Stack gap="lg">
          <Paper withBorder p="md" radius="md">
            <Group grow align="flex-start">
              <Stack gap="xs">
                <Text size="sm" c="dimmed" fw={500}>Tipo de Movimentação</Text>
                <Badge size="lg" variant="light" color="brainstorm.6">
                  {transactionTypeLabels[transaction.transactionType] || transaction.transactionType}
                </Badge>
              </Stack>
              <Stack gap="xs">
                <Text size="sm" c="dimmed" fw={500}>Data</Text>
                <Text fw={600} size="md">{new Date(transaction.createdAt).toLocaleString()}</Text>
              </Stack>
              <Stack gap="xs">
                <Text size="sm" c="dimmed" fw={500}>Nome</Text>
                <Text fw={600} size="md">{transaction.name || "-"}</Text>
              </Stack>
              <Stack gap="xs">
                <Text size="sm" c="dimmed" fw={500}>Documento Ref.</Text>
                <Text fw={600} size="md">{transaction.referenceDocument || "-"}</Text>
              </Stack>
            </Group>
            {transaction.description && (
              <>
                <Divider my="sm" />
                <Stack gap="xs">
                  <Text size="sm" c="dimmed" fw={500}>Descrição</Text>
                  <Text size="sm">{transaction.description}</Text>
                </Stack>
              </>
            )}
          </Paper>

          <Text fw={600} size="md">
            Itens ({transaction.items.length})
          </Text>

          <Table.ScrollContainer minWidth={600}>
            <Table striped highlightOnHover withTableBorder withColumnBorders verticalSpacing="md">
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Produto</Table.Th>
                  <Table.Th>Quantidade</Table.Th>
                  <Table.Th>Origem</Table.Th>
                  <Table.Th>Destino</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {transaction.items.map((item) => (
                  <Table.Tr key={item.id}>
                    <Table.Td>
                      <Text size="sm" fw={600}>{item.productName}</Text>
                    </Table.Td>
                    <Table.Td>
                      <Badge variant="filled" color="brainstorm.6">{item.quantity}</Badge>
                    </Table.Td>
                    <Table.Td>
                      <Text size="sm">{item.sourceWarehouseName || "-"}</Text>
                    </Table.Td>
                    <Table.Td>
                      <Text size="sm">{item.destinationWarehouseName || "-"}</Text>
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </Table.ScrollContainer>
        </Stack>
      ) : null}
    </Modal>
  );
}
