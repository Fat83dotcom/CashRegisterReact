import { Stack, Grid } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";

import { categorySearchSchema } from "../../../schemas/categorySearchSchema";
import { useState, useEffect, useCallback } from "react";
import {
  DynamicTable,
  type ColumnConfig,
} from "../../../../../components/Layout/DynamicTable";
import { Form } from "../../../../../components/Form/Form";
import { SearchContainer } from "../../../../../components/Layout/SearchContainer";
import { TextInput } from "../../../../../components/Form/TextInput";

export function CategorySearch() {
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
    console.log("Searching Categories...");
    setPagedData((prev) => ({ ...prev, page }));
    setLoading(false);
  }, []);

  useEffect(() => {
    handleSearch();
  }, [handleSearch]);

  const columns: ColumnConfig<any>[] = [
    { key: "name", label: "Nome" },
    { key: "description", label: "Descrição" },
  ];

  return (
    <Stack gap="xl">
      <Form
        schema={categorySearchSchema}
        onSubmit={() => handleSearch(1)}
        defaultValues={{ name: "" }}
      >
        {() => (
          <SearchContainer
            onSearch={() => handleSearch(1)}
            loading={loading}
            title="Consulta de Categorias"
          >
            <Grid.Col span={12}>
              <TextInput
                name="name"
                label="Nome"
                placeholder="Nome da categoria"
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
