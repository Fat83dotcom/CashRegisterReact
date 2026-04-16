import { Button, Center, Grid, Paper, Title, Stack } from "@mantine/core";
import { Form, TextInput } from "../../../components/Form";
import { unitSchema, type UnitFormData } from "../schemas/unitSchema";

export function UnitForm() {
  const handleSubmit = (values: UnitFormData) => {
    // Lógica para salvar a unidade (será implementada na próxima fase)
    console.log("Saving Unit:", values);
  };

  return (
    <Paper withBorder shadow="md" p="xl" maw={600} mx="auto" mt="xl">
      <Title order={2} ta="center" mb="xl" c="brainstorm.6">
        Nova Unidade de Medida
      </Title>

      <Form
        schema={unitSchema}
        onSubmit={handleSubmit}
        defaultValues={{
          symbol: "",
          name: "",
          description: "",
        }}
      >
        {() => (
          <Stack gap="md">
            <Grid gutter="md">
              <Grid.Col span={4}>
                <TextInput
                  name="symbol"
                  label="Sigla"
                  placeholder="Ex: UN, KG, LT"
                  withAsterisk
                />
              </Grid.Col>
              <Grid.Col span={8}>
                <TextInput
                  name="name"
                  label="Nome da Unidade"
                  placeholder="Ex: Unidade, Kilograma, Litro"
                  withAsterisk
                />
              </Grid.Col>
              <Grid.Col span={12}>
                <TextInput
                  name="description"
                  label="Descrição (Opcional)"
                  placeholder="Informações adicionais sobre a unidade"
                />
              </Grid.Col>
            </Grid>

            <Center mt="xl">
              <Button type="submit" fullWidth size="md">
                Salvar Unidade
              </Button>
            </Center>
          </Stack>
        )}
      </Form>
    </Paper>
  );
}
