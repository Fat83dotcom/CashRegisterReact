import { Grid } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import type { ColumnConfig } from "../../../../../components/Layout/DynamicTable";
import { useSearch } from "../../../../../hooks/useSearch";
import { TextInput, AsyncSelect } from "../../../../../components/Form";
import { ActionConfirmContent } from "../../../../../components/Layout/ActionConfirmContent";
import { SearchPageTemplate } from "../../../../../components/Layout/SearchPageTemplate";
import {
  productSearchSchema,
  type ProductSearchFormData,
} from "../../../schemas/productSearchSchema";
import type { IProductResponse, ICategoryResponse } from "../../../interfaces";
import { InventoryService } from "../../../api/inventoryService";
import { useGenericModal } from "../../../../../hooks/useGenericModal";
import { UpdateProductForm } from "../../../components/UpdateProductForm";

const fetchCategories = async (query: string) => {
  const response = await InventoryService.searchCategories({
    name: query,
    page: 1,
    pageSize: 20,
  });
  return response.items || [];
};

export function ProductSearch() {
  const initialFilters: ProductSearchFormData = {
    searchTerm: "",
    categoryId: "",
  };

  const modal = useGenericModal();

  const handleEditTrigger = (id: string | number) => {
    modal({
      title: "Editar Produto",
      Form: (props) => <UpdateProductForm productId={Number(id)} {...props} />,
    });
  };

  const {
    loading,
    pagedData,
    selectedId,
    setSelectedId,
    handleSearch,
    handleDeactivate,
  } = useSearch<IProductResponse, ProductSearchFormData>(
    InventoryService.searchProducts,
    initialFilters,
    {
      action: InventoryService.deactivateProduct,
      renderContent: (product) => {
        return (
          <ActionConfirmContent
            description="Este produto será desativado do sistema e não aparecerá para novas vendas."
            itemDetails={`${product.name} (SKU: ${product.sku})`}
            warningMessage="Certifique-se de que não há estoque ativo que precise ser ajustado."
          />
        );
      },
    },
  );

  const columns: ColumnConfig<IProductResponse>[] = [
    { key: "sku", label: "SKU" },
    { key: "name", label: "Nome" },
    { key: "category", label: "Categoria" },
    { key: "uomSymbol", label: "UM" },
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
      onRowSelect={(id) => setSelectedId((prev) => (prev === id ? null : id))}
      onRowDoubleClick={handleEditTrigger}
      onDeactivate={handleDeactivate}
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
        <AsyncSelect<ICategoryResponse>
          name="categoryId"
          label="Categoria"
          fetcher={fetchCategories}
          getLabel={(item) =>
            item.parentCategoryName
              ? `${item.parentCategoryName} - ${item.name}`
              : item.name || ""
          }
          getValue={(item) => item.id?.toString() || ""}
          clearable
        />
      </Grid.Col>
    </SearchPageTemplate>
  );
}
