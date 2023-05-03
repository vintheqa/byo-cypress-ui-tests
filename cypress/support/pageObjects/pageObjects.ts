import { configurePageElements,homePageElements,wrxPageElements, urls } from "../pageElements";

export class PageObject {
  
  getRandomNumber(max: number): number {
    return Math.floor(Math.random() * (max - 0 + 1)) + 0;
  }
  
  clickElement(element){
    cy.get(element).click();
  }

  goToRootPage() {
    cy.visit(Cypress.env("baseURL"));
    cy.get(homePageElements.menuBarMain).should('be.visible')
  }
  
  setPostCode(postcode) {
    cy.get('input[name="postcode"]').click();
    cy.get('input[name="postcode"]').type(postcode);
    cy.wait(500);
    cy.get('button').contains(' Next ').click();
    cy.wait(500);
    cy.get('div').contains(' Skip ').click();
    cy.wait(500);
    cy.get('button').contains('Submit and get started').click();
  }

  clickBuildYourOwnFromMegaNav() {
    cy.get('li[class="dropdown-element"]').eq(0).children('a[href="/showroom"]').trigger('mouseenter',{force:true});
    cy.wait(500);
    cy.get('a').contains('Build your own').eq(0).click();
    cy.url().should('include','configure/models');
    cy.get('span').contains('Build and Price').should('be.visible');
  }

  clickBuildYourOwnFromBuyerTools() {
    cy.get('i[class*="icon-tools-build"]').trigger('mouseover',{force:true});
    cy.wait(1000);
    cy.get('i[class*="icon-tools-build"]').siblings('a').contains('Build Your Own').click();
  }

  validateModelLandingPage(){
    cy.url().should('include','configure/models');
    cy.get('span').contains('Build and Price').should('be.visible');
  }

  selectVehicleModel(vehicleModelButton: string, urlIdentifier: string, index: number){
      cy.get(vehicleModelButton).eq(index).click()
      cy.url().should('include',urlIdentifier);
      cy.get('span').contains('Build and Price').should('exist');
  }

  selectVariant(modelCode: string, variantCode: string){
      cy.get(`div[data-test="productVariants:slide:${variantCode}"]`).scrollIntoView()
      cy.get(`div[data-test="productVariants:slide:${variantCode}"]`).find('span').contains('Build and Price').scrollIntoView().click()
      cy.url().should('include',`/configure/configure/${modelCode}?carCode=${variantCode}`);
  }

  clickVariantImg(modelCode: string, variantCode: string){
    cy.get(`div[data-test="productVariants:slide:${variantCode}"]`).scrollIntoView()
    cy.get(`div[data-test="productVariants:slide:${variantCode}"]`).find('img').click()
    cy.url().should('include',`/configure/configure/${modelCode}?carCode=${variantCode}`);
}

  goToVariantConfigurePage(variantConfigurePageUrl){
      cy.visit(variantConfigurePageUrl)
  }

  goToVariantSelectionPage(variantPageurl: string){
      cy.visit(variantPageurl)
      cy.get('span').contains('Configure Your New ').should('be.visible');
  }

  validateVariantTypesAndVariantCount(variantType: string, variantCount: number){
    if(variantType == 'n/a'){
      cy.get('div[data-test*="productVariants"]').should('have.lengthOf',variantCount)
    }else if(variantType != 'n/a'){
      cy.get('span').contains(variantType).should('be.visible');
      cy.get('span').contains(variantType).click();
      cy.wait(1000);
      cy.get('div[data-test*="productVariants"]').should('have.lengthOf',variantCount)
    }
  }

  validateVariantName(variantType: string, variantNames: any){ 
    if(variantType == 'n/a'){
      cy.get('p[data-test="text:trimLevel:title"]').children('span').should(($span) => {
        variantNames.forEach((word) => {
          expect($span.text()).to.include(word);
        });
      });
    }else if(variantType != 'n/a'){
      cy.get('span').contains(variantType).click();
      cy.wait(1000);
      cy.get('p[data-test="text:trimLevel:title"]').children('span').should(($span) => {
        variantNames.forEach((word) => {
          expect($span.text()).to.include(word);
        });
      });
    }
  }

  selectVariantType(variantType: string){
    cy.get('span').contains(variantType).click();
    cy.wait(1000);
  }

  

  //Configure Page
  clickViewFullSpecLinkOnVariantContainer(index:number) {
    cy.get('a[data-test="customise:viewSpecificationsFeaturesLink"]').eq(index).click();
    cy.get('div[role="dialog"]').should('be.visible');
    cy.get('div[role="dialog"]').contains('Full Specifications & Features').should('be.visible');
    cy.get('div[role="dialog"]').find('svg[data-test="button:close"]').should('be.visible');
    cy.wait(500);
  }

  closeViewFullSpecModal() {
    cy.get('div[role="dialog"]').find('svg[data-test="button:close"]').click();
    cy.get('div[role="dialog"]').should('not.exist');
  }

  validateFullSpecModalSectionAndSubSectionHeaders(subSectionHeaders:any) {
    const modalSectionHeaders = configurePageElements.specsAndFeatureModalSections
    const modalSubSectionHeaders = subSectionHeaders
    cy.get('div[role="dialog"]').find('span').should(($span) => {
      modalSectionHeaders.forEach((word) => {
        expect($span.text()).to.include(word);
      });
    });
    cy.get('div[role="dialog"]').find('h6').should(($span) => {
      modalSubSectionHeaders.forEach((word) => {
        expect($span.text()).to.include(word);
      });
    });
  }

  clickColourTab() {
    cy.get(configurePageElements.colourTabButton).click();
    cy.wait(200);
    cy.get(configurePageElements.colourAccordion).should('be.visible')
  }

  validateNumOfColourOptions(numOfOptions: number) {
    cy.get('div[id="customise_subaru_colour"]').find('div[data-test*="option:type:color"]').should('have.lengthOf',numOfOptions)
  }

  selectColour(buttonIndex: number, colourName: string) {
    cy.get('div[id="customise_subaru_colour"]').find('div[data-test*="option:type:color"]').eq(buttonIndex).click();
    cy.wait(500);
    cy.get('span[data-test*="summary:selected:featureTitle"]').eq(0).invoke('text').should('eq',colourName)
  }

  validateCarImgSrc(imgSrc: string) {
    cy.get('img[data-test="image:variant:0"]').should('have.attr','src',imgSrc);
  }

  validateColourSummaryAmount() {
    cy.get('div[data-test="summary_expanded:section:subaru_colour"]').scrollIntoView();
    cy.get('div[data-test="summary_expanded:section:subaru_colour"]').find('span').contains('$0.00');
    cy.get('span[data-test*="summary:selected:featureTitle"]').eq(0).invoke('text').then((selectedColour)=>{
      cy.get('div[data-test="summary_expanded:section:subaru_colour"]').find('span').contains(selectedColour);
    })
    
  }
  
  clickInteriorTab() {
    cy.get(configurePageElements.interiorTabButton).click();
    cy.wait(200);
    cy.get(configurePageElements.interiorAccordion).should('be.visible')
  }

  validateNumOfInteriorOptions(numOfOptions: number) {
    cy.get('div[id="customise_subaru_interior"]').find('div[data-test*="option:type:color"]').should('have.lengthOf',numOfOptions)
  }

  selectInterior(buttonIndex: number, interiorName: any) {
    cy.get('div[id="customise_subaru_interior"]').find('div[data-test*="option:type:color"]').eq(buttonIndex).click();
    cy.get('span[data-test*="summary:selected:featureTitle"]').eq(1).invoke('text').should('eq',interiorName)
  }

  validateInteriorSummaryAmount() {
    cy.get('div[data-test="summary_expanded:section:subaru_interior"]').scrollIntoView();
    cy.get('div[data-test="summary_expanded:section:subaru_interior"]').find('span').contains('$0.00');
  }

  clickOptionsTab() {
    cy.get(configurePageElements.optionsTabButton).click();
    cy.wait(200);
    cy.get(configurePageElements.optionsAccordion).should('be.visible')
  }

  validateNumOfOptionPacks(numOfOptions: number) {
    cy.get('div[id="customise_subaruaccessorypack"]').find('div[data-test*="option:pack"]').should('have.lengthOf',numOfOptions)
  }

  clickShowFeaturesOptionPack(index: number) {
    cy.get('div[id="customise_subaruaccessorypack"]').find('div[data-test*="option:pack"]').eq(index).find('span').contains('Show features').click();
    cy.get('div[role="dialog"]').find('div[data-test="text:accessory-pack:title"]').should('be.visible');
  }

  closeOptionPackModal() {
    cy.get('div[role="dialog"]').find('button[data-test="button:close"]').click();
    cy.get('div[role="dialog"]').should('not.exist');
  }

  selectAddOptionPack(index: number) {
    this.clickShowFeaturesOptionPack(index);
    cy.get('button[data-test="button:accessory-pack:toggle"]').find('span').contains('Add').click();
    this.closeOptionPackModal();
    cy.get('div[id="customise_subaruaccessorypack"]').find('div[data-test*="option:pack"]').eq(index).find('p').should('have.attr','data-option','accessory_pack:selected').should('exist');
    //cy.get('div[id="customise_subaruaccessorypack"]').find('div[data-test*="option:pack"]').eq(index).find('p').contains(optionPackName).should('have.attr','data-option','accessory_pack:selected');
  }

  selectTickOptionPack(index: number) {
    cy.get('span[data-test="pack:checkbox"').eq(index).click();
  }

  validateModalSelectedOptionPack(index: number) {
    this.clickShowFeaturesOptionPack(index);
    cy.get('button[data-test="button:accessory-pack:toggle"]').find('span').contains('Remove').should('be.visible');
  }

  validateOptionsSummaryAmount(index: number) {
    cy.get('div[id="customise_subaruaccessorypack"]')
    .find('div[data-test*="option:pack"]').eq(index)
    .find('span[data-test="option:price:primary"]')
    .invoke('text').then(($optionAmount)=>{
      cy.get('div[data-test="summary_expanded:section:subaruaccessorypack"]').scrollIntoView();
      cy.get('div[data-test="summary_expanded:section:subaruaccessorypack"]').find('span').contains($optionAmount);
    })
  }

  clickAccessoriesTab() {
    cy.get(configurePageElements.accessoriesTabButton).click();
    cy.wait(200);
    cy.get(configurePageElements.accessoriesAccordion).should('be.visible')
  }

  clickAccessories(accessoryCategory: string, accessoryName: string) {
    cy.get(accessoryCategory).find('p').contains(accessoryName).click();
  }

  selectAccessory(accessoryCategory: string, index) {
    cy.get(accessoryCategory).find('div[data-test*="option:AU_ACC"]').eq(index).click();
  }

  validateAccessoriesSummaryAmount(accessoryCategory: string, index: number) {
    cy.get(accessoryCategory)
    .find('div[data-test*="option:AU_ACC"]').eq(index)
    .find('p').eq(0)
    .invoke('text').then(($accessoryName)=>{
      cy.get(accessoryCategory)
      .find('span[data-test="option:price:primary"]').eq(index)
      .invoke('text').then(($accessoryAmount)=>{
        cy.get('div[data-test="summary_expanded:section:subaru_accessories"]').scrollIntoView();
        cy.get('div[data-test="summary_expanded:section:subaru_accessories"]').find('span').contains($accessoryName).siblings('span').contains($accessoryAmount).should('exist');
      })
    })
  }

  validateSelectedAccessoriesOnSummary(accessoryCategory: string,index: number, exists: boolean) {
    if(exists == true){
      cy.get(accessoryCategory)
      .find('div[data-test*="option:AU_ACC"]').eq(index)
      .find('p').eq(0)
      .invoke('text').then(($accessoryName)=>{
        cy.get('div[data-test="summary_expanded:section:subaru_accessories"]').scrollIntoView();
        cy.get('div[data-test="summary_expanded:section:subaru_accessories"]').find('span').contains($accessoryName).should('exist');
      })
    }else if(exists == false){
      cy.get(accessoryCategory)
      .find('div[data-test*="option:AU_ACC"]').eq(index)
      .find('p').eq(0)
      .invoke('text').then(($accessoryName)=>{
        cy.get('div[data-test="summary_expanded:section:subaru_accessories"]').scrollIntoView();
        cy.get('div[data-test="summary_expanded:section:subaru_accessories"]').find('span').contains($accessoryName).should('not.exist');
      })
    } 
  }

  clickServicePlansTab() {
    cy.get(configurePageElements.servicePlansTabButton).click();
    cy.wait(200);
    cy.get(configurePageElements.servicePlansAccordion).should('be.visible')
    cy.get(configurePageElements.servicePlanName).should('be.visible')
  }

  expandPriceGuide() {
    cy.get(configurePageElements.priceGuideLink).click();
    cy.get(configurePageElements.serviceName).should('be.visible');
    cy.get(configurePageElements.servicePrice).should('be.visible');
    cy.get(configurePageElements.servicePlanTotalPrice).should('be.visible');
  }

  collapsePriceGuide() {
    cy.get(configurePageElements.priceGuideLink).click();
    cy.get(configurePageElements.serviceName).should('not.be.visible');
    cy.get(configurePageElements.servicePrice).should('not.be.visible');
    cy.get(configurePageElements.servicePlanTotalPrice).should('not.be.visible');
  }

  selectServicePlan(index: number) {
    cy.get(configurePageElements.servicePlanCheckbox).eq(index).click();
  }

  validateServicePlanSummaryAmount(index: number) {
    cy.get(configurePageElements.servicePlanPrice).eq(index)
    .invoke('text').then(($servicePlanAmount)=>{
      cy.get(configurePageElements.servicePlanSummaryAmount).scrollIntoView();
      cy.get(configurePageElements.servicePlanSummaryAmount).find('span').contains($servicePlanAmount).should('exist');
    })
  }

  clickShowFullSummary(){
    cy.get('span').contains('Show Full Summary').scrollIntoView().click();
  }

checkPaymentOptionsOnFooter(){
  cy.get(configurePageElements.cashButton).should('be.visible');
  cy.get(configurePageElements.financeButton).should('be.visible');
}

clickFinanceOptionOnFooter(){
  cy.get(configurePageElements.financeButton).click();
  cy.wait(3000);
  cy.get('div[role="dialog"]').should('be.visible',{timeout:10000});
  cy.get('div[data-test="common:genericAccordion:calculator"]').should('be.visible');
  cy.wait(500);
}

setPropertyOwner(propertyOwner: boolean){
  if(propertyOwner == true){
    cy.get('label[data-test*="homeowner_yes"]').find('input[type="radio"]').should('have.attr','value','true').click();
  }else if(propertyOwner == false){
    cy.get('label[data-test*="homeowner_no"]').find('input[type="radio"]').should('have.attr','value','false').click();
  } 
}

setAgeBracket(ageBracketOption: number){
  if(ageBracketOption == 1){
    cy.get('label[data-test="calculator:radio-18-22"]').click();
  }else if(ageBracketOption == 2){
    cy.get('label[data-test="calculator:radio-23-33"]').click();
  }else if(ageBracketOption == 3){
    cy.get('label[data-test="calculator:radio-34+"]').click();
  } 
}

setLoanTerm(termsOption: number){
  if(termsOption == 1){
    cy.get('div[role="dialog"]').find('button[data-test="calculator:tab-Weekly"]').click();
  }else if(termsOption == 2){
    cy.get('div[role="dialog"]').find('button[data-test="calculator:tab-Fortnightly"]').click();
  }else if(termsOption == 3){
    cy.get('div[role="dialog"]').find('button[data-test="calculator:tab-Monthly"]').click();
  } 
}

clickContinueCalculateModal(){
  cy.get(configurePageElements.continueButtonCalculateModal).scrollIntoView();
  cy.get(configurePageElements.continueButtonCalculateModal).click();
  cy.wait(3000);
  cy.get('div[role="dialog"]').should('not.exist',{timeout:10000});
  cy.wait(500);
}

validateCalculationsFieldsOnFooter() {
  cy.get(configurePageElements.footerIndicativeInterestRate).find('span').contains('Indicative Interest rate');
  cy.get(configurePageElements.footerComparisonRate).find('span').contains('Comparison rate');
  cy.get(configurePageElements.footerEstimatedRepayment).find('span').contains('Estimated repayment');
}

checkEstimatedRepaymentValueOnFooterAndSummary() {
  cy.get(configurePageElements.footerEstimatedRepayment).find('span[data-test="text:price:total"]')
    .invoke('text').then(($estimatedRepaymentValue)=>{
      cy.get(configurePageElements.summaryEstimatedRepaymentValue).children('span').invoke('text').should('include',$estimatedRepaymentValue);
  })
}

checkComparisonRateValueOnFooterAndSummary() {
  cy.get(configurePageElements.summaryComparisonRateValue).invoke('text').then(($comparisonRateValue)=>{
    cy.get(configurePageElements.footerComparisonRate).find('span').eq(0).invoke('text').should('include',$comparisonRateValue);
  }) 
}

checkDriveawayPriceValueOnFooterAndSummary() {
  cy.get(configurePageElements.footerDriveawayPrice).find('span[data-test="text:price:total"]')
    .invoke('text').then(($driveawayPriceValue)=>{
      cy.get(configurePageElements.summaryDriveawayPrice).children('span').invoke('text').should('eq',$driveawayPriceValue);
      cy.get(configurePageElements.summaryDriveawayPrice).children('span').invoke('text').should('not.equal','$0');
  })
}

goToCheckoutPage() {
  cy.get(configurePageElements.buyOnlineButton).click();
  cy.get('p').contains('Order Summary').should('be.visible',{timeout:120000});
  cy.url().should('include','/build-your-own/order/details');

}









}
