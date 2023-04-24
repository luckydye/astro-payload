import type { CollectionConfig } from "payload/types";
import { createCollection } from "../hooks/createCollection";

const Users: CollectionConfig = createCollection({
	slug: "users",
	auth: true,
	admin: {
		useAsTitle: "email",
	},
	access: {
		read: () => true,
	},
	fields: [
		// Email added by default
		// Add more fields as needed
	],
});

export default Users;
