import { useState, useEffect } from "react";
import { Grid, Select, MultiSelect, Modal } from "@mantine/core";
import { Controller } from "react-hook-form";
import { IconSearch } from "@tabler/icons-react";
import type { ColumnConfig } from "../../../../components/Layout/DynamicTable";
import { useSearch } from "../../../../hooks/useSearch";
import { TextInput } from "../../../../components/Form";
import {
  stockBalanceSearchSchema,
  type StockBalanceSearchFormData,
} from "../../schemas/stockBalanceSearchSchema";
import { SearchPageTemplate } from "../../../../components/Layout/SearchPageTemplate";
import { InventoryService } from "../../api/inventoryService";
import { AdjustStockForm } from "../../components/AdjustStockForm";

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

  const [warehouses, setWarehouses] = useState<{ value: string; label: string }[]>([]);
  const [categories, setCategories] = useState<{ value: string; label: string }[]>([]);
  const [tags, setTags] = useState<{ value: string; label: string }[]>([]);

  const [adjustmentModalOpen, setAdjustmentModalOpen] = useState(false);
  const [itemToAdjust, setItemToAdjust] = useState<StockBalanceResponse | null>(null);

  useEffect(() => {
    // Busca dados de suporte para os dropdowns de filtro
    const fetchFilters = async () => {
      try {
        const [warehousesRes, categoriesRes, tagsRes] = await Promise.all([
          InventoryService.searchWarehouses({ page: 1, pageSize: 100 }),
          InventoryService.searchCategories({ page: 1, pageSize: 100 }),
          InventoryService.searchTags({ page: 1, pageSize: 100 }),
        ]);

        setWarehouses(warehousesRes.items.map((w: any) => ({ value: String(w.id), label: w.name })));
        setCategories(categoriesRes.items.map((c: any) => ({ value: String(c.id), label: c.name })));
        setTags(tagsRes.items.map((t: any) => ({ value: String(t.id), label: t.name })));
      } catch (e) {
        console.error("Falha ao carregar filtros de suporte", e);
      }
    };
    fetchFilters();
  }, []);

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
    const item = pagedData?.items.find((x) => x.id === id);
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
          <Controller
            name="warehouseId"
            render={({ field }) => (
              <Select
                {...field}
                label="Almoxarifado"
                placeholder="Todos"
                data={warehouses}
                searchable
                clearable
              />
            )}
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 3 }}>
          <Controller
            name="categoryId"
            render={({ field }) => (
              <Select
                {...field}
                label="Categoria"
                placeholder="Todas"
                data={categories}
                searchable
                clearable
              />
            )}
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 3 }}>
           <Controller
            name="tagIds"
            render={({ field }) => (
              <MultiSelect
                {...field}
                label="Tags"
                placeholder="Nenhuma selecionada"
                data={tags}
                searchable
                clearable
              />
            )}
          />
        </Grid.Col>
      </Grid>
    </SearchPageTemplate>
    </>
  );
}
