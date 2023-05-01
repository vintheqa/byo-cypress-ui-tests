import {PageObject} from "../../support/pageObjects"
import {brzPageElements, urls} from "../../support/pageElements";

const $PageObject = new PageObject();

describe("Build Your Own - BRZ", () => {

  before(()=>{
    $PageObject.goToRootPage();
    cy.wait(2000)
  })

  it("CY_01 - 'Build and Price' button redirects user to variant landing page", () => {
    $PageObject.goToRootPage();
    $PageObject.clickBuildYourOwnFromBuyerTools();
    $PageObject.setPostCode(4000);
    $PageObject.validateModelLandingPage();
    $PageObject.selectVehicleModel(brzPageElements.modelButton,brzPageElements.modelUrl,0);
  });

  it("CY_02 - Each variants are separated according to body type or fuel type (Sedan/Hatch or Petrol/Hybrid)", () => {
    const manualVariantCount = brzPageElements.brzManualVariants.length
    const automaticVariantCount = brzPageElements.brzAutomaticVariants.length
    
    $PageObject.goToVariantSelectionPage(urls.brzVariantSelectionPage);
    $PageObject.validateVariantTypesAndVariantCount('Manual',manualVariantCount);
    $PageObject.validateVariantTypesAndVariantCount('Automatic',automaticVariantCount);
  });

  it("CY_03 - Each variant displays the name correctly", () => {
    const manualVariants = brzPageElements.brzManualVariants
    const automaticVariants = brzPageElements.brzAutomaticVariants

    $PageObject.goToVariantSelectionPage(urls.brzVariantSelectionPage);
    $PageObject.validateVariantName('Manual',manualVariants);
    $PageObject.validateVariantName('Automatic',automaticVariants);
  });

});
