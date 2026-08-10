import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

// Configura o motor de fusos horários do sistema (Normalização Cronológica)
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("America/Sao_Paulo"); // Fuso base para a Fase 1

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
