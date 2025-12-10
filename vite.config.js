// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://suitmedia-backend.suitdev.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      "/proxy/image": {
        target: "https://assets.suitdev.com",
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/proxy\/image/, ""),
      },
    },
  },
});
