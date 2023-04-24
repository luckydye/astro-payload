import type { CollectionConfig } from "payload/types";
import Content from "../blocks/Content";
import { createCollection } from "../hooks/createCollection";

const Pages: CollectionConfig = createCollection({
	slug: "pages",
	versions: {
		drafts: true,
	},
	access: {
		read: () => true,
	},
	fields: [
		{
			name: "title",
			type: "text",
			required: true,
		},
		{
			name: "slug",
			type: "text",
			required: true,
		},
		{
			type: "tabs",
			tabs: [
				{
					label: "Content",
					fields: [
						{
							name: "layout",
							type: "blocks",
							required: true,
							blocks: [Content],
						},
					],
				},
			],
		},
	],
});

export default Pages;
