import { SSRManifest } from "astro";
import type { InitOptions } from "payload/config";

export type PayloadOptions = InitOptions | Promise<InitOptions>;

export interface ExtendedSSRManifest extends SSRManifest {
	payloadInitOptions: PayloadOptions;
}
