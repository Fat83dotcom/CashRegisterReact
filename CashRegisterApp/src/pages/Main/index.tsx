import { AppShell, Burger, Container, Group, Paper } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { HeaderSearch } from "../../Components/Header";

export function CollapseDesktop() {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

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
        <Group h="100%" px="md" justify="space-between" align="center">
          <Group>
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
          </Group>

          <HeaderSearch />
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        You can collapse the Navbar both on desktop and mobile. After sm
        breakpoint, the navbar is no longer offset by padding in the main
        element and it takes the full width of the screen when opened.
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
            <h2>Bem-vindo ao Dashboard</h2>
            <p>
              Tudo o que você colocar aqui dentro deste Paper (tabelas,
              gráficos, formulários) ficará perfeitamente contido, com fundo
              branco, bordas arredondadas e uma sombra leve. Ele nunca vai
              sobrepor o Header ou o Navbar.
            </p>
          </Paper>
        </Container>
      </AppShell.Main>
    </AppShell>
  );
}
