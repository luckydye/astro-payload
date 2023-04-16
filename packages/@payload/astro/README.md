# Astro integration for Payload CMS

This integration creates a SSR route for the payload cms with the node adapter even in dev mode.

Example project: https://github.com/luckydye/astro-payload/tree/main/apps/web

## Options
```typescript
interface Options {
	// entry file path for the payload route
	payloadRoute: string;
}
```

### Example Astro config:

```typescript
// /astro.config.ts
import { defineConfig } from "astro/config";
import payload from "@luckydye/astro-payload";
import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
	srcDir: "src",
	output: "server",
	adapter: node({
		mode: "standalone",
	}),
	integrations: [
		payload({
			payloadRoute: "./payload.ts",
		}),
	],
});
```

```typescript
// ./payload.ts
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
	// starting payload on a different port
	app.listen(process.env.PAYLOAD_PORT);
}

const payloadServer = startPayload();

export const all: APIRoute = async () => {
	await payloadServer;

	return new Response(null, {
		status: 404,
	});
};
```
