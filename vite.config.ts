import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  root: path.resolve("client"), // <-- your index.html is here
  build: {
    outDir: path.resolve("dist/public"), // build output goes here
    emptyOutDir: true,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve("client/src"), // react source code
      "@shared": path.resolve("shared"),
      "@assets": path.resolve("attached_assets")
    }
  },
  server: {
    fs: {
      strict: true
    }
  }
});
