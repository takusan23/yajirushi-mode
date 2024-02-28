import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";
import { viteSingleFile } from "vite-plugin-singlefile";

export default defineConfig({
    root: "./src-ui", // UI のコンポーネントとかがあるパス
    plugins: [reactRefresh(), viteSingleFile()],
    build: {
        target: "esnext",
        assetsInlineLimit: 100000000,
        chunkSizeWarningLimit: 100000000,
        cssCodeSplit: false,
        outDir: "../dist",
        rollupOptions: {
            output: {
                inlineDynamicImports: true,
            },
        },
    },
});