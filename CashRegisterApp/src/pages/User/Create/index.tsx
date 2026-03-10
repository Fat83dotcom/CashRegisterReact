import { Button, Grid, Paper, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import classes from "./CreateUser.module.css";

import { UserService } from "../../../services/userService";
import type { ICreateUserRequest } from "../Interfaces/ICreateUserRequest";

import { DateInputBr } from "../../../Components/DateInputPt-BR";
import dayjs from "dayjs";

export function CreateUser() {
  const form = useForm<ICreateUserRequest>({
    initialValues: {
      firstName: "",
      lastName: "",
      birthDate: "",
      document: "",
    },
    validate: {
      firstName: (value) =>
        value.length == 0
          ? `Nome é obrigatório. Você digitou ${value.length} caracteres.`
          : value.length > 20
            ? `O primeiro nome deve conter até 20 caracteres, sua entrada contém ${value.length} caracteres.`
            : null,

      lastName: (value) =>
        value.length === 0
          ? `O segundo nome é obrigatório. Você digitou ${value.length} caracteres.`
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
      maw={500}
      mx="auto"
      mt="xl"
      h="100%"
    >
      <>
        <h1 className={`${classes.centerText}`}>Cadastrar Usuário</h1>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Grid grow gutter={{ base: 5, xs: "md", md: "xl", xl: 50 }}>
            <Grid.Col span={12}>
              <TextInput
                withAsterisk
                size="xl"
                label="Nome"
                placeholder="Digite o primeiro nome"
                {...form.getInputProps("firstName")}
              />
            </Grid.Col>
            <Grid.Col span={12}>
              <TextInput
                withAsterisk
                size="xl"
                label="Sobrenome"
                placeholder="Digite o segundo nome"
                {...form.getInputProps("lastName")}
              />
            </Grid.Col>
            <Grid.Col span={12}>
              <DateInputBr
                props={{
                  label: "Data de Nascimento",
                  placeholder: "Digite a sua data de nascimento",
                  value: form.values.birthDate,
                  size: "xl",
                }}
                getInputProps={form.getInputProps("birthDate")}
              />
            </Grid.Col>
            <Grid.Col span={12}>
              <TextInput
                withAsterisk
                size="xl"
                label="Documento"
                placeholder="Digite o documento"
                {...form.getInputProps("document")}
              />
            </Grid.Col>
            <Grid.Col>
              <Button fullWidth p={10} mt={15} size="xl" type="submit">
                Salvar
              </Button>
            </Grid.Col>
          </Grid>
        </form>
      </>
    </Paper>
  );
}
