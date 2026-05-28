import { defineField, defineType } from "sanity";

export default defineType({
  name: "standardPlan",
  title: "Standard Plan",
  type: "document",
  fields: [
    defineField({ name: "planId", type: "string", validation: (r) => r.required() }),
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "subgroup",
      type: "string",
      options: { list: ["8-10", "10-12", "college", "working"] },
      validation: (r) => r.required(),
    }),
    defineField({ name: "price", type: "number", validation: (r) => r.required().min(0) }),
    defineField({ name: "features", type: "array", of: [{ type: "string" }], validation: (r) => r.required().min(1) }),
    defineField({ name: "sortOrder", type: "number" }),
  ],
});
