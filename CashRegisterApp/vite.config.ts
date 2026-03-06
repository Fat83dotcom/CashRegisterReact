import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: true, // Obrigatório para o Debugger funcionar no VS Code
  },
  css: {
    devSourcemap: true,
  },
});
