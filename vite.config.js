import { defineConfig } from "vite"
import { resolve } from "path"
import glsl from "vite-plugin-glsl"

export default defineConfig({
  base: "/",
  appType: "mpa",
  plugins: [glsl()],
  esbuild: {
    jsxInject: `import { toVirtualDom, render } from 'VirtualDom'`,
    jsxFactory: "toVirtualDom",
  },
  resolve: {
    build: {
      rollupOptions: {
        input: {
          main: resolve(__dirname, "index.html"),
          admin: resolve(__dirname, "admin/index.html"),
        },
      },
    },
    alias: {
      VirtualDom: "./Core/VirtualDom/index.js",
      Store: "./Core/Store/index.js",
      Core: "./Core",
    },
  },
})
