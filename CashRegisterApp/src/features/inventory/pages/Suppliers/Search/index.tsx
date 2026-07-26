import { Button, Grid } from "@mantine/core";
import { IconPlus, IconSearch, IconId } from "@tabler/icons-react";
import type { ColumnConfig } from "../../../../../components/Layout/DynamicTable";
import { useRouteSearch } from "../../../../../hooks/useRouteSearch";
import { TextInput } from "../../../../../components/Form";
import {
  supplierSearchSchema,
  type SupplierSearchFormData,
} from "../../../schemas/supplierSearchSchema";
import { SearchPageTemplate } from "../../../../../components/Layout/SearchPageTemplate";
import { InventoryService } from "../../../api/inventoryService";
import type { IGetSearchSupplierResponse } from "../../../interfaces";
import { ActionConfirmContent } from "../../../../../components/Layout/ActionConfirmContent";
import { useGenericModal } from "../../../../../hooks/useGenericModal";
import { CreateSupplierForm } from "../../../components/CreateSupplierForm";
import { UpdateSupplierForm } from "../../../components/UpdateSupplierForm";

// Componente de Busca de Fornecedores
export function SupplierSearch() {
  const initialFilters: SupplierSearchFormData = {
    name: "",
    taxId: "",
  };

  const modal = useGenericModal();

  const handleOpenCreateModal = () => {
    modal({
      title: "Cadastrar Novo Fornecedor",
      Form: (props) => (
        <CreateSupplierForm
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
      title: "Editar Fornecedor",
      Form: (props) => (
        <UpdateSupplierForm
          id={Number(id)}
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
  } = useRouteSearch<IGetSearchSupplierResponse, SupplierSearchFormData>({
    action: InventoryService.deactivateSupplier,
    renderContent: (supplier) => {
      return (
        <ActionConfirmContent
          description="Este fornecedor será desativado do sistema e não aparecerá para novas operações"
          itemDetails={`${supplier.name?.firstName} ${supplier.name?.lastName}`}
          warningMessage={
            "Esta ação não excluirá o registro da pessoa associada, apenas o vínculo de fornecedor."
          }
        />
      );
    },
  });

  const columns: ColumnConfig<IGetSearchSupplierResponse>[] = [
    {
      key: "name",
      label: "Nome",
      render: (item) => `${item.name?.firstName} ${item.name?.lastName}`,
    },
    { key: "taxId", label: "Documento" },
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
            Novo Fornecedor
          </Button>
        </Grid.Col>
        <Grid.Col>
          <SearchPageTemplate
            title="Consulta de Fornecedores"
            schema={supplierSearchSchema}
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
            <Grid.Col span={6}>
              <TextInput
                name="name"
                label="Nome"
                placeholder="Nome do fornecedor"
                leftSection={<IconSearch size={18} stroke={1.5} />}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                name="taxId"
                label="Documento"
                placeholder="CPF ou CNPJ"
                leftSection={<IconId size={18} stroke={1.5} />}
              />
            </Grid.Col>
          </SearchPageTemplate>
        </Grid.Col>
      </Grid>
    </>
  );
}
