import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  root: "client", // point Vite to your React source folder
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client/src"), // @ points to client/src
    },
  },
  build: {
    outDir: path.resolve(__dirname, "dist/public"), // build files here
    emptyOutDir: true,
    rollupOptions: {
      output: {
        // optional: split large chunks
        manualChunks(id) {
          if (id.includes("node_modules")) return "vendor";
        },
      },
    },
    chunkSizeWarningLimit: 1000, // optional: suppress 500kb warning
  },
});
