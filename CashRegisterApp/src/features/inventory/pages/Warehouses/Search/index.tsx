import { Button, Grid } from "@mantine/core";
import { IconPlus, IconSearch } from "@tabler/icons-react";
import type { ColumnConfig } from "../../../../../components/Layout/DynamicTable";
import { useSearch } from "../../../../../hooks/useSearch";
import { TextInput } from "../../../../../components/Form";
import { ActionConfirmContent } from "../../../../../components/Layout/ActionConfirmContent";
import { SearchPageTemplate } from "../../../../../components/Layout/SearchPageTemplate";
import {
  warehouseSearchSchema,
  type WarehouseSearchFormData,
} from "../../../schemas/warehouseSearchSchema";
import type { IWarehouseResponse } from "../../../interfaces";
import { InventoryService } from "../../../api/inventoryService";
import { useGenericModal } from "../../../../../hooks/useGenericModal";
import { UpdateWarehouseForm } from "../../../components/UpdateWarehouseForm";
import { CreateWarehouseForm } from "../../../components/CreateWarehouseForm";

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
    currentFilters,
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
    },
  );

  const handleOpenCreateModal = () => {
    modal({
      title: "Cadastrar Novo Almoxarifado",
      Form: (props) => (
        <CreateWarehouseForm
          onSuccess={() => {
            props.onSuccess();
            handleSearch(initialFilters, pagedData.page, pagedData.pageSize);
          }}
        />
      ),
    });
  };

  const handleEditTrigger = (id: string | number) => {
    modal({
      title: "Editar Almoxarifado",
      Form: (props) => (
        <UpdateWarehouseForm
          id={Number(id)}
          onSuccess={() => {
            props.onSuccess();
            handleSearch(initialFilters, pagedData.page, pagedData.pageSize);
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
    <>
      <Grid>
        <Grid.Col span={12} ta="right">
          <Button
            leftSection={<IconPlus size={18} />}
            onClick={handleOpenCreateModal}
            color="brainstorm.6"
            variant="light"
          >
            Novo Almoxarifado
          </Button>
        </Grid.Col>
        <Grid.Col>
          <SearchPageTemplate
            title="Consulta de Almoxarifados"
            schema={warehouseSearchSchema}
            defaultValues={initialFilters}
            currentFilters={currentFilters}
            columns={columns}
            pagedData={pagedData}
            loading={loading}
            onSearch={handleSearch}
            selectedId={selectedId}
            onRowSelect={(id) =>
              setSelectedId((prev) => (prev === id ? null : id))
            }
            onRowDoubleClick={handleEditTrigger}
            onDeactivate={handleDeactivate}
          >
            <Grid.Col span={12} style={{ marginBottom: "-4px" }}>
              {/* Esse ajuste de margem negativa neutraliza o avanço do grid interno e alinha com o botão Buscar externo */}
              <TextInput
                name="searchTerm"
                label="Pesquisar"
                placeholder="Nome ou tipo do almoxarifado"
                leftSection={<IconSearch size={18} stroke={1.5} />}
                w="100%"
              />
            </Grid.Col>
          </SearchPageTemplate>
        </Grid.Col>
      </Grid>
    </>
  );
}
