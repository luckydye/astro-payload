import type { AstroConfig } from "astro";

export type AdapterInitOptions = {
	payloadRoute: string;
};

const name = "@luckydye/astro-payload";

export default (options: AdapterInitOptions) => {
	let astroConfig: AstroConfig;

	return {
		name,
		hooks: {
			"astro:config:setup"({
				injectRoute,
			}: {
				injectRoute: ({ pattern, entryPoint }: { pattern: string; entryPoint: string }) => void;
			}) {
				injectRoute({
					pattern: "/payload",
					entryPoint: options.payloadRoute,
				});
			},
			"astro:config:done"({ config }: { config: AstroConfig }) {
				astroConfig = config;
			},
			"astro:server:start"() {
				if (astroConfig) {
					fetch(`http://${astroConfig.server.host || "localhost"}:${astroConfig.server.port}/payload`).catch((err) => {
						console.warn("Could not reach localhost.");
					});
				}
			},
		},
	};
};
