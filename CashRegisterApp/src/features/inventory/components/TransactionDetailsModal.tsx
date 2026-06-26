import { Badge, Text } from "@mantine/core";
import type { IInventoryTransactionDetailsResponse } from "../interfaces";
import { transactionTypeLabels } from "../pages/Stock/Search";
import { EntityDetailsModal } from "../../../components/Layout/EntityDetailsModal";

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

  const headerTitle = `Detalhes da Movimentação #${transaction?.id} ${
    transaction?.name ? `- ${transaction.name}` : ""
  }`;

  return (
    <EntityDetailsModal
      opened={opened}
      onClose={onClose}
      loading={loading}
      title={headerTitle}
      subtitle={transaction?.description}
      summaryItems={[
        {
          label: "Tipo de Movimentação",
          value: (
            <Badge size="lg" variant="light" color="brainstorm.6">
              {transactionTypeLabels[transaction?.transactionType || ""] ||
                transaction?.transactionType}
            </Badge>
          ),
        },
        {
          label: "Data",
          value: transaction?.createdAt
            ? new Date(transaction.createdAt).toLocaleString()
            : "-",
        },
        {
          label: "Nome",
          value: transaction?.name || "-",
        },
        {
          label: "Documento Ref.",
          value: transaction?.referenceDocument || "-",
        },
      ]}
      longDescription={
        transaction?.description
          ? { label: "Descrição", text: transaction.description }
          : undefined
      }
      itemsTitle={`Itens (${transaction?.items?.length || 0})`}
      items={transaction?.items || []}
      keyExtractor={(item) => item.id}
      itemColumns={[
        {
          label: "Produto",
          render: (item) => <Text size="sm" fw={600}>{item.productName}</Text>,
        },
        {
          label: "Quantidade",
          render: (item) => (
            <Badge variant="filled" color="brainstorm.6">
              {item.quantity}
            </Badge>
          ),
        },
        {
          label: "Origem",
          render: (item) => <Text size="sm">{item.sourceWarehouseName || "-"}</Text>,
        },
        {
          label: "Destino",
          render: (item) => <Text size="sm">{item.destinationWarehouseName || "-"}</Text>,
        },
      ]}
    />
  );
}
