import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const here = path.dirname(fileURLToPath(import.meta.url));
const packageJsonPath = path.resolve(here, "package.json");
const packageVersion = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8")).version as string;

export default defineConfig({
  base: "./",
  define: {
    __APP_VERSION__: JSON.stringify(packageVersion),
  },
  esbuild: {
    tsconfigRaw: {
      compilerOptions: {
        experimentalDecorators: true,
        useDefineForClassFields: false,
      },
    },
  },
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
