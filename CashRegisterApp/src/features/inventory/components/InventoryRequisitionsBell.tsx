import { useState, useEffect, useCallback } from "react";
import { Indicator, ActionIcon, Tooltip } from "@mantine/core";
import { IconBox } from "@tabler/icons-react";
import { useNotifications } from "../../../hooks/useNotifications";
import { NotificationTopics } from "../../../lib/constants";
import { useNotificationGroup } from "../../../components/Layout/NotificationGroup";
import { PendingRequisitionsModal } from "./PendingRequisitionsModal";
import { useDisclosure } from "@mantine/hooks";

export function InventoryRequisitionsBell() {
  const { reportStatus } = useNotificationGroup();
  const [data, setData] = useState({ count: 0, timestamp: "" });
  const [opened, { open, close }] = useDisclosure(false);

  const handleNotification = useCallback((msg: any) => {
    setData(msg);
  }, []);

  useNotifications(NotificationTopics.InventoryRequisitionsPending, handleNotification);

  useEffect(() => {
    reportStatus('inventory', data.count > 0);
  }, [data.count, reportStatus]);

  return (
    <>
      <Tooltip label="Requisições Pendentes (Estoque)">
        <Indicator
          color="red"
          size={16}
          label={data.count}
          disabled={data.count === 0}
        >
          <ActionIcon 
            variant="light" 
            color="blue" 
            size="xl" 
            radius="md"
            onClick={open}
          >
            <IconBox size={24} />
          </ActionIcon>
        </Indicator>
      </Tooltip>
      
      <PendingRequisitionsModal 
        opened={opened} 
        onClose={close} 
        onFulfill={() => {}} 
      />
    </>
  );
}
