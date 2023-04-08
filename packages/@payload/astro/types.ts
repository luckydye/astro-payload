import { SSRManifest } from "astro";
import type { InitOptions } from "payload/config";

export type AdapterInitOptions = {
	configPath: string;
};

export type PayloadOptions = (InitOptions & AdapterInitOptions) | Promise<InitOptions & AdapterInitOptions>;

export interface ExtendedSSRManifest extends SSRManifest {
	payloadInitOptions: PayloadOptions;
}
