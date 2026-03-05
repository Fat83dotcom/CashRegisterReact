import "./styles/global.css";

import { MantineProvider } from "@mantine/core";
import { theme } from "./styles/theme";
import { CollapseDesktop } from "./pages/Main";
import "@mantine/core/styles.css";
import "./styles/global.css";

export function App() {
  return (
    <MantineProvider theme={theme}>
      <CollapseDesktop />
    </MantineProvider>
  );
}

export default App;
