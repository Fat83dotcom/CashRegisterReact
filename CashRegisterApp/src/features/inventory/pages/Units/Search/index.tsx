import { Stack, Grid } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";

import { unitSearchSchema } from "../../../schemas/unitSearchSchema";
import { useState, useEffect, useCallback } from "react";
import {
  DynamicTable,
  type ColumnConfig,
} from "../../../../../components/Layout/DynamicTable";
import { Form } from "../../../../../components/Form/Form";
import { SearchContainer } from "../../../../../components/Layout/SearchContainer";
import { TextInput } from "../../../../../components/Form/TextInput";

export function UnitSearch() {
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
    // Simulação por enquanto (Mock)
    console.log("Searching Units...");
    setPagedData((prev) => ({ ...prev, page }));
    setLoading(false);
  }, []);

  useEffect(() => {
    handleSearch();
  }, [handleSearch]);

  const columns: ColumnConfig<any>[] = [
    { key: "symbol", label: "Sigla" },
    { key: "name", label: "Nome" },
    { key: "description", label: "Descrição" },
  ];

  return (
    <Stack gap="xl">
      <Form
        schema={unitSearchSchema}
        onSubmit={() => handleSearch(1)}
        defaultValues={{ searchTerm: "" }}
      >
        {() => (
          <SearchContainer
            onSearch={() => handleSearch(1)}
            loading={loading}
            title="Consulta de Unidades de Medida"
          >
            <Grid.Col span={12}>
              <TextInput
                name="searchTerm"
                label="Pesquisar"
                placeholder="Sigla ou nome da unidade"
                leftSection={<IconSearch size={18} stroke={1.5} />}
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
