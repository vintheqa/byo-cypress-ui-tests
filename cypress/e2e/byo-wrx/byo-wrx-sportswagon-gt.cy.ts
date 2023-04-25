import {PageObject} from "../../support/pageObjects"
import { configurePageElements, wrxPageElements, urls} from "../../support/pageElements";

const $PageObject = new PageObject();
const variantColourCount: number = wrxPageElements.wrxSportswagonColorOptions.length
const variantColourOptions = wrxPageElements.wrxSportswagonColorOptions
const variantInteriorCount: number = 1
const variantStylingPackCount: number = 1
const variantInteriorOptions = wrxPageElements.wrxInteriorOptions[3]
const modelCode = 'AUWRX'
const variantCode = 'AUVNHCKA8_G'

let protectionIndex = $PageObject.getRandomNumber(4-1);
let performanceIndex = $PageObject.getRandomNumber(8-1);
let stylingIndex = $PageObject.getRandomNumber(13-1);
let cargoIndex = $PageObject.getRandomNumber(6-1);
let colorIndex = $PageObject.getRandomNumber(variantColourCount-1);
let optionsIndex = $PageObject.getRandomNumber(variantStylingPackCount-1);

describe("Build Your Own WRX - AWD Sportswagon GT", () => {

  it("CY_04 - Clicking of 'Build and Price' on any variant  on the variant landing page will redirect user to configurator page", () => {
    $PageObject.goToRootPage();
    $PageObject.clickBuildYourOwnFromBuyerTools();
    $PageObject.setPostCode(4000);
    $PageObject.selectVehicleModel(wrxPageElements.modelButton,wrxPageElements.modelUrl,0);
    $PageObject.selectVariantType('Sportswagon');
    $PageObject.selectVariant(modelCode,variantCode);
  });

  it("CY_05 - 'View Full Specifications & Features' hyperlink should open a modal window displaying the variant's Specs & Features", () => {
    $PageObject.goToVariantSelectionPage(urls.wrxVariantSelectionPage);
    $PageObject.selectVariantType('Sportswagon');
    $PageObject.selectVariant(modelCode,variantCode);
    $PageObject.clickViewFullSpecLinkOnVariantContainer(1);
    $PageObject.validateFullSpecModalSectionAndSubSectionHeaders(wrxPageElements.specsAndFeatureModalSubSections);
  });

  it("CY_06 - 'View Full Specifications & Features' modal window should have close button", () => {
    $PageObject.goToVariantSelectionPage(urls.wrxVariantSelectionPage);
    $PageObject.selectVariantType('Sportswagon');
    $PageObject.selectVariant(modelCode,variantCode);
    $PageObject.clickViewFullSpecLinkOnVariantContainer(1);
    $PageObject.closeViewFullSpecModal();  
  });

  it("CY_07 - 'Colour' section should display correct swatch names (eg. No special characters & numbers)", () => {
    $PageObject.goToVariantSelectionPage(urls.wrxVariantSelectionPage);
    $PageObject.selectVariantType('Sportswagon');
    $PageObject.selectVariant(modelCode,variantCode);
    $PageObject.clickColourTab();
    $PageObject.validateNumOfColourOptions(variantColourCount);
    $PageObject.selectColour(0,variantColourOptions[0]);
    $PageObject.selectColour(1,variantColourOptions[1]);
    $PageObject.selectColour(2,variantColourOptions[2]);
    $PageObject.selectColour(3,variantColourOptions[3]);
    $PageObject.selectColour(4,variantColourOptions[4]);
    $PageObject.selectColour(5,variantColourOptions[5]);
    $PageObject.selectColour(6,variantColourOptions[6]);
  });

  it("CY_08 - Ability to select any variant color", () => {
    $PageObject.goToVariantSelectionPage(urls.wrxVariantSelectionPage);
    $PageObject.selectVariantType('Sportswagon');
    $PageObject.selectVariant(modelCode,variantCode);
    $PageObject.clickColourTab();
    $PageObject.selectColour(colorIndex,variantColourOptions[colorIndex]);
    $PageObject.validateCarImgSrc(wrxPageElements.imgSrcWrxSportswagonAwdGt[colorIndex]);
    $PageObject.clickShowFullSummary();
    $PageObject.validateColourSummaryAmount();
  });

  it("CY_09 - 'Interior' section should display correct swatch names (eg. No special characters & numbers)", () => {
    $PageObject.goToVariantSelectionPage(urls.wrxVariantSelectionPage);
    $PageObject.selectVariantType('Sportswagon');
    $PageObject.selectVariant(modelCode,variantCode);
    $PageObject.clickInteriorTab();
    $PageObject.validateNumOfInteriorOptions(variantInteriorCount);
    $PageObject.selectInterior(0,variantInteriorOptions);
  });

  it("CY_10 - Ability to select any interior", () => {
    $PageObject.goToVariantSelectionPage(urls.wrxVariantSelectionPage);
    $PageObject.selectVariantType('Sportswagon');
    $PageObject.selectVariant(modelCode,variantCode);
    $PageObject.clickInteriorTab();
    $PageObject.selectInterior(0,variantInteriorOptions);
    $PageObject.validateCarImgSrc(wrxPageElements.imgSrcWrxSportswagonAwdGt[0]);
    $PageObject.clickShowFullSummary();
    $PageObject.validateInteriorSummaryAmount();
  });

  it("CY_11 - 'Show features' hyperlink under 'Options' section should display accessories", () => {
    $PageObject.goToVariantSelectionPage(urls.wrxVariantSelectionPage);
    $PageObject.selectVariantType('Sportswagon');
    $PageObject.selectVariant(modelCode,variantCode);
    $PageObject.clickOptionsTab();
    $PageObject.validateNumOfOptionPacks(variantStylingPackCount);
    $PageObject.clickShowFeaturesOptionPack(optionsIndex);
  });

  it("CY_12 - 'Modal window on 'Show features' should have working close button", () => {
    $PageObject.goToVariantSelectionPage(urls.wrxVariantSelectionPage);
    $PageObject.selectVariantType('Sportswagon');
    $PageObject.selectVariant(modelCode,variantCode);
    $PageObject.clickOptionsTab();
    $PageObject.clickShowFeaturesOptionPack(optionsIndex);
    $PageObject.closeOptionPackModal();
  });

  it("CY_13 - 'Modal window for 'Show features' should have working 'Add' button", () => {
    $PageObject.goToVariantSelectionPage(urls.wrxVariantSelectionPage);
    $PageObject.selectVariantType('Sportswagon');
    $PageObject.selectVariant(modelCode,variantCode);
    $PageObject.clickOptionsTab();
    $PageObject.selectAddOptionPack(optionsIndex);
    $PageObject.validateModalSelectedOptionPack(optionsIndex);
  });

  it("CY_14 - Ticked checkbox under 'Options', on any accessory pack, should be captured in the modal window", () => {
    $PageObject.goToVariantSelectionPage(urls.wrxVariantSelectionPage);
    $PageObject.selectVariantType('Sportswagon');
    $PageObject.selectVariant(modelCode,variantCode);
    $PageObject.clickOptionsTab();
    $PageObject.selectTickOptionPack(optionsIndex);
    $PageObject.validateModalSelectedOptionPack(optionsIndex);
  });

  it("CY_15 - Selected accessory pack and price should display on the summary section", () => {
    $PageObject.goToVariantSelectionPage(urls.wrxVariantSelectionPage);
    $PageObject.selectVariantType('Sportswagon');
    $PageObject.selectVariant(modelCode,variantCode);
    $PageObject.clickOptionsTab();
    $PageObject.selectAddOptionPack(optionsIndex);
    $PageObject.clickShowFullSummary();
    $PageObject.validateOptionsSummaryAmount(optionsIndex);
  });

  it("CY_16 - User should be able to select any accessories on any section under 'Accessories'", () => {
    $PageObject.goToVariantSelectionPage(urls.wrxVariantSelectionPage);
    $PageObject.selectVariantType('Sportswagon');
    $PageObject.selectVariant(modelCode,variantCode);
    $PageObject.clickAccessoriesTab();
    $PageObject.selectAccessory(configurePageElements.protectionAccordion,protectionIndex);
    $PageObject.clickElement(configurePageElements.performancePartsAccordion);
    $PageObject.selectAccessory(configurePageElements.performancePartsAccordion,performanceIndex);
    $PageObject.clickElement(configurePageElements.stylingAccordion);
    $PageObject.selectAccessory(configurePageElements.stylingAccordion,stylingIndex);
    $PageObject.clickElement(configurePageElements.cargoAccordion);
    $PageObject.selectAccessory(configurePageElements.cargoAccordion,cargoIndex);
    $PageObject.clickShowFullSummary();
    $PageObject.validateAccessoriesSummaryAmount(configurePageElements.protectionAccordion,protectionIndex);
    $PageObject.validateAccessoriesSummaryAmount(configurePageElements.performancePartsAccordion,performanceIndex);
    $PageObject.validateAccessoriesSummaryAmount(configurePageElements.stylingAccordion,stylingIndex);
    $PageObject.validateAccessoriesSummaryAmount(configurePageElements.cargoAccordion,cargoIndex);
  });

  it("CY_17 - User should be able to deselect any accessories selected on any section under 'Accessories'", () => {
    $PageObject.goToVariantSelectionPage(urls.wrxVariantSelectionPage);
    $PageObject.selectVariantType('Sportswagon');
    $PageObject.selectVariant(modelCode,variantCode);
    $PageObject.clickAccessoriesTab();
    $PageObject.selectAccessory(configurePageElements.protectionAccordion,protectionIndex);
    $PageObject.clickElement(configurePageElements.performancePartsAccordion);
    $PageObject.selectAccessory(configurePageElements.performancePartsAccordion,performanceIndex);
    $PageObject.clickElement(configurePageElements.stylingAccordion);
    $PageObject.selectAccessory(configurePageElements.stylingAccordion,stylingIndex);
    $PageObject.clickElement(configurePageElements.cargoAccordion);
    $PageObject.selectAccessory(configurePageElements.cargoAccordion,cargoIndex);
    $PageObject.clickShowFullSummary();

    $PageObject.validateSelectedAccessoriesOnSummary(configurePageElements.protectionAccordion,protectionIndex,true);
    $PageObject.validateSelectedAccessoriesOnSummary(configurePageElements.performancePartsAccordion,performanceIndex,true);
    $PageObject.validateSelectedAccessoriesOnSummary(configurePageElements.stylingAccordion,stylingIndex,true);
    $PageObject.validateSelectedAccessoriesOnSummary(configurePageElements.cargoAccordion,cargoIndex,true);

    $PageObject.selectAccessory(configurePageElements.protectionAccordion,protectionIndex);
    $PageObject.selectAccessory(configurePageElements.performancePartsAccordion,performanceIndex);

    $PageObject.validateSelectedAccessoriesOnSummary(configurePageElements.protectionAccordion,protectionIndex,false);
    $PageObject.validateSelectedAccessoriesOnSummary(configurePageElements.performancePartsAccordion,performanceIndex,false);
    $PageObject.validateSelectedAccessoriesOnSummary(configurePageElements.stylingAccordion,stylingIndex,true);
    $PageObject.validateSelectedAccessoriesOnSummary(configurePageElements.cargoAccordion,cargoIndex,true);
  });

  it("CY_18 - Ability to see the price breakdown included on the service plan", () => {
    $PageObject.goToVariantSelectionPage(urls.wrxVariantSelectionPage);
    $PageObject.selectVariantType('Sportswagon');
    $PageObject.selectVariant(modelCode,variantCode);
    $PageObject.clickServicePlansTab();
    $PageObject.expandPriceGuide();
    $PageObject.collapsePriceGuide();
  })

  it("CY_19 - Ability to select available Service Plan", () => {
    $PageObject.goToVariantSelectionPage(urls.wrxVariantSelectionPage);
    $PageObject.selectVariantType('Sportswagon');
    $PageObject.selectVariant(modelCode,variantCode);
    $PageObject.clickServicePlansTab();
    $PageObject.selectServicePlan(0);
    $PageObject.clickShowFullSummary();
    $PageObject.validateServicePlanSummaryAmount(0);
  })

  it("CY_20 - User should see the summary of the selected variant on the 'Summary' section", () => {
    $PageObject.goToVariantSelectionPage(urls.wrxVariantSelectionPage);
    $PageObject.selectVariantType('Sportswagon');
    $PageObject.selectVariant(modelCode,variantCode);

    $PageObject.clickColourTab();
    $PageObject.selectColour(colorIndex,variantColourOptions[colorIndex]);

    $PageObject.clickInteriorTab();
    $PageObject.selectInterior(0,variantInteriorOptions);
  
    $PageObject.clickOptionsTab();
    $PageObject.selectAddOptionPack(optionsIndex);

    $PageObject.clickAccessoriesTab();
    $PageObject.selectAccessory(configurePageElements.protectionAccordion,protectionIndex);
    
    $PageObject.clickServicePlansTab();
    $PageObject.selectServicePlan(0);

    $PageObject.clickShowFullSummary();

    $PageObject.validateServicePlanSummaryAmount(0);
    $PageObject.validateColourSummaryAmount();
    $PageObject.validateInteriorSummaryAmount();
    $PageObject.validateOptionsSummaryAmount(optionsIndex);
    $PageObject.validateSelectedAccessoriesOnSummary(configurePageElements.protectionAccordion,protectionIndex,true);
  })

  it("CY_21 - Ability to choose FINANCE option for payment", () => {
    $PageObject.goToVariantSelectionPage(urls.wrxVariantSelectionPage);
    $PageObject.selectVariantType('Sportswagon');
    $PageObject.selectVariant(modelCode,variantCode);
    $PageObject.checkPaymentOptionsOnFooter();
    $PageObject.clickFinanceOptionOnFooter();
    $PageObject.setPropertyOwner(false);
    $PageObject.setAgeBracket(3);
    $PageObject.setLoanTerm(3);
    $PageObject.clickContinueCalculateModal();
    $PageObject.validateCalculationsFieldsOnFooter();
    $PageObject.clickShowFullSummary();
    $PageObject.checkEstimatedRepaymentValueOnFooterAndSummary();
    $PageObject.checkComparisonRateValueOnFooterAndSummary();
  })

  it("CY_22 - Ability to choose CASH option for payment", () => {
    $PageObject.goToVariantSelectionPage(urls.wrxVariantSelectionPage);
    $PageObject.selectVariantType('Sportswagon');
    $PageObject.selectVariant(modelCode,variantCode);
    $PageObject.checkPaymentOptionsOnFooter();
    $PageObject.clickShowFullSummary();
    $PageObject.checkDriveawayPriceValueOnFooterAndSummary();
  })

  it.skip("CY_23 - 'Save My Build' button on configurator page will enable user to save the configured variant and be emailed the Subaru code", () => {
  })

  it.skip("CY_24 - ' 'Buy Online' button on configurator page will redirect user to the checkout page", () => {
    $PageObject.goToVariantSelectionPage(urls.wrxVariantSelectionPage);
    $PageObject.selectVariantType('Sportswagon');
    $PageObject.selectVariant(modelCode,variantCode);

    /*
    $PageObject.clickColourTab();
    $PageObject.selectColour(2,variantColourOptions[2]);

    $PageObject.clickInteriorTab();
    $PageObject.selectInterior(0,variantInteriorOptions);
  
    $PageObject.clickOptionsTab();
    $PageObject.selectAddStylingPack(0);

    $PageObject.clickAccessoriesTab();
    $PageObject.clickAccessories(configurePageElements.protectionAccordion,'Door Visor');
    
    $PageObject.clickServicePlansTab();
    $PageObject.selectServicePlan(0);
    */
    $PageObject.goToCheckoutPage();

  })


})
