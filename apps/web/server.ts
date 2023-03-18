import { resolve } from "path";
import payload from "payload";
import payloadConfig from "./payload.config";

export function startup(astro) {
	const app = astro.server.middlewares;

	console.log("dev startup...");

	if (!process.env.PAYLOAD_CONFIG_PATH) {
		process.env.PAYLOAD_CONFIG_PATH = resolve("../../packages/cms/payload.config.ts");
	}

	// Initialize Payload
	payload.init({
		secret: process.env.PAYLOAD_SECRET,
		mongoURL: process.env.MONGODB_URI,
		mongoOptions: {
			user: process.env.DB_ROOT_USER,
			pass: process.env.DB_ROOT_PASS,
		},
		express: app,
		config: payloadConfig,
		onInit: () => {
			payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`);
		},
	});

	// app.use("/", (req, res) => {
	// 	res.send("test");
	// });
}
