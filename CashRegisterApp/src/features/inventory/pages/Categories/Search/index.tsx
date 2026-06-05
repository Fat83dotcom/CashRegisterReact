import { Button, Grid } from "@mantine/core";
import { IconPlus, IconSearch } from "@tabler/icons-react";
import type { ColumnConfig } from "../../../../../components/Layout/DynamicTable";
import { useSearch } from "../../../../../hooks/useSearch";
import { TextInput } from "../../../../../components/Form";
import {
  categorySearchSchema,
  type CategorySearchFormData,
} from "../../../schemas/categorySearchSchema";
import { SearchPageTemplate } from "../../../../../components/Layout/SearchPageTemplate";
import { InventoryService } from "../../../api/inventoryService";
import type { ICategoryResponse } from "../../../interfaces";
import { ActionConfirmContent } from "../../../../../components/Layout/ActionConfirmContent";
import { useGenericModal } from "../../../../../hooks/useGenericModal";
import { CategoryForm } from "../../../components/CategoryForm";

export function CategorySearch() {
  const initialFilters: CategorySearchFormData = {
    name: "",
  };

  const modal = useGenericModal();

  const handleOpenCreateModal = () => {
    modal({
      title: "Cadastrar Nova Categoria",
      Form: CategoryForm,
    });
  };

  const {
    loading,
    pagedData,
    selectedId,
    setSelectedId,
    handleSearch,
    handleDeactivate,
  } = useSearch<ICategoryResponse, CategorySearchFormData>(
    InventoryService.searchCategories,
    initialFilters,
    {
      action: InventoryService.deactivateCategory,
      renderContent: (category) => {
        return (
          <ActionConfirmContent
            description="Esta categoria será desativada do sistema e não aparecerá para novas seleções"
            itemDetails={`${category.name}`}
            warningMessage={
              "Está ação não impactará os produtos que usam essa categoria."
            }
          />
        );
      },
    },
  );

  const columns: ColumnConfig<ICategoryResponse>[] = [
    { key: "name", label: "Nome" },
    {
      key: "parentCategoryName",
      label: "Sub Categoria de",
      render: (item) => item.parentCategoryName || "-",
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
            Nova Categoria
          </Button>
        </Grid.Col>
        <Grid.Col>
          <SearchPageTemplate
            title="Consulta de Categorias"
            schema={categorySearchSchema}
            defaultValues={initialFilters}
            columns={columns}
            pagedData={pagedData}
            loading={loading}
            onSearch={handleSearch}
            selectedId={selectedId}
            onRowSelect={(id) =>
              setSelectedId((prev) => (prev === id ? null : id))
            }
            onDeactivate={handleDeactivate}
          >
            <Grid.Col span={12}>
              <TextInput
                name="name"
                label="Nome"
                placeholder="Nome da categoria"
                leftSection={<IconSearch size={18} stroke={1.5} />}
              />
            </Grid.Col>
          </SearchPageTemplate>
        </Grid.Col>
      </Grid>
    </>
  );
}
