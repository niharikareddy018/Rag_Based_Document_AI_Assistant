import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import esbuild from "esbuild";
import { defineConfig } from "vite";

const jsxInJsPlugin = () => ({
  name: "jsx-in-js",
  enforce: "pre",
  transform(code, id) {
    if (id.includes("node_modules") || !id.includes("/src/")) return;
    const cleanId = id.split("?")[0];
    if (cleanId.endsWith(".js")) {
      const res = esbuild.transformSync(code, {
        loader: "jsx",
        jsx: "automatic",
      });
      return {
        code: res.code,
        map: null,
      };
    }
  },
});

export default defineConfig({
  plugins: [
    jsxInJsPlugin(),
    react({
      include: /\.jsx$/,
    }),
    tailwindcss(),
  ],
  server: {
    port: 3000,
    host: "0.0.0.0",
  },
});
