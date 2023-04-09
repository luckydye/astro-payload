# Astro adapter for Payload CMS

## Options
```typescript
interface Options {
	// payload init options
    secret: string;
	mongoURL: string | false;
    mongoOptions?: {
		user?: string;
		pass?: string;
		dbName?: string;
	};

	// optionally provide payload config path here
	configPath?: string;

	// custom payload instance entry file
	serverEntry?: string;
}
```

### Example Astro config:

```typescript
// /astro.config.ts
export default defineConfig({
	srcDir: "src",
	output: "server",
	adapter: payload({
		secret: process.env.PAYLOAD_SECRET || "",
		mongoURL: process.env.DB_URI || "",
		mongoOptions: {
			user: process.env.DB_ROOT_USER,
			pass: process.env.DB_ROOT_PASS,
			dbName: process.env.DB_NAME,
		},
		configPath: import.meta.env.DEV ? "./payload.config.ts" : "./dist/payload.config.js",
	}),
});
```

## How to use your own payload instance
```typescript
// /payload.ts
import payload from "payload";
import { getPayloadConfig } from "@payload/astro/server";

export default async (server, express, config) => {
	await payload.init({
		express, // required
		config: getPayloadConfig(config.configPath), // optional
		...config, // optional
	});
};
```

```typescript
// /astro.config.ts
export default defineConfig({
	...
	adapter: payload({
		...
		serverEntry: import.meta.env.DEV ? "./payload.ts" : "./dist/payload.mjs",
	}),
});
```
