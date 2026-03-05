import { Switch, useMantineColorScheme } from "@mantine/core";
import { IconSun, IconMoonStars } from "@tabler/icons-react";

export function SwitchTheme() {
  const { colorScheme, setColorScheme } = useMantineColorScheme({
    keepTransitions: true,
  });

  const isDark = colorScheme === "dark";

  return (
    <Switch
      size="md"
      color="dark.4"
      checked={isDark}
      onLabel={
        <IconSun size={16} stroke={2.5} color="var(--mantine-color-yellow-4)" />
      }
      offLabel={
        <IconMoonStars
          size={16}
          stroke={2.5}
          color="var(--mantine-color-blue-6)"
        />
      }
      onChange={() => {
        setColorScheme(colorScheme === "dark" ? "light" : "dark");
      }}
    />
  );
}
