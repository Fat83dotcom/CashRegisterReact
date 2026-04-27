import { Grid, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import type { ColumnConfig } from "../../../../../components/Layout/DynamicTable";
import { useSearch } from "../../../../../hooks/useSearch";
import {
  conversionSearchSchema,
  type ConversionSearchFormData,
} from "../../../schemas/conversionSearchSchema";
import { SearchPageTemplate } from "../../../../../components/Layout/SearchPageTemplate";
import { InventoryService } from "../../../api/inventoryService";
import type { IConversionResponse } from "../../../interfaces";

export function ConversionSearch() {
  const initialFilters: ConversionSearchFormData = {
    unitId: "",
  };

  const { loading, pagedData, selectedId, setSelectedId, handleSearch } =
    useSearch<IConversionResponse, ConversionSearchFormData>(
      InventoryService.searchConversions,
      initialFilters,
    );

  const columns: ColumnConfig<IConversionResponse>[] = [
    {
      key: "fromUnitName",
      label: "Origem",
      render: (item) =>
        `${item.fromUnitName || ""} (${item.fromUnitSymbol || ""})`.trim(),
    },
    { key: "multiplier", label: "Multiplicador" },
    {
      key: "toUnitName",
      label: "Destino",
      render: (item) =>
        `${item.toUnitName || ""} (${item.toUnitSymbol || ""})`.trim(),
    },
    {
      key: "productName",
      label: "Produto",
      render: (item) => item.productName || "Geral",
    },
    {
      key: "isActive",
      label: "Status",
      render: (item) => (item.isActive ? "Ativo" : "Inativo"),
    },
  ];

  return (
    <SearchPageTemplate
      title="Consulta de Regras de Conversão"
      schema={conversionSearchSchema}
      defaultValues={initialFilters}
      columns={columns}
      pagedData={pagedData}
      loading={loading}
      onSearch={handleSearch}
      selectedId={selectedId}
      onRowSelect={setSelectedId}
    >
      <Grid.Col span={12}>
        <TextInput
          name="searchTerm"
          label="Pesquisar"
          placeholder="Qualquer coisa"
          leftSection={<IconSearch size={18} stroke={1.5} />}
        />
      </Grid.Col>
    </SearchPageTemplate>
  );
}
