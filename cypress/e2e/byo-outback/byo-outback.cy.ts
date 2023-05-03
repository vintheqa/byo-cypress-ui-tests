import {PageObject} from "../../support/pageObjects"
import {outbackPageElements, urls} from "../../support/pageElements";

const $PageObject = new PageObject();

describe("Build Your Own - Outback", () => {

  before(()=>{
    $PageObject.goToRootPage();
    cy.wait(2000)
  })

  it("CY_01 - 'Build and Price' button redirects user to variant landing page", () => {
    $PageObject.goToRootPage();
    $PageObject.clickBuildYourOwnFromBuyerTools();
    $PageObject.setPostCode(4000);
    $PageObject.validateModelLandingPage();
    $PageObject.selectVehicleModel(outbackPageElements.modelButton,outbackPageElements.modelUrl,0);
  });

  it("CY_02 - Each variants are separated according to body type or fuel type (Sedan/Hatch or Petrol/Hybrid)", () => {
    const variantCount = outbackPageElements.outbackVariants.length
    
    $PageObject.goToVariantSelectionPage(urls.brzVariantSelectionPage);
    $PageObject.validateVariantTypesAndVariantCount('n/a',variantCount);
  });

  it("CY_03 - Each variant displays the name correctly", () => {
    const variants = outbackPageElements.outbackVariants
    $PageObject.goToVariantSelectionPage(urls.brzVariantSelectionPage);
    $PageObject.validateVariantName('n/a',variants);
  });

});
