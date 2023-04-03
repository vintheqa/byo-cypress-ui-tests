import { BaseObject, PageObject} from "../support/pageObjects"

const $BaseObject = new BaseObject();
const $PageObject = new PageObject();

describe("Build Your Own WRX - AWD Manual", () => {

  it("CY_04 - Clicking of 'Build and Price' on any variant  on the variant landing page will redirect user to configurator page", () => {
    $PageObject.goToRootPage();
    $PageObject.clickBuildYourOwnFromBuyerTools();
    $PageObject.setPostCode(4000);
    $PageObject.selectVehicleModel('wrx');
    $PageObject.selectWrxVariant('sedan awd manual');
  });

  it("CY_05 - 'View Full Specifications & Features' hyperlink should open a modal window displaying the variant's Specs & Features", () => {
    $PageObject.goToWrxVariantConfigurePage('sedan awd manual');
    $PageObject.clickViewFullSpecLinkOnVariantContainer();
    $PageObject.validateFullSpecModalSectionAndSubSectionHeaders();
  });

  it("CY_06 - 'View Full Specifications & Features' modal window should have close button", () => {
    $PageObject.goToWrxVariantConfigurePage('sedan awd manual');
    $PageObject.clickViewFullSpecLinkOnVariantContainer();
    $PageObject.closeViewFullSpecModal();  
  });

  it.only("CY_07 - 'Colour' section should display correct swatch names (eg. No special characters & numbers)", () => {
    $PageObject.goToWrxVariantConfigurePage('sedan awd manual');
    $PageObject.clickColourTab();
    $PageObject.validateWrxColourOptions('sedan');
  });


});
