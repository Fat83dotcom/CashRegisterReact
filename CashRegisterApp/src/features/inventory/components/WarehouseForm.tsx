import { Button, Center, Grid, Paper, Title, Stack } from "@mantine/core";
import { Form, TextInput, Select } from "../../../components/Form";
import { warehouseSchema, type WarehouseFormData } from "../schemas/warehouseSchema";

export function WarehouseForm() {
  const handleSubmit = (values: WarehouseFormData) => {
    // Lógica para salvar o almoxarifado (será implementada na próxima fase)
    console.log("Saving Warehouse:", values);
  };

  return (
    <Paper withBorder shadow="md" p="xl" maw={600} mx="auto" mt="xl">
      <Title order={2} ta="center" mb="xl" c="brainstorm.6">
        Novo Almoxarifado
      </Title>

      <Form
        schema={warehouseSchema}
        onSubmit={handleSubmit}
        defaultValues={{
          name: "",
          type: "",
        }}
      >
        {() => (
          <Stack gap="md">
            <Grid gutter="md">
              <Grid.Col span={12}>
                <TextInput
                  name="name"
                  label="Nome do Almoxarifado"
                  placeholder="Ex: Depósito Central, Loja Principal"
                  withAsterisk
                />
              </Grid.Col>
              <Grid.Col span={12}>
                <Select
                  name="type"
                  label="Tipo de Almoxarifado"
                  placeholder="Selecione o tipo"
                  data={[
                    { value: "Principal", label: "Principal" },
                    { value: "Filial", label: "Filial" },
                    { value: "Virtual", label: "Virtual" },
                    { value: "Terceiros", label: "Terceiros" }
                  ]}
                  withAsterisk
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
                Salvar Almoxarifado
              </Button>
            </Center>
          </Stack>
        )}
      </Form>
    </Paper>
  );
}
