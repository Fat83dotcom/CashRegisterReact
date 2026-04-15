import { createBrowserRouter, Outlet } from "react-router-dom";
import { RootLayout } from "./features/main/pages";
import { CreateUser } from "./features/users/pages/Create";
import { CreateUserNavigation } from "./features/users/pages/navigation";
import { UserHome } from "./features/users/pages";
import { DeleteUser } from "./features/users/pages/Delete";
import { Login } from "./features/auth/pages";
import { ProtectedRoute } from "./components/Layout/ProtectedRoute";

import { InventoryHome } from "./features/inventory/pages";
import { InventoryNavigation } from "./features/inventory/pages/navigation";
import { SalesHome } from "./features/sales/pages";
import { SalesNavigation } from "./features/sales/pages/navigation";
import { FinancialHome } from "./features/financial/pages";
import { FinancialNavigation } from "./features/financial/pages/navigation";

import { SettingsHome } from "./features/settings/pages";
import { ChangePassword } from "./features/settings/pages/ChangePassword";
import { SettingsNavigation } from "./features/settings/pages/navigation";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <RootLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <h2>Bem-vindo ao Dashboard do Caixa</h2>,
        handle: {
          navbar: <div>Menu Principal do Sistema</div>,
        },
      },
      {
        path: "settings/",
        children: [
          {
            index: true,
            element: <SettingsHome />,
            handle: {
              navbar: <SettingsNavigation />,
            },
          },
          {
            path: "security",
            element: <ChangePassword />,
            handle: {
              navbar: <SettingsNavigation />,
            },
          },
        ],
      },
      {
        path: "user/",
        element: (
          <ProtectedRoute roles={["Admin"]}>
            <Outlet />
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: <UserHome />,
            handle: {
              navbar: <CreateUserNavigation />,
            },
          },
          {
            path: "create",
            element: <CreateUser />,
            handle: {
              navbar: <CreateUserNavigation />,
            },
          },
          {
            path: "delete",
            element: <DeleteUser />,
            handle: {
              navbar: <CreateUserNavigation />,
            },
          },
        ],
      },
      {
        path: "inventory/",
        children: [
          {
            index: true,
            element: <InventoryHome />,
            handle: {
              navbar: <InventoryNavigation />,
            },
          },
          {
            path: "products",
            element: <h2>Em breve: Produtos</h2>,
            handle: {
              navbar: <InventoryNavigation />,
            },
          },
          {
            path: "categories",
            element: <h2>Em breve: Categorias</h2>,
            handle: {
              navbar: <InventoryNavigation />,
            },
          },
        ],
      },
      {
        path: "sales/",
        children: [
          {
            index: true,
            element: <SalesHome />,
            handle: {
              navbar: <SalesNavigation />,
            },
          },
          {
            path: "new",
            element: <h2>Em breve: Nova Venda</h2>,
            handle: {
              navbar: <SalesNavigation />,
            },
          },
          {
            path: "history",
            element: <h2>Em breve: Histórico de Vendas</h2>,
            handle: {
              navbar: <SalesNavigation />,
            },
          },
        ],
      },
      {
        path: "financial/",
        children: [
          {
            index: true,
            element: <FinancialHome />,
            handle: {
              navbar: <FinancialNavigation />,
            },
          },
          {
            path: "cashFlow",
            element: <h2>Em breve: Fluxo de Caixa</h2>,
            handle: {
              navbar: <FinancialNavigation />,
            },
          },
          {
            path: "reports",
            element: <h2>Em breve: Relatórios</h2>,
            handle: {
              navbar: <FinancialNavigation />,
            },
          },
        ],
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
]);

