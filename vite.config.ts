import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  cacheDir: ".yarn/.vite",
  plugins: [react()],
});
