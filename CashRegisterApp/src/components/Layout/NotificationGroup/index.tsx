import { createContext, useState, useCallback, useContext } from "react";
import { Popover, ActionIcon, Group, Text, Divider, Indicator } from "@mantine/core";
import { IconBellRinging } from "@tabler/icons-react";

const NotificationGroupContext = createContext<{
  reportStatus: (id: string, hasNotifications: boolean) => void;
}>({ reportStatus: () => {} });

export const useNotificationGroup = () => useContext(NotificationGroupContext);

export function NotificationGroup({ children }: { children: React.ReactNode }) {
  const [activeStatuses, setActiveStatuses] = useState<Record<string, boolean>>({});

  const reportStatus = useCallback((id: string, hasNotifications: boolean) => {
    setActiveStatuses((prev) => {
      if (prev[id] === hasNotifications) return prev;
      return { ...prev, [id]: hasNotifications };
    });
  }, []);

  const hasAnyNotification = Object.values(activeStatuses).some(Boolean);

  return (
    <NotificationGroupContext.Provider value={{ reportStatus }}>
      <Popover position="bottom-end" withArrow shadow="md" keepMounted>
        <Popover.Target>
          <Indicator color="red.6" size={10} processing disabled={!hasAnyNotification} offset={4}>
            <ActionIcon variant="subtle" color="gray" size="lg" radius="xl">
              <IconBellRinging size={22} stroke={1.5} />
            </ActionIcon>
          </Indicator>
        </Popover.Target>

        <Popover.Dropdown p="sm">
          <Text size="sm" fw={600} mb="xs">Central de Notificações</Text>
          <Divider mb="sm" />
          
          <Group gap="md" align="center">
            {children}
          </Group>
        </Popover.Dropdown>
      </Popover>
    </NotificationGroupContext.Provider>
  );
}
