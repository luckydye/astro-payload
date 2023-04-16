const name = "@luckydye/astro-payload";
export default (options) => {
    let astroConfig;
    return {
        name,
        hooks: {
            "astro:config:setup"({ injectRoute, }) {
                injectRoute({
                    pattern: "/payload",
                    entryPoint: options.payloadRoute,
                });
            },
            "astro:config:done"({ config }) {
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
