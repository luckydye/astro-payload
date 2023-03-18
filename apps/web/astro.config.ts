import path from "path";
import { defineConfig } from "astro/config";
import { startup } from "./server.js";

function payload() {
	return {
		name: "astro-payload",
		hooks: {
			"astro:server:setup": (astro) => {
				startup(astro);
			},
			// "astro:config:done": ({ setAdapter }) => {
			// 	setAdapter({
			// 		name: "astro-payload",
			// 		serverEntrypoint: path.resolve("./server.ts"),
			// 	});
			// },
		},
	};
}

export default defineConfig({
	srcDir: "src",
	output: "server",
	publicDir: "public",
	adapter: payload(),
	vite: {
		ssr: {
			noExternal: ["path-to-regexp"],
		},
	},
});
