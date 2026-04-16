import { NavLink as RouterNavLink, useLocation } from "react-router-dom";
import { Stack, Text, NavLink as MantineNavLink, Box } from "@mantine/core";
import { 
  IconHome, 
  IconInfoCircle,
  IconChevronRight 
} from "@tabler/icons-react";

const links = [
  { link: "/", label: "Home", icon: IconHome },
  { link: "/about", label: "Sobre o Sistema", icon: IconInfoCircle },
];

export function MainNavigation() {
  const location = useLocation();

  return (
    <Box p="md">
      <Text size="xs" fw={700} c="dimmed" tt="uppercase" mb="md" pl="sm" style={{ letterSpacing: 1 }}>
        Menu Principal
      </Text>
      
      <Stack gap={4}>
        {links.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.link;
          
          return (
            <MantineNavLink
              key={item.label}
              component={RouterNavLink}
              to={item.link}
              label={item.label}
              leftSection={<Icon size={20} stroke={1.5} />}
              rightSection={isActive ? <IconChevronRight size={14} stroke={1.5} /> : null}
              active={isActive}
              color="brainstorm.6"
              variant="light"
              styles={{
                root: {
                  borderRadius: 'var(--mantine-radius-md)',
                  transition: 'all 0.2s ease',
                  padding: '10px 12px',
                },
                label: {
                  fontWeight: isActive ? 600 : 500,
                  fontSize: 'var(--mantine-font-size-sm)',
                }
              }}
            />
          );
        })}
      </Stack>
    </Box>
  );
}
