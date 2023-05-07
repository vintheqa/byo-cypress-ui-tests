import {PageObject} from "../../support/pageObjects"
import {foresterPageElements, urls} from "../../support/pageElements";

const $PageObject = new PageObject();

describe("Build Your Own - Forester", () => {

  before(()=>{
    $PageObject.goToRootPage();
    cy.wait(2000)
  })

  it("CY_01 - 'Build and Price' button redirects user to variant landing page", () => {
    $PageObject.goToRootPage();
    $PageObject.clickBuildYourOwnFromBuyerTools();
    $PageObject.setPostCode(4000);
    $PageObject.validateModelLandingPage();
    $PageObject.selectVehicleModel(foresterPageElements.modelButton,foresterPageElements.modelUrl,0);
  });

  it("CY_02 - Each variants are separated according to body type or fuel type (Sedan/Hatch or Petrol/Hybrid)", () => {
    const petrolVariantCount = foresterPageElements.foresterPetrolVariants.length
    const hybridVariantCount = foresterPageElements.foresterHybridVariants.length
    
    $PageObject.goToVariantSelectionPage(urls.foresterVariantSelectionPage);
    $PageObject.validateVariantTypesAndVariantCount('Petrol',petrolVariantCount);
    $PageObject.validateVariantTypesAndVariantCount('Hybrid',hybridVariantCount);
  });

  it("CY_03 - Each variant displays the name correctly", () => {
    const petrolVariants = foresterPageElements.foresterPetrolVariants
    const hybridVariants = foresterPageElements.foresterHybridVariants

    $PageObject.goToVariantSelectionPage(urls.foresterVariantSelectionPage);
    $PageObject.validateVariantName('Petrol',petrolVariants);
    $PageObject.validateVariantName('Hybrid',hybridVariants);
  });

});
