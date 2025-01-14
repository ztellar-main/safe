import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";
import { NodeModulesPolyfillPlugin } from "@esbuild-plugins/node-modules-polyfill";
import rollupNodePolyFill from "rollup-plugin-polyfill-node";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: "globalThis", // Polyfill for global
      },
      plugins: [
        NodeGlobalsPolyfillPlugin({
          process: true,
          buffer: true,
        }),
        NodeModulesPolyfillPlugin(),
      ],
    },
  },
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      process: "rollup-plugin-node-polyfills/polyfills/process-es6",
      Buffer: "rollup-plugin-node-polyfills/polyfills/buffer-es6",
    },
  },
  build: {
    minify: false, // Disable minification,
    target: "esnext",
    rollupOptions: {
      plugins: [rollupNodePolyFill()],
      output: {
        manualChunks: undefined, // Disable code splitting
      },
    },
  },
});
