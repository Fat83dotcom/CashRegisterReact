import { Button, Center, Grid, Paper, Title, Stack, Text, Alert } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";
import { Form, TextInput, Select } from "../../../components/Form";
import { conversionSchema, type ConversionFormData } from "../schemas/conversionSchema";

export function ConversionForm() {
  const handleSubmit = (values: ConversionFormData) => {
    // Lógica para salvar a regra (será implementada na próxima fase)
    console.log("Saving Conversion Rule:", values);
  };

  return (
    <Paper withBorder shadow="md" p="xl" maw={700} mx="auto" mt="xl">
      <Title order={2} ta="center" mb="md" c="brainstorm.6">
        Regra de Conversão
      </Title>

      <Alert variant="light" color="blue" title="Como funciona?" icon={<IconInfoCircle />} mb="xl">
        Define o multiplicador entre unidades. Ex: 1 [Caixa] = 12 [Unidades].
      </Alert>

      <Form
        schema={conversionSchema}
        onSubmit={handleSubmit}
        defaultValues={{ factor: 1 }}
      >
        {() => (
          <Stack gap="md">
            <Grid gutter="md" align="flex-end">
              <Grid.Col span={5}>
                <Select
                  name="fromUnitId"
                  label="1 (Uma) Unidade de:"
                  placeholder="Selecione..."
                  withAsterisk
                  data={[
                    { value: "1", label: "Caixa (CX)" },
                    { value: "2", label: "Fardo (FD)" },
                  ]}
                />
              </Grid.Col>
              
              <Grid.Col span={2}>
                <Text ta="center" fw={700} mb="md">EQUIVALE A</Text>
              </Grid.Col>

              <Grid.Col span={5}>
                <TextInput
                  name="factor"
                  label="Esta quantidade:"
                  placeholder="Ex: 12"
                  withAsterisk
                  type="number"
                />
              </Grid.Col>

              <Grid.Col span={12}>
                <Select
                  name="toUnitId"
                  label="Da unidade de destino:"
                  placeholder="Selecione..."
                  withAsterisk
                  data={[
                    { value: "3", label: "Unidade (UN)" },
                    { value: "4", label: "Grama (GR)" },
                  ]}
                />
              </Grid.Col>

              <Grid.Col span={12}>
                <TextInput
                  name="description"
                  label="Observação (Opcional)"
                  placeholder="Ex: Conversão padrão de fardos de refrigerante"
                />
              </Grid.Col>
            </Grid>

            <Center mt="xl">
              <Button type="submit" fullWidth size="md">
                Salvar Regra de Conversão
              </Button>
            </Center>
          </Stack>
        )}
      </Form>
    </Paper>
  );
}
