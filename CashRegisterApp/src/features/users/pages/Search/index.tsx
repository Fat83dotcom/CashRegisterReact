import { Grid } from "@mantine/core";
import { IconUser, IconFingerprint, IconCalendar } from "@tabler/icons-react";
import type { ColumnConfig } from "../../../../components/Layout/DynamicTable";
import { UserService } from "../../api/userService";
import { useSearch } from "../../../../hooks/useSearch";
import type { IGetAllUsersResponse } from "../Interfaces/IGetAllUsersResponse";
import dayjs from "dayjs";
import { TextInput, DateInput } from "../../../../components/Form";
import { searchUserSchema, type SearchUserFormData } from "../../schemas/searchUserSchema";
import { SearchPageTemplate } from "../../../../components/Layout/SearchPageTemplate";
import { ActionConfirmContent } from "../../../../components/Layout/ActionConfirmContent";

export function UserSearch() {
  const initialFilters: SearchUserFormData = {
    name: "",
    taxId: "",
    birthDate: null,
  };

  const { loading, pagedData, selectedId, setSelectedId, handleSearch, handleDeactivate } = useSearch<
    IGetAllUsersResponse,
    SearchUserFormData
  >(UserService.search, initialFilters, {
    action: UserService.deactivate,
    renderContent: (user) => (
      <ActionConfirmContent
        description="O usuário perderá o acesso ao sistema instantaneamente. Poderá ser reativado no futuro."
        itemDetails={`${user.name.firstName} ${user.name.lastName} (Doc: ${user.taxId})`}
        warningMessage="Certifique-se de que não está desativando o seu próprio usuário ativo."
      />
    )
  });

  const columns: ColumnConfig<IGetAllUsersResponse>[] = [
    { key: "id", label: "ID" },
    { key: "name", label: "Nome", render: (item) => `${item.name.firstName} ${item.name.lastName}` },
    { key: "taxId", label: "CPF/CNPJ" },
    { key: "birthdate", label: "Data de Nascimento", render: (item) => dayjs(item.birthdate).format("DD/MM/YYYY") },
  ];

  return (
    <SearchPageTemplate
      title="Consulta de Usuários"
      schema={searchUserSchema}
      defaultValues={initialFilters}
      columns={columns}
      pagedData={pagedData}
      loading={loading}
      onSearch={handleSearch}
      selectedId={selectedId}
      onRowSelect={setSelectedId}
      onDeactivate={handleDeactivate}
    >
      <Grid.Col span={{ base: 12, md: 4 }}>
        <TextInput
          name="name"
          label="Nome"
          placeholder="Nome ou parte do nome"
          leftSection={<IconUser size={18} stroke={1.5} />}
        />
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 4 }}>
        <TextInput
          name="taxId"
          label="CPF/CNPJ"
          placeholder="Digite o documento"
          leftSection={<IconFingerprint size={18} stroke={1.5} />}
        />
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 4 }}>
        <DateInput
          name="birthDate"
          label="Data de Nascimento"
          placeholder="Selecione a data"
          clearable
          leftSection={<IconCalendar size={18} stroke={1.5} />}
        />
      </Grid.Col>
    </SearchPageTemplate>
  );
}
