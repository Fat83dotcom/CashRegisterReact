import { useState, useEffect } from "react";
import { ActionIcon, Popover, Text, Indicator, Stack, Divider, Group, Button } from "@mantine/core";
import { IconBell, IconCheck } from "@tabler/icons-react";
import { notificationService } from "../../../services/notificationService";
import { apiClient } from "../../../lib/api";
import { useNavigate } from "react-router-dom";

export function NotificationBell() {
  const [opened, setOpened] = useState(false);
  const [pendingCount, setPendingCount] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    // 1. Busca inicial da contagem de requisições pendentes
    apiClient.get<number>("/InventoryRequisitions/pending/count")
      .then((count) => setPendingCount(count))
      .catch((err) => console.error("Erro ao buscar notificações", err));

    // 2. Assina o tópico SSE para receber o valor atualizado em tempo real
    const unsubscribe = notificationService.subscribe("inventory.requisitions.pending", (msg: any) => {
      // O backend agora envia { count: X, timestamp: Y }
      if (typeof msg.count === "number") {
        setPendingCount(msg.count);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <Popover opened={opened} onChange={setOpened} position="bottom-end" withArrow shadow="md">
      <Popover.Target>
        <Indicator
          color="red"
          size={16}
          label={pendingCount}
          disabled={pendingCount === 0}
          offset={4}
        >
          <ActionIcon
            variant="subtle"
            color="gray"
            size="lg"
            radius="xl"
            onClick={() => setOpened((o) => !o)}
          >
            <IconBell size={22} stroke={1.5} />
          </ActionIcon>
        </Indicator>
      </Popover.Target>

      <Popover.Dropdown p={0} w={280}>
        <Group justify="space-between" px="md" py="xs">
          <Text fw={600} size="sm">Notificações</Text>
        </Group>

        <Divider />

        <Stack p="md" align="center" gap="xs">
          {pendingCount === 0 ? (
            <>
              <IconCheck size={32} stroke={1.5} color="gray" />
              <Text c="dimmed" size="sm" ta="center">
                Tudo limpo! Não há requisições pendentes.
              </Text>
            </>
          ) : (
            <>
              <IconBell size={32} stroke={1.5} color="var(--mantine-color-blue-filled)" />
              <Text size="sm" ta="center" fw={500}>
                Existem {pendingCount} requisição(ões) aguardando atendimento.
              </Text>
              <Button 
                variant="light" 
                size="xs" 
                fullWidth 
                mt="sm"
                onClick={() => {
                  setOpened(false);
                  navigate("/inventory"); // Rota para a tela de requisições (ajuste conforme necessário)
                }}
              >
                Ir para Requisições
              </Button>
            </>
          )}
        </Stack>
      </Popover.Dropdown>
    </Popover>
  );
}
