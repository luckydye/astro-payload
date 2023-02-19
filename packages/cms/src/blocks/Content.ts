import type { Block } from "payload/types";

const Content: Block = {
  slug: "Text", // required
  fields: [
    {
      name: "richText",
      type: "richText",
      required: true,
    },
  ],
};

export default Content;
