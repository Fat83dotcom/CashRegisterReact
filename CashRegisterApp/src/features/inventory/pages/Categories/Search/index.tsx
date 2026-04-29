import { Grid } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
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

export function CategorySearch() {
  const initialFilters: CategorySearchFormData = {
    name: "",
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
      action: InventoryService.deactivateConversion,
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
      label: "Categoria Pai",
      render: (item) => item.parentCategoryName || "-",
    },
    {
      key: "isActive",
      label: "Status",
      render: (item) => (item.isActive ? "Ativo" : "Inativo"),
    },
  ];

  return (
    <SearchPageTemplate
      title="Consulta de Categorias"
      schema={categorySearchSchema}
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
          name="name"
          label="Nome"
          placeholder="Nome da categoria"
          leftSection={<IconSearch size={18} stroke={1.5} />}
        />
      </Grid.Col>
    </SearchPageTemplate>
  );
}
