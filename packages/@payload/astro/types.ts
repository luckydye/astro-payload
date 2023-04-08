import { SSRManifest } from "astro";
import type { InitOptions } from "payload/config";

export type AdapterInitOptions = {
	configPath: string;
} & InitOptions;

export interface ExtendedSSRManifest extends SSRManifest {
	payloadInitOptions: AdapterInitOptions;
}
