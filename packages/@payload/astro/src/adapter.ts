import type { ViteDevServer } from "vite";
import type { AdapterInitOptions } from "./types.js";
import { dev } from "./server.js";

const name = "@luckydye/astro-payload";

export default (options: AdapterInitOptions) => {
	return {
		name,
		hooks: {
			"astro:server:setup": async ({ server }: { server: ViteDevServer }) => {
				if (server.httpServer) {
					dev(server.httpServer, options);
				}
			},
			"astro:config:done": ({ config, setAdapter }: any) => {
				if (config.output === "server") {
					setAdapter({
						name,
						serverEntrypoint: name + "/server",
					});
				} else {
					// TODO: handle static build?
					throw new Error("Astro needs to be configured to \"output: 'server'\" for this integration to work.");
				}
			},
			// @ts-ignore
			"astro:build:ssr": ({ manifest }) => {
				manifest.payloadInitOptions = options;
			},
		},
	};
};