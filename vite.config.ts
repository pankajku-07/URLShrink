import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  root: "client", // <-- your source React folder
  build: {
    outDir: path.resolve(__dirname, "dist/public"), // <-- output goes here
    emptyOutDir: true,
  },
});
