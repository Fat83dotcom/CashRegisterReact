import { createBrowserRouter, Outlet } from "react-router-dom";
import { RootLayout, MainNavigation } from "./features/main/pages";

import { CreateUserNavigation } from "./features/users/pages/navigation";
import { UserHome } from "./features/users/pages";

import { ProtectedRoute } from "./components/Layout/ProtectedRoute";

import { InventoryHome } from "./features/inventory/pages";
import { InventoryNavigation } from "./features/inventory/pages/navigation";
import { UnitsPage } from "./features/inventory/pages/Units";
import { CategoriesPage } from "./features/inventory/pages/Categories";
import { ConversionsPage } from "./features/inventory/pages/Conversions";
import { WarehousesPage } from "./features/inventory/pages/Warehouses";
import { ProductsPage } from "./features/inventory/pages/Products";
import { SalesNavigation } from "./features/sales/pages/navigation";
import { FinancialHome } from "./features/financial/pages";
import { FinancialNavigation } from "./features/financial/pages/navigation";

import { SettingsHome } from "./features/settings/pages";
import { ChangePassword } from "./features/settings/pages/ChangePassword";
import { SettingsNavigation } from "./features/settings/pages/navigation";
import { Login } from "./features/auth/pages";
import { SalesHome } from "./features/sales/pages";

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
          navbar: <MainNavigation />,
        },
      },
      {
        path: "settings",
        handle: { navbar: <SettingsNavigation /> },
        children: [
          { index: true, element: <SettingsHome /> },
          { path: "security", element: <ChangePassword /> },
        ],
      },
      {
        path: "user",
        element: (
          <ProtectedRoute roles={["Admin"]}>
            <Outlet />
          </ProtectedRoute>
        ),
        handle: { navbar: <CreateUserNavigation /> },
        children: [
          { index: true, element: <UserHome /> },
          { path: "create", element: <UserHome /> },
        ],
      },
      {
        path: "inventory",
        handle: { navbar: <InventoryNavigation /> },
        children: [
          { index: true, element: <InventoryHome /> },
          {
            path: "products",
            children: [
              { index: true, element: <ProductsPage /> },
              { path: "create", element: <ProductsPage /> },
            ],
          },
          {
            path: "warehouses",
            children: [
              { index: true, element: <WarehousesPage /> },
              { path: "create", element: <WarehousesPage /> },
            ],
          },
          {
            path: "categories",
            children: [
              { index: true, element: <CategoriesPage /> },
              { path: "create", element: <CategoriesPage /> },
            ],
          },
          {
            path: "units",
            children: [
              { index: true, element: <UnitsPage /> },
              { path: "create", element: <UnitsPage /> },
            ],
          },
          {
            path: "conversions",
            children: [
              { index: true, element: <ConversionsPage /> },
              { path: "create", element: <ConversionsPage /> },
            ],
          },
        ],
      },
      {
        path: "sales",
        handle: { navbar: <SalesNavigation /> },
        children: [
          { index: true, element: <SalesHome /> },
          { path: "new", element: <h2>Em breve: Nova Venda</h2> },
          { path: "history", element: <h2>Em breve: Histórico de Vendas</h2> },
        ],
      },
      {
        path: "financial",
        handle: { navbar: <FinancialNavigation /> },
        children: [
          { index: true, element: <FinancialHome /> },
          { path: "cashFlow", element: <h2>Em breve: Fluxo de Caixa</h2> },
          { path: "reports", element: <h2>Em breve: Relatórios</h2> },
        ],
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
]);
