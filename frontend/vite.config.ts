import path from "node:path";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
// @note 以下をインポートしてpluginsに追加するとエラーが発生する
// import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), TanStackRouterVite()],
  // plugins: [react(), TanStackRouterVite(), viteReact()],
  resolve: {
    alias: {
      // "@": path.resolve(import.meta.dir, "./src"),
      "@": path.resolve(__dirname, "./src"),
      "@backend": path.resolve(__dirname, "../backend"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:3000",
        changeOrigin: true,
      },
    },
  },
});
