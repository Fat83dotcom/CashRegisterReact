import { Grid } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import type { ColumnConfig } from "../../../../../components/Layout/DynamicTable";
import { useSearch } from "../../../../../hooks/useSearch";
import { TextInput } from "../../../../../components/Form";
import { ActionConfirmContent } from "../../../../../components/Layout/ActionConfirmContent";

import { SearchPageTemplate } from "../../../../../components/Layout/SearchPageTemplate";
import {
  unitSearchSchema,
  type UnitSearchFormData,
} from "../../../schemas/unitSearchSchema";
import type { IUnitResponse } from "../../../interfaces";
import { InventoryService } from "../../../api/inventoryService";

export function UnitSearch() {
  const initialFilters: UnitSearchFormData = {
    searchTerm: "",
  };

  const { loading, pagedData, selectedId, setSelectedId, handleSearch, handleDeactivate } =
    useSearch<IUnitResponse, UnitSearchFormData>(
      InventoryService.searchUnits,
      initialFilters,
      {
        action: InventoryService.deactivateUnit,
        renderContent: (unit) => (
          <ActionConfirmContent
            description="Esta unidade de medida será desativada do sistema e não aparecerá para novas seleções."
            itemDetails={`${unit.name} (${unit.code})`}
            warningMessage="Produtos e conversões que já utilizam esta unidade manterão o histórico, mas você não poderá criar novas associações."
          />
        ),
      }
    );

  const columns: ColumnConfig<IUnitResponse>[] = [
    { key: "code", label: "Sigla/Código" },
    { key: "name", label: "Nome" },
    {
      key: "allowDecimals",
      label: "Permite Decimais?",
      render: (item) => (item.allowDecimals ? "Sim" : "Não"),
    },
  ];

  return (
    <SearchPageTemplate
      title="Consulta de Unidades de Medida"
      schema={unitSearchSchema}
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
          placeholder="Código ou Nome da unidade"
          leftSection={<IconSearch size={18} stroke={1.5} />}
        />
      </Grid.Col>
    </SearchPageTemplate>
  );
}
