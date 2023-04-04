import {PageObject} from "../support/pageObjects"
import { configurePageElements} from "../support/pageElements";


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

  it("CY_07 - 'Colour' section should display correct swatch names (eg. No special characters & numbers)", () => {
    const variantColourCount: number = configurePageElements.wrxSedanColors.length
    const variantColourOptions = configurePageElements.wrxSedanColors

    $PageObject.goToWrxVariantConfigurePage('sedan awd manual');
    $PageObject.clickColourTab();
    $PageObject.validateNumOfColourOptions(variantColourCount);
    $PageObject.selectColour(0,variantColourOptions[0]);
    $PageObject.selectColour(1,variantColourOptions[1]);
    $PageObject.selectColour(2,variantColourOptions[2]);
    $PageObject.selectColour(3,variantColourOptions[3]);
    $PageObject.selectColour(4,variantColourOptions[4]);
    $PageObject.selectColour(5,variantColourOptions[5]);
    $PageObject.selectColour(6,variantColourOptions[6]);
    $PageObject.selectColour(7,variantColourOptions[7]);
  });

  it.only("CY_07 - Ability to select any variant color", () => {
    const variantColourOptions = configurePageElements.wrxSedanColors

    $PageObject.goToWrxVariantConfigurePage('sedan awd manual');
    $PageObject.clickColourTab();
    $PageObject.selectColour(2,variantColourOptions[2]);
    $PageObject.validateCarImgSrc(configurePageElements.imgSrcWrxSedanAwdManualSolarOrangePearl);
    $PageObject.validateColourSummaryAmount();

  });



});
