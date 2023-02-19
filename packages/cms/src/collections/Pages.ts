import { CollectionConfig } from "payload/types";
import Content from "../blocks/Content";

const Pages: CollectionConfig = {
  slug: "pages",
  versions: {
    drafts: true,
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
};

export default Pages;
