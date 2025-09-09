import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  root: path.resolve(__dirname, "client"), // React app folder
  build: {
    outDir: path.resolve(__dirname, "dist/public"), // Express serves this
    emptyOutDir: true,root: path.resolve(__dirname, "client"),// React app folder
  },
  build: {
    outDir: path.resolve(__dirname, "dist/public"), // Express serves this
    emptyOutDir: true,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client/src"),
      "@shared": path.resolve(__dirname, "shared"),
      "@assets": path.resolve(__dirname, "attached_assets"),
    },
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
  });
