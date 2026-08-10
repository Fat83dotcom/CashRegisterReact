import { useRouteError, isRouteErrorResponse, useNavigate } from "react-router-dom";
import { Container, Title, Text, Button, Center, Stack, Group } from "@mantine/core";
import { IconAlertTriangle, IconHome, IconReload } from "@tabler/icons-react";

export function GlobalErrorBoundary() {
  const error = useRouteError() as any;
  const navigate = useNavigate();

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
          
          <Group mt="xl">
            <Button 
              leftSection={<IconReload size={18} />} 
              onClick={() => window.location.reload()} 
              variant="default"
            >
              Recarregar Página
            </Button>
            <Button 
              leftSection={<IconHome size={18} />} 
              onClick={() => navigate("/")} 
              color="green"
            >
              Voltar para a Home
            </Button>
          </Group>
        </Stack>
      </Center>
    </Container>
  );
}
