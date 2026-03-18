import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "./pages/Main";
import { CreateUser } from "./pages/User/Create";
import { CreateUserNavigation } from "./pages/User/navigation";
import { UserHome } from "./pages/User";
import { DeleteUser } from "./pages/User/Delete";
import { Login } from "./pages/Login";
import { ProtectedRoute } from "./Components/ProtectedRoute";

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
        path: "user/",
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
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
]);
