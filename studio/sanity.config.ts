import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schemas";

export default defineConfig({
  name: "default",
  title: "Proxima Studio",
  projectId: "qbf8rv9m",
  dataset: "production",
  plugins: [structureTool()],
  schema: { types: schemaTypes },
});
