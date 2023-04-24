import type { CollectionConfig } from "payload/types";
import { createCollection } from "../hooks/createCollection";

const Todo: CollectionConfig = createCollection({
	slug: "todos",
	admin: {
		defaultColumns: ["listName", "tasks", "updatedAt"],
		useAsTitle: "listName",
	},
	access: {
		create: () => true,
		read: () => true,
		update: () => true,
		delete: () => true,
	},
	fields: [
		{
			name: "listName",
			type: "text",
		},
		{
			name: "tasks",
			type: "array",
			fields: [
				{
					name: "name",
					type: "text",
				},
				{
					name: "complete",
					type: "checkbox",
					defaultValue: false,
				},
			],
		},
	],
});

export default Todo;
