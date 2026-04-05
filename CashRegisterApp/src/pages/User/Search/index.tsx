import { Grid, TextInput, Stack } from "@mantine/core";
import { DateInputBr } from "../../../Components/DateInputPt-BR";
import { useForm } from "@mantine/form";
import { SearchContainer } from "../../../Components/SearchContainer";
import { DynamicTable } from "../../../Components/DynamicTable";
import type { ColumnConfig } from "../../../Components/DynamicTable";
import { UserService } from "../../../services/userService";
import type { IPagedResponse } from "../../../services/userService";
import { useState, useEffect, useCallback } from "react";
import type { IGetAllUsersResponse } from "../Interfaces/IGetAllUsersResponse";
import dayjs from "dayjs";

export function UserSearch() {
  const [loading, setLoading] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | number | null>(null);
  const [pagedData, setPagedData] = useState<IPagedResponse<IGetAllUsersResponse>>({
    items: [],
    totalCount: 0,
    page: 1,
    pageSize: 10,
    totalPages: 0,
  });

  const form = useForm({
    initialValues: {
      name: "",
      document: "",
      birthDate: "" as string | Date,
    },
  });

  const handleSearch = useCallback(async (page = 1, pageSize = pagedData.pageSize) => {
    setLoading(true);
    try {
      const response = await UserService.search({
        name: form.values.name,
        document: form.values.document,
        birthDate: form.values.birthDate,
        page,
        pageSize,
      });
      setPagedData(response);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    } finally {
      setLoading(false);
    }
  }, [form.values, pagedData.pageSize]);

  // Busca inicial
  useEffect(() => {
    handleSearch();
  }, []);

  const columns: ColumnConfig<IGetAllUsersResponse>[] = [
    { 
      key: "id", 
      label: "ID" 
    },
    { 
      key: "name", 
      label: "Nome", 
      render: (item) => `${item.name.firstName} ${item.name.lastName}` 
    },
    { 
      key: "document", 
      label: "Documento" 
    },
    { 
      key: "birthdate", 
      label: "Data de Nascimento",
      render: (item) => dayjs(item.birthdate).format("DD/MM/YYYY")
    },
  ];

  const handleDeactivate = async (id: string | number) => {
    try {
      await UserService.deactivate(id);
      handleSearch(pagedData.page); // Recarrega a página atual
      setSelectedUserId(null);
    } catch (error) {
      console.error("Erro ao desativar usuário:", error);
    }
  };

  return (
    <Stack gap="xl">
      <SearchContainer 
        onSearch={() => handleSearch(1)} 
        loading={loading} 
        title="Filtros de Busca"
      >
        <Grid.Col span={{ base: 12, md: 4 }}>
          <TextInput
            size="sm"
            label="Nome"
            placeholder="Digite um nome"
            {...form.getInputProps("name")}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 4 }}>
          <TextInput
            size="sm"
            label="Documento"
            placeholder="Digite um documento"
            {...form.getInputProps("document")}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 4 }}>
          <DateInputBr
            props={{
              label: "Data de Nascimento",
              placeholder: "Selecione a data",
              clearable: true,
            }}
            getInputProps={form.getInputProps("birthDate")}
          />
        </Grid.Col>
      </SearchContainer>

      <DynamicTable<IGetAllUsersResponse>
        data={pagedData.items}
        columns={columns}
        keyExtractor={(item) => item.id}
        loading={loading}
        totalCount={pagedData.totalCount}
        page={pagedData.page}
        pageSize={pagedData.pageSize}
        onPageChange={(page) => handleSearch(page)}
        onPageSizeChange={(size) => handleSearch(1, parseInt(size))}
        selectedId={selectedUserId}
        onRowSelect={(id) => setSelectedUserId(id)}
        onDeactivate={handleDeactivate}
      />
    </Stack>
  );
}
