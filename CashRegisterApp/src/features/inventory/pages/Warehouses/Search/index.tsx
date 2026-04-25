import { Grid } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import type { ColumnConfig } from "../../../../../components/Layout/DynamicTable";
import { useSearch } from "../../../../../hooks/useSearch";
import { TextInput } from "../../../../../components/Form";

import { SearchPageTemplate } from "../../../../../components/Layout/SearchPageTemplate";
import {
  warehouseSearchSchema,
  type WarehouseSearchFormData,
} from "../../../schemas/warehouseSearchSchema";
import type { IWarehouseResponse } from "../../../interfaces/IWarehouseResponse";
import { InventoryService } from "../../../api/inventoryService";

export function WarehouseSearch() {
  const initialFilters: WarehouseSearchFormData = {
    searchTerm: "",
  };

  const { loading, pagedData, selectedId, setSelectedId, handleSearch } =
    useSearch<IWarehouseResponse, WarehouseSearchFormData>(
      InventoryService.searchWarehouses,
      initialFilters,
    );

  const columns: ColumnConfig<IWarehouseResponse>[] = [
    { key: "name", label: "Nome" },
    { key: "type", label: "Tipo" },
    {
      key: "isActive",
      label: "Status",
      render: (item) => (item.isActive ? "Ativo" : "Inativo"),
    },
  ];

  const handleDeactivate = async (id: string | number) => {
    try {
      await InventoryService.deactivateWarehouse(id);
      handleSearch(initialFilters, pagedData.page);
      setSelectedId(null);
    } catch (error) {
      console.error("Erro ao desativar almoxarifado:", error);
    }
  };

  return (
    <SearchPageTemplate
      title="Consulta de Almoxarifados"
      schema={warehouseSearchSchema}
      defaultValues={initialFilters}
      columns={columns}
      pagedData={pagedData}
      loading={loading}
      onSearch={handleSearch}
      selectedId={selectedId}
      onRowSelect={setSelectedId}
      onDeactivate={handleDeactivate}
    >
      <Grid.Col span={12}>
        <TextInput
          name="searchTerm"
          label="Pesquisar"
          placeholder="Nome ou tipo do almoxarifado"
          leftSection={<IconSearch size={18} stroke={1.5} />}
        />
      </Grid.Col>
    </SearchPageTemplate>
  );
}
