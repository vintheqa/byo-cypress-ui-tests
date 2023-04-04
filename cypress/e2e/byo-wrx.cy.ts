import {PageObject} from "../support/pageObjects"

const $PageObject = new PageObject();

describe("Build Your Own WRX", () => {
  it("CY_01 - 'Build and Price' button redirects user to variant landing page", () => {
    $PageObject.goToRootPage();
    $PageObject.clickBuildYourOwnFromBuyerTools();
    $PageObject.setPostCode(4000);
    $PageObject.validateModelLandingPage();
    $PageObject.selectVehicleModel('wrx');
  });

  it("CY_02 - Each variants are separated according to body type or fuel type (Sedan/Hatch or Petrol/Hybrid)", () => {
    $PageObject.goToVariantSelectionPage('wrx');
    $PageObject.validateVariantTypesAndVariantCount('wrx');
  });

  it("CY_03 - Each variant displays the name correctly", () => {
    $PageObject.goToVariantSelectionPage('wrx');
    $PageObject.validateVariantName('wrx');
  });

});
