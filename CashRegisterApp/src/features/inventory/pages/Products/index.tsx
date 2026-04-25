import { Title, Stack, Group, Button } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { ProductSearch } from "./Search";
import { useLocation, useNavigate } from "react-router-dom";
import { ProductForm } from "../../components/ProductForm";

export function ProductsPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // Identifica a visão atual baseada na rota (Padrão UserHome)
  const view = location.pathname.includes("/create") ? "create" : "search";

  const toggleView = () => {
    if (view === "search") {
      navigate("/inventory/products/create");
    } else {
      navigate("/inventory/products");
    }
  };

  return (
    <Stack gap="lg">
      <Group justify="space-between">
        <Title order={1}>Gestão de Produtos</Title>
        <Button
          leftSection={view === "search" ? <IconPlus size={18} /> : null}
          onClick={toggleView}
          variant="light"
          color="brainstorm.6"
        >
          {view === "search" ? "Novo Produto" : "Voltar para Busca"}
        </Button>
      </Group>

      {view === "search" ? <ProductSearch /> : <ProductForm />}
    </Stack>
  );
}
