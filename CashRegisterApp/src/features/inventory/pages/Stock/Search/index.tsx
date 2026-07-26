import { Button, Grid, Group } from "@mantine/core";
import { IconPlus, IconSearch, IconCalendar, IconClipboardCheck } from "@tabler/icons-react";
import { useState } from "react";
import type { ColumnConfig } from "../../../../../components/Layout/DynamicTable";
import { useRouteSearch } from "../../../../../hooks/useRouteSearch";
import { TextInput, DateRangeInput, Select } from "../../../../../components/Form";
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
import type { IInventoryTransactionDetailsResponse, InventoryTransactionResponse } from "../../../interfaces";
import { PendingRequisitionsModal } from "../../../components/PendingRequisitionsModal";

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
  const [requisitionsOpened, { open: openRequisitions, close: closeRequisitions }] = useDisclosure(false);

  const initialFilters: TransactionSearchFormData = {
    referenceDocument: "",
    dateRange: [null, null],
    transactionType: "",
    isActive: "",
  };

  const {
    loading,
    pagedData,
    selectedId,
    setSelectedId,
    handleSearch,
    currentFilters,
    refresh,
  } = useRouteSearch<InventoryTransactionResponse, TransactionSearchFormData>();

  const handleOpenCreateModal = () => {
    modal({
      title: "Nova Movimentação de Estoque",
      Form: (props: any) => (
        <CreateInventoryTransactionForm
          onSuccess={() => {
            props.onSuccess();
            refresh();
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
    { key: "transactionDate", label: "Data", render: (item: InventoryTransactionResponse) => new Date(item.transactionDate).toLocaleDateString() },
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
        <Grid.Col span={12}>
          <Group justify="flex-end">
            <Button
              leftSection={<IconClipboardCheck size={18} />}
              onClick={openRequisitions}
              color="orange"
              variant="light"
            >
              Baixar Requisições Pendentes
            </Button>
            <Button
              leftSection={<IconPlus size={18} />}
              onClick={handleOpenCreateModal}
              color="brainstorm.6"
              variant="light"
            >
              Nova Movimentação
            </Button>
          </Group>
        </Grid.Col>
        <Grid.Col>
          <SearchPageTemplate
            title="Consulta de Movimentações"
            schema={transactionSearchSchema}
            defaultValues={initialFilters}
            currentFilters={currentFilters}
            columns={columns}
            pagedData={pagedData}
            loading={loading}
            onSearch={handleSearch}
            selectedId={selectedId}
            onRowSelect={(id: string | number | null) => setSelectedId((prev: string | number | null) => (prev === id ? null : id))}
            onRowDoubleClick={handleRowDoubleClick}
          >
            <Grid.Col span={{ base: 12, md: 6 }}>
              <TextInput
                name="referenceDocument"
                label="Documento de Referência"
                placeholder="Ex: NF-12345"
                leftSection={<IconSearch size={18} stroke={1.5} />}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <DateRangeInput
                name="dateRange"
                label="Período de Movimentação"
                placeholder="Selecione as datas"
                leftSection={<IconCalendar size={18} stroke={1.5} />}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Select
                name="transactionType"
                label="Tipo"
                placeholder="Todos"
                data={[
                  { value: "", label: "Todos" },
                  { value: "PurchaseEntry", label: "Entrada (Compra)" },
                  { value: "Transfer", label: "Transferência" },
                  { value: "RequisitionExit", label: "Saída (Requisição)" },
                  { value: "Reversal", label: "Estorno" },
                  { value: "InventoryAdjustmentEntry", label: "Ajuste (+)" },
                  { value: "InventoryAdjustmentExit", label: "Ajuste (-)" },
                ]}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Select
                name="isActive"
                label="Status"
                placeholder="Todos"
                data={[
                  { value: "", label: "Todos" },
                  { value: "true", label: "Concluído" },
                  { value: "false", label: "Cancelado" },
                ]}
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

      <PendingRequisitionsModal 
        opened={requisitionsOpened} 
        onClose={closeRequisitions} 
        onFulfill={() => refresh()} 
      />
    </>
  );
}
