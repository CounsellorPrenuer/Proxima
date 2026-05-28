import { defineField, defineType } from "sanity";

export default defineType({
  name: "customPlan",
  title: "Custom Plan",
  type: "document",
  fields: [
    defineField({ name: "planId", type: "string", validation: (r) => r.required() }),
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "price", type: "number", validation: (r) => r.required().min(0) }),
    defineField({ name: "description", type: "text", validation: (r) => r.required() }),
    defineField({ name: "sortOrder", type: "number" }),
  ],
});
