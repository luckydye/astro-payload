import type { CollectionConfig } from "payload/types";
import { createCollection } from "../hooks/createCollection";

const Media: CollectionConfig = createCollection({
	slug: "media",
	access: {
		read: () => true,
	},
	fields: [],
	upload: {
		staticURL: "/media",
		staticDir: "./data/media",
		imageSizes: [
			{
				name: "thumbnail",
				width: 400,
				height: 300,
				position: "centre",
			},
			{
				name: "card",
				width: 768,
				height: 1024,
				position: "centre",
			},
			{
				name: "tablet",
				width: 1024,
				height: null,
				position: "centre",
			},
		],
		adminThumbnail: "thumbnail",
		mimeTypes: ["image/*"],
	},
});

export default Media;
