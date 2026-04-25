import {
  Button,
  Center,
  Grid,
  Paper,
  Title,
  Stack,
} from "@mantine/core";
import { Form, TextInput, Select } from "../../../components/Form";
import { productSchema, type ProductFormData } from "../schemas/productSchema";

export function ProductForm() {
  const handleSubmit = (values: ProductFormData) => {
    // Lógica para salvar o produto (será implementada na próxima fase)
    console.log("Saving Product:", values);
  };

  // Mocks para Selects (em produção seriam carregados da API)
  const mockCategories = [
    { value: "1", label: "Eletrônicos" },
    { value: "2", label: "Alimentos" },
    { value: "3", label: "Ferramentas" },
  ];

  const mockUoms = [
    { value: "1", label: "Unidade (UN)" },
    { value: "2", label: "Kilograma (KG)" },
    { value: "3", label: "Litro (LT)" },
  ];

  return (
    <Paper withBorder shadow="md" p="xl" maw={800} mx="auto" mt="xl">
      <Title order={2} ta="center" mb="xl" c="brainstorm.6">
        Novo Produto
      </Title>

      <Form
        schema={productSchema}
        onSubmit={handleSubmit}
        defaultValues={{
          sku: "",
          name: "",
          description: "",
          ncmCode: "",
          categoryId: 0,
          baseUomId: 0,
          averageCost: 0,
        }}
      >
        {() => (
          <Stack gap="md">
            <Grid gutter="md">
              <Grid.Col span={{ base: 12, md: 4 }}>
                <TextInput
                  name="sku"
                  label="SKU / Código"
                  placeholder="Ex: PROD-001"
                  withAsterisk
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 8 }}>
                <TextInput
                  name="name"
                  label="Nome do Produto"
                  placeholder="Nome completo do item"
                  withAsterisk
                />
              </Grid.Col>

              <Grid.Col span={12}>
                <TextInput
                  name="description"
                  label="Descrição Breve"
                  placeholder="Opcional"
                />
              </Grid.Col>

              <Grid.Col span={{ base: 12, md: 6 }}>
                <Select
                  name="categoryId"
                  label="Categoria"
                  placeholder="Selecione..."
                  data={mockCategories}
                  withAsterisk
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <Select
                  name="baseUomId"
                  label="Unidade de Medida"
                  placeholder="Selecione..."
                  data={mockUoms}
                  withAsterisk
                />
              </Grid.Col>

              <Grid.Col span={{ base: 12, md: 6 }}>
                <TextInput
                  name="ncmCode"
                  label="Código NCM"
                  placeholder="Ex: 8517.12.31"
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <TextInput
                  name="averageCost"
                  label="Custo Médio Inicial"
                  placeholder="0,00"
                  type="number"
                />
              </Grid.Col>
            </Grid>

            <Center mt="xl">
              <Button
                type="submit"
                fullWidth
                size="md"
                color="brainstorm.6"
                variant="light"
              >
                Salvar Produto
              </Button>
            </Center>
          </Stack>
        )}
      </Form>
    </Paper>
  );
}
