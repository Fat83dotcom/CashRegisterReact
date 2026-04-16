import {
  Anchor,
  Button,
  Center,
  Group,
  Paper,
  Text,
  Title,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Form, TextInput, PasswordInput } from "../../../components/Form";
import { loginSchema, type LoginFormData } from "../schemas/loginSchema";

export function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (values: LoginFormData) => {
    await login(values);
    navigate("/");
  };

  return (
    <Center h="100vh" bg="gray">
      <Paper w={400} p="xl" withBorder shadow="md">
        <Title order={2} ta="center" mb="lg">
          Login
        </Title>

        <Form
          schema={loginSchema}
          onSubmit={handleSubmit}
          defaultValues={{ userName: "", password: "" }}
        >
          {() => (
            <>
              <TextInput
                name="userName"
                label="Usuário"
                placeholder="Seu nome de usuário"
                required
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
                name="password"
                id="your-password"
                placeholder="Sua senha"
                required
              />

              <Button fullWidth mt="xl" type="submit">
                Entrar
              </Button>
            </>
          )}
        </Form>
      </Paper>
    </Center>
  );
}
