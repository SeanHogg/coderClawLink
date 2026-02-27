import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const here = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  base: "./",
  publicDir: path.resolve(here, "public"),
  optimizeDeps: {
    include: ["lit/directives/repeat.js"],
  },
  build: {
    outDir: path.resolve(here, "static"),
    emptyOutDir: true,
    sourcemap: true,
  },
  server: {
    host: true,
    port: 5174,
    strictPort: true,
    proxy: {
      "/api": {
        target: "http://localhost:8787",
        changeOrigin: true,
        ws: true,
      },
    },
  },
});
