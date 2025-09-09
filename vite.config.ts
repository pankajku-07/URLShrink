import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  root: path.resolve(__dirname, "client/src"), // React source folder
  build: {
    outDir: path.resolve(__dirname, "dist/public"), // Output for Express
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client/src"),
      "@shared": path.resolve(__dirname, "shared"),
      "@assets": path.resolve(__dirname, "attached_assets"),
    },
  },
  server: {
    fs: {
      strict: true
    }
  },
  css: {
    postcss: path.resolve(__dirname, "postcss.config.js") // ensure PostCSS is loaded
  },
  plugins: [react()]
});
