import { IconCheck } from "@tabler/icons-react";
import { Notification } from "@mantine/core";

export function SuccessNotification(message: string) {
  const checkIcon = <IconCheck size={20} />;
  return (
    <Notification icon={checkIcon} color="teal" title="All good!" mt="md">
      {message}
    </Notification>
  );
}
