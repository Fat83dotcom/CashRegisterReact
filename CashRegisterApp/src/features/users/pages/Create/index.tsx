import { Button, Center, Grid, Paper, Divider, Text, Title } from "@mantine/core";
import dayjs from "dayjs";

// Nossos novos Wrappers da Camada 2/3
import { Form, TextInput, Select } from "../../../../components/Form";

// Schema (Camada 1)
import { userSchema, type UserFormData } from "../../schemas/userSchema";

// Dependências legadas / lógicas atuais da feature
import { UserService } from "../../api/userService";
import { PasswordManager } from "../../../../components/Layout/PasswordManager";
import { PersonForm } from "../../../person/components/PersonForm";
import { PersonSelect } from "../../../person/components/PersonSelect";

export function CreateUser() {
  const handleSubmit = (userValues: UserFormData, methods: any) => {
    const isNewPerson = !userValues.personId;

    const userRequest = {
      ...userValues,
      personId: userValues.personId ? Number(userValues.personId) : undefined,
    };

    let personRequest;
    if (isNewPerson && userValues.person) {
      personRequest = {
        ...userValues.person,
        personType: Number(userValues.person.personType),
        birthdate: dayjs(userValues.person.birthdate).format("YYYY-MM-DDT00:00:00Z"),
      };
    }

    const payload = { userRequest, personRequest };

    UserService.create(payload, () => {
      methods.reset();
    }).then();
  };

  return (
    <Paper withBorder shadow="md" p="xl" maw="800px" mx="auto" mt="xl">
      <Title order={2} ta="center" mb="xl" c="brainstorm.6">
        Cadastrar Usuário
      </Title>

      <Form
        schema={userSchema}
        onSubmit={handleSubmit}
        defaultValues={{
          role: "Business",
          password: "",
          userName: "",
          personId: undefined,
          person: {
            personType: 1,
            firstName: "",
            lastName: "",
            taxId: "",
            email: "",
            tradeName: "",
            stateRegistration: "",
            municipalRegistration: "",
            cellPhone: "",
            phone: "",
            gender: "",
          },
        }}
      >
        {({ watch, setValue, formState: { errors }, clearErrors }) => {
          const personId = watch("personId");
          const isExistingPerson = !!personId;

          return (
            <Grid gutter="md">
              <Grid.Col span={12}>
                <PersonSelect
                  value={personId?.toString() || null}
                  onChange={(val) => {
                    const id = val ? parseInt(val) : undefined;
                    setValue("personId", id, { shouldValidate: true });
                    if (id) {
                      clearErrors("person");
                    }
                  }}
                  error={errors.personId?.message?.toString()}
                />
              </Grid.Col>

              {!isExistingPerson && (
                <>
                  <Grid.Col span={12}>
                    <Divider label="Dados da Nova Pessoa" labelPosition="center" my="md" />
                  </Grid.Col>
                  <Grid.Col span={12}>
                    <PersonForm />
                  </Grid.Col>
                </>
              )}

              {isExistingPerson && (
                <Grid.Col span={12}>
                  <Paper p="sm" withBorder bg="var(--mantine-color-blue-light)">
                    <Text size="sm" ta="center" fw={500}>
                      Modo de Vínculo: A pessoa selecionada será associada a este novo usuário.
                    </Text>
                  </Paper>
                </Grid.Col>
              )}

              <Grid.Col span={12}>
                <Divider label="Dados de Acesso" labelPosition="center" my="md" />
              </Grid.Col>

              <Grid.Col span={6}>
                <TextInput
                  name="userName"
                  label="Nome de usuário"
                  placeholder="Ex: joao.silva"
                  withAsterisk
                />
              </Grid.Col>

              <Grid.Col span={6}>
                <Select
                  name="role"
                  label="Setor"
                  withAsterisk
                  data={[
                    { value: "Admin", label: "Administrador" },
                    { value: "Business", label: "Negócios" },
                    { value: "Financial", label: "Financeiro" },
                    { value: "Logistics", label: "Logística" },
                  ]}
                />
              </Grid.Col>

              <Grid.Col span={12}>
                <PasswordManager
                  getInputProps={{
                    value: watch("password"),
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                      setValue("password", e.target.value, { shouldValidate: true }),
                    error: errors.password?.message?.toString(),
                  }}
                  props={{
                    label: "Senha",
                    placeholder: "Mínimo 12 caracteres",
                    withAsterisk: true,
                    value: watch("password"),
                  }}
                />
              </Grid.Col>

              <Center mt="xl" style={{ width: "100%" }}>
                <Button 
                  type="submit" 
                  fullWidth
                  size="md"
                  color="brainstorm.6"
                  variant="light"
                >
                  Finalizar Cadastro
                </Button>
              </Center>
            </Grid>
          );
        }}
      </Form>
    </Paper>
  );
}
