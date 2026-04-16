import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Permite acesso via rede local
    strictPort: true, // Garante que use sempre a 5173
    hmr: {
      overlay: true, // Exibe erros de runtime na tela
    },
    watch: {
      usePolling: false, // Mantém false para melhor performance no Linux nativo
    },
  },
  clearScreen: false, // Não limpa o console para facilitar o debug de histórico
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    sourcemap: true,
  },
  css: {
    devSourcemap: true,
  },
});
