import { Title, Text, Button, Container, Group, Center, Stack } from '@mantine/core';
import { IconAlertTriangle } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

export function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <Container size="sm" h="100%">
      <Center h="100%" pb={100}>
        <Stack align="center" gap="md">
          <IconAlertTriangle size={80} stroke={1.5} color="var(--mantine-color-yellow-6)" />
          
          <Title order={1} ta="center">
            Página em Construção ou Não Encontrada
          </Title>
          
          <Text c="dimmed" size="lg" ta="center" maw={500}>
            Desculpe, a página que você está tentando acessar ainda não foi implementada 
            ou o endereço está incorreto. Nossa equipe está trabalhando duro para expandir o sistema!
          </Text>

          <Group justify="center" mt="xl">
            <Button variant="filled" size="md" onClick={() => navigate('/')}>
              Voltar para o Início
            </Button>
          </Group>
        </Stack>
      </Center>
    </Container>
  );
}
