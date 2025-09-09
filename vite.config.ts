import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

const plugins = [react()];

if (process.env.NODE_ENV !== "production") {
  // only require dev-only plugins in development
  try {
    const runtimeErrorOverlay = await import("@replit/vite-plugin-runtime-error-modal").then(m => m.default);
    plugins.push(runtimeErrorOverlay());
  } catch (err) {
    console.warn("Dev-only plugin not installed, skipping...");
  }
}

export default defineConfig({
  root: path.resolve("./src"),
  build: {
    outDir: path.resolve("./dist/public"),
    emptyOutDir: true,
  },
  plugins,
});
