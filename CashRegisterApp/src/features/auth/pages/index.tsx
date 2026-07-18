import {
  Anchor,
  Button,
  Center,
  Group,
  Paper,
  Text,
  Title,
  Loader,
} from "@mantine/core";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Form, TextInput, PasswordInput } from "../../../components/Form";
import { loginSchema, type LoginFormData } from "../schemas/loginSchema";

export function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleSubmit = async (values: LoginFormData) => {
    setIsLoggingIn(true);
    try {
      await login(values);
      setTimeout(() => {
        navigate("/");
      }, 800);
    } catch {
      setIsLoggingIn(false);
    }
  };

  return (
    <Center h="100vh" bg="gray.1">
      {isLoggingIn ? (
        <Loader color="brainstorm.6" size="xl" type="dots" />
      ) : (
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

                <Button 
                  fullWidth 
                  mt="xl" 
                  type="submit"
                  size="md"
                  color="brainstorm.6"
                  variant="light"
                >
                  Entrar
                </Button>
              </>
            )}
          </Form>
        </Paper>
      )}
    </Center>
  );
}
