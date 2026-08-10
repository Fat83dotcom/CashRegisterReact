import { Paper, Title, Select, Button, Center } from "@mantine/core";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "../../../auth/contexts/AuthContext";
import { UserService } from "../../../users/api/userService";
import { useState } from "react";

const schema = z.object({ timezone: z.string().min(1, "Selecione um fuso horário") });

export function PreferencesPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const { handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { timezone: user?.timezone || "America/Sao_Paulo" },
  });

  const onSubmit = async (data: { timezone: string }) => {
    setLoading(true);
    await UserService.updateTimezone(data);
    setLoading(false);
  };

  return (
    <Paper withBorder shadow="md" p="xl" maw={500} mx="auto" mt="xl">
      <Title order={2} ta="center" mb="xl" c="brainstorm.6">
        Preferências do Sistema
      </Title>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Select
          label="Seu Fuso Horário"
          description="Os horários das vendas e estoques serão ajustados para esta região."
          data={[
            { value: "America/Sao_Paulo", label: "Horário de Brasília (SP, RJ, MG, etc)" },
            { value: "America/Manaus", label: "Horário do Amazonas (AM, MT, MS)" },
            { value: "America/Rio_Branco", label: "Horário do Acre (AC)" },
            { value: "America/Fortaleza", label: "Horário do Nordeste (Sem horário de verão)" },
          ]}
          defaultValue={user?.timezone || "America/Sao_Paulo"}
          onChange={(val) => setValue("timezone", val || "")}
          error={errors.timezone?.message}
          searchable
        />

        <Center mt="xl">
          <Button type="submit" loading={loading} color="brainstorm.6">
            Salvar Preferências
          </Button>
        </Center>
      </form>
    </Paper>
  );
}
