import { Grid } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import type { ColumnConfig } from "../../../../../components/Layout/DynamicTable";
import { useSearch } from "../../../../../hooks/useSearch";
import { Select } from "../../../../../components/Form";
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
    { key: "fromUnitSymbol", label: "Origem" },
    { key: "multiplier", label: "Multiplicador" },
    { key: "toUnitSymbol", label: "Destino" },
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
        <Select
          name="unitId"
          label="Filtrar por Unidade"
          placeholder="Selecione uma unidade para ver suas regras"
          leftSection={<IconSearch size={18} stroke={1.5} />}
          data={[
            { value: "1", label: "Caixa (CX)" },
            { value: "2", label: "Fardo (FD)" },
          ]}
          clearable
        />
      </Grid.Col>
    </SearchPageTemplate>
  );
}
