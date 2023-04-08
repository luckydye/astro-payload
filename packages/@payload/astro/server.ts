import fastifyExpress from "@fastify/express";
import fastifyStatic from "@fastify/static";
import { App } from "astro/app";
import express from "express";
import Fastify from "fastify";
import http from "http";
import payload from "payload";
import { SanitizedConfig } from "payload/config";
import { fileURLToPath } from "url";
import { ExtendedSSRManifest, PayloadOptions } from "./types";

async function getPayloadConfig(): Promise<SanitizedConfig> {
	//@ts-ignore
	return {};
}

async function startPayload(config: PayloadOptions) {
	const app = express.Router();

	// Initialize Payload
	payload.init({
		// @ts-ignore
		express: app,
		onInit: () => {
			payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`);
		},
		// config: getPayloadConfig(),
		...config,
	});

	return app;
}

// development server entry
export async function dev(server: http.Server, payloadInitOptions: PayloadOptions) {
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
	const app = new App(manifest);

	const server = Fastify({ logger: true });

	await server
		.register(fastifyStatic, {
			root: fileURLToPath(new URL("../client", import.meta.url)),
		})
		.register(fastifyExpress);

	const payloadRouter = await startPayload(manifest.payloadInitOptions);
	server.use(payloadRouter);

	server.use(async (req, res) => {
		const request = new Request("http://localhost:3000" + req.url);
		if (app.match(request)) {
			const response = await app.render(request);
			return await response.text();
		}
	});

	server.listen({ host: process.env.HOST, port: +(process.env.PORT || 3000) });
}
