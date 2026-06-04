import { Grid } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import type { ColumnConfig } from "../../../../../components/Layout/DynamicTable";
import { useSearch } from "../../../../../hooks/useSearch";
import { TextInput } from "../../../../../components/Form";
import { ActionConfirmContent } from "../../../../../components/Layout/ActionConfirmContent";
import { SearchPageTemplate } from "../../../../../components/Layout/SearchPageTemplate";
import {
  warehouseSearchSchema,
  type WarehouseSearchFormData,
} from "../../../schemas/warehouseSearchSchema";
import type { IWarehouseResponse } from "../../../interfaces/IWarehouseResponse";
import { InventoryService } from "../../../api/inventoryService";
import { useGenericModal } from "../../../../../hooks/useGenericModal";
import { UpdateWarehouseForm } from "../../../components/UpdateWarehouseForm";

export function WarehouseSearch() {
  const initialFilters: WarehouseSearchFormData = {
    searchTerm: "",
  };

  const modal = useGenericModal();

  const {
    loading,
    pagedData,
    selectedId,
    setSelectedId,
    handleSearch,
    handleDeactivate,
  } = useSearch<IWarehouseResponse, WarehouseSearchFormData>(
    InventoryService.searchWarehouses,
    initialFilters,
    {
      action: InventoryService.deactivateWarehouse,
      renderContent: (warehouse) => (
        <ActionConfirmContent
          description="Este almoxarifado será desativado e não poderá ser usado para novas movimentações."
          itemDetails={`${warehouse.name} (Tipo: ${warehouse.type})`}
          warningMessage="Verifique se há estoques pendentes neste local."
        />
      ),
    }
  );

  const handleEditTrigger = (id: string | number) => {
    modal({
      title: "Editar Almoxarifado",
      Form: (props) => (
        <UpdateWarehouseForm
          id={Number(id)}
          onSuccess={() => {
            props.onSuccess();
            handleSearch(
              initialFilters,
              pagedData.page,
              pagedData.pageSize,
            );
          }}
        />
      ),
    });
  };

  const columns: ColumnConfig<IWarehouseResponse>[] = [
    { key: "name", label: "Nome" },
    { key: "type", label: "Tipo" },
    {
      key: "isActive",
      label: "Status",
      render: (item) => (item.isActive ? "Ativo" : "Inativo"),
    },
  ];

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
      onRowSelect={(id) => setSelectedId((prev) => (prev === id ? null : id))}
      onRowDoubleClick={handleEditTrigger}
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
