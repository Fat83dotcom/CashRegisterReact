import { Container, Title, Text } from "@mantine/core";

export function InventoryHome() {
  return (
    <Container>
      <Title order={2}>Painel de Estoque</Title>
      <Text mt="md">Bem-vindo ao módulo de estoque. Em breve você poderá gerenciar produtos e categorias por aqui.</Text>
    </Container>
  );
}
