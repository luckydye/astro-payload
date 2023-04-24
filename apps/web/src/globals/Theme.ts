import type { GlobalConfig } from "payload/types";

const Theme: GlobalConfig = {
	slug: "theme",
	fields: [
		{
			name: "name",
			type: "text",
		},
		{
			name: "logo",
			type: "relationship",
			relationTo: "media",
		},
	],
};

export default Theme;
