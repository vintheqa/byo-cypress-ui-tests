import { configurePageElements,homePageElements,wrxPageElements, urls } from "../pageElements";

export class PageObject {
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
      cy.get('span').contains('Build and Price').should('be.visible');
  }

  selectVariant(variantButton: string, urlIdentifier: string){
      cy.get(variantButton).scrollIntoView()
      cy.get(variantButton).find('span').contains('Build and Price').scrollIntoView().click()
      cy.url().should('include',urlIdentifier);
  }

  goToVariantConfigurePage(variantConfigurePageUrl: string, urlIdentifier: string){
      cy.visit(variantConfigurePageUrl)
      cy.url().should('include',urlIdentifier);
  }

  goToVariantSelectionPage(variantPageurl: string){
      cy.visit(variantPageurl)
      cy.get('span').contains('Configure Your New ').should('be.visible');
  }

  validateVariantTypesAndVariantCount(variantType: string, variantCount: number){
      cy.get('span').contains(variantType).should('be.visible');
      cy.get('span').contains(variantType).click();
      cy.wait(1000);
      cy.get('div[data-test*="productVariants"]').should('have.lengthOf',variantCount)
  }

  validateVariantName(variantType: string, variantNames: any){ 
    cy.get('span').contains(variantType).click();
    cy.wait(1000);

    cy.get('p[data-test="text:trimLevel:title"]').children('span').should(($span) => {
      variantNames.forEach((word) => {
        expect($span.text()).to.include(word);
      });
    });
  }

  //Configure Page
  clickViewFullSpecLinkOnVariantContainer() {
    cy.get('span').contains('View Full Specifications & Features').click();
    cy.get('div[role="dialog"]').should('be.visible');
    cy.get('div[role="dialog"]').contains('Full Specifications & Features').should('be.visible');
    cy.get('div[role="dialog"]').find('svg[data-test="button:close"]').should('be.visible');
    cy.wait(500);
  }

  closeViewFullSpecModal() {
    cy.get('div[role="dialog"]').find('svg[data-test="button:close"]').click();
    cy.get('div[role="dialog"]').should('not.exist');
  }

  validateFullSpecModalSectionAndSubSectionHeaders() {
    const modalSectionHeaders = configurePageElements.specsAndFeatureModalSections
    const modalSubSectionHeaders = configurePageElements.specsAndFeatureModalSubSections
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
    cy.get('span[data-test*="summary:selected:featureTitle"]').eq(0).invoke('text').should('eq',colourName)
  }

  validateCarImgSrc(imgSrc: string) {
    cy.get('img[data-test="image:variant:0"]').should('have.attr','src',imgSrc);
  }

  validateColourSummaryAmount() {
    cy.get('span').contains('Show Full Summary').scrollIntoView().click();
    cy.get('div[data-test="summary_expanded:section:subaru_colour"]').scrollIntoView();
    cy.get('div[data-test="summary_expanded:section:subaru_colour"]').find('span').contains('$0.00');
  }
  
  clickInteriorTab() {
    cy.get(configurePageElements.interiorTabButton).click();
    cy.wait(200);
    cy.get(configurePageElements.interiorAccordion).should('be.visible')
  }

  validateNumOfInteriorOptions(numOfOptions: number) {
    cy.get('div[id="customise_subaru_interior"]').find('div[data-test*="option:type:color"]').should('have.lengthOf',numOfOptions)
  }

  selectInterior(buttonIndex: number, interiorName: string) {
    cy.get('div[id="customise_subaru_interior"]').find('div[data-test*="option:type:color"]').eq(buttonIndex).click();
    cy.get('span[data-test*="summary:selected:featureTitle"]').eq(1).invoke('text').should('eq',interiorName)
  }

  validateInteriorSummaryAmount() {
    cy.get('span').contains('Show Full Summary').scrollIntoView().click();
    cy.get('div[data-test="summary_expanded:section:subaru_interior"]').scrollIntoView();
    cy.get('div[data-test="summary_expanded:section:subaru_interior"]').find('span').contains('$0.00');
  }

  clickOptionsTab() {
    cy.get(configurePageElements.optionsTabButton).click();
    cy.wait(200);
    cy.get(configurePageElements.optionsAccordion).should('be.visible')
  }

  validateNumOfStylingPackOptions(numOfOptions: number) {
    cy.get('div[id="customise_subaruaccessorypack"]').find('div[data-test*="option:pack"]').should('have.lengthOf',numOfOptions)
  }

  clickShowFeaturesStylingPack(index: number) {
    cy.get('div[id="customise_subaruaccessorypack"]').find('span').contains('Show features').eq(index).click();
    cy.get('div[role="dialog"]').find('div[data-test="text:accessory-pack:title"]').should('be.visible');
  }

  closeStylingPackModal() {
    cy.get('div[role="dialog"]').find('button[data-test="button:close"]').click();
    cy.get('div[role="dialog"]').should('not.exist');
  }

  selectAddStylingPack(index: number) {
    this.clickShowFeaturesStylingPack(index);
    cy.get('button[data-test="button:accessory-pack:toggle"]').find('span').contains('Add').click();
    this.closeStylingPackModal();
    cy.get('div[id="customise_subaruaccessorypack"]').find('p').contains('Styling Pack').eq(index).should('have.attr','data-option','accessory_pack:selected');
  }

  validateModalSelectedStylingPack(index: number) {
    this.clickShowFeaturesStylingPack(index);
    cy.get('button[data-test="button:accessory-pack:toggle"]').find('span').contains('Remove').should('be.visible');
  }

  validateOptionsSummaryAmount(index: number) {
    cy.get('div[id="customise_subaruaccessorypack"]')
    .find('div[data-test*="option:pack"]').eq(index)
    .find('span[data-test="option:price:primary"]')
    .invoke('text').then(($optionAmount)=>{
      cy.get('span').contains('Show Full Summary').scrollIntoView().click();
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

  clickShowFullSummary(){
    cy.get('span').contains('Show Full Summary').scrollIntoView().click();
  }

  validateAccessoriesSummaryAmount(accessoryCategory: string, index: number,accessoryName: string) {
    cy.get(accessoryCategory)
    .find('span[data-test="option:price:primary"]').eq(index)
    .invoke('text').then(($accessoryAmount)=>{
      cy.get('div[data-test="summary_expanded:section:subaru_accessories"]').scrollIntoView();
      cy.get('div[data-test="summary_expanded:section:subaru_accessories"]').find('span').contains(accessoryName).siblings('span').contains($accessoryAmount).should('exist');
    })
  }

  validateSelectedAccessoriesOnSummary(accessoryName: string, exists: boolean) {
    if(exists == true){
      cy.get('div[data-test="summary_expanded:section:subaru_accessories"]').find('span').contains(accessoryName).should('exist');
    }else if(exists == false){
      cy.get('div[data-test="summary_expanded:section:subaru_accessories"]').find('span').contains(accessoryName).should('not.exist');
    }
      
  }








}
