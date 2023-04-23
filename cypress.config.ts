import { defineConfig } from "cypress";

export default defineConfig({
  video: false,
  screenshotOnRunFailure: true,
  viewportWidth: 1920,
  viewportHeight: 1080,
  chromeWebSecurity: false,
  numTestsKeptInMemory: 0,
  env: {
    baseURL: "https://www.subaru.com.au/",
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here 
    },
    supportFile: "cypress/support/e2e.{js,jsx,ts,tsx}",
    specPattern: "cypress/e2e/*.cy.ts",
    pageLoadTimeout: 120000,
    defaultCommandTimeout: 10000,
  },
});
