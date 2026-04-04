import {
  Anchor,
  Button,
  Center,
  Group,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export function Login() {
  const form = useForm<ILoginProps>({
    initialValues: {
      userName: "",
      password: "",
    },
  });

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (values: typeof form.values) => {
    await login(values);
    navigate("/");
  };

  return (
    <Center h="100vh" bg="gray">
      <Paper w={400} radius="md" p="xl" withBorder shadow="md">
        <Title order={2} ta="center" mb="lg">
          Login
        </Title>

        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            label="Usuário"
            placeholder="Seu nome de usuário"
            required
            value={form.values.userName}
            {...form.getInputProps("userName")}
            mb="md"
          />

          <Group justify="space-between" mb={5}>
            <Text component="label" htmlFor="your-password" size="sm" fw={500}>
              Sua senha
            </Text>

            <Anchor
              href="#"
              onClick={(event) => event.preventDefault()}
              pt={2}
              fw={500}
              fz="xs"
            >
              Esqueceu a senha?
            </Anchor>
          </Group>

          <PasswordInput
            id="your-password"
            placeholder="Sua senha"
            required
            value={form.values.password}
            {...form.getInputProps("password")}
          />

          <Button fullWidth mt="xl" type="submit">
            Entrar
          </Button>
        </form>
      </Paper>
    </Center>
  );
}

export interface ILoginProps {
  userName: string;
  password: string;
}
