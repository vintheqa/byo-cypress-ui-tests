import { BaseObject, PageObject} from "../support/pageObjects"

const $BaseObject = new BaseObject();
const $PageObject = new PageObject();

describe("Login Page", () => {
  beforeEach(() => {
    $BaseObject.sampleMethod();
  });

  it("001 - Sample Test", () => {
    $PageObject.sampleMethod()
  });

});
