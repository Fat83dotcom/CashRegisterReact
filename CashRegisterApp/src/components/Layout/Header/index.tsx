import { IconSearch, IconChevronDown, IconChevronRight } from "@tabler/icons-react";
import { Autocomplete, Center, Group, Menu } from "@mantine/core";

import classes from "./styles/HeaderSearch.module.css";
import { NavLink } from "react-router-dom";
import { UserMenu } from "../UserMenu";
import { useAuth } from "../../../features/auth/contexts/AuthContext";

type NavSubItem = { link: string; label: string };
type NavSection = { label: string; items: NavSubItem[] };

type NavLinkItem = {
  link: string;
  label: string;
  sections?: NavSection[];
  roles?: string[];
};

const links: NavLinkItem[] = [
  { link: "/", label: "Home" },
  {
    link: "#inventory",
    label: "Estoque",
    sections: [
      {
        label: "Cadastros",
        items: [
          { link: "/inventory/products", label: "Produtos" },
          { link: "/inventory/warehouses", label: "Almoxarifados" },
          { link: "/inventory/categories", label: "Categorias" },
          { link: "/inventory/units", label: "Unidades de Medida" },
          { link: "/inventory/conversions", label: "Regras de Conversão" },
        ],
      },
      { label: "Operações", items: [] },
      { label: "Relatórios", items: [] },
    ],
  },
  {
    link: "#financial",
    label: "Financeiro",
    sections: [
      {
        label: "Cadastros",
        items: [
          { link: "/financial/accounts", label: "Contas" },
        ],
      },
      { label: "Operações", items: [] },
      { label: "Relatórios", items: [] },
    ],
  },
  {
    link: "#sales",
    label: "Vendas",
    sections: [
      {
        label: "Cadastros",
        items: [
          { link: "/sales/customers", label: "Clientes" },
        ],
      },
      { label: "Operações", items: [] },
      { label: "Relatórios", items: [] },
    ],
  },
  { link: "/about", label: "Sobre" },
];

export function HeaderSearch() {
  const { user } = useAuth();

  const filteredLinks = links.filter(
    (link) => !link.roles || (user && link.roles.includes(user.role)),
  );

  const items = filteredLinks.map((link) => {
    const menuItems = link.sections?.map((section) => (
      <Menu
        key={section.label}
        trigger="hover"
        position="right-start"
        offset={15}
        withinPortal={false}
      >
        <Menu.Target>
          <Menu.Item
            rightSection={<IconChevronRight size={14} stroke={1.5} />}
            closeMenuOnClick={false}
          >
            {section.label}
          </Menu.Item>
        </Menu.Target>
        <Menu.Dropdown>
          {section.items.length > 0 ? (
            section.items.map((item) => (
              <Menu.Item 
                key={item.link} 
                component={NavLink} 
                to={item.link}
              >
                {item.label}
              </Menu.Item>
            ))
          ) : (
            <Menu.Item disabled>Em breve...</Menu.Item>
          )}
        </Menu.Dropdown>
      </Menu>
    ));

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
              onClick={(event) => event.preventDefault()}
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
    <Group h="100%" flex={1} justify="flex-end" wrap="nowrap">
      <Group gap={5} className={classes.links} visibleFrom="sm" wrap="nowrap">
        {items}
      </Group>
      
      <Autocomplete
        className={classes.search}
        placeholder="Pesquisar..."
        leftSection={<IconSearch size={16} stroke={1.5} />}
        data={[
          "Usuários",
          "Produtos",
          "Almoxarifados",
          "Vendas",
          "Relatórios",
        ]}
        visibleFrom="xs"
      />
      
      <Group wrap="nowrap">
        <UserMenu />
      </Group>
    </Group>
  );
}
