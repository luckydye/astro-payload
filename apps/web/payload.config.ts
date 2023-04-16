import { buildConfig } from "payload/config";
import TodoLists from "./src/collections/TodoLists";
import Users from "./src/collections/Users";
import Media from "./src/collections/Media";
import Pages from "./src/collections/Pages";

console.log("load config", import.meta.url);

export default buildConfig({
	serverURL: `http://localhost:3100`,
	admin: {
		user: Users.slug,
	},
	collections: [Pages, Media, TodoLists, Users],
	typescript: {
		outputFile: ".payload/payload-types.ts",
	},
	graphQL: {
		disable: true,
	},
});
