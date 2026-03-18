import "./styles/global.css";

import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/dates/styles.css";
import "./styles/global.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { Notifications } from "@mantine/notifications";
import { AuthProvider } from "./contexts/AuthContext";

export function App() {
  return (
    <MantineProvider defaultColorScheme="dark">
      <Notifications position="bottom-right" />
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </MantineProvider>
  );
}

export default App;
