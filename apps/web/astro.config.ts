import { defineConfig } from "astro/config";
import payload from "@payload/astro";

export default defineConfig({
	srcDir: "src",
	output: "server",
	build: {
		serverEntry: "server.mjs",
	},
	adapter: payload({
		secret: process.env.PAYLOAD_SECRET || "",
		mongoURL: process.env.DB_URI || "",
		mongoOptions: {
			user: process.env.DB_ROOT_USER,
			pass: process.env.DB_ROOT_PASS,
			dbName: process.env.DB_NAME,
		},
		configPath: import.meta.env.DEV ? "./payload.config.ts" : "./dist/payload.config.cjs",
	}),
});
