import { Button, Grid, Paper, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import classes from "./CreateUser.module.css";

import { UserService } from "../../../services/userService";
import type { ICreateUserRequest } from "../Interfaces/ICreateUserRequest";

import { DateInputBr } from "../../../Components/DateInputPt-BR";
import dayjs from "dayjs";
import { PasswordManager } from "../../../Components/PasswordManager";

export function CreateUser() {
  const form = useForm<ICreateUserRequest>({
    initialValues: {
      firstName: "",
      lastName: "",
      birthDate: "",
      document: "",
      email: "",
      passWord: "",
      userName: "",
    },
    validate: {
      firstName: (value) =>
        value.length == 0
          ? `Nome é obrigatório.`
          : value.length > 20
            ? `O primeiro nome deve conter até 20 caracteres, sua entrada contém ${value.length} caracteres.`
            : null,

      lastName: (value) =>
        value.length === 0
          ? `O segundo nome é obrigatório.`
          : value.length > 20
            ? `O primeiro nome deve conter até 20 caracteres, sua entrada contém ${value.length} caracteres.`
            : null,
      document: (value) =>
        value.length === 0
          ? "O documento é obrigatório."
          : value.length > 11
            ? `O documento deve conter no máximo 11 caracteres, sua entrada contém ${value.length} caracteres.`
            : null,
      birthDate: (value) =>
        !value ? "A data de nascimento é obrigatória" : null,
      email: (value) =>
        value.length === 0
          ? "O email é obrigatório."
          : /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
            ? null
            : "Formato de e-mail inválido.",
      passWord: (value) =>
        value.length === 0
          ? "A senha é obrigatória."
          : value.length <= 12
            ? "A senha deve conter no mínimo 12 caracteres"
            : null,
      userName: (value) =>
        value.length > 50
          ? "O nome deve ser menor ou igual a 50 caracteres."
          : value.length === 0
            ? "O nome de usuário é obrigatório."
            : null,
    },
  });

  function handleSubmit(values: typeof form.values) {
    const transformedValues = {
      ...values,
      birthDate: values.birthDate
        ? dayjs(values.birthDate).format("YYYY-MM-DDT00:00:00Z")
        : "",
    };
    UserService.create(transformedValues).then(() => form.reset());
  }

  return (
    <Paper
      withBorder
      shadow="md"
      p="xl"
      radius="md"
      maw="100%"
      mx="auto"
      mt="xl"
      h="100%"
    >
      <>
        <h1 className={`${classes.centerText}`}>Cadastrar Usuário</h1>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Grid grow gutter={{ base: 5, xs: "md", md: "xl", xl: 50 }}>
            <Grid.Col span={6}>
              <TextInput
                withAsterisk
                size="md"
                label="Nome"
                placeholder="Digite o primeiro nome"
                {...form.getInputProps("firstName")}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                withAsterisk
                size="md"
                label="Sobrenome"
                placeholder="Digite o segundo nome"
                {...form.getInputProps("lastName")}
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <DateInputBr
                props={{
                  label: "Data de Nascimento",
                  placeholder: "Digite a sua data de nascimento",
                  value: form.values.birthDate,
                  size: "md",
                  withAsterisk: true,
                }}
                getInputProps={form.getInputProps("birthDate")}
              />
            </Grid.Col>
            <Grid.Col span={8}>
              <TextInput
                withAsterisk
                size="md"
                label="Documento"
                placeholder="Digite o documento"
                {...form.getInputProps("document")}
              />
            </Grid.Col>

            <Grid.Col span={6}>
              <TextInput
                withAsterisk
                size="md"
                label="Email"
                placeholder="Digite seu email."
                {...form.getInputProps("email")}
              />
            </Grid.Col>

            <Grid.Col span={6}>
              <PasswordManager
                getInputProps={form.getInputProps("passWord")}
                props={{
                  label: "Senha",
                  size: "md",
                  placeholder: "Digite a senha.",
                  withAsterisk: true,
                  value: form.values.passWord,
                }}
              />
            </Grid.Col>

            <Grid.Col span={8}>
              <TextInput
                withAsterisk
                size="md"
                label="Nome de usuário"
                placeholder="Exemplo: zenenen"
                {...form.getInputProps("userName")}
              />
            </Grid.Col>

            <Grid.Col>
              <Button fullWidth p={10} mt={15} size="md" type="submit">
                Salvar
              </Button>
            </Grid.Col>
          </Grid>
        </form>
      </>
    </Paper>
  );
}
