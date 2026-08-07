import { IconShieldLock, IconUserEdit } from "@tabler/icons-react";
import { ModuleDashboardTemplate } from "../../../components/Layout/ModuleDashboardTemplate";

export function SettingsHome() {
  const cards = [
    { subtitle: "Segurança", title: "Alterar Senha", icon: IconShieldLock, link: "/settings/security", color: "red" },
    { subtitle: "Perfil", title: "Editar Perfil", icon: IconUserEdit, link: "/settings", color: "blue" },
  ];

  return (
    <ModuleDashboardTemplate
      title="Configurações do Sistema"
      description="Gerencie as configurações da sua conta, permissões e preferências de segurança do usuário atual."
      cards={cards}
    />
  );
}
