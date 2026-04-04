import { createBrowserRouter, Outlet } from "react-router-dom";
import { RootLayout } from "./pages/Main";
import { CreateUser } from "./pages/User/Create";
import { CreateUserNavigation } from "./pages/User/navigation";
import { UserHome } from "./pages/User";
import { DeleteUser } from "./pages/User/Delete";
import { Login } from "./pages/Login";
import { ProtectedRoute } from "./Components/ProtectedRoute";

import { InventoryHome } from "./pages/Inventory";
import { InventoryNavigation } from "./pages/Inventory/navigation";
import { SalesHome } from "./pages/Sales";
import { SalesNavigation } from "./pages/Sales/navigation";
import { FinancialHome } from "./pages/Financial";
import { FinancialNavigation } from "./pages/Financial/navigation";

import { SettingsHome } from "./pages/Settings";
import { ChangePassword } from "./pages/Settings/ChangePassword";
import { SettingsNavigation } from "./pages/Settings/navigation";

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

