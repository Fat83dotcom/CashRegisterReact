import { NavLink } from "react-router-dom";

import classes from "./styles/Navigation.module.css";
import { Paper } from "@mantine/core";

const links = [
  { link: "/user/create", label: "Criar Usuário" },
  { link: "/user/delete", label: "Deletar Usuário" },
];

const items = links.map((link) => (
  <NavLink
    key={link.label}
    to={link.link}
    className={({ isActive }) =>
      // O NavLink sabe se está ativo. Pode adicionar uma classe CSS dinâmica aqui!
      isActive ? `${classes.link} ${classes.linkActive}` : classes.link
    }
  >
    {link.label}
  </NavLink>
));

export function CreateUserNavigation() {
  return (
    <>
      <Paper className={`${classes.centerMenu}`}>
        <h3>Menu Usuário</h3>
        {items}
      </Paper>
    </>
  );
}
