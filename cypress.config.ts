import { defineConfig } from "cypress";

export default defineConfig({
  video: false,
  screenshotOnRunFailure: true,
  viewportWidth: 1920,
  viewportHeight: 1080,
  chromeWebSecurity: false,
  numTestsKeptInMemory: 20,
  env: {
    baseURL: "https://www.subaru.com.au/",
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      
    },
    //supportFile: "./packages/mining/tests/cypress/support/e2e.ts",
    //specPattern: "/cypress/e2e/*.cy.ts",
  },
});
