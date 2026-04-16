import { Stack, Grid } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";

import { conversionSearchSchema } from "../../../schemas/conversionSearchSchema";
import { useState, useEffect, useCallback } from "react";
import {
  DynamicTable,
  type ColumnConfig,
} from "../../../../../components/Layout/DynamicTable";
import { Form } from "../../../../../components/Form/Form";
import { SearchContainer } from "../../../../../components/Layout/SearchContainer";
import { Select } from "../../../../../components/Form/Select";

export function ConversionSearch() {
  const [loading, setLoading] = useState(false);
  const [selectedId, setSelectedId] = useState<string | number | null>(null);
  const [pagedData, setPagedData] = useState({
    items: [],
    totalCount: 0,
    page: 1,
    pageSize: 10,
    totalPages: 0,
  });

  const handleSearch = useCallback(async (page = 1) => {
    setLoading(true);
    // Simulação (Mock)
    console.log("Searching Conversions...");
    setPagedData((prev) => ({ ...prev, page }));
    setLoading(false);
  }, []);

  useEffect(() => {
    handleSearch();
  }, [handleSearch]);

  const columns: ColumnConfig<any>[] = [
    { key: "fromUnit", label: "Origem" },
    { key: "factor", label: "Fator" },
    { key: "toUnit", label: "Destino" },
    { key: "description", label: "Observação" },
  ];

  return (
    <Stack gap="xl">
      <Form
        schema={conversionSearchSchema}
        onSubmit={() => handleSearch(1)}
        defaultValues={{ unitId: "" }}
      >
        {() => (
          <SearchContainer
            onSearch={() => handleSearch(1)}
            loading={loading}
            title="Consulta de Regras de Conversão"
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
              />
            </Grid.Col>
          </SearchContainer>
        )}
      </Form>

      <DynamicTable
        data={pagedData.items}
        columns={columns}
        keyExtractor={(item: any) => item.id}
        loading={loading}
        totalCount={pagedData.totalCount}
        page={pagedData.page}
        pageSize={pagedData.pageSize}
        onPageChange={handleSearch}
        selectedId={selectedId}
        onRowSelect={setSelectedId}
      />
    </Stack>
  );
}
