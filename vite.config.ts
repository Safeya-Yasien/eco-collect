import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

import { visualizer } from "rollup-plugin-visualizer";
import compression from "vite-plugin-compression";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    visualizer({
      emitFile: true,
      filename: "stats.html",
    }),
    compression({
      algorithm: "brotliCompress",
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@redux": path.resolve(__dirname, "./src/redux"),
      "@routes": path.resolve(__dirname, "./src/routes"),
      "@layouts": path.resolve(__dirname, "./src/layouts"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@types": path.resolve(__dirname, "./src/types"),
      "@services": path.resolve(__dirname, "./src/services"),
    },
  },
  server: {
    port: 3000,
  },
});
