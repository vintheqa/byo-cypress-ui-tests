export class BaseObject {

  clickElement(element: string, index: number) {
    cy.get(element).eq(index).click({force:true})
  }

  checkElementIsVisible(element: string, index: number, visible: boolean) {
    if (visible == true){
      cy.get(element).eq(index).should('be.visible');
    } else if (visible == false){
      cy.get(element).eq(index).should('not.be.visible');
    }  
  }

  checkElementExists(element: string, index: number, exists: boolean) {
    if (exists == true){
      cy.get(element).eq(index).should('exist');
    } else if (exists == false){
      cy.get(element).eq(index).should('not.exist');
    }
  }
}
