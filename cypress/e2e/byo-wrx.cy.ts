import {PageObject} from "../support/pageObjects"
import {wrxPageElements, urls} from "../support/pageElements";

const $PageObject = new PageObject();

describe("Build Your Own WRX", () => {

  before(()=>{
    $PageObject.goToRootPage();
    cy.wait(2000)
  })

  it.only("CY_01 - 'Build and Price' button redirects user to variant landing page", () => {
    $PageObject.goToRootPage();
    $PageObject.clickBuildYourOwnFromBuyerTools();
    $PageObject.setPostCode(4000);
    $PageObject.validateModelLandingPage();
    $PageObject.selectVehicleModel(wrxPageElements.modelButton,wrxPageElements.modelUrl,0);
  });

  it("CY_02 - Each variants are separated according to body type or fuel type (Sedan/Hatch or Petrol/Hybrid)", () => {
    const sedanVariantCount = wrxPageElements.wrxSedanVariants.length
    const sportsWagonVariantCount = wrxPageElements.wrxSportswagonVariants.length
    
    $PageObject.goToVariantSelectionPage(urls.wrxVariantSelectionPage);
    $PageObject.validateVariantTypesAndVariantCount('Sedan',sedanVariantCount);
    $PageObject.validateVariantTypesAndVariantCount('Sportswagon',sportsWagonVariantCount);
  });

  it("CY_03 - Each variant displays the name correctly", () => {
    const sedanVariants = wrxPageElements.wrxSedanVariants
    const sportsWagonVariants = wrxPageElements.wrxSportswagonVariants

    $PageObject.goToVariantSelectionPage(urls.wrxVariantSelectionPage);
    $PageObject.validateVariantName('Sedan',sedanVariants);
    $PageObject.validateVariantName('Sportswagon',sportsWagonVariants);
  });

});
