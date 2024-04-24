import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/GestionDesProjectsPFE/",

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
