import { Paper, Title, Button, Center, LoadingOverlay } from "@mantine/core";
import { z } from "zod";
import { useState, useEffect } from "react";

import { UserService } from "../../../users/api/userService";
import type { ITimezoneResponse } from "../../../users/api/userService";
import { AuthService } from "../../../auth/api/authServices";
import type { ILoginResponse } from "../../../auth/contexts/AuthContext";
import { Form, AsyncSelect } from "../../../../components/Form";

const schema = z.object({
  timezone: z
    .string({
      message: "Selecione um fuso horário",
    })
    .min(1, "Selecione um fuso horário"),
});

type FormData = z.infer<typeof schema>;

export function PreferencesPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const [pageLoading, setPageLoading] = useState<boolean>(true);
  const [initialTimezone, setInitialTimezone] = useState<string>("");

  useEffect(() => {
    AuthService.me()
      .then((res: ILoginResponse | undefined) => {
        if (res?.timezone) {
          setInitialTimezone(res.timezone);
        }
      })
      .catch((err: unknown) =>
        console.error("Falha ao buscar fuso horário:", err),
      )
      .finally(() => setPageLoading(false));
  }, []);

  const handleSubmit = async (data: FormData): Promise<void> => {
    setLoading(true);
    await UserService.updateTimezone(data);
    setLoading(false);
  };

  if (pageLoading) {
    return (
      <Paper
        withBorder
        shadow="md"
        p="xl"
        maw={500}
        mx="auto"
        mt="xl"
        pos="relative"
        h={300}
      >
        <LoadingOverlay
          visible={true}
          overlayProps={{ radius: "sm", blur: 2 }}
        />
      </Paper>
    );
  }

  const defaultValues: FormData = {
    timezone: initialTimezone,
  };

  return (
    <Paper withBorder shadow="md" p="xl" maw={500} mx="auto" mt="xl">
      <Title order={2} ta="center" mb="xl" c="brainstorm.6">
        Preferências do Sistema
      </Title>

      <Form<FormData>
        schema={schema}
        onSubmit={handleSubmit}
        defaultValues={defaultValues}
      >
        {() => (
          <>
            <AsyncSelect<ITimezoneResponse>
              name="timezone"
              label="Seu Fuso Horário"
              description="Os horários das vendas e estoques serão ajustados para esta região."
              fetcher={async (query: string): Promise<ITimezoneResponse[]> => {
                const res = await UserService.getTimezones();
                if (query) {
                  return res.filter((x: ITimezoneResponse) =>
                    x.displayName.toLowerCase().includes(query.toLowerCase()),
                  );
                }
                return res;
              }}
              getLabel={(item: ITimezoneResponse) => item.displayName}
              getValue={(item: ITimezoneResponse) => item.id}
            />

            <Center mt="xl">
              <Button type="submit" loading={loading} color="brainstorm.6">
                Salvar Preferências
              </Button>
            </Center>
          </>
        )}
      </Form>
    </Paper>
  );
}
