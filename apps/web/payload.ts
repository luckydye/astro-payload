import payload from "payload";
import payloadConfig from "./payload.config";
import express from "express";
import type { APIRoute } from "astro";

async function startPayload() {
	const app = express();
	await payload.init({
		secret: process.env.PAYLOAD_SECRET || "",
		mongoURL: process.env.DB_URI || "",
		mongoOptions: {
			user: process.env.DB_ROOT_USER,
			pass: process.env.DB_ROOT_PASS,
			dbName: process.env.DB_NAME,
		},
		express: app,
		config: payloadConfig,
	});
	app.listen(process.env.PAYLOAD_PORT);
}

const payloadServer = startPayload();

export const all: APIRoute = async () => {
	await payloadServer;

	return new Response(null, {
		status: 404,
	});
};
