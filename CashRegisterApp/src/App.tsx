import "./styles/global.css";

import { createTheme, MantineProvider, type MantineColorsTuple } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/dates/styles.css";
import "./styles/global.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { Notifications } from "@mantine/notifications";
import { AuthProvider } from "./contexts/AuthContext";

const brainstormBlue: MantineColorsTuple = [
  "#e5f1ff",
  "#cce3ff",
  "#99c5ff",
  "#66a7ff",
  "#3389ff",
  "#006bff",
  "#0055ff", // Primary
  "#0044cc",
  "#003399",
  "#002266"
];

const theme = createTheme({
  primaryColor: "brainstorm",
  primaryShade: 6,
  colors: {
    brainstorm: brainstormBlue,
  },
  fontFamily: "Inter, Poppins, sans-serif",
  headings: {
    fontFamily: "Poppins, sans-serif",
    fontWeight: "700",
  },
  defaultRadius: "md", // Padrão mais sóbrio para o sistema
  components: {
    Paper: {
      defaultProps: {
        radius: "md",
        withBorder: true,
        shadow: "sm",
      },
    },
    Button: {
      defaultProps: {
        radius: "xl", // Botões continuam estilo pill
      },
    },
    TextInput: {
      defaultProps: {
        radius: "xl", // Inputs de formulário estilo pill
        size: "md",   // Padronizando tamanho médio para todos
      },
    },
    PasswordInput: {
      defaultProps: {
        radius: "xl",
        size: "md",
      },
    },
    Select: {
      defaultProps: {
        radius: "xl",
        size: "md",
      },
    },
    Autocomplete: {
      defaultProps: {
        radius: "xl",
        size: "md",
      },
    },
    NumberInput: {
      defaultProps: {
        radius: "xl",
        size: "md",
      },
    },
    MultiSelect: {
      defaultProps: {
        radius: "xl",
        size: "md",
      },
    },
    // Menus e Dropdowns devem ser menos arredondados para um ar mais profissional
    Menu: {
      defaultProps: {
        radius: "md",
      },
    },
    Popover: {
      defaultProps: {
        radius: "md",
      },
    },
    Modal: {
      defaultProps: {
        radius: "lg",
      },
    },
    // Componentes de data (Mantine Dates)
    DateInput: {
      defaultProps: {
        radius: "xl",
        size: "md",
      },
    },
    DateTimePicker: {
      defaultProps: {
        radius: "xl",
        size: "md",
      },
    },
  },
});

export function App() {
  return (
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <Notifications position="bottom-right" />
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </MantineProvider>
  );
}

export default App;
