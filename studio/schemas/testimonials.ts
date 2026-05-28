import { defineField, defineType } from "sanity";

export default defineType({
  name: "testimonials",
  title: "Testimonials",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "role", type: "string", validation: (r) => r.required() }),
    defineField({ name: "content", type: "text", validation: (r) => r.required() }),
    defineField({ name: "rating", type: "number", validation: (r) => r.required().min(1).max(5) }),
    defineField({ name: "image", type: "image", options: { hotspot: true } }),
  ],
});
