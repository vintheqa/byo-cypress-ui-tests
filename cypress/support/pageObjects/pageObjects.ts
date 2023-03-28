import { pageElements } from "../pageElements";
import { BaseObject } from "../pageObjects";

const $BaseObject = new BaseObject();

export class PageObject {
  sampleMethod() {
  let sampleVar = pageElements.elementLocator
  $BaseObject.sampleMethod()
  }

}
