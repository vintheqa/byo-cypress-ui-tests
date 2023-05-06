import {PageObject} from "../../support/pageObjects"
import {crosstrekPageElements, urls} from "../../support/pageElements";

const $PageObject = new PageObject();

describe("Build Your Own - Crosstrek", () => {

  before(()=>{
    $PageObject.goToRootPage();
    cy.wait(2000)
  })

  it("CY_01 - 'Build and Price' button redirects user to variant landing page", () => {
    $PageObject.goToRootPage();
    $PageObject.clickBuildYourOwnFromBuyerTools();
    $PageObject.setPostCode(4000);
    $PageObject.validateModelLandingPage();
    $PageObject.selectVehicleModel(crosstrekPageElements.modelButton,crosstrekPageElements.modelUrl,0);
  });

  it("CY_02 - Each variants are separated according to body type or fuel type (Sedan/Hatch or Petrol/Hybrid)", () => {
    const petrolVariantCount = crosstrekPageElements.crosstrekPetrolVariants.length
    const hybridVariantCount = crosstrekPageElements.crosstrekHybridVariants.length
    
    $PageObject.goToVariantSelectionPage(urls.crosstekVariantSelectionPage);
    $PageObject.validateVariantTypesAndVariantCount('Petrol',petrolVariantCount);
    $PageObject.validateVariantTypesAndVariantCount('Hybrid',hybridVariantCount);
  });

  it("CY_03 - Each variant displays the name correctly", () => {
    const petrolVariants = crosstrekPageElements.crosstrekPetrolVariants
    const hybridVariants = crosstrekPageElements.crosstrekHybridVariants

    $PageObject.goToVariantSelectionPage(urls.crosstekVariantSelectionPage);
    $PageObject.validateVariantName('Petrol',petrolVariants);
    $PageObject.validateVariantName('Hybrid',hybridVariants);
  });

});
