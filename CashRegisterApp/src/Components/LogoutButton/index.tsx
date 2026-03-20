import { Button, Group } from "@mantine/core";
import { IconLogout } from "@tabler/icons-react";
import { useAuth } from "../../contexts/AuthContext";

export function LogoutButton() {
  const { logout } = useAuth();

  return (
    <Group justify="flex-end" p="md">
      <Button
        color="red"
        variant="light"
        leftSection={<IconLogout size={16} />}
        onClick={logout}
      >
        Sair do Sistema
      </Button>
    </Group>
  );
}
