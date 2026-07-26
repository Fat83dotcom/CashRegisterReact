import { Button, Grid } from "@mantine/core";
import { IconPlus, IconSearch } from "@tabler/icons-react";
import type { ColumnConfig } from "../../../../../components/Layout/DynamicTable";
import { useRouteSearch } from "../../../../../hooks/useRouteSearch";
import { TextInput } from "../../../../../components/Form";
import { ActionConfirmContent } from "../../../../../components/Layout/ActionConfirmContent";

import { SearchPageTemplate } from "../../../../../components/Layout/SearchPageTemplate";
import {
  unitSearchSchema,
  type UnitSearchFormData,
} from "../../../schemas/unitSearchSchema";
import type { IUnitResponse } from "../../../interfaces";
import { InventoryService } from "../../../api/inventoryService";
import { useGenericModal } from "../../../../../hooks/useGenericModal";
import { UpdateUnitForm } from "../../../components/UpdateUnitForm";
import { CreateUnitForm } from "../../../components/CreateUnitForm";

export function UnitSearch() {
  const initialFilters: UnitSearchFormData = {
    searchTerm: "",
  };

  const modal = useGenericModal();

  const handleOpenCreateModal = () => {
    modal({
      title: "Cadastrar Nova Unidade",
      Form: (props) => (
        <CreateUnitForm
          onSuccess={() => {
            props.onSuccess();
            refresh();
          }}
        />
      ),
    });
  };

  const handleEditTrigger = (id: string | number) => {
    modal({
      title: "Editar Unidade de Medida",
      Form: (props) => (
        <UpdateUnitForm
          unitId={Number(id)}
          onSuccess={() => {
            props.onSuccess();
            refresh();
          }}
        />
      ),
    });
  };

  const {
    loading,
    pagedData,
    selectedId,
    setSelectedId,
    handleSearch,
    currentFilters,
    handleDeactivate,
    refresh,
  } = useRouteSearch<IUnitResponse, UnitSearchFormData>({
    action: InventoryService.deactivateUnit,
    renderContent: (unit) => (
      <ActionConfirmContent
        description="Esta unidade de medida será desativada do sistema e não aparecerá para novas seleções."
        itemDetails={`${unit.name} (${unit.code})`}
        warningMessage="Produtos e conversões que já utilizam esta unidade manterão o histórico, mas você não poderá criar novas associações."
      />
    ),
  });

  const columns: ColumnConfig<IUnitResponse>[] = [
    { key: "code", label: "Sigla/Código" },
    { key: "name", label: "Nome" },
    {
      key: "allowDecimals",
      label: "Permite Decimais?",
      render: (item) => (item.allowDecimals ? "Sim" : "Não"),
    },
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
            Nova Unidade
          </Button>
        </Grid.Col>
        <Grid.Col>
          <SearchPageTemplate
            title="Consulta de Unidades de Medida"
            schema={unitSearchSchema}
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
            <Grid.Col span={12}>
              <TextInput
                name="searchTerm"
                label="Pesquisar"
                placeholder="Código ou Nome da unidade"
                leftSection={<IconSearch size={18} stroke={1.5} />}
              />
            </Grid.Col>
          </SearchPageTemplate>
        </Grid.Col>
      </Grid>
    </>
  );
}
