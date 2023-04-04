import { configurePageElements,homePageElements,variantSelectionPageElements, urls } from "../pageElements";

export class PageObject {

  goToRootPage() {
    cy.visit(Cypress.env("baseURL"));
    cy.get(homePageElements.menuBarMain).should('be.visible')
  }
  
  setPostCode(postcode) {
    cy.get('input[name="postcode"]').click();
    cy.get('input[name="postcode"]').type(postcode);
    cy.wait(500);
    cy.get('span').contains('Next').click();
    cy.wait(500);
    cy.get('span').contains('Next').click();
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

  selectVehicleModel(vehicleModel: string){
    if (vehicleModel == 'wrx'){
      cy.get('a[href="/configure/trim-levels/AUWRX"]').eq(0).click()
      cy.url().should('include','configure/trim-levels/AUWRX');
      cy.get('span').contains('Build and Price').should('be.visible');
    } else if (vehicleModel == 'crosstek'){
      cy.get('a[href="/configure/trim-levels/AUWRX"]').click()
      cy.url().should('include','configure/trim-levels/AUWRX');
      cy.get('span').contains('Build and Price').should('be.visible');
    }
  }

  selectWrxVariant(variant: string){
    if (variant == 'sedan awd manual'){
      cy.get(variantSelectionPageElements.wrxSedanAwdManual).scrollIntoView()
      cy.get(variantSelectionPageElements.wrxSedanAwdManual).find('span').contains('Build and Price').scrollIntoView().click()
      cy.url().should('include','/configure/configure/AUWRX');
    } else if (variant == 'sedan awd sport'){
      cy.get(variantSelectionPageElements.wrxSedanAwdSport).scrollIntoView()
      cy.get(variantSelectionPageElements.wrxSedanAwdSport).find('span').contains('Build and Price').scrollIntoView().click()
      cy.url().should('include','/configure/configure/AUWRX');
  
    }
  }

  goToWrxVariantConfigurePage(variant: string){
    if (variant == 'sedan awd manual'){
      cy.visit(urls.wrxAwdManualConfigurePage)
      cy.url().should('include','/configure/configure/AUWRX');
    } else if (variant == 'sedan awd sport'){
      cy.visit(urls.wrxAwdManualConfigurePage)
      cy.url().should('include','/configure/configure/AUWRX');
    }
  }


  goToVariantSelectionPage(vehicleModel: string){
    if (vehicleModel == 'wrx'){
      cy.visit(urls.wrxVariantSelectionPage)
      cy.get('span').contains('Configure Your New ').should('be.visible');
    } else if (vehicleModel == 'crosstek'){
      cy.visit(urls.crosstekVariantSelectionPage)
      cy.get('span').contains('Configure Your New ').should('be.visible');
    }
  }

  validateVariantTypesAndVariantCount(vehicleModel: string){
    if (vehicleModel == 'wrx'){
      const sedanVariantCount: number = variantSelectionPageElements.wrxSedanVariants.length
      const sportswagonVariantCount: number = variantSelectionPageElements.wrxSportswagonVariants.length
      cy.get('span').contains('Sedan').should('be.visible');
      cy.get('div[data-test*="productVariants"]').should('have.lengthOf',sedanVariantCount)
      cy.get('span').contains('Sportswagon').should('be.visible');
      cy.get('span').contains('Sportswagon').click();
      cy.wait(1000);
      cy.get('div[data-test*="productVariants"]').should('have.lengthOf',sportswagonVariantCount)
    } else if (vehicleModel == 'crosstek'){
      cy.get('span').contains('Sedan').should('be.visible');
      cy.get('span').contains('Sportswagon').should('be.visible');
    }
  }

  validateVariantName(vehicleModel: string){
    if (vehicleModel == 'wrx'){
      const sedanVariants = variantSelectionPageElements.wrxSedanVariants
      const sportswagonVariants = variantSelectionPageElements.wrxSportswagonVariants
      
      cy.get('p[data-test="text:trimLevel:title"]').children('span').should(($span) => {
        sedanVariants.forEach((word) => {
          expect($span.text()).to.include(word);
        });
      });

      cy.get('span').contains('Sportswagon').click();
      cy.wait(1000);

      cy.get('p[data-test="text:trimLevel:title"]').children('span').should(($span) => {
        sportswagonVariants.forEach((word) => {
          expect($span.text()).to.include(word);
        });
      });
    } else if (vehicleModel == 'crosstek'){
      cy.get('span').contains('Sedan').should('be.visible');
      cy.get('span').contains('Sportswagon').should('be.visible');
    }
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





}
