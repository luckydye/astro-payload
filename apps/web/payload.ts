import payload from "payload";
import { getPayloadConfig } from "@payload/astro/server";

export default async (server, express, config) => {
	await payload.init({
		express,
		config: getPayloadConfig(config.configPath),
		...config,
	});
};
