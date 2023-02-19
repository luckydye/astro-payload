import { buildConfig } from "payload/config";
import TodoLists from "./src/collections/TodoLists";
import Users from "./src/collections/Users";
import Media from "./src/collections/Media";

export default buildConfig({
  serverURL: "http://localhost:3000",
  admin: {
    user: Users.slug,
  },
  collections: [Media, TodoLists, Users],
  typescript: {
    outputFile: ".payload/payload-types.ts",
  },
  graphQL: {
    schemaOutputFile: ".payload/generated-schema.graphql",
  },
});
