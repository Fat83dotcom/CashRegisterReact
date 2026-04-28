import { Stack, Text, Alert } from "@mantine/core";
import { IconAlertTriangle, IconInfoCircle } from "@tabler/icons-react";
import React from "react";

export interface ActionConfirmContentProps {
  title?: string;
  description?: string;
  itemDetails?: React.ReactNode | string;
  warningMessage?: string;
  isDestructive?: boolean;
}

export function ActionConfirmContent({
  title = "Tem a certeza que deseja prosseguir?",
  description = "Poderá reverter esta ação futuramente.",
  itemDetails,
  warningMessage,
  isDestructive = false,
}: ActionConfirmContentProps) {
  return (
    <Stack gap="sm">
      <Text size="sm" fw={500}>{title}</Text>
      <Text size="sm" c="dimmed">
        {description}
      </Text>

      {itemDetails && (
        <Alert variant="light" color="gray" p="sm" icon={<IconInfoCircle size={18} />}>
          <Text size="sm" fw={600}>
            {itemDetails}
          </Text>
        </Alert>
      )}

      {warningMessage && (
        <Alert
          variant="light"
          color={isDestructive ? "red" : "yellow"}
          title="Atenção"
          icon={<IconAlertTriangle size={18} />}
        >
          {warningMessage}
        </Alert>
      )}
    </Stack>
  );
}
