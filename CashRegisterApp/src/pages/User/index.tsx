import { Title, Stack, Text } from "@mantine/core";
import { DynamicTable, type ColumnConfig } from "../../Components/DynamicTable";
import type { IGetAllUsersResponse } from "./Interfaces/IGetAllUsersResponse";
import { useEffect, useState } from "react";

import { UserService } from "../../services/userService";

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

export function UserHome() {
  const [userId, setUserId] = useState<string | number | null>();

  const [data, setData] = useState<IGetAllUsersResponse[]>();

  useEffect(() => {
    UserService.getAll()
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error("Erro ao buscar usuários:", error);
      });
  }, []);

  const handleSelectRow = (id: string | number) => {
    // Se clicar no mesmo que já está selecionado, ele limpa (deseleciona). Senão, seleciona o novo.
    setUserId(id === userId ? null : id);
  };

  return (
    <Stack gap="lg">
      <Title order={1}>Usuários Cadastrados</Title>
      <Text>{userId}</Text>

      <DynamicTable
        data={data || []}
        columns={userColumns}
        keyExtractor={(item) => item.id}
        selectedId={userId}
        onRowSelect={handleSelectRow}
      />
    </Stack>
  );
}
