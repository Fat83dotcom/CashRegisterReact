import { NavLink } from "react-router-dom";
import classes from "./styles/Navigation.module.css";
import { Paper } from "@mantine/core";

const links = [
  { link: "/financial", label: "Painel Financeiro" },
  { link: "/financial/cashFlow", label: "Fluxo de Caixa" },
  { link: "/financial/reports", label: "Relatórios" },
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

export function FinancialNavigation() {
  return (
    <>
      <Paper className={`${classes.centerMenu}`}>
        <h3>Menu Financeiro</h3>
        {items}
      </Paper>
    </>
  );
}
