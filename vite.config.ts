import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { NodeModulesPolyfillPlugin } from "@esbuild-plugins/node-modules-polyfill";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: "globalThis", // Polyfill for global
      },
      plugins: [NodeModulesPolyfillPlugin()],
    },
  },
  server: {
    port: 3000,
  },
});
