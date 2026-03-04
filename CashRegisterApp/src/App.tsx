import "./styles/global.css";

import { MantineProvider } from "@mantine/core";
import { theme } from "./styles/theme";
import { CollapseDesktop } from "./pages/Main";

export function App() {
  return (
    <MantineProvider theme={theme}>
      <CollapseDesktop />
    </MantineProvider>
  );
}

export default App;
