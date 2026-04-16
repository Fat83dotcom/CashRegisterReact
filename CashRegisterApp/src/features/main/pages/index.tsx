import { AppShell, Burger, Container, Group, Paper, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { HeaderSearch } from "../../../components/Layout/Header";
import { Outlet, useMatches } from "react-router-dom";
import { IconBrain } from "@tabler/icons-react";

export * from "./navigation";
export function RootLayout() {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

  const matches = useMatches();
  const currentMatch = matches.find(
    (match) => match.handle && (match.handle as any).navbar,
  );
  const NavbarContent = currentMatch
    ? (currentMatch.handle as any).navbar
    : null;

  return (
    <AppShell
      padding="md"
      header={{ height: 80 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between" align="center" wrap="nowrap">
          <Group wrap="nowrap">
            <Burger
              opened={mobileOpened}
              onClick={toggleMobile}
              hiddenFrom="sm"
              size="sm"
            />
            <Burger
              opened={desktopOpened}
              onClick={toggleDesktop}
              visibleFrom="sm"
              size="sm"
            />
            <Group gap={8} visibleFrom="xs" wrap="nowrap" ml="md">
              <IconBrain size={28} color="var(--mantine-color-brainstorm-6)" />
              <Text
                size="xl"
                fw={900}
                variant="gradient"
                gradient={{ from: 'brainstorm.6', to: 'cyan', deg: 45 }}
                style={{ letterSpacing: -1 }}
              >
                BrainstormTech
              </Text>
            </Group>
          </Group>

          <HeaderSearch />
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        {NavbarContent ? NavbarContent : <p>Selecione um módulo no topo</p>}
      </AppShell.Navbar>
      <AppShell.Main>
        <Container fluid p="0">
          {/* Paper atua como o seu "quadro branco" para o conteúdo */}
          <Paper
            shadow="sm"
            radius="md"
            p="sm"
            withBorder
            style={{ minHeight: "calc(100vh - 100px)" }}
          >
            <Outlet />
          </Paper>
        </Container>
      </AppShell.Main>
    </AppShell>
  );
}
