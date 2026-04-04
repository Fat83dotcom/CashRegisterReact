import { NavLink } from "react-router-dom";
import classes from "./styles/Navigation.module.css";
import { Paper } from "@mantine/core";

const links = [
  { link: "/settings", label: "Perfil" },
  { link: "/settings/security", label: "Segurança" },
];

const items = links.map((link) => (
  <NavLink
    key={link.label}
    to={link.link}
    className={({ isActive }) =>
      isActive ? `${classes.link} ${classes.linkActive}` : classes.link
    }
    end={link.link === "/settings"}
  >
    {link.label}
  </NavLink>
));

export function SettingsNavigation() {
  return (
    <>
      <Paper className={`${classes.centerMenu}`}>
        <h3>Configurações</h3>
        {items}
      </Paper>
    </>
  );
}
