import { Button, Center, Grid, Paper, Title, Stack } from "@mantine/core";
import { Form, TextInput } from "../../../components/Form";
import { categorySchema, type CategoryFormData } from "../schemas/categorySchema";

export function CategoryForm() {
  const handleSubmit = (values: CategoryFormData) => {
    // Lógica para salvar a categoria (será implementada na próxima fase)
    console.log("Saving Category:", values);
  };

  return (
    <Paper withBorder shadow="md" p="xl" maw={600} mx="auto" mt="xl">
      <Title order={2} ta="center" mb="xl" c="brainstorm.6">
        Nova Categoria de Produto
      </Title>

      <Form
        schema={categorySchema}
        onSubmit={handleSubmit}
        defaultValues={{
          name: "",
          description: "",
        }}
      >
        {() => (
          <Stack gap="md">
            <Grid gutter="md">
              <Grid.Col span={12}>
                <TextInput
                  name="name"
                  label="Nome da Categoria"
                  placeholder="Ex: Eletrônicos, Alimentos"
                  withAsterisk
                />
              </Grid.Col>
              <Grid.Col span={12}>
                <TextInput
                  name="description"
                  label="Descrição (Opcional)"
                  placeholder="Informações adicionais sobre a categoria"
                />
              </Grid.Col>
            </Grid>

            <Center mt="xl">
              <Button type="submit" fullWidth size="md">
                Salvar Categoria
              </Button>
            </Center>
          </Stack>
        )}
      </Form>
    </Paper>
  );
}
