import { Container, Title, Button, PasswordInput, Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import type { IChangePasswordRequest } from "../Interfaces/IChangePasswordRequest";
import { UserService } from "../../../services/userService";

export function ChangePassword() {
  const form = useForm<IChangePasswordRequest>({
    initialValues: {
      oldPassword: "",
      newPassword: "",
    },
    validate: {
      oldPassword: (value) => (value.length < 6 ? "Senha atual muito curta" : null),
      newPassword: (value) => (value.length < 6 ? "Nova senha deve ter pelo menos 6 caracteres" : null),
    },
  });

  const handleSubmit = (values: IChangePasswordRequest) => {
    UserService.changePassword(values, form.reset).then();
  };

  return (
    <Container>
      <Title order={2} mb="lg">Segurança</Title>
      
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack w={{ base: "100%", sm: 400 }}>
          <PasswordInput
            label="Senha Atual"
            placeholder="Digite sua senha atual"
            withAsterisk
            {...form.getInputProps("oldPassword")}
          />
          <PasswordInput
            label="Nova Senha"
            placeholder="Digite a nova senha"
            withAsterisk
            {...form.getInputProps("newPassword")}
          />
          <Button type="submit" mt="md">
            Alterar Senha
          </Button>
        </Stack>
      </form>
    </Container>
  );
}
