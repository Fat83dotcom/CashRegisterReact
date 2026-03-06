import "./styles/global.css";

import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "./styles/global.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";

export function App() {
  return (
    <MantineProvider defaultColorScheme="dark">
      <RouterProvider router={router} />
    </MantineProvider>
  );
}

export default App;
