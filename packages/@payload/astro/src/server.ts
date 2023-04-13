import path from "path";
import { App } from "astro/app";
import Express from "express";
import http from "http";
import { default as payload } from "payload";
import type { AdapterInitOptions, ExtendedSSRManifest } from "./types.js";

export async function startPayload(server: http.Server, config: AdapterInitOptions) {
	const app = Express();

	if (config.serverEntry) {
		// custom payload server entry is configured
		const { default: start } = await import(/* @vite-ignore */ path.resolve(config.serverEntry));
		await start(server, app, config);
	} else {
		// initialize builtin payload
		// @ts-ignore
		await payload.init({
			express: app,
			config: config.configPath ? getPayloadConfig(config.configPath) : undefined,
			...config,
		});
	}

	return app;
}

export async function getPayloadConfig(payloadConfigPath?: string) {
	const configPath = path.resolve("./" + payloadConfigPath);
	const { default: payloadConfig } = await import(/* @vite-ignore */ configPath);

	// validate config
	if ("serverURL" in (await payloadConfig)) {
		return payloadConfig;
	} else if ("serverURL" in (await payloadConfig.default)) {
		// support cjs import ?!
		return payloadConfig.default;
	}

	throw new Error('Could not find payload config. Specify "configPath" in the payload adapter.');
}

// development server entry
export async function dev(server: http.Server, payloadInitOptions: AdapterInitOptions) {
	const payloadRouter = await startPayload(server, payloadInitOptions);

	// use the astro server for both request handlers
	const listeners = server.listeners("request");
	const astroListener = listeners[0];

	// @ts-ignore
	server.off("request", astroListener);
	server.on("request", (req, res) => {
		const next = () => {
			astroListener(req, res);
		};
		// @ts-ignore
		payloadRouter(req, res, next);
	});
}

// built server entry
export async function start(manifest: ExtendedSSRManifest) {
	const express = Express();
	const app = new App(manifest);
	const server = http.createServer(express);
	const payloadRouter = await startPayload(server, manifest.payloadInitOptions);

	express.use(Express.static("dist/client/"));
	express.use(payloadRouter);

	express.use(async (req, res) => {
		const request = new Request("http://localhost:3000" + req.url);

		if (app.match(request)) {
			const response = await app.render(request);
			return res.status(response.status).send(await response.text());
		}

		return res.status(404).send("Not found");
	});

	server.listen(+(process.env.PORT || 0) || undefined, process.env.HOST);
}
