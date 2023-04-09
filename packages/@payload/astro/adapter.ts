import { start, dev } from "./server";
import vite from "vite";
import { AdapterInitOptions } from "./types.ts";

export default (options: AdapterInitOptions) => {
	return {
		name: "@payload/astro",
		hooks: {
			"astro:server:setup": async ({ server }: { server: vite.ViteDevServer }) => {
				if (server.httpServer) {
					dev(server.httpServer, options);
				}
			},
			"astro:config:done": ({ setAdapter }: any) => {
				setAdapter({
					name: "@payload/astro",
					serverEntrypoint: "@payload/astro/server",
				});
			},
			// @ts-ignore
			"astro:build:ssr": ({ manifest }) => {
				manifest.payloadInitOptions = options;
			},
		},
	};
};
