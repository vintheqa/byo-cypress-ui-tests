import {PageObject} from "../../support/pageObjects"
import {imprezaPageElements, urls} from "../../support/pageElements";

const $PageObject = new PageObject();

describe("Build Your Own - Impreza", () => {

  before(()=>{
    $PageObject.goToRootPage();
    cy.wait(2000)
  })

  it("CY_01 - 'Build and Price' button redirects user to variant landing page", () => {
    $PageObject.goToRootPage();
    $PageObject.clickBuildYourOwnFromBuyerTools();
    $PageObject.setPostCode(4000);
    $PageObject.validateModelLandingPage();
    $PageObject.selectVehicleModel(imprezaPageElements.modelButton,imprezaPageElements.modelUrl,0);
  });

  it("CY_02 - Each variants are separated according to body type or fuel type (Sedan/Hatch or Petrol/Hybrid)", () => {
    const sedanVariantCount = imprezaPageElements.imprezaSedanVariants.length
    const hatchVariantCount = imprezaPageElements.imprezaHatchVariants.length
    
    $PageObject.goToVariantSelectionPage(urls.imprezaVariantSelectionPage);
    $PageObject.validateVariantTypesAndVariantCount('Sedan',sedanVariantCount);
    $PageObject.validateVariantTypesAndVariantCount('Hatch',hatchVariantCount);
  });

  it("CY_03 - Each variant displays the name correctly", () => {
    const sedanVariants = imprezaPageElements.imprezaSedanVariants
    const hatchVariants = imprezaPageElements.imprezaHatchVariants

    $PageObject.goToVariantSelectionPage(urls.imprezaVariantSelectionPage);
    $PageObject.validateVariantName('Sedan',sedanVariants);
    $PageObject.validateVariantName('Hatch',hatchVariants);
  });

});
