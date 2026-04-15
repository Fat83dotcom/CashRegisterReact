import { NavLink } from "react-router-dom";
import classes from "./styles/Navigation.module.css";
import { Paper } from "@mantine/core";

const links = [
  { link: "/inventory", label: "Painel de Estoque" },
  { link: "/inventory/products", label: "Produtos" },
  { link: "/inventory/categories", label: "Categorias" },
];

const items = links.map((link) => (
  <NavLink
    key={link.label}
    to={link.link}
    className={({ isActive }) =>
      isActive ? `${classes.link} ${classes.linkActive}` : classes.link
    }
  >
    {link.label}
  </NavLink>
));

export function InventoryNavigation() {
  return (
    <>
      <Paper className={`${classes.centerMenu}`}>
        <h3>Menu Estoque</h3>
        {items}
      </Paper>
    </>
  );
}
