import { Button, Grid, Drawer } from "@mantine/core";
import { IconPlus, IconSearch } from "@tabler/icons-react";
import type { ColumnConfig } from "../../../../components/Layout/DynamicTable";
import { useSearch } from "../../../../hooks/useSearch";
import { TextInput } from "../../../../components/Form";
import {
  transactionSearchSchema,
  type TransactionSearchFormData,
} from "../../schemas/transactionSearchSchema";
import { SearchPageTemplate } from "../../../../components/Layout/SearchPageTemplate";
import { InventoryService } from "../../api/inventoryService";
import { CreateInventoryTransactionForm } from "../../components/CreateInventoryTransactionForm";
import { useDisclosure } from "@mantine/hooks";

interface InventoryTransactionResponse {
  id: number;
  transactionType: string;
  referenceDocument: string | null;
  createdAt: string;
}

export function StockSearch() {
  const [opened, { open, close }] = useDisclosure(false);

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

  const columns: ColumnConfig<InventoryTransactionResponse>[] = [
    { key: "id", label: "ID" },
    { key: "transactionType", label: "Tipo de Movimentação" },
    { key: "referenceDocument", label: "Doc. Referência", render: (item: InventoryTransactionResponse) => item.referenceDocument || "-" },
    { key: "createdAt", label: "Data", render: (item: InventoryTransactionResponse) => new Date(item.createdAt).toLocaleDateString() },
  ];

  return (
    <>
      <Grid>
        <Grid.Col span={12} ta="right">
          <Button
            leftSection={<IconPlus size={18} />}
            onClick={open}
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

      <Drawer
        opened={opened}
        onClose={close}
        position="right"
        size="lg"
        title={null}
        withCloseButton={false}
      >
        <CreateInventoryTransactionForm
          onSuccess={() => {
            close();
            handleSearch(initialFilters, pagedData?.page || 1, pagedData?.pageSize || 10);
          }}
        />
      </Drawer>
    </>
  );
}
