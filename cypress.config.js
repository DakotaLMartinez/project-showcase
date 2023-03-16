import path from "path";
import { defineConfig } from "cypress";
import vitePreprocessor from "cypress-vite";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on("file:preprocessor", vitePreprocessor());
    },
  },

  env: {
    host: "http://localhost:5173",
  },

  component: {
    componentFileExtensions: ".jsx",
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },
});
