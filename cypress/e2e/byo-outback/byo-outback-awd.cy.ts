import {PageObject} from "../../support/pageObjects"
import { configurePageElements, outbackPageElements, urls} from "../../support/pageElements";

const $PageObject = new PageObject();
const variantColourCount: number = outbackPageElements.colorOptions.awd.length
const variantColourOptions = outbackPageElements.colorOptions.awd
const variantInteriorCount: number = outbackPageElements.interiorOptions.awd.length
const variantStylingPackCount: number = 6
const variantInteriorOptions = outbackPageElements.interiorOptions.awd
const modelCode = 'AUOUT'
const variantCode = 'AUOW25OA'

let protectionIndex = $PageObject.getRandomNumber(12-1);
let cargoTowIndex = $PageObject.getRandomNumber(25-1);
let securityIndex = $PageObject.getRandomNumber(2-1);
let convenienceSafetyIndex = $PageObject.getRandomNumber(5-1);
let stylingIndex = $PageObject.getRandomNumber(6-1);
let colorIndex = $PageObject.getRandomNumber(variantColourCount-1);
let interiorIndex = $PageObject.getRandomNumber(variantInteriorCount-1);
let optionsIndex = $PageObject.getRandomNumber(variantStylingPackCount-1);

describe("Build Your Own - Outback AWD ", () => {

  it("CY_04 - Clicking of 'Build and Price' on any variant  on the variant landing page will redirect user to configurator page", () => {
    $PageObject.goToRootPage();
    $PageObject.clickBuildYourOwnFromBuyerTools();
    $PageObject.setPostCode(4000);
    $PageObject.selectVehicleModel(outbackPageElements.modelButton,outbackPageElements.modelUrl,0);
    $PageObject.selectVariant(modelCode,variantCode);
  });

  it("CY_05 - 'View Full Specifications & Features' hyperlink should open a modal window displaying the variant's Specs & Features", () => {
    $PageObject.goToVariantSelectionPage(urls.outbackVariantSelectionPage);
    $PageObject.selectVariant(modelCode,variantCode);
    $PageObject.clickViewFullSpecLinkOnVariantContainer(0);
    $PageObject.validateFullSpecModalSectionAndSubSectionHeaders(outbackPageElements.specsAndFeatureModalSubSections);
  });

  it("CY_06 - 'View Full Specifications & Features' modal window should have close button", () => {
    $PageObject.goToVariantSelectionPage(urls.outbackVariantSelectionPage);
    $PageObject.selectVariant(modelCode,variantCode);
    $PageObject.clickViewFullSpecLinkOnVariantContainer(0);
    $PageObject.closeViewFullSpecModal();  
  });

  it("CY_07 - 'Colour' section should display correct swatch names (eg. No special characters & numbers)", () => {
    $PageObject.goToVariantSelectionPage(urls.outbackVariantSelectionPage);
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
    $PageObject.selectColour(7,variantColourOptions[7]);
    $PageObject.selectColour(8,variantColourOptions[8]);
  });

  it("CY_08 - Ability to select any variant color", () => {
    $PageObject.goToVariantSelectionPage(urls.outbackVariantSelectionPage);
    $PageObject.selectVariant(modelCode,variantCode);
    $PageObject.clickColourTab();
    $PageObject.selectColour(colorIndex,variantColourOptions[colorIndex]);
    $PageObject.validateCarImgSrc(outbackPageElements.imgSrc.awd[colorIndex]);
    $PageObject.clickShowFullSummary();
    $PageObject.validateColourSummaryZeroAmount();
  });

  it("CY_09 - 'Interior' section should display correct swatch names (eg. No special characters & numbers)", () => {
    $PageObject.goToVariantSelectionPage(urls.outbackVariantSelectionPage);
    $PageObject.selectVariant(modelCode,variantCode);
    $PageObject.clickInteriorTab();
    $PageObject.validateNumOfInteriorOptions(variantInteriorCount);
    $PageObject.selectInterior(interiorIndex,variantInteriorOptions[interiorIndex]);
  });

  it("CY_10 - Ability to select any interior", () => {
    $PageObject.goToVariantSelectionPage(urls.outbackVariantSelectionPage);
    $PageObject.selectVariant(modelCode,variantCode);
    $PageObject.clickInteriorTab();
    $PageObject.selectInterior(interiorIndex,variantInteriorOptions[interiorIndex]);
    $PageObject.validateCarImgSrc(outbackPageElements.imgSrc.awd[0]);
    $PageObject.clickShowFullSummary();
    $PageObject.validateInteriorSummaryZeroAmount();
  });

  it("CY_11 - 'Show features' hyperlink under 'Options' section should display accessories", () => {
    $PageObject.goToVariantSelectionPage(urls.outbackVariantSelectionPage);
    $PageObject.selectVariant(modelCode,variantCode);
    $PageObject.clickOptionsTab();
    $PageObject.validateNumOfOptionPacks(variantStylingPackCount);
    $PageObject.clickShowFeaturesOptionPack(optionsIndex);
  });

  it("CY_12 - 'Modal window on 'Show features' should have working close button", () => {
    $PageObject.goToVariantSelectionPage(urls.outbackVariantSelectionPage);
    $PageObject.selectVariant(modelCode,variantCode);
    $PageObject.clickOptionsTab();
    $PageObject.clickShowFeaturesOptionPack(optionsIndex);
    $PageObject.closeOptionPackModal();
  });

  it("CY_13 - 'Modal window for 'Show features' should have working 'Add' button", () => {
    $PageObject.goToVariantSelectionPage(urls.outbackVariantSelectionPage);
    $PageObject.selectVariant(modelCode,variantCode);
    $PageObject.clickOptionsTab();
    $PageObject.selectAddOptionPack(optionsIndex);
    $PageObject.validateModalSelectedOptionPack(optionsIndex);
  });

  it("CY_14 - Ticked checkbox under 'Options', on any accessory pack, should be captured in the modal window", () => {
    $PageObject.goToVariantSelectionPage(urls.outbackVariantSelectionPage);;
    $PageObject.selectVariant(modelCode,variantCode);
    $PageObject.clickOptionsTab();
    $PageObject.selectTickOptionPack(optionsIndex);
    $PageObject.validateModalSelectedOptionPack(optionsIndex);
  });

  it("CY_15 - Selected accessory pack and price should display on the summary section", () => {
    $PageObject.goToVariantSelectionPage(urls.outbackVariantSelectionPage);
    $PageObject.selectVariant(modelCode,variantCode);
    $PageObject.clickOptionsTab();
    $PageObject.selectAddOptionPack(optionsIndex);
    $PageObject.clickShowFullSummary();
    $PageObject.validateOptionsSummaryAmount(optionsIndex);
  });

  it("CY_16 - User should be able to select any accessories on any section under 'Accessories'", () => {
    $PageObject.goToVariantSelectionPage(urls.outbackVariantSelectionPage);
    $PageObject.selectVariant(modelCode,variantCode);
    $PageObject.clickAccessoriesTab();
    $PageObject.selectAccessory(configurePageElements.protectionAccordion,protectionIndex);
    $PageObject.clickElement(configurePageElements.cargoTowAccordion);
    $PageObject.selectAccessory(configurePageElements.cargoTowAccordion,cargoTowIndex);
    $PageObject.clickElement(configurePageElements.securityAccordion);
    $PageObject.selectAccessory(configurePageElements.securityAccordion,securityIndex);
    $PageObject.clickElement(configurePageElements.convenienceSafetyAccordion);
    $PageObject.selectAccessory(configurePageElements.convenienceSafetyAccordion,convenienceSafetyIndex);
    $PageObject.clickElement(configurePageElements.stylingAccordion);
    $PageObject.selectAccessory(configurePageElements.stylingAccordion,stylingIndex);
    $PageObject.clickShowFullSummary();
    $PageObject.validateAccessoriesSummaryAmount(configurePageElements.protectionAccordion,protectionIndex);
    $PageObject.validateAccessoriesSummaryAmount(configurePageElements.cargoTowAccordion,cargoTowIndex);
    $PageObject.validateAccessoriesSummaryAmount(configurePageElements.securityAccordion,securityIndex);
    $PageObject.validateAccessoriesSummaryAmount(configurePageElements.convenienceSafetyAccordion,convenienceSafetyIndex);
    $PageObject.validateAccessoriesSummaryAmount(configurePageElements.stylingAccordion,stylingIndex);
  });

  it("CY_17 - User should be able to deselect any accessories selected on any section under 'Accessories'", () => {
    $PageObject.goToVariantSelectionPage(urls.outbackVariantSelectionPage);
    $PageObject.selectVariant(modelCode,variantCode);
    $PageObject.clickAccessoriesTab();
    $PageObject.selectAccessory(configurePageElements.protectionAccordion,protectionIndex);
    $PageObject.clickElement(configurePageElements.cargoTowAccordion);
    $PageObject.selectAccessory(configurePageElements.cargoTowAccordion,cargoTowIndex);
    $PageObject.clickElement(configurePageElements.securityAccordion);
    $PageObject.selectAccessory(configurePageElements.securityAccordion,securityIndex);
    $PageObject.clickElement(configurePageElements.convenienceSafetyAccordion);
    $PageObject.selectAccessory(configurePageElements.convenienceSafetyAccordion,convenienceSafetyIndex);
    $PageObject.clickElement(configurePageElements.stylingAccordion);
    $PageObject.selectAccessory(configurePageElements.stylingAccordion,stylingIndex);
    $PageObject.clickShowFullSummary();

    $PageObject.validateAccessoriesSummaryAmount(configurePageElements.protectionAccordion,protectionIndex);
    $PageObject.validateAccessoriesSummaryAmount(configurePageElements.cargoTowAccordion,cargoTowIndex);
    $PageObject.validateAccessoriesSummaryAmount(configurePageElements.securityAccordion,securityIndex);
    $PageObject.validateAccessoriesSummaryAmount(configurePageElements.convenienceSafetyAccordion,convenienceSafetyIndex);
    $PageObject.validateAccessoriesSummaryAmount(configurePageElements.stylingAccordion,stylingIndex);

    $PageObject.selectAccessory(configurePageElements.protectionAccordion,protectionIndex);
    $PageObject.selectAccessory(configurePageElements.securityAccordion,securityIndex);

    $PageObject.validateSelectedAccessoriesOnSummary(configurePageElements.protectionAccordion,protectionIndex,false);
    $PageObject.validateSelectedAccessoriesOnSummary(configurePageElements.stylingAccordion,stylingIndex,true);
    $PageObject.validateSelectedAccessoriesOnSummary(configurePageElements.securityAccordion,securityIndex,false);
  });

  it("CY_18 - Ability to see the price breakdown included on the service plan", () => {
    $PageObject.goToVariantSelectionPage(urls.outbackVariantSelectionPage);
    $PageObject.selectVariant(modelCode,variantCode);
    $PageObject.clickServicePlansTab();
    $PageObject.expandPriceGuide();
    $PageObject.collapsePriceGuide();
  })

  it("CY_19 - Ability to select available Service Plan", () => {
    $PageObject.goToVariantSelectionPage(urls.outbackVariantSelectionPage);
    $PageObject.selectVariant(modelCode,variantCode);
    $PageObject.clickServicePlansTab();
    $PageObject.selectServicePlan(0);
    $PageObject.clickShowFullSummary();
    $PageObject.validateServicePlanSummaryAmount(0);
  })

  it("CY_20 - User should see the summary of the selected variant on the 'Summary' section", () => {
    $PageObject.goToVariantSelectionPage(urls.outbackVariantSelectionPage);
    $PageObject.selectVariant(modelCode,variantCode);

    $PageObject.clickColourTab();
    $PageObject.selectColour(colorIndex,variantColourOptions[colorIndex]);

    $PageObject.clickInteriorTab();
    $PageObject.selectInterior(interiorIndex,variantInteriorOptions[interiorIndex]);
  
    $PageObject.clickOptionsTab();
    $PageObject.selectAddOptionPack(optionsIndex);

    $PageObject.clickAccessoriesTab();
    $PageObject.selectAccessory(configurePageElements.protectionAccordion,protectionIndex);
    
    $PageObject.clickServicePlansTab();
    $PageObject.selectServicePlan(0);

    $PageObject.clickShowFullSummary();

    $PageObject.validateServicePlanSummaryAmount(0);
    $PageObject.validateColourSummaryZeroAmount();
    $PageObject.validateInteriorSummaryZeroAmount();
    $PageObject.validateOptionsSummaryAmount(optionsIndex);
    $PageObject.validateSelectedAccessoriesOnSummary(configurePageElements.protectionAccordion,protectionIndex,true);
  })

  it("CY_21 - Ability to choose FINANCE option for payment", () => {
    $PageObject.goToVariantSelectionPage(urls.outbackVariantSelectionPage);
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
    $PageObject.goToVariantSelectionPage(urls.outbackVariantSelectionPage);
    $PageObject.selectVariant(modelCode,variantCode);
    $PageObject.checkPaymentOptionsOnFooter();
    $PageObject.clickShowFullSummary();
    $PageObject.checkDriveawayPriceValueOnFooterAndSummary();
  })

})
