import {
  Button,
  Center,
  Grid,
  Paper,
  Select,
  TextInput,
  Divider,
  Text,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import classes from "./CreateUser.module.css";

import { UserService } from "../../../services/userService";
import type { ICreateUserRequest } from "../Interfaces/ICreateUserRequest";

import dayjs from "dayjs";
import { PasswordManager } from "../../../Components/PasswordManager";
import { PersonForm } from "../../../Components/Person/PersonForm";
import { PersonSelect } from "../../../Components/Person/PersonSelect";

export function CreateUser() {
  const form = useForm<ICreateUserRequest>({
    initialValues: {
      firstName: "",
      lastName: "",
      birthDate: "",
      document: "",
      email: "",
      cellPhone: "",
      phone: "",
      gender: "Other",
      role: "Business",
      password: "",
      userName: "",
      personId: undefined,
    },
    validate: {
      userName: (value) =>
        value.length === 0 ? "O nome de usuário é obrigatório." : null,
      role: (value) => (value ? null : "O papel do usuário é obrigatório"),
      password: (value) =>
        !value || value.length === 0
          ? "A senha é obrigatória."
          : value.length < 12
            ? "A senha deve conter no mínimo 12 caracteres"
            : null,

      // Validações condicionais: Só validam se personId não estiver preenchido
      firstName: (value, values) =>
        !values.personId && (!value || value.trim().length === 0)
          ? "Nome é obrigatório."
          : null,

      lastName: (value, values) =>
        !values.personId && (!value || value.trim().length === 0)
          ? "Sobrenome é obrigatório."
          : null,

      birthDate: (value, values) =>
        !values.personId && !value ? "Data de nascimento é obrigatória." : null,

      document: (value, values) =>
        !values.personId && (!value || value.length !== 11)
          ? "Documento deve ter 11 dígitos."
          : null,

      email: (value, values) =>
        !values.personId &&
        (!value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          ? "E-mail inválido."
          : null,

      phone: (value, values) =>
        !values.personId && (!value || value.length < 10)
          ? "Telefone inválido."
          : null,
    },
  });

  function handleSubmit(values: ICreateUserRequest) {
    const transformedValues = {
      ...values,
      personId: values.personId ? Number(values.personId) : undefined,
      // Se tiver personId, ignoramos os campos de nova pessoa no envio
      birthDate:
        values.birthDate && !values.personId
          ? dayjs(values.birthDate).format("YYYY-MM-DDT00:00:00Z")
          : undefined,
    };
    UserService.create(transformedValues, form.reset).then();
  }

  const isExistingPerson = !!form.values.personId;

  return (
    <Paper
      withBorder
      shadow="md"
      p="xl"
      radius="md"
      maw="800px"
      mx="auto"
      mt="xl"
    >
      <h1 className={classes.centerText}>Cadastrar Usuário</h1>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Grid gutter="md">
          {/* Seção 1: Seleção de Pessoa */}
          <Grid.Col span={12}>
            <PersonSelect
              value={form.values.personId?.toString() || null}
              onChange={(val) => {
                const id = val ? parseInt(val) : undefined;
                form.setFieldValue("personId", id);
                // Limpa erros de campos de pessoa quando uma pessoa é selecionada
                if (id) {
                  form.clearErrors();
                }
              }}
              error={form.errors.personId}
            />
          </Grid.Col>

          {!isExistingPerson && (
            <>
              <Grid.Col span={12}>
                <Divider
                  label="Dados da Nova Pessoa"
                  labelPosition="center"
                  my="md"
                />
              </Grid.Col>
              <Grid.Col span={12}>
                <PersonForm form={form} />
              </Grid.Col>
            </>
          )}

          {isExistingPerson && (
            <Grid.Col span={12}>
              <Paper p="sm" withBorder bg="var(--mantine-color-blue-light)">
                <Text size="sm" ta="center" fw={500}>
                  Modo de Vínculo: A pessoa selecionada será associada a este
                  novo usuário.
                </Text>
              </Paper>
            </Grid.Col>
          )}

          <Grid.Col span={12}>
            <Divider label="Dados de Acesso" labelPosition="center" my="md" />
          </Grid.Col>

          <Grid.Col span={6}>
            <TextInput
              withAsterisk
              label="Nome de usuário"
              placeholder="Ex: joao.silva"
              {...form.getInputProps("userName")}
            />
          </Grid.Col>

          <Grid.Col span={6}>
            <Select
              withAsterisk
              label="Papel (Role)"
              data={[
                { value: "Admin", label: "Administrador" },
                { value: "Business", label: "Negócios" },
                { value: "Financial", label: "Financeiro" },
                { value: "Logistics", label: "Logística" },
              ]}
              {...form.getInputProps("role")}
            />
          </Grid.Col>

          <Grid.Col span={12}>
            <PasswordManager
              getInputProps={form.getInputProps("password")}
              props={{
                label: "Senha",
                placeholder: "Mínimo 12 caracteres",
                withAsterisk: true,
                value: form.values.password,
              }}
            />
          </Grid.Col>
        </Grid>

        <Center mt="xl">
          <Button type="submit" size="md" fullWidth>
            Finalizar Cadastro
          </Button>
        </Center>
      </form>
    </Paper>
  );
}
