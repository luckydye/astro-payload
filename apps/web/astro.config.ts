import { defineConfig } from "astro/config";
import { start, dev } from "./server";

export default defineConfig({
  srcDir: "src",
  output: "server",
  build: {
    serverEntry: "server.mjs",
  },
  adapter: {
    name: "astro-payload",
    hooks: {
      "astro:server:setup": (astro) => {
        console.log("dev startup..");
        dev(astro);
      },
      "astro:config:done": ({ setAdapter }) => {
        setAdapter({
          name: "astro-payload",
          serverEntrypoint: "./server.ts",
        });
      },
    },
  },
  // vite: {
  //   ssr: {
  //     noExternal: ["path-to-regexp"],
  //   },
  // },
});
