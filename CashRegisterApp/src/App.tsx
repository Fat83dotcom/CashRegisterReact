import "./styles/global.css";

import { MantineProvider } from "@mantine/core";
import { CollapseDesktop } from "./pages/Main";
import "@mantine/core/styles.css";
import "./styles/global.css";

export function App() {
  return (
    <MantineProvider defaultColorScheme="dark">
      <CollapseDesktop />
    </MantineProvider>
  );
}

export default App;
