import { createBrowserRouter, Outlet } from "react-router-dom";
import { RootLayout, MainNavigation } from "./features/main/pages";
import { NotFoundPage } from "./features/main/pages/NotFoundPage";
import { CreateUserNavigation } from "./features/users/pages/navigation";
import { ProtectedRoute } from "./components/Layout/ProtectedRoute";
import { InventoryHome } from "./features/inventory/pages";
import { InventoryNavigation } from "./features/inventory/pages/navigation";
import { SalesNavigation } from "./features/sales/pages/navigation";
import { FinancialHome } from "./features/financial/pages";
import { FinancialNavigation } from "./features/financial/pages/navigation";
import { RequisitionsPage } from "./features/financial/pages/Operations/Requisitions";
import { SettingsHome } from "./features/settings/pages";
import { ChangePassword } from "./features/settings/pages/ChangePassword";
import { PreferencesPage } from "./features/settings/pages/Preferences";
import { SettingsNavigation } from "./features/settings/pages/navigation";
import { Login } from "./features/auth/pages";
import { SalesHome } from "./features/sales/pages";
import { GlobalErrorBoundary } from "./components/Layout/GlobalErrorBoundary";
import type { LoaderFunction } from "react-router-dom";
import type { ComponentType } from "react";

// Helper genérico para Lazy Loading de módulos com exports nomeados
const lazyPage = <TModule extends Record<string, unknown>>(
  importFunc: () => Promise<TModule>,
  componentName: keyof TModule,
  loaderName?: keyof TModule,
) => {
  return async () => {
    const module = await importFunc();
    return {
      Component: module[componentName] as ComponentType<unknown>,
      loader: loaderName ? (module[loaderName] as LoaderFunction) : undefined,
    };
  };
};

export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <GlobalErrorBoundary />,
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
          { path: "preferences", element: <PreferencesPage /> },
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
          {
            index: true,
            lazy: lazyPage(
              () => import("./features/users/pages"),
              "UserHome",
              "usersLoader",
            ),
          },
          {
            path: "search",
            lazy: lazyPage(
              () => import("./features/users/pages"),
              "UserHome",
              "usersLoader",
            ),
          },
          {
            path: "create",
            lazy: lazyPage(
              () => import("./features/users/pages"),
              "UserHome",
              "usersLoader",
            ),
          },
        ],
      },
      {
        path: "inventory",
        handle: { navbar: <InventoryNavigation /> },
        children: [
          { index: true, element: <InventoryHome /> },
          { path: "home", element: <InventoryHome /> },
          {
            path: "balances",
            lazy: lazyPage(
              () => import("./features/inventory/pages/Balances"),
              "StockBalancesPage",
              "balancesLoader",
            ),
          },
          {
            path: "stock",
            lazy: lazyPage(
              () => import("./features/inventory/pages/Stock"),
              "StockPage",
              "stockLoader",
            ),
          },
          {
            path: "products",
            children: [
              {
                index: true,
                lazy: lazyPage(
                  () => import("./features/inventory/pages/Products"),
                  "ProductsPage",
                  "productsLoader",
                ),
              },
              {
                path: "create",
                lazy: lazyPage(
                  () => import("./features/inventory/pages/Products"),
                  "ProductsPage",
                  "productsLoader",
                ),
              },
            ],
          },
          {
            path: "warehouses",
            children: [
              {
                index: true,
                lazy: lazyPage(
                  () => import("./features/inventory/pages/Warehouses"),
                  "WarehousesPage",
                  "warehousesLoader",
                ),
              },
              {
                path: "create",
                lazy: lazyPage(
                  () => import("./features/inventory/pages/Warehouses"),
                  "WarehousesPage",
                  "warehousesLoader",
                ),
              },
            ],
          },
          {
            path: "categories",
            children: [
              {
                index: true,
                lazy: lazyPage(
                  () => import("./features/inventory/pages/Categories"),
                  "CategoriesPage",
                  "categoriesLoader",
                ),
              },
              {
                path: "create",
                lazy: lazyPage(
                  () => import("./features/inventory/pages/Categories"),
                  "CategoriesPage",
                  "categoriesLoader",
                ),
              },
            ],
          },
          {
            path: "tags",
            children: [
              {
                index: true,
                lazy: lazyPage(
                  () => import("./features/inventory/pages/Tags"),
                  "TagsPage",
                  "tagsLoader",
                ),
              },
              {
                path: "create",
                lazy: lazyPage(
                  () => import("./features/inventory/pages/Tags"),
                  "TagsPage",
                  "tagsLoader",
                ),
              },
            ],
          },
          {
            path: "units",
            children: [
              {
                index: true,
                lazy: lazyPage(
                  () => import("./features/inventory/pages/Units"),
                  "UnitsPage",
                  "unitsLoader",
                ),
              },
              {
                path: "create",
                lazy: lazyPage(
                  () => import("./features/inventory/pages/Units"),
                  "UnitsPage",
                  "unitsLoader",
                ),
              },
            ],
          },
          {
            path: "conversions",
            children: [
              {
                index: true,
                lazy: lazyPage(
                  () => import("./features/inventory/pages/Conversions"),
                  "ConversionsPage",
                  "conversionsLoader",
                ),
              },
              {
                path: "create",
                lazy: lazyPage(
                  () => import("./features/inventory/pages/Conversions"),
                  "ConversionsPage",
                  "conversionsLoader",
                ),
              },
            ],
          },
          {
            path: "suppliers",
            children: [
              {
                index: true,
                lazy: lazyPage(
                  () => import("./features/inventory/pages/Suppliers"),
                  "SuppliersPage",
                  "suppliersLoader",
                ),
              },
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
          {
            path: "operations",
            children: [{ path: "requisitions", element: <RequisitionsPage /> }],
          },
        ],
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
]);
