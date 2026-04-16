import { Container, Title, Button, Stack } from "@mantine/core";
import { Form, PasswordInput } from "../../../../components/Form";
import { changePasswordSchema, type ChangePasswordFormData } from "../../schemas/changePasswordSchema";
import { UserService } from "../../../users/api/userService";

export function ChangePassword() {
  const handleSubmit = (values: ChangePasswordFormData, methods: any) => {
    UserService.changePassword(values, () => methods.reset()).then();
  };

  return (
    <Container>
      <Title order={2} mb="lg">Segurança</Title>
      
      <Form
        schema={changePasswordSchema}
        onSubmit={handleSubmit}
        defaultValues={{ oldPassword: "", newPassword: "" }}
      >
        {() => (
          <Stack w={{ base: "100%", sm: 400 }}>
            <PasswordInput
              name="oldPassword"
              label="Senha Atual"
              placeholder="Digite sua senha atual"
              withAsterisk
            />
            <PasswordInput
              name="newPassword"
              label="Nova Senha"
              placeholder="Digite a nova senha"
              withAsterisk
            />
            <Button type="submit" mt="md">
              Alterar Senha
            </Button>
          </Stack>
        )}
      </Form>
    </Container>
  );
}
