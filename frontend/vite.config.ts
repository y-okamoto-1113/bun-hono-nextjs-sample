import path from "node:path";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
// @note 以下をインポートしてpluginsに追加するとエラーが発生する
// import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths"; // tsconfigで設定したpath aliasを使えるようにする

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), TanStackRouterVite(), tsconfigPaths()],
  // plugins: [react(), TanStackRouterVite(), viteReact()],

  // @note tsconfigPathsを使うと以下の設定は不要
  // resolve: {
  //   alias: {
  //     // "@": path.resolve(import.meta.dir, "./src"),
  //     "@": path.resolve(__dirname, "./src"),
  //     "@backend": path.resolve(__dirname, "../backend"),
  //   },
  // },
  server: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:3000",
        changeOrigin: true,
      },
    },
  },
});
