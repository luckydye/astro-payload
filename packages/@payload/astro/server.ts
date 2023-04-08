import path from "path";
import fastifyExpress from "@fastify/express";
import fastifyStatic from "@fastify/static";
import { App } from "astro/app";
import express from "express";
import Fastify from "fastify";
import http from "http";
import payload from "payload";
import { AdapterInitOptions, ExtendedSSRManifest } from "./types";

async function getPayloadConfig(payloadConfigPath?: string) {
	const configPath = path.resolve("./" + payloadConfigPath || "./payload.config");
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

async function startPayload(config: AdapterInitOptions) {
	const app = express();

	// Initialize Payload
	payload.init({
		// @ts-ignore
		express: app,
		onInit: () => {
			payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`);
		},
		config: getPayloadConfig(config.configPath),
		...config,
	});

	return app;
}

// development server entry
export async function dev(server: http.Server, payloadInitOptions: AdapterInitOptions) {
	const router = await startPayload(payloadInitOptions);

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
		router(req, res, next);
	});
}

// built server entry
export async function start(manifest: ExtendedSSRManifest) {
	const server = Fastify({ logger: true });
	const app = new App(manifest);
	const payloadRouter = await startPayload(manifest.payloadInitOptions);

	console.log("static", path.resolve("./client"), import.meta.url);

	await server
		.register(fastifyStatic, {
			root: path.resolve("./dist/client"),
		})
		.register(fastifyExpress);

	server.use(payloadRouter);

	server.use(async (req, res) => {
		const request = new Request("http://localhost:3000" + req.url);
		if (app.match(request)) {
			const response = await app.render(request);
			return await response.text();
		}
	});

	server.listen({ host: process.env.HOST, port: +(process.env.PORT || 0) || undefined });
}
