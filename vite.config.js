import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { visualizer } from "rollup-plugin-visualizer";
import compression from "vite-plugin-compression";
// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        visualizer({ emitFile: true, filename: "stats.html" }),
        compression({
            algorithm: "brotliCompress",
            ext: ".br",
            verbose: true,
        }),
        compression({
            algorithm: "gzip",
            ext: ".gz",
        }),
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
            "@components": path.resolve(__dirname, "./src/components"),
            "@pages": path.resolve(__dirname, "./src/pages"),
            "@redux": path.resolve(__dirname, "./src/redux"),
            "@routes": path.resolve(__dirname, "./src/routes"),
            "@layouts": path.resolve(__dirname, "./src/layouts"),
            "@assets": path.resolve(__dirname, "./src/assets"),
            "@types": path.resolve(__dirname, "./src/types"),
            "@services": path.resolve(__dirname, "./src/services"),
            "@feedback": path.resolve(__dirname, "./src/feedback"),
        },
    },
    server: {
        port: 3000,
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks: function (id) {
                    if (id.includes("node_modules")) {
                        var module_1 = id.toString().split("node_modules/")[1];
                        if (module_1.startsWith("@mui/")) {
                            if (module_1.includes("@mui/icons-material")) {
                                return "mui-icons";
                            }
                            if (module_1.includes("@mui/styles")) {
                                return "mui-styles";
                            }
                            if (module_1.includes("@mui/material")) {
                                return "mui-material";
                            }
                            return "mui-other";
                        }
                        return module_1.split("/")[0];
                    }
                },
            },
        },
    },
});
