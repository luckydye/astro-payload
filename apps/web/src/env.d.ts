/// <reference types="astro/client" />
/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly PAYLOAD_SECRET: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
