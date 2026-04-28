import { Grid, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import type { ColumnConfig } from "../../../../../components/Layout/DynamicTable";
import { useSearch } from "../../../../../hooks/useSearch";
import { ActionConfirmContent } from "../../../../../components/Layout/ActionConfirmContent";
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

  const { loading, pagedData, selectedId, setSelectedId, handleSearch, handleDeactivate } =
    useSearch<IConversionResponse, ConversionSearchFormData>(
      InventoryService.searchConversions,
      initialFilters,
      {
        action: InventoryService.deactivateConversion,
        renderContent: (conversion) => {
          const from = `${conversion.fromUnitName || ""} (${conversion.fromUnitSymbol || ""})`.trim();
          const to = `${conversion.toUnitName || ""} (${conversion.toUnitSymbol || ""})`.trim();
          
          return (
            <ActionConfirmContent
              description="Esta regra de conversão será desativada e o sistema não a utilizará mais nos cálculos de movimentação de estoque."
              itemDetails={`Regra: 1 ${from} = ${conversion.multiplier} ${to}`}
              warningMessage={
                conversion.productName 
                  ? `Esta regra é específica para o produto: ${conversion.productName}.` 
                  : "Atenção: Esta é uma regra GERAL. Desativá-la pode impactar todos os produtos que utilizam estas unidades."
              }
            />
          );
        },
      }
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
      onDeactivate={handleDeactivate}
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
