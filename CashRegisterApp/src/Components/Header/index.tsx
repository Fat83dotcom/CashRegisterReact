import { IconSearch, IconChevronDown } from "@tabler/icons-react";
import { Autocomplete, Burger, Center, Group, Menu } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import classes from "./styles/HeaderSearch.module.css";
import { NavLink } from "react-router-dom";
import { UserMenu } from "../UserMenu";
import { useAuth } from "../../contexts/AuthContext";

type NavLinkItem = {
  link: string;
  label: string;
  links?: { link: string; label: string }[];
  roles?: string[];
};

const links: NavLinkItem[] = [
  { link: "/", label: "Home" },
  {
    link: "#2",
    label: "Estoque",
    links: [
      { link: "/inventory", label: "Painel" },
      { link: "/inventory/products", label: "Produtos" },
      { link: "/inventory/categories", label: "Categorias" },
    ],
  },
  {
    link: "#3",
    label: "Financeiro",
    links: [
      { link: "/financial", label: "Painel" },
      { link: "/financial/cashFlow", label: "Fluxo de Caixa" },
      { link: "/financial/reports", label: "Relatórios" },
    ],
  },
  {
    link: "#4",
    label: "Vendas",
    links: [
      { link: "/sales", label: "Painel" },
      { link: "/sales/new", label: "Nova Venda" },
      { link: "/sales/history", label: "Histórico" },
    ],
  },
  { link: "/about", label: "Sobre" },
];

export function HeaderSearch() {
  const [opened, { toggle }] = useDisclosure(false);
  const { user } = useAuth();

  const filteredLinks = links.filter(
    (link) => !link.roles || (user && link.roles.includes(user.role)),
  );

  const items = filteredLinks.map((link) => {
    // 1. Cria os itens do submenu (se existirem), usando NavLink para manter o roteamento
    const menuItems = link.links?.map((item) => (
      <Menu.Item key={item.link} component={NavLink} to={item.link}>
        {item.label}
      </Menu.Item>
    ));

    // 2. Se houver submenu, renderiza o componente Menu do Mantine
    if (menuItems) {
      return (
        <Menu
          key={link.label}
          trigger="hover"
          transitionProps={{ exitDuration: 0 }}
          withinPortal
        >
          <Menu.Target>
            <a
              href={link.link}
              className={classes.link}
              onClick={(event) => event.preventDefault()} // Impede o clique de recarregar a página
            >
              <Center>
                <span className={classes.linkLabel}>{link.label}</span>
                <IconChevronDown size={14} stroke={1.5} />
              </Center>
            </a>
          </Menu.Target>
          <Menu.Dropdown>{menuItems}</Menu.Dropdown>
        </Menu>
      );
    }

    // 3. Se for um link normal (sem submenu), renderiza o seu NavLink original
    return (
      <NavLink
        key={link.label}
        to={link.link}
        className={({ isActive }) =>
          isActive ? `${classes.link} ${classes.linkActive}` : classes.link
        }
      >
        {link.label}
      </NavLink>
    );
  });

  return (
    <div className={classes.header}>
      <div className={classes.inner}>
        <Group>
          <Burger
            opened={opened}
            onClick={toggle}
            size="sm"
            hiddenFrom="sm"
            aria-label="Toggle navigation"
          />
        </Group>

        <Group>
          <Group ml={50} gap={5} className={classes.links} visibleFrom="sm">
            {items}
          </Group>
          <Autocomplete
            className={classes.search}
            placeholder="Search"
            leftSection={<IconSearch size={16} stroke={1.5} />}
            data={[
              "React",
              "Angular",
              "Vue",
              "Next.js",
              "Riot.js",
              "Svelte",
              "Blitz.js",
            ]}
            visibleFrom="xs"
          />
          <Group>
            <UserMenu />
          </Group>
        </Group>
      </div>
    </div>
  );
}
