import { Button, Grid, Group, Paper, TextInput } from "@mantine/core";
import { DateInputBr } from "../../../Components/DateInputPt-BR";
import { useForm } from "@mantine/form";
import { IconSearch } from "@tabler/icons-react";

export function UserSearch() {
  const form = useForm({
    initialValues: {
      name: "",
      document: "",
      birthDate: "",
    },
  });
  return (
    <Paper p={30} shadow="md" radius={"lg"}>
      <Group justify="space-between" align="center">
        <Grid>
          <Grid.Col span={12} order={{ base: 6, sm: 3, lg: 3 }}>
            <TextInput size="sm" label="Nome" placeholder="Digite um nome" />
          </Grid.Col>
          <Grid.Col span={6} order={{ base: 6, sm: 3, lg: 3 }}>
            <TextInput
              size="sm"
              label="Documento"
              placeholder="Digite um documento"
            />
          </Grid.Col>
          <Grid.Col span={6} order={{ base: 6, sm: 3, lg: 3 }}>
            <DateInputBr
              props={{
                label: "Data de Nascimento",
                placeholder: "Digite a sua data de nascimento",
                value: form.values.birthDate,
              }}
              getInputProps={form.getInputProps("birthDate")}
            />
          </Grid.Col>
        </Grid>
        <Button
          pl={100}
          pr={100}
          radius="xl"
          type="submit"
          variant="light"
          leftSection={<IconSearch size={16} />}
        >
          Buscar
        </Button>
      </Group>
    </Paper>
  );
}
