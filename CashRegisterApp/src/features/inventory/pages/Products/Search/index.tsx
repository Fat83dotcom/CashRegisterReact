import { Grid } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import type { ColumnConfig } from "../../../../../components/Layout/DynamicTable";
import { useSearch } from "../../../../../hooks/useSearch";
import { TextInput, Select } from "../../../../../components/Form";

import { SearchPageTemplate } from "../../../../../components/Layout/SearchPageTemplate";
import {
  productSearchSchema,
  type ProductSearchFormData,
} from "../../../schemas/productSearchSchema";
import type { IProductResponse } from "../../../interfaces";
import { InventoryService } from "../../../api/inventoryService";

export function ProductSearch() {
  const initialFilters: ProductSearchFormData = {
    searchTerm: "",
    categoryId: "",
  };

  const { loading, pagedData, selectedId, setSelectedId, handleSearch } =
    useSearch<IProductResponse, ProductSearchFormData>(
      InventoryService.searchProducts,
      initialFilters,
    );

  const columns: ColumnConfig<IProductResponse>[] = [
    { key: "sku", label: "SKU" },
    { key: "name", label: "Nome" },
    { key: "categoryName", label: "Categoria" },
    { key: "uomSymbol", label: "UM" },
    {
      key: "averageCost",
      label: "Custo Médio",
      render: (item) => `R$ ${item.averageCost?.toFixed(2) || "0,00"}`,
    },
    {
      key: "isActive",
      label: "Status",
      render: (item) => (item.isActive ? "Ativo" : "Inativo"),
    },
  ];

  return (
    <SearchPageTemplate
      title="Consulta de Produtos"
      schema={productSearchSchema}
      defaultValues={initialFilters}
      columns={columns}
      pagedData={pagedData}
      loading={loading}
      onSearch={handleSearch}
      selectedId={selectedId}
      onRowSelect={setSelectedId}
    >
      <Grid.Col span={{ base: 12, md: 8 }}>
        <TextInput
          name="searchTerm"
          label="Pesquisar"
          placeholder="SKU ou nome do produto"
          leftSection={<IconSearch size={18} stroke={1.5} />}
        />
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 4 }}>
        <Select
          name="categoryId"
          label="Categoria"
          placeholder="Todas"
          data={[
            { value: "1", label: "Eletrônicos" },
            { value: "2", label: "Alimentos" },
          ]}
          clearable
        />
      </Grid.Col>
    </SearchPageTemplate>
  );
}
