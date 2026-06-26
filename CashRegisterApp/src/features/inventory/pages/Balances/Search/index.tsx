import { useState } from "react";
import { Grid, Modal } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import type { ColumnConfig } from "../../../../../components/Layout/DynamicTable";
import { useSearch } from "../../../../../hooks/useSearch";
import { TextInput, AsyncSelect, MultiSelectAsync } from "../../../../../components/Form";
import {
  stockBalanceSearchSchema,
  type StockBalanceSearchFormData,
} from "../../../schemas/stockBalanceSearchSchema";
import { SearchPageTemplate } from "../../../../../components/Layout/SearchPageTemplate";
import { InventoryService } from "../../../api/inventoryService";
import { AdjustStockForm } from "../../../components/AdjustStockForm";

interface StockBalanceResponse {
  id: number;
  productId: number;
  productSku: string;
  productName: string;
  warehouseId: number;
  warehouseName: string;
  physicalQuantity: number;
  reservedQuantity: number;
  availableQuantity: number;
}

export function StockBalanceSearch() {
  const initialFilters: StockBalanceSearchFormData = {
    searchTerm: "",
    warehouseId: "",
    categoryId: "",
    tagIds: [],
    hideEmpty: false,
  };

  const {
    loading,
    pagedData,
    selectedId,
    setSelectedId,
    handleSearch,
    refresh,
  } = useSearch<StockBalanceResponse, StockBalanceSearchFormData>(
    InventoryService.searchStockBalances,
    initialFilters,
  );

  const [adjustmentModalOpen, setAdjustmentModalOpen] = useState(false);
  const [itemToAdjust, setItemToAdjust] = useState<StockBalanceResponse | null>(null);

const fetchWarehouses = async (query: string) => {
  const response = await InventoryService.searchWarehouses({
    searchTerm: query,
    page: 1,
    pageSize: 20,
  });
  return response.items || [];
};

const fetchCategories = async (query: string) => {
  const response = await InventoryService.searchCategories({
    name: query,
    page: 1,
    pageSize: 20,
  });
  return response.items || [];
};

const fetchTags = async (query: string) => {
  const response = await InventoryService.searchTags({
    searchTerm: query,
    page: 1,
    pageSize: 20,
  });
  return response.items || [];
};

  const columns: ColumnConfig<StockBalanceResponse>[] = [
    { key: "productSku", label: "SKU" },
    { key: "productName", label: "Produto" },
    { key: "warehouseName", label: "Almoxarifado" },
    { key: "physicalQuantity", label: "Físico" },
    { key: "reservedQuantity", label: "Reservado" },
    { 
      key: "availableQuantity", 
      label: "Disponível",
      render: (item: StockBalanceResponse) => <strong>{item.availableQuantity}</strong> 
    },
  ];

  const handleOpenAdjustmentModal = (id: string | number) => {
    const item = pagedData?.items.find((x: StockBalanceResponse) => x.id === id);
    if (item) {
      setItemToAdjust(item);
      setAdjustmentModalOpen(true);
    }
  };

  const handleAdjustmentSuccess = () => {
    setAdjustmentModalOpen(false);
    setItemToAdjust(null);
    refresh(); // recarrega a tabela mantendo página e filtros
  };

  return (
    <>
      <Modal 
        opened={adjustmentModalOpen} 
        onClose={() => setAdjustmentModalOpen(false)} 
        title="Ajuste de Estoque"
        size="lg"
      >
        {itemToAdjust && (
          <AdjustStockForm 
            productId={itemToAdjust.productId}
            productName={itemToAdjust.productName}
            warehouseId={itemToAdjust.warehouseId}
            warehouseName={itemToAdjust.warehouseName}
            currentQuantity={itemToAdjust.availableQuantity} // Por enquanto o físico/disponível é igual no front
            onSuccess={handleAdjustmentSuccess}
          />
        )}
      </Modal>

      <SearchPageTemplate
      title="Consulta Avançada de Saldos"
      schema={stockBalanceSearchSchema}
      defaultValues={initialFilters}
      columns={columns}
      pagedData={pagedData}
      loading={loading}
      onSearch={handleSearch}
      selectedId={selectedId}
      onRowSelect={(id: string | number | null) => setSelectedId((prev: string | number | null) => (prev === id ? null : id))}
      onRowDoubleClick={handleOpenAdjustmentModal}
    >
      <Grid align="flex-end">
        <Grid.Col span={{ base: 12, md: 3 }}>
          <TextInput
            name="searchTerm"
            label="Produto"
            placeholder="Nome ou SKU..."
            leftSection={<IconSearch size={18} stroke={1.5} />}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 3 }}>
          <AsyncSelect
            name="warehouseId"
            label="Almoxarifado"
            placeholder="Todos"
            fetcher={fetchWarehouses}
            getLabel={(item: any) => item.name}
            getValue={(item: any) => item.id.toString()}
            clearable
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 3 }}>
          <AsyncSelect
            name="categoryId"
            label="Categoria"
            placeholder="Todas"
            fetcher={fetchCategories}
            getLabel={(item: any) => item.name}
            getValue={(item: any) => item.id.toString()}
            clearable
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 3 }}>
           <MultiSelectAsync
            name="tagIds"
            label="Tags"
            placeholder="Nenhuma selecionada"
            fetcher={fetchTags}
            getLabel={(item: any) => item.name}
            getValue={(item: any) => item.id.toString()}
            clearable
          />
        </Grid.Col>
      </Grid>
    </SearchPageTemplate>
    </>
  );
}
