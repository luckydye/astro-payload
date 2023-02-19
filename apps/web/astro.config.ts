import path from "path";
import { defineConfig } from "astro/config";

function payload() {
  return {
    name: "astro-payload",
    hooks: {
      "astro:config:done": ({ setAdapter }) => {
        setAdapter({
          name: "astro-payload",
          serverEntrypoint: path.resolve("./server.ts"),
        });
      },
    },
  };
}

export default defineConfig({
  srcDir: "src",
  output: "server",
  publicDir: "public",
  // outDir: "dist",
  // build: {
  //   // server: path.resolve("./dist"),
  //   client: path.resolve("./dist/public"),
  //   serverEntry: "dist/server.mjs",
  // },
  adapter: payload(),
  vite: {
    ssr: {
      noExternal: ["path-to-regexp"],
    },
  },
});
