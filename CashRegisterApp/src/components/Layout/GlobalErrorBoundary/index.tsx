import { useRouteError, isRouteErrorResponse } from "react-router-dom";
import { Container, Title, Text, Button, Center, Stack } from "@mantine/core";
import { IconAlertTriangle } from "@tabler/icons-react";

export function GlobalErrorBoundary() {
  const error = useRouteError() as any;

  // Se o erro for 401, o authListener do apiClient já despachou o evento "unauthorized"
  // e o AuthContext está no processo de redirecionar para o login via ProtectedRoute. 
  // Para evitar piscar uma tela de erro na cara do usuário antes do redirecionamento, não renderizamos nada.
  if (error?.status === 401) {
    return null;
  }

  return (
    <Container size="sm" h="100vh">
      <Center h="100%">
        <Stack align="center" gap="md">
          <IconAlertTriangle size={64} color="red" />
          <Title order={2}>Ops! Ocorreu um erro inesperado.</Title>
          <Text c="dimmed" ta="center">
            {isRouteErrorResponse(error)
              ? error.statusText
              : error?.message || "Algo deu errado durante a comunicação com o servidor."}
          </Text>
          <Button mt="xl" onClick={() => window.location.reload()} color="brainstorm.6">
            Recarregar Página
          </Button>
        </Stack>
      </Center>
    </Container>
  );
}
