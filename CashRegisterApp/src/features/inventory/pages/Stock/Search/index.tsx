import { Button, Grid } from "@mantine/core";
import { IconPlus, IconSearch } from "@tabler/icons-react";
import { useState } from "react";
import type { ColumnConfig } from "../../../../../components/Layout/DynamicTable";
import { useSearch } from "../../../../../hooks/useSearch";
import { TextInput } from "../../../../../components/Form";
import {
  transactionSearchSchema,
  type TransactionSearchFormData,
} from "../../../schemas/transactionSearchSchema";
import { SearchPageTemplate } from "../../../../../components/Layout/SearchPageTemplate";
import { useGenericModal } from "../../../../../hooks/useGenericModal";
import { useDisclosure } from "@mantine/hooks";
import { InventoryService } from "../../../api/inventoryService";
import { CreateInventoryTransactionForm } from "../../../components/CreateInventoryTransactionForm";
import { TransactionDetailsModal } from "../../../components/TransactionDetailsModal";
import type { IInventoryTransactionDetailsResponse } from "../../../interfaces";

interface InventoryTransactionResponse {
  id: number;
  transactionType: string;
  referenceDocument: string | null;
  name: string | null;
  description: string | null;
  createdAt: string;
  isActive: boolean;
}

export const transactionTypeLabels: Record<string, string> = {
  PurchaseEntry: "Entrada (Compra)",
  Transfer: "Transferência",
  RequisitionExit: "Saída (Requisição)",
  Reversal: "Estorno",
  InventoryAdjustmentEntry: "Ajuste de Estoque (+)",
  InventoryAdjustmentExit: "Ajuste de Estoque (-)",
};

export function StockSearch() {
  const modal = useGenericModal();
  const [detailsOpened, { open: openDetails, close: closeDetails }] = useDisclosure(false);
  const [transactionDetails, setTransactionDetails] = useState<IInventoryTransactionDetailsResponse | null>(null);
  const [loadingDetails, setLoadingDetails] = useState(false);

  const initialFilters: TransactionSearchFormData = {
    referenceDocument: "",
  };

  const {
    loading,
    pagedData,
    selectedId,
    setSelectedId,
    handleSearch,
  } = useSearch<InventoryTransactionResponse, TransactionSearchFormData>(
    InventoryService.searchTransactions,
    initialFilters,
  );

  const handleOpenCreateModal = () => {
    modal({
      title: "Nova Movimentação de Estoque",
      Form: (props: any) => (
        <CreateInventoryTransactionForm
          onSuccess={() => {
            props.onSuccess();
            handleSearch(initialFilters, pagedData?.page || 1, pagedData?.pageSize || 10);
          }}
        />
      ),
    });
  };

  const columns: ColumnConfig<InventoryTransactionResponse>[] = [
    { key: "id", label: "ID" },
    { key: "transactionType", label: "Tipo de Movimentação", render: (item: InventoryTransactionResponse) => transactionTypeLabels[item.transactionType] || item.transactionType },
    { key: "name", label: "Nome", render: (item: InventoryTransactionResponse) => item.name || "-" },
    { key: "description", label: "Descrição", render: (item: InventoryTransactionResponse) => item.description || "-" },
    { key: "referenceDocument", label: "Doc. Referência", render: (item: InventoryTransactionResponse) => item.referenceDocument || "-" },
    { key: "createdAt", label: "Data", render: (item: InventoryTransactionResponse) => new Date(item.createdAt).toLocaleDateString() },
    { key: "isActive", label: "Status", render: (item: InventoryTransactionResponse) => item.isActive ? "Concluído" : "Cancelado" },
  ];

  const handleRowDoubleClick = async (id: string | number) => {
    try {
      setLoadingDetails(true);
      openDetails();
      const details = await InventoryService.getTransactionById(Number(id));
      setTransactionDetails(details);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingDetails(false);
    }
  };

  return (
    <>
      <Grid>
        <Grid.Col span={12} ta="right">
          <Button
            leftSection={<IconPlus size={18} />}
            onClick={handleOpenCreateModal}
            color="brainstorm.6"
            variant="light"
          >
            Nova Movimentação
          </Button>
        </Grid.Col>
        <Grid.Col>
          <SearchPageTemplate
            title="Consulta de Movimentações"
            schema={transactionSearchSchema}
            defaultValues={initialFilters}
            columns={columns}
            pagedData={pagedData}
            loading={loading}
            onSearch={handleSearch}
            selectedId={selectedId}
            onRowSelect={(id: string | number | null) => setSelectedId((prev: string | number | null) => (prev === id ? null : id))}
            onRowDoubleClick={handleRowDoubleClick}
          >
            <Grid.Col span={12}>
              <TextInput
                name="referenceDocument"
                label="Documento de Referência"
                placeholder="Ex: NF-12345"
                leftSection={<IconSearch size={18} stroke={1.5} />}
              />
            </Grid.Col>
          </SearchPageTemplate>
        </Grid.Col>
      </Grid>

      <TransactionDetailsModal
        opened={detailsOpened}
        onClose={() => {
          closeDetails();
          setTransactionDetails(null);
        }}
        transaction={transactionDetails}
        loading={loadingDetails}
      />
    </>
  );
}
