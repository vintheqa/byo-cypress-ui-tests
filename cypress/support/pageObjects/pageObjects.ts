import { homePageElements } from "../pageElements";
import { BaseObject } from "../pageObjects";

const $BaseObject = new BaseObject();

export class PageObject {
  goToRootPage() {
    cy.visit(Cypress.env("baseURL"))
    cy.get(homePageElements.menuBarMain).should('be.visible')
  }

  clickBuildYourOwnFromMegaNav() {
    cy.get('a').contains('Vehicles').trigger("mouseenter", { force: true });
    cy.wait(100);
    cy.get('a').contains('Build your own').eq(0).click();
    cy.url().should('include','configure/models');
    cy.get('span').contains('Build and Price').should('be.visible');
  }

  selectVehicleFromConfigurePage(vehicleModel){
    if (vehicleModel == 'wrx'){
      cy.get('a[href="/configure/trim-levels/AUWRX"]').click()
      cy.url().should('include','configure/trim-levels/AUWRX');
      cy.get('span').contains('Build and Price').should('be.visible');
    } else if (vehicleModel == 'crosstek'){
      cy.get('a[href="/configure/trim-levels/AUWRX"]').click()
      cy.url().should('include','configure/trim-levels/AUWRX');
      cy.get('span').contains('Build and Price').should('be.visible');
    }
  }


}
