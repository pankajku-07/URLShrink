import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

const isDev = process.env.NODE_ENV !== "production";

const plugins = [react()];

if (isDev) {
  try {
    const runtimeErrorOverlay = await import("@replit/vite-plugin-runtime-error-modal").then(m => m.default);
    plugins.push(runtimeErrorOverlay());
  } catch (err) {
    console.warn("Dev-only plugin not installed, skipping...");
  }
}

export default defineConfig({
  root: path.resolve("src"), // must match where index.html is
  build: {
    outDir: path.resolve("dist/public"),
    emptyOutDir: true,
  },
  plugins,
  resolve: {
    alias: {
      "@": path.resolve("src"),
      "@shared": path.resolve("shared"),
      "@assets": path.resolve("attached_assets"),
    },
  },
});
