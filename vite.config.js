import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist", // Adjust the output directory as needed
  },

  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "https://gestiondesprojectsserver.onrender.com",
        changeOrigin: true,
      },
    },
  },
});
