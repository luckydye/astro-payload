import type { CollectionConfig } from "payload/types";

export const meta = {
	lastChange: Date.now(),
};

export function createCollection(options: CollectionConfig) {
	options.hooks = options.hooks || {};
	options.hooks.afterChange = options.hooks.afterChange || [];

	// hook into all collection changes
	options.hooks.afterChange.push(() => {
		meta.lastChange = Date.now();
	});

	return options;
}
