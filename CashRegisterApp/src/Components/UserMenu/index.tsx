import { useState } from "react";
import {
  Menu,
  UnstyledButton,
  Group,
  Avatar,
  Text,
  MenuItem,
} from "@mantine/core";
import {
  IconChevronDown,
  IconSettings,
  IconLogout,
  IconScreenShare,
} from "@tabler/icons-react";
import cx from "clsx";
import classes from "./styles/UserMenu.module.css";
import { useAuth } from "../../contexts/AuthContext";
import { SwitchTheme } from "../SwitchTheme";

export function UserMenu() {
  const { logout, user } = useAuth();
  const [userMenuOpened, setUserMenuOpened] = useState(false);

  return (
    <Menu
      width={260}
      position="bottom-end"
      transitionProps={{ transition: "pop-top-right" }}
      onClose={() => setUserMenuOpened(false)}
      onOpen={() => setUserMenuOpened(true)}
      withinPortal
    >
      <Menu.Target>
        <UnstyledButton
          className={cx(classes.user, { [classes.userActive]: userMenuOpened })}
        >
          <Group gap={7}>
            <Avatar
              name={`${user?.userName.firstName} ${user?.userName.lastName}`}
              src={null}
              alt={"photo"}
              radius="xl"
              size={20}
            />
            <Text fw={500} size="sm" lh={1} mr={3}>
              {user
                ? `${user.userName.firstName} ${user.userName.lastName}`
                : "Sem nome"}
            </Text>
            <IconChevronDown size={12} stroke={1.5} />
          </Group>
        </UnstyledButton>
      </Menu.Target>

      <Menu.Dropdown>
        {/* Seção de Configurações */}
        <Menu.Label>Settings</Menu.Label>
        <Menu.Item leftSection={<IconSettings size={16} stroke={1.5} />}>
          Configurações
        </Menu.Item>

        <Menu.Item
          leftSection={<IconLogout size={16} stroke={1.5} />}
          onClick={logout}
        >
          Sair
        </Menu.Item>
        <MenuItem leftSection={<IconScreenShare size={16} stroke={1.5} />}>
          <SwitchTheme />
        </MenuItem>
      </Menu.Dropdown>
    </Menu>
  );
}
