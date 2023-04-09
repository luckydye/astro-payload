import { start, dev } from "./server.js";
import vite from "vite";
import type { AdapterInitOptions } from "./types";

const name = "@luckydye/astro-payload";

export default (options: AdapterInitOptions) => {
	return {
		name,
		hooks: {
			"astro:server:setup": async ({ server }: { server: vite.ViteDevServer }) => {
				if (server.httpServer) {
					dev(server.httpServer, options);
				}
			},
			"astro:config:done": ({ setAdapter }: any) => {
				setAdapter({
					name,
					serverEntrypoint: name + "/server",
				});
			},
			// @ts-ignore
			"astro:build:ssr": ({ manifest }) => {
				manifest.payloadInitOptions = options;
			},
		},
	};
};
