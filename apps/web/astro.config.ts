import "./src/env.d";
import { defineConfig } from "astro/config";
import payload from "@luckydye/astro-payload";
import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
	srcDir: "src",
	output: "server",
	adapter: node({
		mode: "standalone",
	}),
	integrations: [
		payload({
			payloadRoute: "./payload.ts",
		}),
	],
});
