/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  base: "/exchange-rates-ui/",
  plugins: [react()],
  optimizeDeps: {
    exclude: ["lucide-react"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./tests/setup.ts"],
    css: true,
    // Node's built-in `localStorage` global (stable since Node 22) shadows
    // jsdom's own implementation and is non-functional without a
    // `--localstorage-file` path, breaking `localStorage.clear()` etc.
    execArgv: ["--no-experimental-webstorage"],
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "json-summary", "lcov"],
      reportsDirectory: "./coverage",
      exclude: [
        "node_modules/**",
        "dist/**",
        "src/main.tsx",
        "src/vite-env.d.ts",
        "tests/**",
        "**/*.d.ts",
        "**/*.config.*",
      ],
    },
  },
});
