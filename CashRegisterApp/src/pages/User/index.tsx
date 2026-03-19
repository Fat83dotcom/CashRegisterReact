import { Title, Stack } from "@mantine/core";
import { DynamicTable, type ColumnConfig } from "../../Components/DynamicTable";
import type { IGetAllUsersResponse } from "./Interfaces/IGetAllUsersResponse";
import { useEffect, useState } from "react";
import { UserService } from "../../services/userService";
import { UserSearch } from "./Search";

const userColumns: ColumnConfig<IGetAllUsersResponse>[] = [
  {
    key: "id",
    label: "ID",
  },
  {
    key: "name",
    label: "Nome Completo",
    render: (user) =>
      user.name
        ? `${user.name.firstName} ${user.name.lastName}`
        : "Não informado",
  },
  {
    key: "document",
    label: "Documento",
    render: (user) => user.document || "-",
  },
  {
    key: "birthdate",
    label: "Data de Nascimento",
    render: (user) => new Date(user.birthdate).toLocaleDateString("pt-BR"),
  },
];

// 4. O componente da página
export function UserHome() {
  const [userId, setUserId] = useState<string | number | null>();

  const [data, setData] = useState<IGetAllUsersResponse[]>([]);

  const handleGetAllUsers = async () => {
    await UserService.getAll()
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error("Erro ao buscar usuários:", error);
      });
  };

  useEffect(() => {
    handleGetAllUsers();
  }, []);

  const handleSelectRow = (id: string | number) => {
    setUserId(id === userId ? null : id);
  };

  const handleDeactivateUser = async (selectedId: string | number) => {
    await UserService.deactivate(selectedId).finally(() => {
      handleGetAllUsers();
    });
  };

  return (
    <Stack gap="lg">
      <Title order={1}>Usuários Cadastrados</Title>
      <UserSearch />
      <DynamicTable
        data={data || []}
        columns={userColumns}
        keyExtractor={(item) => item.id}
        selectedId={userId}
        onRowSelect={handleSelectRow}
        withPagination
        onDeactivate={handleDeactivateUser}
      />
    </Stack>
  );
}
