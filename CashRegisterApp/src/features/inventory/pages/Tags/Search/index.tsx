import { Grid, ColorSwatch, Group, Text } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import type { ColumnConfig } from "../../../../../components/Layout/DynamicTable";
import { useSearch } from "../../../../../hooks/useSearch";
import { TextInput } from "../../../../../components/Form";
import { ActionConfirmContent } from "../../../../../components/Layout/ActionConfirmContent";
import { SearchPageTemplate } from "../../../../../components/Layout/SearchPageTemplate";
import {
  tagSearchSchema,
  type TagSearchFormData,
} from "../../../schemas/tagSearchSchema";
import type { ITagResponse } from "../../../interfaces";
import { InventoryService } from "../../../api/inventoryService";

export function TagSearch() {
  const initialFilters: TagSearchFormData = {
    searchTerm: "",
  };

  const {
    loading,
    pagedData,
    selectedId,
    setSelectedId,
    handleSearch,
    handleDeactivate,
  } = useSearch<ITagResponse, TagSearchFormData>(
    InventoryService.searchTags,
    initialFilters,
    {
      action: InventoryService.deactivateTag,
      renderContent: (tag) => {
        return (
          <ActionConfirmContent
            description="Esta tag será desativada do sistema e não poderá mais ser vinculada a produtos."
            itemDetails={`${tag.name}`}
            warningMessage="Os produtos que já possuem essa tag poderão continuar a exibi-la dependendo da regra de negócio."
          />
        );
      },
    },
  );

  const columns: ColumnConfig<ITagResponse>[] = [
    {
      key: "name",
      label: "Identificação da Tag",
      render: (item) => (
        <Group gap="sm">
          {item.colorHex && <ColorSwatch color={item.colorHex} size={18} />}
          <Text size="sm">{item.name}</Text>
        </Group>
      ),
    },
    {
      key: "isActive",
      label: "Status",
      render: (item) => (item.isActive ? "Ativo" : "Inativo"),
    },
  ];

  return (
    <SearchPageTemplate
      title="Consulta de Tags"
      schema={tagSearchSchema}
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
          label="Nome da Tag"
          placeholder="Pesquisar..."
          leftSection={<IconSearch size={18} stroke={1.5} />}
        />
      </Grid.Col>
    </SearchPageTemplate>
  );
}
