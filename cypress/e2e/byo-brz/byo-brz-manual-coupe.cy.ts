import {PageObject} from "../../support/pageObjects"
import { configurePageElements, brzPageElements, urls} from "../../support/pageElements";

const $PageObject = new PageObject();
const variantColourCount: number = brzPageElements.colorOptions.allVariants.length
const variantColourOptions = brzPageElements.colorOptions.allVariants
const variantInteriorCount: number = brzPageElements.interiorOptions.coupe.length
const variantStylingPackCount: number = 1
const variantInteriorOptions = brzPageElements.interiorOptions.coupe
const modelCode = 'AUBRZ'
const variantCode = 'AUZD8BKH8'

let protectionIndex = $PageObject.getRandomNumber(3-1);
let securityIndex = $PageObject.getRandomNumber(1-1);
let performanceIndex = $PageObject.getRandomNumber(14-1);
let stylingIndex = $PageObject.getRandomNumber(5-1);
let colorIndex = $PageObject.getRandomNumber(variantColourCount-1);
let interiorIndex = $PageObject.getRandomNumber(variantInteriorCount-1);
let optionsIndex = $PageObject.getRandomNumber(variantStylingPackCount-1);

describe("Build Your Own - BRZ Manual Coupe", () => {

  it("CY_04 - Clicking of 'Build and Price' on any variant  on the variant landing page will redirect user to configurator page", () => {
    $PageObject.goToRootPage();
    $PageObject.clickBuildYourOwnFromBuyerTools();
    $PageObject.setPostCode(4000);
    $PageObject.selectVehicleModel(brzPageElements.modelButton,brzPageElements.modelUrl,0);
    $PageObject.selectVariant(modelCode,variantCode);
  });

  it("CY_05 - 'View Full Specifications & Features' hyperlink should open a modal window displaying the variant's Specs & Features", () => {
    $PageObject.goToVariantSelectionPage(urls.brzVariantSelectionPage);
    $PageObject.selectVariantType('Manual');
    $PageObject.selectVariant(modelCode,variantCode);
    $PageObject.clickViewFullSpecLinkOnVariantContainer(0);
    $PageObject.validateFullSpecModalSectionAndSubSectionHeaders(brzPageElements.specsAndFeatureModalSubSections);
  });

  it("CY_06 - 'View Full Specifications & Features' modal window should have close button", () => {
    $PageObject.goToVariantSelectionPage(urls.brzVariantSelectionPage);
    $PageObject.selectVariantType('Manual');
    $PageObject.selectVariant(modelCode,variantCode);
    $PageObject.clickViewFullSpecLinkOnVariantContainer(0);
    $PageObject.closeViewFullSpecModal();  
  });

  it("CY_07 - 'Colour' section should display correct swatch names (eg. No special characters & numbers)", () => {
    $PageObject.goToVariantSelectionPage(urls.brzVariantSelectionPage);
    $PageObject.selectVariantType('Manual');
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
    $PageObject.goToVariantSelectionPage(urls.brzVariantSelectionPage);
    $PageObject.selectVariantType('Manual');
    $PageObject.selectVariant(modelCode,variantCode);
    $PageObject.clickColourTab();
    $PageObject.selectColour(colorIndex,variantColourOptions[colorIndex]);
    $PageObject.validateCarImgSrc(brzPageElements.imgSrc.manualCoupe[colorIndex]);
    $PageObject.clickShowFullSummary();
    $PageObject.validateColourSummaryZeroAmount();
  });

  it("CY_09 - 'Interior' section should display correct swatch names (eg. No special characters & numbers)", () => {
    $PageObject.goToVariantSelectionPage(urls.brzVariantSelectionPage);
    $PageObject.selectVariantType('Manual');
    $PageObject.selectVariant(modelCode,variantCode);
    $PageObject.clickInteriorTab();
    $PageObject.validateNumOfInteriorOptions(variantInteriorCount);
    $PageObject.selectInterior(interiorIndex,variantInteriorOptions[interiorIndex]);
  });

  it("CY_10 - Ability to select any interior", () => {
    $PageObject.goToVariantSelectionPage(urls.brzVariantSelectionPage);
    $PageObject.selectVariantType('Manual');
    $PageObject.selectVariant(modelCode,variantCode);
    $PageObject.clickInteriorTab();
    $PageObject.selectInterior(interiorIndex,variantInteriorOptions[interiorIndex]);
    $PageObject.validateCarImgSrc(brzPageElements.imgSrc.manualCoupe[0]);
    $PageObject.clickShowFullSummary();
    $PageObject.validateInteriorSummaryZeroAmount();
  });

  it("CY_11 - 'Show features' hyperlink under 'Options' section should display accessories", () => {
    $PageObject.goToVariantSelectionPage(urls.brzVariantSelectionPage);
    $PageObject.selectVariantType('Manual');
    $PageObject.selectVariant(modelCode,variantCode);
    $PageObject.clickOptionsTab();
    $PageObject.validateNumOfOptionPacks(variantStylingPackCount);
    $PageObject.clickShowFeaturesOptionPack(optionsIndex);
  });

  it("CY_12 - 'Modal window on 'Show features' should have working close button", () => {
    $PageObject.goToVariantSelectionPage(urls.brzVariantSelectionPage);
    $PageObject.selectVariantType('Manual');
    $PageObject.selectVariant(modelCode,variantCode);
    $PageObject.clickOptionsTab();
    $PageObject.clickShowFeaturesOptionPack(optionsIndex);
    $PageObject.closeOptionPackModal();
  });

  it("CY_13 - 'Modal window for 'Show features' should have working 'Add' button", () => {
    $PageObject.goToVariantSelectionPage(urls.brzVariantSelectionPage);
    $PageObject.selectVariantType('Manual');
    $PageObject.selectVariant(modelCode,variantCode);
    $PageObject.clickOptionsTab();
    $PageObject.selectAddOptionPack(optionsIndex);
    $PageObject.validateModalSelectedOptionPack(optionsIndex);
  });

  it("CY_14 - Ticked checkbox under 'Options', on any accessory pack, should be captured in the modal window", () => {
    $PageObject.goToVariantSelectionPage(urls.brzVariantSelectionPage);
    $PageObject.selectVariantType('Manual');
    $PageObject.selectVariant(modelCode,variantCode);
    $PageObject.clickOptionsTab();
    $PageObject.selectTickOptionPack(optionsIndex);
    $PageObject.validateModalSelectedOptionPack(optionsIndex);
  });

  it("CY_15 - Selected accessory pack and price should display on the summary section", () => {
    $PageObject.goToVariantSelectionPage(urls.brzVariantSelectionPage);
    $PageObject.selectVariantType('Manual');
    $PageObject.selectVariant(modelCode,variantCode);
    $PageObject.clickOptionsTab();
    $PageObject.selectAddOptionPack(optionsIndex);
    $PageObject.clickShowFullSummary();
    $PageObject.validateOptionsSummaryAmount(optionsIndex);
  });

  it("CY_16 - User should be able to select any accessories on any section under 'Accessories'", () => {
    $PageObject.goToVariantSelectionPage(urls.brzVariantSelectionPage);
    $PageObject.selectVariantType('Manual');
    $PageObject.selectVariant(modelCode,variantCode);
    $PageObject.clickAccessoriesTab();
    $PageObject.selectAccessory(configurePageElements.protectionAccordion,protectionIndex);
    $PageObject.clickElement(configurePageElements.securityAccordion);
    $PageObject.selectAccessory(configurePageElements.securityAccordion,securityIndex);
    $PageObject.clickElement(configurePageElements.performancePartsAccordion);
    $PageObject.selectAccessory(configurePageElements.performancePartsAccordion,performanceIndex);
    $PageObject.clickElement(configurePageElements.stylingAccordion);
    $PageObject.selectAccessory(configurePageElements.stylingAccordion,stylingIndex);
    $PageObject.clickShowFullSummary();
    $PageObject.validateAccessoriesSummaryAmount(configurePageElements.protectionAccordion,protectionIndex);
    $PageObject.validateAccessoriesSummaryAmount(configurePageElements.securityAccordion,securityIndex);
    $PageObject.validateAccessoriesSummaryAmount(configurePageElements.performancePartsAccordion,performanceIndex);
    $PageObject.validateAccessoriesSummaryAmount(configurePageElements.stylingAccordion,stylingIndex);
  });

  it("CY_17 - User should be able to deselect any accessories selected on any section under 'Accessories'", () => {
    $PageObject.goToVariantSelectionPage(urls.brzVariantSelectionPage);
    $PageObject.selectVariantType('Manual');
    $PageObject.selectVariant(modelCode,variantCode);
    $PageObject.clickAccessoriesTab();
    $PageObject.selectAccessory(configurePageElements.protectionAccordion,protectionIndex);
    $PageObject.clickElement(configurePageElements.securityAccordion);
    $PageObject.selectAccessory(configurePageElements.securityAccordion,securityIndex);
    $PageObject.clickElement(configurePageElements.performancePartsAccordion);
    $PageObject.selectAccessory(configurePageElements.performancePartsAccordion,performanceIndex);
    $PageObject.clickElement(configurePageElements.stylingAccordion);
    $PageObject.selectAccessory(configurePageElements.stylingAccordion,stylingIndex);
    $PageObject.clickShowFullSummary();

    $PageObject.validateAccessoriesSummaryAmount(configurePageElements.protectionAccordion,protectionIndex);
    $PageObject.validateAccessoriesSummaryAmount(configurePageElements.securityAccordion,securityIndex);
    $PageObject.validateAccessoriesSummaryAmount(configurePageElements.performancePartsAccordion,performanceIndex);
    $PageObject.validateAccessoriesSummaryAmount(configurePageElements.stylingAccordion,stylingIndex);

    $PageObject.selectAccessory(configurePageElements.protectionAccordion,protectionIndex);
    $PageObject.selectAccessory(configurePageElements.performancePartsAccordion,performanceIndex);

    $PageObject.validateSelectedAccessoriesOnSummary(configurePageElements.protectionAccordion,protectionIndex,false);
    $PageObject.validateSelectedAccessoriesOnSummary(configurePageElements.performancePartsAccordion,performanceIndex,false);
    $PageObject.validateSelectedAccessoriesOnSummary(configurePageElements.stylingAccordion,stylingIndex,true);
  });

  it("CY_18 - Ability to see the price breakdown included on the service plan", () => {
    $PageObject.goToVariantSelectionPage(urls.brzVariantSelectionPage);
    $PageObject.selectVariantType('Manual');
    $PageObject.selectVariant(modelCode,variantCode);
    $PageObject.clickServicePlansTab();
    $PageObject.expandPriceGuide();
    $PageObject.collapsePriceGuide();
  })

  it("CY_19 - Ability to select available Service Plan", () => {
    $PageObject.goToVariantSelectionPage(urls.brzVariantSelectionPage);
    $PageObject.selectVariantType('Manual');
    $PageObject.selectVariant(modelCode,variantCode);
    $PageObject.clickServicePlansTab();
    $PageObject.selectServicePlan(0);
    $PageObject.clickShowFullSummary();
    $PageObject.validateServicePlanSummaryAmount(0);
  })

  it("CY_20 - User should see the summary of the selected variant on the 'Summary' section", () => {
    $PageObject.goToVariantSelectionPage(urls.brzVariantSelectionPage);
    $PageObject.selectVariantType('Manual');
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
    $PageObject.goToVariantSelectionPage(urls.brzVariantSelectionPage);
    $PageObject.selectVariantType('Manual');
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
    $PageObject.goToVariantSelectionPage(urls.brzVariantSelectionPage);
    $PageObject.selectVariantType('Manual');
    $PageObject.selectVariant(modelCode,variantCode);
    $PageObject.checkPaymentOptionsOnFooter();
    $PageObject.clickShowFullSummary();
    $PageObject.checkDriveawayPriceValueOnFooterAndSummary();
  })

})
