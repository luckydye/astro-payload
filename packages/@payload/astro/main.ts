import type { AstroConfig, InjectedRoute } from "astro";

export type AdapterInitOptions = {
	payloadRoute: string;
};

const name = "@luckydye/astro-payload";

export default (options: AdapterInitOptions) => {
	let astroConfig: AstroConfig;

	return {
		name,
		hooks: {
			"astro:config:setup"({ injectRoute }: { injectRoute: (obj: InjectedRoute) => void }) {
				// injectRoute({
				// 	pattern: "/admin",
				// 	entryPoint: options.payloadRoute,
				// });
			},
			"astro:config:done"({ config }: { config: AstroConfig }) {
				astroConfig = config;
			},
			"astro:server:start"() {
				if (astroConfig) {
					fetch(`http://${astroConfig.server.host || "localhost"}:${astroConfig.server.port}/admin`).catch((err) => {
						console.warn("Could not reach localhost.");
					});
				}
			},
		},
	};
};
